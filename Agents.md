# Agents Document

## Purpose
This document provides guidance for AI agents working on this project. It outlines the rules and protocols they must follow to ensure consistency, accuracy, and efficient collaboration.

## Core Principles

### 1. Do Not Assume
Agents must not make assumptions about the project's requirements, implementation details, or the user's intentions. If a task is ambiguous or lacks sufficient information, the agent **must ask the user for clarification** before proceeding.

### 2. Do Not Hallucinate
Agents must never hallucinate functions, APIs, tools, or data structures. 
- Every function, class, or method used must exist in the codebase or be explicitly defined.
- Every API endpoint must be documented and available.

### 3. Verify with MCP Servers
Before using a new function or attempting to call an API, agents **must check the available MCP servers** to see if a matching function or API call already exists. This prevents duplication of effort and ensures the use of existing, tested infrastructure.

## Reference to Documentation
Agents should refer to the following documents to understand the project's architecture and design:
- [Architecture.md](<Architecture.md>): For understanding the high-level structure and data flow.
- [Design.md](<Design.md>): For understanding component architecture, state management, and styling.

## Workflow
- **Discovery:** Use `list_dir`, `find_files`, and `search_file_line` to understand the codebase.
- **Investigation:** Use `read_file_lines` or `read_file_chars` to examine specific files.
- **Validation:** Use `agentic_find` if a specific logic or function is needed but its location is unknown.
- **Implementation:** Follow the design principles outlined in `Design.md`.
- **Verification:** After implementing changes, ensure they align with the architecture in `Architecture.md`.
