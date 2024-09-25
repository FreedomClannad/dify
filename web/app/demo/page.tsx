'use client'
import { memo, useRef } from 'react'
import dynamic from 'next/dynamic'
import type { MolstarHandle } from '@/app/components/Molstar'

const Molstar = dynamic(() => import('@/app/components/Molstar').then(m => m.default), {
  ssr: false,
})
const Demo = () => {
  const MolstarCompRef = useRef<MolstarHandle>(null)
  const handleClick = () => {
    if (MolstarCompRef.current) {
      MolstarCompRef.current.loadStructureFromUrl(
        'http://127.0.0.1:5500/ligand-dock.sdf',
        'sdf',
      )
    }
  }
  return <div>
    <button onClick={handleClick} className="bg-stone-200">Render</button>
    <div className="w-[400px] h-[400px]">
      <Molstar wrapperRef={MolstarCompRef}/>
    </div>
  </div>
}

export default memo(Demo)
