import { UtilityHistoryState } from '@/types/utility'

const getRandomStatus = (): UtilityHistoryState => {
  const statuses = Object.values(UtilityHistoryState)
  const randomIndex = Math.floor(Math.random() * statuses.length)
  return statuses[randomIndex] as UtilityHistoryState
}

const formatDate = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 月份从0开始，需要加1
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
export const getHistoryData = () => {
  const n_list = []
  for (let i = 0; i < 50; i++) {
    n_list.push({
      id: i.toString(),
      task_id: i.toString(),
      task_type: i.toString(),
      label: `Title ${i}`,
      task_names: `Content ${i}`,
      created_at: formatDate(new Date()),
      updated_at: formatDate(new Date()),
      status: getRandomStatus(),
    })
  }
  return n_list
}
