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

        <v-btn v-if="!isStepFirst" @click="previousStep">Back</v-btn>

        <v-btn v-if="!isStepLast" color="primary" @click="nextStep">
          Next
        </v-btn>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script lang="ts">
import Vue from 'vue'

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
  },
  methods: {
    nextStep() {
      if (!this.isStepLast) this.currentStep++
    },
    previousStep() {
      if (!this.isStepFirst) this.currentStep--
    },
  },
})
</script>
