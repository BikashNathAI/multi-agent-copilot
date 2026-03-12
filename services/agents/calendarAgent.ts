import { logger } from "../../packages/utils/logger.ts";

interface CalendarInput {
  operation: string;
  title: string;
  start: string;
  end: string;
  attendees: string[];
}

export async function calendarAgent(input: CalendarInput) {
  logger.info("Calendar Agent received", input);
  return {
    agent: "calendar",
    response: `Calendar event "${input.title}" has been created successfully!`
  };
}