import { Radio, RadioGroup } from '@nextui-org/react'
import { useContext } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { FormContext } from '@/app/(commonLayout)/tools/docking/Input/context'
const Constraints = () => {
  const { register } = useContext(FormContext)
  return <VerticalTitleCard title="Constraints" tooltip="Constraints 条件">
    <div className="ml-3">
      <div>
        <RadioGroup
          label="Center"
          defaultValue="1"
        >
          <Radio value="1">Centroid of ligand</Radio>
          <Radio value="2">Centroid of selected residue</Radio>
          <Radio value="3">Supplied X,Y,Z coordinates</Radio>
        </RadioGroup>
        <div className="ml-6 bg-gray-1004 px-3 py-2 mt-3">
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex flex-1">
              <span>x:</span>
              <input {...register('center_x')} className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
            <div className="flex flex-1">
              <span>y:</span>
              <input {...register('center_y')} className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
            <div className="flex flex-1">
              <span>z:</span>
              <input {...register('center_z')} className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3 w-full">
        <div><span>Size</span></div>
        <div className="flex justify-between gap-3 w-full mt-2">
          <div className="flex flex-1">
            <span>x:</span>
            <input {...register('size_x')} className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
          </div>
          <div className="flex flex-1">
            <span>y:</span>
            <input {...register('size_y')} className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
          </div>
          <div className="flex flex-1">
            <span>z:</span>
            <input {...register('size_z')} className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input></div>
        </div>
      </div>
    </div>
  </VerticalTitleCard>
}

export default Constraints
