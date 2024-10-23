import { useContext, useState } from 'react'
import { v4 as uuid4 } from 'uuid'
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { ResultContext } from '@/app/(commonLayout)/utility/docking/Pocket/context/PocketOutputContext'
import type { DockingInputFile, SVGPreview } from '@/types/docking'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { getDockingFileURL, getLigandFileRenderList } from '@/service/docking'
import CardLine from '@/app/(commonLayout)/utility/docking/components/CardLine'
import ModalImage from '@/app/(commonLayout)/utility/docking/components/ModalImage'
import Tooltip from '@/app/components/base/tooltip'
const PocketInputFile = () => {
  const {
    pocketReceptorResultInputFileList,
    getPocketReceptorUploadResultFile,
    updatePocketReceptorResultInputFile,
    getPocketLigandUploadResultFile,
    pocketLigandResultInputFileList,
    updatePocketLigandResultInputFile,

    cropRecepResultInputList,
    getCropReceptorResult,
    updateCropRecepResultInputFile,
    pocketLigandFilesIds,
  } = useContext(ResultContext)
  const { setStructureVisibility, loadStructureFromUrl } = useContext(MolstarContext)
  const [previewData, setPreviewData] = useState<SVGPreview[]>([])
  const [isShow, setIsShow] = useState<boolean>(false)
  const [ligandIdStorage, setLigandIdStorage] = useState<string>('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const handleReceptorClick = (dockingInputFile: DockingInputFile) => {
    const { id, visible } = dockingInputFile
    const dockingResultFile = getPocketReceptorUploadResultFile(id)
    if (dockingResultFile) {
      const n_visible = !visible
      const n_docking = { ...dockingInputFile, visible: n_visible }
      updatePocketReceptorResultInputFile(n_docking)
      setStructureVisibility({
        dockingMolstar: { id, visible: n_visible },
      })
    }
  }

  // const handleLigandClick = (dockingInputFile: DockingInputFile) => {
  //   const { id, visible } = dockingInputFile
  //   const dockingResultFile = getPocketLigandUploadResultFile(id)
  //   if (dockingResultFile) {
  //     const n_visible = !visible
  //     const n_docking = { ...dockingInputFile, visible: n_visible }
  //     updatePocketLigandResultInputFile(n_docking)
  //     setStructureVisibility({
  //       dockingMolstar: { id, visible: n_visible },
  //       addCallback: () => {
  //         const { id, mime_type, extension } = dockingResultFile
  //         loadStructureFromUrl(getDockingFileURL({ id, mime_type }), extension)
  //       },
  //     })
  //   }
  // }
  const handleLigandClick = async () => {
    if (pocketLigandFilesIds && pocketLigandFilesIds === ligandIdStorage) {
      setIsShow(true)
      return
    }

    if (pocketLigandFilesIds && pocketLigandFilesIds !== ligandIdStorage) {
      setModalLoading(true)
      setIsShow(true)
      const data = await getLigandFileRenderList(pocketLigandFilesIds)
      const newList: SVGPreview[] = []
      data && data.forEach((item) => {
        newList.push({
          id: uuid4(),
          svg: item,
        })
      })
      setPreviewData(newList)
      setLigandIdStorage(pocketLigandFilesIds)
      setModalLoading(false)
    }
  }

  const handleCropReceptorClick = (dockingInputFile: DockingInputFile) => {
    const { id, visible } = dockingInputFile
    const dockingResultFile = getCropReceptorResult(id)
    console.log(dockingResultFile)
    if (dockingResultFile) {
      const n_visible = !visible
      const n_docking = { ...dockingInputFile, visible: n_visible }
      updateCropRecepResultInputFile(n_docking)
      setStructureVisibility({
        dockingMolstar: { id, visible: n_visible },
        addCallback: () => {
          const { id, mime_type, extension } = dockingResultFile
          loadStructureFromUrl(getDockingFileURL({ id, mime_type }), extension)
        },
      })
    }
  }

  return <>
    <VerticalTitleCard title="Pocket docking input file">
      <div className="w-full docking-input-file">
        {
          (pocketReceptorResultInputFileList.length === 0 && pocketLigandResultInputFileList.length === 0)
            ? <>
              <div className="w-full flex justify-center items-center rounded h-[100px] leading-[40px] shadow-md">
                <span>No data</span>
              </div>
            </>
            : <>
              {
                pocketReceptorResultInputFileList.map((item, index) => {
                  return <CardLine key={`receptor-${index}`} {...item} onClick={() => {
                    handleReceptorClick(item)
                  }}/>
                })
              }
              {
                pocketLigandResultInputFileList.map((item, index) => {
                  return <CardLine
                    key={`receptor-${index}`}
                    {...item}
                    icon={pocketLigandFilesIds ? <Tooltip popupContent="Ligand的上传的内容显示"> <div className="w-4 h-4 text-gray-500 cursor-pointer" onClick={handleLigandClick}><DocumentMagnifyingGlassIcon /></div></Tooltip> : null}/>
                })
              }
              {
                cropRecepResultInputList.map((item, index) => {
                  return <CardLine key={`receptor-${index}`} {...item} onClick={() => {
                    handleCropReceptorClick(item)
                  }}/>
                })
              }
            </>
        }

      </div>
    </VerticalTitleCard>
    <ModalImage isShow={isShow} onClose={() => { setIsShow(false) }} title="Preview" data={previewData} loading={modalLoading} />
  </>
}

export default PocketInputFile
