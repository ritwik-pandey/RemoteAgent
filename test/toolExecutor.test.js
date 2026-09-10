const assert = require("assert");
const { executeTool } = require("../src/agent/toolExecuter");

async function runTests() {
  // Valid tool call
  const result = await executeTool("search_files", {
    directory: "./sandbox",
    query: "test.txt",
  });

  //console.log("Tool result:", result);

  assert(
    result.some((filePath) =>
      filePath.endsWith("sandbox\\Documents\\test.txt"),
    ),
  );

  // Unknown tool should be rejected
  await assert.rejects(
    executeTool("delete_file", {
      filePath: "./sandbox/test.txt",
    }),
    /Unknown tool/,
  );

  // Invalid arguments should be rejected
  await assert.rejects(
    executeTool("search_files", {
      directory: "./sandbox",
    }),
    /Missing required argument: query/,
  );

  console.log("All tool executor tests passed.");
}

runTests().catch((error) => {
  console.error("Test failed:", error.message);
  process.exit(1);
});
