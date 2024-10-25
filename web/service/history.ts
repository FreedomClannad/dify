import { get } from './base'

export const getHistoryList = (params: { page: number; page_size: number }) => {
  return get<{ page: number; limit: number; total: number; data: any }>('/history_task', {
    params,
  })
}
