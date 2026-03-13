import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import fs from "fs";
import path from "path";

export async function loadTextFile(filePath: string): Promise<string[]> {
  const content = fs.readFileSync(filePath, "utf-8");
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const chunks = await splitter.splitText(content);
  return chunks;
}

export async function loadTextFromString(text: string): Promise<string[]> {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });
  const chunks = await splitter.splitText(text);
  return chunks;
}