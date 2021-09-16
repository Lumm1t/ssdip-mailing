<template>
  <v-form>
    <RecipientSelect />

    <RichEditor v-model="body" />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

import { emailData } from '../store'

export default Vue.extend({
  name: 'EmailForm',
  computed: {
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
