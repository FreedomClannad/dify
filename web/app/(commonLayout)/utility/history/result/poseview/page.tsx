'use client'
import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { HistoryTask } from '@/types/utility'
import { getFileInfo, getFileInfoFunction, getHistoryDetailData } from '@/service/utility'
import ResultRowLayout from '@/app/components/layout/result-row-layout'
import useMolstar from '@/app/hooks/useMolstar'
import { MolstarContext, OutputContext, PoseviewContext } from '@/app/(commonLayout)/utility/poseview/context'
import PoseviewResult from '@/app/(commonLayout)/utility/poseview/Result'
import useUtilityResult from '@/app/hooks/useUtilityResult'
import useReceptor from '@/app/(commonLayout)/utility/poseview/hooks/useReceptor'
import useLigand from '@/app/(commonLayout)/utility/poseview/hooks/useLigand'
import { getDockingFileURL } from '@/service/docking'
type PoseviewHistoryResult = {
  id: string
  receptor_file_id: string
  result: string
  ligand_file_ids: string[]
}
const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Container = () => {
  const searchParams = useSearchParams()
  const molstartHooks = useMolstar()
  const { MolstarRef, addStructure, loadStructureFromUrl, setIsMolstarMounted } = molstartHooks

  const receptorHooks = useReceptor()
  const { addReceptorUploadResult, addReceptorResultShow } = receptorHooks

  const ligandHooks = useLigand()
  const { getLigandUploadResult, addLigandResultShow, updateLigandFilesIds } = ligandHooks

  const utilityResultHooks = useUtilityResult()
  const { setResultData, setResultTaskId } = utilityResultHooks

  const initData = async (query: HistoryTask) => {
    const data = await getHistoryDetailData<PoseviewHistoryResult>(query)
    const { id, receptor_file_id, result, ligand_file_ids } = data
    // Receptor
    getFileInfoFunction({ file_id: receptor_file_id }, (res) => {
      const { id, name, mime_type, extension } = res
      addReceptorUploadResult({ id, mime_type, extension: extension as BuiltInTrajectoryFormat, name, fileID: id })
      addReceptorResultShow({ id, name, visible: true, display: true })
      // TODO 这里后面抽取功公共部分
      loadStructureFromUrl(getDockingFileURL({ id, mime_type }), extension as BuiltInTrajectoryFormat)
      addStructure({ id, visible: true })
    })
    // Ligand
    const promiseAll = ligand_file_ids.map(id => getFileInfo({ file_id: id }))
    Promise.all(promiseAll).then((res) => {
      const ids = res.map((item) => {
        const { id, name } = item
        addLigandResultShow({ id, name, visible: false, display: true })
        return id
      }).join(',')
      updateLigandFilesIds(ids)
    })
    setResultTaskId(id)
    setResultData(result)
  }

  useEffect(() => {
    const task_id = searchParams.get('id') || ''
    const task_type = searchParams.get('type') || ''
    initData({ task_id, task_type }).then()
  }, [])

  const left = () => {
    return <>
      <MolstarContext.Provider value={{ ...molstartHooks }}>
        <PoseviewContext.Provider value={{ ...receptorHooks, ...ligandHooks }}>
          <OutputContext.Provider value={{ ...utilityResultHooks }}>
            <PoseviewResult disabled={false} />
          </OutputContext.Provider>
        </PoseviewContext.Provider>
      </MolstarContext.Provider>
    </>
  }

  const right = () => {
    return <>
      <Molstar wrapperRef={MolstarRef} onLoad={() => { setIsMolstarMounted(true) }}></Molstar>
    </>
  }
  return <ResultRowLayout left={left()} right={right()}></ResultRowLayout>
}

export default Container
