import { memo } from 'react'
import { Textarea } from '@nextui-org/react'
import AmModal from '@/app/components/base/am-modal'
type Props = {
  text: string
  isShow: boolean
  title: string
  onClose: () => void
  loading: boolean
  rows?: number
}
const ModalText = ({ text, isShow, title, onClose, loading, rows = 8 }: Props) => {
  // 通过调整Rows来整个文本内容大小
  return (
    <div>
      <AmModal isShow={isShow} title={title} onClose={onClose} contentHeight="500px" loading={loading}>
        <div className="px-8 mb-5">
          <Textarea
            value={text}
            label="Text"
            maxRows={rows}
            minRows={rows}
            isReadOnly
          />
        </div>
      </AmModal>
    </div>
  )
}

export default memo(ModalText)
