import { get } from './../base'
// 下载文件

// poseview的下载
export const downloadPoseviewFile = (task_id: string) => {
  return get<Blob>('/poseview/download', {
    headers: new Headers({
      'Content-Type': 'application/octet-stream',
    }),
    params: {
      task_id,
    },
  })
}
