import { useRef } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { MolstarHandle } from '@/app/components/Molstar'

const useMolstar = () => {
  const MolstarRef = useRef<MolstarHandle>(null)
  const loadStructureFromUrl = (url: string, formats: BuiltInTrajectoryFormat) => {
    if (MolstarRef.current) {
      console.log(url)
      MolstarRef.current.loadStructureFromUrl(
        url,
        formats as BuiltInTrajectoryFormat,
      )
    }
  }
  const loadStructureFromData = (data: string | number[], formats: BuiltInTrajectoryFormat) => {
    console.log(data)
    if (MolstarRef.current) {
      console.log(data)
      MolstarRef.current.loadStructureFromData(
        data,
        formats as BuiltInTrajectoryFormat,
      )
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
    loadStructureFromUrl,
    loadStructureFromData,
  }
}

export default useMolstar
