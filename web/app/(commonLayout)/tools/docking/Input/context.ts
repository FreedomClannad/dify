import { createContext } from 'react'
import type { FieldError, FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { CenterPosition } from '@/types/docking'
import type { FileItem } from '@/models/datasets'
import type { DockingFormValues } from '@/app/(commonLayout)/tools/docking/Input/InputForm'

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
  register: UseFormRegister<DockingFormValues>
  setValue: UseFormSetValue<DockingFormValues>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  errors: FieldError<DockingFormValues>
}

export const FormContext = createContext<FormContextType>(<FormContextType>{
  register: (name, options) => {
    return {} as FieldValues
  },
  setValue: (name, value, options) => {},
  errors: {} as FieldError,
})
