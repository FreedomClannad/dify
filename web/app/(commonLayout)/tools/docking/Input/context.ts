import { createContext } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'

type InputContextType = {
  loadUrl: (url: string, formats: BuiltInTrajectoryFormat) => void
}
export const InputContext = createContext<InputContextType>({
  loadUrl: (url: string, formats: BuiltInTrajectoryFormat) => {},
})
