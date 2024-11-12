import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import { Tooltip } from '@nextui-org/tooltip'
import type { ReactNode } from 'react'
import type { DockingInputFile } from '@/types/docking'

type CardType = DockingInputFile & {
  onClick?: (dockingInputFile: DockingInputFile) => void
  icon?: ReactNode
}
const CardLine = (props: CardType) => {
  const { id, name, visible, display = true, onClick, icon } = props
  return <>
    <div className="flex w-full h-[32px] justify-between text-gray-1006">
      <div className="flex items-center w-[90%]">
        <div className="ml-[13px] flex justify-center align-center">
          <div className='w-5 h-5 min-w-5  text-xs text-gray-1005'><DocumentTextIcon/></div>
        </div>
        <Tooltip content={name}>
          <div className='ml-[28px] whitespace-nowrap overflow-hidden text-ellipsis w-[180px]'>{name}</div>
        </Tooltip>
      </div>
      <div className="mr-[40px] flex align-center justify-center">
        {display && onClick && !icon && <div className="cursor-pointer text-xs flex items-center justify-center w-5" onClick={() => {
          onClick(props)
        }}>{visible ? <RiEyeLine className="w-4 h-4"/> : <RiEyeOffLine className="w-4 h-4"/>}</div>}
        {
          display && icon && <div className="cursor-pointer text-xs flex items-center justify-center w-5">{icon}</div>
        }
      </div>

    </div>
  </>
}

export default CardLine
