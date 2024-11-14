import { get, post } from './base'
import type { HistoryFile, HistoryTask, UtilityResult } from '@/types/utility'
import type { Collection } from '@/app/components/utility/types'

// 这里是历史记录部分
type HistoryFileInfo = {
  created_at: number
  created_by: string
  extension: string
  id: string
  mime_type: string
  name: string
  size: number
}

export const getFileInfo = (params: HistoryFile) => {
  return get<HistoryFileInfo>('/history_task/file', { params })
}

export const getFileInfoFunction = (params: HistoryFile, callback: (res: HistoryFileInfo) => void) => {
  getFileInfo(params).then((res) => {
    callback(res)
  })
}

type GlobalHistoryResult = {
  created_at: string
  created_by: string
  fasta_file_id: string
  id: string
  ligand_file_ids: string[]
  out_pose_num: number
  result: string
  updated_at: string
}

export const getGlobalHistory = (data: HistoryTask) => {
  return post<GlobalHistoryResult>('/history_task/detail', { body: data })
}

type PocketHistoryResult = {
  center_x: number
  center_y: number
  center_z: number
  created_at: string
  created_by: string
  id: string
  ligand_file_ids: string[]
  out_pose_num: number
  pdb_file_id: string
  remove_ligand_file_id: string
  result: string
  size_x: number
  size_y: number
  size_z: number
  status: string
  task_name: string
  updated_at: string
}

export const getPocketHistory = (data: HistoryTask) => {
  return post<PocketHistoryResult>('/history_task/detail', { body: data })
}

export const fetchUtilityCollectionList = () => {
  return get<Collection[]>('/sciminer/tools')
}

export const getHistoryDetailData = <T>(data: HistoryTask) => {
  return post<T>('/history_task/detail', { body: data })
}

// 获取文件渲染图片
export const getFileRenderList = (id: string) => {
  return get<string[]>(`/molecular-docking/files/rendering?file_id=${id}`)
}

// 这里是poseview的内容
export const submitPoesviewTask = (data: any) => {
  return post<UtilityResult>('/poseview/task', { body: data })
}
