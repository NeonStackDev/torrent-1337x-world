<template>
  <client-only>
  <div class="editor-wrapper p-2">
    <!-- Toolbar -->
    <div class="toolbar mb-2 space-x-2" v-if="editor">
      <button aria-label="handle edit" @click="toggleBold" :class="{ 'font-bold': editor?.isActive('bold') }">B</button>
      <button aria-label="handle edit" @click="toggleItalic" :class="{ 'italic': editor?.isActive('italic') }">I</button>
      <button aria-label="handle edit" @click="toggleStrike" :class="{ 'line-through': editor?.isActive('strike') }">S</button>
      <button aria-label="handle edit" @click="setHeading(2)" :class="{ 'font-bold': editor?.isActive('heading', { level: 2 }) }">H2</button>

      <button aria-label="handle edit" @click="addImage">Image</button>
    </div>

    <!-- Editor Content -->
    <EditorContent v-if="editor" :editor="editor" class="prose max-w-full" />
  </div>
  </client-only>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'

const props = defineProps({ modelValue: String })
const emit = defineEmits(['update:modelValue'])

const editor = ref(null)

onMounted(() => {
  editor.value = new Editor({
    content: props.modelValue || '',
    extensions: [StarterKit, Image],
    onUpdate({ editor }) {
      emit('update:modelValue', editor.getHTML())
    },
  })
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})

// Toolbar actions
const toggleBold = () => editor.value?.chain().focus().toggleBold().run()
const toggleItalic = () => editor.value?.chain().focus().toggleItalic().run()
const toggleStrike = () => editor.value?.chain().focus().toggleStrike().run()
const toggleBulletList = () => editor.value?.chain().focus().toggleBulletList().run()
const toggleOrderedList = () => editor.value?.chain().focus().toggleOrderedList().run()
const setParagraph = () => editor.value?.chain().focus().setParagraph().run()
const setHeading = (level) => editor.value?.chain().focus().toggleHeading({ level }).run()

// Add / toggle image
const addImage = () => {
  const url = prompt('Enter image URL')
  if (!url) return
  editor.value
    ?.chain()
    .focus()
    .setImage({ src: url, alt: 'Inserted Image' })
    .run()
}
</script>
<style>
.tiptap{
  padding: 4px;
}
.tiptap h2{
  font-size: 1.5em;
}
.toolbar button{
  padding: 0.5rem 1rem;
  background-color: #333d4c;
  min-width: 2rem;
  /* color: gray; */
  font-size: 1.2em;
  border-radius: 3px;
}
</style>