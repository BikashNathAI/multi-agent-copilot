import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { logger } from "../../packages/utils/logger.ts";

const llm = new ChatOpenAI({
  apiKey: "ollama",
  configuration: {
    baseURL: "http://127.0.0.1:11434/v1",
  },
  model: "llama3.2:1b",
  temperature: 0,
});

const AGENTS = ["calendar", "email", "knowledge"];

export async function supervisorRoute(message: string): Promise<string> {
  logger.info("Supervisor routing message", message);
  const response = await llm.invoke([
    new SystemMessage(`You are a routing supervisor. Based on the user message, decide which agent should handle it.
Available agents: ${AGENTS.join(", ")}
- calendar: for scheduling, meetings, events, dates, reminders
- email: for sending, reading, composing emails
- knowledge: for general questions, explanations, facts
Reply with ONLY one word - the agent name. No explanation.`),
    new HumanMessage(message),
  ]);
  const agent = response.content.toString().trim().toLowerCase();
  const matched = AGENTS.find((a) => agent.includes(a)) ?? "knowledge";
  logger.info("Supervisor selected agent", matched);
  return matched;
}