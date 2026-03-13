import { chatWithOpenAI } from "../../packages/llm/openai.ts";
import { retrieveContext } from "../../packages/rag/retriever.ts";
import { addDocuments } from "../../packages/rag/vectorStore.ts";
import { loadTextFromString } from "../../packages/rag/documentLoader.ts";
import { logger } from "../../packages/utils/logger.ts";
import type { Message } from "../../packages/memory/conversationMemory.ts";

export async function ragAgent(
  message: string,
  history: Message[] = []
) {
  logger.info("RAG Agent received", message);

  // Retrieve relevant context
  const context = await retrieveContext(message);

  // Build messages with context
  const systemPrompt = context
    ? `You are a helpful assistant. Use the following context to answer the question:

CONTEXT:
${context}

If the context doesn't contain the answer, say so and answer from your general knowledge.`
    : "You are a helpful assistant.";

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    { role: "user", content: message }
  ];

  const response = await chatWithOpenAI(messages);
  return {
    agent: "rag",
    response,
    hasContext: context.length > 0
  };
}

export async function ingestDocument(
  text: string,
  docId: string
) {
  logger.info("Ingesting document", docId);
  const chunks = await loadTextFromString(text);
  const ids = chunks.map((_, i) => `${docId}-chunk-${i}`);
  await addDocuments("knowledge-base", chunks, ids);
  return { success: true, chunks: chunks.length };
}