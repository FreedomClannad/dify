'use client'
import { useEffect, useState } from 'react'
import { useContext as useContextSelector } from 'use-context-selector'
import styles from '@/assets/icon.module.css'
import IconSVG from '@/app/components/ALM/IconSVG'
import { CopyClipboard } from '@/utils/ALM/common'
import { ToastContext } from '@/app/components/base/toast'
type IconObj = {
  icon: string
  label: string
}
const Icon = () => {
  console.log(styles)
  const { notify } = useContextSelector(ToastContext)
  const [iconList, setIconList] = useState<IconObj[]>([])
  useEffect(() => {
    const keys = Object.keys(styles)
    const list: IconObj[] = []
    keys.forEach((key) => {
      list.push({
        icon: key,
        label: key,
      })
    })
    const n_list = list.filter(item => !item.icon.includes('__'))
    setIconList(n_list)
  }, [])
  return <>
    <div className="flex flex-wrap p-5 gap-5">
      {iconList.map((iconObj, index) => {
        return <>
          <div key={index} className="w-[120px] h-[120px] flex flex-col justify-center items-center cursor-pointer" onDoubleClick={() => {
            CopyClipboard(iconObj.label).then(() => {
              notify({ type: 'success', message: '复制成功' })
            }).catch(() => {
              notify({ type: 'error', message: '复制失败' })
            })
          }}>
            <div className="flex justify-center items-center border rounded-md border-solid border-gray-550 w-[100px] h-[80px]">
              <IconSVG name={iconObj.icon}/>
            </div>
            <span className="mt-2">{iconObj.label}</span>
          </div>
        </>
      })}
    </div>
  </>
}

export default Icon
