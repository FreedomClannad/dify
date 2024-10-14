import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { FileItem } from '@/models/datasets'

export enum DockingModeEnum {
  input = 'input',
  result = 'result',
}

export type CenterPosition = {
  x?: number
  y?: number
  z?: number
  num?: string
  chain?: string
}

export enum ConstraintsCenterEnum {
  ligand = 'ligand',
  residue = 'residue',
  coordinates = 'coordinates',
}

export type DockingMolstar = {
  id: string
  visible: boolean
}

export type DockingResultFile = {
  fileId: string
  id: string
  mime_type: string
  extension: BuiltInTrajectoryFormat
}

export type DockingUploadFile = FileItem & {
  visible: boolean
}

export type CenterState = {
  [ConstraintsCenterEnum.ligand]: CenterPosition
  [ConstraintsCenterEnum.residue]: CenterPosition
  [ConstraintsCenterEnum.coordinates]: CenterPosition
}
