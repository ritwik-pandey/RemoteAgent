const { askLLM } = require("./client");
const { getLLMTools } = require("./toolAdapter");
const { executeTool } = require("../agent/toolExecuter");

async function processRequest(userInput) {
  const tools = getLLMTools();

  const messages = [
    {
      role: "user",
      content: userInput,
    },
  ];

  let response;

  try {
    response = await askLLM(messages, tools);
  } catch (error) {
    throw new Error(`LLM request failed: ${error.message}`);
  }

  const toolCalls = response.output.filter(
    (item) => item.type === "function_call",
  );

  if (toolCalls.length === 0) {
    return response.output_text || "I could not generate a response.";
  }

  messages.push(...response.output);

  for (const toolCall of toolCalls) {
    let arguments_;

    try {
      arguments_ = JSON.parse(toolCall.arguments);
    } catch (error) {
      messages.push({
        type: "function_call_output",
        call_id: toolCall.call_id,
        output: JSON.stringify({
          error: "Invalid tool arguments returned by LLM.",
        }),
      });

      continue;
    }

    let result;

    try {
      result = await executeTool(toolCall.name, arguments_);
    } catch (error) {
      result = {
        error: error.message,
      };
    }

    messages.push({
      type: "function_call_output",
      call_id: toolCall.call_id,
      output: JSON.stringify(result),
    });
  }

  try {
    response = await askLLM(messages, tools);
  } catch (error) {
    throw new Error(`LLM request failed: ${error.message}`);
  }

  return response.output_text || "I could not generate a response.";
}

module.exports = {
  processRequest,
};
