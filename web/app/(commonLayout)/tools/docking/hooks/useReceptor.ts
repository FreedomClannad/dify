import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
const useReceptor = () => {
  const [receptorFileList, setReceptorFileList] = useState<FileItem[]>([])

  return { receptorFileList, setReceptorFileList }
}

export default useReceptor
