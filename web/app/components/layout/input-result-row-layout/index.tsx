import type { ReactNode } from 'react'
import { useEffect } from 'react'
import cn from '@/utils/classnames'
import style from '@/app/(commonLayout)/utility/docking/Container.module.css'
import { LayoutModeEnum } from '@/types/components'
type Props = {
  mode: LayoutModeEnum
  onModeChange: (mode: LayoutModeEnum) => void
  outputDisplay: boolean
  left?: ReactNode
  right?: ReactNode
}
const InputResultRowLayout = ({ mode, onModeChange, outputDisplay, left, right }: Props) => {
  useEffect(() => {

  }, [mode])
  return (<>
    <div className="flex h-full bg-white border-t border-gray-200 overflow-hidden">
      <div className="flex flex-col w-fit sm:w-[410px] shrink-0 border-gray-550 border-r h-full">
        <div className="border-gray-550 border-b">
          <div className="flex items-center justify-center">
            <div
              className={cn(mode === LayoutModeEnum.input && style.mode, 'h-[44px] flex items-center justify-center cursor-pointer relative px-4 after:bg-primary-1001')}
              onClick={() => {
                onModeChange(LayoutModeEnum.input)
              }}>
              <span>Input</span>
            </div>
            <div
              className={cn(mode === LayoutModeEnum.result && style.mode, 'ml-10 h-[44px] flex items-center justify-center cursor-not-allowed text-gray-1003 relative px-4 after:bg-primary-1001', outputDisplay && 'cursor-pointer text-gray-950')}
              onClick={() => {
                if (outputDisplay)
                  onModeChange(LayoutModeEnum.result)
              }}>
              <span>Output</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {left}
        </div>
      </div>
      <div className="grow relative w-full h-full">{right} </div>
    </div>

  </>)
}
export default InputResultRowLayout
