const readline = require("readline");
const { processRequest } = require("./llm/service");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("What do you want me to do? ", async (userInput) => {
  try {
    const result = await processRequest(userInput);

    console.log("\nAssistant:", result);
  } catch (error) {
    console.error("\nError:", error.message);
  } finally {
    rl.close();
  }
});
