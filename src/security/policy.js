const path = require("path");
const fs = require("fs/promises");

const SANDBOX_ROOT = path.resolve("./sandbox");

async function isPathAllowed(targetPath){
    try{
        const resolvedPath = await fs.realpath(targetPath);
        return (
            resolvedPath === SANDBOX_ROOT || resolvedPath.startsWith(SANDBOX_ROOT+path.sep)
        );
    }catch(error){
        return false;
    }
}

module.exports = {
    SANDBOX_ROOT,
    isPathAllowed
};