import { useContext, useMemo } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { PoseviewContext } from '@/app/(commonLayout)/utility/poseview/context'
import CardLine from '@/app/components/ALM/CardLine'

const InputFile = () => {
  const { receptorResultShowList, ligandResultShowList } = useContext(PoseviewContext)
  const isShow = useMemo(() => {
    return receptorResultShowList.length === 0 && ligandResultShowList.length === 0
  }, [receptorResultShowList, ligandResultShowList])
  const handleReceptorClick = () => {
    console.log('receptor点击事件')
  }

  const handleLigandClick = () => {
    console.log('ligand点击事件')
  }
  return <>
    <VerticalTitleCard title="Uploaded Files" >
      <div className="w-full docking-input-file">
        {
          isShow
            ? <>
              <div className="w-full flex justify-center items-center rounded h-[100px] leading-[40px] shadow-md">
                <span>No data</span>
              </div>
            </>
            : <>
              {
                receptorResultShowList.map((item, index) => <CardLine key={`receptor-${index}`} {...item} onClick={handleReceptorClick}></CardLine>)
              }
              {
                ligandResultShowList.map((item, index) => <CardLine key={`ligand-${index}`} {...item} onClick={handleLigandClick}></CardLine>)
              }
            </>
        }
      </div>
    </VerticalTitleCard>
  </>
}

export default InputFile
