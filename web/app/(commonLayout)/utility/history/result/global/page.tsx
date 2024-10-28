'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext as useContext1 } from 'use-context-selector'
import { useSearchParams } from 'next/navigation'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import { ToastContext } from '@/app/components/base/toast'
import useMolstar from '@/app/(commonLayout)/utility/docking/hooks/useMolstar'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import useGlobalReceptor from '@/app/(commonLayout)/utility/docking/Global/hooks/useGlobalReceptor'
import useGlobalLigand from '@/app/(commonLayout)/utility/docking/Global/hooks/useGlobalLigand'
import GlobalResult from '@/app/(commonLayout)/utility/docking/Global/Result'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/context/GlobalOutputContext'
import { getFileInfo, getGlobalHistory } from '@/service/utility'
import type { HistoryTask } from '@/types/utility'

const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Page = () => {
  const { notify } = useContext1(ToastContext)
  const {
    MolstarRef,
    dockingMolstarList,
    addStructure,
    loadStructureFromUrl,
    loadStructureFromData,
    setStructureVisibility,
  } = useMolstar()

  // Global
  const {
    globalReceptorUploadFileList,
    setGlobalReceptorUploadFileList,
    clearGlobalReceptorFileList,
    globalReceptorResultInputFileList,
    getGlobalReceptorUploadResultFile,
    addGlobalReceptorUploadResult,
    addGlobalReceptorResultInputFile,
    globalReceptorFilesIds,
    updateGlobalReceptorFilesIds,
  } = useGlobalReceptor()
  const {
    globalLigandUploadFileList,
    setGlobalLigandUploadFileList,
    addGlobalLigandUploadResultFile,
    globalLigandResultInputFileList,
    addGlobalLigandResultInputFile,
    getGlobalLigandUploadResultFile,
    updateGlobalLigandResultInputFile,
    globalLigandFilesIds,
    updateGlobalLigandFilesIds,
  } = useGlobalLigand()
  const [globalResult, setGlobalResult] = useState<string>('')
  const [globalResultId, setGlobalResultId] = useState<string>('')

  const [globalId, setGlobalId] = useState<string>('')
  const [globalType, setGlobalType] = useState<string>('')
  const searchParams = useSearchParams()
  const initData = async (query: HistoryTask) => {
    // 这里编写向后端请求数据
    const data = await getGlobalHistory(query)
    const { id, fasta_file_id, ligand_file_ids, result } = data
    // Input 数据结果
    // Receptor 数据结果
    getFileInfo({ file_id: fasta_file_id }).then((res) => {
      const { id, name, mime_type, extension } = res
      updateGlobalReceptorFilesIds(id)
      addGlobalReceptorUploadResult({ id, mime_type, extension: extension as BuiltInTrajectoryFormat, name, fileID: id })
      addGlobalReceptorResultInputFile({ id, name, visible: true, display: true })
    })
    // Ligand 数据结果
    const promise = ligand_file_ids.map(id => getFileInfo({ file_id: id }))
    Promise.all(promise).then((res) => {
      const ids = res.map((item) => {
        const { id, name, mime_type, extension } = item
        addGlobalLigandUploadResultFile({ id, mime_type, extension: extension as BuiltInTrajectoryFormat, name, fileID: id })
        addGlobalLigandResultInputFile({ id, name, visible: true, display: true })
        return id
      }).join(',')
      updateGlobalLigandFilesIds(ids)
    })

    // Output 数据结果
    setGlobalResultId(id)
    setGlobalResult(result)
    console.log(data)
  }
  useEffect(() => {
    const id = searchParams.get('id') || ''
    const type = searchParams.get('type') || ''
    setGlobalId(id)
    setGlobalType(type)
    initData({ task_id: id, task_type: type }).then()
    console.log(id)
    console.log(type)
  }, [])

  const Content = () => {
    return <GlobalResultContext.Provider value={
      {
        resultData: globalResult,
        resultID: globalResultId,
        globalReceptorFilesIds,
        globalLigandFilesIds,
        globalReceptorResultInputFileList,
        globalLigandResultInputFileList,
        getGlobalLigandUploadResultFile,
        updateGlobalLigandResultInputFile,
      }}>
      <GlobalResult isDisabled={false} />
    </GlobalResultContext.Provider>
  }
  return (<>
    <div className="flex h-full bg-white border-t border-gray-200 overflow-hidden">
      <div className="flex flex-col w-fit sm:w-[410px] shrink-0 border-gray-550 border-r h-full">
        <div className="flex-1 overflow-y-auto">
          <MolstarContext.Provider value={{ addStructure, dockingMolstarList, loadStructureFromUrl, loadStructureFromData, setStructureVisibility }}>
            {Content()}
          </MolstarContext.Provider>
        </div>
      </div>
      <div className="grow relative w-full h-full"><Molstar wrapperRef={MolstarRef} /></div>
    </div>
  </>)
}

export default Page
