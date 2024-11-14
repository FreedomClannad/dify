import type { ReactNode } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import JobTitle from './JobTitle'
import SubmitButton from '@/app/components/ALM/SubmitButton'
import ReceptorFile from '@/app/(commonLayout)/utility/poseview/Input/ReceptorFile'
import { FormContext } from '@/app/(commonLayout)/utility/poseview/context'
import LigandFile from '@/app/(commonLayout)/utility/poseview/Input/LigandFile'

const FormSchema = z.object({
  task_name: z.string().min(1, { message: 'Please enter a task name' }),
  receptor_file_id: z.string().min(1, { message: 'Please upload a file' }),
  ligand_file_ids: z.string().min(1, { message: 'Please upload a file' }),
})
export type PoseviewFormValues = z.infer<typeof FormSchema>
type Props = {
  disabled?: boolean
  onSubmit: (data: PoseviewFormValues) => void
  onReset: () => void
  submitLoading?: boolean
}
const PoseviewInput = ({ disabled, onSubmit, onReset, submitLoading = false }: Props) => {
  const { register, handleSubmit, getValues, setValue, formState: { errors }, reset } = useForm<PoseviewFormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      task_name: 'Poseview - 1',
      receptor_file_id: '',
      ligand_file_ids: '',
    },
  })
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<JobTitle/>, <ReceptorFile/>, <LigandFile/>]
  return <>
    <div className="px-5 flex flex-col items-center justify-between h-full pb-3" style={{ display: disabled ? 'none' : 'flex' }}>
      <form className="h-full flex justify-between flex-col w-full" onSubmit={handleSubmit((data) => {
        onSubmit(data)
      })}>
        <div>
          <FormContext.Provider value={{ register, getValues, setValue, errors }}>
            {contentList.map((content, index) => <div key={`inputForm-${index}`} className="mt-4">{content}</div>)}
          </FormContext.Provider>
        </div>
        <SubmitButton className="pb-3" runLoading={submitLoading} onReset={() => {
          reset()
          onReset()
        }} />
      </form>
    </div>
  </>
}

export default PoseviewInput
