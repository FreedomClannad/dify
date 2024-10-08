import type { ReactNode } from 'react'

import DockingInputFile from '@/app/(commonLayout)/tools/docking/Result/DockingInputFile'
import DockingOutputFile from '@/app/(commonLayout)/tools/docking/Result/DockingOutputFile'
const Result = () => {
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<DockingInputFile/>, <DockingOutputFile />]
  return <div className="px-5 flex flex-col items-center h-full pb-3 w-full">
    {contentList.map((content, index) => <div key={`inputForm-${index}`} className="mt-4 w-full">{content}</div>)}
  </div>
}

export default Result
