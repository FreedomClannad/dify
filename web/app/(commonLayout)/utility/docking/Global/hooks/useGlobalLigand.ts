import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
const useGlobalLigand = () => {
  // 上传文件内容
  const [globalLigandUploadFileList, setGlobalLigandUploadFileList] = useState<FileItem[]>([])
  // 上传文件结果
  const [globalLigandUploadResultFileList, setGlobalLigandUploadResultFileList] = useState<DockingResultFile[]>([])
  // 控制显示Result Input File显示
  const [globalLigandResultInputFileList, setGlobalLigandResultInputFileList] = useState<DockingInputFile[]>([])
  // LigandFilesIds
  const [globalLigandFilesIds, setGlobalLigandFilesIds] = useState<string>('')
  // 上传文件内容
  const clearGlobalLigandFileList = () => {
    setGlobalLigandUploadFileList([])
  }

  // 上传文件结果
  /**
     * 新增Ligand结果列表,先判断传入的是否存在，如果存在，则替换原来的数据
     */
  const addGlobalLigandUploadResultFile = (file: DockingResultFile) => {
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
  const deleteGlobalLigandUploadResultFile = (id: string) => {
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
  const addGlobalLigandResultInputFile = (dockingInputFile: DockingInputFile) => {
    setGlobalLigandResultInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = dockingInputFile
      else
        prev.push(dockingInputFile)
      return [...prev]
    })
  }
  // 更新
  const updateGlobalLigandResultInputFile = (dockingInputFile: DockingInputFile) => {
    setGlobalLigandResultInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = { ...prev[index], ...dockingInputFile }
      return [...prev]
    })
  }
  // 清除
  const clearGlobalLigandResultInputFile = () => {
    setGlobalLigandResultInputFileList([])
  }
  // 控制显示Result Input的是否显示3D结构
  const visibleGlobalLigandResultInputFile = (id: string, visible: boolean) => {
    const newList = globalLigandResultInputFileList.map((item) => {
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
    setGlobalLigandResultInputFileList(newList)
  }
  // LigandFilesIds
  const updateGlobalLigandFilesIds = (ids: string) => {
    setGlobalLigandFilesIds(ids)
  }

  const clearGlobalLigandFilesIds = () => {
    setGlobalLigandFilesIds('')
  }
  return {
    // 上传文件内容
    globalLigandUploadFileList,
    clearGlobalLigandFileList,
    setGlobalLigandUploadFileList,
    // 上传文件结果
    globalLigandUploadResultFileList,
    addGlobalLigandUploadResultFile,
    updateGlobalLigandResultInputFile,
    clearGlobalLigandUploadResultFileList,
    getGlobalLigandUploadResultFile,
    deleteGlobalLigandUploadResultFile,
    // 控制显示Result Input File显示
    globalLigandResultInputFileList,
    addGlobalLigandResultInputFile,
    clearGlobalLigandResultInputFile,
    visibleGlobalLigandResultInputFile,
    // LigandFilesIds
    globalLigandFilesIds,
    updateGlobalLigandFilesIds,
    clearGlobalLigandFilesIds,
  }
}

export default useGlobalLigand
