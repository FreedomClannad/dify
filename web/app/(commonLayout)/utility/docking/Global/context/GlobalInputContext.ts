import { createContext } from 'react'
import type { FieldError, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { StrategyMapType } from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'
import { StrategyMap } from '@/app/(commonLayout)/utility/docking/hooks/useStrategy'
import { type DockingResultFile, DockingStrategyEnum } from '@/types/docking'
import type { GlobalInputFormValues } from '@/app/(commonLayout)/utility/docking/Global/Input'
import type { FileItem } from '@/models/datasets'

type GlobalInputContextType = {
  // Receptor
  globalReceptorUploadFileList: FileItem[]
  setGlobalReceptorUploadFileList: (receptorUploadFileList: FileItem[]) => void
  addGlobalReceptorUploadResult: (dockingResultFile: DockingResultFile) => void
  deleteGlobalReceptorUploadResult: (id: string) => void
  clearGlobalReceptorUploadResultList: () => void
  // Ligand
  globalLigandUploadFileList: FileItem[]
  setGlobalLigandUploadFileList: (receptorFileList: FileItem[]) => void
  addGlobalLigandUploadResultFile: (file: DockingResultFile) => void
  deleteGlobalLigandUploadResultFile: (id: string) => void
  clearGlobalLigandUploadResultFileList: () => void
  // Strategy 模式选择
  StrategyMap: StrategyMapType
  strategy: DockingStrategyEnum
  setStrategy: (strategy: DockingStrategyEnum) => void
}

export const GlobalInputContext = createContext<GlobalInputContextType>({
  // Receptor
  globalReceptorUploadFileList: [],
  setGlobalReceptorUploadFileList: (receptorUploadFileList: FileItem[]) => {},
  addGlobalReceptorUploadResult: (dockingResultFile: DockingResultFile) => {},
  deleteGlobalReceptorUploadResult: (id: string) => {},
  clearGlobalReceptorUploadResultList: () => {},
  // Ligand
  globalLigandUploadFileList: [],
  setGlobalLigandUploadFileList: (globalReceptorFileList: FileItem[]) => {},
  addGlobalLigandUploadResultFile: (file: DockingResultFile) => {},
  deleteGlobalLigandUploadResultFile: (id: string) => {},
  clearGlobalLigandUploadResultFileList: () => {},
  // Strategy 模式选择
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
