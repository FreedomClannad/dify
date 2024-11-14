import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext as useContextSelector } from 'use-context-selector'
import type { PoseviewFormValues } from './Input'
import PoseviewInput from './Input'
import PoseviewResult from './Result'
import { MolstarContext, OutputContext, PoseviewContext } from './context'
import useMolstar from '@/app/hooks/useMolstar'
import InputResultRowLayout from '@/app/components/layout/input-result-row-layout'
import { LayoutModeEnum } from '@/types/components'
import useReceptor from '@/app/(commonLayout)/utility/poseview/hooks/useReceptor'
import useLigand from '@/app/(commonLayout)/utility/poseview/hooks/useLigand'
import { submitPoesviewTask } from '@/service/utility'
import useMemory from '@/app/hooks/useMemory'
import type { UtilityWebSockingData } from '@/types/utility'
import { UtilityTaskState } from '@/types/utility'
import { ToastContext } from '@/app/components/base/toast'
import { UtilityPubSub } from '@/pubsub'
import useUtilityResult from '@/app/hooks/useUtilityResult'
const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Poseview = () => {
  const { notify } = useContextSelector(ToastContext)
  const [mode, setMode] = useState<LayoutModeEnum>(LayoutModeEnum.input)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)

  const inputDisabled = useMemo(() => {
    return !(LayoutModeEnum.input === mode)
  }, [mode])
  const resultDisabled = useMemo(() => {
    return !(LayoutModeEnum.result === mode)
  }, [mode])

  const receptorHooks = useReceptor()
  const { getReceptorUploadResult, addReceptorResultShow } = receptorHooks

  const ligandHooks = useLigand()
  const { getLigandUploadResult, addLigandResultShow, updateLigandFilesIds } = ligandHooks
  const molstartHooks = useMolstar()
  const { MolstarRef, getStructure } = molstartHooks

  const utilityResultHooks = useUtilityResult()
  const { setResultData, setResultTaskId } = utilityResultHooks

  // 提交的缓存数据
  const { addSubmitMemory, getSubmitMemory, clearSubmitMemory } = useMemory()

  const dataCollating = (poseview: UtilityWebSockingData) => {
    try {
      const { id, data } = poseview
      const memory = getSubmitMemory(id)
      if (memory) {
        const { status, result } = data
        if (status === UtilityTaskState.SUCCESS) {
          setResultData(result)
          const resId = data.id
          if (resId)
            setResultTaskId(resId)

          setSubmitLoading(false)
          notify({ type: 'success', message: 'Task parsing successful' })

          const { values } = memory
          const { receptor_file_id, ligand_file_ids } = values
          if (receptor_file_id) {
            const id = receptor_file_id
            const result = getReceptorUploadResult(id)
            const molstart = getStructure(id)
            if (result && molstart) {
              const { name = '' } = result
              const { visible } = molstart
              addReceptorResultShow({ id, name, visible, display: true })
            }
          }

          if (ligand_file_ids) {
            updateLigandFilesIds(ligand_file_ids)
            const id = ligand_file_ids
            const result = getLigandUploadResult(id)
            if (result) {
              const { name = '' } = result
              addLigandResultShow({ id, name, visible: false, display: true })
            }
          }

          if (result)
            setMode(LayoutModeEnum.result)
        }
        else if (status === UtilityTaskState.FAILURE) {
          setSubmitLoading(false)
          notify({ type: 'error', message: `Task parsing failed, reason: ${result}` })
        }
      }
      else {
        const { data } = poseview
        const { task_name, status, result } = data
        if (status === UtilityTaskState.SUCCESS)
          notify({ type: 'success', message: `${task_name} task parsing successful` })
        else if (status === UtilityTaskState.FAILURE)
          notify({ type: 'error', message: `${task_name} task parsing failed, reason: ${result}` })
      }
    }
    catch (error) {
      setSubmitLoading(false)
    }
  }

  // 提交
  const handleSubmit = async (data: PoseviewFormValues) => {
    setSubmitLoading(true)
    try {
      const res = await submitPoesviewTask(data)
      const { id } = res
      addSubmitMemory({ id, values: data })
    }
    catch (error) {
      setSubmitLoading(false)
    }
  }

  // 重置
  const handleReset = () => {
    clearSubmitMemory()
  }

  const left = () => {
    return <>
      <MolstarContext.Provider value={{ ...molstartHooks }}>
        <PoseviewContext.Provider value={{ ...receptorHooks, ...ligandHooks }}>
          <PoseviewInput disabled={inputDisabled} onSubmit={handleSubmit} onReset={handleReset} submitLoading={submitLoading}/>
          <OutputContext.Provider value={{ ...utilityResultHooks }}>
            <PoseviewResult disabled={resultDisabled} />
          </OutputContext.Provider>
        </PoseviewContext.Provider>
      </MolstarContext.Provider>
    </>
  }
  const right = () => {
    return <>
      <Molstar wrapperRef={MolstarRef}></Molstar>
    </>
  }
  useEffect(() => {
    UtilityPubSub.subscribe('PoseviewResult', dataCollating)
    return () => {
      UtilityPubSub.unsubscribe('PoseviewResult', dataCollating)
    }
  }, [])
  return <>
    <InputResultRowLayout
      mode={mode}
      onModeChange={(mode: LayoutModeEnum) => {
        setMode(mode)
      }}
      outputDisplay={true}
      left={left()}
      right={right()}
    />
  </>
}

export default Poseview
