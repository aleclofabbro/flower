import { adapt } from './adapter/amqp';
import { domain } from './_test';
import amqp from 'amqplib'

amqp.connect({})
  .then(conn => conn.createChannel())
  .then(channel => {
    adapt(domain, channel)
  })
