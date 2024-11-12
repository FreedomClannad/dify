import { useUtilityA } from '@/app/hooks/useUtility'

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
  }
}

export default useLigand
