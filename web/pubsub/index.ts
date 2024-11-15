import { PubSubClass } from '@/pubsub/PubSub'
import type { DockingWebSockingData } from '@/types/docking'
import type { UtilityWebSockingData } from '@/types/utility'

export const MolstarPubSub = new PubSubClass()

export const DockingPubSub = new PubSubClass<DockingWebSockingData>()

export const UtilityPubSub = new PubSubClass<UtilityWebSockingData>()
