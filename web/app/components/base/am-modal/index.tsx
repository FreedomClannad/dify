import type { ReactNode } from 'react'
import { memo, useMemo } from 'react'
import { RiCloseLine } from '@remixicon/react'
import Modal from '@/app/components/base/modal'
import Loading from '@/app/components/base/loading'
type Props = {
  isShow: boolean
  title: string
  onClose: () => void
  children?: ReactNode
  footer?: ReactNode
  contentHeight?: number | string
  loading?: boolean
}
const AmModal = ({ isShow, title, onClose, children, footer, contentHeight = 200, loading = false }: Props) => {
  const contentHeightMemo = useMemo(() => {
    if (typeof contentHeight === 'number')
      return `${contentHeight}px`
    return contentHeight
  }, [contentHeight])
  return <div>
    <Modal
      overflowVisible
      className='!p-0 !max-w-[840px] !w-[840px] rounded-xl'
      isShow={isShow}
      onClose={onClose}
    >
      {/* Heading */}
      <div className="shrink-0 flex flex-col h-full bg-white rounded-t-xl relative">
        <div className="shrink-0 pl-6 pr-6 pt-3 pb-3 bg-white text-xl rounded-t-xl leading-[30px] font-semibold text-gray-900 z-10"><span style={{ fontSize: '16px' }}>{title}</span></div>
        <div className='absolute right-4 top-2 p-2 cursor-pointer z-20' onClick={onClose}>
          <RiCloseLine className='w-6 h-6 text-gray-500'/>
        </div>
      </div>
      <div className="overflow-y-auto" style={{ height: contentHeightMemo, minHeight: '400px' }}>
        {
          loading ? <div className="w-full h-full flex justify-center items-center"><Loading /></div> : <>{children}</>
        }

      </div>
      <div>{footer}</div>
    </Modal>
  </div>
}

export default memo(AmModal)
