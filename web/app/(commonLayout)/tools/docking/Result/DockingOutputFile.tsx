import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useContext, useEffect, useState } from 'react'
import { data } from './data'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { ResultContext } from '@/app/(commonLayout)/tools/docking/Result/context'
export type TableType = {
  mode: number
  mol: string
  score: number
  affinity: number
  cnnAffinity: number
}
const initTable = (data: any[]): TableType[] => {
  const n_data: TableType[] = []
  console.log(data)
  for (let i = 0; i < data.length; i++) {
    const item = data[i]
    n_data.push({
      mode: item.mode,
      mol: item.mol,
      score: item['CNN pose score'],
      affinity: item['affinity(kcal/mol)'],
      cnnAffinity: item['CNN affinity'],
    })
  }
  return n_data
}

const DockingOutputFile = () => {
  const [table, setTable] = useState<TableType[]>([])
  const { resultData, loadStructureFromData } = useContext(ResultContext)
  useEffect(() => {
    try {
      const t_data = JSON.parse(data)
      console.log(t_data)
      const table = initTable(t_data)
      setTable(table)
    }
    catch (e) {
      setTable([])
    }
  }, [resultData])
  const handleClick = () => {
    const t_data = JSON.parse(data)
    const table = initTable(t_data)
    table.forEach((item) => {
      loadStructureFromData(item.mol, 'mol')
    })
  }
  return <VerticalTitleCard title="Docking output file">
    <>
      {
        table.length === 0
          ? <div className="w-full flex justify-center align-center rounded h-[40px] leading-[40px] shadow-md"><span>No data</span></div>
          : <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Mode</TableColumn>
              <TableColumn>CNN pose score</TableColumn>
              <TableColumn>affinity(kcal/mol)</TableColumn>
              <TableColumn>CNN affinity</TableColumn>
            </TableHeader>
            <TableBody>
              {table.map((item, index) => {
                return <TableRow key={index}>
                  <TableCell>{item.mode}</TableCell>
                  <TableCell>{item.score}</TableCell>
                  <TableCell>{item.affinity}</TableCell>
                  <TableCell>{item.cnnAffinity}</TableCell>
                </TableRow>
              })}

            </TableBody>
          </Table>
      }
      <button onClick={handleClick}>按钮</button>
    </>
  </VerticalTitleCard>
}
export default DockingOutputFile
