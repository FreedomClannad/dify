import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import { Tooltip } from '@nextui-org/tooltip'
import type { DockingInputFile } from '@/types/docking'
type CardType = DockingInputFile & {
  onClick?: (dockingInputFile: DockingInputFile) => void
}
const CardLine = (props: CardType) => {
  const { id, name, visible, display = true, onClick } = props
  return <>
    <div className="flex w-full h-[32px] justify-between text-gray-1006">
      <div className="flex items-center w-[90%]">
        <div className='w-5 h-5 min-w-5  text-xs text-gray-1005'><DocumentTextIcon/></div>
        <Tooltip content={name}>
          <div className='ml-2 whitespace-nowrap overflow-hidden text-ellipsis'>{name}</div>
        </Tooltip>
      </div>
      {display && onClick && <div className="cursor-pointer text-xs flex items-center justify-center w-5" onClick={() => {
        onClick(props)
      }}>{visible ? <RiEyeLine className="w-4 h-4"/> : <RiEyeOffLine className="w-4 h-4"/>}</div>}

    </div>
  </>
}

export default CardLine
