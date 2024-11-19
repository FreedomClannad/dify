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
        'http://127.0.0.1:5501/ace2-hit.mol2',
        'mol2',
      )
    }
  }
  const TestButton = () => {
    if (MolstarCompRef.current)
      MolstarCompRef.current.test()
  }
  const handleDeleteData = () => {
    if (MolstarCompRef.current)
      MolstarCompRef.current.getDeleteData()
  }
  const MergeStructure = () => {
    if (MolstarCompRef.current)
      MolstarCompRef.current.loadStructuresFromUrlsAndMerge()
  }
  const DeleteLigand = () => {
    if (MolstarCompRef.current)
      MolstarCompRef.current.delete_liagnd()
  }
  return <div>
    <div className="flex">
      <button onClick={handleClick} className="bg-stone-200">Render</button>
      <button onClick={TestButton} className="ml-3 bg-stone-200">test</button>
      <button onClick={handleDeleteData} className="ml-3 bg-stone-200">获取删除后的数据</button>
      <button onClick={MergeStructure} className="ml-3 bg-stone-200">合并结构</button>
      <button onClick={DeleteLigand} className="ml-3 bg-stone-200">删除ligand</button>

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
