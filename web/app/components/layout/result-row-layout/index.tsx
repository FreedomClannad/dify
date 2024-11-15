import type { ReactNode } from 'react'
type Props = {
  left?: ReactNode
  right?: ReactNode
}
const ResultRowLayout = ({ left, right }: Props) => {
  return (<>
    <div className="flex h-full bg-white border-t border-gray-200 overflow-hidden">
      <div className="flex flex-col w-fit sm:w-[410px] shrink-0 border-gray-550 border-r h-full">
        <div className="flex-1 overflow-y-auto">
          {left}
        </div>
      </div>
      <div className="grow relative w-full h-full">{right} </div>
    </div>

  </>)
}
export default ResultRowLayout
