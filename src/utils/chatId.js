const STORAGE_KEY = 'tian_chatbot_chat_id'

/**
 * 產生 UUID v4
 */
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

/**
 * 取得或建立 chatId
 * @returns {string}
 */
export function getOrCreateChatId() {
  let chatId = localStorage.getItem(STORAGE_KEY)
  if (!chatId) {
    chatId = generateUUID()
    localStorage.setItem(STORAGE_KEY, chatId)
  }
  return chatId
}

/**
 * 建立新 chatId 並覆寫 localStorage
 * @returns {string}
 */
export function createNewChatId() {
  const chatId = generateUUID()
  localStorage.setItem(STORAGE_KEY, chatId)
  return chatId
}
