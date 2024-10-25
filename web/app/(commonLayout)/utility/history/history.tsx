import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import HistoryTable from './components/HistoryTable'
import { getHistoryData } from '@/app/(commonLayout)/utility/history/DemoData.'
import type { UtilityHistory, UtilityHistoryState } from '@/types/utility'

const initTableData = (data: any) => {
  const n_list: UtilityHistory[] = []
  data.forEach((item: any) => {
    n_list.push({
      id: item.id,
      label: item.label,
      title: item.title,
      createDate: item.createDate,
      updateDate: item.updateDate,
      state: item.state as UtilityHistoryState,
      action: () => {},
    })
  })
  return n_list
}

const History = () => {
  const [tableData, setTableData] = useState<UtilityHistory[]>([])
  useEffect(() => {
    const data = getHistoryData()
    const n_tableData = initTableData(data)
    setTableData(n_tableData)
  }, [])
  return <>
    <div>
      <div className="pt-4 px-12 pb-2">
        <Breadcrumbs>
          <BreadcrumbItem>Utility</BreadcrumbItem>
          <BreadcrumbItem>History</BreadcrumbItem>
        </Breadcrumbs>
      </div>
      <div className="px-12 pt-2 pb-4">
        <HistoryTable data={tableData}/>
      </div>
    </div>
  </>
}

export default History
