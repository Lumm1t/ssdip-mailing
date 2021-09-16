import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import SelectedLocations from '../store/selected-locations'
import SelectedRecipients from '../store/selected-recipients'

// eslint-disable-next-line import/no-mutable-exports
let selectedLocations: SelectedLocations
// eslint-disable-next-line import/no-mutable-exports
let selectedRecipients: SelectedRecipients

function initialiseStores(store: Store<any>): void {
  selectedLocations = getModule(SelectedLocations, store)
  selectedRecipients = getModule(SelectedRecipients, store)
}

export { initialiseStores, selectedLocations, selectedRecipients }
