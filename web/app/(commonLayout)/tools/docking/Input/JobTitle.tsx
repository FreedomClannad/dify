import { useState } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'

const JobTitle = () => {
  const [input, setInput] = useState<string>('')
  return <VerticalTitleCard title="Job title" >
    <input
      className='h-8 px-3 text-sm font-normal rounded grow border-gray-550 border-solid border-2 w-full'
      value={input}
      placeholder="<name1.1.1.1.1.1.1>"
      onChange={(e) => {
        setInput(e.target.value)
      }}/>
  </VerticalTitleCard>
}

export default JobTitle
