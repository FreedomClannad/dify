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
        <span className='ml-2'>{docking.name}</span>
      </div>
      <div className="cursor-pointer text-xs flex items-center" onClick={() => {
        onClick(docking)
      }}>{docking.visible ? <RiEyeLine className="w-4 h-4"/> : <RiEyeOffLine className="w-4 h-4"/>}</div>
    </div>
  </>
}

const GlobalInputFile = () => {
  const { receptorFileList, ligandFileList, cropReceptorList, getLigandResultFileById, getCropReceptorById } = useContext(ResultContext)
  const { dockingMolstarList, setStructureVisibility, loadStructureFromUrl } = useContext(MolstarContext)
  const receptorVisibleFileList: DockingUploadFile[] = useMemo(() => {
    const n_list: DockingUploadFile[] = []
    receptorFileList.map((item) => {
      const docking = dockingMolstarList.find(dockingItem => dockingItem.id === item.fileID)
      if (docking) {
        n_list.push({
          fileID: item.fileID,
          name: item.file.name,
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
          fileID: item.fileID,
          name: item.file.name,
          visible: docking.visible,
        },
        )
      }
      else {
        n_list.push({
          fileID: item.fileID,
          name: item.file.name,
          visible: false,
        })
      }

      return item
    })
    return n_list
  }, [dockingMolstarList, ligandFileList])

  const cropReceptorVisibleFileList: DockingUploadFile[] = useMemo(() => {
    const n_list: DockingUploadFile[] = []
    cropReceptorList.map((item) => {
      const docking = dockingMolstarList.find(dockingItem => dockingItem.id === item.fileID)
      if (docking) {
        n_list.push({
          fileID: item.fileID,
          name: item.name || '',
          visible: docking.visible,
        },
        )
      }
      else {
        n_list.push({
          fileID: item.fileID,
          name: item.name || '',
          visible: false,
        })
      }
      return item
    })
    return n_list
  }, [dockingMolstarList, cropReceptorList])
  const handleClick = (dockingFile: DockingUploadFile) => {
    setStructureVisibility({
      dockingMolstar: { id: dockingFile.fileID, visible: !dockingFile.visible },
    })
  }

  const handleLigandClick = (dockingFile: DockingUploadFile) => {
    const dockingResultFile = getLigandResultFileById(dockingFile.fileID)
    console.log(dockingResultFile)
    if (dockingResultFile) {
      setStructureVisibility({
        dockingMolstar: { id: dockingFile.fileID, visible: !dockingFile.visible },
        addCallback: () => {
          loadStructureFromUrl(getDockingFileURL({ id: dockingResultFile.id, mime_type: dockingResultFile.mime_type }), dockingResultFile.extension)
        },
      })
    }
  }

  const handleCropReceptorClick = (dockingFile: DockingUploadFile) => {
    const dockingResultFile = getCropReceptorById(dockingFile.fileID)
    if (dockingResultFile) {
      setStructureVisibility({
        dockingMolstar: { id: dockingFile.fileID, visible: !dockingFile.visible },
        addCallback: () => {
          loadStructureFromUrl(getDockingFileURL({ id: dockingResultFile.id, mime_type: dockingResultFile.mime_type }), dockingResultFile.extension)
        },
      })
    }
  }

  return <VerticalTitleCard title="Global docking input file">
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
                return <Card key={`ligand-${index}`} docking={item} onClick={handleLigandClick}/>
              })
            }
            {
              cropReceptorVisibleFileList.map((item, index) => {
                return <Card key={`crop-${index}`} docking={item} onClick={handleCropReceptorClick}/>
              })
            }
          </>
      }

    </div>
  </VerticalTitleCard>
}

export default GlobalInputFile