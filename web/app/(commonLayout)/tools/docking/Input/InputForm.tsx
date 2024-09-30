import type { ReactNode } from 'react'
import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import JobTitle from '@/app/(commonLayout)/tools/docking/Input/JobTitle'
import ReceptorFile from '@/app/(commonLayout)/tools/docking/Input/ReceptorFile'
import Constraints from '@/app/(commonLayout)/tools/docking/Input/Constraints'
import LigandFile from '@/app/(commonLayout)/tools/docking/Input/LigandFile'
import OutPose from '@/app/(commonLayout)/tools/docking/Input/OutPose'
import { FormContext } from '@/app/(commonLayout)/tools/docking/Input/context'
import TestMol from '@/app/(commonLayout)/tools/docking/Input/TestMol'
type Props = {
  onSubmit: () => void
}
const InputForm = ({ onSubmit }: Props) => {
  const { register, handleSubmit, setValue } = useForm()
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<JobTitle/>, <ReceptorFile/>, <Constraints/>, <LigandFile />, <OutPose />, <TestMol />]

  return <>
    <div className="px-5 flex flex-col items-center justify-between h-full pb-3">
      <form onSubmit={handleSubmit((data) => {
        console.log(data)
        onSubmit()
      })}>
        <div>
          <FormContext.Provider value={{ register, setValue }}>
            {contentList.map((content, index) => <div key={`inputForm-${index}`} className="mt-4">{content}</div>)}
          </FormContext.Provider>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex justify-center w-[80%] mt-3">
            <Button type="submit" color="primary" radius="sm" fullWidth>Run</Button>
          </div>
        </div>

      </form>
    </div>
  </>
}

export default InputForm
