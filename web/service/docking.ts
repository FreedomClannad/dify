import { post } from './base'

export const getCenterPosition = (pdb_file_id: string): Promise<{ center_x: number; center_y: number; center_z: number }> => {
  return post<{ center_x: number; center_y: number; center_z: number }>('/molecular-docking/center-position', { body: { pdb_file_id } })
}
