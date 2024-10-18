import { useContext } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { GlobalResultContext } from '@/app/(commonLayout)/utility/docking/Global/Context/GlobalOutputContext'
import { MolstarContext } from '@/app/(commonLayout)/utility/docking/context/molstar'
import CardLine from '@/app/(commonLayout)/utility/docking/components/CardLine'

const GlobalInputFile = () => {
  const { globalReceptorInputFileList } = useContext(GlobalResultContext)
  const { dockingMolstarList, setStructureVisibility, loadStructureFromUrl } = useContext(MolstarContext)
  // const receptorList: DockingInputFile[] = useMemo(() => {
  //   const newList: DockingInputFile[] = []
  //   return newList
  // }, [globalReceptorInputFileList, dockingMolstarList])
  return <VerticalTitleCard title="Global docking input file">
    <div className="w-full docking-input-file">
      {
        (globalReceptorInputFileList.length === 0)
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
          </>
      }

    </div>
  </VerticalTitleCard>
}

export default GlobalInputFile
