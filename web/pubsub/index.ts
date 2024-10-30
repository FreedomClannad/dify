import { PubSubClass } from '@/pubsub/PubSub'
import type { DockingWebSockingData } from '@/types/docking'

export const MolstarPubSub = new PubSubClass()

export const DockingPubSub = new PubSubClass<DockingWebSockingData>()
