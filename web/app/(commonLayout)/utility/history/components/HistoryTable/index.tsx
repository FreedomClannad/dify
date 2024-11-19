import { Chip, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useCallback, useMemo } from 'react'
import { HistoryTableColumns } from '@/app/(commonLayout)/utility/history/table'
import type { UtilityHistory, UtilityHistoryKey } from '@/types/utility'
import { UtilityHistoryState } from '@/types/utility'
import cn from '@/utils/classnames'
import './index.css'
import IconSVG from '@/app/components/ALM/IconSVG'

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
      case 'label':
      case 'title':
      case 'createDate':
      case 'updateDate': {
        if (typeof cellValue === 'string')
          return <span>{cellValue}</span>

        return ''
      }
      case 'state': {
        if (typeof cellValue === 'string') {
          const stateColors: { [key in UtilityHistoryState]: 'secondary' | 'primary' | 'success' | 'danger' } = {
            [UtilityHistoryState.PENDING]: 'secondary',
            [UtilityHistoryState.PROCESSING]: 'primary',
            [UtilityHistoryState.SUCCESS]: 'success',
            [UtilityHistoryState.FAILURE]: 'danger',
          }

          const color = stateColors[cellValue as UtilityHistoryState] as 'secondary' | 'primary' | 'success' | 'danger'

          return (
            <Chip color={color} radius="sm">
              <div className="w-[75px] flex justify-center"><span>{cellValue}</span></div>
            </Chip>
          )
        }
        return ''
      }
      case 'action': {
        if (typeof cellValue === 'function') {
          return <>
            {/* <Chip radius="sm" color="primary" className="cursor-pointer" isDisabled={!(utilityHistory.state === UtilityHistoryState.SUCCESS)} onClick={() => { cellValue(utilityHistory) }} startContent={<div className="ml-2 w-4 h-4 cursor-pointer"><ArrowLeftOnRectangleIcon /></div>}> */}
            <Chip radius="sm" color="primary" className="cursor-pointer" isDisabled={!(utilityHistory.state === UtilityHistoryState.SUCCESS)} onClick={() => { cellValue(utilityHistory) }} startContent={<div className="ml-2 w-4 h-4 cursor-pointer"><IconSVG name='AlmEnterWhiteIcon'/></div>}>
              <div className="flex items-center">
                <span>Enter</span>
              </div>
            </Chip>
          </>
        }
        return ''
      }
      default:
        return typeof cellValue === 'string' ? <span>{cellValue}</span> : ''
    }
  }, [])

  // const currentData = useMemo(() => {
  //   const start = (page - 1) * pageSize
  //   const end = start + pageSize
  //   return data.slice(start, end)
  // }, [data, page, pageSize])

  const handlePageSizeChange = (newPageSize: number) => {
    const newPages = Math.ceil(total / newPageSize)
    if (page > newPages)
      onPageChange(newPages) // Adjust current page to match new total pages

    onPageSize(newPageSize)
  }

  const bottomContent = useMemo(() => {
    if (pages === 0)
      return null
    return (
      <div className="flex w-full justify-center items-center">
        <div className="mr-3">
          <Pagination
            isCompact
            showControls
            showShadow
            color="primary"
            page={page}
            total={pages}
            onChange={onPageChange}
          />
        </div>
        <div>
          <select
            className="border border-primary p-2 rounded-md outline-none focus:border-blue-500 focus:ring-0"
            value={pageSize}
            onChange={e => handlePageSizeChange(Number(e.target.value))}
          >
            {pageSizeOptions.map(size => (
              <option key={size} value={size}>
                {size} / page
              </option>
            ))}
          </select>
        </div>
      </div>
    )
  }, [pages, page, pageSize, total])

  return (
    <>
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
          {column => (
            <TableColumn key={column.key} align={(column.key === 'action' || column.key === 'state') ? 'center' : 'start'}>
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={'No Data'} items={data}>
          {item => (
            <TableRow key={item.id}>
              {columnKey => (
                <TableCell>{renderCell(item, columnKey as UtilityHistoryKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}

export default HistoryTable
