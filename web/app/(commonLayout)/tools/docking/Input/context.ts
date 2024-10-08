import { createContext } from 'react'
import type { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { CenterPosition } from '@/types/docking'
import type { FileItem } from '@/models/datasets'

type InputContextType = {
  receptorFileList: FileItem[]
  setReceptorFileList: (receptorFileList: FileItem[]) => void
  ligandFileList: FileItem[]
  setLigandFileList: (receptorFileList: FileItem[]) => void
  centerPosition: CenterPosition
  setCenterPosition: (centerPosition: CenterPosition) => void
}
export const InputContext = createContext<InputContextType>({
  receptorFileList: [],
  setReceptorFileList: (receptorFileList: FileItem[]) => {},
  ligandFileList: [],
  setLigandFileList: (receptorFileList: FileItem[]) => {},
  centerPosition: {},
  setCenterPosition: () => {},
})

type FormContextType = {
  register: UseFormRegister<FieldValues>
  setValue: UseFormSetValue<FieldValues>
}

export const FormContext = createContext<FormContextType>(<FormContextType>{
  register: (name, options) => {
    return {} as FieldValues
  },
  setValue: (name, value, options) => {},
})
