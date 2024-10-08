import { useContext } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import UploadCard from '@/app/components/upload/upload-card'
import type { FileItem } from '@/models/datasets'
import { FormContext, InputContext } from '@/app/(commonLayout)/tools/docking/Input/context'
import { getCenterPosition } from '@/service/docking'
import { MolstarContext } from '@/app/(commonLayout)/tools/docking/context/molstar'
const ReceptorFile = () => {
  const { receptorFileList, setReceptorFileList, setCenterPosition } = useContext(InputContext)
  const { loadStructureFromUrl, addStructure } = useContext(MolstarContext)
  const { setValue } = useContext(FormContext)
  return <>
    <VerticalTitleCard title="Receptor file" tooltip="受体蛋白结构文件，PDB格式。受体蛋白被设置为刚性。格式：PDB">
      <div>
        <UploadCard accept=".pdb" fileList={receptorFileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
          const n_list = list.map((item) => {
            if (item.fileID === fileItem.fileID) {
              const file = item.file
              const { id, mime_type, extension } = file

              if (id && mime_type) {
                setValue('pdb_file_id', id)
                loadStructureFromUrl(`${process.env.NEXT_PUBLIC_API_PREFIX}/molecular-docking/files/${id}?mime_type=${mime_type}`, extension as BuiltInTrajectoryFormat || 'mmcif')
                addStructure({ id: fileItem.fileID, visible: true })
                getCenterPosition(id).then((res) => {
                  const { center_x, center_y, center_z } = res
                  setCenterPosition({ x: center_x, y: center_y, z: center_z })
                })
              }
              return {
                ...item,
                progress,
              }
            }
            return item
          })
          setReceptorFileList(n_list)
        }} prepareFileList={(files) => {
          setReceptorFileList(files)
        }}/>
      </div>
    </VerticalTitleCard>
  </>
}
export default ReceptorFile
