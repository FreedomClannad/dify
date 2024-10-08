import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
const useLigand = () => {
  const [ligandFileList, setLigandFileList] = useState<FileItem[]>([])

  return { ligandFileList, setLigandFileList }
}

export default useLigand
