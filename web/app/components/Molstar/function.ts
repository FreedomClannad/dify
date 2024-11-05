import type { StructureComponentManager } from 'molstar/lib/mol-plugin-state/manager/structure/component'
import { InteractionsEnum, type interactionsKeys } from '@/types/docking'

export const initOptions = (options: StructureComponentManager.Options, key: interactionsKeys, value: InteractionsEnum) => {
  const n_options = { ...options }
  if (key === 'ionic') {
    if (value === InteractionsEnum.on) {
      n_options.interactions.providers[key] = {
        name: 'on',
        params: {
          distanceMax: 5,
        },
      }
    }
    else {
      n_options.interactions.providers[key] = {
        name: 'off',
        params: {},
      }
    }
  }

  if (key === 'pi-stacking') {
    if (value === InteractionsEnum.on) {
      n_options.interactions.providers[key] = {
        name: 'on',
        params: {
          distanceMax: 5.5,
          offsetMax: 2,
          angleDevMax: 30,
        },
      }
    }
    else {
      n_options.interactions.providers[key] = {
        name: 'off',
        params: {},
      }
    }
  }

  if (key === 'cation-pi') {
    if (value === InteractionsEnum.on) {
      n_options.interactions.providers[key] = {
        name: 'on',
        params: {
          distanceMax: 6,
          offsetMax: 2,
        },
      }
    }
    else {
      n_options.interactions.providers[key] = {
        name: 'off',
        params: {},
      }
    }
  }

  if (key === 'halogen-bonds') {
    if (value === InteractionsEnum.on) {
      n_options.interactions.providers[key] = {
        name: 'on',
        params: {
          distanceMax: 4,
          angleMax: 30,
        },
      }
    }
    else {
      n_options.interactions.providers[key] = {
        name: 'off',
        params: {},
      }
    }
  }

  if (key === 'hydrogen-bonds') {
    if (value === InteractionsEnum.on) {
      n_options.interactions.providers[key] = {
        name: 'on',
        params: {
          distanceMax: 3.5,
          backbone: true,
          accAngleDevMax: 45,
          ignoreHydrogens: false,
          donAngleDevMax: 45,
          accOutOfPlaneAngleMax: 90,
          donOutOfPlaneAngleMax: 45,
          water: false,
          sulfurDistanceMax: 4.1,
        },
      }
    }
    else {
      n_options.interactions.providers[key] = {
        name: 'off',
        params: {},
      }
    }
  }

  if (key === 'weak-hydrogen-bonds') {
    if (value === InteractionsEnum.on) {
      n_options.interactions.providers[key] = {
        name: 'on',
        params: {
          distanceMax: 3.5,
          backbone: true,
          accAngleDevMax: 45,
          ignoreHydrogens: false,
          donAngleDevMax: 45,
          accOutOfPlaneAngleMax: 90,
          donOutOfPlaneAngleMax: 45,
        },
      }
    }
    else {
      n_options.interactions.providers[key] = {
        name: 'off',
        params: {},
      }
    }
  }

  if (key === 'hydrophobic') {
    if (value === InteractionsEnum.on) {
      n_options.interactions.providers[key] = {
        name: 'on',
        params: {
          distanceMax: 4,
        },
      }
    }
    else {
      n_options.interactions.providers[key] = {
        name: 'off',
        params: {},
      }
    }
  }

  if (key === 'metal-coordination') {
    if (value === InteractionsEnum.on) {
      n_options.interactions.providers[key] = {
        name: 'on',
        params: {
          distanceMax: 3,
        },
      }
    }
    else {
      n_options.interactions.providers[key] = {
        name: 'off',
        params: {},
      }
    }
  }
  return n_options
}
