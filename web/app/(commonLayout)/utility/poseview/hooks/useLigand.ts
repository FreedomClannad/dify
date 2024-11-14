import { useState } from 'react'
import { useUtilityA } from '@/app/hooks/useUtility'

export type useLigandType = ReturnType<typeof useLigand>

const useLigand = () => {
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
  } = useUtilityA()

  const [ligandFilesIds, setLigandFilesIds] = useState<string>('')

  const updateLigandFilesIds = (ids: string) => {
    setLigandFilesIds(ids)
  }

  const clearLigandFilesIds = () => {
    setLigandFilesIds('')
  }

  return {
    // 上传文件内容
    ligandUploadFileList: uploadFileList,
    setLigandUploadFileList: setUploadFileList,
    clearLigandUploadFileList: clearUploadFileList,
    // 上传文件结果
    addLigandUploadResult: addUploadResult,
    getLigandUploadResult: getUploadResult,
    deleteLigandUploadResult: deleteUploadResult,
    clearLigandUploadResult: clearUploadResult,
    // 结果输入内容展示
    ligandResultShowList: resultShowList,
    addLigandResultShow: addResultShow,
    uploadLigandResultShow: uploadResultShow,
    clearLigandResultShow: clearResultShow,
    // ligandIds
    ligandFilesIds,
    updateLigandFilesIds,
    clearLigandFilesIds,
  }
}

export default useLigand
