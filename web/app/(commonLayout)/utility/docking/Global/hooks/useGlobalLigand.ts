import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
const useGlobalLigand = () => {
  // 上传文件内容
  const [globalLigandUploadFileList, setGlobalLigandUploadFileList] = useState<FileItem[]>([])
  // 上传文件结果
  const [globalLigandUploadResultFileList, setGlobalLigandUploadResultFileList] = useState<DockingResultFile[]>([])
  // 控制显示Result Input File显示
  const [globalLigandInputFileList, setGlobalLigandInputFileList] = useState<DockingInputFile[]>([])
  // 上传文件内容
  const clearGlobalLigandFileList = () => {
    setGlobalLigandUploadFileList([])
  }

  // 上传文件结果
  /**
     * 新增Ligand结果列表,先判断传入的是否存在，如果存在，则替换原来的数据
     */
  const addGlobalLigandUploadResultFileList = (file: DockingResultFile) => {
    setGlobalLigandUploadResultFileList((prev) => {
      const index = prev.findIndex(item => item.fileID === file.fileID)
      if (index !== -1)
        prev[index] = file
      else
        prev.push(file)

      return [...prev]
    })
  }
  /**
     * 根据传入的id来获取Ligand结果对应对象
     */
  const getGlobalLigandUploadResultFile = (id: string): DockingResultFile | undefined => {
    return globalLigandUploadResultFileList.find(item => item.fileID === id)
  }
  // 删除结果
  const deleteGlobalLigandUploadResult = (id: string) => {
    const newList = globalLigandUploadResultFileList.filter(item => item.id !== id)
    setGlobalLigandUploadResultFileList(newList)
  }
  /**
     * 清除Ligand结果列表
     */
  const clearGlobalLigandUploadResultFileList = () => {
    setGlobalLigandUploadResultFileList([])
  }

  // 控制显示Result Input File显示
  const addGlobalLigandInputFile = (dockingInputFile: DockingInputFile) => {
    setGlobalLigandInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = dockingInputFile
      else
        prev.push(dockingInputFile)
      return [...prev]
    })
  }
  // 更新
  const updateGlobalLigandInputFile = (dockingInputFile: DockingInputFile) => {
    setGlobalLigandInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = { ...prev[index], ...dockingInputFile }
      return [...prev]
    })
  }
  // 清除
  const clearGlobalLigandInputFile = () => {
    setGlobalLigandInputFileList([])
  }
  // 控制显示Result Input的是否显示3D结构
  const visibleGlobalLigandInputFile = (id: string, visible: boolean) => {
    const newList = globalLigandInputFileList.map((item) => {
      if (item.id === id) {
        item.visible = visible
        return {
          ...item,
          visible,
        }
      }
      return item
    },
    )
    setGlobalLigandInputFileList(newList)
  }
  return {
    // 上传文件内容
    globalLigandUploadFileList,
    clearGlobalLigandFileList,
    setGlobalLigandUploadFileList,
    // 上传文件结果
    globalLigandUploadResultFileList,
    addGlobalLigandUploadResultFileList,
    updateGlobalLigandInputFile,
    clearGlobalLigandUploadResultFileList,
    getGlobalLigandUploadResultFile,
    deleteGlobalLigandUploadResult,
    // 控制显示Result Input File显示
    globalLigandInputFileList,
    addGlobalLigandInputFile,
    clearGlobalLigandInputFile,
    visibleGlobalLigandInputFile,

  }
}

export default useGlobalLigand
