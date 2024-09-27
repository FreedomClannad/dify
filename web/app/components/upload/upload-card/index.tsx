import { CloudArrowUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/20/solid'
import type { ChangeEvent, MouseEvent } from 'react'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useContext } from 'use-context-selector'
import { useTranslation } from 'react-i18next'
import type { CustomFile as File, FileItem } from '@/models/datasets'
import { ToastContext } from '@/app/components/base/toast'
type Props = {
  accept?: string
  fileList: FileItem[]
  prepareFileList: (files: FileItem[]) => void
  multiple?: boolean
}

const FILES_NUMBER_LIMIT = 20
const fileUploadConfig = {
  file_size_limit: 15,
  batch_count_limit: 5,
}
const UploadCard = memo(({ accept, fileList, prepareFileList, multiple = false }: Props) => {
  const { t } = useTranslation()
  const fileUploader = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLDivElement>(null)
  const fileListRef = useRef<FileItem[]>([])
  const { notify } = useContext(ToastContext)
  const selectHandle = () => {
    if (fileUploader.current)
      fileUploader.current.click()
  }
  const getFileType = (currentFile: File) => {
    if (!currentFile)
      return ''

    const arr = currentFile.name.split('.')
    return arr[arr.length - 1]
  }

  const isValid = useCallback((file: File) => {
    const { size } = file
    const ext = `.${getFileType(file)}`
    const isValidType = accept?.includes(ext.toLowerCase())
    if (!isValidType)
      notify({ type: 'error', message: t('datasetCreation.stepOne.uploader.validation.typeError') })

    const isValidSize = size <= fileUploadConfig.file_size_limit * 1024 * 1024
    if (!isValidSize)
      notify({ type: 'error', message: t('datasetCreation.stepOne.uploader.validation.size', { size: fileUploadConfig.file_size_limit }) })

    return isValidType && isValidSize
  }, [fileUploadConfig, notify, t, accept])

  const initialUpload = useCallback((files: File[]) => {
    if (!files.length)
      return false

    if (files.length + fileList.length > FILES_NUMBER_LIMIT) {
      notify({ type: 'error', message: t('datasetCreation.stepOne.uploader.validation.filesNumber', { filesNumber: FILES_NUMBER_LIMIT }) })
      return false
    }

    const preparedFiles = files.map((file, index) => ({
      fileID: `file${index}-${Date.now()}`,
      file,
      progress: -1,
    }))
    const newFiles = multiple ? [...fileListRef.current, ...preparedFiles] : [...preparedFiles]
    prepareFileList(newFiles)
    fileListRef.current = newFiles
  }, [prepareFileList, notify, t, fileList])

  const fileChangeHandle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = [...(e.target.files ?? [])] as File[]
    initialUpload(files.filter(isValid))
  }, [isValid, initialUpload])

  const removeFile = (fileID: string) => {
    if (fileUploader.current)
      fileUploader.current.value = ''

    fileListRef.current = fileListRef.current.filter(item => item.fileID !== fileID)
    prepareFileList([...fileListRef.current])
  }

  const firstFile = useMemo(() => {
    if (fileList.length === 0)
      return null
    return fileList[0]
  }, [fileList])

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }
  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!e.dataTransfer)
      return

    const files = [...e.dataTransfer.files] as File[]
    const validFiles = files.filter(isValid)
    initialUpload(validFiles)
  }, [initialUpload, isValid])

  useEffect(() => {
    dropRef.current?.addEventListener('dragenter', handleDragEnter)
    dropRef.current?.addEventListener('dragover', handleDragOver)
    dropRef.current?.addEventListener('dragleave', handleDragLeave)
    dropRef.current?.addEventListener('drop', handleDrop)
    return () => {
      dropRef.current?.removeEventListener('dragenter', handleDragEnter)
      dropRef.current?.removeEventListener('dragover', handleDragOver)
      dropRef.current?.removeEventListener('dragleave', handleDragLeave)
      dropRef.current?.removeEventListener('drop', handleDrop)
    }
  }, [handleDrop])
  return <>
    <div ref={dropRef}>
      <input className="hidden " type="file" accept={accept} ref={fileUploader} onChange={fileChangeHandle} multiple={multiple}></input>
      <div
        className="min-h-[4.25rem] rounded border-[1px] border-dashed border-gray-1001 w-full bg-gray-1002 flex cursor-pointer text-gray-1003"
        onClick={selectHandle}>
        {!firstFile
          ? <>
            <div className="flex flex-1 items-center justify-center px-3 ">
              <div className='w-4 h-4  text-xs'>
                <CloudArrowUpIcon/>
              </div>
              <span className="ml-3 text-xs">Select or drag and drop ligand file here</span>
            </div>
          </>
          : <>
            <div className="flex flex-1 items-center px-3 justify-between">
              <div className="flex flex-1 items-center">
                <div className='w-5 h-5  text-xs'><DocumentTextIcon/></div>
                <span
                  className="text-sm ml-3 flex-1 overflow-x-hidden whitespace-nowrap text-ellipsis max-w-[270px]">{firstFile.file.name}</span>
              </div>

              <div className='w-4 h-4  text-xs' onClick={(e: MouseEvent) => {
                e.stopPropagation()
                removeFile(firstFile?.fileID)
              }}><XCircleIcon/></div>
            </div>
          </>}

      </div>
    </div>
  </>
})
UploadCard.displayName = 'UploadCard'
export default UploadCard
