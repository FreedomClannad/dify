import { Radio, RadioGroup } from '@nextui-org/react'
import { useContext, useEffect, useMemo, useState } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { FormContext, InputContext } from '@/app/(commonLayout)/tools/docking/Input/context'
import type { CenterPosition } from '@/types/docking'
import { ConstraintsCenterEnum } from '@/types/docking'
type CenterState = {
  [ConstraintsCenterEnum.ligand]: CenterPosition
  [ConstraintsCenterEnum.residue]: CenterPosition
  [ConstraintsCenterEnum.coordinates]: CenterPosition
}
const Constraints = () => {
  const { register, setValue } = useContext(FormContext)
  const [radioValue, setRadioValue] = useState<ConstraintsCenterEnum>(ConstraintsCenterEnum.ligand)
  const [CenterState, setCenterState] = useState<CenterState>({ [ConstraintsCenterEnum.ligand]: {}, [ConstraintsCenterEnum.residue]: {}, [ConstraintsCenterEnum.coordinates]: {} })
  const radioDisabled = useMemo(() => {
    return !(radioValue === ConstraintsCenterEnum.coordinates)
  }, [radioValue])
  const { centerPosition } = useContext(InputContext)
  useEffect(() => {
    const { x, y, z } = centerPosition
    setValue('center_x', x)
    setValue('center_y', y)
    setValue('center_z', z)
  }, [centerPosition])
  return <VerticalTitleCard title="Constraints" tooltip="Constraints 条件">
    <div className="ml-3">
      <div>
        <RadioGroup
          label="Center"
          value={radioValue}
          defaultValue={ConstraintsCenterEnum.ligand}
          onValueChange={(value) => { setRadioValue(value as ConstraintsCenterEnum) }}
        >
          <Radio value={ConstraintsCenterEnum.ligand} >Centroid of ligand</Radio>
          <Radio value={ConstraintsCenterEnum.residue} >Centroid of selected residue</Radio>
          <Radio value={ConstraintsCenterEnum.coordinates} >Supplied X,Y,Z coordinates</Radio>
        </RadioGroup>
        <div className="ml-6 bg-gray-1004 px-3 py-2 mt-3">
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex flex-1">
              <span>x:</span>
              <input disabled={radioDisabled} {...register('center_x')} className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
            <div className="flex flex-1">
              <span>y:</span>
              <input disabled={radioDisabled} {...register('center_y')} className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
            <div className="flex flex-1">
              <span>z:</span>
              <input disabled={radioDisabled} {...register('center_z')} className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
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
