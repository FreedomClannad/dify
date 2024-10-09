import { useContext } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { FormContext } from '@/app/(commonLayout)/utility/docking/Input/context'

const OutPose = () => {
  const { register, errors } = useContext(FormContext)
  return <VerticalTitleCard title="OutPose" tooltip="OutPose tooltip">
    <input
      type="number"
      {...register('out_pose_num')}
      className='h-8 px-3 text-sm font-normal rounded grow border-gray-550 border-solid border-2 w-full'
      placeholder="10"/>
    {errors.out_pose_num && <span className='text-red-500'>{errors.out_pose_num.message}</span>}
  </VerticalTitleCard>
}

export default OutPose
