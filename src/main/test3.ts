import amqp from 'amqplib'
import { emailConfirmTasks } from '../EmailConfirm/impl/mongo'
import { MongoClient } from 'mongodb';
import { CollSchema } from '../EmailConfirm/impl/mongo/Types';
import { adaptDomain } from '../lib/Domain/impl/amqp';
import { EmailConfirmTasks, wire1, wire2 } from '../EmailConfirm/Domain';
(async () => {

  /**
   * SETUP MONGO
   */
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

  /**
   * SETUP AMQP
   */
  const conn = await amqp.connect({})
  const channel = await conn.createChannel()

  /**
   * SETUP DOMAIN
   */
  const tasks = emailConfirmTasks({
    base: {
      maxAttempts: 3,
      waitHours: 10
    },
    coll
  })
  const domain = await adaptDomain<EmailConfirmTasks>(channel)
  await domain.wire(...wire1)
  await domain.wire(...wire2)
  //  domain.wire(...W4)


  /**
   * GET DOMAIN TASKS
   */
  const [
    takeInCharge,
    checkEmailConfirmation,
    shouldConfirmationProcessStart
  ] = await Promise.all([
    domain.get('takeInCharge'),
    domain.get('checkEmailConfirmation'),
    domain.get('shouldConfirmationProcessStart'),
  ])

  /**
   * SETUP TASK WORKERS 
   */
  await checkEmailConfirmation.consume(tasks.checkEmailConfirmation)
  await shouldConfirmationProcessStart.consume(tasks.shouldConfirmationProcessStart)
  await takeInCharge.consume(tasks.takeInCharge)



  /**
   * LOG DOMAIN TASKS OUT WITH PROBE
   */
  // await takeInCharge.probeOut(_ => console.log('.takeInCharge', _))
  // await checkEmailConfirmation.probeOut(_ => console.log('.checkEmailConfirmation', _))
  // await shouldConfirmationProcessStart.probeOut(_ => console.log('.shouldConfirmationProcessStart', _))



  /**
   * USE TASKS
   */
  takeInCharge({ email: 'cae', userName: 'cau' })
    .then(async _ => {
      if (_.t === 'InCharge') {
        console.log(`.. takeInCharge : `, _, `checking...`)
        // setTimeout(() =>
        checkEmailConfirmation({ email: 'cae', id: _.p.id, })
          .then(console.log)
        // 50
        // )
      } else {
        console.log(`..?????????? what ? takeInCharge : `, _)
      }
    })
  await takeInCharge({ email: 'cae', userName: 'ua' })
    .then(async _ => {
      console.log(`-test takeInCharge : `, _)
    })
})()
