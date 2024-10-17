import type { ReactNode } from 'react'
import './index.css'
import GlobalOutputFile from '@/app/(commonLayout)/utility/docking/Global/Result/GlobalOutputFile'
type ResultProps = {
  isDisabled?: boolean
}
const Result = ({ isDisabled = true }: ResultProps) => {
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<GlobalOutputFile />]
  return <div className="px-5 flex flex-col items-center h-full pb-3 w-full" style={{ display: isDisabled ? 'none' : 'flex' }}>
    {contentList.map((content, index) => <div key={`inputForm-${index}`} className="mt-4 w-full">{content}</div>)}
  </div>
}

export default Result
