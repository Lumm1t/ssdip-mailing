/* eslint-disable import/no-mutable-exports */

import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import EmailData from '../store/email-data'
import Global from '../store/global'
import SelectedLocations from '../store/selected-locations'

let global: Global
let selectedLocations: SelectedLocations
let emailData: EmailData

function initialiseStores(store: Store<any>): void {
  global = getModule(Global, store)
  selectedLocations = getModule(SelectedLocations, store)
  emailData = getModule(EmailData, store)
}

export { initialiseStores, global, selectedLocations, emailData }
