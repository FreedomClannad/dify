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
  onFocusCenter?: (center: number[] | null | undefined) => void
}

export type MolstarHandle = {
  loadStructureFromUrl: (url: string, formate: BuiltInTrajectoryFormat) => void
  loadStructureFromData: (data: string | number[], format: BuiltInTrajectoryFormat) => void
  getCenter: () => Promise<number[] | null | undefined>
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
    }, {
      focusClicked: async () => {
        setTimeout(async () => {
          const center = await getCenter()
          onFocusCenter?.(center)
        }, 500)
      },
    },
    ).then((res) => {
      console.log(res)
      molstart.current = res
      // ViewerStart = res;
    })
  }, [id])
  // 加载模型
  const loadStructureFromUrl = (url: string, formate: BuiltInTrajectoryFormat) => {
    if (molstart && molstart.current)
      molstart.current.loadStructureFromUrl(url, formate)

    // if (ViewerStart) {
    //     ViewerStart.loadStructureFromUrl(url, formate);
    // }
  }

  const loadStructureFromData = (data: string | number[], format: BuiltInTrajectoryFormat) => {
    if (molstart && molstart.current) {
      console.log('2233')
      molstart.current.loadStructureFromData(data, format)
    }
  }

  useImperativeHandle(ref, () => {
    return {
      loadStructureFromUrl,
      loadStructureFromData,
      getCenter,
    }
  }, [])
  return <div style={{ width: '100%', height: '100%' }} id={id}></div>
})
MolstarComp.displayName = 'MolstarComp'
const MolstarWrapper = ({ wrapperRef, ...props }: { wrapperRef: LegacyRef<MolstarHandle> } & Props) => {
  return <MolstarComp ref={wrapperRef} {...props}/>
}

export default MolstarWrapper
