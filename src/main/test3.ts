import amqp from 'amqplib'
import { tasks as emailConfirmTasks } from '../EmailConfirm/tasks/mongo'
import { MongoClient } from 'mongodb';
import { CollSchema } from '../EmailConfirm/tasks/mongo/Types';
import { adaptDomain } from '../lib/Domain/adapter/amqp';
import { EmailConfirmDomain } from '../EmailConfirm/Types';
(async () => {

  const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true })
  await mongoClient.connect()

  const db = mongoClient.db('App')
  await db.dropCollection('EmailConfirmation').catch(() => { })

  const coll = db.collection<CollSchema>('EmailConfirmation')

  db.createIndex('EmailConfirmation', 'userName', {
    unique: true,
    name: 'userName'
  })
  db.createIndex('EmailConfirmation', 'email', {
    unique: true,
    name: 'email'
  })

  const tasks = emailConfirmTasks({
    base: {
      maxAttempts: 3,
      waitHours: 10
    },
    coll
  })

  const conn = await amqp.connect({})
  const channel = await conn.createChannel()

  const domain = await adaptDomain<EmailConfirmDomain>(channel)


  const [
    takeInCharge,
    checkEmailConfirmation,
    shouldConfirmationProcessStart
  ] = await Promise.all([
    domain.get('takeInCharge'),
    domain.get('checkEmailConfirmation'),
    domain.get('shouldConfirmationProcessStart'),
  ])

  await takeInCharge.probeOut(_ => console.log('.takeInCharge', _))
  await checkEmailConfirmation.probeOut(_ => console.log('.checkEmailConfirmation', _))
  await shouldConfirmationProcessStart.probeOut(_ => console.log('.shouldConfirmationProcessStart', _))


  await checkEmailConfirmation.consume(tasks.checkEmailConfirmation)
  await shouldConfirmationProcessStart.consume(tasks.shouldConfirmationProcessStart)
  await takeInCharge.consume(tasks.takeInCharge)



  await takeInCharge.probeOut(async _ => {
    console.log('[InCharge]', _)
    await shouldConfirmationProcessStart({ id: _.p.id })
  }, {
      types: ['InCharge']
    })
  await shouldConfirmationProcessStart.probeOut(async _ => {
    console.log('[ShouldStart]', _)
    // await shouldConfirmationProcessStart({ id: _.p.id })
    await checkEmailConfirmation({ email: 'e', id: _.p.id })
  }, {
      types: ['ShouldStart']
    })

  await takeInCharge({ email: 'e', userName: 'u' })
    .then(async _ => {
      if (_.t === 'InCharge') {
        // setTimeout(async () =>
        await checkEmailConfirmation({ email: 'e', id: _.p.id })
        // , 1000)
      }
    })
  await takeInCharge({ email: 'e', userName: 'ua' })

})()
