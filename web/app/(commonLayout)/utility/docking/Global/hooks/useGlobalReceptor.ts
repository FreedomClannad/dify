import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
const useGlobalReceptor = () => {
  // 上传文件内容
  const [globalReceptorUploadFileList, setGlobalReceptorUploadFileList] = useState<FileItem[]>([])
  // 存放向后端上传文件后，后端返回结果内容
  const [globalReceptorUploadResultList, setGlobalReceptorUploadResultList] = useState<DockingResultFile[]>([])
  // 控制显示Result Input File显示
  const [globalReceptorResultInputFileList, setGlobalReceptorResultInputFileList] = useState<DockingInputFile[]>([])

  const clearGlobalReceptorFileList = () => {
    setGlobalReceptorUploadFileList([])
  }

  // 结果部分
  // 增加返回结果
  const addGlobalReceptorUploadResult = (dockingResultFile: DockingResultFile) => {
    // 如果已经存在，则更新，如果没有则新增
    setGlobalReceptorUploadResultList((prev) => {
      const index = prev.findIndex(item => item.id === dockingResultFile.id)
      if (index !== -1)
        prev[index] = dockingResultFile
      else
        prev.push(dockingResultFile)

      return [...prev]
    })
  }

  // 删除结果
  const deleteGlobalReceptorUploadResult = (id: string) => {
    const newList = globalReceptorUploadResultList.filter(item => item.id !== id)
    setGlobalReceptorUploadResultList(newList)
  }

  // 清除所有结果
  const clearGlobalReceptorUploadResultList = () => {
    setGlobalReceptorUploadResultList([])
  }

  // 根据传入的ID获取到返回结果内容
  const getGlobalReceptorUploadResultFile = (id: string): DockingResultFile | undefined => {
    return globalReceptorUploadResultList.find(item => item.id === id)
  }

  // 控制显示Result Input File
  // 增加Result Input 的数据
  const addGlobalReceptorResultInputFile = (dockingInputFile: DockingInputFile) => {
    setGlobalReceptorResultInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = dockingInputFile
      else
        prev.push(dockingInputFile)
      return [...prev]
    })
  }
  // 更新
  const updateGlobalReceptorResultInputFile = (dockingInputFile: DockingInputFile) => {
    setGlobalReceptorResultInputFileList((prev) => {
      const index = prev.findIndex(item => item.id === dockingInputFile.id)
      if (index !== -1)
        prev[index] = { ...prev[index], ...dockingInputFile }
      return [...prev]
    })
  }
  // 清除
  const clearGlobalReceptorResultInputFile = () => {
    setGlobalReceptorResultInputFileList([])
  }
  // 控制显示Result Input的是否显示3D结构
  const visibleGlobalReceptorResultInputFile = (id: string, visible: boolean) => {
    const newList = globalReceptorResultInputFileList.map((item) => {
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
    setGlobalReceptorResultInputFileList(newList)
  }
  return {
    globalReceptorUploadFileList,
    setGlobalReceptorUploadFileList,
    clearGlobalReceptorFileList,
    // 返回结果
    globalReceptorUploadResultList,
    setGlobalReceptorUploadResultList,
    addGlobalReceptorUploadResult,
    deleteGlobalReceptorUploadResult,
    clearGlobalReceptorUploadResultList,
    getGlobalReceptorUploadResultFile,
    // 控制显示Result Input File
    globalReceptorResultInputFileList,
    addGlobalReceptorResultInputFile,
    updateGlobalReceptorResultInputFile,
    clearGlobalReceptorResultInputFile,
    visibleGlobalReceptorResultInputFile,

  }
}

export default useGlobalReceptor