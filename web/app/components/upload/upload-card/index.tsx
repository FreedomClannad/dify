import { CloudArrowUpIcon, DocumentTextIcon } from '@heroicons/react/24/outline'
import { XCircleIcon } from '@heroicons/react/20/solid'
import type { ChangeEvent, MouseEvent } from 'react'
import { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import { useContext } from 'use-context-selector'
import { useTranslation } from 'react-i18next'
import { Progress } from '@nextui-org/react'
import type { CustomFile as File, FileItem } from '@/models/datasets'
import { ToastContext } from '@/app/components/base/toast'
import { upload } from '@/service/base'
type Props = {
  accept?: string
  fileList: FileItem[]
  prepareFileList: (files: FileItem[]) => void
  onFileUpdate: (fileItem: FileItem, progress: number, list: FileItem[]) => void
  multiple?: boolean
  description?: string
}

const FILES_NUMBER_LIMIT = 20
const fileUploadConfig = {
  file_size_limit: 15,
  batch_count_limit: 5,
}
const UploadCard = memo(({ accept, fileList, prepareFileList, onFileUpdate, multiple = false, description = 'Select or drag and drop ligand file here' }: Props) => {
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

  const fileUpload = useCallback(async (fileItem: FileItem): Promise<FileItem> => {
    const formData = new FormData()
    formData.append('file', fileItem.file)
    const onProgress = (e: ProgressEvent) => {
      console.log(e.lengthComputable)
      console.log(e)
      if (e.lengthComputable) {
        const percent = Math.floor(e.loaded / e.total * 100)
        onFileUpdate(fileItem, percent, fileListRef.current)
      }
    }

    return upload({
      xhr: new XMLHttpRequest(),
      data: formData,
      onprogress: onProgress,
    }, false, '/molecular-docking/files/upload')
      .then((res: File) => {
        const completeFile = {
          fileID: fileItem.fileID,
          file: res,
          progress: -1,
        }
        const index = fileListRef.current.findIndex(item => item.fileID === fileItem.fileID)
        fileListRef.current[index] = completeFile
        onFileUpdate(completeFile, 100, fileListRef.current)
        return Promise.resolve({ ...completeFile })
      })
      .catch((e) => {
        notify({ type: 'error', message: e?.response?.code === 'forbidden' ? e?.response?.message : t('datasetCreation.stepOne.uploader.failed') })
        onFileUpdate(fileItem, -2, fileListRef.current)
        return Promise.resolve({ ...fileItem })
      })
      .finally()
  }, [fileListRef, notify, onFileUpdate, t])

  const uploadBatchFiles = useCallback((bFiles: FileItem[]) => {
    bFiles.forEach(bf => (bf.progress = 0))
    return Promise.all(bFiles.map(fileUpload))
  }, [fileUpload])

  const uploadMultipleFiles = useCallback(async (files: FileItem[]) => {
    const batchCountLimit = fileUploadConfig.batch_count_limit
    const length = files.length
    let start = 0
    let end = 0

    while (start < length) {
      if (start + batchCountLimit > length)
        end = length
      else
        end = start + batchCountLimit
      const bFiles = files.slice(start, end)
      await uploadBatchFiles(bFiles)
      start = end
    }
  }, [fileUploadConfig, uploadBatchFiles])

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
    uploadMultipleFiles(preparedFiles)
  }, [prepareFileList, uploadMultipleFiles, notify, t, fileList])

  const fileChangeHandle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const files = [...(e.target.files ?? [])] as File[]
    initialUpload(files.filter(isValid))
  }, [isValid, initialUpload])

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
              <span className="ml-3 text-xs">{description}</span>
            </div>
          </>
          : <>
            { firstFile.progress < 100
              ? <>
                <div className="px-3 w-full flex items-center">
                  <Progress
                    label="Uploading..."
                    size="md"
                    value={firstFile.progress}
                    color="success"
                    showValueLabel={true}
                    className="max-w-md"
                  />
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

          </>}

      </div>
    </div>
  </>
})
UploadCard.displayName = 'UploadCard'
export default UploadCard
