import { createContext } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingResultFile } from '@/types/docking'
type GlobalOutputContextType = {
  resultData: string
  receptorFileList: FileItem[]
  setReceptorFileList: (files: FileItem[]) => void
  ligandFileList: FileItem[]
  setLigandFileList: (files: FileItem[]) => void
  getLigandResultFileById: (id: string) => DockingResultFile | undefined
}

export const GlobalResultContext = createContext <GlobalOutputContextType> ({
  resultData: '',
  receptorFileList: [],
  setReceptorFileList: () => {},
  ligandFileList: [],
  setLigandFileList: () => {},
  getLigandResultFileById: (id: string) => { return undefined },
})
