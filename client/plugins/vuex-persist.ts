/* eslint-disable import/no-named-as-default */

import { Store } from 'vuex'
import VuexPersistence from 'vuex-persist'

interface Plugin {
  store: Store<any>
}

export default ({ store }: Plugin) => new VuexPersistence().plugin(store)
