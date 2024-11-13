import { useContext, useMemo } from 'react'
import VerticalTitleCard from '@/app/components/card/vertical-title-card'
import { PoseviewContext } from '@/app/(commonLayout)/utility/poseview/context'
import CardLine from '@/app/(commonLayout)/utility/docking/components/CardLine'

const InputFile = () => {
  const { receptorResultShowList, ligandResultShowList } = useContext(PoseviewContext)
  const isShow = useMemo(() => {
    return receptorResultShowList.length === 0 && ligandResultShowList.length === 0
  }, [receptorResultShowList, ligandResultShowList])
  return <>
    <VerticalTitleCard title="Uploaded Files" >
      <div className="w-full docking-input-file rounded-large shadow-small py-2">
        {
          isShow
            ? <>
              <div className="w-full flex justify-center items-center rounded h-[100px] leading-[40px] shadow-md">
                <span>No data</span>
              </div>
            </>
            : <>
              {
                receptorResultShowList.map((item, index) => <CardLine key={`receptor-${index}`} {...item}></CardLine>)
              }
              {
                ligandResultShowList.map((item, index) => <CardLine key={`ligand-${index}`} {...item}></CardLine>)
              }
            </>
        }
      </div>
    </VerticalTitleCard>
  </>
}

export default InputFile
