'use client'
import type { LegacyRef } from 'react'
import { forwardRef, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { StructureHierarchyRef } from 'molstar/lib/mol-plugin-state/manager/structure/hierarchy-state'
import { Viewer } from './viewer'
import { getShortId } from '@/utils'
import 'molstar/build/viewer/molstar.css'
import './styles.css'
import { MolstarPubSub } from '@/pubsub'
import InteractionBox from '@/app/components/Molstar/components/interaction'
import type { interactions, interactionsKeys } from '@/types/docking'
import { InteractionsEnum } from '@/types/docking'
import { initOptions } from '@/app/components/Molstar/function'
// import { color } from 'framer-motion'
// import bulkEdit from '../workflow/nodes/http/components/key-value/bulk-edit'

type Props = {
  id?: string
  onFocusCenter?: (center: { x: number; y: number; z: number; num: string; chain: string; label: string }) => void
  onLoad?: () => void
}

export type MolstarHandle = {
  loadStructureFromUrl: (url: string, formate: BuiltInTrajectoryFormat) => void
  loadStructureFromData: (data: string | number[], format: BuiltInTrajectoryFormat) => void
  loadStructuresFromUrlsAndMerge: () => void
  delete_liagnd: () => void
  DrawBox: () => void
  setStructureVisibility: (index: number, visible: boolean) => void
  getCenter: () => Promise<{ x: number; y: number; z: number; num: string; chain: string; label: string } | null | undefined>
  clear: () => void
  isLoad: () => boolean
  test: () => void
  setInteraction: (ionic: boolean) => void
  getDeleteData: () => void
}
// let ViewerStart = null;
const MolstarComp = forwardRef<MolstarHandle, Props>(({ id = getShortId(), onFocusCenter, onLoad }, ref) => {
  const molstart = useRef<Viewer | null>(null)
  const [isMolLoad, setIsMolLoad] = useState<boolean>(false)
  // 通过控制boolean来刷新组件
  const [isRefresh, setIsRefresh] = useState<boolean>(false)
  const getCenter = async () => {
    if (molstart && molstart.current) {
      const center = molstart.current.getFocusedResidueCenter()
      if (center) {
        const { x, y, z, num, chain, indexArray } = center
        const label = molstart.current?.getFocusedPolymer(indexArray) || ''
        console.log(label)
        return { x, y, z, num, chain, label }
      }
      return undefined
    }
  }
  const DrawBox = async () => {
    console.log('aaa')
    if (molstart && molstart.current) {
      // const stru = molstart.current.plugin.managers.structure.focus.current?.loci.structure
      // const stru = molstart.current.plugin.managers.structure.hierarchy.current.structures[0].components.find(s => s.cell.obj?.label === '[Focus] Target')
      // const fouce_data = stru?.cell.obj
      // console.log('type', stru)
      const drawbox = await molstart.current?.Draw3DBox(true, 2, 4, 6, '0xffff00')
      console.log('www', drawbox)
      return drawbox
    }
    return null
  }
  useEffect(() => {
    Viewer.create(id, {
      layoutIsExpanded: false,
      layoutShowControls: true,
      layoutShowRemoteState: false,
      layoutShowSequence: true,
      layoutShowLog: false,
      layoutShowLeftPanel: true,
      layoutShowRightPanel: true,

      viewportShowExpand: false,
      viewportShowSelectionMode: false,
      viewportShowAnimation: false,
      viewportShowControls: false,
      viewportShowSettings: false,
      viewportShowTrajectoryControls: false,
      volumeStreamingServer: 'https://maps.rcsb.org',
    },
    ).then((res) => {
      molstart.current = res
      console.log(res)
      setTimeout(() => {
        onLoad?.()
        setIsMolLoad(true)
      }, 500)

      // ViewerStart = res;
    })
  }, [])
  const focusClicked = async () => {
    console.log('bbb')
    setTimeout(async () => {
      const center = await getCenter()
      onFocusCenter?.(center as { x: number; y: number; z: number; num: string; chain: string;label: string })
      DrawBox()
    }, 500)
  }
  useEffect(() => {
    MolstarPubSub.subscribe('molstar-focus-clicked', focusClicked)
    return () => {
      MolstarPubSub.unsubscribe('molstar-focus-clicked', focusClicked)
    }
  }, [])
  // 加载模型
  const loadStructureFromUrl = (url: string, formate: BuiltInTrajectoryFormat) => {
    if (molstart && molstart.current)
      molstart.current.loadStructureFromUrl(url, formate)
      // molstart.current.loadAllModelsOrAssemblyFromUrl(url, formate)

    // if (ViewerStart) {
    //     ViewerStart.loadStructureFromUrl(url, formate);
    // }
  }

  // 删除ligand
  const delete_liagnd = () => {
    if (molstart && molstart.current)
      molstart.current.removeligend()
  }
  // 加载合并模型
  const loadStructuresFromUrlsAndMerge = () => {
    if (molstart && molstart.current)
      molstart.current.loadStructuresFromUrlsAndMerge()
  }
  // 根据传入的data来进行渲染数据
  const loadStructureFromData = (data: string | number[], format: BuiltInTrajectoryFormat) => {
    if (molstart && molstart.current)
      // molstart.current.loadStructureFromData(data, format)
      molstart.current.loadStructureFromData(data, format)
  }
  // 控制分子/蛋白质显隐
  const setStructureVisibility = (index: number, visible: boolean) => {
    if (molstart && molstart.current) {
      console.log(molstart.current?.plugin.managers.structure.hierarchy.current.structures)
      const data = molstart.current?.plugin.state.data
      const ref = molstart.current?.plugin.managers.structure.hierarchy.current.structures[Number(index)].cell.transform.ref
      molstart.current.setStructureVisibility(data, ref, !visible)
    }
  }
  // 清空画布
  const clear = () => {
    if (molstart && molstart.current)
      molstart.current.plugin.clear()
  }
  // 判断mol是否加载完成
  const isLoad = () => {
    return !!(molstart && molstart.current)
  }

  // 获取相互作用参数
  const interactionData = useMemo(() => {
    const interactionsObj: interactions = {
      'cation-pi': InteractionsEnum.off,
      'halogen-bonds': InteractionsEnum.off,
      'hydrogen-bonds': InteractionsEnum.off,
      'hydrophobic': InteractionsEnum.off,
      'ionic': InteractionsEnum.off,
      'metal-coordination': InteractionsEnum.off,
      'pi-stacking': InteractionsEnum.off,
      'weak-hydrogen-bonds': InteractionsEnum.off,
    }
    if (molstart && molstart.current) {
      const interactionsOptions = molstart.current?.plugin.managers.structure.component.state.options.interactions.providers

      if (interactionsOptions) {
        const keys = Object.keys(interactionsOptions)
        keys.forEach((key) => {
          interactionsObj[key as interactionsKeys] = interactionsOptions[key].name as InteractionsEnum
        })
      }
    }
    console.log(interactionsObj)
    return interactionsObj
  }, [isMolLoad, isRefresh])

  const handleInteractionBoxClick = (key: interactionsKeys, value: InteractionsEnum) => {
    if (molstart && molstart.current) {
      const options = molstart.current?.plugin.managers.structure.component.state.options
      const n_options = initOptions(options, key, value)
      molstart.current.plugin.managers.structure.component.setOptions(n_options)
      setTimeout(() => {
        molstart.current?.plugin.canvas3d?.update()
        setIsRefresh(!isRefresh)
      })
    }
  }

  // 相互作用设置
  const setInteraction = (ionic: boolean) => {
    if (molstart && molstart.current) {
      console.log(molstart.current?.plugin.managers.structure.component)
      const options = molstart.current?.plugin.managers.structure.component.state.options
      console.log(options)
      const n_options = { ...options }

      if (ionic) {
        n_options.interactions.providers.ionic = {
          name: 'on',
          params: {
            distanceMax: 5,
          },
        }
      }

      else {
        n_options.interactions.providers.ionic = {
          name: 'off',
          params: {},
        }
      }
      console.log(n_options)
      molstart.current.plugin.managers.structure.component.setOptions(n_options)
      setTimeout(() => {
        molstart.current?.plugin.canvas3d?.update()
      })
    }
  }

  // 删除不需要的分子结构
  const removed = (ref: StructureHierarchyRef | string[], canUndo?: boolean) => {
    if (molstart && molstart.current) {
      const refsArray = Array.isArray(ref) ? ref : [ref]
      if (molstart && molstart.current) {
        const remove_structre = molstart.current.remove(refsArray, canUndo)
        if (remove_structre)
          return remove_structre
      }

      return undefined
    }
  }

  const test = () => {
    if (molstart && molstart.current) {
      console.log(molstart.current)
      const root = molstart.current.plugin.state.data.build()
      console.log(root)
    }
  }

  const getDeleteData = async () => {
    if (molstart && molstart.current) {
      const plugin = molstart.current.plugin
      const structure = plugin.managers.structure.hierarchy.current.structures[0]
      console.log(plugin.managers.structure.hierarchy)
      // 获取选择器
      const selection = plugin.managers.structure.selection
      console.log(selection)
      // 获取未被删除的原子的索引
      const remaining = selection.getLoci('current')
      console.log(remaining)
      // 基于选择创建新结构
      const filtered = structure.builder().createStructure(remaining)

      // 导出为 mmCIF 格式(或其他需要的格式)
      const writer = plugin.builders.data.createWriter({ format: 'mmcif' })
      const data = await writer.getData(filtered)

      // 下载处理
      const blob = new Blob([data], { type: 'chemical/x-mmcif' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'filtered_structure.cif'
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  useImperativeHandle(ref, () => {
    return {
      loadStructureFromUrl,
      loadStructuresFromUrlsAndMerge,
      loadStructureFromData,
      delete_liagnd,
      setStructureVisibility,
      getCenter,
      clear,
      isLoad,
      setInteraction,
      test,
      getDeleteData,
    }
  }, [])
  return <>
    <div style={{ width: '100%', height: '100%' }} id={id}></div>
    {isMolLoad && <InteractionBox interactionsData={interactionData} onClick={handleInteractionBoxClick}/>}

  </>
})
MolstarComp.displayName = 'MolstarComp'
const MolstarWrapper = ({ wrapperRef, ...props }: { wrapperRef: LegacyRef<MolstarHandle> } & Props) => {
  return <MolstarComp ref={wrapperRef} {...props}/>
}

export default MolstarWrapper
