import { useMemo } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import type { DockingStrategyEnum } from '@/types/docking'
import type { StrategyMapType } from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'
import cn from '@/utils/classnames'
type Props = {
  StrategyMap: StrategyMapType
  strategy: DockingStrategyEnum
  setStrategy: (strategy: DockingStrategyEnum) => void
}
const Strategy = ({ StrategyMap, strategy, setStrategy }: Props) => {
  // 将StrategyMap装换成对象数组{key: "", value: ""}
  const strategyList = useMemo(() => {
    return Object.entries(StrategyMap).map(([key, value]) => ({ key, value }))
  }, [StrategyMap])
  const handleClick = (value: DockingStrategyEnum) => {
    setStrategy(value)
  }
  return <VerticalTitleCard title="Strategy" >
    <div className="flex">
      {
        strategyList.map(({ key, value }, index) => {
          return <div key={key} className={cn(index > 0 ? 'ml-2' : '', 'px-5 py-1 bg-gray-1007 rounded cursor-pointer', strategy === key && 'bg-primary-1002')} onClick={() => {
            handleClick(key as DockingStrategyEnum)
          }}>
            <span>{value}</span>
          </div>
        })
      }
    </div>
  </VerticalTitleCard>
}

export default Strategy
