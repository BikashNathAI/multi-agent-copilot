import { logger } from "../../packages/utils/logger.ts";

interface EmailInput {
  operation: string;
  to: string[];
  subject: string;
  body: string;
}

export async function emailAgent(input: EmailInput) {
  logger.info("Email Agent received", input);
  return {
    agent: "email",
    response: `Email "${input.subject}" has been sent successfully!`
  };
}