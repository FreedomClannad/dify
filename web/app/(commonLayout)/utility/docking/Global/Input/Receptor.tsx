import { useContext, useEffect, useState } from 'react'
import { Radio, RadioGroup } from '@nextui-org/react'
import InputUpload from '../../components/InputUpload'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import type { FileItem } from '@/models/datasets'
import UploadCard from '@/app/components/upload/upload-card'
import {
  GlobalFormContext,
  GlobalInputContext,
} from '@/app/(commonLayout)/utility/docking/Global/context/GlobalInputContext'
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
  const { globalReceptorUploadFileList, setGlobalReceptorUploadFileList, addGlobalReceptorUploadResult, deleteGlobalReceptorUploadResult, clearGlobalReceptorUploadResultList } = useContext(GlobalInputContext)
  const { setValue, errors } = useContext(GlobalFormContext)
  const [inputValue, setInputValue] = useState<string>('')
  useEffect(() => {
    setValue('receptor_value', inputValue)
  }, [inputValue])
  const InputContent = () => {
    return <>
      <InputUpload value={inputValue} setValue={setInputValue} accept={accept} placeholder="Enter protein sequence"/>
    </>
  }
  const UploadContent = () => {
    return <>
      <UploadCard uploadURL="/global-docking/files/upload?source=fasta" accept={accept} fileList={globalReceptorUploadFileList} onFileUpdate={(fileItem: FileItem, progress: number, list: FileItem[]) => {
        const n_list = list.map((item) => {
          if (item.fileID === fileItem.fileID) {
            const files = item.file
            if (Array.isArray(files) && progress === 100) {
              files.map((file) => {
                const { id, mime_type, extension, name } = file
                setValue('fasta_file_id', file.id)
                addGlobalReceptorUploadResult({ id, mime_type, extension, name, fileID: fileItem.fileID })
                return file
              })
            }
            return {
              ...item,
              progress,
            }
          }
          return item
        })
        setGlobalReceptorUploadFileList(n_list)
      }} prepareFileList={(files) => {
        setGlobalReceptorUploadFileList(files)
        if (files.length === 0) {
          setValue('fasta_file_id', '')
          clearGlobalReceptorUploadResultList()
        }
      }}
      onUploadError={(file) => {
        const newList = globalReceptorUploadFileList.filter(item => item.fileID !== file.fileID)
        setGlobalReceptorUploadFileList(newList)
        const files = file.file
        if (Array.isArray(files)) {
          files.map((file) => {
            deleteGlobalReceptorUploadResult(file.id)
            return file
          })
        }
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
            setValue('receptor_mode', value)
          }} orientation="horizontal">
            <Radio size="sm" value={Mode.input}>Enter protein sequence</Radio>
            <Radio size="sm" className="ml-2" value={Mode.upload}>Upload file</Radio>
          </RadioGroup>
        </div>
        <div>
          {mode === Mode.input && <div className="mt-3">{InputContent()}</div>}
          {mode === Mode.upload && <div className="mt-3">{UploadContent()}</div>}
          {
            (errors.receptor_value) ? <><span className='text-red-500 mt-2'>{errors.receptor_value?.message}</span></> : null
          }
        </div>
      </div>
    </VerticalTitleCard>
  </>
}

export default Receptor