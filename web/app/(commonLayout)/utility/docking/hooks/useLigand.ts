import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingResultFile } from '@/types/docking'
const useLigand = () => {
  const [ligandFileList, setLigandFileList] = useState<FileItem[]>([])
  const [ligandResultFileList, setLigandResultFileList] = useState<DockingResultFile[]>([])
  /**
     * 新增Ligand结果列表,先判断传入的是否存在，如果存在，则替换原来的数据
     */
  const addLigandResultFileList = (file: DockingResultFile) => {
    setLigandResultFileList((prev) => {
      const index = prev.findIndex(item => item.fileID === file.fileID)
      if (index !== -1)
        prev[index] = file
      else
        prev.push(file)

      return [...prev]
    })
  }
  /**
    * 清除Ligand结果列表
    */
  const clearLigandResultFileList = () => {
    setLigandResultFileList([])
  }
  /**
     * 根据传入的id来获取Ligand结果对应对象
     */
  const getLigandResultFileById = (id: string) => {
    return ligandResultFileList.find(item => item.fileID === id)
  }
  const clearLigandFileList = () => {
    setLigandFileList([])
  }
  return { ligandFileList, setLigandFileList, ligandResultFileList, addLigandResultFileList, clearLigandResultFileList, getLigandResultFileById, clearLigandFileList }
}

export default useLigand
