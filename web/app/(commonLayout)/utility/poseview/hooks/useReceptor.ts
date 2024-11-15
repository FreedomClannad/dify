import { useUtilityA } from '@/app/hooks/useUtility'
export type useReceptorType = ReturnType<typeof useReceptor>

const useReceptor = () => {
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
    updateResultShow,
    clearResultShow,
    visibleResultShow,
    // 公共方法
    allClear,
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
    updateReceptorResultShow: updateResultShow,
    clearReceptorResultShow: clearResultShow,
    visibleReceptorResultShow: visibleResultShow,
    // 公共方法
    receptorAllClear: allClear,
  }
}

export default useReceptor
