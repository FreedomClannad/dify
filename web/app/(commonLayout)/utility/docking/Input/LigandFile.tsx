import { useContext } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import UploadCard from '@/app/components/upload/upload-card'
import type { FileItem } from '@/models/datasets'
import { FormContext, InputContext } from '@/app/(commonLayout)/utility/docking/Input/context'

const LigandFile = () => {
  const { ligandFileList, setLigandFileList, addLigandResultFileList } = useContext(InputContext)
  // const { loadStructureFromUrl, addStructure } = useContext(MolstarContext)
  const { setValue, errors } = useContext(FormContext)
  return <>
    <VerticalTitleCard title="Ligand file" tooltip="上传配体文件，当配体为一个时允许上传SDF，PDB和MOL格式，当配体为多个时（≤2000）只允许上传SDF格式。格式：SDF、Mol、PDB。">
      <div>
        <UploadCard accept=".pdb, .sdf, .mol, mol2" fileList={ligandFileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
          const n_list = list.map((item) => {
            if (item.fileID === fileItem.fileID) {
              const file = item.file
              const { id, mime_type, extension } = file

              if (id && mime_type) {
                setValue('ligand_file_ids', id)
                addLigandResultFileList({ fileId: fileItem.fileID, id, mime_type, extension: extension as BuiltInTrajectoryFormat || 'mmcif' })
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
          setLigandFileList(n_list)
        }} prepareFileList={(files) => {
          setLigandFileList(files)
        }}/>
      </div>
      {errors.ligand_file_ids && <div className="mt-1"><span className='text-red-500 '>{errors.ligand_file_ids.message}</span></div>}
    </VerticalTitleCard>
  </>
}

export default LigandFile
