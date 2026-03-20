/**
 * API 基礎 URL
 * 開發：Vite proxy 將 /api 轉到 localhost:8080
 * 生產（Docker / EC2 + Nginx）：預設仍為 /api，由反向代理轉到後端
 * 前後端分開網域時，請在建置時設定 VITE_API_BASE_URL（例如 https://api.example.com）
 */
export const API_BASE =
  import.meta.env.VITE_API_BASE_URL || '/api'

export const CHAT_ENDPOINT = `${API_BASE}/ai/chatbot/lantian`
