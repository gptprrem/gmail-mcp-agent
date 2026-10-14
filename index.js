#!/usr/bin/env node
import { pathToFileURL } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import nodemailer from "nodemailer";
import { z } from "zod";

const fields = {
  to: z.string().email().max(254).regex(/^[^\r\n]+$/),
  subject: z.string().min(1).max(998).regex(/^[^\r\n]+$/),
  body: z.string().min(1).max(100000),
};

function environment() {
  return {
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_APP_PASSWORD: process.env.GMAIL_APP_PASSWORD,
    HTTPS_PROXY: process.env.HTTPS_PROXY,
    HTTP_PROXY: process.env.HTTP_PROXY,
  };
}

export function smtpOptions(env = environment()) {
  const user = z.string().email().regex(/^[^\r\n]+$/).safeParse(env.GMAIL_USER);
  if (!user.success || !env.GMAIL_APP_PASSWORD?.trim()) {
    throw new Error("Set GMAIL_USER and GMAIL_APP_PASSWORD in local secret configuration.");
  }
  return {
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user: user.data, pass: env.GMAIL_APP_PASSWORD },
    proxy: env.HTTPS_PROXY || env.HTTP_PROXY,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    disableFileAccess: true,
    disableUrlAccess: true,
  };
}

export async function sendEmail(input, { env = environment(), transport } = {}) {
  const { to, subject, body } = z.object(fields).parse(input);
  const options = smtpOptions(env);
  const mailer = transport ?? nodemailer.createTransport(options);
  const result = await mailer.sendMail({
    from: options.auth.user,
    to,
    subject,
    text: body,
  });
  if (result.rejected?.length) {
    return { content: [{ type: "text", text: "SMTP rejected one or more recipients; delivery is incomplete." }], isError: true };
  }
  return { content: [{ type: "text", text: `Gmail accepted the message: ${result.messageId}` }] };
}

export function createServer() {
  const server = new McpServer({ name: "gmail-mcp", version: "1.0.0" });
  server.tool("send_email", "Send a plain-text email through Gmail", fields, async (input) => {
    try {
      return await sendEmail(input);
    } catch {
      return { content: [{ type: "text", text: "Email failed. Check local Gmail credentials, recipient, and SMTP connectivity. Do not share credentials." }], isError: true };
    }
  });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await createServer().connect(new StdioServerTransport());
}