# Copilot instructions for gmail-mcp-agent

This repo is a stdio MCP server that sends plain-text Gmail via SMTP.

- Prefer calling the `send_email` tool over writing custom SMTP code.
- Require `GMAIL_USER` and `GMAIL_APP_PASSWORD` in the process environment.
- Do not commit credentials or `.env` files.
- Subjects and recipient addresses must not contain newlines.
