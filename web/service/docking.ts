import { post, upload } from './base'

export const getCenterPosition = (pdb_file_id: string): Promise<{ center_x: number; center_y: number; center_z: number; residue_number: number; chain: string }> => {
  return post<{ center_x: number; center_y: number; center_z: number; residue_number: number; chain: string }>('/molecular-docking/center-position', { body: { pdb_file_id } })
}

export const submitDockingTask = (data: any) => {
  return post('/molecular-docking/task', { body: data })
}

export const getDockingFileURL = ({ id, mime_type }: { id: string; mime_type: string }) => {
  return `${process.env.NEXT_PUBLIC_API_PREFIX}/molecular-docking/files/${id}?mime_type=${mime_type}`
}

export const GlobalUpload = (formData: any, source = 'fasta') => {
  return upload({
    xhr: new XMLHttpRequest(),
    data: formData,
  }, false, `/global-docking/files/upload?source=${source}`)
}

export const submitGlobalDockingTask = (data: any) => {
  return post('/global-docking/task', { body: data })
}