import Vue from 'vue'
import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

interface Locations {
  index: number
  selectedLocation: string
}

@Module({
  name: 'selected-locations',
  stateFactory: true,
  namespaced: true,
})
export default class SelectedLocations extends VuexModule {
  selectedLocations = [] as string[]

  @Mutation
  update({ index, selectedLocation }: Locations) {
    Vue.set(this.selectedLocations, index, selectedLocation)
  }

  @Mutation
  resetDependent(length: number) {
    this.selectedLocations.length = length
  }

  get locations() {
    return this.selectedLocations
  }

  get length() {
    return this.selectedLocations.length
  }
}
