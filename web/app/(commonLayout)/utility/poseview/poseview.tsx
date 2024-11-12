import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext as useContextSelector } from 'use-context-selector'
import type { PoseviewFormValues } from './Input'
import PoseviewInput from './Input'
import PoseviewResult from './Result'
import { MolstarContext, PoseviewContext } from './context'
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
const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Poseview = () => {
  const { notify } = useContextSelector(ToastContext)
  const [mode, setMode] = useState<LayoutModeEnum>(LayoutModeEnum.input)
  const [submitLoading, setSubmitLoading] = useState<boolean>(false)
  const [result, setResult] = useState<string>('')
  const inputDisabled = useMemo(() => {
    return !(LayoutModeEnum.input === mode)
  }, [mode])
  const resultDisabled = useMemo(() => {
    return !(LayoutModeEnum.result === mode)
  }, [mode])

  const receptorHooks = useReceptor()
  const { receptorUploadFileList } = receptorHooks

  const ligandHooks = useLigand()

  const molstartHooks = useMolstar()
  const { MolstarRef } = molstartHooks

  // 提交的缓存数据
  const { addSubmitMemory, getSubmitMemory, clearSubmitMemory } = useMemory()

  const dataCollating = (poseview: UtilityWebSockingData) => {
    try {
      const { id, data } = poseview
      const memory = getSubmitMemory(id)
      if (memory) {
        const { status, result } = data
        if (status === UtilityTaskState.SUCCESS) {
          setResult(result)
          const resId = data.id
          setSubmitLoading(false)
          notify({ type: 'success', message: 'Task parsing successful' })
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
          <PoseviewResult disabled={resultDisabled} />
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
