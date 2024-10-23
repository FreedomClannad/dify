import { createContext } from 'react'
import type { FieldError, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { DockingStrategyEnum } from '@/types/docking'
import type { CenterPosition, DockingInputFile, DockingResultFile } from '@/types/docking'
import type { FileItem } from '@/models/datasets'
import type { DockingFormValues } from '@/app/(commonLayout)/utility/docking/Pocket/Input/InputForm'
import type { StrategyMapType } from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'
import { StrategyMap } from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'

type InputContextType = {
  // Receptor
  pocketReceptorUploadFileList: FileItem[]
  setPocketReceptorUploadFileList: (receptorFileList: FileItem[]) => void
  addPocketReceptorUploadResultFile: (dockingResultFile: DockingResultFile) => void
  deletePocketReceptorUploadResultFile: (id: string) => void
  clearPocketReceptorUploadResultFileList: () => void
  addPocketReceptorResultInputFile: (dockingInputFile: DockingInputFile) => void
  clearPocketReceptorResultInputFileList: () => void
  // Ligand
  pocketLigandUploadFileList: FileItem[]
  setPocketLigandUploadFileList: (receptorFileList: FileItem[]) => void
  addPocketLigandUploadResultFile: (file: DockingResultFile) => void
  deletePocketLigandUploadResultFile: (id: string) => void
  clearPocketLigandUploadResultFileList: () => void
  addPocketLigandResultInputFile: (dockingInputFile: DockingInputFile) => void
  clearPocketLigandResultInputFileList: () => void
  // Strategy 模式选择
  StrategyMap: StrategyMapType
  strategy: DockingStrategyEnum
  setStrategy: (strategy: DockingStrategyEnum) => void
  // Center Position
  centerPosition: CenterPosition
  setCenterPosition: (centerPosition: CenterPosition) => void

}
export const InputContext = createContext<InputContextType>({
  pocketReceptorUploadFileList: [],
  setPocketReceptorUploadFileList: (receptorFileList: FileItem[]) => {},
  addPocketReceptorUploadResultFile: (dockingResultFile: DockingResultFile) => {},
  deletePocketReceptorUploadResultFile: (id: string) => {},
  clearPocketReceptorUploadResultFileList: () => {},
  addPocketReceptorResultInputFile: (dockingInputFile: DockingInputFile) => {},
  deletePocketLigandUploadResultFile: (id: string) => {},
  clearPocketLigandUploadResultFileList: () => {},
  pocketLigandUploadFileList: [],
  setPocketLigandUploadFileList: (receptorFileList: FileItem[]) => {},
  centerPosition: {},
  setCenterPosition: () => {},
  addPocketLigandUploadResultFile: (file: DockingResultFile) => {},
  addPocketLigandResultInputFile: (dockingInputFile: DockingInputFile) => {},
  clearPocketReceptorResultInputFileList: () => {},
  clearPocketLigandResultInputFileList: () => {},
  StrategyMap,
  strategy: DockingStrategyEnum.global,
  setStrategy: (strategy: DockingStrategyEnum) => {},
})

type FormContextType = {
  register: UseFormRegister<DockingFormValues>
  getValues: UseFormGetValues<DockingFormValues>
  setValue: UseFormSetValue<DockingFormValues>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  errors: FieldError<DockingFormValues>
}

export const FormContext = createContext<FormContextType>(<FormContextType>{
  register: (name, options) => {
    return {} as FieldValues
  },
  getValues: () => {},
  setValue: (name, value, options) => {},
  errors: {} as FieldError,
})
