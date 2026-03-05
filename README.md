# Tian Chatbot Frontend

Vue 3 chat interface for the Tian Chatbot application. Connects to the backend via SSE for real-time streaming AI responses.

## Overview

The frontend provides a chat room UI for the "研究メンターAI" (Research Mentor AI) assistant. It supports streaming responses with typewriter effect, Markdown rendering, and session management via `chatId`.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Vue 3 |
| Build Tool | Vite 5 |
| HTTP/SSE | Axios, native EventSource |
| Markdown | Marked |
| Sanitization | DOMPurify |

## Project Structure

```
tian-chatbot-frontend/
├── src/
│   ├── components/
│   │   ├── ChatRoom.vue        # Main chat UI
│   │   └── MarkdownContent.vue # Markdown renderer with DOMPurify
│   ├── utils/
│   │   └── chatId.js           # chatId generation and localStorage
│   ├── config.js               # API base URL and endpoints
│   ├── App.vue
│   └── main.js
├── public/
├── index.html
├── vite.config.js
└── package.json
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

> **Note:** Ensure the backend is running at `http://localhost:8080`. Vite proxies `/api` to the backend.

### 3. Build for Production

```bash
npm run build
```

Output is in `dist/`. Preview with `npm run preview`.

## Features

- **Chat interface:** User messages on the right, AI messages on the left
- **chatId management:** Auto-generated on first visit, stored in `localStorage`
- **New session:** "新規チャット" button creates a new `chatId` and clears history
- **SSE streaming:** Real-time typewriter effect for AI responses
- **Markdown rendering:** AI replies rendered with Marked, sanitized with DOMPurify
- **URL encoding:** `URLSearchParams` for correct handling of Chinese and special characters

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | Dev: `/api` (proxy); Prod: `http://localhost:8080` |

Create `.env` in the project root to override:

```env
VITE_API_BASE_URL=http://your-backend-url:8080
```

## Development

### Proxy Configuration

In `vite.config.js`, `/api` is proxied to `http://localhost:8080`:

```js
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

### API Endpoint

`config.js` defines the chat endpoint:

- `CHAT_ENDPOINT`: `${API_BASE}/ai/chatbot/lantian`

### Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server (port 5173) |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
