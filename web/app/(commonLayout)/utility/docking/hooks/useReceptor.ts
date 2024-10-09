import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
const useReceptor = () => {
  const [receptorFileList, setReceptorFileList] = useState<FileItem[]>([])
  const clearReceptorFileList = () => {
    setReceptorFileList([])
  }
  return { receptorFileList, setReceptorFileList, clearReceptorFileList }
}

export default useReceptor
