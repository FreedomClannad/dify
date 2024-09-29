import type { ReactNode } from 'react'
import { Button } from '@nextui-org/react'
import JobTitle from '@/app/(commonLayout)/tools/docking/Input/JobTitle'
import ReceptorFile from '@/app/(commonLayout)/tools/docking/Input/ReceptorFile'
import Constraints from '@/app/(commonLayout)/tools/docking/Input/Constraints'
import LigandFile from '@/app/(commonLayout)/tools/docking/Input/LigandFile'
import OutPose from '@/app/(commonLayout)/tools/docking/Input/OutPose'
import TestMol from '@/app/(commonLayout)/tools/docking/Input/TestMol'
type Props = {
  onSubmit: () => void
}
const InputForm = ({ onSubmit }: Props) => {
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<JobTitle/>, <ReceptorFile/>, <Constraints/>, <LigandFile />, <OutPose />, <TestMol />]
  return <>
    <div className="px-5 flex flex-col items-center justify-between h-full pb-3">
      <div>
        {contentList.map((content, index) => <div key={`inputForm-${index}`} className="mt-4">{content}</div>)}
      </div>
      <div className="flex justify-center w-[80%] mt-3">
        <Button color="primary" radius="sm" fullWidth onClick={onSubmit}>Run</Button>
      </div>
    </div>
  </>
}

export default InputForm
