import Vue from 'vue'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

interface EmailsResponse {
  email: string
  status: string | Error
}

@Module({
  name: 'email-data',
  stateFactory: true,
  namespaced: true,
})
export default class EmailData extends VuexModule {
  selectedRecipients = [] as string[]
  emailTopic = '' as string
  emailBody = '' as string
  emailsResponse = [] as EmailsResponse[]

  @Mutation
  updateRecipients(recipients: string[]) {
    Vue.set(this.selectedRecipients, 0, recipients)
  }

  @Mutation
  updateTopic(topic: string) {
    this.emailTopic = topic
  }

  @Mutation
  updateBody(body: string) {
    this.emailBody = body
  }

  @Mutation
  setResponse(response: EmailsResponse[]) {
    this.emailsResponse = response
  }

  get recipients() {
    return this.selectedRecipients
  }

  get topic() {
    return this.emailTopic
  }

  get body() {
    return this.emailBody
  }

  get response() {
    return this.emailsResponse
  }

  get validate() {
    const { selectedRecipients, emailTopic, emailBody } = this

    const defaultEmailBody = '<p></p>'

    return (
      selectedRecipients[0]?.length > 0 &&
      emailTopic &&
      emailBody &&
      emailBody !== defaultEmailBody
    )
  }
}
