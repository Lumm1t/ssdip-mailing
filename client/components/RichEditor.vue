<template>
  <ClientOnly>
    <tiptap-vuetify
      class="my-6"
      :value="value"
      :extensions="extensions"
      placeholder="Write something..."
      :toolbar-attributes="{
        color: 'grey lighten-4',
      }"
      @input="$emit('input', arguments[0])"
    />

    <template #placeholder>
      <div>Loading...</div>
    </template>
  </ClientOnly>
</template>

<script lang="ts">
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'
import Vue from 'vue'

export default Vue.extend({
  name: 'TextEditor',
  components: { TiptapVuetify },
  props: {
    value: {
      type: String,
      default: '<p></p>',
    },
  },
  data: () => ({
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
  }),
})
</script>
