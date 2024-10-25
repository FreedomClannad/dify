import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useCallback, useMemo } from 'react'
import { ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { HistoryTableColumns } from '@/app/(commonLayout)/utility/history/table'
import type { UtilityHistory, UtilityHistoryKey } from '@/types/utility'
import { UtilityHistoryState } from '@/types/utility'
import cn from '@/utils/classnames'
import './index.css'
const pageSizeOptions = [10, 20, 50, 100]
type Props = {
  total: number
  data: UtilityHistory[]
  page: number
  pageSize: number
  onPageChange: (page: number) => void
  onPageSize: (pageSize: number) => void
}
const HistoryTable = ({ total, data, page, pageSize, onPageChange, onPageSize }: Props) => {
  const pages = useMemo(() => {
    return total ? Math.ceil(total / pageSize) : 0
  }, [total, pageSize])

  const renderCell = useCallback((utilityHistory: UtilityHistory, columnKey: keyof UtilityHistory) => {
    const cellValue = utilityHistory[columnKey]

    switch (columnKey) {
      case 'label': {
        if (typeof cellValue === 'string') {
          return (
            <span>{cellValue}</span>
          )
        }
        return ''
      }

      case 'title': {
        if (typeof cellValue === 'string') {
          return (
            <span>{cellValue}</span>
          )
        }
        return ''
      }
      case 'createDate': {
        if (typeof cellValue === 'string') {
          return (
            <span>{cellValue}</span>
          )
        }
        return ''
      }
      case 'updateDate': {
        if (typeof cellValue === 'string') {
          return (
            <span>{cellValue}</span>
          )
        }
        return ''
      }
      case 'state': {
        if (typeof cellValue === 'string') {
          if (cellValue === UtilityHistoryState.PENDING) {
            return (
              <Chip color="secondary" radius="sm">
                <div className="w-[75px] flex justify-center"><span>Pending</span></div>
              </Chip>
            )
          }
          if (cellValue === UtilityHistoryState.PROCESSING) {
            return (
              <Chip color="primary" radius="sm">
                <div className="w-[75px] flex justify-center"> <span>Processing</span></div>
              </Chip>
            )
          }
          if (cellValue === UtilityHistoryState.SUCCESS) {
            return (
              <Chip color="success" radius="sm">
                <div className="w-[75px] flex justify-center"><span>Success</span></div>
              </Chip>
            )
          }
          if (cellValue === UtilityHistoryState.FAILURE) {
            return (
              <Chip color="danger" radius="sm">
                <div className="w-[75px] flex justify-center"><span>Failure</span></div>
              </Chip>
            )
          }
        }
        return ''
      }
      case 'action':
        return (<div>
          <Chip radius="sm" color="primary" className="cursor-pointer" startContent={<div className="ml-2 w-4 h-4 cursor-pointer">
            <ArrowLeftOnRectangleIcon/></div>}>
            <div className="flex items-center">
              <span>Enter</span>
            </div>
          </Chip>

        </div>)
      default: {
        if (typeof cellValue === 'string') {
          return (
            <span>{cellValue}</span>
          )
        }
        return ''
      }
    }
  }, [])

  const bottomContent = useMemo(() => {
    console.log(pages)
    if (pages === 0)
      return null
    return (<div className="flex w-full justify-center">

      <Pagination
        className="ml-3"
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={page => onPageChange(page)}
      />
    </div>)
  }, [total, page, pageSize, data])

  return <>
    <Table
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        base: cn('history-table-base'),
        table: 'history-table-body',
      }}

    >
      <TableHeader columns={HistoryTableColumns}>
        { column => <TableColumn key={column.key} align={column.key === 'action' ? 'center' : 'start'}>{column.label} </TableColumn>}
      </TableHeader>
      <TableBody emptyContent={'No Data'} items={data}>
        {item => (
          <TableRow key={item.id}>
            {columnKey => <TableCell>{renderCell(item, columnKey as UtilityHistoryKey)}</TableCell>}
          </TableRow>
        )}
      </TableBody>
    </Table>
  </>
}

export default HistoryTable
