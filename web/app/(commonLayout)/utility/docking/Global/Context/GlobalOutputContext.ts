import { createContext } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
type GlobalOutputContextType = {
  resultData: string
  globalReceptorUploadFileList: FileItem[]
  setGlobalReceptorUploadFileList: (files: FileItem[]) => void
  ligandFileList: FileItem[]
  setLigandFileList: (files: FileItem[]) => void
  getLigandResultFileById: (id: string) => DockingResultFile | undefined
  globalReceptorInputFileList: DockingInputFile[]
  getGlobalReceptorResultFile: (id: string) => DockingResultFile | undefined
}

export const GlobalResultContext = createContext <GlobalOutputContextType> ({
  resultData: '',
  globalReceptorUploadFileList: [],
  setGlobalReceptorUploadFileList: () => {},
  ligandFileList: [],
  setLigandFileList: () => {},
  getLigandResultFileById: (id: string) => { return undefined },
  globalReceptorInputFileList: [],
  getGlobalReceptorResultFile: (id: string) => { return undefined },
})
