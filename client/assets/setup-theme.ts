import Vue from 'vue'
import { Mutation, State } from 'store'

export default function setupTheme(this: Vue) {
  this.$vuetify.theme.dark = this.$store.state.global.darkTheme

  this.$store.subscribe(({ type }: Mutation, state: State) => {
    if (type === 'global/changeTheme') {
      this.$vuetify.theme.dark = state.global.darkTheme
    }
  })
}
