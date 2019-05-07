import amqp from 'amqplib'
import EmailConfirmTasks from '../EmailConfirm/tasks/mongo'
import { MongoClient } from 'mongodb';
import { CollSchema } from '../EmailConfirm/tasks/mongo/Types';
import { adapt } from '../lib/Task/adapter/amqp';
import { CheckEmailConfirmation, ShouldConfirmationProcessStart, TakeInCharge } from '../EmailConfirm/Tasks';
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

  const tasks = EmailConfirmTasks({
    base: {
      maxAttempts: 3,
      waitHours: 10
    },
    coll
  })

  const conn = await amqp.connect({})
  const channel = await conn.createChannel()
  const adapters = {
    checkEmailConfirmation: await adapt<CheckEmailConfirmation>(channel, 'checkEmailConfirmation'),
    shouldConfirmationProcessStart: await adapt<ShouldConfirmationProcessStart>(channel, 'shouldConfirmationProcessStart'),
    takeInCharge: await adapt<TakeInCharge>(channel, 'takeInCharge'),
  }



  await adapters.takeInCharge.probe(_ => console.log('.takeInCharge', _))
  await adapters.checkEmailConfirmation.probe(_ => console.log('.checkEmailConfirmation', _))
  await adapters.shouldConfirmationProcessStart.probe(_ => console.log('.shouldConfirmationProcessStart', _))


  await adapters.checkEmailConfirmation.consume(tasks.checkEmailConfirmation)
  await adapters.shouldConfirmationProcessStart.consume(tasks.shouldConfirmationProcessStart)
  await adapters.takeInCharge.consume(tasks.takeInCharge)



  await adapters.takeInCharge.probe(async _ => {
    console.log('[InCharge]', _)
    await adapters.checkEmailConfirmation.triggerTask({ email: 'e', id: _.p.id })
    await adapters.shouldConfirmationProcessStart.triggerTask({ id: _.p.id })
  }, {
      types: ['InCharge']
    })
  await adapters.shouldConfirmationProcessStart.probe(async _ => {
    console.log('[ShouldStart]', _)
    // await adapters.shouldConfirmationProcessStart.triggerTask({ id: _.p.id })
    await adapters.checkEmailConfirmation.triggerTask({ email: 'e', id: _.p.id })
  }, {
      types: ['ShouldStart']
    })

  await adapters.takeInCharge.triggerTask({ email: 'e', userName: 'u' })
  await adapters.takeInCharge.triggerTask({ email: 'e', userName: 'ua' })

})()
