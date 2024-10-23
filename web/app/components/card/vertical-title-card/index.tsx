import type { ReactNode } from 'react'
import { useMemo } from 'react'
import cn from 'classnames'
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline'
import style from './style.module.css'
import Tooltip from '@/app/components/base/tooltip'
type props = {
  title: string
  tooltip?: string | ReactNode
  children?: ReactNode
  onExample?: () => void
  right?: ReactNode
}
const VerticalTitleCard = ({ title, tooltip, children, onExample, right }: props) => {
  const tooltipDisabled = useMemo(() => {
    return !tooltip
  }, [tooltip])
  return <>
    <div>
      <div className="flex justify-between">
        <div className={cn(style.title, 'flex relative after:bg-primary-1001 pl-3')}>
          <span>{title}</span>
          <Tooltip popupContent={tooltip} disabled={tooltipDisabled}>
            {tooltipDisabled
              ? <></>
              : <div className="flex mt-1 ml-2">
                <div className='w-4 h-4 text-gray-500'>
                  <QuestionMarkCircleIcon/>
                </div>
              </div>}

          </Tooltip>
        </div>
        <div className="flex">
          {onExample && <div onClick={onExample}>Example</div>}
          {right && <div className="flex justify-center items-center">{right}</div>}
        </div>
      </div>
      <div className="mt-3">{children}</div>
    </div>
  </>
}

export default VerticalTitleCard
