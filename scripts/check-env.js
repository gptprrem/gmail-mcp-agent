#!/usr/bin/env node
const user = process.env.GMAIL_USER || "";
const pass = process.env.GMAIL_APP_PASSWORD || "";
const okUser = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user) && !/[\r\n]/.test(user);
const okPass = Boolean(pass.trim());
if (!okUser || !okPass) {
  console.error("missing or invalid GMAIL_USER / GMAIL_APP_PASSWORD");
  process.exit(1);
}
console.log("gmail env looks set (password not printed)");
