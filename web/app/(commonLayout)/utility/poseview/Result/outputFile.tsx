import { useContext, useEffect, useMemo, useState } from 'react'
import { saveAs } from 'file-saver'
import { OutputContext } from '../context'
import { getFile } from '@/service/commonURL'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import DownloadTooltip from '@/app/components/download-tooltip'
import { downloadPoseviewFile } from '@/service/uility/download'

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
  const { resultData, resultTaskId } = useContext(OutputContext)
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
      saveAs(data, `${resultTaskId}.zip`)
  }
  return (
    <VerticalTitleCard title="Displayed Results"
      headerClass="px-5"
      right={<DownloadTooltip onClick={handleDownload}/>}
    >
      <div className="poseview-result-output-body overflow-y-auto">
        {
          visable
            ? <>
              <div className="flex flex-col poseview-result-output">
                {
                  tableData.map((item, index) => (
                    <div key={`poseview-img-${index}`} className="w-full">
                      {/* <Image width={100} height={100} src={item.url} alt="img"></Image> */}
                      <img src={item.url} className='w-full max-h-[300px]'/>
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
