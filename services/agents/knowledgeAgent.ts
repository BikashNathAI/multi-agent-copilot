import { chatWithOpenAI } from "../../packages/llm/openai.js";
import { logger } from "../../packages/utils/logger.ts";
import type { Message } from "../../packages/memory/conversationMemory.js";

export async function knowledgeAgent(message: string, history: Message[] = []) {
  logger.info("Knowledge Agent received", message);
  const messages = [
    { role: "system", content: "You are a helpful knowledge assistant." },
    ...history,
    { role: "user", content: message }
  ];
  const response = await chatWithOpenAI(messages);
  return { agent: "knowledge", response };
}