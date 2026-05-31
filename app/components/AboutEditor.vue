<template>
    <div v-if="editor" class="border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
        <div class="bg-gray-50 dark:bg-gray-800 p-2 flex gap-2 border-b border-gray-300 dark:border-gray-700">
            <button type="button" @click="editor.chain().focus().toggleBold().run()"
                :class="{ 'bg-primary-500 text-white': editor.isActive('bold') }"
                class="px-3 py-1 rounded text-sm font-bold border">B</button>
            <button type="button" @click="editor.chain().focus().toggleItalic().run()"
                :class="{ 'bg-primary-500 text-white': editor.isActive('italic') }"
                class="px-3 py-1 rounded text-sm italic border">I</button>
        </div>
        <editor-content :editor="editor" class="p-4 min-h-[200px] prose dark:prose-invert max-w-none" />
    </div>
</template>

<script setup>
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { watch } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
    content: props.modelValue,
    extensions: [StarterKit],
    onUpdate: ({ editor }) => {
        emit('update:modelValue', editor.getHTML())
    }
})

watch(() => props.modelValue, (value) => {
    if (editor.value && editor.value.getHTML() !== value) {
        editor.value.commands.setContent(value, false)
    }
})
</script>
