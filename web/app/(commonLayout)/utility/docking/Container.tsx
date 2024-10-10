import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext as useContext1 } from 'use-context-selector'
import type { FieldValues } from 'react-hook-form'
import style from './Container.module.css'
import Result from './Result'
import type { CenterPosition } from '@/types/docking'
import { DockingModeEnum } from '@/types/docking'
import cn from '@/utils/classnames'
import InputForm from '@/app/(commonLayout)/utility/docking/Input/InputForm'
import { InputContext } from '@/app/(commonLayout)/utility/docking/Input/context'
import { ToastContext } from '@/app/components/base/toast'
import { submitDockingTask } from '@/service/docking'
import { ResultContext } from '@/app/(commonLayout)/utility/docking/Result/context'
import useMolstar from '@/app/(commonLayout)/utility/docking/hooks/useMolstar'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import useReceptor from '@/app/(commonLayout)/utility/docking/hooks/useReceptor'
import useLigand from '@/app/(commonLayout)/utility/docking/hooks/useLigand'

const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Container = () => {
  const [mode, setMode] = useState<DockingModeEnum>(DockingModeEnum.input)
  const [result, setResult] = useState<string>('')
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const { notify } = useContext1(ToastContext)
  const { MolstarRef, dockingMolstarList, addStructure, loadStructureFromUrl, loadStructureFromData, setStructureVisibility, clear } = useMolstar()
  const { receptorFileList, setReceptorFileList, clearReceptorFileList } = useReceptor()
  const { ligandFileList, setLigandFileList, clearLigandFileList } = useLigand()
  const [centerPosition, setCenterPosition] = useState<CenterPosition>({})
  const handleSubmit = async (data: FieldValues) => {
    console.log(data)
    setSubmitLoading(true)
    try {
      const res: any = await submitDockingTask(data)
      setResult(res.result)
      setSubmitLoading(false)
      notify({ type: 'success', message: 'Task parsing successful' })
      if (res.result)
        setMode(DockingModeEnum.result)
    }
    catch (error) {
      setResult('')
      setSubmitLoading(false)
    }
  }
  const handleReset = () => {
    clear()
    clearReceptorFileList()
    clearLigandFileList()
    setResult('')
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
          <MolstarContext.Provider value={{ addStructure, dockingMolstarList, loadStructureFromUrl, loadStructureFromData, setStructureVisibility }}>
            <InputContext.Provider value={{ receptorFileList, setReceptorFileList, ligandFileList, setLigandFileList, centerPosition, setCenterPosition }}>
              <InputForm onSubmit={handleSubmit} onReset={handleReset} submitLoading={submitLoading} isDisabled={!(DockingModeEnum.input === mode)} />
            </InputContext.Provider>
            <ResultContext.Provider value={{ receptorFileList, ligandFileList, setReceptorFileList, setLigandFileList, resultData: result }}>
              <Result isDisabled={!(DockingModeEnum.result === mode)}/>
            </ResultContext.Provider>
          </MolstarContext.Provider>
        </div>
      </div>
      <div className="grow relative w-full h-full"><Molstar wrapperRef={MolstarRef} onFocusCenter={(center) => {
        // notify({ type: 'success', message: `中心点: ${center}` })
        if (center) {
          const { x, y, z, num, chain } = center
          setCenterPosition({ x, y, z, num, chain })
        }
      }}/></div>
    </div>
  </>)
}

export default Container
