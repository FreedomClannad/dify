import 'rc-image/assets/index.css'
import './index.css'
import RcImage from 'rc-image'
import type { ImageProps } from 'rc-image'
import type { CSSProperties } from 'react'
import { memo, useEffect, useState } from 'react'
import {
  ZoomInOutlined,
} from '@ant-design/icons'
import { defaultIcons } from './common'
import cn from '@/utils/classnames'
export type ImagePlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
type Props = {
  placement?: ImagePlacement | boolean
  rootStyle?: CSSProperties
  rootClassName?: string
} & ImageProps
const Image = (props: Props) => {
  const { placement = false, rootStyle, rootClassName, preview } = props
  const [positionStyle, setPositionStyle] = useState<CSSProperties>({ top: 4, right: 4 })
  const [previewVisible, setPreviewVisible] = useState<boolean>(false)
  useEffect(() => {
    if (!placement)
      return

    if (placement === 'topLeft')
      setPositionStyle({ top: 4, left: 4 })
    else if (placement === 'topRight')
      setPositionStyle({ top: 4, right: 4 })
    else if (placement === 'bottomLeft')
      setPositionStyle({ bottom: 4, left: 4 })
    else if (placement === 'bottomRight')
      setPositionStyle({ bottom: 4, right: 4 })
  }, [])

  const handleZoomInOut = () => {
    setPreviewVisible(true)
  }

  return <>
    <div className={cn('relative w-fit')} style={{ ...rootStyle }}>
      <RcImage
        {...props}
        preview={{
          className: 'alm-image-preview',
          icons: defaultIcons,
          visible: previewVisible,
          onVisibleChange: (visible) => {
            if (!visible)
              setPreviewVisible(false)
          },
        }} />
      {
        placement && <>
          <div className="absolute cursor-pointer h-[18px] flex justify-center items-center" style={{ ...positionStyle }} onClick={handleZoomInOut}>
            <ZoomInOutlined style={{ fontSize: 18, lineHeight: '18px', color: '#333' }}/>
          </div>
        </>
      }
    </div>
  </>
}

export default memo(Image)
