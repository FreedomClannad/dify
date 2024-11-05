'use client'
import { memo, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Switch } from '@nextui-org/react'
import type { MolstarHandle } from '@/app/components/Molstar'
const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Demo = () => {
  const MolstarCompRef = useRef<MolstarHandle>(null)
  const [IonicIsShown, setIonicIsShown] = useState<boolean>(false)
  const handleClick = () => {
    if (MolstarCompRef.current) {
      MolstarCompRef.current.loadStructureFromUrl(
        'http://127.0.0.1:5500/ligand-dock.sdf',
        'sdf',
      )
    }
  }
  const TestButton = () => {
    if (MolstarCompRef.current)
      MolstarCompRef.current.test()
  }
  return <div>
    <div className="flex">
      <button onClick={handleClick} className="bg-stone-200">Render</button>
      <button onClick={TestButton} className="ml-3 bg-stone-200">test</button>

      <Switch isSelected={IonicIsShown} aria-label="Ionic" onValueChange={(value) => {
        if (MolstarCompRef.current)
          MolstarCompRef.current.setInteraction(value)

        setIonicIsShown(value)
      }}/>
    </div>

    <div className="w-full h-[800px] relative mt-3">
      <Molstar wrapperRef={MolstarCompRef}/>
    </div>
  </div>
}

export default memo(Demo)
