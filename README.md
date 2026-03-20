# Tian Chatbot — Frontend

Vue 3 single-page app for the “研究メンターAI” (Research Mentor AI) chat. It uses the browser `EventSource` API for SSE streaming, Markdown rendering (Marked + DOMPurify), and `localStorage` for `chatId` session continuity.

## Stack

| Item | Technology |
|------|------------|
| UI | Vue 3 |
| Build | Vite 5 |
| Streaming | Native `EventSource` |
| Markdown | Marked, DOMPurify |

## Layout

```
tian-chatbot-frontend/
├── src/
│   ├── components/
│   │   ├── ChatRoom.vue
│   │   └── MarkdownContent.vue
│   ├── utils/chatId.js
│   ├── config.js          # API base URL + chat path
│   ├── App.vue
│   └── main.js
├── nginx/default.conf     # Used by Docker image only
├── public/
├── vite.config.js
└── package.json
```

## Quick start

**Prerequisites:** Node.js 18+, npm. Backend should be on port 8080 for local dev.

```bash
npm install
npm run dev
```

Dev server: `http://localhost:5173` — `/api` is proxied to `http://localhost:8080` (see `vite.config.js`).

### Production build

```bash
npm run build
```

Output: `dist/`. Preview: `npm run preview`.

## Environment variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `VITE_API_BASE_URL` | API prefix or full backend URL | `/api` |

- **Local + Docker (this repo):** default `/api` is correct — Vite or Nginx forwards it to the backend.
- **Split hosting (e.g. static on CDN, API elsewhere):** set at build time, e.g. `VITE_API_BASE_URL=https://api.example.com` (you will need CORS on the backend).

Create `.env` in this folder if you need overrides (see `.env.example`).

## Features

- Chat bubbles (user right, assistant left)
- New session button → new `chatId`, cleared messages
- SSE “typewriter” streaming for assistant text
- Sanitized Markdown for assistant replies
- `URLSearchParams` for safe query encoding

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Dev server (5173) |
| `npm run build` | Production bundle |
| `npm run preview` | Serve `dist` locally |

## Docker

The frontend image builds static assets with `VITE_API_BASE_URL=/api` and serves them with Nginx, proxying `/api/` to the backend service. See root `docker-compose.yml` and `Dockerfile` in this module.
