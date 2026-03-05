# Tian Chatbot 前端

Vue3 聊天室前端，透過 SSE 與後端即時對話。

## 功能

- 聊天室介面：用戶訊息右側、AI 訊息左側
- chatId 管理：進入頁面自動產生並存入 localStorage
- 新會話：點擊按鈕產生新 chatId 並清空記錄
- SSE 打字機效果：即時串流顯示 AI 回覆
- URL 編碼：使用 URLSearchParams 處理中文與特殊字元

## 開發

```bash
npm install
npm run dev
```

請確保後端已啟動於 `http://localhost:8080`。開發時 Vite 會將 `/api` 代理至後端。

## 建置

```bash
npm run build
```

## 環境變數

| 變數 | 說明 |
|------|------|
| `VITE_API_BASE_URL` | 後端 API 基礎 URL（選填，預設依環境自動設定） |
