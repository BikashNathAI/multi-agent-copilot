export interface Message {
  role: string;
  content: string;
}

const sessions: Record<string, Message[]> = {};

export function getHistory(sessionId: string): Message[] {
  return sessions[sessionId] || [];
}

export function addMessage(sessionId: string, message: Message): void {
  if (!sessions[sessionId]) {
    sessions[sessionId] = [];
  }
  sessions[sessionId].push(message);
}

export function clearHistory(sessionId: string): void {
  sessions[sessionId] = [];
}