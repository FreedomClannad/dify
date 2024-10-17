import { Textarea } from '@nextui-org/react'
import { useCallback, useEffect, useRef } from 'react'
import { useContext as useContextNotify } from 'use-context-selector'
import { useTranslation } from 'react-i18next'
import type { CustomFile as File } from '@/models/datasets'
import { ToastContext } from '@/app/components/base/toast'
type Props = {
  value: string
  setValue: (value: string) => void
  accept?: string
  placeholder?: string
}
const fileUploadConfig = {
  file_size_limit: 15,
  batch_count_limit: 5,
}
const InputUpload = ({ value, setValue, accept, placeholder }: Props) => {
  const { t } = useTranslation()
  const dropRef = useRef<HTMLDivElement>(null)
  const { notify } = useContextNotify(ToastContext)
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
    if (validFiles.length > 0) {
      const reader = new FileReader()
      reader.onload = () => {
        setValue(reader.result as string)
      }
      reader.readAsText(validFiles[0])
    }
  }, [isValid])

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
  return <div ref={dropRef}>
    <Textarea
      value={value}
      placeholder={placeholder}
      onValueChange={setValue}
    />
  </div>
}

export default InputUpload
