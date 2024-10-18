import type { ReactNode } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext } from 'react'
import Strategy from '../components/Strategy'
import SubmitButton from '../components/SubmitButton'
import JobTitle from '@/app/(commonLayout)/utility/docking/Input/JobTitle'
import ReceptorFile from '@/app/(commonLayout)/utility/docking/Input/ReceptorFile'
import Constraints from '@/app/(commonLayout)/utility/docking/Input/Constraints'
import LigandFile from '@/app/(commonLayout)/utility/docking/Input/LigandFile'
import OutPose from '@/app/(commonLayout)/utility/docking/Input/OutPose'
import { FormContext, InputContext } from '@/app/(commonLayout)/utility/docking/Input/context'
import './index.css'
type Props = {
  isDisabled?: boolean
  onSubmit: (data: FieldValues) => void
  onReset: () => void
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
  residue_number: z.string(),
  chain: z.string(),
}).refine((data) => {
  return data.size_x > 0 && data.size_y > 0 && data.size_z > 0
}, {
  message: 'Please enter data greater than 0 for all size fields',
  path: ['size_x', 'size_y', 'size_z'],
})
export type DockingFormValues = z.infer<typeof dockingFormSchema>
const InputForm = ({ isDisabled = false, onSubmit, onReset, submitLoading = false }: Props) => {
  const { register, handleSubmit, getValues, setValue, formState: { errors }, reset } = useForm<DockingFormValues>({
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
      residue_number: '',
      chain: '',
    },
  })
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<JobTitle/>, <ReceptorFile/>, <Constraints/>, <LigandFile />, <OutPose />]
  const { StrategyMap, strategy, setStrategy } = useContext(InputContext)
  return <>
    <div className="px-5 flex flex-col items-center justify-between h-full pb-3" style={{ display: isDisabled ? 'none' : 'flex' }}>
      <div className="w-full mt-4">
        <Strategy strategy={strategy} StrategyMap={StrategyMap} setStrategy={setStrategy} />
      </div>

      <form className="h-full flex justify-between flex-col" onSubmit={handleSubmit((data) => {
        onSubmit(data)
      })}>
        <div>
          <FormContext.Provider value={{ register, getValues, setValue, errors }}>
            {contentList.map((content, index) => <div key={`inputForm-${index}`} className="mt-4">{content}</div>)}
          </FormContext.Provider>
        </div>
        <SubmitButton runLoading={submitLoading} onReset={() => {
          reset()
          onReset()
        }} />
      </form>
    </div>
  </>
}

export default InputForm
