import { adapt } from './adapter/amqp';
import { domain, send } from './_test';
import amqp from 'amqplib'

amqp.connect({})
  .then(conn => conn.createChannel())
  .then(channel => adapt(domain, channel))
  .then(send)
