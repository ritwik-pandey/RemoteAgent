# RemoteAgent 🖥️

RemoteAgent is a secure, AI-powered remote computer agent that allows users to interact with their computer through natural language.

The core idea is to let a user send a request such as:

> "Find my project report."

The AI understands the request, selects the appropriate tool, and the local agent performs the operation on the user's computer.

## Core Architecture

```text
User
  ↓
Remote Interface
  ↓
LLM / Agent
  ↓
Tool Registry
  ↓
Permission & Security Layer
  ↓
Local PC Agent
  ↓
Filesystem
```

The LLM **does not directly control the computer** or execute arbitrary code.

Instead, it can only request predefined tools such as:

* `list_directory`
* `search_files`
* `get_file_info`
* `read_file`

Every request passes through the local security layer before execution.

## Current Progress

* ✅ Sandboxed filesystem access
* ✅ Path traversal protection
* ✅ Symlink protection
* ✅ File size limits
* ✅ Filesystem tool registry
* 🚧 LLM integration
* 🚧 PC agent ↔ gateway communication
* 🚧 WhatsApp integration
* 🚧 Authentication & authorization

## Goal

Build a secure remote agent that can eventually allow users to safely interact with their own computer through interfaces such as WhatsApp, while keeping the AI constrained by explicit tools and security policies.

> **The AI decides what it wants to do.
> The agent decides what it is allowed to do.**
