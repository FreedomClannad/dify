import type { ReactNode } from 'react'
import InputFile from './inputFile'
import OutputFile from './outputFile'
import './index.css'
type Props = {
  disabled?: boolean
}
const PoseviewResult = ({ disabled }: Props) => {
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<InputFile/>, <OutputFile />]
  return <>
    <div className="px-5 flex flex-col items-center h-full pb-3 w-full" style={{ display: disabled ? 'none' : 'flex' }}>
      {contentList.map((content, index) => <div key={`poseview-result-${index}`} className="mt-4 w-full">{content}</div>)}
    </div>
  </>
}

export default PoseviewResult
