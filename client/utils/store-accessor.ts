import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import SelectedLocations from '../store/selected-locations'

// eslint-disable-next-line import/no-mutable-exports
let selectedLocations: SelectedLocations

function initialiseStores(store: Store<any>): void {
  selectedLocations = getModule(SelectedLocations, store)
}

export { initialiseStores, selectedLocations }
