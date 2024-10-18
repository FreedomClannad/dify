import { useContext, useEffect, useState } from 'react'
import { Radio, RadioGroup } from '@nextui-org/react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import InputUpload from '../../components/InputUpload'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import type { FileItem } from '@/models/datasets'
import UploadCard from '@/app/components/upload/upload-card'
import {
  GlobalFormContext,
  GlobalInputContext,
} from '@/app/(commonLayout)/utility/docking/Global/Context/GlobalInputContext'
import { formats } from '@/app/(commonLayout)/utility/docking/Input/commin'
enum Mode {
  upload = 'upload',
  input = 'input',
}
const acceptFormats = {
  txt: 'txt',
}
const Ligand = () => {
  const [mode, setMode] = useState<Mode>(Mode.input)
  const accept = Object.keys(acceptFormats).map(key => `.${key}`).join(',')
  const {
    globalLigandUploadFileList,
    setGlobalLigandUploadFileList,
    addGlobalLigandUploadResultFileList,
    clearGlobalLigandUploadResultFileList,
    deleteGlobalLigandUploadResult,
  } = useContext(GlobalInputContext)
  const { setValue, errors } = useContext(GlobalFormContext)
  const [inputValue, setInputValue] = useState<string>('')
  useEffect(() => {
    setValue('ligand_value', inputValue)
  }, [inputValue])
  const InputContent = () => {
    return <>
      <InputUpload value={inputValue} setValue={setInputValue} accept={accept} placeholder="Enter SMILES string"/>
    </>
  }
  const UploadContent = () => {
    return <>
      <UploadCard uploadURL="/global-docking/files/upload?source=ligand" accept={accept} fileList={globalLigandUploadFileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
        const n_list = list.map((item) => {
          if (item.fileID === fileItem.fileID) {
            const fileList = item.file
            if (Array.isArray(fileList) && progress === 100) {
              const ids = fileList.map((item: any) => {
                const { id, mime_type, extension, name } = item
                const format = (formats[extension as keyof typeof formats] || 'mmcif') as BuiltInTrajectoryFormat
                addGlobalLigandUploadResultFileList({ id, name, mime_type, extension: format, fileID: id })
                return item.id
              }).join(',')
              setValue('ligand_file_ids', ids)
            }
            return {
              ...item,
              progress,
            }
          }
          return item
        })
        setGlobalLigandUploadFileList(n_list)
      }} prepareFileList={(files) => {
        setGlobalLigandUploadFileList(files)
        if (files.length === 0) {
          clearGlobalLigandUploadResultFileList()
          setValue('ligand_file_ids', '')
        }
      }}
      onUploadError={(file) => {
        const n_list = globalLigandUploadFileList.filter(item => item.fileID !== file.fileID)
        setGlobalLigandUploadFileList(n_list)
        const files = file.file
        if (Array.isArray(files)) {
          files.forEach((item) => {
            deleteGlobalLigandUploadResult(item.id)
          })
        }
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
            setValue('ligand_mode', value)
          }} orientation="horizontal">
            <Radio size="sm" value={Mode.input}>Enter SMILES string</Radio>
            <Radio size="sm" className="ml-2" value={Mode.upload}>Upload file</Radio>
          </RadioGroup>
        </div>
        <div>
          {mode === Mode.input && <div className="mt-3">{InputContent()}</div>}
          {mode === Mode.upload && <div className="mt-3">{UploadContent()}</div>}
          {
            (errors.ligand_value) ? <><span className='text-red-500 mt-2'>{errors.ligand_value?.message}</span></> : null
          }
        </div>
      </div>
    </VerticalTitleCard>
  </>
}

export default Ligand
