<template>
  <v-data-table
    :headers="headers"
    :items="emailsResponse"
    :items-per-page="5"
    class="elevation-1 mb-6"
  ></v-data-table>
</template>

<script lang="ts">
import Vue from 'vue'

import { emailData } from '../store'

export default Vue.extend({
  name: 'EmailInfo',
  data: () => ({
    headers: [
      {
        text: 'E-mail',
        align: 'start',
        value: 'email',
      },
      { text: 'Status', value: 'status' },
    ],
  }),
  computed: {
    emailsResponse() {
      return emailData.response
    },
  },
})
</script>
