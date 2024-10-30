import { DockingPubSub } from '@/pubsub'

export const GlobalWebsocket = (obj: any) => {
  console.log('GlobalWebsocket', obj)
  let id = ''
  let status = ''
  if ('id' in obj)
    id = obj.id
  if ('status' in obj)
    status = obj.status
  if (status === 'SUCCESS')
    DockingPubSub.publish('GlobalResult', { id, data: obj })
}
