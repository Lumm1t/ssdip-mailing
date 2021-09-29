import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

@Module({
  name: 'global',
  stateFactory: true,
  namespaced: true,
})
export default class Global extends VuexModule {
  darkTheme = false as boolean
  isWaitingForAvailableLocations = false as boolean
  isWaitingForAvailableSubjects = false as boolean
  areRecipientsLoaded = false as boolean
  error = '' as string

  @Mutation
  changeTheme() {
    this.darkTheme = !this.darkTheme
  }

  @Mutation
  waitForAvailableLocations(isWaiting: boolean) {
    this.isWaitingForAvailableLocations = isWaiting
  }

  @Mutation
  waitForAvailableSubjects(isWaiting: boolean) {
    this.isWaitingForAvailableSubjects = isWaiting
  }

  @Mutation
  recipientsLoaded(areLoaded: boolean) {
    this.areRecipientsLoaded = areLoaded
  }

  @Mutation
  setError(err: string) {
    this.error = err
  }

  @Mutation
  resetError() {
    this.error = ''
  }
}
