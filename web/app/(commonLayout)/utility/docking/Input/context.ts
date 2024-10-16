import { createContext } from 'react'
import type { FieldError, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import { DockingStrategyEnum } from '@/types/docking'
import type { CenterPosition, DockingResultFile } from '@/types/docking'
import type { FileItem } from '@/models/datasets'
import type { DockingFormValues } from '@/app/(commonLayout)/utility/docking/Input/InputForm'
import type { StrategyMapType } from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'
import { StrategyMap } from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'

type InputContextType = {
  receptorFileList: FileItem[]
  setReceptorFileList: (receptorFileList: FileItem[]) => void
  ligandFileList: FileItem[]
  setLigandFileList: (receptorFileList: FileItem[]) => void
  centerPosition: CenterPosition
  setCenterPosition: (centerPosition: CenterPosition) => void
  ligandResultFileList: DockingResultFile[]
  addLigandResultFileList: (file: DockingResultFile) => void
  StrategyMap: StrategyMapType
  strategy: DockingStrategyEnum
  setStrategy: (strategy: DockingStrategyEnum) => void
}
export const InputContext = createContext<InputContextType>({
  receptorFileList: [],
  setReceptorFileList: (receptorFileList: FileItem[]) => {},
  ligandFileList: [],
  setLigandFileList: (receptorFileList: FileItem[]) => {},
  centerPosition: {},
  setCenterPosition: () => {},
  ligandResultFileList: [],
  addLigandResultFileList: (file: DockingResultFile) => {},
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
