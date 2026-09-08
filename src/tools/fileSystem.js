const fs = require("fs/promises");
const path = require("path");
const { isPathAllowed } = require("../security/policy");
const MAX_READ_SIZE = 1024 * 1024 * 5;

async function listDirectory({directory}) {
    await validatePath(directory);
    const files = await fs.readdir(directory, {
        withFileTypes: true
    });

    return files.map(file => ({
        name: file.name,
        type: file.isDirectory() ? "directory":"file"
    }));

}

async function getFileInfo({filePath}) {
    await validatePath(filePath);
    const stats = await fs.stat(filePath);

    return {
        name: filePath,
        size: stats.size,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory()
    };
}

async function searchFiles({ directory, query }) {
    await validatePath(directory);
    const entries = await fs.readdir(directory, {
        withFileTypes: true
    });
    const results = [];
    for(const entry of entries){
        const fullPath = path.join(directory, entry.name);
        if(entry.isDirectory()){
            const nestedResults = await searchFiles({
                directory: fullPath,
                query: query
            });
            results.push(...nestedResults);
        }else if(entry.name.toLowerCase().includes(query.toLowerCase())){
            results.push(fullPath);
        }
    }
    return results;
}

async function validatePath(targetPath) {
    const allowed = await isPathAllowed(targetPath);
    if (!allowed) {
        throw new Error(
            `Access denied: ${targetPath}`
        );
    }
}

async function readFile({filePath}) {
    await validatePath(filePath);
    
    const stats = await fs.stat(filePath);

    if (stats.size > MAX_READ_SIZE) {
        throw new Error(
            "File is too large to read directly."
        );
    }

    const content = await fs.readFile(filePath, "utf-8");

    return content;
}

module.exports = {
    listDirectory,
    getFileInfo,
    searchFiles,
    readFile
};