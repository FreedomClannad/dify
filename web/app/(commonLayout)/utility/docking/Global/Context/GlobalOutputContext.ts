import { createContext } from 'react'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
type GlobalOutputContextType = {
  resultData: string
  globalReceptorInputFileList: DockingInputFile[]
  globalLigandInputFileList: DockingInputFile[]
  getGlobalLigandUploadResultFile: (id: string) => DockingResultFile | undefined
  updateGlobalLigandInputFile: (dockingInputFile: DockingInputFile) => void
}

export const GlobalResultContext = createContext <GlobalOutputContextType> ({
  resultData: '',
  globalReceptorInputFileList: [],
  globalLigandInputFileList: [],
  getGlobalLigandUploadResultFile: (id: string) => { return undefined },
  updateGlobalLigandInputFile: (dockingInputFile: DockingInputFile) => { },
})
