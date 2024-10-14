import { useContext, useMemo } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { ResultContext } from '@/app/(commonLayout)/utility/docking/Result/context'
import type { DockingUploadFile } from '@/types/docking'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { getDockingFileURL } from '@/service/docking'

type CardType = {
  docking: DockingUploadFile
  onClick: (dockingUploadFile: DockingUploadFile) => void
}
const Card = ({ docking, onClick }: CardType) => {
  return <>
    <div className="flex w-full h-[32px] justify-between text-gray-1006">
      <div className="flex items-center">
        <div className='w-5 h-5  text-xs text-gray-1005'><DocumentTextIcon/></div>
        <span className='ml-2'>{docking.file.name}</span>
      </div>
      <div className="cursor-pointer text-xs flex items-center" onClick={() => {
        onClick(docking)
      }}>{docking.visible ? <RiEyeLine className="w-4 h-4"/> : <RiEyeOffLine className="w-4 h-4"/>}</div>
    </div>
  </>
}

const DockingInputFile = () => {
  const { receptorFileList, ligandFileList, getLigandResultFileById } = useContext(ResultContext)
  const { dockingMolstarList, setStructureVisibility, loadStructureFromUrl } = useContext(MolstarContext)
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
  const ligandVisibleFileList: DockingUploadFile[] = useMemo(() => {
    const n_list: DockingUploadFile[] = []
    ligandFileList.map((item) => {
      const docking = dockingMolstarList.find(dockingItem => dockingItem.id === item.fileID)
      if (docking) {
        n_list.push({
          ...item,
          visible: docking.visible,
        },
        )
      }
      else {
        n_list.push({
          ...item,
          visible: false,
        })
      }

      return item
    })
    return n_list
  }, [dockingMolstarList, ligandFileList])
  const handleClick = (dockingFile: DockingUploadFile) => {
    setStructureVisibility({
      dockingMolstar: { id: dockingFile.fileID, visible: !dockingFile.visible },
    })
  }

  const handleLigandClick = (dockingFile: DockingUploadFile) => {
    const file = getLigandResultFileById(dockingFile.fileID)
    console.log(file)
    if (file) {
      setStructureVisibility({
        dockingMolstar: { id: dockingFile.fileID, visible: !dockingFile.visible },
        addCallback: () => {
          loadStructureFromUrl(getDockingFileURL({ id: file.id, mime_type: file.mime_type }), file.extension)
        },
      })
    }
  }

  return <VerticalTitleCard title="Docking input file">
    <div className="w-full docking-input-file">
      {
        (receptorVisibleFileList.length === 0 && ligandVisibleFileList.length === 0)
          ? <>
            <div className="w-full flex justify-center items-center rounded h-[100px] leading-[40px] shadow-md">
              <span>No data</span>
            </div>
          </>
          : <>
            {
              receptorVisibleFileList.map((item, index) => {
                return <Card key={`receptro-${index}`} docking={item} onClick={handleClick}/>
              })
            }
            {
              ligandVisibleFileList.map((item, index) => {
                return <Card key={`receptro-${index}`} docking={item} onClick={handleLigandClick}/>
              })
            }
          </>
      }

    </div>
  </VerticalTitleCard>
}

export default DockingInputFile
