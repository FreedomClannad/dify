import { createContext } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { FieldValues, UseFormRegister } from 'react-hook-form'

type InputContextType = {
  loadUrl: (url: string, formats: BuiltInTrajectoryFormat) => void
}
export const InputContext = createContext<InputContextType>({
  loadUrl: (url: string, formats: BuiltInTrajectoryFormat) => {},
})

type FormContextType = {
  register: UseFormRegister<FieldValues>
}

export const FormContext = createContext<FormContextType>(<FormContextType>{
  register: (name, options) => {
    return {} as FieldValues
  },
})
