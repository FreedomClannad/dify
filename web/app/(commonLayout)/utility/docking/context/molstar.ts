import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import { createContext } from 'react'
import type { DockingMolstar } from '@/types/docking'

type MolstarContextType = {
  dockingMolstarList: DockingMolstar[]
  addStructure: (dockingMolstar: DockingMolstar) => void
  loadStructureFromUrl: (url: string, formats: BuiltInTrajectoryFormat) => void
  loadStructureFromData: (data: string | number[], format: BuiltInTrajectoryFormat) => void
  setStructureVisibility: ({ dockingMolstar, addCallback }: { dockingMolstar: DockingMolstar; addCallback?: () => void }) => void
}

export const MolstarContext = createContext<MolstarContextType>({
  dockingMolstarList: [],
  addStructure: (dockingMolstar: DockingMolstar) => {},
  loadStructureFromUrl: (url: string, formats: BuiltInTrajectoryFormat) => {},
  loadStructureFromData: (data: string | number[], format: BuiltInTrajectoryFormat) => {},
  setStructureVisibility: ({ dockingMolstar, addCallback }: { dockingMolstar: DockingMolstar; addCallback?: () => void }) => {},
})
