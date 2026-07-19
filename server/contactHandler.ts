import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  contactFormSchema,
  type ContactSubmissionResult,
} from "@shared/contact";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(forwardedFor: string | undefined, remoteAddress?: string) {
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }
  return remoteAddress || "unknown";
}

function isRateLimited(clientIp: string) {
  const now = Date.now();
  const entry = rateLimitMap.get(clientIp);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(clientIp, {
      count: 1,
      resetAt: now + RATE_LIMIT_WINDOW_MS,
    });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }

  entry.count += 1;
  return false;
}

function getSubmissionsPath() {
  const dataDir = path.resolve(__dirname, "..", "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  return path.join(dataDir, "contact-submissions.jsonl");
}

function saveSubmission(payload: {
  name: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  clientIp: string;
}) {
  const line = `${JSON.stringify(payload)}\n`;
  fs.appendFileSync(getSubmissionsPath(), line, "utf-8");
}

export function processContactSubmission(
  body: unknown,
  clientIp: string
): ContactSubmissionResult {
  if (isRateLimited(clientIp)) {
    return {
      success: false,
      message: "Too many messages sent. Please try again later.",
    };
  }

  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    const errors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: Object.fromEntries(
        Object.entries(errors).map(([key, value]) => [
          key,
          value ?? [],
        ])
      ),
    };
  }

  const { name, email, subject, message, website } = parsed.data;

  if (website?.trim()) {
    return {
      success: true,
      message: "Thanks for reaching out! I'll get back to you soon.",
    };
  }

  const submission = {
    name,
    email,
    subject,
    message,
    submittedAt: new Date().toISOString(),
    clientIp,
  };

  saveSubmission(submission);
  console.log("[contact] New submission:", {
    name,
    email,
    subject,
    submittedAt: submission.submittedAt,
  });

  return {
    success: true,
    message: "Thanks for reaching out! I'll get back to you soon.",
  };
}

export function getContactClientIp(
  forwardedFor: string | undefined,
  remoteAddress?: string
) {
  return getClientIp(forwardedFor, remoteAddress);
}
