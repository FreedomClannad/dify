import { Radio, RadioGroup } from '@nextui-org/react'
import { useContext, useEffect, useMemo, useState } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { FormContext, InputContext } from '@/app/(commonLayout)/utility/docking/Input/context'
import type { CenterPosition } from '@/types/docking'
import { ConstraintsCenterEnum } from '@/types/docking'
type CenterState = {
  [ConstraintsCenterEnum.ligand]: CenterPosition
  [ConstraintsCenterEnum.residue]: CenterPosition
  [ConstraintsCenterEnum.coordinates]: CenterPosition
}
const Constraints = () => {
  const { register, getValues, setValue, errors } = useContext(FormContext)
  const [radioValue, setRadioValue] = useState<ConstraintsCenterEnum>(ConstraintsCenterEnum.ligand)
  const [CenterState, setCenterState] = useState<CenterState>({ [ConstraintsCenterEnum.ligand]: {}, [ConstraintsCenterEnum.residue]: {}, [ConstraintsCenterEnum.coordinates]: {} })
  const radioDisabled = useMemo(() => {
    return !(radioValue === ConstraintsCenterEnum.coordinates)
  }, [radioValue])
  const { centerPosition } = useContext(InputContext)
  useEffect(() => {
    if (radioValue === ConstraintsCenterEnum.ligand || radioValue === ConstraintsCenterEnum.residue) {
      const { x, y, z, num, chain } = centerPosition
      if (x && y && z) {
        setValue('center_x', x)
        setValue('center_y', y)
        setValue('center_z', z)
        setValue('residue_number', num || '')
        setValue('chain', chain || '')
      }
      else {
        setValue('center_x', '')
        setValue('center_y', '')
        setValue('center_z', '')
        setValue('residue_number', '')
        setValue('chain', '')
      }
    }
  }, [centerPosition])
  useEffect(() => {
    const centerPosition = CenterState[radioValue]
    const { x, y, z, num, chain } = centerPosition
    if (x && y && z) {
      setValue('center_x', x)
      setValue('center_y', y)
      setValue('center_z', z)
      setValue('residue_number', num || '')
      setValue('chain', chain || '')
    }
    else {
      setValue('center_x', '')
      setValue('center_y', '')
      setValue('center_z', '')
      setValue('residue_number', '')
      setValue('chain', '')
    }
  }, [radioValue])
  return <VerticalTitleCard title="Constraints" tooltip="Box Center: 配体结合口袋中心xyz坐标。
     Box Size: 配体结合口袋大小。">
    <div className="ml-3">
      <div>
        <RadioGroup
          label="Center"
          value={radioValue}
          defaultValue={ConstraintsCenterEnum.ligand}
          onValueChange={(value) => {
            setCenterState({
              ...CenterState,
              [radioValue]: {
                x: Number(getValues('center_x')) || '',
                y: Number(getValues('center_y')) || '',
                z: Number(getValues('center_z')) || '',
                num: getValues('residue_number') || '',
                chain: getValues('chain') || '',
              },
            })
            setRadioValue(value as ConstraintsCenterEnum)
          }}
        >
          <Radio size="sm" value={ConstraintsCenterEnum.ligand}>Centroid of ligand</Radio>
          <Radio size="sm" value={ConstraintsCenterEnum.residue}>Centroid of selected residue</Radio>
          <Radio size="sm" value={ConstraintsCenterEnum.coordinates}>Supplied X,Y,Z coordinates</Radio>
        </RadioGroup>
        <div className="ml-4 bg-gray-1004 px-3 py-2 mt-3">
          <div className="flex items-center justify-between gap-3 w-full">
            <div className="flex flex-1">
              <span>x:</span>
              <input type="number" disabled={radioDisabled} {...register('center_x')}
                className="constraints-input w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
            <div className="flex flex-1">
              <span>y:</span>
              <input type="number" disabled={radioDisabled} {...register('center_y')}
                className="constraints-input w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
            <div className="flex flex-1">
              <span>z:</span>
              <input type="number" disabled={radioDisabled} {...register('center_z')}
                className="constraints-input w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
          </div>
        </div>
        <div>
          {
            (errors.center_x || errors.center_y || errors.center_z)
              ? <>
                <span
                  className='text-red-500 mt-2'>{errors.center_x?.message || errors.center_y?.message || errors.center_z?.message}</span>
              </>
              : null
          }
        </div>
      </div>
      <div className="mt-3 w-full">
        <div className="text-foreground-500"><span>Size</span></div>
        <div className="flex flex-col">
          <div className="flex justify-between gap-3 w-full mt-2">
            <div className="flex flex-1">
              <span>x:</span>
              <input type="number" {...register('size_x')}
                className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
            <div className="flex flex-1">
              <span>y:</span>
              <input type="number" {...register('size_y')}
                className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
            <div className="flex flex-1">
              <span>z:</span>
              <input type="number" {...register('size_z')}
                className="w-full ml-1 text-sm font-normal rounded grow border-gray-550 border-solid border-2"></input>
            </div>
          </div>
          <div>
            {
              (errors.size_x || errors.size_y || errors.size_z) ? <><span className='text-red-500 mt-2'>{errors.size_x?.message || errors.size_y?.message || errors.size_z?.message}</span></> : null
            }
          </div>
        </div>

      </div>
    </div>
  </VerticalTitleCard>
}

export default Constraints
