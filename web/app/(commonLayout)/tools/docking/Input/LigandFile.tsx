import { useState } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import UploadCard from '@/app/components/upload/upload-card'
import type { FileItem } from '@/models/datasets'

const LigandFile = () => {
  const [fileList, setFileList] = useState<FileItem[]>([])

  return <>
    <VerticalTitleCard title="Ligand file" tooltip="Ligand filetootltip">
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

export default LigandFile
