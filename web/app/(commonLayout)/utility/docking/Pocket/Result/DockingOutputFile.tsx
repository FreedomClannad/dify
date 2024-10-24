import { Checkbox, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { saveAs } from 'file-saver'
import Tooltip from '@/app/components/base/tooltip'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { ResultContext } from '@/app/(commonLayout)/utility/docking/Pocket/context/PocketOutputContext'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { getUUID } from '@/utils'
import { downloadPocketFile } from '@/service/docking'

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
  return data.map((item, index) => ({
    id: getUUID(),
    mode: item.mode,
    mol: item.mol,
    score: item['CNN pose score'],
    affinity: item['affinity(kcal/mol)'],
    cnnAffinity: item['CNN affinity'],
    visible: index === 0,
  }))
}

const DockingOutputFile = () => {
  const [table, setTable] = useState<TableType[]>([])
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const { resultData, resultID } = useContext(ResultContext)
  const { addStructure, loadStructureFromData, setStructureVisibility } = useContext(MolstarContext)

  useEffect(() => {
    try {
      const t_data = JSON.parse(resultData)
      const tableData = initTable(t_data)
      setTable(tableData)
      tableData.forEach((item) => {
        if (item.visible) {
          loadStructureFromData(item.mol, 'mol')
          addStructure({ id: item.id, visible: item.visible })
        }
      })
    }
    catch (e) {
      setTable([])
    }
  }, [resultData])

  const handleVisible = (tableItem: TableType) => {
    const updatedTable = table.map((item) => {
      if (item.id === tableItem.id) {
        const visible = !item.visible
        setStructureVisibility({
          dockingMolstar: { id: item.id, visible },
          addCallback: () => {
            loadStructureFromData(item.mol, 'mol')
          },
        })
        return { ...item, visible }
      }
      return item
    })
    setTable(updatedTable)
  }

  const handleDownloadClick = async () => {
    if (selected.size > 0) {
      const selectedItems = table.filter(item => selected.has(item.id))
      const selectedData = selectedItems.map(item => item.mode).join(',')
      const data = await downloadPocketFile(resultID, selectedData)
      if (data)
        saveAs(data, `${resultID}_selected.sdf`)
    }
    else {
      const data = await downloadPocketFile(resultID, 'all')
      if (data)
        saveAs(data, `${resultID}.sdf`)
    }
  }

  const handleRowSelection = (id: string) => {
    setSelected((prev) => {
      const newSelected = new Set(prev)
      if (newSelected.has(id))
        newSelected.delete(id)
      else
        newSelected.add(id)

      return newSelected
    })
  }

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allIds = new Set(table.map(item => item.id))
      setSelected(allIds)
    }
    else {
      setSelected(new Set())
    }
  }

  const isIndeterminate = () => {
    return selected.size > 0 && selected.size < table.length
  }

  const isAllSelected = () => {
    return selected.size === table.length
  }

  useEffect(() => {
    // Check if all rows are selected to update the select all checkbox
    if (isAllSelected())
      setSelected(new Set(table.map(item => item.id))) // Ensure all are selected
  }, [selected, table.length]) // Re-run this effect when selected changes

  return (
    <VerticalTitleCard
      title="Pocket docking output file"
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
          <Table aria-label="Docking output table">
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
              <TableColumn>Affinity</TableColumn>
              <TableColumn>CNN Affinity</TableColumn>
              <TableColumn>Visibility</TableColumn>
            </TableHeader>
            <TableBody>
              {table.map(item => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Checkbox
                      isSelected={selected.has(item.id)}
                      onChange={() => {
                        handleRowSelection(item.id)
                        // Check if all rows are selected after this change
                        if (selected.has(item.id)) {
                          // If already selected, we just need to handle deselection
                          if (selected.size === table.length)
                            handleSelectAll(false)
                        }
                        else {
                          // If not selected, we need to check if all are selected
                          if (selected.size === table.length - 1)
                            handleSelectAll(true)
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{item.mode}</TableCell>
                  <TableCell>{item.score.toFixed(2)}</TableCell>
                  <TableCell>{item.affinity.toFixed(2)}</TableCell>
                  <TableCell>{item.cnnAffinity.toFixed(2)}</TableCell>
                  <TableCell>
                    <div className="cursor-pointer text-xs flex items-center" onClick={() => handleVisible(item)}>
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

export default DockingOutputFile
