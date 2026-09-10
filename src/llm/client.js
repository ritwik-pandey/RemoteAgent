require("dotenv").config();

const { OpenAI } = require("openai");

const client = new OpenAI({
  apiKey: process.env.LLM_API_KEY,
});

async function askLLM(messages, tools = []) {
  const response = await client.responses.create({
    model: process.env.LLM_MODEL,
    input: messages,
    tools: tools,
  });

  return response;
}

module.exports = {
  askLLM,
};
