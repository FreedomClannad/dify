'use client'
import { ANVILMembraneOrientation } from 'molstar/lib/extensions/anvil/behavior'
import { Backgrounds } from 'molstar/lib/extensions/backgrounds'
import { DnatcoNtCs } from 'molstar/lib/extensions/dnatco'
import { G3DFormat, G3dProvider } from 'molstar/lib/extensions/g3d/format'
import { GeometryExport } from 'molstar/lib/extensions/geo-export'
import { MAQualityAssessment, QualityAssessmentPLDDTPreset, QualityAssessmentQmeanPreset } from 'molstar/lib/extensions/model-archive/quality-assessment/behavior'
import { QualityAssessment } from 'molstar/lib/extensions/model-archive/quality-assessment/prop'
import { ModelExport } from 'molstar/lib/extensions/model-export'
import { Mp4Export } from 'molstar/lib/extensions/mp4-export'
import { MolViewSpec } from 'molstar/lib/extensions/mvs/behavior'
import { loadMVSX } from 'molstar/lib/extensions/mvs/components/formats'
import { loadMVS } from 'molstar/lib/extensions/mvs/load'
import { MVSData } from 'molstar/lib/extensions/mvs/mvs-data'
import { PDBeStructureQualityReport } from 'molstar/lib/extensions/pdbe'
import { RCSBValidationReport } from 'molstar/lib/extensions/rcsb'
import { AssemblySymmetry, AssemblySymmetryConfig } from 'molstar/lib/extensions/assembly-symmetry'
import { SbNcbrPartialCharges, SbNcbrPartialChargesPreset, SbNcbrPartialChargesPropertyProvider, SbNcbrTunnels } from 'molstar/lib/extensions/sb-ncbr'
import { Volseg, VolsegVolumeServerConfig } from 'molstar/lib/extensions/volumes-and-segmentations'
import { wwPDBChemicalComponentDictionary } from 'molstar/lib/extensions/wwpdb/ccd/behavior'
import { wwPDBStructConnExtensionFunctions } from 'molstar/lib/extensions/wwpdb/struct-conn'
import { ZenodoImport } from 'molstar/lib/extensions/zenodo'
import type { SaccharideCompIdMapType } from 'molstar/lib/mol-model/structure/structure/carbohydrates/constants'
import { Volume } from 'molstar/lib/mol-model/volume'
import { DownloadStructure, PdbDownloadProvider } from 'molstar/lib/mol-plugin-state/actions/structure'
import { DownloadDensity } from 'molstar/lib/mol-plugin-state/actions/volume'
import type { PresetTrajectoryHierarchy } from 'molstar/lib/mol-plugin-state/builder/structure/hierarchy-preset'
import { PresetStructureRepresentations, StructureRepresentationPresetProvider, presetStaticComponent } from 'molstar/lib/mol-plugin-state/builder/structure/representation-preset'
import type { BuiltInCoordinatesFormat } from 'molstar/lib/mol-plugin-state/formats/coordinates'
import type { DataFormatProvider } from 'molstar/lib/mol-plugin-state/formats/provider'
import type { BuiltInTopologyFormat } from 'molstar/lib/mol-plugin-state/formats/topology'
import type { BuiltInTrajectoryFormat } from 'molstar/lib/mol-plugin-state/formats/trajectory'
import type { BuildInVolumeFormat } from 'molstar/lib/mol-plugin-state/formats/volume'
import { createVolumeRepresentationParams } from 'molstar/lib/mol-plugin-state/helpers/volume-representation-params'
import { PluginStateObject, PluginStateTransform } from 'molstar/lib/mol-plugin-state/objects'
import { StateTransforms } from 'molstar/lib/mol-plugin-state/transforms'
import { TrajectoryFromModelAndCoordinates } from 'molstar/lib/mol-plugin-state/transforms/model'
import type { PluginUIContext } from 'molstar/lib/mol-plugin-ui/context'
import { createPluginUI } from 'molstar/lib/mol-plugin-ui'
import { renderReact18 } from 'molstar/lib/mol-plugin-ui/react18'
import type { PluginUISpec } from 'molstar/lib/mol-plugin-ui/spec'
import { DefaultPluginUISpec } from 'molstar/lib/mol-plugin-ui/spec'
import { PluginCommands } from 'molstar/lib/mol-plugin/commands'
import { PluginConfig } from 'molstar/lib/mol-plugin/config'
import type { PluginLayoutControlsDisplay } from 'molstar/lib/mol-plugin/layout'
import { PluginSpec } from 'molstar/lib/mol-plugin/spec'
import type { PluginState } from 'molstar/lib/mol-plugin/state'
import type { State, StateObjectSelector } from 'molstar/lib/mol-state'
import { StateObject, StateObjectRef } from 'molstar/lib/mol-state'
import { Task } from 'molstar/lib/mol-task'
import { Asset } from 'molstar/lib/mol-util/assets'

import { Color } from 'molstar/lib/mol-util/color'
import 'molstar/lib/mol-util/polyfill'
import { ObjectKeys } from 'molstar/lib/mol-util/type-helpers'
import type { StateTransform } from 'molstar/lib/commonjs/mol-state/transform'
import { setSubtreeVisibility } from 'molstar/lib/mol-plugin/behavior/static/state'
import type { ElementIndex } from 'molstar/lib/mol-model/structure/model/indexing'
import type { StructureHierarchyRef } from 'molstar/lib/mol-plugin-state/manager/structure/hierarchy-state'
import { ParamDefinition as PD } from 'molstar/lib/mol-util/param-definition'
import { Structure } from 'molstar/lib/mol-model/structure'
import { Material } from 'molstar/lib/mol-util/material'
import type { PluginContext } from 'molstar/lib/mol-plugin/context'
import { MesoFocusLoci } from './behavior/camera'

export { PLUGIN_VERSION as version } from 'molstar/lib/mol-plugin/version'
export { consoleStats, setDebugMode, setProductionMode, setTimingMode } from 'molstar/lib/mol-util/debug'

const CustomFormats = [
  ['g3d', G3dProvider] as const,
]

export const ExtensionMap = {
  'volseg': PluginSpec.Behavior(Volseg),
  'backgrounds': PluginSpec.Behavior(Backgrounds),
  'dnatco-ntcs': PluginSpec.Behavior(DnatcoNtCs),
  'pdbe-structure-quality-report': PluginSpec.Behavior(PDBeStructureQualityReport),
  'assembly-symmetry': PluginSpec.Behavior(AssemblySymmetry),
  'rcsb-validation-report': PluginSpec.Behavior(RCSBValidationReport),
  'anvil-membrane-orientation': PluginSpec.Behavior(ANVILMembraneOrientation),
  'g3d': PluginSpec.Behavior(G3DFormat),
  'model-export': PluginSpec.Behavior(ModelExport),
  'mp4-export': PluginSpec.Behavior(Mp4Export),
  'geo-export': PluginSpec.Behavior(GeometryExport),
  'ma-quality-assessment': PluginSpec.Behavior(MAQualityAssessment),
  'zenodo-import': PluginSpec.Behavior(ZenodoImport),
  'sb-ncbr-partial-charges': PluginSpec.Behavior(SbNcbrPartialCharges),
  'wwpdb-chemical-component-dictionary': PluginSpec.Behavior(wwPDBChemicalComponentDictionary),
  'mvs': PluginSpec.Behavior(MolViewSpec),
  'tunnels': PluginSpec.Behavior(SbNcbrTunnels),
}

const DefaultViewerOptions = {
  customFormats: CustomFormats as [string, DataFormatProvider][],
  extensions: ObjectKeys(ExtensionMap),
  disabledExtensions: [] as string[],
  layoutIsExpanded: true,
  layoutShowControls: true,
  layoutShowRemoteState: true,
  layoutControlsDisplay: 'reactive' as PluginLayoutControlsDisplay,
  layoutShowSequence: true,
  layoutShowLog: true,
  layoutShowLeftPanel: true,
  layoutShowRightPanel: true,
  collapseLeftPanel: false,
  collapseRightPanel: false,
  disableAntialiasing: PluginConfig.General.DisableAntialiasing.defaultValue,
  pixelScale: PluginConfig.General.PixelScale.defaultValue,
  pickScale: PluginConfig.General.PickScale.defaultValue,
  transparency: PluginConfig.General.Transparency.defaultValue,
  preferWebgl1: PluginConfig.General.PreferWebGl1.defaultValue,
  allowMajorPerformanceCaveat: PluginConfig.General.AllowMajorPerformanceCaveat.defaultValue,
  powerPreference: PluginConfig.General.PowerPreference.defaultValue,
  illumination: false,

  viewportShowExpand: PluginConfig.Viewport.ShowExpand.defaultValue,
  viewportShowControls: PluginConfig.Viewport.ShowControls.defaultValue,
  viewportShowSettings: PluginConfig.Viewport.ShowSettings.defaultValue,
  viewportShowSelectionMode: PluginConfig.Viewport.ShowSelectionMode.defaultValue,
  viewportShowAnimation: PluginConfig.Viewport.ShowAnimation.defaultValue,
  viewportShowTrajectoryControls: PluginConfig.Viewport.ShowTrajectoryControls.defaultValue,
  pluginStateServer: PluginConfig.State.DefaultServer.defaultValue,
  volumeStreamingServer: PluginConfig.VolumeStreaming.DefaultServer.defaultValue,
  volumeStreamingDisabled: !PluginConfig.VolumeStreaming.Enabled.defaultValue,
  pdbProvider: PluginConfig.Download.DefaultPdbProvider.defaultValue,
  emdbProvider: PluginConfig.Download.DefaultEmdbProvider.defaultValue,
  saccharideCompIdMapType: 'default' as SaccharideCompIdMapType,
  volumesAndSegmentationsDefaultServer: VolsegVolumeServerConfig.DefaultServer.defaultValue,
  rcsbAssemblySymmetryDefaultServerType: AssemblySymmetryConfig.DefaultServerType.defaultValue,
  rcsbAssemblySymmetryDefaultServerUrl: AssemblySymmetryConfig.DefaultServerUrl.defaultValue,
  rcsbAssemblySymmetryApplyColors: AssemblySymmetryConfig.ApplyColors.defaultValue,
}
type ViewerOptions = typeof DefaultViewerOptions

export const ViewerAutoPreset = StructureRepresentationPresetProvider({
  id: 'preset-structure-representation-viewer-auto',
  display: {
    name: 'Automatic (w/ Annotation)',
    group: 'Annotation',
    description: 'Show standard automatic representation but colored by quality assessment (if available in the model).',
  },
  isApplicable(a) {
    return (
      !!a.data.models.some(m => QualityAssessment.isApplicable(m, 'pLDDT'))
            || !!a.data.models.some(m => QualityAssessment.isApplicable(m, 'qmean'))
    )
  },
  params: () => StructureRepresentationPresetProvider.CommonParams,
  async apply(ref, params, plugin) {
    const structureCell = StateObjectRef.resolveAndCheck(plugin.state.data, ref)
    const structure = structureCell?.obj?.data
    if (!structureCell || !structure)
      return {}

    if (structure.models.some(m => QualityAssessment.isApplicable(m, 'pLDDT')))
      return await QualityAssessmentPLDDTPreset.apply(ref, params, plugin)
    else if (structure.models.some(m => QualityAssessment.isApplicable(m, 'qmean')))
      return await QualityAssessmentQmeanPreset.apply(ref, params, plugin)
    else if (structure.models.some(m => SbNcbrPartialChargesPropertyProvider.isApplicable(m)))
      return await SbNcbrPartialChargesPreset.apply(ref, params, plugin)
    else
      return await PresetStructureRepresentations.auto.apply(ref, params, plugin)
  },
})

function shinyStyle(plugin: PluginContext) {
  return PluginCommands.Canvas3D.SetSettings(plugin,
    {
      settings: {
        renderer: {
          ...plugin.canvas3d!.props.renderer,
        },
        postprocessing: {
          ...plugin.canvas3d!.props.postprocessing,
          occlusion: { name: 'off', params: {} },
          shadow: { name: 'off', params: {} },
          outline: { name: 'off', params: {} },
        },
      },
    })
}

const PresetParams = {
  ...StructureRepresentationPresetProvider.CommonParams,
}

const CustomMaterial = Material({ roughness: 0.2, metalness: 0 })

export const StructurePreset = StructureRepresentationPresetProvider({
  id: 'preset-structure',
  display: { name: 'Structure' },
  params: () => PresetParams,
  async apply(ref, params, plugin) {
    const structureCell = StateObjectRef.resolveAndCheck(plugin.state.data, ref)
    if (!structureCell)
      return {}

    const components = {
      ligand: await presetStaticComponent(plugin, structureCell, 'ligand'),
      polymer: await presetStaticComponent(plugin, structureCell, 'polymer'),
    }

    const { update, builder, typeParams } = StructureRepresentationPresetProvider.reprBuilder(plugin, params)
    const representations = {
      ligand: builder.buildRepresentation(update, components.ligand, { type: 'ball-and-stick', typeParams: { ...typeParams, material: CustomMaterial, sizeFactor: 0.35 }, color: 'element-symbol', colorParams: { carbonColor: { name: 'element-symbol', params: {} } } }, { tag: 'ligand' }),
      polymer: builder.buildRepresentation(update, components.polymer, { type: 'cartoon', typeParams: { ...typeParams, material: CustomMaterial }, color: 'chain-id', colorParams: { palette: (plugin.customState as any).colorPalette } }, { tag: 'polymer' }),
    }

    await update.commit({ revertOnError: true })
    await shinyStyle(plugin)
    plugin.managers.interactivity.setProps({ granularity: 'residue' })

    return { components, representations }
  },
})

type MergeStructuresType = typeof MergeStructures
const MergeStructures = PluginStateTransform.BuiltIn({
  name: 'merge-structures',
  display: { name: 'Merge Structures', description: 'Merge Structure' },
  from: PluginStateObject.Root,
  to: PluginStateObject.Molecule.Structure,
  params: {
    structures: PD.ObjectList({
      ref: PD.Text(''),
    }, ({ ref }) => ref, { isHidden: true }),
  },
})({
  apply({ params, dependencies }) {
    return Task.create('Merge Structures', async (ctx) => {
      if (params.structures.length === 0)
        return StateObject.Null

      const first = dependencies![params.structures[0].ref].data as Structure
      const builder = Structure.Builder({ masterModel: first.models[0] })
      for (const { ref } of params.structures) {
        const s = dependencies![ref].data as Structure
        for (const unit of s.units) {
          // TODO invariantId
          builder.addUnit(unit.kind, unit.model, unit.conformation.operator, unit.elements, unit.traits)
        }
      }

      const structure = builder.getStructure()
      return new PluginStateObject.Molecule.Structure(structure, { label: 'Merged Structure' })
    })
  },
})

export class Viewer {
  constructor(public plugin: PluginUIContext) {
  }

  static async create(elementOrId: string | HTMLElement, options: Partial<ViewerOptions> = {}) {
    const definedOptions = {} as any
    // filter for defined properies only so the default values
    // are property applied
    for (const p of Object.keys(options) as (keyof ViewerOptions)[]) {
      if (options[p] !== undefined)
        definedOptions[p] = options[p]
    }

    const o: ViewerOptions = { ...DefaultViewerOptions, ...definedOptions }
    const defaultSpec = DefaultPluginUISpec()

    const disabledExtension = new Set(o.disabledExtensions ?? [])

    const spec: PluginUISpec = {
      actions: defaultSpec.actions,
      behaviors: [
        ...defaultSpec.behaviors,
        PluginSpec.Behavior(MesoFocusLoci),
        ...o.extensions.filter(e => !disabledExtension.has(e)).map(e => ExtensionMap[e]),
      ],
      animations: [...defaultSpec.animations || []],
      customParamEditors: defaultSpec.customParamEditors,
      customFormats: o?.customFormats,
      layout: {
        initial: {
          isExpanded: o.layoutIsExpanded,
          showControls: o.layoutShowControls,
          controlsDisplay: o.layoutControlsDisplay,
          regionState: {
            bottom: 'full',
            left: o.collapseLeftPanel ? 'collapsed' : 'full',
            right: o.collapseRightPanel ? 'hidden' : 'full',
            top: 'full',
          },
        },
      },
      components: {
        ...defaultSpec.components,
        controls: {
          ...defaultSpec.components?.controls,
          top: o.layoutShowSequence ? undefined : 'none',
          bottom: o.layoutShowLog ? undefined : 'none',
          left: o.layoutShowLeftPanel ? undefined : 'none',
          right: o.layoutShowRightPanel ? undefined : 'none',
        },
        remoteState: o.layoutShowRemoteState ? 'default' : 'none',
      },
      config: [
        [PluginConfig.General.DisableAntialiasing, o.disableAntialiasing],
        [PluginConfig.General.PixelScale, o.pixelScale],
        [PluginConfig.General.PickScale, o.pickScale],
        [PluginConfig.General.Transparency, o.transparency],
        [PluginConfig.General.PreferWebGl1, o.preferWebgl1],
        [PluginConfig.General.AllowMajorPerformanceCaveat, o.allowMajorPerformanceCaveat],
        [PluginConfig.General.PowerPreference, o.powerPreference],
        [PluginConfig.Viewport.ShowExpand, o.viewportShowExpand],
        [PluginConfig.Viewport.ShowControls, o.viewportShowControls],
        [PluginConfig.Viewport.ShowSettings, o.viewportShowSettings],
        [PluginConfig.Viewport.ShowSelectionMode, o.viewportShowSelectionMode],
        [PluginConfig.Viewport.ShowAnimation, o.viewportShowAnimation],
        [PluginConfig.Viewport.ShowTrajectoryControls, o.viewportShowTrajectoryControls],
        [PluginConfig.State.DefaultServer, o.pluginStateServer],
        [PluginConfig.State.CurrentServer, o.pluginStateServer],
        [PluginConfig.VolumeStreaming.DefaultServer, o.volumeStreamingServer],
        [PluginConfig.VolumeStreaming.Enabled, !o.volumeStreamingDisabled],
        [PluginConfig.Download.DefaultPdbProvider, o.pdbProvider],
        [PluginConfig.Download.DefaultEmdbProvider, o.emdbProvider],
        [PluginConfig.Structure.DefaultRepresentationPreset, ViewerAutoPreset.id],
        [PluginConfig.Structure.SaccharideCompIdMapType, o.saccharideCompIdMapType],
        [VolsegVolumeServerConfig.DefaultServer, o.volumesAndSegmentationsDefaultServer],
        [AssemblySymmetryConfig.DefaultServerType, o.rcsbAssemblySymmetryDefaultServerType],
        [AssemblySymmetryConfig.DefaultServerUrl, o.rcsbAssemblySymmetryDefaultServerUrl],
        [AssemblySymmetryConfig.ApplyColors, o.rcsbAssemblySymmetryApplyColors],
      ],
    }

    const element = typeof elementOrId === 'string'
      ? document.getElementById(elementOrId)
      : elementOrId
    if (!element)
      throw new Error(`Could not get element with id '${elementOrId}'`)
    const plugin = await createPluginUI({
      target: element,
      spec,
      render: renderReact18,
      onBeforeUIRender: (plugin) => {
        // the preset needs to be added before the UI renders otherwise
        // "Download Structure" wont be able to pick it up
        plugin.builders.structure.representation.registerPreset(ViewerAutoPreset)
      },
    })
    plugin.canvas3d?.setProps({ illumination: { enabled: o.illumination } })
    return new Viewer(plugin)
  }

  setRemoteSnapshot(id: string) {
    const url = `${this.plugin.config.get(PluginConfig.State.CurrentServer)}/get/${id}`
    return PluginCommands.State.Snapshots.Fetch(this.plugin, { url })
  }

  loadSnapshotFromUrl(url: string, type: PluginState.SnapshotType) {
    return PluginCommands.State.Snapshots.OpenUrl(this.plugin, { url, type })
  }

  loadStructureFromUrl(url: string, format: BuiltInTrajectoryFormat = 'mmcif', isBinary = false, options?: LoadStructureOptions & { label?: string }) {
    const params = DownloadStructure.createDefaultParams(this.plugin.state.data.root.obj!, this.plugin)
    console.log('a', url)
    return this.plugin.runTask(this.plugin.state.data.applyAction(DownloadStructure, {
      source: {
        name: 'url',
        params: {
          url: Asset.Url(url),
          format: format as any,
          isBinary,
          label: options?.label,
          options: { ...params.source.params.options, representationParams: options?.representationParams as any, type: 'model' },
        },
      },
    }))
  }

  async loadAllModelsOrAssemblyFromUrl(url: string, format: BuiltInTrajectoryFormat = 'mmcif', isBinary = false, options?: LoadStructureOptions) {
    const plugin = this.plugin

    const data = await plugin.builders.data.download({ url, isBinary }, { state: { isGhost: true } })
    const trajectory = await plugin.builders.structure.parseTrajectory(data, format)

    await this.plugin.builders.structure.hierarchy.applyPreset(trajectory, 'all-models', { useDefaultIfSingleModel: false, representationPresetParams: options?.representationParams })
  }

  async loadStructureFromData(data: string | number[], format: BuiltInTrajectoryFormat, options?: { dataLabel?: string }) {
    const _data = await this.plugin.builders.data.rawData({ data, label: options?.dataLabel })
    const trajectory = await this.plugin.builders.structure.parseTrajectory(_data, format)
    await this.plugin.builders.structure.hierarchy.applyPreset(trajectory, 'default')
  }

  loadPdb(pdb: string, options?: LoadStructureOptions) {
    const params = DownloadStructure.createDefaultParams(this.plugin.state.data.root.obj!, this.plugin)
    const provider = this.plugin.config.get(PluginConfig.Download.DefaultPdbProvider)!
    return this.plugin.runTask(this.plugin.state.data.applyAction(DownloadStructure, {
      source: {
        name: 'pdb' as const,
        params: {
          provider: {
            id: pdb,
            server: {
              name: provider,
              params: PdbDownloadProvider[provider].defaultValue as any,
            },
          },
          options: { ...params.source.params.options, representationParams: options?.representationParams as any },
        },
      },
    }))
  }

  loadPdbDev(pdbDev: string) {
    const params = DownloadStructure.createDefaultParams(this.plugin.state.data.root.obj!, this.plugin)
    return this.plugin.runTask(this.plugin.state.data.applyAction(DownloadStructure, {
      source: {
        name: 'pdb-dev' as const,
        params: {
          provider: {
            id: pdbDev,
            encoding: 'bcif',
          },
          options: params.source.params.options,
        },
      },
    }))
  }

  loadEmdb(emdb: string, options?: { detail?: number }) {
    const provider = this.plugin.config.get(PluginConfig.Download.DefaultEmdbProvider)!
    return this.plugin.runTask(this.plugin.state.data.applyAction(DownloadDensity, {
      source: {
        name: 'pdb-emd-ds' as const,
        params: {
          provider: {
            id: emdb,
            server: provider,
          },
          detail: options?.detail ?? 3,
        },
      },
    }))
  }

  loadAlphaFoldDb(afdb: string) {
    const params = DownloadStructure.createDefaultParams(this.plugin.state.data.root.obj!, this.plugin)
    return this.plugin.runTask(this.plugin.state.data.applyAction(DownloadStructure, {
      source: {
        name: 'alphafolddb' as const,
        params: {
          provider: {
            id: afdb,
            encoding: 'bcif',
          },
          options: {
            ...params.source.params.options,
            representation: 'preset-structure-representation-ma-quality-assessment-plddt',
          },
        },
      },
    }))
  }

  loadModelArchive(id: string) {
    const params = DownloadStructure.createDefaultParams(this.plugin.state.data.root.obj!, this.plugin)
    return this.plugin.runTask(this.plugin.state.data.applyAction(DownloadStructure, {
      source: {
        name: 'modelarchive' as const,
        params: {
          id,
          options: params.source.params.options,
        },
      },
    }))
  }

  /**
     * @example Load X-ray density from volume server
        viewer.loadVolumeFromUrl({
            url: 'https://www.ebi.ac.uk/pdbe/densities/x-ray/1tqn/cell?detail=3',
            format: 'dscif',
            isBinary: true
        }, [{
            type: 'relative',
            value: 1.5,
            color: 0x3362B2
        }, {
            type: 'relative',
            value: 3,
            color: 0x33BB33,
            volumeIndex: 1
        }, {
            type: 'relative',
            value: -3,
            color: 0xBB3333,
            volumeIndex: 1
        }], {
            entryId: ['2FO-FC', 'FO-FC'],
            isLazy: true
        });
     * *********************
     * @example Load EM density from volume server
        viewer.loadVolumeFromUrl({
            url: 'https://maps.rcsb.org/em/emd-30210/cell?detail=6',
            format: 'dscif',
            isBinary: true
        }, [{
            type: 'relative',
            value: 1,
            color: 0x3377aa
        }], {
            entryId: 'EMD-30210',
            isLazy: true
        });
     */
  async loadVolumeFromUrl({ url, format, isBinary }: { url: string; format: BuildInVolumeFormat; isBinary: boolean }, isovalues: VolumeIsovalueInfo[], options?: { entryId?: string | string[]; isLazy?: boolean }) {
    const plugin = this.plugin

    if (!plugin.dataFormats.get(format))
      throw new Error(`Unknown density format: ${format}`)

    if (options?.isLazy) {
      const update = this.plugin.build()
      update.toRoot().apply(StateTransforms.Data.LazyVolume, {
        url,
        format,
        entryId: options?.entryId,
        isBinary,
        isovalues: isovalues.map(v => ({ alpha: 1, volumeIndex: 0, ...v })),
      })
      return update.commit()
    }

    return plugin.dataTransaction(async () => {
      const data = await plugin.builders.data.download({ url, isBinary }, { state: { isGhost: true } })

      const parsed = await plugin.dataFormats.get(format)!.parse(plugin, data, { entryId: options?.entryId })
      const firstVolume = (parsed.volume || parsed.volumes[0]) as StateObjectSelector<PluginStateObject.Volume.Data>
      if (!firstVolume?.isOk)
        throw new Error('Failed to parse any volume.')

      const repr = plugin.build()
      for (const iso of isovalues) {
        const volume: StateObjectSelector<PluginStateObject.Volume.Data> = parsed.volumes?.[iso.volumeIndex ?? 0] ?? parsed.volume
        const volumeData = volume.cell!.obj!.data
        repr
          .to(volume)
          .apply(StateTransforms.Representation.VolumeRepresentation3D, createVolumeRepresentationParams(this.plugin, firstVolume.data!, {
            type: 'isosurface',
            typeParams: { alpha: iso.alpha ?? 1, isoValue: Volume.adjustedIsoValue(volumeData, iso.value, iso.type) },
            color: 'uniform',
            colorParams: { value: iso.color },
          }))
      }

      await repr.commit()
    })
  }

  loadFullResolutionEMDBMap(emdbId: string, options: { isoValue: Volume.IsoValue; color?: Color }) {
    const plugin = this.plugin
    const numericId = parseInt(emdbId.toUpperCase().replace('EMD-', ''))
    const url = `https://ftp.ebi.ac.uk/pub/databases/emdb/structures/EMD-${numericId}/map/emd_${numericId}.map.gz`

    return plugin.dataTransaction(async () => {
      const data = await plugin.build().toRoot()
        .apply(StateTransforms.Data.Download, { url, isBinary: true, label: emdbId }, { state: { isGhost: true } })
        .apply(StateTransforms.Data.DeflateData)
        .commit()

      const parsed = await plugin.dataFormats.get('ccp4')!.parse(plugin, data, { entryId: emdbId })
      const firstVolume = (parsed.volume || parsed.volumes[0]) as StateObjectSelector<PluginStateObject.Volume.Data>
      if (!firstVolume?.isOk)
        throw new Error('Failed to parse any volume.')

      const volume: StateObjectSelector<PluginStateObject.Volume.Data> = parsed.volumes?.[0] ?? parsed.volume
      await plugin.build()
        .to(volume)
        .apply(StateTransforms.Representation.VolumeRepresentation3D, createVolumeRepresentationParams(this.plugin, firstVolume.data!, {
          type: 'isosurface',
          typeParams: { alpha: 1, isoValue: options.isoValue },
          color: 'uniform',
          colorParams: { value: options.color ?? Color(0x33BB33) },
        }))
        .commit()
    })
  }

  /**
     * @example
     *  viewer.loadTrajectory({
     *      model: { kind: 'model-url', url: 'villin.gro', format: 'gro' },
     *      coordinates: { kind: 'coordinates-url', url: 'villin.xtc', format: 'xtc', isBinary: true },
     *      preset: 'all-models' // or 'default'
     *  });
     */
  async loadTrajectory(params: LoadTrajectoryParams) {
    const plugin = this.plugin

    let model: StateObjectSelector

    if (params.model.kind === 'model-data' || params.model.kind === 'model-url') {
      const data = params.model.kind === 'model-data'
        ? await plugin.builders.data.rawData({ data: params.model.data, label: params.modelLabel })
        : await plugin.builders.data.download({ url: params.model.url, isBinary: params.model.isBinary, label: params.modelLabel })

      const trajectory = await plugin.builders.structure.parseTrajectory(data, params.model.format ?? 'mmcif')
      model = await plugin.builders.structure.createModel(trajectory)
    }
    else {
      const data = params.model.kind === 'topology-data'
        ? await plugin.builders.data.rawData({ data: params.model.data, label: params.modelLabel })
        : await plugin.builders.data.download({ url: params.model.url, isBinary: params.model.isBinary, label: params.modelLabel })

      const provider = plugin.dataFormats.get(params.model.format)
      model = await provider!.parse(plugin, data)
    }

    const data = params.coordinates.kind === 'coordinates-data'
      ? await plugin.builders.data.rawData({ data: params.coordinates.data, label: params.coordinatesLabel })
      : await plugin.builders.data.download({ url: params.coordinates.url, isBinary: params.coordinates.isBinary, label: params.coordinatesLabel })

    const provider = plugin.dataFormats.get(params.coordinates.format)
    const coords = await provider!.parse(plugin, data)

    const trajectory = await plugin.build().toRoot()
      .apply(TrajectoryFromModelAndCoordinates, {
        modelRef: model.ref,
        coordinatesRef: coords.ref,
      }, { dependsOn: [model.ref, coords.ref] })
      .commit()

    const preset = await plugin.builders.structure.hierarchy.applyPreset(trajectory, params.preset ?? 'default')

    return { model, coords, preset }
  }

  async loadMvsFromUrl(url: string, format: 'mvsj' | 'mvsx', options?: { replaceExisting?: boolean; keepCamera?: boolean }) {
    if (format === 'mvsj') {
      const data = await this.plugin.runTask(this.plugin.fetch({ url, type: 'string' }))
      const mvsData = MVSData.fromMVSJ(data)
      await loadMVS(this.plugin, mvsData, { sanityChecks: true, sourceUrl: url, ...options })
    }
    else if (format === 'mvsx') {
      const data = await this.plugin.runTask(this.plugin.fetch({ url, type: 'binary' }))
      await this.plugin.runTask(Task.create('Load MVSX file', async (ctx) => {
        const parsed = await loadMVSX(this.plugin, ctx, data)
        await loadMVS(this.plugin, parsed.mvsData, { sanityChecks: true, sourceUrl: parsed.sourceUrl, ...options })
      }))
    }
    else {
      throw new Error(`Unknown MolViewSpec format: ${format}`)
    }
  }

  /** Load MolViewSpec from `data`.
     * If `format` is 'mvsj', `data` must be a string or a Uint8Array containing a UTF8-encoded string.
     * If `format` is 'mvsx', `data` must be a Uint8Array or a string containing base64-encoded binary data prefixed with 'base64,'. */
  async loadMvsData(data: string | Uint8Array, format: 'mvsj' | 'mvsx', options?: { replaceExisting?: boolean; keepCamera?: boolean }) {
    if (typeof data === 'string' && data.startsWith('base64'))
      data = Uint8Array.from(atob(data.substring(7)), c => c.charCodeAt(0)) // Decode base64 string to Uint8Array

    if (format === 'mvsj') {
      if (typeof data !== 'string')
        data = new TextDecoder().decode(data) // Decode Uint8Array to string using UTF8

      const mvsData = MVSData.fromMVSJ(data)
      await loadMVS(this.plugin, mvsData, { sanityChecks: true, sourceUrl: undefined, ...options })
    }
    else if (format === 'mvsx') {
      if (typeof data === 'string')
        throw new Error('loadMvsData: if `format` is \'mvsx\', then `data` must be a Uint8Array or a base64-encoded string prefixed with \'base64,\'.')

      await this.plugin.runTask(Task.create('Load MVSX file', async (ctx) => {
        const parsed = await loadMVSX(this.plugin, ctx, data as Uint8Array)
        await loadMVS(this.plugin, parsed.mvsData, { sanityChecks: true, sourceUrl: parsed.sourceUrl, ...options })
      }))
    }
    else {
      throw new Error(`Unknown MolViewSpec format: ${format}`)
    }
  }

  // 获取聚集分子点坐标
  getFocusedResidueCenter() {
    const plugin = this.plugin

    // 获取Ligand的Label
    const lignadLabel = plugin.managers.structure.focus.current?.label
    let num = ''
    let chain = ''

    if (lignadLabel) {
      // 匹配情况 I28 1801 | A
      const regex1 = /(\d+)\s\|\s(\S+)/
      const math1 = lignadLabel.match(regex1)
      if (math1) {
        num = math1[1] // 提取出 "1801"
        chain = math1[2].split('_')[0] // 提取出 "A"
      }
      // 匹配情况 I28 1801 | A_1 [auth A]
      const regex2 = /(\d+)\s\|\s.*?\[(.*?)\s(\w+)\]/
      const math2 = lignadLabel.match(regex2)
      if (math2) {
        num = math2[1] // 提取出 "1801"
        chain = math2[3].split('_')[0] // 提取出 "A" 或者最后的字母
      }
    }
    console.log(`num: ${num} ---- chain: ${chain}`)
    // Get the structural element
    const structure = plugin.managers.structure.hierarchy.current.structures[0]
    for (let index = 0; index < structure.components.length; index++) {
      if (structure.components[index].key === 'structure-focus-target-sel') {
        const structure_element = structure.components[index].cell.obj?.data.units[0]
        if (!structure_element)
          return null

        const structure_elements = structure_element.elements
        const x = structure_element.conformation.coordinates.x
        const y = structure_element.conformation.coordinates.y
        const z = structure_element.conformation.coordinates.z

        const count = structure_elements.length

        const elementArray = Array.from(structure_elements)
        const sumCoordinates = elementArray.reduce((sum, element: number) => {
          sum.x += (x[element] as number) || 0
          sum.y += (y[element] as number) || 0
          sum.z += (z[element] as number) || 0
          return sum
        }, { x: 0, y: 0, z: 0 })
        // return [sumCoordinates.x / count, sumCoordinates.y / count, sumCoordinates.z / count]
        return { x: sumCoordinates.x / count, y: sumCoordinates.y / count, z: sumCoordinates.z / count, num, chain, indexArray: elementArray }
      }
    }
    return null
  }

  handleResize() {
    this.plugin.layout.events.updated.next(undefined)
  }

  setStructureVisibility(state: State, root: StateTransform.Ref, value: boolean) {
    setSubtreeVisibility(state, root, value)
  }

  getFocusedPolymer(indexArray: ElementIndex[]) {
    const plugin = this.plugin

    // Get the structural element
    const structure = plugin.managers.structure.hierarchy.current.structures[0]
    if (!structure) {
      console.error('structure is undefined.')
      return null
    }

    const components = structure.components
    if (!components) {
      console.error('components is undefined.')
      return null
    }

    const structure_element = components[0].cell.obj?.data.units[0]
    if (!structure_element) {
      console.error('structure_element is undefined.')
      return null
    }
    const offsets = structure_element.model.atomicHierarchy.residueAtomSegments.offsets
    console.log(offsets)
    const atomCount = offsets[offsets.length - 1]
    const index: number[] = new Array(atomCount).fill(0).map((_, i) => Math.floor(i / 10)) // 根据实际原子数量填充索引
    const residues = structure_element.model.atomicHierarchy.residues
    const atomLabels = structure_element.model.atomicHierarchy.atoms.auth_comp_id.toArray()
    // const residueLabels = residues.group_PDB.__array as number[]

    const residueLabels = residues.group_PDB.toArray()
    if (indexArray) {
      const startIndex = indexArray[0]
      if (residueLabels && residueLabels.length === offsets.length - 1) {
        for (let i = 0; i < offsets.length - 1; i++) {
          const start = offsets[i] // 当前残基的起始位置
          const end = offsets[i + 1] // 下一个残基的起始位置
          // 提取当前残基的原子索引范围
          const residueLabel = residueLabels[i]
          // const residueAtoms = index.slice(start, end) // 提取index数组中[start, end)范围的元素
          console.log(`${residueLabel} --- ${start} -> ${end}`)
          // console.log(`Residue ${residueLabel} atoms: ${residueAtoms.join(', ')}`)
          if (start === startIndex && indexArray.length === 1) {
            if (residueLabel === 'HETATM')
              return atomLabels[start]
          }
          else if (start === startIndex) {
            if (residueLabel === 'ATOM')
              return 'residue'
            else
              return 'ligand'
          }
        }
      }
      else {
        console.error('residueLabels is undefined or its length does not match offsets length.')
      }
    }
    return ''
  }

  remove(refs: (StructureHierarchyRef | string)[], canUndo?: boolean) {
    if (refs.length === 0)
      return
    const deletes = this.plugin.state.data.build()
    for (const r of refs) deletes.delete(typeof r === 'string' ? r : r.cell.transform.ref)
    return deletes.commit({ canUndo: canUndo ? 'Remove' : false })
  }

  dispose() {
    this.plugin.dispose()
  }

  // 合并结构体
  async loadStructuresFromUrlsAndMerge() {
    // console.log('aaaa', this.plugin.state.data.selectQ(q => q.ofTransformer(StateTransforms.Model.ModelFromTrajectory)))
    // console.log('ffff', this.plugin.state.data.selectQ(q => q.rootsOfType(PluginStateObject.Molecule.Structure)))
    // console.log('gggg', this.plugin.state.data.selectQ(q => q.rootsOfType(PluginStateObject.Molecule.Model)))
    // console.log('hhhh', this.plugin.state.data.selectQ(q => q.rootsOfType(PluginStateObject.Molecule.Topology)))
    // console.log('iiii', this.plugin.state.data.selectQ(q => q.ofType(PluginStateObject.Molecule.Structure)))
    // 获取根节点
    const rootStructCells = this.plugin.state.data.selectQ(q => q.rootsOfType(PluginStateObject.Molecule.Structure))
    // 如果多次合并，每次合并清空前一次合并结果
    const mergedData = Array.from(this.plugin.state.data.cells).find(([key, value]) => {
      return value.obj?.label === 'Merged Structure'
    })?.[1]

    // 2. 如果找到了合并数据，进行删除
    if (mergedData) {
      // 3. 创建构建器实例
      const builder = this.plugin.state.data.build()

      // 使用构建器删除合并的数据
      builder.delete(mergedData.transform.ref)

      // 4. 更新状态树，清空合并数据
      await this.plugin.state.data.updateTree(builder).run()
    }

    //   if (
    //   rootStructCells[rootStructCells.length - 1].sourceRef === '-=root=-'
    //   && rootStructCells[rootStructCells.length - 1].obj?.label === 'Merged Structure'
    // ) return null
    let structures: { ref: string }[] = []
    const structCells = this.plugin.state.data.selectQ(q => q.ofType(PluginStateObject.Molecule.Structure))
    // const astructures = rootStructCells.map(cell => cell.obj?.data).filter(struct => !!struct) as Structure[]
    console.log('hihi', structCells)
    structures = Array.from(structCells)
      .filter(cell => cell.cache && Object.keys(cell.cache).length > 0)
      .map((cell) => {
        return { ref: cell.sourceRef }
      })
      .filter((value, index, self) =>
        index === self.findIndex(t => t.ref === value.ref),
      ) as { ref: string }[]
    console.log('structures', structures)

    const hierarchyManager = this.plugin.managers.structure.hierarchy

    structures.forEach((struct) => {
      // 查找当前 refs 中与 structures 的 ref 匹配的引用
      const ref = Array.from(hierarchyManager.current.refs).find(
        ([key, value]) => key === struct.ref,
      )?.[1]

      if (ref)
        hierarchyManager.toggleVisibility([ref], 'hide')
      else
        console.warn(`Reference not found for ref: ${struct.ref}`)
    })
    console.log('data', this.plugin.state.data)

    // remove current structures from hierarchy as they will be merged
    // TODO only works with using loadStructuresFromUrlsAndMerge once
    //      need some more API metho to work with the hierarchy
    this.plugin.managers.structure.hierarchy.updateCurrent(this.plugin.managers.structure.hierarchy.current.structures, 'remove')

    const dependsOn = structures.map(({ ref }) => ref)

    const data = this.plugin.state.data.build().toRoot().apply(MergeStructures, { structures }, { dependsOn })
    const structure = await data.commit()
    const structureProperties = await this.plugin.builders.structure.insertStructureProperties(structure)
    this.plugin.behaviors.canvas3d.initialized.subscribe(async (v) => {
      await this.plugin.builders.structure.representation.applyPreset(structureProperties || structure, StructurePreset)
    })
  }

  // 控制合并后的ligand和polymer的显隐
  async mergestructureligandshoworhide(name: string, isshow: boolean) {
    // 将 cells 转换为数组
    const cellsArray = Array.from(this.plugin.state.data.cells.entries())
    console.log('cell', cellsArray)

    // 找到最后一个 `Merged Structure` 的索引
    const lastMergedIndex = cellsArray
      .map(([ref, cell]) => cell.obj?.label)
      .lastIndexOf('Merged Structure')

    // 如果找不到 `Merged Structure`，直接返回
    if (lastMergedIndex === -1) {
      console.log('No Merged Structure found.')
      return
    }

    // 找到最近的 `Ligand` 和 `Polymer` 的 ref
    if (name === 'ligand') {
      const nearestLigand = cellsArray.slice(lastMergedIndex + 1).find(([ref, cell]) => cell.obj?.label === 'Ligand')?.[0]
      console.log('Nearest Ligand Ref:', nearestLigand)
      const ref = Array.from(this.plugin.managers.structure.hierarchy.current.refs).find(
        ([key, value]) => key === nearestLigand,
      )?.[1]
      if (isshow === true)
        this.plugin.managers.structure.hierarchy.toggleVisibility([ref], 'show')

      else
        this.plugin.managers.structure.hierarchy.toggleVisibility([ref], 'hide')
    }

    if (name === 'polymer') {
      const nearestPolymer = cellsArray.slice(lastMergedIndex + 1).find(([ref, cell]) => cell.obj?.label === 'Polymer')?.[0]
      // 输出结果
      console.log('Nearest Polymer Ref:', nearestPolymer)
      const ref = Array.from(this.plugin.managers.structure.hierarchy.current.refs).find(
        ([key, value]) => key === nearestPolymer,
      )?.[1]
      if (isshow === true)
        this.plugin.managers.structure.hierarchy.toggleVisibility([ref], 'show')

      else
        this.plugin.managers.structure.hierarchy.toggleVisibility([ref], 'hide')
    }
  }

  async Draw3DBox(isshow: boolean) {
    if (isshow === false)
      return
    const focusTarget = this.plugin.managers.structure.hierarchy.current.structures[0].components.find(s => s.cell.obj?.label === '[Focus] Target')
    const structure = focusTarget?.cell.obj
    if (!structure) {
      console.error('No structure found.')
      return
    }
    // const hexToDecimalWithPrefix = (hex: string): number => {
    //   return parseInt(hex.startsWith('0x') ? hex : `0x${hex}`, 16)
    // }
    // // console.log('aaaaa', hexToDecimalWithPrefix(col))
    // const color = Color(hexToDecimalWithPrefix(col))
    // console.log('color', PD.Color(color, { isEssential: true }))

    console.log('focusTarget', focusTarget)
    const parentRef = focusTarget?.cell.transform.ref

    const boundingBoxes = this.plugin.state.data.selectQ(q => q.ofTransformer(StateTransforms.Representation.StructureBoundingBox3D))
    // console.log('boundingBoxes', boundingBoxes)
    const builder = this.plugin.state.data.build()
    for (const box of boundingBoxes)
      builder.delete(box.transform.ref)

    // 更新状态树以清空 Bounding Box
    await this.plugin.state.data.updateTree(builder).run()

    const data = this.plugin.state.data.build().to(parentRef).apply(StateTransforms.Representation.StructureBoundingBox3D, { structure })
    await this.plugin.state.data.updateTree(data).run()
  }

  async updataBox(x?: number, y?: number, z?: number, col?: number) {
    const focusTarget = this.plugin.managers.structure.hierarchy.current.structures[0].components.find(s => s.cell.obj?.label === '[Focus] Target')
    const structure = focusTarget?.cell.obj
    const boundbox = this.plugin.state.data.selectQ(q => q.ofTransformer(StateTransforms.Representation.StructureBoundingBox3D))
    const boxdata = boundbox[0].obj
    const oldparams = boundbox[0].params?.values
    // console.log('hh', boundbox)
    const parentRef = focusTarget?.cell.transform.ref
    if (!structure) {
      console.error('No structure found.')
      return
    }
    const center = structure.data.boundary.sphere.center

    if (col) {
      const params = oldparams
      params.color = Color(col)
      console.log('params', params)
      if (x && y && z) {
        console.log('fffffff', structure)
        structure.data.boundary.box = {
          min: [center[0] - (x / 2), center[1] - (y / 2), center[2] - (z / 2)],
          max: [center[0] + (x / 2), center[1] + (y / 2), center[2] + (z / 2)],
        }
        const data = this.plugin.state.data.build().to(parentRef).update(StateTransforms.Representation.StructureBoundingBox3D, { structure, boxdata, oldparams, params })
        await this.plugin.state.data.updateTree(data).run()
      }
      console.log('aaaaaaaaaaa', structure)
      console.log('bbbbbbbbbbb', boxdata)
      const data = this.plugin.state.data.build().to(parentRef).apply(StateTransforms.Representation.StructureBoundingBox3D, { structure, params })
      await this.plugin.state.data.updateTree(data).run()
    }

    if (x && y && z) {
      console.log('fffffff', structure)
      structure.data.boundary.box = {
        min: [center[0] - (x / 2), center[1] - (y / 2), center[2] - (z / 2)],
        max: [center[0] + (x / 2), center[1] + (y / 2), center[2] + (z / 2)],
      }
      const data = this.plugin.state.data.build().to(parentRef).update(StateTransforms.Representation.StructureBoundingBox3D, { structure, boxdata, oldparams, oldparams })
      await this.plugin.state.data.updateTree(data).run()
    }
  }

  async removeligend() {
    const state = this.plugin.state.data

    // 查询所有带有 "Ligand" 标签的组件
    const ligands = state.selectQ(q => q.ofType(PluginStateObject.Molecule.Structure).filter(cell => cell.obj?.label?.toLowerCase().includes('ligand')))
    console.log('ligands', ligands)
    const builder = this.plugin.state.data.build()
    for (const ligand of ligands)
      builder.delete(ligand.transform.ref)

    // 更新状态树以清空 Bounding Box
    await this.plugin.state.data.updateTree(builder).run()
  }
}

export type LoadStructureOptions = {
  representationParams?: StructureRepresentationPresetProvider.CommonParams
}

export type VolumeIsovalueInfo = {
  type: 'absolute' | 'relative'
  value: number
  color: Color
  alpha?: number
  volumeIndex?: number
}

export type LoadTrajectoryParams = {
  model: { kind: 'model-url'; url: string; format?: BuiltInTrajectoryFormat /* mmcif */; isBinary?: boolean }
    | { kind: 'model-data'; data: string | number[] | ArrayBuffer | Uint8Array; format?: BuiltInTrajectoryFormat /* mmcif */ }
    | { kind: 'topology-url'; url: string; format: BuiltInTopologyFormat; isBinary?: boolean }
    | { kind: 'topology-data'; data: string | number[] | ArrayBuffer | Uint8Array; format: BuiltInTopologyFormat }
  modelLabel?: string
  coordinates: { kind: 'coordinates-url'; url: string; format: BuiltInCoordinatesFormat; isBinary?: boolean }
    | { kind: 'coordinates-data'; data: string | number[] | ArrayBuffer | Uint8Array; format: BuiltInCoordinatesFormat }
  coordinatesLabel?: string
  preset?: keyof PresetTrajectoryHierarchy
}
export const PluginExtensions = {
  wwPDBStructConn: wwPDBStructConnExtensionFunctions,
  mvs: { MVSData, loadMVS },
}

export default Viewer
