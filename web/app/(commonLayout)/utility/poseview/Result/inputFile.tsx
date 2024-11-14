import { useContext, useMemo, useState } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { MolstarContext, PoseviewContext } from '@/app/(commonLayout)/utility/poseview/context'
import CardLine from '@/app/components/ALM/CardLine'
import { getFileRenderList } from '@/service/utility'
import { createSVGPreviewList } from '@/utils/ALM/utility'
import ModalImage from '@/app/components/ALM/ModalImage'
import type { SVGPreview, UtilityResultShow } from '@/types/utility'
import IconSVG from '@/app/components/iconSVG'

const InputFile = () => {
  const {
    receptorResultShowList,
    ligandResultShowList,
    ligandFilesIds,
    getReceptorUploadResult,
    updateReceptorResultShow,
  } = useContext(PoseviewContext)

  const { setStructureVisibility } = useContext(MolstarContext)

  const [ligandFilesIdsStorage, setLigandFilesIdsStorage] = useState<string>('')

  const [previewData, setPreviewData] = useState<SVGPreview[]>([])
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const isShow = useMemo(() => {
    return receptorResultShowList.length === 0 && ligandResultShowList.length === 0
  }, [receptorResultShowList, ligandResultShowList])

  const handleReceptorClick = (utilityResultShow: UtilityResultShow) => {
    const { id, visible } = utilityResultShow
    const utilityUploadResult = getReceptorUploadResult(id)
    if (utilityUploadResult) {
      const n_visible = !visible
      const n_utilityUploadResult = { ...utilityResultShow, visible: n_visible }
      updateReceptorResultShow(n_utilityUploadResult)
      setStructureVisibility({
        molstar: { id, visible: n_visible },
      })
    }
  }

  const handleLigandClick = async () => {
    if (ligandFilesIds && ligandFilesIds === ligandFilesIdsStorage) {
      setIsModalOpen(true)
      return
    }

    if (ligandFilesIds && ligandFilesIds !== ligandFilesIdsStorage) {
      setModalLoading(true)
      setIsModalOpen(true)
      const data = await getFileRenderList(ligandFilesIds)
      let list: SVGPreview[] = []
      if (data)
        list = createSVGPreviewList(data)
      setPreviewData(list)
      setLigandFilesIdsStorage(ligandFilesIds)
      setModalLoading(false)
    }
  }
  return <>
    <VerticalTitleCard title="Uploaded Files" >
      <div className="w-full docking-input-file">
        {
          isShow
            ? <>
              <div className="w-full flex justify-center items-center rounded h-[100px] leading-[40px] shadow-md">
                <span>No data</span>
              </div>
            </>
            : <>
              {
                receptorResultShowList.map((item, index) => <CardLine key={`receptor-${index}`} {...item} onClick={handleReceptorClick}></CardLine>)
              }
              {
                ligandResultShowList.map((item, index) => <CardLine key={`ligand-${index}`} {...item} icon={ligandFilesIds && (
                  <div className="text-gray-500 cursor-pointer" onClick={handleLigandClick}>
                    <IconSVG name='Preview2D'></IconSVG>
                  </div>
                )}></CardLine>)
              }
            </>
        }
      </div>
    </VerticalTitleCard>
    <ModalImage isShow={isModalOpen} onClose={() => { setIsModalOpen(false) }} title="Preview" data={previewData} loading={modalLoading} />
  </>
}

export default InputFile
