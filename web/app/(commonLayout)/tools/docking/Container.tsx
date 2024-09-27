import { useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import style from './Container.module.css'
import { DockingModeEnum } from '@/types/docking'
import cn from '@/utils/classnames'
import InputForm from '@/app/(commonLayout)/tools/docking/Input/InputForm'
import type { MolstarHandle } from '@/app/components/Molstar'

const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Container = () => {
  const [mode, setMode] = useState<DockingModeEnum>(DockingModeEnum.input)
  const MolstarCompRef = useRef<MolstarHandle>(null)
  const handleClick = () => {
    if (MolstarCompRef.current) {
      MolstarCompRef.current.loadStructureFromUrl(
        'http://127.0.0.1:5500/ligand-dock.sdf',
        'sdf',
      )
    }
  }
  const getCenter = () => {
    if (MolstarCompRef.current) {
      const center = MolstarCompRef.current.getCenter()
      console.log(`获取中心点坐标:${center}`)
    }
  }
  return (<>
    <div className="flex h-full bg-white border-t border-gray-200 overflow-hidden">
      <div className="flex flex-col w-fit sm:w-[400px] shrink-0 border-gray-550 border-r h-full">
        <div className="border-gray-550 border-b">
          <div className="flex items-center justify-center">
            <div className={cn(mode === DockingModeEnum.input && style.mode, 'h-[44px] flex items-center justify-center cursor-pointer relative px-4 after:bg-primary-1001')} onClick={() => {
              setMode(DockingModeEnum.input)
            }}>
              <span>Inputs</span>
            </div>
            <div className={cn(mode === DockingModeEnum.result && style.mode, 'ml-10 h-[44px] flex items-center justify-center cursor-pointer relative px-4 after:bg-primary-1001')} onClick={() => {
              setMode(DockingModeEnum.result)
            }}>
              <span>Results</span>
            </div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {DockingModeEnum.input === mode && <InputForm onSubmit={handleClick} getCenter={getCenter} />}
        </div>
      </div>
      <div className="grow relative w-full h-full"><Molstar wrapperRef={MolstarCompRef}/></div>
    </div>
  </>)
}

export default Container
