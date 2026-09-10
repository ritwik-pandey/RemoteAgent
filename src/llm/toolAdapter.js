const tools = require("../tools/registry");

function getLLMTools() {
  return Object.values(tools).map((tool) => ({
    type: "function",
    name: tool.name,
    description: tool.description,
    parameters: tool.inputSchema,
  }));
}

module.exports = {
  getLLMTools,
};
