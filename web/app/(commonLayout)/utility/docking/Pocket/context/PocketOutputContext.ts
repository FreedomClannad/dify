import { createContext } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'

type InputContextType = {
  resultData: string
  setPocketReceptorUploadFileList: (receptorFileList: FileItem[]) => void
  pocketReceptorResultInputFileList: DockingInputFile[]
  getPocketReceptorUploadResultFile: (id: string) => DockingResultFile | undefined
  updatePocketReceptorResultInputFile: (dockingInputFile: DockingInputFile) => void
  ligandFileList: FileItem[]
  setLigandFileList: (receptorFileList: FileItem[]) => void
  getLigandResultFileById: (id: string) => DockingResultFile | undefined
  cropReceptorList: DockingResultFile[]
  getCropReceptorById: (id: string) => DockingResultFile | undefined
}
export const ResultContext = createContext<InputContextType>({
  setPocketReceptorUploadFileList: (receptorFileList: FileItem[]) => {},
  pocketReceptorResultInputFileList: [],
  getPocketReceptorUploadResultFile: (id: string) => { return undefined },
  updatePocketReceptorResultInputFile: (dockingInputFile: DockingInputFile) => {},
  ligandFileList: [],
  setLigandFileList: (receptorFileList: FileItem[]) => {},
  resultData: '',
  getLigandResultFileById: (id: string) => { return undefined },
  cropReceptorList: [],
  getCropReceptorById: (id: string) => { return undefined },
})
