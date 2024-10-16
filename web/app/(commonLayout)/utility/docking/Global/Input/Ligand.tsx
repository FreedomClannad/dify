import { useContext, useState } from 'react'
import { Radio, RadioGroup } from '@nextui-org/react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import type { FileItem } from '@/models/datasets'
import UploadCard from '@/app/components/upload/upload-card'
import { GlobalInputContext } from '@/app/(commonLayout)/utility/docking/Global/Context/GlobalInputContext'
import InputUpload from '@/app/(commonLayout)/utility/docking/InputUpload'
enum Mode {
  upload = 'upload',
  input = 'input',
}
const formats = {
  txt: 'txt',
}
const Ligand = () => {
  const [mode, setMode] = useState<Mode>(Mode.input)
  const accept = Object.keys(formats).map(key => `.${key}`).join(',')
  const { globalLigandFileList, setGlobalLigandFileList } = useContext(GlobalInputContext)
  const InputContent = () => {
    return <>
      <InputUpload accept={accept} placeholder="Enter SMILES string"/>
    </>
  }
  const UploadContent = () => {
    return <>
      <UploadCard uploadURL="" accept={accept} fileList={globalLigandFileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
        const n_list = list.map((item) => {
          if (item.fileID === fileItem.fileID) {
            const file = item.file
            const { id, mime_type, extension } = file

            if (id && mime_type) {
              // setValue('pdb_file_id', id)
              const format = formats[extension as keyof typeof formats] || 'mmcif'
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
        setGlobalLigandFileList(n_list)
      }} prepareFileList={(files) => {
        setGlobalLigandFileList(files)
        // if (files.length === 0)
        //   setValue('pdb_file_id', '')
      }}
      onUploadError={(file) => {
        const n_list = globalLigandFileList.filter(item => item.fileID !== file.fileID)
        setGlobalLigandFileList(n_list)
      }}
      />
    </>
  }
  return <>
    <VerticalTitleCard title="Ligand file" tooltip="上传配体文件，当配体为一个时允许上传SDF，PDB和MOL格式，当配体为多个时（≤2000）只允许上传SDF格式。格式：SDF、Mol、PDB。" >
      <div>
        <div>
          <RadioGroup value={mode} onValueChange={(value) => {
            setMode(value as Mode)
          }} orientation="horizontal">
            <Radio size="sm" value={Mode.input}>Enter SMILES string</Radio>
            <Radio size="sm" className="ml-2" value={Mode.upload}>Upload file</Radio>
          </RadioGroup>
        </div>
        <div>
          {mode === Mode.input && <div className="mt-3">{InputContent()}</div>}
          {mode === Mode.upload && <div className="mt-3">{UploadContent()}</div>}
        </div>
      </div>
    </VerticalTitleCard>
  </>
}

export default Ligand
