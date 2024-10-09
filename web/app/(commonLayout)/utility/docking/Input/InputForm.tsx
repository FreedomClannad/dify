import type { ReactNode } from 'react'
import { Button } from '@nextui-org/react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import JobTitle from '@/app/(commonLayout)/utility/docking/Input/JobTitle'
import ReceptorFile from '@/app/(commonLayout)/utility/docking/Input/ReceptorFile'
import Constraints from '@/app/(commonLayout)/utility/docking/Input/Constraints'
import LigandFile from '@/app/(commonLayout)/utility/docking/Input/LigandFile'
import OutPose from '@/app/(commonLayout)/utility/docking/Input/OutPose'
import { FormContext } from '@/app/(commonLayout)/utility/docking/Input/context'
import './index.css'
type Props = {
  isDisabled?: boolean
  onSubmit: (data: FieldValues) => void
  submitLoading?: boolean
}
const dockingFormSchema = z.object({
  task_name: z.string().min(1, { message: 'Please enter a task name' }),
  pdb_file_id: z.string().min(1, { message: 'Please upload a file' }),
  center_x: z.union([z.string().min(1, { message: 'Please select the corresponding coordinates' }), z.number()]),
  center_y: z.union([z.string().min(1, { message: 'Please select the corresponding coordinates' }), z.number()]),
  center_z: z.union([z.string().min(1, { message: 'Please select the corresponding coordinates' }), z.number()]),
  size_x: z.preprocess(value => Number(value), z.number().positive()),
  size_y: z.preprocess(value => Number(value), z.number().positive()),
  size_z: z.preprocess(value => Number(value), z.number().positive()),
  ligand_file_ids: z.string().min(1, { message: 'Please upload a file' }),
  out_pose_num: z.preprocess(value => Number(value), z.number().positive('Please enter data greater than 0')),
}).refine((data) => {
  return data.size_x > 0 && data.size_y > 0 && data.size_z > 0
}, {
  message: 'Please enter data greater than 0 for all size fields',
  path: ['size_x', 'size_y', 'size_z'],
})
export type DockingFormValues = z.infer<typeof dockingFormSchema>
const InputForm = ({ isDisabled = false, onSubmit, submitLoading = false }: Props) => {
  const { register, handleSubmit, getValues, setValue, formState: { errors } } = useForm<DockingFormValues>({
    resolver: zodResolver(dockingFormSchema),
    defaultValues: {
      pdb_file_id: '',
      task_name: 'Molecular Docking',
      center_x: '',
      center_y: '',
      center_z: '',
      size_x: 20,
      size_y: 20,
      size_z: 20,
      ligand_file_ids: '',
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
          <FormContext.Provider value={{ register, getValues, setValue, errors }}>
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
