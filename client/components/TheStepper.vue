<template>
  <v-stepper v-model="currentStep">
    <v-stepper-header>
      <template v-for="(header, index) in headers">
        <v-stepper-step
          :key="index + 1"
          :complete="currentStep > index + 1"
          :step="index + 1"
        >
          {{ header }}
        </v-stepper-step>

        <v-divider
          v-if="index + 1 !== headers.length"
          :key="index + 'divider'"
        ></v-divider>
      </template>
    </v-stepper-header>

    <v-stepper-items>
      <v-stepper-content
        v-for="(component, index) in content"
        :key="index"
        :step="index + 1"
      >
        <component :is="component" />

        <v-btn v-if="!isStepFirst && !isStepLast" @click="goToPreviousStep">
          Back
        </v-btn>

        <v-btn
          v-if="!isStepLast"
          color="primary"
          :disabled="!isLocationSelected || !areRecipientsLoaded"
          :loading="isLoading"
          @click="goToNextStep"
        >
          Next
        </v-btn>

        <v-alert
          v-if="error"
          fluid
          border="left"
          dense
          outlined
          type="error"
          style="margin-top: 15px; width: fit-content"
        >
          {{ error }}
        </v-alert>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import Vue from 'vue'

import { global, selectedLocations } from '../store'

export default Vue.extend({
  name: 'TheStepper',
  data: () => ({
    currentStep: 1,
    headers: ['Select locations', 'Write email data', 'Get emails info'],
    content: ['LocationForm', 'EmailForm', 'EmailInfo'],
  }),
  computed: {
    isStepFirst(): boolean {
      return this.currentStep === 1
    },
    isStepLast(): boolean {
      return this.currentStep === this.headers.length
    },
    isLocationSelected(): boolean {
      return selectedLocations.length === 4
    },
    isLoading(): boolean {
      return global.isWaitingForAvailableSubjects
    },
    areRecipientsLoaded(): boolean {
      return global.areRecipientsLoaded
    },
    error(): string {
      return global.error
    },
  },
  methods: {
    goToNextStep(): void {
      const stepActionsMap = [this.selectLocations, this.writeEmailData]

      const action = stepActionsMap[this.currentStep - 1]
      if (action() && !this.isStepLast) {
        this.currentStep++
      }
    },
    goToPreviousStep(): void {
      if (!this.isStepFirst) this.currentStep--
    },
    selectLocations(): boolean {
      return true
    },
    writeEmailData(): boolean {
      this.$root.$emit('send-emails')

      return true
    },
  },
})
</script>
