import { createContext } from 'react'
import type { FieldError, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { StrategyMapType } from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'
import { StrategyMap } from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'
import { type DockingResultFile, DockingStrategyEnum } from '@/types/docking'
import type { GlobalInputFormValues } from '@/app/(commonLayout)/utility/docking/Global/Input'
import type { FileItem } from '@/models/datasets'

type GlobalInputContextType = {
  globalReceptorFileList: FileItem[]
  setGlobalReceptorFileList: (receptorFileList: FileItem[]) => void
  globalLigandFileList: FileItem[]
  setGlobalLigandFileList: (receptorFileList: FileItem[]) => void
  addGlobalLigandResultFileList: (file: DockingResultFile) => void
  StrategyMap: StrategyMapType
  strategy: DockingStrategyEnum
  setStrategy: (strategy: DockingStrategyEnum) => void
}

export const GlobalInputContext = createContext<GlobalInputContextType>({
  globalReceptorFileList: [],
  setGlobalReceptorFileList: (globalReceptorFileList: FileItem[]) => {},
  globalLigandFileList: [],
  setGlobalLigandFileList: (globalReceptorFileList: FileItem[]) => {},
  addGlobalLigandResultFileList: (file: DockingResultFile) => {},
  StrategyMap,
  strategy: DockingStrategyEnum.global,
  setStrategy: (strategy: DockingStrategyEnum) => {},
})

type GlobalFormContextType = {
  register: UseFormRegister<GlobalInputFormValues>
  getValues: UseFormGetValues<GlobalInputFormValues>
  setValue: UseFormSetValue<GlobalInputFormValues>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  errors: FieldError<GlobalInputFormValues>
}

export const GlobalFormContext = createContext<GlobalFormContextType>(<GlobalFormContextType>{
  register: (name, options) => {
    return {} as FieldValues
  },
  getValues: () => {},
  setValue: (name, value, options) => {},
  errors: {} as FieldError,
})
