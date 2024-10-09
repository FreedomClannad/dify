import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
const useLigand = () => {
  const [ligandFileList, setLigandFileList] = useState<FileItem[]>([])
  const clearLigandFileList = () => {
    setLigandFileList([])
  }
  return { ligandFileList, setLigandFileList, clearLigandFileList }
}

export default useLigand
