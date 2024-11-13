import { useEffect, useRef, useState } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { MolstarHandle } from '@/app/components/Molstar'
import type { UtilityMolstar } from '@/types/utility'

enum RenderType {
  'URL' = 'URL',
  'DATA' = 'DATA',
}

type RenderBuffer = {
  data: string | number[]
  formats: BuiltInTrajectoryFormat
  type: RenderType
}

export type useMolstarType = ReturnType<typeof useMolstar>
const useMolstar = () => {
  const MolstarRef = useRef<MolstarHandle>(null)
  const [molstarList, setMolstarList] = useState<UtilityMolstar[]>([])
  const [renderBufferData, setRenderBufferData] = useState<RenderBuffer[]>([])
  const [isMolstarMounted, setIsMolstarMounted] = useState(false)
  const molstarListRef = useRef(molstarList)
  useEffect(() => {
    molstarListRef.current = molstarList
  }, [molstarList])
  // 添加渲染缓存数据
  const addRenderBufferData = (buffer: RenderBuffer) => {
    setRenderBufferData((renderBuffer) => {
      return [...renderBuffer, buffer]
    })
  }

  // 清空缓存数据
  const clearRenderBufferData = () => {
    setRenderBufferData([])
  }

  // 添加分子/蛋白质
  const addStructure = (molstar: UtilityMolstar) => {
    setMolstarList([...molstarList, molstar])
  }

  // 根据id获取数据
  const getStructure = (id: string) => {
    // return dockingMolstarList.find(item => item.id === id)
    return molstarListRef.current.find(item => item.id === id)
  }
  // 根据URL进行下载并渲染
  const loadStructureFromUrl = (url: string, formats: BuiltInTrajectoryFormat) => {
    if (MolstarRef.current && MolstarRef.current.isLoad()) {
      MolstarRef.current.loadStructureFromUrl(
        url,
        formats as BuiltInTrajectoryFormat,
      )
    }
    else {
      addRenderBufferData({ data: url, formats, type: RenderType.URL })
    }
  }
  // 根据数据直接渲染
  const loadStructureFromData = (data: string | number[], formats: BuiltInTrajectoryFormat) => {
    if (MolstarRef.current && MolstarRef.current.isLoad()) {
      MolstarRef.current.loadStructureFromData(
        data,
        formats as BuiltInTrajectoryFormat,
      )
    }
    else {
      addRenderBufferData({ data, formats, type: RenderType.DATA })
    }
  }
  // 设置分子/蛋白质显隐
  const setStructureVisibility = ({ molstar, addCallback }: { molstar: UtilityMolstar; addCallback?: () => void }) => {
    if (MolstarRef.current) {
      const index = molstarList.findIndex(
        item => item.id === molstar.id,
      )
      if (index === -1) {
        addStructure(molstar)
        addCallback?.()
      }
      else if (index >= 0) {
        const visible = molstar.visible
        MolstarRef.current.setStructureVisibility(
          index,
          visible,
        )
        const item = molstarList.map((item) => {
          if (item.id === molstar.id) {
            return {
              ...item,
              visible,
            }
          }
          return item
        })
        setMolstarList(item)
      }
      else {
        console.error(`未找到id为${molstar.id}的分子/蛋白质: index`)
      }
    }
  }
  // 清除画布
  const clear = () => {
    if (MolstarRef.current) {
      MolstarRef.current.clear()
      setMolstarList([])
    }
  }

  const RenderBuffer = () => {
    if (renderBufferData.length > 0) {
      renderBufferData.forEach((buffer) => {
        if (buffer.type === RenderType.URL) {
          const url = buffer.data.toString()
          loadStructureFromUrl(url, buffer.formats)
        }
        else if (buffer.type === RenderType.DATA) {
          const data = buffer.data
          loadStructureFromData(data, buffer.formats)
        }
      })
      clearRenderBufferData()
    }
  }

  const getCenter = () => {
    if (MolstarRef.current) {
      const center = MolstarRef.current.getCenter()
      console.log(`获取中心点坐标:${center}`)
    }
  }

  useEffect(() => {
    if (MolstarRef.current && isMolstarMounted) {
      console.log('渲染使用缓存')
      RenderBuffer()
    }
  }, [isMolstarMounted])

  return {
    MolstarRef,
    molstarList,
    addStructure,
    getStructure,
    loadStructureFromUrl,
    loadStructureFromData,
    setStructureVisibility,
    clear,
    setIsMolstarMounted,
  }
}

export default useMolstar
