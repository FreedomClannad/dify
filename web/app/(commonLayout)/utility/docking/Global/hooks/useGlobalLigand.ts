import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingResultFile } from '@/types/docking'
const useGlobalLigand = () => {
  const [globalLigandFileList, setGlobalLigandFileList] = useState<FileItem[]>([])
  const [globalLigandResultFileList, setGlobalLigandResultFileList] = useState<DockingResultFile[]>([])
  /**
     * 新增Ligand结果列表,先判断传入的是否存在，如果存在，则替换原来的数据
     */
  const addGlobalLigandResultFileList = (file: DockingResultFile) => {
    setGlobalLigandResultFileList((prev) => {
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
  const clearGlobalLigandResultFileList = () => {
    setGlobalLigandResultFileList([])
  }
  /**
     * 根据传入的id来获取Ligand结果对应对象
     */
  const getGlobalLigandResultFileById = (id: string) => {
    console.log(id)
    console.log(globalLigandResultFileList)
    return globalLigandResultFileList.find(item => item.fileID === id)
  }
  const clearGlobalLigandFileList = () => {
    setGlobalLigandFileList([])
  }
  return { globalLigandFileList, setGlobalLigandFileList, addGlobalLigandResultFileList, clearGlobalLigandResultFileList, getGlobalLigandResultFileById, clearGlobalLigandFileList }
}

export default useGlobalLigand
