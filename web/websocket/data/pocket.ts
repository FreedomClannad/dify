import { DockingPubSub } from '@/pubsub'

export const PocketData = (obj: any) => {
  console.log('PocketWebsocket', obj)
  let id = ''
  if ('id' in obj)
    id = obj.id
  DockingPubSub.publish('PocketResult', { id, data: obj })
}
