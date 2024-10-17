import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingResultFile } from '@/types/docking'
const useGlobalReceptor = () => {
  const [globalReceptorFileList, setGlobalReceptorFileList] = useState<FileItem[]>([])
  const [globalReceptorResultFileList, setGlobalReceptorResultFileList] = useState<DockingResultFile[]>([])
  const clearGlobalReceptorFileList = () => {
    setGlobalReceptorFileList([])
  }
  return { globalReceptorFileList, setGlobalReceptorFileList, clearGlobalReceptorFileList, globalReceptorResultFileList, setGlobalReceptorResultFileList }
}

export default useGlobalReceptor
