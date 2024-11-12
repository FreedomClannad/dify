import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'

export enum UtilityTaskState {
  PENDING = 'PENDING', // 等待中
  PROCESSING = 'PROCESSING', // 处理中
  SUCCESS = 'SUCCESS', // 成功
  FAILURE = 'FAILURE', // 失败
}

export enum UtilityHistoryState {
  PENDING = 'PENDING', // 等待中
  PROCESSING = 'PROCESSING', // 处理中
  SUCCESS = 'SUCCESS', // 成功
  FAILURE = 'FAILURE', // 失败
}

export type UtilityHistory = {
  id: string
  task_id: string
  task_type: string
  label: string
  title: string
  createDate: string
  updateDate: string
  state: UtilityHistoryState
  action: (utilityHistory: UtilityHistory) => void
}

export type UtilityHistoryKey = keyof UtilityHistory

// Utility的通用结果文件
export type UtilityUploadResult = {
  name?: string
  fileID: string
  id: string
  mime_type: string
  extension: BuiltInTrajectoryFormat
}

export type UtilityResultShow = {
  id: string
  name: string
  visible: boolean
  display?: boolean
}

export type UtilityResult = {
  created_at: string
  id: string
  result: string
  status: UtilityTaskState
  task_name: string
  updated_at: string
}

export type UtilityWebSockingData = {
  id: string
  data: any
}

export type UtilityMolstar = {
  id: string
  visible: boolean
}

// History
export type HistoryFile = {
  file_id: string
}

export type HistoryTask = {
  task_id: string
  task_type: string
}
