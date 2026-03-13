import { logger } from "../utils/logger.ts";

// In-memory store - no server needed!
const inMemoryStore: Map<string, { documents: string[]; ids: string[] }> = new Map();

export async function getOrCreateCollection(name: string) {
  if (!inMemoryStore.has(name)) {
    inMemoryStore.set(name, { documents: [], ids: [] });
  }
  return inMemoryStore.get(name)!;
}

export async function addDocuments(
  collectionName: string,
  documents: string[],
  ids: string[],
) {
  const collection = await getOrCreateCollection(collectionName);
  collection.documents.push(...documents);
  collection.ids.push(...ids);
  logger.info(`Added ${documents.length} documents to ${collectionName}`);
}

export async function queryDocuments(
  collectionName: string,
  queryText: string,
  nResults: number = 3
) {
  const collection = await getOrCreateCollection(collectionName);
  
  // Simple keyword matching
  const queryWords = queryText.toLowerCase().split(" ");
  
  const scored = collection.documents.map((doc, i) => {
    const docLower = doc.toLowerCase();
    const score = queryWords.filter(w => docLower.includes(w)).length;
    return { doc, id: collection.ids[i], score };
  });

  const topDocs = scored
    .sort((a, b) => b.score - a.score)
    .slice(0, nResults)
    .map(x => x.doc);

  return {
    documents: [topDocs],
    ids: [scored.slice(0, nResults).map(x => x.id)]
  };
}