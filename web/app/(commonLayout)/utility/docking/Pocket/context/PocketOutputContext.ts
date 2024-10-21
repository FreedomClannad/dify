import { createContext } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingResultFile } from '@/types/docking'

type InputContextType = {
  resultData: string
  pocketReceptorUploadFileList: FileItem[]
  setPocketReceptorUploadFileList: (receptorFileList: FileItem[]) => void
  ligandFileList: FileItem[]
  setLigandFileList: (receptorFileList: FileItem[]) => void
  getLigandResultFileById: (id: string) => DockingResultFile | undefined
  cropReceptorList: DockingResultFile[]
  getCropReceptorById: (id: string) => DockingResultFile | undefined
}
export const ResultContext = createContext<InputContextType>({
  pocketReceptorUploadFileList: [],
  setPocketReceptorUploadFileList: (receptorFileList: FileItem[]) => {},
  ligandFileList: [],
  setLigandFileList: (receptorFileList: FileItem[]) => {},
  resultData: '',
  getLigandResultFileById: (id: string) => { return undefined },
  cropReceptorList: [],
  getCropReceptorById: (id: string) => { return undefined },
})
