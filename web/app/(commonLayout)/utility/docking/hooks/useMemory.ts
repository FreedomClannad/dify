import type { FieldValues } from 'react-hook-form'
import { useEffect, useRef, useState } from 'react'

type SubmitMemory = {
  id: string
  values: FieldValues
}

const useMemory = () => {
  const [submitMemoryList, setSubmitMemoryList] = useState<SubmitMemory[]>([])
  const submitMemoryListRef = useRef(submitMemoryList)
  useEffect(() => {
    submitMemoryListRef.current = submitMemoryList
  }, [submitMemoryList])

  // 新增提交数据
  const addSubmitMemory = (memory: SubmitMemory) => {
    // 判断是否有重复的，如果有直接替换, 没有的话直接新增
    setSubmitMemoryList((prev) => {
      const index = prev.findIndex(item => item.id === memory.id)
      if (index !== -1)
        prev[index] = memory
      else
        prev.push(memory)

      return [...prev]
    })
  }

  // 根据id找到对应提交数据
  const getSubmitMemory = (id: string) => {
    // return submitMemoryList.find(item => item.id === id)
    return submitMemoryListRef.current.find(item => item.id === id)
  }

  // 根据id判断是否存在该数组中
  const isExistSubmitMemory = (id: string) => {
    // return submitMemoryList.some(item => item.id === id)
    return submitMemoryListRef.current.some(item => item.id === id)
  }

  // 清除数据
  const clearSubmitMemory = () => {
    setSubmitMemoryList([])
  }

  return {
    submitMemoryList,
    addSubmitMemory,
    getSubmitMemory,
    isExistSubmitMemory,
    clearSubmitMemory,
  }
}

export default useMemory
