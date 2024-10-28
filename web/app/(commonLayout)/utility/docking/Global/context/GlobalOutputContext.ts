import { createContext } from 'react'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
type GlobalOutputContextType = {
  resultData: string
  resultID: string
  globalReceptorFilesIds: string
  globalLigandFilesIds: string
  globalReceptorResultInputFileList: DockingInputFile[]
  globalLigandResultInputFileList: DockingInputFile[]
  getGlobalLigandUploadResultFile: (id: string) => DockingResultFile | undefined
  updateGlobalLigandResultInputFile: (dockingInputFile: DockingInputFile) => void
}

export const GlobalResultContext = createContext <GlobalOutputContextType> ({
  resultData: '',
  resultID: '',
  globalReceptorFilesIds: '',
  globalLigandFilesIds: '',
  globalReceptorResultInputFileList: [],
  globalLigandResultInputFileList: [],
  getGlobalLigandUploadResultFile: (id: string) => { return undefined },
  updateGlobalLigandResultInputFile: (dockingInputFile: DockingInputFile) => { },
})
