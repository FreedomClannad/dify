import { create } from 'zustand'
import type { DockingInputFile, DockingResultFile } from '@/types/docking'
import type { FileItem } from '@/models/datasets'

type State = {
  // 上传文件内容
  pocketReceptorUploadFileList: FileItem[]
  // 上传文件结果
  pocketReceptorUploadResultList: DockingResultFile[]
  // 控制显示Result Input File显示
  pocketReceptorResultInputFileList: DockingInputFile[]
}

type Action = {
  // 上传文件内容
  setPocketReceptorUploadFileList: (value: FileItem[]) => void
  // 上传文件结果
  setPocketReceptorUploadResultList: (value: DockingResultFile[]) => void
  // 控制显示Result Input File显示
  setPocketReceptorResultInputFileList: (value: DockingInputFile[]) => void
}

const initialState: State = {
  pocketReceptorUploadFileList: [],
  pocketReceptorUploadResultList: [],
  pocketReceptorResultInputFileList: [],
}

/**
 * @Author 费超远
 * @Description 逆合成store对象
 * @Date 13:05 2024/3/20
 * @Version 1.0
 **/
const usePocketStore = create<State & Action>(set => ({
  ...initialState,
  setPocketReceptorUploadFileList: (value: FileItem[]) => set({ pocketReceptorUploadFileList: value }),
  setPocketReceptorUploadResultList: (value: DockingResultFile[]) => set({ pocketReceptorUploadResultList: value }),
  setPocketReceptorResultInputFileList: (value: DockingInputFile[]) => {
    set({ pocketReceptorResultInputFileList: value })
  },
}))

export const usePocketReceptorState = () => usePocketStore((state) => {
  return {
    pocketReceptorUploadFileList: state.pocketReceptorUploadFileList,
    pocketReceptorUploadResultList: state.pocketReceptorUploadResultList,
    pocketReceptorResultInputFileList: state.pocketReceptorResultInputFileList,

  }
})

export const usePocketReceptorAction = () => usePocketStore((action) => {
  return {
    setPocketReceptorUploadFileList: action.setPocketReceptorUploadFileList,
    setPocketReceptorUploadResultList: action.setPocketReceptorUploadResultList,
    setPocketReceptorResultInputFileList: action.setPocketReceptorResultInputFileList,
  }
},
)
