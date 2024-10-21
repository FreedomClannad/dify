import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
const usePocketReceptor = () => {
  // 上传文件内容
  const [pocketReceptorUploadFileList, setPocketReceptorUploadFileList] = useState<FileItem[]>([])
  // 上传文件结果
  const [pocketReceptorUploadResultList, setPocketReceptorUploadResultList] = useState<DockingResultFile[]>([])
  // 控制显示Result Input File显示
  const [pocketReceptorResultInputFileList, setPocketReceptorResultInputFileList] = useState<DockingInputFile[]>([])
  // 上传文件内容
  const clearPocketReceptorUploadFileList = () => {
    setPocketReceptorUploadFileList([])
  }

  // 上传文件结果
  const addPocketReceptorUploadResultFile = (file: DockingResultFile) => {
    setPocketReceptorUploadResultList((prev) => {
      const index = prev.findIndex(item => item.fileID === file.fileID)
      if (index !== -1)
        prev[index] = file
      else
        prev.push(file)

      return [...prev]
    })
    setTimeout(() => {
      console.log(pocketReceptorUploadResultList)
    }, 500)
  }
  /**
     * 根据传入的id来获取Receptor结果对应的对象
     */
  const getPocketReceptorUploadResultFile = (id: string): DockingResultFile | undefined => {
    return pocketReceptorUploadResultList.find(item => item.fileID === id)
  }
  /**
     * 删除指定对象结果
     */
  const deletePocketReceptorUploadResultFile = (id: string) => {
    const newList = pocketReceptorUploadResultList.filter(item => item.fileID !== id)
    setPocketReceptorUploadResultList(newList)
  }
  /**
     * 清除Ligand结果列表
     */
  const clearPocketReceptorUploadResultFileList = () => {
    setPocketReceptorUploadResultList([])
  }

  // 控制显示Result Input File显示
  const addPocketReceptorResultInputFile = (dockingInputFile: DockingInputFile) => {
    setPocketReceptorResultInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = dockingInputFile
      else
        prev.push(dockingInputFile)
      return [...prev]
    })
  }

  // 更新
  const updatePocketReceptorResultInputFile = (dockingInputFile: DockingInputFile) => {
    setPocketReceptorResultInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = { ...prev[index], ...dockingInputFile }
      return [...prev]
    })
  }

  // 清除
  const clearPocketReceptorResultInputFileList = () => {
    setPocketReceptorResultInputFileList([])
  }

  // 控制显示Result Input的是否显示3D结构
  const visiblePocketReceptorResultInputFile = (id: string, visible: boolean) => {
    const newList = pocketReceptorResultInputFileList.map((item) => {
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
    setPocketReceptorResultInputFileList(newList)
  }

  return {
    // 上传文件内容
    pocketReceptorUploadFileList,
    setPocketReceptorUploadFileList,
    clearPocketReceptorUploadFileList,
    // 上传文件结果
    addPocketReceptorUploadResultFile,
    getPocketReceptorUploadResultFile,
    deletePocketReceptorUploadResultFile,
    clearPocketReceptorUploadResultFileList,
    // 控制显示Result Input File显示
    pocketReceptorResultInputFileList,
    addPocketReceptorResultInputFile,
    updatePocketReceptorResultInputFile,
    clearPocketReceptorResultInputFileList,
    visiblePocketReceptorResultInputFile,
  }
}

export default usePocketReceptor
