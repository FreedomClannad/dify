import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
const usePocketLigand = () => {
  // 上传文件内容
  const [pocketLigandUploadFileList, setPocketLigandUploadFileList] = useState<FileItem[]>([])
  // 上传文件结果
  const [pocketLigandUploadResultFileList, setPocketLigandUploadResultFileList] = useState<DockingResultFile[]>([])
  // 控制显示Result Input File显示
  const [pocketLigandResultInputFileList, setPocketLigandResultInputFileList] = useState<DockingInputFile[]>([])
  // LigandFilesIds
  const [pocketLigandFilesIds, setPocketLigandFilesIds] = useState<string>('')

  // 上传文件内容
  const clearPocketLigandUploadFileList = () => {
    setPocketLigandUploadFileList([])
  }
  // 上传文件结果
  /**
     * 新增Ligand结果列表,先判断传入的是否存在，如果存在，则替换原来的数据
     */
  const addPocketLigandUploadResultFile = (file: DockingResultFile) => {
    setPocketLigandUploadResultFileList((prev) => {
      const index = prev.findIndex(item => item.fileID === file.fileID)
      if (index !== -1)
        prev[index] = file
      else
        prev.push(file)

      return [...prev]
    })
  }

  /**
     * 根据传入的id来获取Receptor结果对应的对象
     */
  const getPocketLigandUploadResultFile = (id: string): DockingResultFile | undefined => {
    return pocketLigandUploadResultFileList.find(item => item.fileID === id)
  }

  /**
     * 删除指定对象结果
     */
  const deletePocketLigandUploadResultFile = (id: string) => {
    const newList = pocketLigandUploadResultFileList.filter(item => item.fileID !== id)
    setPocketLigandUploadResultFileList(newList)
  }

  /**
     * 清除Ligand结果列表
     */
  const clearPocketLigandUploadResultFileList = () => {
    setPocketLigandUploadResultFileList([])
  }

  // 控制显示Result Input File显示
  const addPocketLigandResultInputFile = (dockingInputFile: DockingInputFile) => {
    setPocketLigandResultInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = dockingInputFile
      else
        prev.push(dockingInputFile)
      return [...prev]
    })
  }

  // 更新
  const updatePocketLigandResultInputFile = (dockingInputFile: DockingInputFile) => {
    setPocketLigandResultInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = { ...prev[index], ...dockingInputFile }
      return [...prev]
    })
  }

  // 清除
  const clearPocketLigandResultInputFileList = () => {
    setPocketLigandResultInputFileList([])
  }

  // 控制显示Result Input的是否显示3D结构
  const visiblePocketReceptorResultInputFile = (id: string, visible: boolean) => {
    const newList = pocketLigandResultInputFileList.map((item) => {
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
    setPocketLigandResultInputFileList(newList)
  }

  // LigandFilesIds
  const updatePocketLigandFilesIds = (ids: string) => {
    setPocketLigandFilesIds(ids)
  }

  const clearPocketLigandFilesIds = () => {
    setPocketLigandFilesIds('')
  }

  return {
    // 上传文件内容
    pocketLigandUploadFileList,
    setPocketLigandUploadFileList,
    clearPocketLigandUploadFileList,
    // 上传文件结果
    addPocketLigandUploadResultFile,
    getPocketLigandUploadResultFile,
    deletePocketLigandUploadResultFile,
    clearPocketLigandUploadResultFileList,

    // 控制显示Result Input File显示
    pocketLigandResultInputFileList,
    addPocketLigandResultInputFile,
    updatePocketLigandResultInputFile,
    clearPocketLigandResultInputFileList,
    visiblePocketReceptorResultInputFile,

    // LigandFilesIds
    pocketLigandFilesIds,
    updatePocketLigandFilesIds,
    clearPocketLigandFilesIds,
  }
}

export default usePocketLigand
