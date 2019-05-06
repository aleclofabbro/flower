import EmailConfirmTasks from '../EmailConfirm/tasks/mongo'
import { MongoClient } from 'mongodb';
import { CollSchema } from '../EmailConfirm/tasks/mongo/Types';
(async () => {

  const mongoClient = new MongoClient('mongodb://localhost:27017', { useNewUrlParser: true })
  await mongoClient.connect()

  const db = mongoClient.db('App')
  await db.dropCollection('EmailConfirmation')

  const coll = db.collection<CollSchema>('EmailConfirmation')
  db.createIndex('EmailConfirmation', '_id', {
    unique: true,
    name: '_id'
  })
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

  //@ts-ignore
  global.tasks = tasks
  //@ts-ignore
  global.call = (_, __) => tasks[_](__).then(console.log, console.error)

  const resp = await tasks.takeInCharge({ email: 'e', userName: 'u' })
  console.log(resp)
  if (resp.t == 'InCharge') {
    // console.log(await tasks.checkEmailConfirmation({ email: '', id: '' }))
    // console.log(await tasks.checkEmailConfirmation({ email: '', id: resp.p.id }))
    console.log(await tasks.checkEmailConfirmation({ email: 'e', id: resp.p.id }))
    console.log(await tasks.shouldConfirmationProcessStart({ id: resp.p.id }))
    console.log(await tasks.shouldConfirmationProcessStart({ id: resp.p.id }))
    console.log(await tasks.shouldConfirmationProcessStart({ id: resp.p.id }))
    console.log(await tasks.shouldConfirmationProcessStart({ id: resp.p.id }))
    console.log(await tasks.checkEmailConfirmation({ email: 'e', id: resp.p.id }))
    console.log(await tasks.takeInCharge({ email: '-e', userName: 'u' }))
    console.log(await tasks.takeInCharge({ email: 'e', userName: 'u-' }))
    console.log(await tasks.takeInCharge({ email: 'e', userName: 'u' }))
    // } else {
  }

})()
