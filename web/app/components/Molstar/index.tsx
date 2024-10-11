'use client'
import type { LegacyRef } from 'react'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import { Viewer } from './viewer'
import { getShortId } from '@/utils'
import 'molstar/build/viewer/molstar.css'
import './styles.css'
import { MolstarPubSub } from '@/pubsub'

type Props = {
  id?: string
  onFocusCenter?: (center: { x: number; y: number; z: number; num: string; chain: string }) => void
}

export type MolstarHandle = {
  loadStructureFromUrl: (url: string, formate: BuiltInTrajectoryFormat) => void
  loadStructureFromData: (data: string | number[], format: BuiltInTrajectoryFormat) => void
  setStructureVisibility: (index: number, visible: boolean) => void
  getCenter: () => Promise<{ x: number; y: number; z: number; num: string; chain: string } | null | undefined>
  clear: () => void
}
// let ViewerStart = null;
const MolstarComp = forwardRef<MolstarHandle, Props>(({ id = getShortId(), onFocusCenter }, ref) => {
  const molstart = useRef<Viewer | null>(null)

  const getCenter = async () => {
    if (molstart && molstart.current)
      return molstart.current.getFocusedResidueCenter()
  }

  useEffect(() => {
    Viewer.create(id, {
      layoutIsExpanded: false,
      layoutShowControls: true,
      layoutShowRemoteState: false,
      layoutShowSequence: true,
      layoutShowLog: false,
      layoutShowLeftPanel: false,
      layoutShowRightPanel: false,

      viewportShowExpand: false,
      viewportShowSelectionMode: false,
      viewportShowAnimation: false,
      viewportShowControls: false,
      viewportShowSettings: false,
      viewportShowTrajectoryControls: false,
      volumeStreamingServer: 'https://maps.rcsb.org',
    },
    ).then((res) => {
      console.log(res)
      molstart.current = res
      // ViewerStart = res;
    })
  }, [])
  const focusClicked = async () => {
    setTimeout(async () => {
      const center = await getCenter()
      onFocusCenter?.(center as { x: number; y: number; z: number; num: string; chain: string })
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

    // if (ViewerStart) {
    //     ViewerStart.loadStructureFromUrl(url, formate);
    // }
  }
  // 根据传入的data来进行渲染数据
  const loadStructureFromData = (data: string | number[], format: BuiltInTrajectoryFormat) => {
    if (molstart && molstart.current) {
      console.log(molstart)
      molstart.current.loadStructureFromData(data, format)
    }
  }
  // 控制分子/蛋白质显隐
  const setStructureVisibility = (index: number, visible: boolean) => {
    if (molstart && molstart.current) {
      console.log(molstart.current?.plugin.managers.structure.hierarchy.current.structures)
      console.log(index)
      console.log(visible)
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
  useImperativeHandle(ref, () => {
    return {
      loadStructureFromUrl,
      loadStructureFromData,
      setStructureVisibility,
      getCenter,
      clear,
    }
  }, [])
  return <div style={{ width: '100%', height: '100%' }} id={id}></div>
})
MolstarComp.displayName = 'MolstarComp'
const MolstarWrapper = ({ wrapperRef, ...props }: { wrapperRef: LegacyRef<MolstarHandle> } & Props) => {
  return <MolstarComp ref={wrapperRef} {...props}/>
}

export default MolstarWrapper
