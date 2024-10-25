export enum UtilityHistoryState {
  PENDING = 'PENDING', // 等待中
  PROCESSING = 'PROCESSING', // 处理中
  SUCCESS = 'SUCCESS', // 成功
  FAILURE = 'FAILURE', // 失败
}

export type UtilityHistory = {
  id: string
  label: string
  title: string
  createDate: string
  updateDate: string
  state: UtilityHistoryState
  action: () => void
}

export type UtilityHistoryKey = keyof UtilityHistory
