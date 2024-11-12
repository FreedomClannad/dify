import { useContext } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import { formats } from './commin'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import UploadCard from '@/app/components/upload/upload-card'
import type { FileItem } from '@/models/datasets'
import { FormContext, PoseviewContext } from '@/app/(commonLayout)/utility/poseview/context'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { getDockingFileURL } from '@/service/docking'
const ReceptorFile = () => {
  const {
    receptorUploadFileList,
    setReceptorUploadFileList,
    addReceptorUploadResult,
    deleteReceptorUploadResult,
  } = useContext(PoseviewContext)
  const { loadStructureFromUrl, addStructure } = useContext(MolstarContext)
  const { setValue, errors } = useContext(FormContext)
  const accept = Object.keys(formats).map(key => `.${key}`).join(',')
  return <>
    <VerticalTitleCard title="Receptor file" tooltip="受体蛋白结构文件，PDB格式。受体蛋白被设置为刚性。格式：PDB">
      <div>
        <UploadCard uploadURL="/poseview/files/upload?source=receptor" accept={accept} fileList={receptorUploadFileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
          const n_list = list.map((item) => {
            if (item.fileID === fileItem.fileID) {
              const file = item.file
              const { id, mime_type, extension, name } = file

              if (id && mime_type) {
                setValue('fasta_file_id', id)
                const format = (formats[extension as keyof typeof formats] || 'mmcif') as BuiltInTrajectoryFormat
                loadStructureFromUrl(getDockingFileURL({ id, mime_type }), format)
                addReceptorUploadResult({ id, mime_type, extension: format, name, fileID: id })
                addStructure({ id, visible: true })
                // TODO 屏蔽向后端请求中心点坐标
                // getCenterPosition(id).then((res) => {
                //   const { center_x, center_y, center_z, residue_number, chain } = res
                //   setCenterPosition({ x: center_x, y: center_y, z: center_z, num: residue_number.toString(), chain })
                // })
              }
              return {
                ...item,
                progress,
              }
            }
            return item
          })
          setReceptorUploadFileList(n_list)
        }} prepareFileList={(files) => {
          setReceptorUploadFileList(files)
          if (files.length === 0)
            setValue('fasta_file_id', '')
        }}
        onUploadError={(file) => {
          const n_list = receptorUploadFileList.filter(item => item.fileID !== file.fileID)
          setReceptorUploadFileList(n_list)
          const { id } = file.file
          id && deleteReceptorUploadResult(id)
        }}
        />
      </div>
      {errors.pdb_file_id && <div className="mt-1"><span className='text-red-500 '>{errors.pdb_file_id.message}</span></div>}
    </VerticalTitleCard>
  </>
}
export default ReceptorFile
