import { createContext } from 'react'
import type { FieldError, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { useReceptorType } from '@/app/(commonLayout)/utility/poseview/hooks/useReceptor'
import type { PoseviewFormValues } from '@/app/(commonLayout)/utility/poseview/Input'
type InputContextType = useReceptorType

export const PoseviewContext = createContext<InputContextType>({

  receptorResultShowList: [],
  receptorUploadFileList: [],
  addReceptorResultShow: () => {},
  addReceptorUploadResult: () => {},
  clearReceptorResultShow: () => {},
  clearReceptorUploadFileList: () => {},
  clearReceptorUploadResult: () => {},
  deleteReceptorUploadResult: () => {},
  getReceptorUploadResult: () => undefined,
  setReceptorUploadFileList: () => {},
  uploadReceptorResultShow: () => {},
  visibleReceptorResultShow: () => {},

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
