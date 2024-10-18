import { useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
const useGlobalReceptor = () => {
  // 上传文件内容
  const [globalReceptorUploadFileList, setGlobalReceptorUploadFileList] = useState<FileItem[]>([])
  // 存放向后端上传文件后，后端返回结果内容
  const [globalReceptorUploadResultList, setGlobalReceptorUploadResultList] = useState<DockingResultFile[]>([])
  // 控制显示Result Input File显示
  const [globalReceptorInputFileList, setGlobalReceptorInputFileList] = useState<DockingInputFile[]>([])

  const clearGlobalReceptorFileList = () => {
    setGlobalReceptorUploadFileList([])
  }

  // 结果部分
  // 增加返回结果
  const addGlobalReceptorUploadResult = (dockingResultFile: DockingResultFile) => {
    // 如果已经存在，则更新，如果没有则新增
    const newList = globalReceptorUploadResultList.map((item) => {
      if (item.id === dockingResultFile.id)
        return dockingResultFile
      return item
    })
    if (!newList.find(item => item.id === dockingResultFile.id))
      newList.push(dockingResultFile)
    console.log(newList)
    setGlobalReceptorUploadResultList(newList)
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
  const getGlobalReceptorResultFile = (id: string): DockingResultFile | undefined => {
    console.log(globalReceptorUploadResultList)
    return globalReceptorUploadResultList.find(item => item.id === id)
  }

  // 控制显示Result Input File
  // 增加Result Input 的数据
  const addGlobalReceptorInputFile = (dockingInputFile: DockingInputFile) => {
    const newList = globalReceptorInputFileList.map((item) => {
      if (item.id === dockingInputFile.id)
        return dockingInputFile
      return item
    })
    if (!newList.find(item => item.id === dockingInputFile.id))
      newList.push(dockingInputFile)
    setGlobalReceptorInputFileList(newList)
  }
  // 控制显示Result Input的是否显示3D结构
  const visibleGlobalReceptorInputFile = (id: string, visible: boolean) => {
    const newList = globalReceptorInputFileList.map((item) => {
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
    setGlobalReceptorInputFileList(newList)
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
    getGlobalReceptorResultFile,
    // 控制显示Result Input File
    globalReceptorInputFileList,
    addGlobalReceptorInputFile,
    visibleGlobalReceptorInputFile,

  }
}

export default useGlobalReceptor
