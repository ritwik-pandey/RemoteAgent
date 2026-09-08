const {
    listDirectory,
    getFileInfo,
    searchFiles,
    readFile
} = require("./fileSystem");

const tools = {
    list_directory: {
        name: "list_directory",

        description: "List files and directories inside an allowed directory.",

        permission: "READ",

        inputSchema: {
            type: "object",

            properties: {
                directory: {
                    type: "string",
                    description: "Directory to list."
                }
            },

            required: ["directory"]
        },

        execute: listDirectory
    },

    get_file_info: {
        name: "get_file_info",

        description: "Get metadata about a file or directory.",

        permission: "READ",

        inputSchema: {
            type: "object",

            properties: {
                filePath: {
                    type: "string",
                    description: "Path of the file or directory."
                }
            },

            required: ["filePath"]
        },

        execute: getFileInfo
    },

    search_files: {
        name: "search_files",

        description: "Search for files by name inside the allowed filesystem.",

        permission: "READ",

        inputSchema: {
            type: "object",

            properties: {
                directory: {
                    type: "string",
                    description: "Directory to search inside."
                },

                query: {
                    type: "string",
                    description: "Text to search for in filenames."
                }
            },

            required: ["directory", "query"]
        },

        execute: searchFiles
    },

    read_file: {
        name: "read_file",

        description: "Read the contents of a text file.",

        permission: "READ",

        inputSchema: {
            type: "object",

            properties: {
                filePath: {
                    type: "string",
                    description: "Path of the file to read."
                }
            },

            required: ["filePath"]
        },

        execute: readFile
    }
};

module.exports = tools;