import { createContext } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { CenterPosition } from '@/types/docking'

type InputContextType = {
  loadUrl: (url: string, formats: BuiltInTrajectoryFormat) => void
  centerPosition: CenterPosition
}
export const InputContext = createContext<InputContextType>({
  loadUrl: (url: string, formats: BuiltInTrajectoryFormat) => {},
  centerPosition: {},
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
