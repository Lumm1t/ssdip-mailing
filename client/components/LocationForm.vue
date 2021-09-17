<template>
  <v-form>
    <LocationSelect
      v-for="(location, i) in availableLocations"
      :key="location.name"
      :name="location.name"
      :options="location.options"
      :index="i"
      @selected-location="updateSelect"
    />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

import { selectedLocations } from '../store'

export default Vue.extend({
  data: () => ({
    availableLocations: [
      {
        name: 'state',
        options: [],
      },
      {
        name: 'substate',
        options: [],
      },
      {
        name: 'community',
        options: [],
      },
      {
        name: 'entity',
        options: [],
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
      this.$axios
        .post('/scraper/locations', {
          selectedLocations: selectedLocations.locations,
        })
        .then(data => {
          if (data.data.success) {
            this.availableLocations[index + 1].options = data.data.response
          } else alert(data.data.error)
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
