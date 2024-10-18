import type { ReactNode } from 'react'
import { useContext } from 'react'
import { z } from 'zod'
import { type FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Strategy from '../../components/Strategy'
import SubmitButton from '../../components/SubmitButton'
import {
  GlobalFormContext,
  GlobalInputContext,
} from '@/app/(commonLayout)/utility/docking/Global/context/GlobalInputContext'
import JobTitle from '@/app/(commonLayout)/utility/docking/Global/Input/JobTitle'
import Receptor from '@/app/(commonLayout)/utility/docking/Global/Input/Receptor'
import Ligand from '@/app/(commonLayout)/utility/docking/Global/Input/Ligand'
const GlobalInputFormSchema = z.object({
  task_name: z.string().min(1, { message: 'Please enter a task name' }),
  receptor_mode: z.string(),
  ligand_mode: z.string(),
  receptor_value: z.string().optional(),
  fasta_file_id: z.string().optional(),
  ligand_value: z.string().optional(),
  ligand_file_ids: z.string().optional(),
  out_pose_num: z.number(),
}).refine((data) => {
  return data.receptor_value || data.fasta_file_id
}, { message: 'Please enter or upload the file', path: ['receptor_value'] }).refine((data) => {
  return data.ligand_value || data.ligand_file_ids
}, { message: 'Please enter or upload the file', path: ['ligand_value'] })

export type GlobalInputFormValues = z.infer<typeof GlobalInputFormSchema>

type Props = {
  isDisabled?: boolean
  onSubmit: (data: FieldValues) => void
  onReset: () => void
  submitLoading?: boolean
}

const GlobalInput = ({ isDisabled = false, onSubmit, onReset, submitLoading = false }: Props) => {
  const { register, handleSubmit, getValues, setValue, formState: { errors }, reset } = useForm<GlobalInputFormValues>({
    resolver: zodResolver(GlobalInputFormSchema),
    defaultValues: {
      task_name: 'Global Docking',
      receptor_value: '',
      fasta_file_id: '',
      ligand_value: '',
      ligand_file_ids: '',
      out_pose_num: 10,
      receptor_mode: 'input',
      ligand_mode: 'input',
    },
  })
  const { StrategyMap, strategy, setStrategy } = useContext(GlobalInputContext)
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<JobTitle/>, <Receptor/>, <Ligand />]
  return <>
    <div className="px-5 flex flex-col items-center justify-between h-full pb-3" style={{ display: isDisabled ? 'none' : 'flex' }}>
      <div className="w-full mt-4">
        <Strategy strategy={strategy} StrategyMap={StrategyMap} setStrategy={setStrategy}/>
      </div>
      <form className="h-full flex justify-between flex-col w-full" onSubmit={handleSubmit((data) => {
        onSubmit(data)
      })}>
        <div>
          <GlobalFormContext.Provider value={{ register, getValues, setValue, errors }}>
            {contentList.map((content, index) => <div key={`Global-input-form-${index}`} className="mt-4">{content}</div>)}
          </GlobalFormContext.Provider>
        </div>
        <SubmitButton onReset={() => {
          reset()
          onReset()
        }} runLoading={submitLoading}/>
      </form>
    </div>
  </>
}

export default GlobalInput
