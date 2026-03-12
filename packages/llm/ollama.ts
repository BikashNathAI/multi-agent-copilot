import { Ollama } from "ollama";

const client = new Ollama({
  host: "http://localhost:11434"
});

export async function generateLLMResponse(message: string) {
  const response = await client.chat({
    model: "llama3.2:1b",
    messages: [
      { role: "user", content: message }
    ]
  });
  return response.message.content;
}