import express from "express";
import cors from "cors";
import { orchestrate } from "../../services/orchestrator/orchestrator.ts";
import { getHistory, addMessage } from "../../packages/memory/conversationMemory.ts";
import { logger } from "../../packages/utils/logger.ts";
import { ingestDocument } from "../../services/agents/ragAgent.ts";
import { runNLPPipeline } from "../../packages/nlp/nlpPipeline.ts";

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const { message, sessionId = "default" } = req.body;
    logger.info("Received message", { message, sessionId });
    addMessage(sessionId, { role: "user", content: message });
    const history = getHistory(sessionId);
    const output = await orchestrate(message, history);
    addMessage(sessionId, { role: "assistant", content: JSON.stringify(output) });
    res.json({ output, sessionId, turns: history.length });
  } catch (error: any) {
    logger.error("Request failed", error?.message);
    res.status(500).json({ error: error?.message ?? "Request failed" });
  }
});

app.post("/ingest", async (req, res) => {
  try {
    const { text, docId } = req.body;
    logger.info("Ingesting document", { docId });
    const result = await ingestDocument(text, docId);
    res.json(result);
  } catch (error: any) {
    logger.error("Ingestion failed", error?.message);
    res.status(500).json({ error: error?.message });
  }
});

app.post("/nlp", async (req, res) => {
  try {
    const { message } = req.body;
    logger.info("NLP analysis requested", message);
    const result = await runNLPPipeline(message);
    res.json(result);
  } catch (error: any) {
    logger.error("NLP failed", error?.message);
    res.status(500).json({ error: error?.message });
  }
});

app.listen(3000, "0.0.0.0", () => {
  logger.info("API running at http://127.0.0.1:3000");
});