<template>
  <div class="chat-room">
    <header class="chat-header">
      <h1 class="app-title">研究メンターAI 🤖</h1>
      <button class="btn btn-new-header" @click="handleNewChat">新規チャット</button>
    </header>

    <div class="chat-messages" ref="messagesRef">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="['message', msg.role]"
      >
        <div class="bubble">
          <span v-if="msg.role === 'user'" class="content">{{ msg.content }}</span>
          <MarkdownContent v-else :content="msg.content" />
        </div>
      </div>
    </div>

    <div class="chat-input-area">
      <div class="input-row">
        <input
          v-model="inputText"
          type="text"
          placeholder="メッセージを入力..."
          :disabled="isStreaming"
          @keydown.enter.prevent="handleSend"
        />
        <button
          class="btn btn-send"
          :disabled="!inputText.trim() || isStreaming"
          @click="handleSend"
        >
          送信
        </button>
        <button
          class="btn btn-stop"
          :disabled="!isStreaming"
          @click="handleStop"
        >
          停止
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { getOrCreateChatId, createNewChatId } from '../utils/chatId'
import { CHAT_ENDPOINT } from '../config'
import MarkdownContent from './MarkdownContent.vue'

const messages = ref([])
const inputText = ref('')
const chatId = ref('')
const isStreaming = ref(false)
const messagesRef = ref(null)
let eventSource = null

onMounted(() => {
  chatId.value = getOrCreateChatId()
})

function scrollToBottom() {
  nextTick(() => {
    if (messagesRef.value) {
      messagesRef.value.scrollTop = messagesRef.value.scrollHeight
    }
  })
}

function handleSend() {
  const text = inputText.value.trim()
  if (!text || isStreaming.value) return

  messages.value.push({ role: 'user', content: text })
  inputText.value = ''
  scrollToBottom()

  const aiIndex = messages.value.length
  messages.value.push({ role: 'assistant', content: '' })
  scrollToBottom()

  isStreaming.value = true
  connectSSE(text, aiIndex)
}

function connectSSE(message, aiIndex) {
  const params = new URLSearchParams({
    message,
    chatId: chatId.value
  })
  const url = `${CHAT_ENDPOINT}?${params.toString()}`

  eventSource = new EventSource(url)

  eventSource.onmessage = (event) => {
    const chunk = event.data
    if (chunk) {
      messages.value[aiIndex].content += chunk
      scrollToBottom()
    }
  }

  eventSource.onerror = () => {
    closeSSE()
    isStreaming.value = false
  }

  eventSource.addEventListener('done', () => {
    closeSSE()
    isStreaming.value = false
  })
}

function closeSSE() {
  if (eventSource) {
    eventSource.close()
    eventSource = null
  }
}

function handleStop() {
  if (eventSource) {
    closeSSE()
    isStreaming.value = false
  }
}

function handleNewChat() {
  if (isStreaming.value) {
    handleStop()
  }
  chatId.value = createNewChatId()
  messages.value = []
}
</script>

<style scoped>
.chat-room {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}

.chat-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  flex-shrink: 0;
}

.app-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1f2937;
  letter-spacing: 0.02em;
}

.btn-new-header {
  padding: 0.5rem 1rem;
  background: #fff;
  border: 1px solid #d1d5db;
  color: #374151;
  border-radius: 0.625rem;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.02em;
}

.btn-new-header:hover {
  background: #f3f4f6;
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.message {
  display: flex;
  max-width: 85%;
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.bubble {
  padding: 0.875rem 1.25rem;
  border-radius: 1.25rem;
  line-height: 1.75;
  word-break: break-word;
  letter-spacing: 0.01em;
}

.message.user .bubble {
  background: #dbeafe;
  color: #000000;
  border-bottom-right-radius: 0.375rem;
}

.message.assistant .bubble {
  background: #f3f4f6;
  color: #374151;
  border-bottom-left-radius: 0.375rem;
}

.chat-input-area {
  padding: 1.25rem 1.5rem;
  background: #f9fafb;
  border-top: 1px solid #e5e7eb;
}

.input-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.input-row input {
  flex: 1;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  background: #fff;
  color: #000000;
  font-size: 1rem;
}

.input-row input:focus {
  outline: none;
  border-color: #93c5fd;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.15);
}

.input-row input::placeholder {
  color: #9ca3af;
}

.input-row input:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 0.75rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  letter-spacing: 0.02em;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-send {
  background: #3b82f6;
  color: #fff;
}

.btn-send:hover:not(:disabled) {
  background: #2563eb;
}

.btn-stop {
  background: #ef4444;
  color: #fff;
}

.btn-stop:hover:not(:disabled) {
  background: #dc2626;
}
</style>
