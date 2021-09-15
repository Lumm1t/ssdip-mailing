<template>
  <v-select
    v-model="selectedLocation"
    :disabled="options.length === 0"
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
  },
  data: () => ({
    selectedLocation: undefined,
  }),
  methods: {
    emitSelectedLocation() {
      this.$emit('selected-location', this.index, this.selectedLocation)
    },
  },
})
</script>
