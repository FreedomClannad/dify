import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import { createContext } from 'react'

type MolstarContextType = {
  loadStructureFromUrl: (url: string, formats: BuiltInTrajectoryFormat) => void
  loadStructureFromData: (data: string | number[], format: BuiltInTrajectoryFormat) => void
}

export const MolstarContext = createContext<MolstarContextType>({
  loadStructureFromUrl: (url: string, formats: BuiltInTrajectoryFormat) => {},
  loadStructureFromData: (data: string | number[], format: BuiltInTrajectoryFormat) => {},
})
