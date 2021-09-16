import Vue from 'vue'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'selected-recipients',
  stateFactory: true,
  namespaced: true,
})
export default class SelectedRecipients extends VuexModule {
  selectedRecipients = [] as string[]
  isWaitingForAvailableSubjects = false as boolean
  areRecipientsLoaded = false as boolean

  @Mutation
  update(recipients: string[]) {
    Vue.set(this.selectedRecipients, 0, recipients)
  }

  @Mutation
  waitForAvailableSubjects(isWaiting: boolean) {
    this.isWaitingForAvailableSubjects = isWaiting
  }

  @Mutation
  recipientsLoaded(areLoaded: boolean) {
    this.areRecipientsLoaded = areLoaded
  }

  get recipients() {
    return this.selectedRecipients
  }

  get length() {
    return this.selectedRecipients.length
  }
}
