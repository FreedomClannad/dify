import type { Dispatch, SetStateAction } from 'react'
import { useUtilityA } from '@/app/hooks/useUtility'
import type { FileItem } from '@/models/datasets'
import type { UtilityResultShow, UtilityUploadResult } from '@/types/utility'
export type useReceptorType = {
  // 上传文件内容
  receptorUploadFileList: FileItem[]
  setReceptorUploadFileList: Dispatch<SetStateAction<FileItem[]>>
  clearReceptorUploadFileList: () => void
  // 上传文件结果
  addReceptorUploadResult: (result: UtilityUploadResult) => void
  getReceptorUploadResult: (id: string) => UtilityUploadResult | undefined
  deleteReceptorUploadResult: (id: string) => void
  clearReceptorUploadResult: () => void
  // 结果输入内容展示
  receptorResultShowList: UtilityResultShow[]
  addReceptorResultShow: (result: UtilityResultShow) => void
  uploadReceptorResultShow: (result: UtilityResultShow) => void
  clearReceptorResultShow: () => void
  visibleReceptorResultShow: (id: string, visible: boolean) => void
}

const useReceptor = (): useReceptorType => {
  const {
    // 上传文件内容
    uploadFileList,
    setUploadFileList,
    clearUploadFileList,
    // 上传文件结果
    addUploadResult,
    getUploadResult,
    deleteUploadResult,
    clearUploadResult,
    // 结果输入内容展示
    resultShowList,
    addResultShow,
    uploadResultShow,
    clearResultShow,
    visibleResultShow,
  } = useUtilityA()
  return {
    // 上传文件内容
    receptorUploadFileList: uploadFileList,
    setReceptorUploadFileList: setUploadFileList,
    clearReceptorUploadFileList: clearUploadFileList,
    // 上传文件结果
    addReceptorUploadResult: addUploadResult,
    getReceptorUploadResult: getUploadResult,
    deleteReceptorUploadResult: deleteUploadResult,
    clearReceptorUploadResult: clearUploadResult,
    // 结果输入内容展示
    receptorResultShowList: resultShowList,
    addReceptorResultShow: addResultShow,
    uploadReceptorResultShow: uploadResultShow,
    clearReceptorResultShow: clearResultShow,
    visibleReceptorResultShow: visibleResultShow,
  }
}

export default useReceptor
