import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
// import { data } from './data'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { getUUID } from '@/utils'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/context/GlobalOutputContext'
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
  console.log(data)
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
  const { resultData } = useContext(GlobalResultContext)
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
  return <VerticalTitleCard title="Global docking output file">
    <>
      {
        table.length === 0
          ? <div className="w-full flex justify-center items-center rounded h-[200px] leading-[40px] shadow-md"><span>No data</span></div>
          : <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Mode</TableColumn>
              <TableColumn>Score</TableColumn>
              <TableColumn>affinity</TableColumn>
              <TableColumn>CNN affinity</TableColumn>
              <TableColumn><></></TableColumn>
            </TableHeader>
            <TableBody>
              {table.map((item, index) => {
                return <TableRow key={index}>
                  <TableCell>{item.mode}</TableCell>
                  <TableCell>{item.score}</TableCell>
                  <TableCell>{item.affinity}</TableCell>
                  <TableCell>{item.cnnAffinity}</TableCell>
                  <TableCell><div className="cursor-pointer text-xs flex items-center" onClick={() => { handleVisible(item) }}>{item.visible ? <RiEyeLine className="w-4 h-4"/> : <RiEyeOffLine className="w-4 h-4"/>}</div></TableCell>
                </TableRow>
              })}

            </TableBody>
          </Table>
      }
    </>
  </VerticalTitleCard>
}
export default GlobalOutputFile
