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
      label: `Title ${i}`,
      title: `Content ${i}`,
      createDate: formatDate(new Date()),
      updateDate: formatDate(new Date()),
      state: getRandomStatus(),
    })
  }
  return n_list
}
