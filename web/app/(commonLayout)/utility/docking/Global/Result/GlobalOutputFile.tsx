import { Checkbox, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { saveAs } from 'file-saver'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { getUUID } from '@/utils'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/context/GlobalOutputContext'
import Tooltip from '@/app/components/base/tooltip'
import { downloadGlobalFile } from '@/service/docking'

export type TableType = {
  id: string
  mode: number
  mol: string
  score: number
  affinity: number
  cnnAffinity: number
  visible: boolean
}

const initTable = (data: any[]): TableType[] => {
  const n_data: TableType[] = []
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    const visible = i === 0
    n_data.push({
      id: getUUID(),
      mode: item.mode,
      mol: item.mol,
      score: item.CNNscore,
      affinity: item['Affinity(kcal/mol)'],
      cnnAffinity: item.CNNaffinity,
      visible,
    })
  }
  return n_data
}

const GlobalOutputFile = () => {
  const [table, setTable] = useState<TableType[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set()) // 状态：已选择的项
  const { resultData, resultID } = useContext(GlobalResultContext)
  const { addStructure, loadStructureFromData, setStructureVisibility } = useContext(MolstarContext)

  useEffect(() => {
    try {
      const t_data = JSON.parse(resultData)
      const table = initTable(t_data)
      setTable(table)
      table.forEach((item) => {
        if (item.visible) {
          loadStructureFromData(item.mol, 'mmcif')
          addStructure({ id: item.id, visible: item.visible })
        }
      })
    }
    catch (e) {
      setTable([])
    }
  }, [resultData])

  const handleVisible = (tableItem: TableType) => {
    const n_list = table.map((item) => {
      if (item.id === tableItem.id) {
        const visible = !item.visible
        setStructureVisibility({
          dockingMolstar: { id: item.id, visible },
          addCallback: () => {
            loadStructureFromData(item.mol, 'mmcif')
          },
        })
        return { ...item, visible }
      }
      return item
    })
    setTable(n_list)
  }

  const handleDownloadClick = async () => {
    if (selected.size > 0) {
      const selectedItems = table.filter(item => selected.has(item.id))
      const selectedData = selectedItems.map(item => item.mode).join(',')
      const data = await downloadGlobalFile(resultID, selectedData)
      if (data)
        saveAs(data, `${resultID}_selected.zip`)
    }
    else {
      const data = await downloadGlobalFile(resultID, 'all')
      if (data)
        saveAs(data, `${resultID}.zip`)
    }
  }

  // 处理单行选择/取消选择
  const handleRowSelection = (id: string) => {
    setSelected((prev) => {
      const newSelected = new Set(prev)
      if (newSelected.has(id))
        newSelected.delete(id)
      else newSelected.add(id)
      return newSelected
    })
  }

  // 处理全选/取消全选
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(table.map(item => item.id))
      setSelected(allIds)
    }
    else {
      setSelected(new Set())
    }
  }

  // 判断是否为全选或部分选
  const isIndeterminate = () => selected.size > 0 && selected.size < table.length
  const isAllSelected = () => selected.size === table.length

  return (
    <VerticalTitleCard
      title="Global docking output file"
      right={
        <Tooltip popupContent="Download">
          <div className="w-4 h-4 text-gray-500 cursor-pointer" onClick={handleDownloadClick}>
            <DocumentArrowDownIcon />
          </div>
        </Tooltip>
      }
    >
      {table.length === 0
        ? (
          <div className="w-full flex justify-center items-center rounded h-[200px] leading-[40px] shadow-md">
            <span>No data</span>
          </div>
        )
        : (
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>
                <Checkbox
                  isSelected={isAllSelected()}
                  isIndeterminate={isIndeterminate()}
                  onChange={e => handleSelectAll(e.target.checked)}
                />
              </TableColumn>
              <TableColumn>Mode</TableColumn>
              <TableColumn>Score</TableColumn>
              <TableColumn>affinity</TableColumn>
              <TableColumn>CNN affinity</TableColumn>
              <TableColumn>Visibility</TableColumn>
            </TableHeader>
            <TableBody>
              {table.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      isSelected={selected.has(item.id)}
                      onChange={() => handleRowSelection(item.id)}
                    />
                  </TableCell>
                  <TableCell>{item.mode}</TableCell>
                  <TableCell>{item.score.toFixed(2)}</TableCell>
                  <TableCell>{item.affinity.toFixed(2)}</TableCell>
                  <TableCell>{item.cnnAffinity.toFixed(2)}</TableCell>
                  <TableCell>
                    <div
                      className="cursor-pointer text-xs flex items-center"
                      onClick={() => handleVisible(item)}
                    >
                      {item.visible ? <RiEyeLine className="w-4 h-4" /> : <RiEyeOffLine className="w-4 h-4" />}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
    </VerticalTitleCard>
  )
}

export default GlobalOutputFile
