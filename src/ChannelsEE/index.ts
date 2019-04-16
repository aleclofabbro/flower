import { Channels, Meta } from '../ChannelsTypeDef';
import { EventEmitter } from 'events';
const rnd = () => parseInt(`${Math.random()}`.substr(2)).toString(36)
const id = () => `${rnd()}${rnd()}`.padStart(22, 'x')
const MSG_EVENT = 'msg'
export const channelsFor = <MsgMap>(): Channels<MsgMap> => {
  const emitters = {} as {
    [T in keyof MsgMap]: EventEmitter
  }
  //@ts-ignore
  const channels: Channels<MsgMap> = (msgName, h_or_msg) => {
    const ee = (emitters[msgName] = emitters[msgName] || new EventEmitter())
    if ('function' === typeof h_or_msg) {
      const handler = h_or_msg
      //@ts-ignore
      ee.on(MSG_EVENT, handler)
      //@ts-ignore
      return () => ee.off(MSG_EVENT, handler)
    } else {
      const msg = h_or_msg
      const meta: Meta = {
        id: id(),
        msgName: `${msgName}`
      }
      ee.emit(MSG_EVENT, msg, meta)
      return meta
    }
  }
  return channels
}
