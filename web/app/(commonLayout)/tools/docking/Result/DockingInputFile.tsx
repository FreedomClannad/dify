import { useContext, useMemo } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { ResultContext } from '@/app/(commonLayout)/tools/docking/Result/context'
import type { DockingUploadFile } from '@/types/docking'
import { MolstarContext } from '@/app/(commonLayout)/tools/docking/context/molstar'

type CardType = {
  docking: DockingUploadFile
  onClick: (dockingUploadFile: DockingUploadFile) => void
}
const Card = ({ docking, onClick }: CardType) => {
  return <>
    <div className="flex w-full justify-between">
      <div className="flex">
        <div className='w-5 h-5  text-xs'><DocumentTextIcon/></div>
        <span>{docking.file.name}</span>
      </div>
      <div className="cursor-pointer" onClick={() => {
        onClick(docking)
      }}>{docking.visible ? <RiEyeLine/> : <RiEyeOffLine/>}</div>
    </div>
  </>
}

const DockingInputFile = () => {
  const { receptorFileList } = useContext(ResultContext)
  const { dockingMolstarList, setStructureVisibility } = useContext(MolstarContext)
  const receptorVisibleFileList: DockingUploadFile[] = useMemo(() => {
    const n_list: DockingUploadFile[] = []
    receptorFileList.map((item) => {
      const docking = dockingMolstarList.find(dockingItem => dockingItem.id === item.fileID)
      if (docking) {
        n_list.push({
          ...item,
          visible: docking.visible,
        },
        )
      }

      return item
    })
    return n_list
  }, [dockingMolstarList, receptorFileList])
  const handleClick = (dockingFile: DockingUploadFile) => {
    console.log(dockingFile)
    setStructureVisibility({
      dockingMolstar: { id: dockingFile.fileID, visible: !dockingFile.visible },
    })
  }
  return <VerticalTitleCard title="Docking input file">
    <div className="w-full">{
      receptorVisibleFileList.map((item, index) => {
        return <Card key={`receptro-${index}`} docking={item} onClick={handleClick} />
      })
    }</div>
  </VerticalTitleCard>
}

export default DockingInputFile
