import { memo } from 'react'
import DOMPurify from 'dompurify'
import styles from './index.module.css'
import AmModal from '@/app/components/base/am-modal'
import type { SVGPreview } from '@/types/docking'
import cn from '@/utils/classnames'
const SanitizedHtml = ({ htmlString }: { htmlString: string }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString)
  return (<div className={cn(styles.card, 'w-[180px] h-[180px] border-solid rounded flex justify-center items-center')} dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>)
}

type Props = {
  data: SVGPreview[]
  isShow: boolean
  title: string
  onClose: () => void
  loading: boolean
}
const ModalImage = ({ data, isShow, title, onClose, loading }: Props) => {
  return (
    <div>
      <AmModal isShow={isShow} title={title} onClose={onClose} contentHeight="500px" loading={loading}>
        <div className="grid grid-cols-4 gap-5 row-span-1 px-8 mb-5">{
          data.map(item => (
            <SanitizedHtml key={item.id} htmlString={item.svg}/>
          ))
        }
        </div>
      </AmModal>
    </div>
  )
}

export default memo(ModalImage)
