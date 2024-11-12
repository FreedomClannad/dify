import { useEffect, useRef, useState } from 'react'
import type { FileItem } from '@/models/datasets'
import type { UtilityResultShow, UtilityUploadResult } from '@/types/utility'

export const useUtilityA = () => {
// 上传文件内容
  const [uploadFileList, setUploadFileList] = useState<FileItem[]>([])

  // 上传文件结果
  const [uploadResultList, setUploadResultList] = useState<UtilityUploadResult[]>([])
  const uploadResultListRef = useRef(uploadResultList)
  useEffect(() => {
    uploadResultListRef.current = uploadResultList
  }, [uploadResultList])
  // 结果输入内容展示
  const [resultShowList, setResultShowList] = useState<UtilityResultShow[]>([])

  // 上传文件内容方法
  const clearUploadFileList = () => {
    setUploadFileList([])
  }

  // 上传文件结果
  // 新增
  const addUploadResult = (res: UtilityUploadResult) => {
    setUploadResultList((prev) => {
      const index = prev.findIndex(item => item.fileID === res.fileID)
      if (index !== -1)
        prev[index] = res
      else
        prev.push(res)
      return [...prev]
    })
  }
  // 根据传入的fileId来获取Recepto结果对象
  const getUploadResult = (fileId: string): UtilityUploadResult | undefined => {
    return uploadResultListRef.current.find(item => item.fileID === fileId)
  }
  // 根据传入的fileId来删除结果对象
  const deleteUploadResult = (fileId: string) => {
    const list = uploadResultListRef.current.filter(item => item.fileID !== fileId)
    setUploadResultList(list)
  }
  // 清除上传结果
  const clearUploadResult = () => {
    setUploadResultList([])
  }

  // 结果输入内容展示
  const addResultShow = (res: UtilityResultShow) => {
    setResultShowList((prev) => {
      const index = prev.findIndex(item => item.id === res.id)
      if (index !== -1)
        prev[index] = res
      else
        prev.push(res)
      return [...prev]
    })
  }

  // 更新数据
  const uploadResultShow = (res: UtilityResultShow) => {
    setResultShowList((prev) => {
      const index = prev.findIndex(item => item.id === res.id)
      if (index !== -1)
        prev[index] = { ...prev[index], ...res }
      return [...prev]
    })
  }

  // 清除
  const clearResultShow = () => {
    setResultShowList([])
  }

  // 控制显示是否显示3D结构
  const visibleResultShow = (id: string, visible: boolean) => {
    const list = resultShowList.map((item) => {
      if (item.id === id) {
        item.visible = visible
        return {
          ...item,
          visible,
        }
      }
      return item
    })
    setResultShowList(list)
  }
  return {
    // 上传文件内容
    uploadFileList,
    setUploadFileList,
    clearUploadFileList,
    // 上传文件结果
    uploadResultList,
    setUploadResultList,
    addUploadResult,
    getUploadResult,
    deleteUploadResult,
    clearUploadResult,
    // 结果输入内容展示
    resultShowList,
    setResultShowList,
    addResultShow,
    uploadResultShow,
    clearResultShow,
    visibleResultShow,
  }
}
