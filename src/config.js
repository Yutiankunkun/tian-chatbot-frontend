/**
 * API 基礎 URL
 * 開發環境使用 Vite proxy (/api -> localhost:8080)
 * 生產環境可透過 .env 設定 VITE_API_BASE_URL
 */
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.DEV ? '/api' : 'http://localhost:8080')

export const CHAT_ENDPOINT = `${API_BASE}/ai/chatbot/lantian`
