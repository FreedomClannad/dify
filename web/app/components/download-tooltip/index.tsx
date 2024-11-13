import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import type { MouseEvent } from 'react'
import Tooltip from '@/app/components/base/tooltip'
import cn from '@/utils/classnames'
type Props = {
  onClick: (e: MouseEvent) => void
  className?: string
}
const DownloadTooltip = ({ onClick, className = '' }: Props) => {
  return (<Tooltip popupContent="Download">
    <div className={cn('w-4 h-4 text-gray-500 cursor-pointer', className)} onClick={onClick}>
      <DocumentArrowDownIcon />
    </div>
  </Tooltip>)
}

export default DownloadTooltip
