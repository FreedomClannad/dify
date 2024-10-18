import { useContext } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/Context/GlobalOutputContext'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import CardLine from '@/app/(commonLayout)/utility/docking/components/CardLine'
import type { DockingInputFile } from '@/types/docking'
import { getDockingFileURL } from '@/service/docking'

const GlobalInputFile = () => {
  const { globalReceptorInputFileList, globalLigandInputFileList, getGlobalLigandUploadResultFile, updateGlobalLigandInputFile } = useContext(GlobalResultContext)
  const { setStructureVisibility, loadStructureFromUrl } = useContext(MolstarContext)
  // const receptorList: DockingInputFile[] = useMemo(() => {
  //   const newList: DockingInputFile[] = []
  //   return newList
  // }, [globalReceptorInputFileList, dockingMolstarList])
  const handleLigandClick = (dockingInputFile: DockingInputFile) => {
    const { id, visible } = dockingInputFile
    const dockingResultFile = getGlobalLigandUploadResultFile(id)
    if (dockingResultFile) {
      const n_visible = !visible
      const n_docking = { ...dockingInputFile, visible: n_visible }
      updateGlobalLigandInputFile(n_docking)
      setStructureVisibility({
        dockingMolstar: { id: dockingInputFile.id, visible: n_visible },
        addCallback: () => {
          const { id, mime_type, extension } = dockingResultFile
          loadStructureFromUrl(getDockingFileURL({ id, mime_type }), extension)
        },
      })
    }
  }
  return <VerticalTitleCard title="Global docking input file">
    <div className="w-full docking-input-file">
      {
        (globalReceptorInputFileList.length === 0 && globalLigandInputFileList.length === 0)
          ? <>
            <div className="w-full flex justify-center items-center rounded h-[100px] leading-[40px] shadow-md">
              <span>No data</span>
            </div>
          </>
          : <>
            {
              globalReceptorInputFileList.map((item, index) => {
                return <CardLine key={`receptro-${index}`} {...item}/>
              })
            }
            {
              globalLigandInputFileList.map((item, index) => {
                return <CardLine key={`ligand-${index}`} {...item} onClick={() => {
                  handleLigandClick(item)
                }}/>
              })
            }
          </>
      }

    </div>
  </VerticalTitleCard>
}

export default GlobalInputFile
