'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useContext as useContext1 } from 'use-context-selector'
import { useSearchParams } from 'next/navigation'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import Result from '@/app/(commonLayout)/utility/docking/Pocket/Result'
import { ToastContext } from '@/app/components/base/toast'
import useMolstar from '@/app/(commonLayout)/utility/docking/hooks/useMolstar'
import usePocketReceptor from '@/app/(commonLayout)/utility/docking/Pocket/hooks/usePocketReceptor'
import usePocketLigand from '@/app/(commonLayout)/utility/docking/Pocket/hooks/usePocketLigand'
import useCropReceptor from '@/app/(commonLayout)/utility/docking/Pocket/hooks/useCropReceptor'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { ResultContext } from '@/app/(commonLayout)/utility/docking/Pocket/context/PocketOutputContext'
import type { HistoryTask } from '@/types/utility'
import { getFileInfo, getPocketHistory } from '@/service/utility'

const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Container = () => {
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
  const [globalId, setGlobalId] = useState<string>('')
  const [globalType, setGlobalType] = useState<string>('')
  const searchParams = useSearchParams()

  // Pocke
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

  const initData = async (query: HistoryTask) => {
    // 这里编写向后端请求数据
    const data = await getPocketHistory(query)
    const { id, pdb_file_id, result, ligand_file_ids, remove_ligand_file_id } = data

    // Input 数据结果
    // Receptor
    getFileInfo({ file_id: pdb_file_id }).then((res) => {
      const { id, name, mime_type, extension } = res
      addPocketReceptorUploadResultFile({ id, mime_type, extension: extension as BuiltInTrajectoryFormat, name, fileID: id })
      addPocketReceptorResultInputFile({ id, name, visible: true, display: true })
    })

    // Ligand 数据集结果
    const promise = ligand_file_ids.map(id => getFileInfo({ file_id: id }))
    Promise.all(promise).then((res) => {
      const ids = res.map((item) => {
        const { id, name } = item
        addPocketLigandResultInputFile({ id, name, visible: false, display: true })
        return id
      }).join(',')
      updatePocketLigandFilesIds(ids)
    })

    // remove_ligand
    if (remove_ligand_file_id) {
      getFileInfo({ file_id: remove_ligand_file_id }).then((res) => {
        const { id, name, mime_type, extension } = res
        addCropReceptorResult({ fileID: id, id, extension: extension as BuiltInTrajectoryFormat, name, mime_type })
        addCropRecepResultInputFile({ id, name, visible: false, display: true })
      })
    }

    // Output 数据结果
    setPocketResultId(id)
    setResult(result)
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
    return <>
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
        <Result isDisabled={false}/>
      </ResultContext.Provider>
    </>
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
      <div className="grow relative w-full h-full"><Molstar wrapperRef={MolstarRef}/></div>
    </div>
  </>)
}

export default Container
