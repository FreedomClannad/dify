import { createContext } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'

type InputContextType = {
  resultData: string
  loadStructureFromData: (data: string | number[], format: BuiltInTrajectoryFormat) => void
}
export const ResultContext = createContext<InputContextType>({
  resultData: '',
  loadStructureFromData: (data: string | number[], format: BuiltInTrajectoryFormat) => {},
})
