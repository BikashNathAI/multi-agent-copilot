import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { logger } from "../../packages/utils/logger.ts";

const baseURL = (process.env.OLLAMA_BASE_URL || "http://localhost:11434") + "/v1";

const llm = new ChatOpenAI({
  apiKey: "ollama",
  configuration: { baseURL },
  model: process.env.OLLAMA_MODEL || "llama3.2:1b",
  temperature: 0
});

const AGENTS = ["calendar", "email", "knowledge"];

export async function supervisorRoute(message: string): Promise<string> {
  logger.info("Supervisor routing message", message);
  const response = await llm.invoke([
    new SystemMessage(`You are a routing supervisor. Available agents: ${AGENTS.join(", ")}
- calendar: scheduling, meetings, events, dates, reminders
- email: sending, reading, composing emails
- knowledge: general questions, explanations, facts
Reply with ONLY one word - the agent name.`),
    new HumanMessage(message),
  ]);
  const agent = response.content.toString().trim().toLowerCase();
  const matched = AGENTS.find((a) => agent.includes(a)) ?? "knowledge";
  logger.info("Supervisor selected agent", matched);
  return matched;
}