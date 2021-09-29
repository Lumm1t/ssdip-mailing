/* eslint-disable import/no-named-as-default */
import VuexPersistence from 'vuex-persist'
import { Context } from '@nuxt/types'
import { State } from '~/client/types/store'

export default ({ store }: Context) =>
  new VuexPersistence({
    reducer: (state: State) => ({
      global: {
        darkTheme: state.global.darkTheme,
      },
    }),
  }).plugin(store)
