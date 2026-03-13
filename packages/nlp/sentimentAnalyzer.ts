import { logger } from "../utils/logger.ts";

export interface SentimentResult {
  sentiment: "positive" | "negative" | "neutral";
  score: number;
}

const positiveWords = [
  "good", "great", "excellent", "happy", "love", "best",
  "amazing", "wonderful", "fantastic", "help", "thanks", "please"
];

const negativeWords = [
  "bad", "terrible", "awful", "hate", "worst", "horrible",
  "error", "fail", "broken", "wrong", "problem", "issue"
];

export function analyzeSentiment(message: string): SentimentResult {
  const words = message.toLowerCase().split(/\s+/);
  let score = 0;

  words.forEach(word => {
    if (positiveWords.includes(word)) score += 1;
    if (negativeWords.includes(word)) score -= 1;
  });

  const sentiment =
    score > 0 ? "positive" :
    score < 0 ? "negative" : "neutral";

  logger.info("Sentiment analyzed", { sentiment, score });
  return { sentiment, score };
}