import { useContext, useState } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import { v4 as uuid4 } from 'uuid'
import { formats } from './commin'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import UploadCard from '@/app/components/upload/upload-card'
import type { FileItem } from '@/models/datasets'
import { FormContext, PoseviewContext } from '@/app/(commonLayout)/utility/poseview/context'
import ModalImage from '@/app/components/ALM/ModalImage'
import type { SVGPreview } from '@/types/utility'
import { getLigandFileRenderList } from '@/service/docking'
import Tooltip from '@/app/components/base/tooltip'
import IconSVG from '@/app/components/ALM/IconSVG'
const LigandFile = () => {
  const {
    ligandUploadFileList,
    setLigandUploadFileList,
    addLigandUploadResult,
    deleteLigandUploadResult,
  } = useContext(PoseviewContext)
  // const { loadStructureFromUrl, addStructure } = useContext(MolstarContext)
  const { getValues, setValue, errors } = useContext(FormContext)
  const [isShow, setIsShow] = useState<boolean>(false)
  const [previewData, setPreviewData] = useState<SVGPreview[]>([])
  const [ligandIdStorage, setLigandIdStorage] = useState<string>('')
  const [modalLoading, setModalLoading] = useState<boolean>(false)
  const handleOpenPreview = async () => {
    const { ligand_file_ids } = getValues()
    console.log(ligand_file_ids)
    // if (!ligand_file_ids) {
    //   const newList: SVGPreview[] = []
    //   ligandData.forEach((item) => {
    //     newList.push({
    //       id: uuid4(),
    //       svg: item,
    //     })
    //   })
    //   setPreviewData(newList)
    //   setIsShow(true)
    // }

    if (!ligand_file_ids)
      return
    if (ligand_file_ids && ligand_file_ids === ligandIdStorage) {
      setIsShow(true)
      return
    }

    if (ligand_file_ids && ligand_file_ids !== ligandIdStorage) {
      setModalLoading(true)
      setIsShow(true)
      const data = await getLigandFileRenderList(ligand_file_ids)
      const newList: SVGPreview[] = []
      data && data.forEach((item) => {
        newList.push({
          id: uuid4(),
          svg: item,
        })
      })
      setPreviewData(newList)
      setLigandIdStorage(ligand_file_ids)
      setModalLoading(false)
    }
  }
  return <>
    <VerticalTitleCard
      title="Ligand file"
      tooltip="小分子结构文件: SDF 格式。支持多小分子输入，但小分子必须位于蛋白结合口袋中，且与蛋白有潜在相互作用。"
      right={ligandUploadFileList.length > 0 ? <Tooltip popupContent="Ligand的上传的内容显示"> <div className="text-gray-500 cursor-pointer" onClick={handleOpenPreview}><IconSVG name='Preview2D'></IconSVG></div></Tooltip> : null}
    >
      <div>
        <UploadCard uploadURL="/poseview/files/upload?source=ligand" accept=".pdb, .sdf, .mol, mol2" fileList={ligandUploadFileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
          const n_list = list.map((item) => {
            if (item.fileID === fileItem.fileID) {
              const file = item.file
              const { id, mime_type, extension, name } = file

              if (id && mime_type) {
                setValue('ligand_file_ids', id)
                const format = (formats[extension as keyof typeof formats] || 'mmcif') as BuiltInTrajectoryFormat
                addLigandUploadResult({ fileID: id, id, name, mime_type, extension: format })
                // loadStructureFromUrl(`${process.env.NEXT_PUBLIC_API_PREFIX}/molecular-docking/files/${id}?mime_type=${mime_type}`, extension as BuiltInTrajectoryFormat || 'mmcif')
                // addStructure({ id: fileItem.fileID, visible: true })
              }
              return {
                ...item,
                progress,
              }
            }
            return item
          })
          setLigandUploadFileList(n_list)
        }} prepareFileList={(files) => {
          setLigandUploadFileList(files)
          if (files.length === 0) {
            setValue('ligand_file_ids', '')
            setLigandIdStorage('')
          }
        }}
        onUploadError={(file) => {
          const n_list = ligandUploadFileList.filter(item => item.fileID !== file.fileID)
          setLigandUploadFileList(n_list)
          const { id } = file.file
          id && deleteLigandUploadResult(id)
        }}/>
      </div>
      {errors.ligand_file_ids && <div className="mt-1"><span className='text-red-500 '>{errors.ligand_file_ids.message}</span></div>}
    </VerticalTitleCard>
    <ModalImage isShow={isShow} onClose={() => { setIsShow(false) }} title="Preview" data={previewData} loading={modalLoading} />
  </>
}

export default LigandFile
