export enum DockingModeEnum {
  input = 'input',
  result = 'result',
}

export type CenterPosition = {
  x?: number
  y?: number
  z?: number
}

export enum ConstraintsCenterEnum {
  ligand = 'ligand',
  residue = 'residue',
  coordinates = 'coordinates',
}
