import { useState } from 'react'
import { DockingStrategyEnum } from '@/types/docking'

export const StrategyMap = {
  [DockingStrategyEnum.global]: 'Global Docking',
  [DockingStrategyEnum.pocket]: 'Pocket Docking',
}
export type StrategyMapType = typeof StrategyMap
const useStrategy = () => {
  const [strategy, setStrategy] = useState<DockingStrategyEnum>(DockingStrategyEnum.global)
  return {
    strategy,
    setStrategy,
    StrategyMap,
  }
}

export default useStrategy
