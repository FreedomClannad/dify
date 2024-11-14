import type { MouseEvent } from 'react'
import Tooltip from '@/app/components/base/tooltip'
import cn from '@/utils/classnames'
import IconSVG from '@/app/components/ALM/IconSVG'
type Props = {
  onClick: (e: MouseEvent) => void
  className?: string
}
const DownloadTooltip = ({ onClick, className = '' }: Props) => {
  return (<Tooltip popupContent="Download">
    <div className={cn('w-4 h-4 text-gray-500 cursor-pointer', className)} onClick={onClick}>
      <IconSVG name='DownloadIcon'></IconSVG>
    </div>
  </Tooltip>)
}

export default DownloadTooltip
