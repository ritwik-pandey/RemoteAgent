const { executeTool } = require("./agent/toolExecuter");

async function main() {

    const result = await executeTool(
        "search_files",
        {
            directory: "./sandbox",
            query: "test.txt"
        }
    );

    console.log(result);
}

main();