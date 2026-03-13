import { chatWithOpenAI } from "../llm/openai.ts";
import { logger } from "../utils/logger.ts";

export interface IntentResult {
  intent: string;
  confidence: string;
  entities: Record<string, string>;
  sentiment: string;
}

export async function classifyIntent(message: string): Promise<IntentResult> {
  logger.info("Classifying intent", message);

  const response = await chatWithOpenAI([
    {
      role: "system",
      content: `You are an NLP classifier. Analyze the user message and respond ONLY with valid JSON like this:
{
  "intent": "knowledge|calendar|email",
  "confidence": "high|medium|low",
  "entities": {
    "person": "extracted name or empty string",
    "date": "extracted date or empty string",
    "topic": "main topic or empty string"
  },
  "sentiment": "positive|negative|neutral"
}
Return ONLY the JSON object, no other text.`
    },
    {
      role: "user",
      content: message
    }
  ]);

  try {
    const clean = response!.replace(/```json|```/g, "").trim();
    const result = JSON.parse(clean);
    logger.info("Intent classified", result);
    return result;
  } catch {
    logger.warn("Failed to parse intent, using defaults");
    return {
      intent: "knowledge",
      confidence: "low",
      entities: {},
      sentiment: "neutral"
    };
  }
}