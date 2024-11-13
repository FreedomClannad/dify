import { PocketData } from '@/app/websocket/data/pocket'
import { GlobalData } from '@/app/websocket/data/global'
import { PoseviewData } from '@/app/websocket/data/poseview'

const data: { [key: string]: Function } = {
  molecular_docking: PocketData,
  global_docking: GlobalData,
  poseview: PoseviewData,
}
export const handleWebsocketData = (obj: any) => {
  // if ('molecular_docking' in obj)
  //   PocketData(obj.molecular_docking)
  // if ('global_docking' in obj)
  //   GlobalData(obj.global_docking)
  // if ('poseview' in obj)
  //   PoseviewData(obj.poseview)
  for (const key in data) {
    if (key in obj)
      data[key](obj[key])
  }
}
