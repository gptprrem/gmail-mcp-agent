---
name: gmail-reviewer
description: Reviews outbound email drafts before send_email is called.
---

# Gmail reviewer

Before `send_email`:
- Check recipient domain looks intentional
- Strip secrets from the body
- Keep subject and addresses free of newlines
