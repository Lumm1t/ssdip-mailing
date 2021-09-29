<template>
  <v-form>
    <LocationSelect
      v-for="(location, i) in availableLocations"
      :key="location.name"
      :name="location.name"
      :options="location.options"
      :index="i"
      :is-loading="location.isLoading"
      @selected-location="updateSelect"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

import { global, selectedLocations } from '../store'

export default Vue.extend({
  data: () => ({
    availableLocations: [
      {
        name: 'State',
        options: [],
        isLoading: false,
      },
      {
        name: 'Substate',
        options: [],
        isLoading: false,
      },
      {
        name: 'Community',
        options: [],
        isLoading: false,
      },
      {
        name: 'Entity',
        options: [],
        isLoading: false,
      },
    ],
  }),
  async mounted() {
    await this.updateSelect(-1, 'init')
  },
  methods: {
    updateSelect(...args: [number, string]) {
      const [index, selectedLocation] = args

      if (selectedLocation !== 'init') {
        this.resetSelects(index)

        selectedLocations.update({ index, selectedLocation })
      }

      if (selectedLocations.length < this.availableLocations.length) {
        this.getAvailableLocations(index)
      }
    },
    getAvailableLocations(index: number) {
      const nextSelect = this.availableLocations[index + 1]

      global.resetError()

      global.waitForAvailableLocations(true)

      nextSelect.isLoading = true

      this.$axios
        .post('/scraper/locations', {
          selectedLocations: selectedLocations.locations,
        })
        .then(({ data }) => {
          const { success, response, error } = data

          if (success) {
            nextSelect.options = response
          } else global.setError(error)

          global.waitForAvailableLocations(false)

          nextSelect.isLoading = false
        })
    },
    resetSelects(properPosition: number) {
      selectedLocations.resetDependent(properPosition + 1)

      for (const [index, location] of this.availableLocations.entries()) {
        if (index > properPosition) {
          location.options = []
        }
      }
    },
  },
})
</script>
