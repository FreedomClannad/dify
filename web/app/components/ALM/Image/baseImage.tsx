import 'rc-image/assets/index.css'
import './index.css'
import RcImage from 'rc-image'
import type { ImageProps } from 'rc-image'
import type { CSSProperties } from 'react'
import { memo, useMemo } from 'react'

import cn from '@/utils/classnames'
import { defaultIcons } from '@/app/components/ALM/Image/common'
export type ImagePlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'
type Props = {
  rootStyle?: CSSProperties
  rootClassName?: string
} & ImageProps
const BaseImage = (props: Props) => {
  const { rootStyle, preview } = props
  const previewProps = useMemo(() => {
    if (typeof preview === 'boolean')
      return preview
    return { ...preview, icons: defaultIcons }
  }, [preview])
  return <>
    <div className={cn('relative w-fit')} style={{ ...rootStyle }}>
      <RcImage
        {...props}
        preview={previewProps}
      />
    </div>
  </>
}

export default memo(BaseImage)
