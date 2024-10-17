import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext as useContext1 } from 'use-context-selector'
import type { FieldValues } from 'react-hook-form'
import style from './Container.module.css'
import type { CenterPosition } from '@/types/docking'
import { DockingModeEnum, DockingStrategyEnum } from '@/types/docking'
import cn from '@/utils/classnames'
import { ToastContext } from '@/app/components/base/toast'
import { GlobalUpload, submitDockingTask } from '@/service/docking'
import useMolstar from '@/app/(commonLayout)/utility/docking/hooks/useMolstar'
import useReceptor from '@/app/(commonLayout)/utility/docking/hooks/useReceptor'
import useLigand from '@/app/(commonLayout)/utility/docking/hooks/useLigand'
import useCropReceptor from '@/app/(commonLayout)/utility/docking/hooks/useCropReceptor'
import useStrategy from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { InputContext } from '@/app/(commonLayout)/utility/docking/Input/context'
import InputForm from '@/app/(commonLayout)/utility/docking/Input/InputForm'
import { ResultContext } from '@/app/(commonLayout)/utility/docking/Result/context'
import Result from '@/app/(commonLayout)/utility/docking/Result'
import { GlobalInputContext } from '@/app/(commonLayout)/utility/docking/Global/Context/GlobalInputContext'
import GlobalInput from '@/app/(commonLayout)/utility/docking/Global/Input'
import useGlobalReceptor from '@/app/(commonLayout)/utility/docking/Global/hooks/useGlobalReceptor'
import useGlobalLigand from '@/app/(commonLayout)/utility/docking/Global/hooks/useGlobalLigand'
import GlobalResult from '@/app/(commonLayout)/utility/docking/Global/Result'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/Context/GlobalOutputContext'

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
  const { ligandFileList, setLigandFileList, clearLigandFileList, ligandResultFileList, addLigandResultFileList, getLigandResultFileById } = useLigand()
  const { cropReceptorList, clearCropReceptorList, getCropReceptorById, addCropReceptor } = useCropReceptor()
  const { StrategyMap, strategy, setStrategy } = useStrategy()
  const [centerPosition, setCenterPosition] = useState<CenterPosition>({})
  // Global
  const { globalReceptorFileList, setGlobalReceptorFileList } = useGlobalReceptor()
  const { globalLigandFileList, setGlobalLigandFileList, addGlobalLigandResultFileList, getGlobalLigandResultFileById } = useGlobalLigand()
  const handleGlobalSubmit = async (data: FieldValues) => {
    console.log(data)
    const submit_data = Object.assign({}, data)
    if (data.receptor_value) {
      const n_form = new FormData()
      n_form.append('file_content', data.receptor_value)
      const receptorList = await GlobalUpload(n_form, 'fasta')
      if (receptorList.length > 0) {
        // 遍历数组，将id拼接成字符串
        submit_data.fasta_file_id = receptorList.map((item: any) => item.id).join(',')
      }
    }
    if (data.ligand_value) {
      const n_form = new FormData()
      n_form.append('file_content', data.ligand_value)
      const receptorList = await GlobalUpload(n_form, 'ligand')
      if (receptorList.length > 0) {
        // 遍历数组，将id拼接成字符串
        submit_data.ligand_file_ids = receptorList.map((item: any) => item.id).join(',')
      }
    }
    console.log(submit_data)
  }
  const handlePocketSubmit = async (data: FieldValues) => {
    console.log(data)
    setSubmitLoading(true)
    try {
      const res: any = await submitDockingTask(data)
      console.log(res)
      setResult(res.result)
      setSubmitLoading(false)
      notify({ type: 'success', message: 'Task parsing successful' })
      if (res.result)
        setMode(DockingModeEnum.result)
      if (res.remove_ligand_file && res.remove_ligand_file.id)
        addCropReceptor({ fileID: res.remove_ligand_file.id, id: res.remove_ligand_file.id, extension: res.remove_ligand_file.extension, mime_type: res.remove_ligand_file.mime_type, name: res.remove_ligand_file.name })
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
    clearCropReceptorList()
    setResult('')
  }
  const Content = () => {
    if (strategy === DockingStrategyEnum.global) {
      return <>
        <GlobalInputContext.Provider value={{ globalReceptorFileList, setGlobalReceptorFileList, globalLigandFileList, setGlobalLigandFileList, StrategyMap, strategy, setStrategy, addGlobalLigandResultFileList }}>
          <GlobalInput onSubmit={handleGlobalSubmit} onReset={handleReset} isDisabled={!(DockingModeEnum.input === mode)} />
        </GlobalInputContext.Provider>
        <GlobalResultContext.Provider value={{ receptorFileList: globalReceptorFileList, setReceptorFileList: setGlobalReceptorFileList, ligandFileList: globalLigandFileList, setLigandFileList: setGlobalLigandFileList, getLigandResultFileById: getGlobalLigandResultFileById }}>
          <GlobalResult isDisabled={!(DockingModeEnum.result === mode)} />
        </GlobalResultContext.Provider>

      </>
    }

    if (strategy === DockingStrategyEnum.pocket) {
      return <>
        <InputContext.Provider value={{ receptorFileList, setReceptorFileList, ligandFileList, setLigandFileList, centerPosition, setCenterPosition, ligandResultFileList, addLigandResultFileList, setStrategy, strategy, StrategyMap }}>
          <InputForm onSubmit={handlePocketSubmit} onReset={handleReset} submitLoading={submitLoading} isDisabled={!(DockingModeEnum.input === mode)} />
        </InputContext.Provider>
        <ResultContext.Provider value={{ receptorFileList, ligandFileList, setReceptorFileList, setLigandFileList, resultData: result, getLigandResultFileById, cropReceptorList, getCropReceptorById }}>
          <Result isDisabled={!(DockingModeEnum.result === mode)}/>
        </ResultContext.Provider>
      </>
    }

    return null
  }
  return (<>
    <div className="flex h-full bg-white border-t border-gray-200 overflow-hidden">
      <div className="flex flex-col w-fit sm:w-[410px] shrink-0 border-gray-550 border-r h-full">
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
            {Content()}
          </MolstarContext.Provider>
        </div>
      </div>
      <div className="grow relative w-full h-full"><Molstar wrapperRef={MolstarRef} onFocusCenter={(center) => {
        // notify({ type: 'success', message: `中心点: ${center}` })
        if (center) {
          const { x, y, z, num, chain, label } = center
          setCenterPosition({ x, y, z, num, chain, label })
        }
      }}/></div>
    </div>
  </>)
}

export default Container
