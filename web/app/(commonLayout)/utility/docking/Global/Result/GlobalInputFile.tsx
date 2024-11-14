import { useContext, useState } from 'react'
import { v4 as uuid4 } from 'uuid'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/context/GlobalOutputContext'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import CardLine from '@/app/(commonLayout)/utility/docking/components/CardLine'
import ModalImage from '@/app/components/ALM/ModalImage'
import ModalText from '@/app/components/ALM/ModalText'
import type { SVGPreview } from '@/types/docking'
import { getGlobalReceptorFileContent, getLigandFileRenderList } from '@/service/docking'
import IconSVG from '@/app/components/iconSVG'

const GlobalInputFile = () => {
  const {
    globalReceptorResultInputFileList,
    globalLigandResultInputFileList,
    getGlobalLigandUploadResultFile,
    updateGlobalLigandResultInputFile,
    globalReceptorFilesIds,
    globalLigandFilesIds,
  } = useContext(GlobalResultContext)
  const { setStructureVisibility, loadStructureFromUrl } = useContext(MolstarContext)
  const [previewData, setPreviewData] = useState<SVGPreview[]>([])
  const [isShow, setIsShow] = useState<boolean>(false)
  const [ligandIdStorage, setLigandIdStorage] = useState<string>('')
  const [imgLoading, setImgLoading] = useState<boolean>(false)

  const [receptorText, setReceptorText] = useState<string>('')
  const [isTextShow, setIsTextShow] = useState<boolean>(false)
  const [receptorIdStorage, setReceptorIdStorage] = useState<string>('')
  const [textLoading, setTextLoading] = useState<boolean>(false)

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

  const handleReceptorClick = async () => {
    if (globalReceptorFilesIds && globalReceptorFilesIds === receptorIdStorage) {
      setIsTextShow(true)
      return
    }
    if (globalReceptorFilesIds && globalReceptorFilesIds !== receptorIdStorage) {
      setTextLoading(true)
      setIsTextShow(true)
      const data = await getGlobalReceptorFileContent({ file_id: globalReceptorFilesIds })
      const { file_content } = data
      setReceptorText(file_content)
      setReceptorIdStorage(globalReceptorFilesIds)
      setTextLoading(false)
    }
  }

  const handleLigandClick = async () => {
    if (globalLigandFilesIds && globalLigandFilesIds === ligandIdStorage) {
      setIsShow(true)
      return
    }

    if (globalLigandFilesIds && globalLigandFilesIds !== ligandIdStorage) {
      setImgLoading(true)
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
      setImgLoading(false)
    }
  }
  return <>
    <VerticalTitleCard title="Uploaded Files">
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
                  return <CardLine
                    key={`receptro-${index}`}
                    {...item}
                    name = 'protein sequence'
                    icon={globalReceptorFilesIds
                      ? <div className="w-4 h-4 text-gray-500 cursor-pointer"
                        onClick={handleReceptorClick}><IconSVG name='SeqIcon'></IconSVG></div>
                      : null}
                  />
                })
              }
              {
                globalLigandResultInputFileList.map((item, index) => {
                  return <CardLine
                    key={`ligand-${index}`}
                    {...item}
                    name="ligand to dock"
                    icon={globalLigandFilesIds ? <div className="w-4 h-4 text-gray-500 cursor-pointer" onClick={handleLigandClick}><IconSVG name='Preview2D'></IconSVG></div> : null}
                  />
                })
              }
            </>
        }

      </div>
    </VerticalTitleCard>
    <ModalImage isShow={isShow} onClose={() => { setIsShow(false) }} title="Preview" data={previewData} loading={imgLoading} />
    <ModalText isShow={isTextShow} onClose={() => { setIsTextShow(false) }} title="Preview" text= {receptorText} loading={textLoading} rows={21}/>
  </>
}

export default GlobalInputFile
