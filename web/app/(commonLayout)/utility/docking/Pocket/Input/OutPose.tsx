import { useContext } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { FormContext } from '@/app/(commonLayout)/utility/docking/Pocket/Input/context'

const OutPose = () => {
  const { register, errors } = useContext(FormContext)
  return <VerticalTitleCard title="Out pose" tooltip="每个配体与蛋白对接后输出的构象数目，默认为10">
    <input
      type="number"
      {...register('out_pose_num')}
      className='h-8 px-3 text-sm font-normal rounded grow border-gray-550 border-solid border-2 w-full'
      placeholder="10"/>
    {errors.out_pose_num && <span className='text-red-500'>{errors.out_pose_num.message}</span>}
  </VerticalTitleCard>
}

export default OutPose
