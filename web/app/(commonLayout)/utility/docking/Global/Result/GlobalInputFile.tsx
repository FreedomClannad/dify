import { useContext, useMemo } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import type { DockingUploadFile } from '@/types/docking'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { getDockingFileURL } from '@/service/docking'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/Context/GlobalOutputContext'

type CardType = {
  docking: DockingUploadFile
  onClick: (dockingUploadFile: DockingUploadFile) => void
  isVisible?: boolean
}
const Card = ({ docking, onClick, isVisible = true }: CardType) => {
  return <>
    <div className="flex w-full h-[32px] justify-between text-gray-1006">
      <div className="flex items-center w-[90%]">
        <div className='w-5 h-5  text-xs text-gray-1005'><DocumentTextIcon/></div>
        <div className='ml-2 whitespace-nowrap overflow-hidden text-ellipsis'>{docking.name}</div>
      </div>
      {isVisible && <div className="cursor-pointer text-xs flex items-center" onClick={() => {
        onClick(docking)
      }}>{docking.visible ? <RiEyeLine className="w-4 h-4"/> : <RiEyeOffLine className="w-4 h-4"/>}</div>}

    </div>
  </>
}

const GlobalInputFile = () => {
  const { receptorFileList, ligandFileList, getLigandResultFileById } = useContext(GlobalResultContext)
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
      else {
        const file = item.file
        if (Array.isArray(file)) {
          file.map((fileItem) => {
            n_list.push({
              fileID: fileItem.id,
              name: fileItem.name,
              visible: false,
            })
            return fileItem
          })
        }
      }

      return item
    })
    return n_list
  }, [dockingMolstarList, receptorFileList])
  const ligandVisibleFileList: DockingUploadFile[] = useMemo(() => {
    const n_list: DockingUploadFile[] = []
    ligandFileList.map((item) => {
      console.log(item)
      console.log(dockingMolstarList)
      const docking = dockingMolstarList.find(dockingItem => dockingItem.id === item.fileID)
      console.log(docking)
      const fileList = item.file
      if (docking) {
        n_list.push({
          fileID: item.fileID,
          name: item.file.name,
          visible: docking.visible,
        },
        )
      }
      else if (Array.isArray(fileList)) {
        fileList.map((fileItem) => {
          const docking = dockingMolstarList.find(dockingItem => dockingItem.id === fileItem.id)
          if (docking) {
            n_list.push({
              fileID: fileItem.id,
              name: fileItem.name,
              visible: docking.visible,
            })
          }
          else {
            n_list.push({
              fileID: fileItem.id,
              name: fileItem.name,
              visible: false,
            })
          }

          return fileItem
        })
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

  const handleClick = (dockingFile: DockingUploadFile) => {
    setStructureVisibility({
      dockingMolstar: { id: dockingFile.fileID, visible: !dockingFile.visible },
    })
  }

  const handleLigandClick = (dockingFile: DockingUploadFile) => {
    console.log(dockingFile)
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
                return <Card key={`receptro-${index}`} docking={item} onClick={handleClick} isVisible={false}/>
              })
            }
            {
              ligandVisibleFileList.map((item, index) => {
                return <Card key={`ligand-${index}`} docking={item} onClick={handleLigandClick}/>
              })
            }
          </>
      }

    </div>
  </VerticalTitleCard>
}

export default GlobalInputFile
