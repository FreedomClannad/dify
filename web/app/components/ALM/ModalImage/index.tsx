import { memo, useState } from 'react'
import DOMPurify from 'dompurify'
import { ZoomInOutlined } from '@ant-design/icons'
import styles from './index.module.css'
import AmModal from '@/app/components/base/am-modal'
import type { SVGPreview } from '@/types/utility'
import cn from '@/utils/classnames'
import BaseImage from '@/app/components/ALM/Image/baseImage'
import { svgToBase64 } from '@/utils/ALM/common'
const SanitizedHtml = ({ htmlString }: { htmlString: string }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlString)
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  const [imgSrc, setImgSrc] = useState<string>('')
  const handleZoomInOut = () => {
    console.log(112233)
    setPreviewVisible(true)
    if (!imgSrc) {
      const data = svgToBase64(htmlString)
      setImgSrc(data)
    }
  }
  return <>
    <div className="relative">
      <div className={cn(styles.card, 'w-[180px] h-[180px] border-solid rounded flex justify-center items-center')}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}></div>
      <div className=" z-1 absolute cursor-pointer h-[18px] flex justify-center items-center" style={{ top: 4, right: 4 }}
        onClick={handleZoomInOut}>
        <ZoomInOutlined style={{ fontSize: 18, lineHeight: '18px', color: '#333' }}/>
      </div>
      <BaseImage className="hidden"
        preview={{
          visible: previewVisible,
          src: imgSrc,
          onVisibleChange: (visible) => {
            if (!visible)
              setPreviewVisible(visible)
          },
        }}
      />
    </div>
  </>
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
