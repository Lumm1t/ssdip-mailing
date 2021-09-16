import Vue from 'vue'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'email-data',
  stateFactory: true,
  namespaced: true,
})
export default class EmailData extends VuexModule {
  selectedRecipients = [] as string[]
  emailBody = '' as string

  @Mutation
  updateRecipients(recipients: string[]) {
    Vue.set(this.selectedRecipients, 0, recipients)
  }

  @Mutation
  updateBody(body: string) {
    this.emailBody = body
  }

  get recipients() {
    return this.selectedRecipients
  }

  get body() {
    return this.emailBody
  }

  get length() {
    return this.selectedRecipients.length
  }
}
