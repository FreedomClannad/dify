import { useContext, useState } from 'react'
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { v4 as uuid4 } from 'uuid'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/context/GlobalOutputContext'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import CardLine from '@/app/(commonLayout)/utility/docking/components/CardLine'
import Tooltip from '@/app/components/base/tooltip'
import ModalImage from '@/app/(commonLayout)/utility/docking/components/ModalImage'
import type { SVGPreview } from '@/types/docking'
import { getLigandFileRenderList } from '@/service/docking'

const GlobalInputFile = () => {
  const {
    globalReceptorResultInputFileList,
    globalLigandResultInputFileList,
    getGlobalLigandUploadResultFile,
    updateGlobalLigandResultInputFile,
    globalLigandFilesIds,
  } = useContext(GlobalResultContext)
  const { setStructureVisibility, loadStructureFromUrl } = useContext(MolstarContext)
  const [previewData, setPreviewData] = useState<SVGPreview[]>([])
  const [isShow, setIsShow] = useState<boolean>(false)
  const [ligandIdStorage, setLigandIdStorage] = useState<string>('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)

  // const receptorList: DockingInputFile[] = useMemo(() => {
  //   const newList: DockingInputFile[] = []
  //   return newList
  // }, [globalReceptorInputFileList, dockingMolstarList])
  // const handleLigandClick = (dockingInputFile: DockingInputFile) => {
  //   const { id, visible } = dockingInputFile
  //   const dockingResultFile = getGlobalLigandUploadResultFile(id)
  //   if (dockingResultFile) {
  //     const n_visible = !visible
  //     const n_docking = { ...dockingInputFile, visible: n_visible }
  //     updateGlobalLigandResultInputFile(n_docking)
  //     setStructureVisibility({
  //       dockingMolstar: { id: dockingInputFile.id, visible: n_visible },
  //       addCallback: () => {
  //         const { id, mime_type, extension } = dockingResultFile
  //         loadStructureFromUrl(getDockingFileURL({ id, mime_type }), extension)
  //       },
  //     })
  //   }
  // }
  const handleLigandClick = async () => {
    if (globalLigandFilesIds && globalLigandFilesIds === ligandIdStorage) {
      setIsShow(true)
      return
    }

    if (globalLigandFilesIds && globalLigandFilesIds !== ligandIdStorage) {
      setModalLoading(true)
      setIsShow(true)
      const data = await getLigandFileRenderList(globalLigandFilesIds)
      const newList: SVGPreview[] = []
      data && data.forEach((item) => {
        newList.push({
          id: uuid4(),
          svg: item,
        })
      })
      setPreviewData(newList)
      setLigandIdStorage(globalLigandFilesIds)
      setModalLoading(false)
    }
  }
  return <>
    <VerticalTitleCard title="Global docking input file">
      <div className="w-full docking-input-file">
        {
          (globalReceptorResultInputFileList.length === 0 && globalLigandResultInputFileList.length === 0)
            ? <>
              <div className="w-full flex justify-center items-center rounded h-[100px] leading-[40px] shadow-md">
                <span>No data</span>
              </div>
            </>
            : <>
              {
                globalReceptorResultInputFileList.map((item, index) => {
                  return <CardLine key={`receptro-${index}`} {...item}/>
                })
              }
              {
                globalLigandResultInputFileList.map((item, index) => {
                  return <CardLine
                    key={`ligand-${index}`}
                    {...item}
                    icon={globalLigandFilesIds ? <Tooltip popupContent="Ligand的上传的内容显示"> <div className="w-4 h-4 text-gray-500 cursor-pointer" onClick={handleLigandClick}><DocumentMagnifyingGlassIcon /></div></Tooltip> : null}
                  />
                })
              }
            </>
        }

      </div>
    </VerticalTitleCard>
    <ModalImage isShow={isShow} onClose={() => { setIsShow(false) }} title="Preview" data={previewData} loading={modalLoading} />
  </>
}

export default GlobalInputFile
