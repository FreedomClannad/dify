import { useContext, useState } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import { DocumentMagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { v4 as uuid4 } from 'uuid'
import { formats } from './commin'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import UploadCard from '@/app/components/upload/upload-card'
import type { FileItem } from '@/models/datasets'
import { FormContext, InputContext } from '@/app/(commonLayout)/utility/docking/Pocket/context/PocketInputContext'
import ModalImage from '@/app/(commonLayout)/utility/docking/components/ModalImage'
import type { SVGPreview } from '@/types/docking'
import { getLigandFileRenderList } from '@/service/docking'

const LigandFile = () => {
  const {
    pocketLigandUploadFileList,
    setPocketLigandUploadFileList,
    addPocketLigandUploadResultFile,
    deletePocketLigandUploadResultFile,
    clearPocketLigandUploadResultFileList,
    addPocketLigandResultInputFile,
  } = useContext(InputContext)
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
    if (ligand_file_ids && ligand_file_ids === ligandIdStorage)
      setIsShow(true)

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
      tooltip="上传配体文件，当配体为一个时允许上传SDF，PDB和MOL格式，当配体为多个时（≤2000）只允许上传SDF格式。格式：SDF、Mol、PDB。"
      right={pocketLigandUploadFileList.length > 0 ? <div className="w-4 h-4 text-gray-500 cursor-pointer" onClick={handleOpenPreview}><DocumentMagnifyingGlassIcon /></div> : null}
    >
      <div>
        <UploadCard uploadURL="/molecular-docking/files/upload" accept=".pdb, .sdf, .mol, mol2" fileList={pocketLigandUploadFileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
          const n_list = list.map((item) => {
            if (item.fileID === fileItem.fileID) {
              const file = item.file
              const { id, mime_type, extension, name } = file

              if (id && mime_type) {
                setValue('ligand_file_ids', id)
                const format = (formats[extension as keyof typeof formats] || 'mmcif') as BuiltInTrajectoryFormat
                addPocketLigandUploadResultFile({ fileID: fileItem.fileID, id, mime_type, extension: format })
                addPocketLigandResultInputFile({ id: fileItem.fileID, name, visible: false, display: true })
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
          setPocketLigandUploadFileList(n_list)
        }} prepareFileList={(files) => {
          setPocketLigandUploadFileList(files)
          if (files.length === 0) {
            setValue('ligand_file_ids', '')
            clearPocketLigandUploadResultFileList()
            setLigandIdStorage('')
          }
        }}
        onUploadError={(file) => {
          const n_list = pocketLigandUploadFileList.filter(item => item.fileID !== file.fileID)
          setPocketLigandUploadFileList(n_list)
          deletePocketLigandUploadResultFile(file.fileID)
        }}/>
      </div>
      {errors.ligand_file_ids && <div className="mt-1"><span className='text-red-500 '>{errors.ligand_file_ids.message}</span></div>}
    </VerticalTitleCard>
    <ModalImage isShow={isShow} onClose={() => { setIsShow(false) }} title="Preview" data={previewData} loading={modalLoading} />
  </>
}

export default LigandFile
