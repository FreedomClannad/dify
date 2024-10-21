import { createContext } from 'react'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'

type InputContextType = {
  resultData: string
  // Receptor
  pocketReceptorResultInputFileList: DockingInputFile[]
  getPocketReceptorUploadResultFile: (id: string) => DockingResultFile | undefined
  updatePocketReceptorResultInputFile: (dockingInputFile: DockingInputFile) => void
  // Ligand
  getPocketLigandUploadResultFile: (id: string) => DockingResultFile | undefined
  pocketLigandResultInputFileList: DockingInputFile[]
  updatePocketLigandResultInputFile: (dockingInputFile: DockingInputFile) => void
  // Crop
  cropReceptorList: DockingResultFile[]
  getCropReceptorById: (id: string) => DockingResultFile | undefined
}
export const ResultContext = createContext<InputContextType>({
  resultData: '',
  // Receptor
  pocketReceptorResultInputFileList: [],
  getPocketReceptorUploadResultFile: (id: string) => { return undefined },
  updatePocketReceptorResultInputFile: (dockingInputFile: DockingInputFile) => {},
  // Ligand
  getPocketLigandUploadResultFile: (id: string) => { return undefined },
  pocketLigandResultInputFileList: [],
  updatePocketLigandResultInputFile: (dockingInputFile: DockingInputFile) => {},

  // Crop
  cropReceptorList: [],
  getCropReceptorById: (id: string) => { return undefined },
})
