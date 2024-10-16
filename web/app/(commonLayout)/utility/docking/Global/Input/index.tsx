import type { ReactNode } from 'react'
import { useContext } from 'react'
import { z } from 'zod'
import { type FieldValues, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Strategy from '@/app/(commonLayout)/utility/docking/Strategy'
import {
  GlobalFormContext,
  GlobalInputContext,
} from '@/app/(commonLayout)/utility/docking/Global/Context/GlobalInputContext'
import JobTitle from '@/app/(commonLayout)/utility/docking/Global/Input/JobTitle'
import SubmitButton from '@/app/(commonLayout)/utility/docking/SubmitButton'
import Receptor from '@/app/(commonLayout)/utility/docking/Global/Input/Receptor'
import Ligand from '@/app/(commonLayout)/utility/docking/Global/Input/Ligand'
const GlobalInputFormSchema = z.object({
  task_name: z.string().min(1, { message: 'Please enter a task name' }),
})

export type GlobalInputFormValues = z.infer<typeof GlobalInputFormSchema>

type Props = {
  isDisabled?: boolean
  onSubmit: (data: FieldValues) => void
  onReset: () => void
}

const GlobalInput = ({ isDisabled = false, onSubmit, onReset }: Props) => {
  const { register, handleSubmit, getValues, setValue, formState: { errors }, reset } = useForm<GlobalInputFormValues>({
    resolver: zodResolver(GlobalInputFormSchema),
    defaultValues: {
      task_name: 'Global Docking',
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
        <SubmitButton onReset={onReset}/>
      </form>
    </div>
  </>
}

export default GlobalInput
