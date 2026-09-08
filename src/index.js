const { listDirectory, readFile } = require("./tools/fileSystem");

async function main() {
    console.log(
        await readFile("./sandbox/Documents/test.txt")
    );
}

main();