import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
const useGlobalReceptor = () => {
  const [globalReceptorFileList, setGlobalReceptorFileList] = useState<FileItem[]>([])
  const clearGlobalReceptorFileList = () => {
    setGlobalReceptorFileList([])
  }
  return { globalReceptorFileList, setGlobalReceptorFileList, clearGlobalReceptorFileList }
}

export default useGlobalReceptor
