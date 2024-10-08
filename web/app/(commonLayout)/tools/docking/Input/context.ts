import { createContext } from 'react'
import type { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { CenterPosition } from '@/types/docking'

type InputContextType = {
  centerPosition: CenterPosition
  setCenterPosition: (centerPosition: CenterPosition) => void
}
export const InputContext = createContext<InputContextType>({
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
