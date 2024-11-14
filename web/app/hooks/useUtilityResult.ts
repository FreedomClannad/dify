import { useState } from 'react'
export type useUtilityResultType = ReturnType<typeof useUtilityResult>
const useUtilityResult = () => {
  const [resultData, setResultData] = useState<string>('')
  const [resultTaskId, setResultTaskId] = useState<string>('')
  const resultAllClear = () => {
    setResultData('')
    setResultTaskId('')
  }
  return {
    resultData,
    setResultData,
    resultTaskId,
    setResultTaskId,
    resultAllClear,
  }
}

export default useUtilityResult
