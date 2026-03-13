import { queryDocuments } from "./vectorStore.ts";
import { logger } from "../utils/logger.ts";

export async function retrieveContext(
  query: string,
  collectionName: string = "knowledge-base"
): Promise<string> {
  try {
    const results = await queryDocuments(collectionName, query, 3);
    if (!results.documents || results.documents[0].length === 0) {
      return "";
    }
    const context = results.documents[0]
      .filter((doc): doc is string => doc !== null)
      .join("\n\n");
    logger.info("Retrieved context chunks", results.documents[0].length);
    return context;
  } catch (error) {
    logger.error("Retrieval error", error);
    return "";
  }
}