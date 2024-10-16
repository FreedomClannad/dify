import type { ReactNode } from 'react'
import { useContext } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
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

const GlobalInput = () => {
  const { register, handleSubmit, getValues, setValue, formState: { errors }, reset } = useForm<GlobalInputFormValues>({
    resolver: zodResolver(GlobalInputFormSchema),
    defaultValues: {
      task_name: '这是个测试文件',
    },
  })
  const { StrategyMap, strategy, setStrategy } = useContext(GlobalInputContext)
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<JobTitle/>, <Receptor/>, <Ligand />]
  return <>
    <div className="px-5 flex flex-col items-center justify-between h-full pb-3">
      <div className="w-full mt-4">
        <Strategy strategy={strategy} StrategyMap={StrategyMap} setStrategy={setStrategy}/>
      </div>
      <form className="h-full flex justify-between flex-col w-full">
        <div>
          <GlobalFormContext.Provider value={{ register, getValues, setValue, errors }}>
            {contentList.map((content, index) => <div key={`inputForm-${index}`} className="mt-4">{content}</div>)}
          </GlobalFormContext.Provider>
        </div>
        <SubmitButton/>
      </form>
    </div>
  </>
}

export default GlobalInput
