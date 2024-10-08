import type { ReactNode } from 'react'
import { Button } from '@nextui-org/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import JobTitle from '@/app/(commonLayout)/tools/docking/Input/JobTitle'
import ReceptorFile from '@/app/(commonLayout)/tools/docking/Input/ReceptorFile'
import Constraints from '@/app/(commonLayout)/tools/docking/Input/Constraints'
import LigandFile from '@/app/(commonLayout)/tools/docking/Input/LigandFile'
import OutPose from '@/app/(commonLayout)/tools/docking/Input/OutPose'
import { FormContext } from '@/app/(commonLayout)/tools/docking/Input/context'
type Props = {
  isDisabled?: boolean
  onSubmit: (data: FieldValues) => void
  submitLoading?: boolean
}
const dockingFormSchema = z.object({
  task_name: z.string().min(1, { message: 'Please enter a task name' }),
  center_x: z.union([z.number(), z.undefined()]),
  center_y: z.union([z.number(), z.undefined()]),
  center_z: z.union([z.number(), z.undefined()]),
  size_x: z.number().nonpositive('请填写大于0的数据'),
  size_y: z.number().nonpositive(),
  size_z: z.number().nonpositive(),
  out_pose_num: z.number().nonpositive('请填写大于0的数据'),
})
export type DockingFormValues = z.infer<typeof dockingFormSchema>
const InputForm = ({ isDisabled = false, onSubmit, submitLoading = false }: Props) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<DockingFormValues>({
    resolver: zodResolver(dockingFormSchema),
    defaultValues: {
      size_x: 20,
      size_y: 20,
      size_z: 20,
      out_pose_num: 10,
    },
  })
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<JobTitle/>, <ReceptorFile/>, <Constraints/>, <LigandFile />, <OutPose />]

  return <>
    <div className="px-5 flex flex-col items-center justify-between h-full pb-3" style={{ display: isDisabled ? 'none' : 'flex' }}>
      <form className="h-full flex justify-between flex-col" onSubmit={handleSubmit((data) => {
        onSubmit(data)
      })}>
        <div>
          <FormContext.Provider value={{ register, setValue, errors }}>
            {contentList.map((content, index) => <div key={`inputForm-${index}`} className="mt-4">{content}</div>)}
          </FormContext.Provider>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex justify-center w-[80%] mt-3">
            <Button type="submit" color="primary" radius="sm" fullWidth isLoading={submitLoading}>Run</Button>
          </div>
        </div>

      </form>
    </div>
  </>
}

export default InputForm
