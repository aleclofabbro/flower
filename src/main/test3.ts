import amqp from 'amqplib'
import { tasks as emailConfirmTasks } from '../EmailConfirm/impl/mongo'
import { MongoClient } from 'mongodb';
import { CollSchema } from '../EmailConfirm/impl/mongo/Types';
import { adaptDomain } from '../lib/Domain/impl/amqp';
import { EmailConfirmTasks, w2, w1 } from '../EmailConfirm/Types';
(async () => {

  const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true })
  await mongoClient.connect()

  const db = mongoClient.db('App')
  await db.dropCollection('EmailConfirmation').catch(() => { })

  const coll = db.collection<CollSchema>('EmailConfirmation')

  await db.createIndex('EmailConfirmation', 'userName', {
    unique: true,
    name: 'userName'
  })
  await db.createIndex('EmailConfirmation', 'email', {
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

  const domain = await adaptDomain<EmailConfirmTasks>(channel)

  await domain.wire(...w1)
  await domain.wire(...w2)
  //  domain.wire(...W4)

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



  await takeInCharge({ email: 'cae', userName: 'cau' })
    .then(async _ => {
      if (_.t === 'InCharge') {
        // setTimeout(() =>
        checkEmailConfirmation({ email: 'cae', id: _.p.id, })//,
        // 50
        // )
      } else {
        _
      }
      console.log(`-test takeInCharge : `, _)
    })
  await takeInCharge({ email: 'cae', userName: 'ua' })
})()
