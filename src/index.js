const { listDirectory } = require("./tools/fileSystem");

async function main() {
    console.log(
        await listDirectory("./sandbox/")
    );
}

main();