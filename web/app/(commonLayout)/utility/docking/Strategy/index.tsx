import { useMemo } from 'react'
import { Radio, RadioGroup } from '@nextui-org/react'
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
      <RadioGroup value={strategy} onValueChange={(value) => {
        handleClick(value as DockingStrategyEnum)
      }} orientation="horizontal">
        {
          strategyList.map(({ key, value }, index) => {
            return <Radio key={key} size="sm" className={cn(index > 0 && 'ml-2')} value={key}>{value}</Radio>
          })
        }
      </RadioGroup>
    </div>
  </VerticalTitleCard>
}

export default Strategy
