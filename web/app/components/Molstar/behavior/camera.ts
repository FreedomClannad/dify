/**
 * Copyright (c) 2023 mol* contributors, licensed under MIT, See LICENSE file for more info.
 *
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */

import { Loci } from 'molstar/lib/mol-model/loci'
import { ParamDefinition as PD } from 'molstar/lib/mol-util/param-definition'
import { PluginBehavior } from 'molstar/lib/mol-plugin/behavior'
import { ButtonsType, ModifiersKeys } from 'molstar/lib/mol-util/input/input-observer'
import { Binding } from 'molstar/lib/mol-util/binding'
import { PluginCommands } from 'molstar/lib/mol-plugin/commands'
import { Sphere3D } from 'molstar/lib/mol-math/geometry'
import { StructureElement } from 'molstar/lib/mol-model/structure'
import { MolstarPubSub } from '@/pubsub'

const B = ButtonsType
const M = ModifiersKeys
const Trigger = Binding.Trigger
const Key = Binding.TriggerKey

const DefaultMesoFocusLociBindings = {
  clickCenter: Binding([
    Trigger(B.Flag.Primary, M.create()),
    // eslint-disable-next-line no-template-curly-in-string
  ], 'Camera center', 'Click element using ${triggers}'),
  clickCenterFocus: Binding([
    Trigger(B.Flag.Secondary, M.create()),
    // eslint-disable-next-line no-template-curly-in-string
  ], 'Camera center and focus', 'Click element using ${triggers}'),
  // eslint-disable-next-line no-template-curly-in-string
  keyCenterOnly: Binding([Key('C')], 'Center Only Toggle', 'Press ${triggers}'),
}

export const MesoFocusLociParams = {
  minRadius: PD.Numeric(8, { min: 1, max: 50, step: 1 }),
  extraRadius: PD.Numeric(4, { min: 1, max: 50, step: 1 }, { description: 'Value added to the bounding-sphere radius of the Loci' }),
  durationMs: PD.Numeric(250, { min: 0, max: 1000, step: 1 }, { description: 'Camera transition duration' }),
  centerOnly: PD.Boolean(true, { description: 'Keep current camera distance' }),
  bindings: PD.Value(DefaultMesoFocusLociBindings, { isHidden: true }),
}
type MesoFocusLociProps = PD.Values<typeof MesoFocusLociParams>

export const MesoFocusLoci = PluginBehavior.create<MesoFocusLociProps>({
  name: 'camera-meso-focus-loci',
  category: 'interaction',
  ctor: class extends PluginBehavior.Handler<MesoFocusLociProps> {
    register(): void {
      this.subscribeObservable(this.ctx.behaviors.interaction.click, ({ current, button, modifiers }) => {
        const { canvas3d } = this.ctx
        if (!canvas3d)
          return

        const loci = Loci.normalize(current.loci, this.ctx.managers.interactivity.props.granularity)
        const sphere = Loci.getBoundingSphere(loci) || Sphere3D()

        const { clickCenter, clickCenterFocus } = this.params.bindings
        const { durationMs, extraRadius, minRadius, centerOnly } = this.params
        const radius = Math.max(sphere.radius + extraRadius, minRadius)

        if (Binding.match(clickCenter, button, modifiers)) {
          console.log('点击0')
          // left mouse button
          if (Loci.isEmpty(current.loci)) {
            console.log('点击1')
            PluginCommands.Camera.Reset(this.ctx, {})
            return
          }
          if (StructureElement.Loci.is(current.loci)) {
            if (centerOnly) {
              console.log('点击2')
              console.log(sphere.center)
              const snapshot = canvas3d.camera.getCenter(sphere.center)
              console.log(snapshot)
              console.log(durationMs)
              canvas3d.requestCameraReset({ durationMs, snapshot })
              MolstarPubSub.publish('molstar-focus-clicked', {})
              console.log(this.params)
              console.log(current)
              console.log(button)
              console.log(modifiers)
            }
            else {
              console.log('点击3')
              this.ctx.managers.camera.focusSphere(sphere, this.params)
            }
          }
        }
        else if (Binding.match(clickCenterFocus, button, modifiers)) {
          console.log('点击4')
          // right mouse button
          if (Loci.isEmpty(current.loci)) {
            console.log('点击5')
            PluginCommands.Camera.Reset(this.ctx, {})
            return
          }
          if (centerOnly) {
            console.log('点击6')
            const snapshot = canvas3d.camera.getCenter(sphere.center, radius)
            canvas3d.requestCameraReset({ durationMs, snapshot })
          }
          else {
            console.log('点击7')
            this.ctx.managers.camera.focusSphere(sphere, this.params)
          }
        }
      })

      this.subscribeObservable(this.ctx.behaviors.interaction.key, ({ code, key, modifiers }) => {
        if (!this.ctx.canvas3d)
          return
        const b = { ...DefaultMesoFocusLociBindings, ...this.params.bindings }
        const { centerOnly } = this.params

        if (Binding.matchKey(b.keyCenterOnly, code, modifiers, key))
          this.params.centerOnly = !centerOnly
      })
    }
  },
  params: () => MesoFocusLociParams,
  display: { name: 'Camera Meso Focus Loci on Canvas' },
})
