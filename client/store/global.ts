import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'global',
  stateFactory: true,
  namespaced: true,
})
export default class Global extends VuexModule {
  isWaitingForAvailableSubjects = false as boolean
  areRecipientsLoaded = false as boolean

  @Mutation
  waitForAvailableSubjects(isWaiting: boolean) {
    this.isWaitingForAvailableSubjects = isWaiting
  }

  @Mutation
  recipientsLoaded(areLoaded: boolean) {
    this.areRecipientsLoaded = areLoaded
  }
}
