import amqp from 'amqplib'
import { tasks as emailConfirmTasks } from '../EmailConfirm/impl/mongo'
import { MongoClient } from 'mongodb';
import { CollSchema } from '../EmailConfirm/impl/mongo/Types';
import { adaptTask } from '../lib/Task/impl/amqp/index';
import { CheckEmailConfirmation, ShouldConfirmationProcessStart, TakeInCharge } from '../EmailConfirm/Tasks';
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
  const adapters = {
    checkEmailConfirmation: await adaptTask<CheckEmailConfirmation>(channel, 'checkEmailConfirmation'),
    shouldConfirmationProcessStart: await adaptTask<ShouldConfirmationProcessStart>(channel, 'shouldConfirmationProcessStart'),
    takeInCharge: await adaptTask<TakeInCharge>(channel, 'takeInCharge'),
  }



  await adapters.takeInCharge.probeOut(_ => console.log('.takeInCharge', _))
  await adapters.checkEmailConfirmation.probeOut(_ => console.log('.checkEmailConfirmation', _))
  await adapters.shouldConfirmationProcessStart.probeOut(_ => console.log('.shouldConfirmationProcessStart', _))


  await adapters.checkEmailConfirmation.consume(tasks.checkEmailConfirmation)
  await adapters.shouldConfirmationProcessStart.consume(tasks.shouldConfirmationProcessStart)
  await adapters.takeInCharge.consume(tasks.takeInCharge)



  await adapters.takeInCharge.probeOut(async _ => {
    console.log('[InCharge]', _)
    await adapters.checkEmailConfirmation.triggerTask({ email: 'e', id: _.p.id })
    await adapters.shouldConfirmationProcessStart.triggerTask({ id: _.p.id })
  }, {
      types: ['InCharge']
    })
  await adapters.shouldConfirmationProcessStart.probeOut(async _ => {
    console.log('[ShouldStart]', _)
    // await adapters.shouldConfirmationProcessStart.triggerTask({ id: _.p.id })
    await adapters.checkEmailConfirmation.triggerTask({ email: 'e', id: _.p.id })
  }, {
      types: ['ShouldStart']
    })

  await adapters.takeInCharge.triggerTask({ email: 'e', userName: 'u' })
  await adapters.takeInCharge.triggerTask({ email: 'e', userName: 'ua' })

})()
