# 🤖 Multi-Agent Copilot

Enterprise-grade AI assistant platform built with LangGraph & Ollama.

## Features
- 🧠 LangGraph Supervisor routing
- 📅 Calendar Agent
- 📧 Email Agent
- 💡 Knowledge Agent
- 💬 Multi-turn memory
- 🔍 LangSmith observability

## Tech Stack
- TypeScript + Node.js + Express
- React Frontend
- LangChain + LangGraph
- Ollama (llama3.2:1b)
- LangSmith

## Setup
npm install --legacy-peer-deps
npm run dev

## API Test
POST http://localhost:3000/chat
{"message": "What is AI?", "sessionId": "user123"}
