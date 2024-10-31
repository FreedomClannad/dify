import { DockingPubSub } from '@/pubsub'

export const PocketWebsocket = (obj: any) => {
  console.log('PocketWebsocket', obj)
  let id = ''
  if ('id' in obj)
    id = obj.id
  DockingPubSub.publish('PocketResult', { id, data: obj })
}
