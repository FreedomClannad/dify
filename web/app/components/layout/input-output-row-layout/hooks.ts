import { useMemo, useState } from 'react'
import { LayoutModeEnum } from '@/types/components'

export const useInputOutputRowLayoutHooks = () => {
  // 针对显示输入和输出的模式切换
  const [layoutMode, setLayoutMode] = useState<LayoutModeEnum>(LayoutModeEnum.input)
  const isDisplayInput: boolean = useMemo(() => {
    return LayoutModeEnum.input === layoutMode
  }, [layoutMode])
  const isDisplayOutput: boolean = useMemo(() => {
    return LayoutModeEnum.output === layoutMode
  }, [layoutMode])
  const [outputDisabled, setOutputDisabled] = useState<boolean>(true)

  return {
    layoutMode,
    setLayoutMode,
    isDisplayInput,
    isDisplayOutput,
    outputDisabled,
    setOutputDisabled,
  }
}
