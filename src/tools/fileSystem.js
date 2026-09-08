const fs = require("fs/promises");
const path = require("path");
const { isPathAllowed } = require("../security/policy");

async function listDirectory(directory) {
    validatePath(directory);
    const files = await fs.readdir(directory, {
        withFileTypes: true
    });

    return files.map(file => ({
        name: file.name,
        type: file.isDirectory() ? "directory":"file"
    }));

}

async function getFileInfo(filePath) {
    validatePath(filePath);
    const stats = await fs.stat(filePath);

    return {
        name: filePath,
        size: stats.size,
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory()
    };
}

async function searchFiles(directory, query) {
    validatePath(directory);
    const entries = await fs.readdir(directory, {
        withFileTypes: true
    });
    const results = [];
    for(const entry of entries){
        const fullPath = path.join(directory, entry.name);
        if(entry.isDirectory()){
            const nestedResults = await searchFiles(fullPath, query);
            results.push(...nestedResults);
        }else if(entry.name.toLowerCase().includes(query.toLowerCase())){
            results.push(fullPath);
        }
    }
    return results;
}

function validatePath(targetPath) {
    if (!isPathAllowed(targetPath)) {
        throw new Error(
            `Access denied: ${targetPath}`
        );
    }
}

module.exports = {
    listDirectory,
    getFileInfo,
    searchFiles
};