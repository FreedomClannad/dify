import { RiChatHistoryLine } from '@remixicon/react'
import { useRouter } from 'next/navigation'

const HistoryButton = () => {
  const router = useRouter()
  const handleClick = () => {
    router.push('/utility/history')
  }
  return (
    <div className="px-2 cursor-pointer rounded-lg h-8 flex items-center bg-gray-200 border-0 text-gray-700 text-[13px] placeholder:text-gray-500 appearance-none outline-none group-hover:bg-gray-300 caret-blue-600" onClick={handleClick}>
      <RiChatHistoryLine className='shrink-0 mr-1.5 w-3.5 h-3.5'/>
      <span style={{ lineHeight: '32px' }}>History</span>
    </div>)
}

export default HistoryButton
