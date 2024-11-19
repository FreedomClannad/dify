import type { CSSProperties } from 'react'
/*
 * @Author: alvahao wanghao@alphama.com.cn
 * @Date: 2024-11-13 09:14:11
 * @LastEditors: alvahao wanghao@alphama.com.cn
 * @LastEditTime: 2024-11-13 13:34:06
 * @FilePath: \web\app\components\datasets\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
type Props = { name: string; className?: string; style?: CSSProperties }
const IconSVG = ({ name, className = '', style }: Props) => {
  return <div className={` w-4 h-4 ${name} ${className}`} style={style}> </div>
}
export default IconSVG
