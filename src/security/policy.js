const path = require("path");

const SANDBOX_ROOT = path.resolve("./sandbox");

function isPathAllowed(targetPath){
    const resolvedPath = path.resolve(targetPath);
    return (
        resolvedPath === SANDBOX_ROOT || resolvedPath.startsWith(SANDBOX_ROOT+path.sep)
    );
}

module.exports = {
    SANDBOX_ROOT,
    isPathAllowed
};