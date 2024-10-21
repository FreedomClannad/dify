import { useState } from 'react'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'

const useCropReceptor = () => {
  // Receptor的Crop结果列表
  const [cropReceptorResultList, setCropReceptorResultList] = useState<DockingResultFile[]>([])
  // Crop控制显示Result Input File显示
  const [cropRecepResultInputList, setCropRecepResultInputList] = useState<DockingInputFile[]>([])
  // Receptor的Crop结果列表
  /**
     * 新增Ligand结果列表,先判断传入的是否存在，如果存在，则替换原来的数据
     */
  const addCropReceptorResult = (file: DockingResultFile) => {
    setCropReceptorResultList((prev) => {
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
  const clearCropReceptorResultList = () => {
    setCropReceptorResultList([])
  }

  /**
     * 根据传入的id来获取Ligand结果对应对象
     */
  const getCropReceptorResult = (id: string) => {
    console.log(id)
    console.log(cropReceptorResultList)
    return cropReceptorResultList.find(item => item.fileID === id)
  }

  // Crop控制显示Result Input File显示

  // 控制显示Result Input File显示
  const addCropRecepResultInputFile = (dockingInputFile: DockingInputFile) => {
    setCropRecepResultInputList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = dockingInputFile
      else
        prev.push(dockingInputFile)
      return [...prev]
    })
  }

  // 更新
  const updateCropRecepResultInputFile = (dockingInputFile: DockingInputFile) => {
    setCropRecepResultInputList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = { ...prev[index], ...dockingInputFile }
      return [...prev]
    })
  }

  // 清除
  const clearCropRecepResultInputFileList = () => {
    setCropRecepResultInputList([])
  }
  return {
    cropReceptorResultList,
    addCropReceptorResult,
    getCropReceptorResult,
    clearCropReceptorResultList,
    cropRecepResultInputList,
    addCropRecepResultInputFile,
    updateCropRecepResultInputFile,
    clearCropRecepResultInputFileList,
  }
}

export default useCropReceptor
