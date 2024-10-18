import { createContext } from 'react'
import type { DockingInputFile } from '@/types/docking'
type GlobalOutputContextType = {
  resultData: string
  globalReceptorInputFileList: DockingInputFile[]
  globalLigandInputFileList: DockingInputFile[]
}

export const GlobalResultContext = createContext <GlobalOutputContextType> ({
  resultData: '',
  globalReceptorInputFileList: [],
  globalLigandInputFileList: [],
})
