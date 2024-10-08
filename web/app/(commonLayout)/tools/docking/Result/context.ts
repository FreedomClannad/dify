import { createContext } from 'react'
import type { FileItem } from '@/models/datasets'

type InputContextType = {
  resultData: string
  receptorFileList: FileItem[]
  setReceptorFileList: (receptorFileList: FileItem[]) => void
}
export const ResultContext = createContext<InputContextType>({
  receptorFileList: [],
  setReceptorFileList: (receptorFileList: FileItem[]) => {},
  resultData: '',
})
