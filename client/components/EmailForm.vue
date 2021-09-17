<template>
  <v-form>
    <RecipientSelect />

    <v-text-field v-model="topic" label="Topic" required></v-text-field>

    <RichEditor v-model="body" />
  </v-form>
</template>

<script lang="ts">
import Vue from 'vue'

import { emailData, selectedLocations } from '../store'

export default Vue.extend({
  name: 'EmailForm',
  data: () => ({
    emailsSent: [],
  }),
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
  mounted() {
    this.$root.$on('send-emails', this.sendEmails)
  },
  methods: {
    sendEmails() {
      this.$axios
        .post('/mailer/send', {
          recipients: emailData.recipients[0],
          subject: emailData.topic,
          body: emailData.body,
        })
        .then(data => {
          if (data.data.success) {
            this.emailsSent = data.data.response
          } else alert(data.data.error)
        })
    },
  },
})
</script>
