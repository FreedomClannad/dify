import { useState } from 'react'
import type { DockingResultFile } from '@/types/docking'

const useCropReceptor = () => {
  const [cropReceptorList, setCropReceptorList] = useState<DockingResultFile[]>([])
  /**
     * 新增Ligand结果列表,先判断传入的是否存在，如果存在，则替换原来的数据
     */
  const addCropReceptor = (file: DockingResultFile) => {
    setCropReceptorList((prev) => {
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
  const clearCropReceptorList = () => {
    setCropReceptorList([])
  }
  /**
     * 根据传入的id来获取Ligand结果对应对象
     */
  const getCropReceptorById = (id: string) => {
    return cropReceptorList.find(item => item.fileID === id)
  }
  return {
    cropReceptorList,
    addCropReceptor,
    clearCropReceptorList,
    getCropReceptorById,
  }
}

export default useCropReceptor
