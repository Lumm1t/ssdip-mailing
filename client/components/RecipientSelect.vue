<template>
  <v-select
    v-model="selectedSubjects"
    :items="availableSubjects"
    :disabled="availableSubjects.length === 0"
    item-text="name"
    item-value="email"
    label="Recipients"
    multiple
  >
    <template #selection="{ index }">
      <span v-if="index === 0" class="grey--text text-caption">
        {{ selectedSubjects.length }} selected subjects
      </span>
    </template>

    <template #prepend-item>
      <v-list-item ripple @click="toggle">
        <v-list-item-action>
          <v-icon :color="selectedSubjects.length > 0 ? 'indigo darken-4' : ''">
            {{ icon }}
          </v-icon>
        </v-list-item-action>

        <v-list-item-content>
          <v-list-item-title>Select all</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-2"></v-divider>
    </template>
  </v-select>
</template>

<script lang="ts">
import Vue from 'vue'

import { global, selectedLocations, emailData } from '../store'

export default Vue.extend({
  name: 'RecipientSelect',
  data: () => ({
    availableSubjects: [],
    selectedSubjects: [],
  }),
  computed: {
    selectedAll() {
      return this.selectedSubjects.length === this.availableSubjects.length
    },
    selectedSome() {
      return this.selectedSubjects.length > 0 && !(this as any).selectedAll
    },
    icon() {
      if (this.selectedAll) return 'mdi-close-box'
      if (this.selectedSome) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    locations() {
      return selectedLocations.locations
    },
  },
  watch: {
    selectedSubjects(subjects) {
      emailData.updateRecipients(subjects)
    },
    locations: {
      handler(selectedLocations) {
        if (selectedLocations.length === 4) {
          this.getAvailableSubjects()
        }
      },
      deep: true,
    },
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        this.selectedSubjects = this.selectedAll
          ? []
          : [...this.availableSubjects].map(subject => subject.email)
      })
    },
    getAvailableSubjects() {
      this.resetRecipients()
      global.resetError()

      global.waitForAvailableSubjects(true)
      global.recipientsLoaded(false)

      this.$axios
        .post('/scraper/subjects', {
          selectedLocations: selectedLocations.locations,
        })
        .then(({ data }) => {
          const { success, response, error } = data

          if (success) {
            this.availableSubjects = response

            global.recipientsLoaded(true)
          } else global.setError(error)

          global.waitForAvailableSubjects(false)
        })
    },
    resetRecipients() {
      this.selectedSubjects = []
      this.availableSubjects = []
      emailData.updateRecipients([])
    },
  },
})
</script>
