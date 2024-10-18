import { useContext } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { FormContext } from '@/app/(commonLayout)/utility/docking/Pocket/context/PocketInputContext'

const JobTitle = () => {
  const { register, errors } = useContext(FormContext)
  return <VerticalTitleCard title="Job title" >
    <input
      {...register('task_name')}
      className='h-8 px-3 text-sm font-normal rounded grow border-gray-550 border-solid border-2 w-full'
      placeholder="<Molecular Docking - 1>"/>
    {errors.task_name && <span className='text-red-500'>{errors.task_name.message}</span>}
  </VerticalTitleCard>
}

export default JobTitle
