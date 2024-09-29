import { useContext, useState } from 'react'
import { Button, Input } from '@nextui-org/react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'

import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { InputContext } from '@/app/(commonLayout)/tools/docking/Input/context'
const TestMol = () => {
  const [input, setInput] = useState<string>('5v3x.pdb')

  const { loadUrl } = useContext(InputContext)
  const url = 'http://127.0.0.1:5500/'
  return <VerticalTitleCard title="TestMol" >
    <div className="flex items-center justify-center flex-col">
      <Input startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-default-400 text-small">{url}</span>
        </div>
      } value={input} onChange={(e: any) => {
        setInput(e.target.value)
      }} />
      <div className="mt-3 flex justify-center w-[80%]">
        <Button color="primary" radius="sm" fullWidth onClick={() => {
          const t_url = `${url}${input}`
          const affix = input.split('.').pop() as BuiltInTrajectoryFormat || 'mmcif'
          loadUrl(t_url, affix)
        }}>Render</Button>
      </div>

    </div>
  </VerticalTitleCard>
}

export default TestMol
