import { BreadcrumbItem, Breadcrumbs } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useRequest } from 'ahooks'
import HistoryTable from './components/HistoryTable'
import type { UtilityHistory, UtilityHistoryState } from '@/types/utility'
import { getHistoryList } from '@/service/history'
import type { historyRouterType } from '@/app/(commonLayout)/utility/history/components/HistoryTable/useHistoryRouter'

import useHistoryRouter from '@/app/(commonLayout)/utility/history/components/HistoryTable/useHistoryRouter'

const History = () => {
  const [tableData, setTableData] = useState<UtilityHistory[]>([])
  const [page, setPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(10)
  const [total, setTotal] = useState<number>(0)
  const router = useHistoryRouter()

  const initTableData = (data: any) => {
    const n_list: UtilityHistory[] = []
    data.forEach((item: any) => {
      n_list.push({
        id: item.id,
        task_id: item.task_id,
        task_type: item.task_type,
        label: item.label,
        title: item.task_name,
        createDate: item.created_at,
        updateDate: item.updated_at,
        state: item.status as UtilityHistoryState,
        action: (utilityHistory) => {
          const taskType = utilityHistory.task_type as unknown as historyRouterType
          router[taskType](utilityHistory)
        },
      })
    })
    return n_list
  }

  const getData = async () => {
    const res = await getHistoryList({ page, page_size: pageSize })

    const { total, data } = res

    const n_data = initTableData(data)
    setTotal(total)
    setTableData(n_data)
  }
  const { run, cancel, refresh } = useRequest(getData, {
    pollingInterval: 10000,
    pollingWhenHidden: false,
  })
  useEffect(() => {
    refresh()
  }, [page, pageSize])

  useEffect(() => {
    getData().then()
    run()

    return () => {
      cancel()
    }
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
        <HistoryTable total={total} data={tableData} page={page} onPageChange={setPage} pageSize={pageSize} onPageSize={setPageSize}/>
      </div>
    </div>
  </>
}

export default History
