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

// History

export type HistoryFile = {
  file_id: string
}

export type HistoryTask = {
  task_id: string
  task_type: string
}
