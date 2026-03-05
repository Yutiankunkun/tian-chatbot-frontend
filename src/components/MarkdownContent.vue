<template>
  <div class="markdown-content" v-html="renderedHtml"></div>
</template>

<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import DOMPurify from 'dompurify'

const props = defineProps({
  content: { type: String, default: '' }
})

marked.setOptions({
  breaks: true,
  gfm: true
})

const renderedHtml = computed(() => {
  if (!props.content) return ''
  let text = props.content
  // 將「標籤: -項目」轉為換行列表
  text = text.replace(/([：:])[\s]*-/g, '$1\n- ')
  // 統一並列列表標記：• 與 ・ 轉為 -，確保研究対象/研究範囲等並列項一致
  text = text.replace(/(^|\n)\s*[•・]\s*/g, '$1\n- ')
  // 「-單詞」補上空格，使 Markdown 正確識別為列表
  text = text.replace(/(^|\n)\s*-(?=[^\s\-\n])/g, '$1\n- ')
  const raw = marked.parse(text)
  return DOMPurify.sanitize(String(raw))
})
</script>

<style scoped>
.markdown-content {
  line-height: 1.75;
  letter-spacing: 0.01em;
}

.markdown-content :deep(p) {
  margin: 0 0 0.75em;
}

.markdown-content :deep(p:last-child) {
  margin-bottom: 0;
}

.markdown-content :deep(strong) {
  font-weight: 600;
}

.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  margin: 0.5em 0;
  padding-left: 1.5em;
}

.markdown-content :deep(li) {
  margin: 0.25em 0;
}

.markdown-content :deep(ul) {
  list-style-type: disc;
}

.markdown-content :deep(ol) {
  list-style-type: decimal;
}

.markdown-content :deep(code) {
  background: rgba(0, 0, 0, 0.06);
  padding: 0.15em 0.4em;
  border-radius: 0.25em;
  font-size: 0.9em;
}

.markdown-content :deep(pre) {
  background: rgba(0, 0, 0, 0.05);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 0.75em 0;
}

.markdown-content :deep(pre code) {
  background: none;
  padding: 0;
}

.markdown-content :deep(blockquote) {
  border-left: 4px solid rgba(0, 0, 0, 0.2);
  margin: 0.75em 0;
  padding-left: 1em;
  color: rgba(0, 0, 0, 0.7);
}

.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3) {
  margin: 1em 0 0.5em;
  font-weight: 600;
}

.markdown-content :deep(h1) { font-size: 1.25em; }
.markdown-content :deep(h2) { font-size: 1.1em; }
.markdown-content :deep(h3) { font-size: 1em; }
</style>
