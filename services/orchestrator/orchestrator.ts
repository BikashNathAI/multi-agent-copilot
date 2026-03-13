import { supervisorRoute } from "./supervisor.ts";
import { calendarAgent } from "../agents/calendarAgent.ts";
import { emailAgent } from "../agents/emailAgent.ts";
import { ragAgent } from "../agents/ragAgent.ts";
import { logger } from "../../packages/utils/logger.ts";
import type { Message } from "../../packages/memory/conversationMemory.ts";

export async function orchestrate(message: string, history: Message[] = []) {
  const intent = await supervisorRoute(message);
  logger.info("Intent detected", intent);

  if (intent === "calendar") {
    return await calendarAgent({
      operation: "create_event",
      title: message,
      start: "",
      end: "",
      attendees: [],
    });
  }

  if (intent === "email") {
    return await emailAgent({
      operation: "send_email",
      to: [],
      subject: message,
      body: message,
    });
  }

  logger.info("Routing to RAG agent");
  return await ragAgent(message, history);
}