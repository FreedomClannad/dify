import { createContext } from 'react'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'

type InputContextType = {
  // 返回的结果数据
  resultData: string
  // 任务ID
  resultID: string

  // Receptor
  pocketReceptorResultInputFileList: DockingInputFile[]
  getPocketReceptorUploadResultFile: (id: string) => DockingResultFile | undefined
  updatePocketReceptorResultInputFile: (dockingInputFile: DockingInputFile) => void
  // Ligand
  getPocketLigandUploadResultFile: (id: string) => DockingResultFile | undefined
  pocketLigandResultInputFileList: DockingInputFile[]
  updatePocketLigandResultInputFile: (dockingInputFile: DockingInputFile) => void
  // Crop
  cropRecepResultInputList: DockingInputFile[]
  cropReceptorResultList: DockingResultFile[]
  getCropReceptorResult: (id: string) => DockingResultFile | undefined
  updateCropRecepResultInputFile: (dockingInputFile: DockingInputFile) => void
}
export const ResultContext = createContext<InputContextType>({
  resultData: '',
  resultID: '',
  // Receptor
  pocketReceptorResultInputFileList: [],
  getPocketReceptorUploadResultFile: (id: string) => { return undefined },
  updatePocketReceptorResultInputFile: (dockingInputFile: DockingInputFile) => {},
  // Ligand
  getPocketLigandUploadResultFile: (id: string) => { return undefined },
  pocketLigandResultInputFileList: [],
  updatePocketLigandResultInputFile: (dockingInputFile: DockingInputFile) => {},

  // Crop
  cropRecepResultInputList: [],
  cropReceptorResultList: [],
  getCropReceptorResult: (id: string) => { return undefined },
  updateCropRecepResultInputFile: (dockingInputFile: DockingInputFile) => {},
})
