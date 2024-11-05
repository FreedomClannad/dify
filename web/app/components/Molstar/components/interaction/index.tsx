import { createPortal } from 'react-dom'
import './index.css'
import type { interactions, interactionsKeys } from '@/types/docking'
import { InteractionsEnum } from '@/types/docking'
import cn from '@/utils/classnames'
type props = {
  interactionsData: interactions
  onClick: (key: interactionsKeys, value: InteractionsEnum) => void
}
const InteractionBox = ({ interactionsData, onClick }: props) => {
  const init = () => {
    const mainElement = document.querySelector('.msp-layout-main')
    console.log('InteractionBox')
    console.log(mainElement)
    if (mainElement) {
      const layoutElement = mainElement.querySelector('.msp-layout-static')
      console.log(layoutElement)
    }
  }

  const mainElement = document.querySelector('.msp-layout-main')
  const layoutElement = mainElement?.querySelector('.msp-layout-static')

  const handleClick = (key: interactionsKeys) => {
    const value = interactionsData[key]
    if (value === InteractionsEnum.on)
      onClick(key, InteractionsEnum.off)
    else
      onClick(key, InteractionsEnum.on)
  }

  const content = () => {
    return <>
      <div className="interaction-box">
        <div className={cn('interaction-label')} onClick={() => { handleClick('ionic') }}>
          <div className="interaction-dots-box " >
            <div className='interaction-dots Ionic'></div>
            <div className='interaction-dots Ionic'></div>
            <div className='interaction-dots Ionic'></div>
          </div>
          <span className={cn('interaction-name', interactionsData.ionic === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Ionic</span>
        </div>
        <div className={cn('interaction-label')} onClick={() => { handleClick('pi-stacking') }}>
          <div className="interaction-dots-box">
            <div className='interaction-dots PiStacking'></div>
            <div className='interaction-dots PiStacking'></div>
            <div className='interaction-dots PiStacking'></div>
          </div>
          <span className={cn('interaction-name', interactionsData['pi-stacking'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Pi-stacking</span></div>
        <div className={cn('interaction-label')} onClick={() => { handleClick('cation-pi') }}>
          <div className="interaction-dots-box">
            <div className='interaction-dots CationPi'></div>
            <div className='interaction-dots CationPi'></div>
            <div className='interaction-dots CationPi'></div>
          </div>
          <span className={cn('interaction-name', interactionsData['cation-pi'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Cation-pi</span></div>
        <div className={cn('interaction-label')} onClick={() => { handleClick('halogen-bonds') }}>
          <div className="interaction-dots-box">
            <div className='interaction-dots HalogenBond'></div>
            <div className='interaction-dots HalogenBond'></div>
            <div className='interaction-dots HalogenBond'></div>
          </div>
          <span className={cn('interaction-name', interactionsData['halogen-bonds'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Halogen-bonds</span></div>
        <div className={cn('interaction-label')} onClick={() => { handleClick('hydrogen-bonds') }}>
          <div className="interaction-dots-box">
            <div className='interaction-dots HydrogenBond'></div>
            <div className='interaction-dots HydrogenBond'></div>
            <div className='interaction-dots HydrogenBond'></div>
          </div>
          <span className={cn('interaction-name', interactionsData['hydrogen-bonds'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Hydrogen-bonds</span></div>
        <div className={cn('interaction-label')} onClick={() => { handleClick('weak-hydrogen-bonds') }}>
          <div className="interaction-dots-box">
            <div className='interaction-dots WeakHydrogenBond'></div>
            <div className='interaction-dots WeakHydrogenBond'></div>
            <div className='interaction-dots WeakHydrogenBond'></div>
          </div>
          <span className={cn('interaction-name', interactionsData['weak-hydrogen-bonds'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Weak-hydrogen-bonds</span></div>
        <div className={cn('interaction-label')} onClick={() => { handleClick('hydrophobic') }}>
          <div className="interaction-dots-box">
            <div className='interaction-dots Hydrophobic'></div>
            <div className='interaction-dots Hydrophobic'></div>
            <div className='interaction-dots Hydrophobic'></div>
          </div>
          <span className={cn('interaction-name', interactionsData.hydrophobic === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Hydrophobic</span></div>
        <div className={cn('interaction-label')} onClick={() => { handleClick('metal-coordination') }}>
          <div className="interaction-dots-box">
            <div className='interaction-dots MetalCoordination'></div>
            <div className='interaction-dots MetalCoordination'></div>
            <div className='interaction-dots MetalCoordination'></div>
          </div>
          <span className={cn('interaction-name', interactionsData['metal-coordination'] === InteractionsEnum.off ? 'interaction-name-disable' : '')}>Metal-coordination</span></div>
      </div>
    </>
  }
  return layoutElement ? createPortal(content(), layoutElement) : null
}

export default InteractionBox
