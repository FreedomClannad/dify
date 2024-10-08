import { useContext, useState } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import UploadCard from '@/app/components/upload/upload-card'
import type { FileItem } from '@/models/datasets'
import { FormContext } from '@/app/(commonLayout)/tools/docking/Input/context'
import { MolstarContext } from '@/app/(commonLayout)/tools/docking/context/molstar'

const LigandFile = () => {
  const [fileList, setFileList] = useState<FileItem[]>([])
  const { loadStructureFromUrl } = useContext(MolstarContext)
  const { setValue } = useContext(FormContext)
  return <>
    <VerticalTitleCard title="Ligand file" tooltip="Ligand filetootltip">
      <div>
        <UploadCard accept=".pdb, .sdf" fileList={fileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
          const n_list = list.map((item) => {
            if (item.fileID === fileItem.fileID) {
              const file = item.file
              const { id, mime_type, extension } = file
              setValue('ligand_file_ids', id)
              if (id && mime_type)
                loadStructureFromUrl(`${process.env.NEXT_PUBLIC_API_PREFIX}/molecular-docking/files/${id}?mime_type=${mime_type}`, extension as BuiltInTrajectoryFormat || 'mmcif')

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

export default LigandFile
