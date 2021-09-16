import Vue from 'vue'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'selected-recipients',
  stateFactory: true,
  namespaced: true,
})
export default class SelectedRecipients extends VuexModule {
  selectedRecipients = [] as string[]

  @Mutation
  update(recipients: string[]) {
    Vue.set(this.selectedRecipients, 0, recipients)
  }

  get recipients() {
    return this.selectedRecipients
  }

  get length() {
    return this.selectedRecipients.length
  }
}
