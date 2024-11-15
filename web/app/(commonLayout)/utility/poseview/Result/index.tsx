import type { ReactNode } from 'react'
import { Fragment } from 'react'
import InputFile from './inputFile'
import OutputFile from './outputFile'
import './index.css'
type Props = {
  display?: boolean
}
const PoseviewResult = ({ display }: Props) => {
  // eslint-disable-next-line react/jsx-key
  const contentList: ReactNode[] = [<InputFile/>, <OutputFile />]
  return <>
    <div className="flex flex-col items-center h-full pb-3 w-full" style={{ display: display ? 'flex' : 'none' }}>
      {contentList.map((content, index) => <Fragment key={`poseview-result-${index}`}>{content}</Fragment>)}
    </div>
  </>
}

export default PoseviewResult
