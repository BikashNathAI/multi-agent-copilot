import { logger } from "../utils/logger.ts";

export interface Entities {
  persons: string[];
  dates: string[];
  emails: string[];
  topics: string[];
  locations: string[];
}

export function extractEntities(message: string): Entities {
  logger.info("Extracting entities", message);

  // Extract emails
  const emails = message.match(
    /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
  ) || [];

  // Extract dates
  const dates = message.match(
    /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|today|tomorrow|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/gi
  ) || [];

  // Extract capitalized names (simple heuristic)
  const persons = message.match(/\b[A-Z][a-z]+ [A-Z][a-z]+\b/g) || [];

  // Extract locations
  const locations = message.match(
    /\b(in|at|from|to) ([A-Z][a-z]+)\b/g
  )?.map(l => l.replace(/^(in|at|from|to) /i, "")) || [];

  // Extract topics (nouns after 'about')
  const topics = message.match(/\babout\s+([a-zA-Z\s]+)/gi)
    ?.map(t => t.replace(/^about\s+/i, "").trim()) || [];

  const result = { persons, dates, emails, topics, locations };
  logger.info("Entities extracted", result);
  return result;
}