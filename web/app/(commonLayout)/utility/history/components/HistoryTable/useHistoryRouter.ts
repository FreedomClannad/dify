import { useRouter } from 'next/navigation'
import type { UtilityHistory } from '@/types/utility'
export enum historyRouterType {
  GLOBAL_DOCKING = 'GLOBAL_DOCKING',
  POCKET_DOCKING = 'POCKET_DOCKING',
}
export type useHistoryRouterType = {
  [key in historyRouterType]: (utilityHistory: UtilityHistory) => void
}
const useHistoryRouter = (): useHistoryRouterType => {
  const router = useRouter()
  const GLOBAL_DOCKING = (utilityHistory: UtilityHistory) => {
    const { id, task_type } = utilityHistory
    router.push(`/utility/history/result/global?id=${id}&type=${task_type}`)
  }

  const POCKET_DOCKING = (utilityHistory: UtilityHistory) => {
    const { id, task_type } = utilityHistory
    router.push(`/utility/history/result/global?id=${id}&type=${task_type}`)
  }
  return {
    GLOBAL_DOCKING,
    POCKET_DOCKING,
  }
}

export default useHistoryRouter
