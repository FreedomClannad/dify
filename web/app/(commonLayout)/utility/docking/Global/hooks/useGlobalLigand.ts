import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
const useGlobalLigand = () => {
  const [globalLigandFileList, setGlobalLigandFileList] = useState<FileItem[]>([])
  const clearGlobalLigandFileList = () => {
    setGlobalLigandFileList([])
  }
  return { globalLigandFileList, setGlobalLigandFileList, clearGlobalLigandFileList }
}

export default useGlobalLigand
