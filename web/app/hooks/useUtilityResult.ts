import { useState } from 'react'
export type useUtilityResultType = ReturnType<typeof useUtilityResult>
const useUtilityResult = () => {
  const [resultData, setResultData] = useState<string>('')
  const [resultTaskId, setResultTaskId] = useState<string>('')
  return {
    resultData,
    setResultData,
    resultTaskId,
    setResultTaskId,
  }
}

export default useUtilityResult
