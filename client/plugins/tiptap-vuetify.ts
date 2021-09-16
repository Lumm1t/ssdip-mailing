import { NuxtAppOptions } from '@nuxt/types/app'
import { TiptapVuetifyPlugin } from 'tiptap-vuetify'
import Vue from 'vue'
import 'tiptap-vuetify/dist/main.css'

export default ({ app }: NuxtAppOptions) => {
  Vue.use(TiptapVuetifyPlugin, {
    vuetify: app.vuetify,
    iconsGroup: 'mdi',
  })
}
