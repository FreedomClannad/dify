import { UtilityPubSub } from '@/pubsub'

export const PoseviewData = (obj: any) => {
  let id = ''
  if ('id' in obj)
    id = obj.id
  UtilityPubSub.publish('PoseviewResult', { id, data: obj })
}
