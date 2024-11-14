/*
 * @Author: alvahao wanghao@alphama.com.cn
 * @Date: 2024-10-23 16:12:15
 * @LastEditors: alvahao wanghao@alphama.com.cn
 * @LastEditTime: 2024-11-13 15:15:21
 * @FilePath: \web\app\(commonLayout)\utility\docking\components\CardLine\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import { DocumentTextIcon } from '@heroicons/react/24/outline'
import type { ReactNode } from 'react'
import IconSVG from '@/app/components/iconSVG'
import type { UtilityResultShow } from '@/types/utility'

type CardType = UtilityResultShow & {
  onClick?: (utilityResultShow: UtilityResultShow) => void
  icon?: ReactNode
}
const CardLine = (props: CardType) => {
  const { id, name, visible, display = true, onClick, icon } = props
  return <>
    <div className="flex w-full h-[32px] justify-between text-gray-1006">
      <div className="flex items-center w-[90%]">
        <div className='w-4 h-4 min-w-5  text-xs text-gray-1005' style={{ marginLeft: '10px' }}><IconSVG name='DocumentIcon' className="!w-4 !h-4"></IconSVG></div>
        <div className='ml-1 whitespace-nowrap overflow-hidden text-ellipsis'>{name}</div>
        {/* <Tooltip content={name}>
          <div className='ml-2 whitespace-nowrap overflow-hidden text-ellipsis'>{name}</div>
        </Tooltip> */}
      </div>
      {display && onClick && !icon && <div className="cursor-pointer text-xs flex items-center justify-center w-5" onClick={() => {
        onClick(props)
      }}>{visible
          ? <IconSVG name='EyeLine'></IconSVG>
          : <IconSVG name='EyeOffLine'></IconSVG>}</div>}
      {
        display && icon && <div className="cursor-pointer text-xs flex items-center justify-center w-5">{icon}</div>
      }
    </div>
  </>
}

export default CardLine
