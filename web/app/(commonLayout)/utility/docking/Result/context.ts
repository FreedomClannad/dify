import { createContext } from 'react'
import type { FileItem } from '@/models/datasets'

type InputContextType = {
  resultData: string
  receptorFileList: FileItem[]
  setReceptorFileList: (receptorFileList: FileItem[]) => void
  ligandFileList: FileItem[]
  setLigandFileList: (receptorFileList: FileItem[]) => void
}
export const ResultContext = createContext<InputContextType>({
  receptorFileList: [],
  setReceptorFileList: (receptorFileList: FileItem[]) => {},
  ligandFileList: [],
  setLigandFileList: (receptorFileList: FileItem[]) => {},
  resultData: '',
})
