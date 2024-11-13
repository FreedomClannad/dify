import { createContext } from 'react'
import type { FieldError, FieldValues, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { useReceptorType } from '@/app/(commonLayout)/utility/poseview/hooks/useReceptor'
import type { PoseviewFormValues } from '@/app/(commonLayout)/utility/poseview/Input'
import type { useLigandType } from '@/app/(commonLayout)/utility/poseview/hooks/useLigand'
import type { UtilityMolstar, UtilityResultShow, UtilityUploadResult } from '@/types/utility'
import type { FileItem } from '@/models/datasets'
import type { useMolstarType } from '@/app/hooks/useMolstar'
import type { useUtilityResultType } from '@/app/hooks/useUtilityResult'
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

type OutputContextType = useUtilityResultType

export const OutputContext = createContext<OutputContextType>({
  resultData: '',
  resultTaskId: '',
  setResultData(value: ((prevState: string) => string) | string): void {},
  setResultTaskId(value: ((prevState: string) => string) | string): void {},
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

export const MolstarContext = createContext<useMolstarType>({
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  MolstarRef: null,
  molstarList: [],
  addStructure(molstar: UtilityMolstar): void {},
  clear(): void {},
  getStructure(id: string): UtilityMolstar | undefined {
    return undefined
  },
  loadStructureFromData(data: string | number[], formats: BuiltInTrajectoryFormat): void {},
  loadStructureFromUrl(url: string, formats: BuiltInTrajectoryFormat): void {},

  setIsMolstarMounted(value: ((prevState: boolean) => boolean) | boolean): void {},
  setStructureVisibility({ molstar, addCallback }: { molstar: UtilityMolstar; addCallback?: () => void }): void {},
})
