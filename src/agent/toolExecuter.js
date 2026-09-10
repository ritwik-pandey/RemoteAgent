const tools = require("../tools/registry");
//We need at minimum to reject:
//- unknown tools
//- missing arguments
//- arguments that aren't an object
//- unexpected arguments
//Since your existing inputSchema already defines the expected fields, we'll use that.
function validateArguments(tool, arguments_) {
  if (
    arguments_ === null ||
    typeof arguments_ !== "object" ||
    Array.isArray(arguments_)
  ) {
    throw new Error("Tool arguments must be an object.");
  }

  const schema = tool.inputSchema;

  for (const requiredField of schema.required || []) {
    if (!(requiredField in arguments_)) {
      throw new Error(`Missing required argument: ${requiredField}`);
    }
  }

  for (const argumentName of Object.keys(arguments_)) {
    if (!schema.properties[argumentName]) {
      throw new Error(`Unexpected argument: ${argumentName}`);
    }
  }
}

async function executeTool(toolName, arguments_) {
  const tool = tools[toolName];

  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  validateArguments(tool, arguments_);

  return await tool.execute(arguments_);
}

module.exports = {
  executeTool,
};
