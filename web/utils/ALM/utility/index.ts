import { v4 as uuid4 } from 'uuid'
import type { SVGPreview } from '@/types/utility'
export const createSVGPreviewList = (data: string[]): SVGPreview[] => {
  const list: SVGPreview[] = []
  data.forEach((item) => {
    list.push({
      id: uuid4(),
      svg: item,
    })
  })
  return list
}
