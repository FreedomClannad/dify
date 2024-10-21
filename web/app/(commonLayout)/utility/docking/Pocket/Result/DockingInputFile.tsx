import { useContext } from 'react'
import { DocumentTextIcon } from '@heroicons/react/24/outline'
import { RiEyeLine, RiEyeOffLine } from '@remixicon/react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { ResultContext } from '@/app/(commonLayout)/utility/docking/Pocket/context/PocketOutputContext'
import type { DockingInputFile, DockingUploadFile } from '@/types/docking'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import { getDockingFileURL } from '@/service/docking'
import CardLine from '@/app/(commonLayout)/utility/docking/components/CardLine'
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

const PocketInputFile = () => {
  const {
    pocketReceptorResultInputFileList,
    getPocketReceptorUploadResultFile,
    updatePocketReceptorResultInputFile,
    getPocketLigandUploadResultFile,
    pocketLigandResultInputFileList,
    updatePocketLigandResultInputFile,

    cropRecepResultInputList,
    getCropReceptorResult,
    updateCropRecepResultInputFile,
  } = useContext(ResultContext)
  const { setStructureVisibility, loadStructureFromUrl } = useContext(MolstarContext)

  const handleReceptorClick = (dockingInputFile: DockingInputFile) => {
    const { id, visible } = dockingInputFile
    const dockingResultFile = getPocketReceptorUploadResultFile(id)
    if (dockingResultFile) {
      const n_visible = !visible
      const n_docking = { ...dockingInputFile, visible: n_visible }
      updatePocketReceptorResultInputFile(n_docking)
      setStructureVisibility({
        dockingMolstar: { id, visible: n_visible },
      })
    }
  }

  const handleLigandClick = (dockingInputFile: DockingInputFile) => {
    const { id, visible } = dockingInputFile
    const dockingResultFile = getPocketLigandUploadResultFile(id)
    if (dockingResultFile) {
      const n_visible = !visible
      const n_docking = { ...dockingInputFile, visible: n_visible }
      updatePocketLigandResultInputFile(n_docking)
      setStructureVisibility({
        dockingMolstar: { id, visible: n_visible },
        addCallback: () => {
          const { id, mime_type, extension } = dockingResultFile
          loadStructureFromUrl(getDockingFileURL({ id, mime_type }), extension)
        },
      })
    }
  }

  const handleCropReceptorClick = (dockingInputFile: DockingInputFile) => {
    const { id, visible } = dockingInputFile
    const dockingResultFile = getCropReceptorResult(id)
    console.log(dockingResultFile)
    if (dockingResultFile) {
      const n_visible = !visible
      const n_docking = { ...dockingInputFile, visible: n_visible }
      updateCropRecepResultInputFile(n_docking)
      setStructureVisibility({
        dockingMolstar: { id, visible: n_visible },
        addCallback: () => {
          const { id, mime_type, extension } = dockingResultFile
          loadStructureFromUrl(getDockingFileURL({ id, mime_type }), extension)
        },
      })
    }
  }

  return <VerticalTitleCard title="Pocket docking input file">
    <div className="w-full docking-input-file">
      {
        (pocketReceptorResultInputFileList.length === 0 && pocketLigandResultInputFileList.length === 0)
          ? <>
            <div className="w-full flex justify-center items-center rounded h-[100px] leading-[40px] shadow-md">
              <span>No data</span>
            </div>
          </>
          : <>
            {
              pocketReceptorResultInputFileList.map((item, index) => {
                return <CardLine key={`receptor-${index}`} {...item} onClick={() => {
                  handleReceptorClick(item)
                }}/>
              })
            }
            {
              pocketLigandResultInputFileList.map((item, index) => {
                return <CardLine key={`receptor-${index}`} {...item} onClick={() => {
                  handleLigandClick(item)
                }}/>
              })
            }
            {
              cropRecepResultInputList.map((item, index) => {
                return <CardLine key={`receptor-${index}`} {...item} onClick={() => {
                  handleCropReceptorClick(item)
                }}/>
              })
            }
          </>
      }

    </div>
  </VerticalTitleCard>
}

export default PocketInputFile
