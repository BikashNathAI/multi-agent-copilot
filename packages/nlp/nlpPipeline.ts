import { classifyIntent, IntentResult } from "./intentClassifier.ts";
import { extractEntities, Entities } from "./entityExtractor.ts";
import { analyzeSentiment, SentimentResult } from "./sentimentAnalyzer.ts";
import { logger } from "../utils/logger.ts";

export interface NLPResult {
  originalMessage: string;
  intent: IntentResult;
  entities: Entities;
  sentiment: SentimentResult;
  processedAt: string;
}

export async function runNLPPipeline(message: string): Promise<NLPResult> {
  logger.info("Running NLP pipeline", message);

  // Run all 3 NLP steps
  const [intent, entities, sentiment] = await Promise.all([
    classifyIntent(message),
    Promise.resolve(extractEntities(message)),
    Promise.resolve(analyzeSentiment(message)),
  ]);

  const result: NLPResult = {
    originalMessage: message,
    intent,
    entities,
    sentiment,
    processedAt: new Date().toISOString(),
  };

  logger.info("NLP pipeline complete", result);
  return result;
}