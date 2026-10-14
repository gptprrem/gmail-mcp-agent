---
name: gmail-send
description: Send plain-text email through the Gmail MCP server. Use when the user asks to email someone, draft a short message for SMTP delivery, or verify Gmail App Password setup.
---

# Gmail send

Use the `send_email` MCP tool. Do not invent SMTP calls outside the MCP server.

## Required env (local secrets only)

- `GMAIL_USER` — sender Gmail address
- `GMAIL_APP_PASSWORD` — Google App Password (not the normal password)

Never put credentials in tool arguments, chat, or committed files.

## Tool shape

```json
{
  "to": "recipient@example.com",
  "subject": "Subject without newlines",
  "body": "Plain text body"
}
```

## Checks before send

1. Confirm recipient and subject with the user when the ask is ambiguous.
2. Keep the body plain text. No HTML.
3. If send fails, ask the user to verify App Password and SMTP reachability to `smtp.gmail.com:465`.

## Helper script

When validating local setup without sending mail:

```bash
node scripts/check-env.js
```
