import { post } from './base'

export const getCenterPosition = (pdb_file_id: string): Promise<{ center_x: number; center_y: number; center_z: number; residue_number: number; chain: string }> => {
  return post<{ center_x: number; center_y: number; center_z: number; residue_number: number; chain: string }>('/molecular-docking/center-position', { body: { pdb_file_id } })
}

export const submitDockingTask = (data: any) => {
  return post('/molecular-docking/task', { body: data })
}

export const getDockingFileURL = ({ id, mime_type }: { id: string; mime_type: string }) => {
  return `${process.env.NEXT_PUBLIC_API_PREFIX}/molecular-docking/files/${id}?mime_type=${mime_type}`
}
