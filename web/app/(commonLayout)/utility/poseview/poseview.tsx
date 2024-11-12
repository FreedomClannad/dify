import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import type { PoseviewFormValues } from './Input'
import PoseviewInput from './Input'
import PoseviewResult from './Result'
import { PoseviewContext } from './context'
import InputResultRowLayout from '@/app/components/layout/input-result-row-layout'
import { LayoutModeEnum } from '@/types/components'
import useMolstar from '@/app/(commonLayout)/utility/docking/hooks/useMolstar'
import useReceptor from '@/app/(commonLayout)/utility/poseview/hooks/useReceptor'
import useLigand from '@/app/(commonLayout)/utility/poseview/hooks/useLigand'
const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Poseview = () => {
  const [mode, setMode] = useState<LayoutModeEnum>(LayoutModeEnum.input)
  const inputDisabled = useMemo(() => {
    return !(LayoutModeEnum.input === mode)
  }, [mode])
  const resultDisabled = useMemo(() => {
    return !(LayoutModeEnum.result === mode)
  }, [mode])

  const receptorHooks = useReceptor()
  const { receptorUploadFileList } = receptorHooks

  const ligandHooks = useLigand()

  const {
    MolstarRef,
  } = useMolstar()

  const handleSubmit = (data: PoseviewFormValues) => {
    console.log(data)
  }

  const left = () => {
    return <>
      <PoseviewContext.Provider value={{ ...receptorHooks, ...ligandHooks }}>
        <PoseviewInput disabled={inputDisabled} onSubmit={handleSubmit}/>
        <PoseviewResult disabled={resultDisabled} />
      </PoseviewContext.Provider>
    </>
  }
  const right = () => {
    return <>
      <Molstar wrapperRef={MolstarRef}></Molstar>
    </>
  }
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
