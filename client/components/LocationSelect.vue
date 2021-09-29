<template>
  <v-select
    v-model="selectedLocation"
    :disabled="options.length === 0"
    :loading="isLoading"
    :item-disabled="() => isWaitingForLocations"
    item-text="text"
    item-value="value"
    :label="name"
    :items="options"
    required
    @input="emitSelectedLocation"
  ></v-select>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

import { global } from '../store'

export default Vue.extend({
  name: 'LocationSelect',
  props: {
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<string[]>,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    isLoading: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    selectedLocation: undefined,
  }),
  computed: {
    isWaitingForLocations(): boolean {
      return global.isWaitingForAvailableLocations
    },
  },
  watch: {
    options(val) {
      if (val.length === 0) this.selectedLocation = 0
    },
  },
  methods: {
    emitSelectedLocation() {
      this.$emit('selected-location', this.index, this.selectedLocation)
    },
  },
})
</script>
