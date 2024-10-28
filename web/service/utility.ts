import { get, post } from './base'
import type { HistoryFile, HistoryTask } from '@/types/utility'

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
