import OpenAI from "openai";

const client = new OpenAI({
  apiKey: "ollama",
  baseURL: "http://127.0.0.1:11434/v1",
});

export async function chatWithOpenAI(messages: { role: string; content: string }[]) {
  const response = await client.chat.completions.create({
    model: "llama3.2:1b",
    messages: messages as any,
  });
  return response.choices[0]?.message?.content ?? null;
}