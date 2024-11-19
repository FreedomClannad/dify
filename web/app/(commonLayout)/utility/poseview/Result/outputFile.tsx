import { useContext, useEffect, useMemo, useState } from 'react'
import { saveAs } from 'file-saver'
import { OutputContext } from '../context'
import { getFile } from '@/service/commonURL'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import DownloadTooltip from '@/app/components/download-tooltip'
import { downloadPoseviewFile } from '@/service/uility/download'
import cn from '@/utils/classnames'
import Image from '@/app/components/ALM/Image'

type TableType = {
  id: string
  name: string
  url: string
}
const initData = (data: any[]) => {
  const list: TableType[] = []
  data.forEach((item, index) => {
    list.push({
      id: item.file_id,
      name: item.file_name,
      url: getFile({ name: item.file_name, query: { file_id: item.file_id, preview_type: 'stream', source: 'result' } }),
    })
  })
  return list
}

const OutputFile = () => {
  const [tableData, setTableData] = useState<TableType[]>([])
  const { resultData, resultTaskId, isShowHeader } = useContext(OutputContext)
  useEffect(() => {
    try {
      const data = JSON.parse(resultData)
      const table_data = initData(data)
      setTableData(table_data)
    }
    catch (e) {
      setTableData([])
    }
  }, [resultData])
  const visable = useMemo(() => {
    return tableData.length > 0
  }, [tableData])
  const handleDownload = async () => {
    const data = await downloadPoseviewFile(resultTaskId)
    if (data)
      saveAs(data, `SciMiner_2DInteraction_${resultTaskId}.zip`)
  }
  return (
    <VerticalTitleCard title="Displayed Results"
      rootClass="mt-4 w-full flex-1"
      headerClass="px-5"
      right={<DownloadTooltip onClick={handleDownload}/>}
    >
      <div id="outputfile1" className={cn(' overflow-y-auto', isShowHeader ? 'poseview-result-output-body' : 'poseview-result-output-body-no-header')} style={{ maxHeight: '' }}>
        {
          visable
            ? <>
              <div className="flex flex-col poseview-result-output">
                {
                  tableData.map((item, index) => (
                    <div key={`poseview-img-${index}`} className="w-full px-5">
                      <Image src={item.url} placement rootClassName="w-full max-h-[300px] rounded border-gray-550 border-solid border-1"/>
                    </div>
                  ))
                }

              </div>
            </>
            : (
              <div className="w-full flex justify-center items-center rounded h-[200px] leading-[40px] shadow-md">
                <span>No data</span>
              </div>
            )
        }
      </div>
    </VerticalTitleCard>
  )
}

export default OutputFile
