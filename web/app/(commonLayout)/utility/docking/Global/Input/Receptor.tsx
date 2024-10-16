import { useContext, useState } from 'react'
import { Radio, RadioGroup, Textarea } from '@nextui-org/react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import type { FileItem } from '@/models/datasets'
import UploadCard from '@/app/components/upload/upload-card'
import { GlobalInputContext } from '@/app/(commonLayout)/utility/docking/Global/Context/GlobalInputContext'
enum Mode {
  upload = 'upload',
  input = 'input',
}
const formats = {
  fasta: 'fasta',
  txt: 'txt',
}
const Receptor = () => {
  const [mode, setMode] = useState<Mode>(Mode.input)
  const accept = Object.keys(formats).map(key => `.${key}`).join(',')
  const { globalReceptorFileList, setGlobalReceptorFileList } = useContext(GlobalInputContext)
  const InputContent = () => {
    return <>
      <Textarea
        placeholder="Enter protein sequence"
      />
    </>
  }
  const UploadContent = () => {
    return <>
      <UploadCard accept={accept} fileList={globalReceptorFileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
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
        setGlobalReceptorFileList(n_list)
      }} prepareFileList={(files) => {
        setGlobalReceptorFileList(files)
        // if (files.length === 0)
        //   setValue('pdb_file_id', '')
      }}
      onUploadError={(file) => {
        const n_list = globalReceptorFileList.filter(item => item.fileID !== file.fileID)
        setGlobalReceptorFileList(n_list)
      }}
      />
    </>
  }
  return <>
    <VerticalTitleCard title="Receptor file" tooltip="受体蛋白结构文件，PDB格式。受体蛋白被设置为刚性。格式：PDB" >
      <div>
        <div>
          <RadioGroup value={mode} onValueChange={(value) => {
            setMode(value as Mode)
          }} orientation="horizontal">
            <Radio size="sm" value={Mode.input}>Enter protein sequence</Radio>
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

export default Receptor
