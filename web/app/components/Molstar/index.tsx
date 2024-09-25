'use client'
import type { LegacyRef } from 'react'
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import { Viewer } from './viewer'
import { getShortId } from '@/utils'
import 'molstar/build/viewer/molstar.css'
import './styles.css'

type Props = {
  id?: string
}

export type MolstarHandle = {
  loadStructureFromUrl: (url: string, formate: BuiltInTrajectoryFormat) => void
}
// let ViewerStart = null;
const MolstarComp = forwardRef<MolstarHandle, Props>(({ id = getShortId() }, ref) => {
  const molstart = useRef<Viewer | null>(null)

  useEffect(() => {
    Viewer.create(id, {
      layoutIsExpanded: false,
      layoutShowControls: false,
      layoutShowRemoteState: false,
      layoutShowSequence: true,
      layoutShowLog: false,
      layoutShowLeftPanel: false,

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
  // 加载模型
  const loadStructureFromUrl = (url: string, formate: BuiltInTrajectoryFormat) => {
    if (molstart && molstart.current)
      molstart.current.loadStructureFromUrl(url, formate)

    // if (ViewerStart) {
    //     ViewerStart.loadStructureFromUrl(url, formate);
    // }
  }
  useImperativeHandle(ref, () => {
    return {
      loadStructureFromUrl,
    }
  }, [])
  return <div style={{ width: '100%', height: '100%' }} id={id}></div>
})
MolstarComp.displayName = 'MolstarComp'
const MolstarWrapper = ({ wrapperRef, ...props }: { wrapperRef: LegacyRef<MolstarHandle> }) => {
  return <MolstarComp ref={wrapperRef} {...props}/>
}

export default MolstarWrapper
