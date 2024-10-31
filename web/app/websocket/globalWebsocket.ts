import { DockingPubSub } from '@/pubsub'

export const GlobalWebsocket = (obj: any) => {
  let id = ''
  if ('id' in obj)
    id = obj.id
  DockingPubSub.publish('GlobalResult', { id, data: obj })
}
