import { get, post, upload } from './base'

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

// 获取ligand file图片渲染
export const getLigandFileRenderList = (id: string) => {
  return get<string[]>(`/molecular-docking/files/rendering?file_id=${id}`)
}

export const downloadPocketFile = (id: string, range: string) => {
  return get<Blob>('/molecular-docking/download', {
    headers: new Headers({
      'Content-Type': 'application/octet-stream',
    }),
    params: {
      task_id: id,
      range,
    },
  })
}

export const downloadGlobalFile = (task_id: string, range: string) => {
  return get<Blob>('/global-docking/download', {
    headers: new Headers({
      'Content-Type': 'application/octet-stream',
    }),
    params: {
      task_id,
      range,
    },
  })
}
