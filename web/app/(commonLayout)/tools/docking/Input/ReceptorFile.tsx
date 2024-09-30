import { useContext, useState } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import UploadCard from '@/app/components/upload/upload-card'
import type { FileItem } from '@/models/datasets'
import { InputContext } from '@/app/(commonLayout)/tools/docking/Input/context'
import { getCenterPosition } from '@/service/docking'
const ReceptorFile = () => {
  const [fileList, setFileList] = useState<FileItem[]>([])
  const { loadUrl, setCenterPosition } = useContext(InputContext)
  return <>
    <VerticalTitleCard title="Receptor file" tooltip="受体蛋白结构文件，PDB格式。受体蛋白被设置为刚性。格式：PDB">
      <div>
        <UploadCard accept=".pdb" fileList={fileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
          const n_list = list.map((item) => {
            if (item.fileID === fileItem.fileID) {
              const file = item.file
              const { id, mime_type, extension } = file
              if (id && mime_type) {
                loadUrl(`${process.env.NEXT_PUBLIC_API_PREFIX}/molecular-docking/files/${id}?mime_type=${mime_type}`, extension as BuiltInTrajectoryFormat || 'mmcif')
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
          setFileList(n_list)
        }} prepareFileList={(files) => {
          setFileList(files)
        }}/>
      </div>
    </VerticalTitleCard>
  </>
}
export default ReceptorFile
