import { useState } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import UploadCard from '@/app/components/upload/upload-card'
import type { FileItem } from '@/models/datasets'
const ReceptorFile = () => {
  const [fileList, setFileList] = useState<FileItem[]>([])
  return <>
    <VerticalTitleCard title="Receptor file" tooltip="受体蛋白结构文件，PDB格式。受体蛋白被设置为刚性。格式：PDB">
      <div>
        <UploadCard accept=".pdf, .txt" fileList={fileList} onFileUpdate={() => {
          console.log('上传文件')
        }} prepareFileList={(files) => {
          setFileList(files)
        }}/>
      </div>
    </VerticalTitleCard>
  </>
}
export default ReceptorFile
