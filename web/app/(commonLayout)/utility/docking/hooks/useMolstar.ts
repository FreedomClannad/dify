import { useRef, useState } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { MolstarHandle } from '@/app/components/Molstar'
import type { DockingMolstar } from '@/types/docking'

const useMolstar = () => {
  const MolstarRef = useRef<MolstarHandle>(null)
  const [dockingMolstarList, setDockingMolstarList] = useState<DockingMolstar[]>([])
  // 添加分子/蛋白质
  const addStructure = (dockingMolstar: DockingMolstar) => {
    setDockingMolstarList([...dockingMolstarList, dockingMolstar])
  }

  // 根据id获取数据
  const getStructure = (id: string) => {
    return dockingMolstarList.find(item => item.id === id)
  }
  // 根据URL进行下载并渲染
  const loadStructureFromUrl = (url: string, formats: BuiltInTrajectoryFormat) => {
    if (MolstarRef.current) {
      MolstarRef.current.loadStructureFromUrl(
        url,
        formats as BuiltInTrajectoryFormat,
      )
    }
  }
  // 根据数据直接渲染
  const loadStructureFromData = (data: string | number[], formats: BuiltInTrajectoryFormat) => {
    if (MolstarRef.current) {
      MolstarRef.current.loadStructureFromData(
        data,
        formats as BuiltInTrajectoryFormat,
      )
    }
  }
  // 设置分子/蛋白质显隐
  const setStructureVisibility = ({ dockingMolstar, addCallback }: { dockingMolstar: DockingMolstar; addCallback?: () => void }) => {
    if (MolstarRef.current) {
      const index = dockingMolstarList.findIndex(
        item => item.id === dockingMolstar.id,
      )
      console.log(index)
      if (index === -1) {
        addStructure(dockingMolstar)
        addCallback?.()
      }
      else {
        const visible = dockingMolstar.visible
        MolstarRef.current.setStructureVisibility(
          index,
          visible,
        )
        const item = dockingMolstarList.map((item) => {
          if (item.id === dockingMolstar.id) {
            return {
              ...item,
              visible,
            }
          }
          return item
        })
        setDockingMolstarList(item)
      }
    }
  }
  // 清除画布
  const clear = () => {
    if (MolstarRef.current) {
      MolstarRef.current.clear()
      setDockingMolstarList([])
    }
  }
  const getCenter = () => {
    if (MolstarRef.current) {
      const center = MolstarRef.current.getCenter()
      console.log(`获取中心点坐标:${center}`)
    }
  }
  return {
    MolstarRef,
    dockingMolstarList,
    addStructure,
    getStructure,
    loadStructureFromUrl,
    loadStructureFromData,
    setStructureVisibility,
    clear,
  }
}

export default useMolstar
