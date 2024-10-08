import { useContext, useMemo } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { ResultContext } from '@/app/(commonLayout)/tools/docking/Result/context'
import type { DockingUploadFile } from '@/types/docking'
import { MolstarContext } from '@/app/(commonLayout)/tools/docking/context/molstar'

const DockingInputFile = () => {
  const { receptorFileList } = useContext(ResultContext)
  const { dockingMolstarList } = useContext(MolstarContext)
  const receptorVisibleFileList: DockingUploadFile[] = useMemo(() => {
    const n_list: DockingUploadFile[] = []
    console.log(receptorFileList)
    console.log(dockingMolstarList)
    receptorFileList.map((item) => {
      const docking = dockingMolstarList.find(dockingItem => dockingItem.id === item.fileID)
      if (docking) {
        n_list.push({
          ...item,
          visible: true,
        },
        )
      }

      return item
    })
    return n_list
  }, [dockingMolstarList, receptorFileList])
  return <VerticalTitleCard title="Docking input file">
    <div className="w-full">{
      receptorVisibleFileList.map((item, index) => <div key={index}>{item.file.name}</div>)
    }</div>
  </VerticalTitleCard>
}

export default DockingInputFile
