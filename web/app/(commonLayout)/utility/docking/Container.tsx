import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext as useContext1 } from 'use-context-selector'
import type { FieldValues } from 'react-hook-form'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import style from './Container.module.css'
import Result from '@/app/(commonLayout)/utility/docking/Pocket/Result'
import type { CenterPosition } from '@/types/docking'
import { DockingModeEnum, DockingStrategyEnum } from '@/types/docking'
import cn from '@/utils/classnames'
import { ToastContext } from '@/app/components/base/toast'
import { GlobalUpload, submitDockingTask, submitGlobalDockingTask } from '@/service/docking'
import useMolstar from '@/app/(commonLayout)/utility/docking/hooks/useMolstar'
import usePocketReceptor from '@/app/(commonLayout)/utility/docking/Pocket/hooks/usePocketReceptor'
import usePocketLigand from '@/app/(commonLayout)/utility/docking/Pocket/hooks/usePocketLigand'
import useCropReceptor from '@/app/(commonLayout)/utility/docking/Pocket/hooks/useCropReceptor'
import useStrategy from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { InputContext } from '@/app/(commonLayout)/utility/docking/Pocket/context/PocketInputContext'
import InputForm from '@/app/(commonLayout)/utility/docking/Pocket/Input/InputForm'
import { ResultContext } from '@/app/(commonLayout)/utility/docking/Pocket/context/PocketOutputContext'
import { GlobalInputContext } from '@/app/(commonLayout)/utility/docking/Global/context/GlobalInputContext'
import GlobalInput from '@/app/(commonLayout)/utility/docking/Global/Input'
import useGlobalReceptor from '@/app/(commonLayout)/utility/docking/Global/hooks/useGlobalReceptor'
import useGlobalLigand from '@/app/(commonLayout)/utility/docking/Global/hooks/useGlobalLigand'
import GlobalResult from '@/app/(commonLayout)/utility/docking/Global/Result'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/context/GlobalOutputContext'
import { formats } from '@/app/(commonLayout)/utility/docking/Pocket/Input/commin'

const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Container = () => {
  const [mode, setMode] = useState<DockingModeEnum>(DockingModeEnum.input)

  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const { notify } = useContext1(ToastContext)
  const {
    MolstarRef,
    dockingMolstarList,
    addStructure,
    getStructure,
    loadStructureFromUrl,
    loadStructureFromData,
    setStructureVisibility,
    clear,
  } = useMolstar()

  const { StrategyMap, strategy, setStrategy } = useStrategy()
  const [centerPosition, setCenterPosition] = useState<CenterPosition>({})
  // Global
  const {
    globalReceptorUploadFileList,
    setGlobalReceptorUploadFileList,
    clearGlobalReceptorFileList,
    globalReceptorResultInputFileList,
    getGlobalReceptorUploadResultFile,
    addGlobalReceptorUploadResult,
    deleteGlobalReceptorUploadResult,
    clearGlobalReceptorUploadResultList,
    addGlobalReceptorResultInputFile,
    clearGlobalReceptorResultInputFile,
  } = useGlobalReceptor()
  const {
    globalLigandUploadFileList,
    setGlobalLigandUploadFileList,
    addGlobalLigandUploadResultFile,
    clearGlobalLigandFileList,
    globalLigandResultInputFileList,
    addGlobalLigandResultInputFile,
    deleteGlobalLigandUploadResultFile,
    clearGlobalLigandUploadResultFileList,
    getGlobalLigandUploadResultFile,
    clearGlobalLigandResultInputFile,
    updateGlobalLigandResultInputFile,
  } = useGlobalLigand()
  const [globalSubmitLoading, setGlobalSubmitLoading] = useState<boolean>(false)
  const [globalResult, setGlobalResult] = useState<string>('')

  // Pocket
  const [result, setResult] = useState<string>('')
  const [pocketResultId, setPocketResultId] = useState<string>('')

  const {
    pocketReceptorUploadFileList,
    setPocketReceptorUploadFileList,
    clearPocketReceptorUploadFileList,
    addPocketReceptorUploadResultFile,
    getPocketReceptorUploadResultFile,
    deletePocketReceptorUploadResultFile,
    clearPocketReceptorUploadResultFileList,
    addPocketReceptorResultInputFile,
    updatePocketReceptorResultInputFile,
    pocketReceptorResultInputFileList,
    clearPocketReceptorResultInputFileList,
  } = usePocketReceptor()

  const {
    pocketLigandUploadFileList,
    setPocketLigandUploadFileList,
    clearPocketLigandUploadFileList,
    addPocketLigandUploadResultFile,
    getPocketLigandUploadResultFile,
    deletePocketLigandUploadResultFile,
    clearPocketLigandUploadResultFileList,
    pocketLigandResultInputFileList,
    addPocketLigandResultInputFile,
    updatePocketLigandResultInputFile,
    clearPocketLigandResultInputFileList,
    pocketLigandFilesIds,
    updatePocketLigandFilesIds,
    clearPocketLigandFilesIds,
  } = usePocketLigand()

  // Pocket Receptor Crop
  const {
    cropReceptorResultList,
    addCropReceptorResult,
    getCropReceptorResult,
    clearCropReceptorResultList,
    cropRecepResultInputList,
    addCropRecepResultInputFile,
    updateCropRecepResultInputFile,
    clearCropRecepResultInputFileList,
  } = useCropReceptor()

  // 全局对接提交
  const handleGlobalSubmit = async (data: FieldValues) => {
    const submit_data = Object.assign({}, data)
    clearGlobalReceptorResultInputFile()
    clearGlobalLigandResultInputFile()
    setGlobalResult('')
    // receptor 为输入模式
    if (data.receptor_mode === 'input') {
      const n_form = new FormData()
      n_form.append('file_content', data.receptor_value)
      const receptorList = await GlobalUpload(n_form, 'fasta')
      if (receptorList.length > 0) {
        // 遍历数组，将id拼接成字符串
        submit_data.fasta_file_id = receptorList.map((item: any) => {
          const { id, name, mime_type, extension } = item
          addGlobalReceptorUploadResult({ id, mime_type, extension, name, fileID: id })
          addGlobalReceptorResultInputFile({ id, name, visible: true, display: false })
          return item.id
        }).join(',')
      }
    }
    else {
      const fasta_file_id = data.fasta_file_id
      const dockingResultFile = getGlobalReceptorUploadResultFile(fasta_file_id)
      if (dockingResultFile) {
        const { id, name = '' } = dockingResultFile
        addGlobalReceptorResultInputFile({ id, name, visible: true, display: false })
      }
    }
    // ligand 为输入模式
    if (data.ligand_mode === 'input') {
      const n_form = new FormData()
      n_form.append('file_content', data.ligand_value)
      const receptorList = await GlobalUpload(n_form, 'ligand')
      if (receptorList.length > 0) {
        // 遍历数组，将id拼接成字符串
        submit_data.ligand_file_ids = receptorList.map((item: any) => {
          const { id, name, mime_type, extension } = item
          const format = (formats[extension as keyof typeof formats] || 'mmcif') as BuiltInTrajectoryFormat
          addGlobalLigandUploadResultFile({ fileID: id, id, mime_type, extension: format })
          addGlobalLigandResultInputFile({ id, name, visible: false, display: true })
          return item.id
        }).join(',')
      }
    }
    else {
      const ligand_file_ids = data.ligand_file_ids
      const ids = ligand_file_ids.split(',')
      ids.forEach((index: string) => {
        const dockingResultFile = getGlobalLigandUploadResultFile(index)
        if (dockingResultFile) {
          const { id, name = '' } = dockingResultFile
          addGlobalLigandResultInputFile({ id, name, visible: false, display: true })
        }
      })
    }
    setGlobalSubmitLoading(true)
    try {
      const res: any = await submitGlobalDockingTask(submit_data)
      setGlobalResult(res.result)
      setGlobalSubmitLoading(false)
      notify({ type: 'success', message: 'Task parsing successful' })
      if (res.result)
        setMode(DockingModeEnum.result)
    }
    catch (error) {
      setGlobalResult('')
      setGlobalSubmitLoading(false)
    }
  }
  // 口袋对决提交
  const handlePocketSubmit = async (data: FieldValues) => {
    setSubmitLoading(true)
    setResult('')
    clearCropReceptorResultList()
    clearCropRecepResultInputFileList()
    try {
      const res: any = await submitDockingTask(data)
      setResult(res.result)
      const resId = res.id
      if (resId)
        setPocketResultId(resId)

      setSubmitLoading(false)
      notify({ type: 'success', message: 'Task parsing successful' })
      const { ligand_file_ids, pdb_file_id } = data
      if (pdb_file_id) {
        const id = pdb_file_id
        const dockingResultFile = getPocketReceptorUploadResultFile(id)
        const dockingMolstar = getStructure(id)
        if (dockingResultFile && dockingMolstar) {
          const { name = '' } = dockingResultFile
          const { visible } = dockingMolstar
          addPocketReceptorResultInputFile({ id, name, visible, display: true })
        }
      }
      if (ligand_file_ids) {
        updatePocketLigandFilesIds(ligand_file_ids)
        const id = ligand_file_ids
        const dockingResultFile = getPocketLigandUploadResultFile(id)
        if (dockingResultFile) {
          const { name = '' } = dockingResultFile
          addPocketLigandResultInputFile({ id, name, visible: false, display: true })
        }
      }

      if (res.result)
        setMode(DockingModeEnum.result)
      if (res.remove_ligand_file && res.remove_ligand_file.id) {
        const id = res.remove_ligand_file.id
        const extension = res.remove_ligand_file.extension
        const mime_type = res.remove_ligand_file.mime_type
        const name = res.remove_ligand_file.name
        addCropReceptorResult({ fileID: id, id, extension, mime_type, name })
        addCropRecepResultInputFile({ id, name, visible: false, display: true })
      }
    }
    catch (error) {
      setResult('')
      setSubmitLoading(false)
    }
  }
  const handleReset = () => {
    // 清除画布
    clear()
    // 清除Pocket的数据
    clearPocketReceptorUploadFileList()
    clearPocketReceptorUploadResultFileList()
    clearPocketReceptorResultInputFileList()
    clearPocketLigandUploadFileList()
    clearPocketLigandUploadResultFileList()
    clearPocketLigandResultInputFileList()
    clearCropReceptorResultList()
    clearCropRecepResultInputFileList()
    clearPocketLigandFilesIds()
    setResult('')

    // 清除Global的数据
    clearGlobalReceptorFileList()
    clearGlobalReceptorUploadResultList()
    clearGlobalReceptorResultInputFile()
    clearGlobalLigandFileList()
    clearGlobalLigandUploadResultFileList()
    clearGlobalLigandResultInputFile()
    setGlobalResult('')
  }
  const Content = () => {
    if (strategy === DockingStrategyEnum.global) {
      return <>
        <GlobalInputContext.Provider value={
          {
            // receptor
            globalReceptorUploadFileList,
            setGlobalReceptorUploadFileList,
            addGlobalReceptorUploadResult,
            deleteGlobalReceptorUploadResult,
            clearGlobalReceptorUploadResultList,

            // ligand
            globalLigandUploadFileList,
            setGlobalLigandUploadFileList,
            addGlobalLigandUploadResultFile,
            clearGlobalLigandUploadResultFileList,
            deleteGlobalLigandUploadResultFile,

            StrategyMap,
            strategy,
            setStrategy,
          }}>
          <GlobalInput onSubmit={handleGlobalSubmit} onReset={handleReset} submitLoading={globalSubmitLoading} isDisabled={!(DockingModeEnum.input === mode)} />
        </GlobalInputContext.Provider>
        <GlobalResultContext.Provider value={
          {
            resultData: globalResult,
            globalReceptorResultInputFileList,
            globalLigandResultInputFileList,
            getGlobalLigandUploadResultFile,
            updateGlobalLigandResultInputFile,
          }}>
          <GlobalResult isDisabled={!(DockingModeEnum.result === mode)} />
        </GlobalResultContext.Provider>

      </>
    }

    if (strategy === DockingStrategyEnum.pocket) {
      return <>
        <InputContext.Provider value={{
          pocketReceptorUploadFileList,
          setPocketReceptorUploadFileList,
          addPocketReceptorUploadResultFile,
          deletePocketReceptorUploadResultFile,
          clearPocketReceptorUploadResultFileList,
          addPocketReceptorResultInputFile,
          clearPocketReceptorResultInputFileList,

          pocketLigandUploadFileList,
          setPocketLigandUploadFileList,
          addPocketLigandUploadResultFile,
          deletePocketLigandUploadResultFile,
          clearPocketLigandUploadResultFileList,
          addPocketLigandResultInputFile,
          clearPocketLigandResultInputFileList,

          setStrategy,
          strategy,
          StrategyMap,

          centerPosition,
          setCenterPosition,

        }}>
          <InputForm onSubmit={handlePocketSubmit} onReset={handleReset} submitLoading={submitLoading} isDisabled={!(DockingModeEnum.input === mode)} />
        </InputContext.Provider>
        <ResultContext.Provider value={{
          resultData: result,
          resultID: pocketResultId,

          pocketReceptorResultInputFileList,
          getPocketReceptorUploadResultFile,
          updatePocketReceptorResultInputFile,

          getPocketLigandUploadResultFile,
          pocketLigandResultInputFileList,
          updatePocketLigandResultInputFile,
          pocketLigandFilesIds,

          cropRecepResultInputList,
          cropReceptorResultList,
          getCropReceptorResult,
          updateCropRecepResultInputFile,
        }}>
          <Result isDisabled={!(DockingModeEnum.result === mode)}/>
        </ResultContext.Provider>
      </>
    }

    return null
  }
  const resultVisible: boolean = useMemo(() => {
    if (strategy === DockingStrategyEnum.global)
      return !!globalResult

    if (strategy === DockingStrategyEnum.pocket)
      return !!result

    return false
  }, [strategy, globalResult, result])

  useEffect(() => {
    if (strategy === DockingStrategyEnum.global) {
      clearGlobalReceptorFileList()
      clearGlobalReceptorUploadResultList()
      clearGlobalReceptorResultInputFile()
      clearGlobalLigandFileList()
      clearGlobalLigandUploadResultFileList()
      clearGlobalLigandResultInputFile()
    }
    if (strategy === DockingStrategyEnum.pocket) {
      clearPocketReceptorUploadFileList()
      clearPocketReceptorUploadResultFileList()
      clearPocketReceptorResultInputFileList()
      clearPocketLigandUploadFileList()
      clearPocketLigandUploadResultFileList()
      clearPocketLigandResultInputFileList()
      clearCropReceptorResultList()
      clearCropRecepResultInputFileList()
      clearPocketLigandFilesIds()
    }
  }, [strategy])
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
            <div className={cn(mode === DockingModeEnum.result && style.mode, 'ml-10 h-[44px] flex items-center justify-center cursor-not-allowed text-gray-1003 relative px-4 after:bg-primary-1001', resultVisible && 'cursor-pointer text-gray-950')} onClick={() => {
              if (resultVisible)
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
