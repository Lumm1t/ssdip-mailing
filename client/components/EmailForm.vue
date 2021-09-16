<template>
  <v-form>
    <RecipientSelect />

    <v-text-field v-model="topic" label="Topic" required></v-text-field>

    <RichEditor v-model="body" />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

import { emailData } from '../store'

export default Vue.extend({
  name: 'EmailForm',
  computed: {
    topic: {
      get() {
        return emailData.topic
      },
      set(value: string) {
        emailData.updateTopic(value)
      },
    },
    body: {
      get() {
        return emailData.body
      },
      set(value: string) {
        emailData.updateBody(value)
      },
    },
  },
})
</script>
