import type { ReactNode } from 'react'
import { useMemo } from 'react'
import cn from 'classnames'
import style from './style.module.css'
import Tooltip from '@/app/components/base/tooltip'
import IconSVG from '@/app/components/ALM/IconSVG'
type props = {
  title: string
  rootClass?: string
  headerClass?: string
  contentClass?: string
  tooltip?: string | ReactNode
  children?: ReactNode
  onExample?: () => void
  right?: ReactNode
}
const VerticalTitleCard = ({ title, rootClass, headerClass, contentClass, tooltip, children, onExample, right }: props) => {
  const tooltipDisabled = useMemo(() => {
    return !tooltip
  }, [tooltip])
  return <>
    <div className={rootClass}>
      <div className={cn('flex justify-between', headerClass)}>
        <div className={cn(style.title, 'flex relative after:bg-primary-1001 pl-3')}>
          <span>{title}</span>
          <Tooltip popupContent={tooltip} disabled={tooltipDisabled}>
            {tooltipDisabled
              ? <></>
              : <div className="flex" style={{ alignItems: 'center', marginLeft: '10px' }}>
                {/* <div className='w-4 h-4 text-gray-500'> */}
                {/* <QuestionMarkCircleIcon/> */}
                <IconSVG name='AlmPromptIcon' />
                {/* </div> */}
              </div>}

          </Tooltip>
        </div>
        <div className="flex w-[20px]">
          {onExample && <div onClick={onExample}>Example</div>}
          {right && <div className="flex justify-center items-center">{right}</div>}
        </div>
      </div>
      <div className={cn('mt-3', contentClass)}>{children}</div>
    </div>
  </>
}

export default VerticalTitleCard
