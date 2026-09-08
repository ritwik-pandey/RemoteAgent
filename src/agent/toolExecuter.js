const tools = require("../tools/registry");

async function executeTool(toolName, arguments_) {
    const tool = tools[toolName];

    if (!tool) {
        throw new Error(`Unknown tool: ${toolName}`);
    }

    return await tool.execute(arguments_);
}

module.exports = {
    executeTool
};