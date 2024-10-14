import { createContext } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingResultFile } from '@/types/docking'

type InputContextType = {
  resultData: string
  receptorFileList: FileItem[]
  setReceptorFileList: (receptorFileList: FileItem[]) => void
  ligandFileList: FileItem[]
  setLigandFileList: (receptorFileList: FileItem[]) => void
  getLigandResultFileById: (id: string) => DockingResultFile | undefined
}
export const ResultContext = createContext<InputContextType>({
  receptorFileList: [],
  setReceptorFileList: (receptorFileList: FileItem[]) => {},
  ligandFileList: [],
  setLigandFileList: (receptorFileList: FileItem[]) => {},
  resultData: '',
  getLigandResultFileById: (id: string) => { return undefined },
})
