import { createContext } from 'react'
import type { FieldError, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { useReceptorType } from '@/app/(commonLayout)/utility/poseview/hooks/useReceptor'
import type { PoseviewFormValues } from '@/app/(commonLayout)/utility/poseview/Input'
import type { useLigandType } from '@/app/(commonLayout)/utility/poseview/hooks/useLigand'
import type { UtilityResultShow, UtilityUploadResult } from '@/types/utility'
import type { FileItem } from '@/models/datasets'
type InputContextType = useReceptorType & useLigandType

export const PoseviewContext = createContext<InputContextType>({
  ligandResultShowList: [],
  ligandUploadFileList: [],
  receptorResultShowList: [],
  receptorUploadFileList: [],
  addLigandResultShow(res: UtilityResultShow): void {},
  addLigandUploadResult(res: UtilityUploadResult): void {},
  addReceptorResultShow(result: UtilityResultShow): void {},
  addReceptorUploadResult(result: UtilityUploadResult): void {},
  clearLigandResultShow(): void {},
  clearLigandUploadFileList(): void {},
  clearLigandUploadResult(): void {},
  clearReceptorResultShow(): void {},
  clearReceptorUploadFileList(): void {},
  clearReceptorUploadResult(): void {},
  deleteLigandUploadResult(fileId: string): void {},
  deleteReceptorUploadResult(id: string): void {},
  getLigandUploadResult(fileId: string): UtilityUploadResult | undefined {
    return undefined
  },
  getReceptorUploadResult(id: string): UtilityUploadResult | undefined {
    return undefined
  },
  setLigandUploadFileList(value: ((prevState: FileItem[]) => FileItem[]) | FileItem[]): void {},
  setReceptorUploadFileList(value: ((prevState: FileItem[]) => FileItem[]) | FileItem[]): void {},
  uploadLigandResultShow(res: UtilityResultShow): void {},
  uploadReceptorResultShow(result: UtilityResultShow): void {},
  visibleReceptorResultShow(id: string, visible: boolean): void {},
})

type FormContextType = {
  register: UseFormRegister<PoseviewFormValues>
  getValues: UseFormGetValues<PoseviewFormValues>
  setValue: UseFormSetValue<PoseviewFormValues>
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  errors: FieldError<FormValues>
}

export const FormContext = createContext<FormContextType>(<FormContextType>{
  register: (name, options) => {
    return {} as FieldValues
  },
  getValues: () => {},
  setValue: (name, value, options) => {},
  errors: {} as FieldError,
})
