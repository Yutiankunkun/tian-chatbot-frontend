<template>
  <div class="app">
    <ChatRoom />
  </div>
</template>

<script setup>
import ChatRoom from './components/ChatRoom.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Noto Sans JP', 'Hiragino Kaku Gothic ProN', 'Yu Gothic', sans-serif;
  background: #e8e8ed;
  color: #1f2937;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  max-width: 768px;
  margin: 1rem auto;
  height: calc(100vh - 2rem);
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
  overflow: hidden;
}
</style>
