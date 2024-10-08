import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import { useContext as useContext1 } from 'use-context-selector'
import type { FieldValues } from 'react-hook-form'
import style from './Container.module.css'
import Result from './Result'
import type { CenterPosition } from '@/types/docking'
import { DockingModeEnum } from '@/types/docking'
import cn from '@/utils/classnames'
import InputForm from '@/app/(commonLayout)/tools/docking/Input/InputForm'
import type { MolstarHandle } from '@/app/components/Molstar'
import { InputContext } from '@/app/(commonLayout)/tools/docking/Input/context'
import { ToastContext } from '@/app/components/base/toast'
import { submitDockingTask } from '@/service/docking'
import { ResultContext } from '@/app/(commonLayout)/tools/docking/Result/context'
const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Container = () => {
  const [mode, setMode] = useState<DockingModeEnum>(DockingModeEnum.input)
  const [result, setResult] = useState<string>('')
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const { notify } = useContext1(ToastContext)
  const MolstarCompRef = useRef<MolstarHandle>(null)
  const [centerPosition, setCenterPosition] = useState<CenterPosition>({})
  const handleClick = () => {
    if (MolstarCompRef.current) {
      MolstarCompRef.current.loadStructureFromUrl(
        'http://127.0.0.1:5500/ligand-dock.sdf',
        'sdf',
      )
    }
  }
  const loadUrl = (url: string, formats: BuiltInTrajectoryFormat) => {
    if (MolstarCompRef.current) {
      console.log(url)
      MolstarCompRef.current.loadStructureFromUrl(
        url,
        formats as BuiltInTrajectoryFormat,
      )
    }
  }
  const handleSubmit = async (data: FieldValues) => {
    console.log(data)
    setSubmitLoading(true)
    const res: any = await submitDockingTask(data)
    setResult(res.result)
    setSubmitLoading(false)
  }
  const getCenter = () => {
    if (MolstarCompRef.current) {
      const center = MolstarCompRef.current.getCenter()
      console.log(`获取中心点坐标:${center}`)
    }
  }
  return (<>
    <div className="flex h-full bg-white border-t border-gray-200 overflow-hidden">
      <div className="flex flex-col w-fit sm:w-[400px] shrink-0 border-gray-550 border-r h-full">
        <div className="border-gray-550 border-b">
          <div className="flex items-center justify-center">
            <div className={cn(mode === DockingModeEnum.input && style.mode, 'h-[44px] flex items-center justify-center cursor-pointer relative px-4 after:bg-primary-1001')} onClick={() => {
              setMode(DockingModeEnum.input)
            }}>
              <span>Inputs</span>
            </div>
            <div className={cn(mode === DockingModeEnum.result && style.mode, 'ml-10 h-[44px] flex items-center justify-center cursor-pointer relative px-4 after:bg-primary-1001')} onClick={() => {
              setMode(DockingModeEnum.result)
            }}>
              <span>Results</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <InputContext.Provider value={{ loadUrl, centerPosition, setCenterPosition }}>
            <InputForm onSubmit={handleSubmit} submitLoading={submitLoading} isDisabled={!(DockingModeEnum.input === mode)} />
          </InputContext.Provider>
          <ResultContext.Provider value={{ resultData: result }}>
            {DockingModeEnum.result === mode && <Result />}
          </ResultContext.Provider>
        </div>
      </div>
      <div className="grow relative w-full h-full"><Molstar wrapperRef={MolstarCompRef} onFocusCenter={(center) => {
        console.log(center)
        notify({ type: 'success', message: `中心点: ${center}` })
        if (center) {
          const [x, y, z] = center
          setCenterPosition({ x, y, z })
        }
      }}/></div>
    </div>
  </>)
}

export default Container
