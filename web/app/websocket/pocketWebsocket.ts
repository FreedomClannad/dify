import { DockingPubSub } from '@/pubsub'

export const PocketWebsocket = (obj: any) => {
  console.log(obj)
  let id = ''
  if ('id' in obj)
    id = obj.id

  DockingPubSub.publish('pocket', { id, data: obj })
}
