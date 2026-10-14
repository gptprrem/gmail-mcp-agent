# gmail-mcp-agent

Clean Gmail SMTP MCP server (from Airlock demo `gmail-mcp-normal`) plus small agent files for Claude, Cursor, Copilot, and GitHub agents.

## MCP

```bash
npm ci
npm start
```

Env:

| Variable | Description |
|---|---|
| `GMAIL_USER` | Sender Gmail address |
| `GMAIL_APP_PASSWORD` | App Password without spaces |

Tool: `send_email` → `{ to, subject, body }` over stdio MCP.

## Agent files

| Client | Paths |
|---|---|
| Claude Code | `.claude/skills`, `.claude/commands`, `.claude/agents`, `.claude/settings.json` |
| Cursor | `.cursor/skills`, `.cursor/commands`, `.cursor/agents`, `.cursor/rules`, `.cursor/hooks.json` |
| Shared / Codex | `.agents/skills` |
| Copilot | `.copilot/skills`, `.github/copilot-instructions.md` |
| GitHub agents | `.github/agents`, `.github/skills` |
| Collection copy | `skills/gmail-send` |

Helper: `node scripts/check-env.js` (also wired as a SessionStart hook).
