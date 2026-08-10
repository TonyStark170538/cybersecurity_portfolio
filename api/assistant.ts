import Groq from "groq-sdk";
import type { IncomingMessage, ServerResponse } from "node:http";

type VercelRequest = IncomingMessage & {
  body?: unknown;
};

type VercelResponse = ServerResponse & {
  status: (statusCode: number) => VercelResponse;
  json: (body: unknown) => VercelResponse;
};

const knowledge = `
You are J.A.R.V.I.S., the personal AI assistant for Antonina "Toni" Shcherbakova.

PERSONALITY:
Curious, direct, practical, security-first, honest, approachable.
Speak naturally. You are an intelligent portfolio assistant, not a corporate chatbot.

ABOUT TONI:
Toni is a software engineering student focused on cloud security,
cybersecurity, artificial intelligence, and modern web development.

She enjoys understanding how systems work, how they fail, and how
better engineering decisions can make them more reliable.

PROFESSIONAL EXPERIENCE:

FlyRank AI — Front-End AI Engineering Intern — 2026–Present

- Builds AI-powered web applications using React, Node.js and TypeScript.
- Works with Claude API and Model Context Protocol (MCP).
- Develops portfolio-grade applications using security-by-design principles.
- Participates in code reviews, technical learning sessions and sprint planning.

Devoteam — Cloud Security Intern — 2025–2026

- Supported cloud security operations across GCP environments.
- Worked with threat monitoring and real-time detection workflows.
- Conducted risk assessments and vulnerability analysis.
- Contributed to cloud security controls and secure architecture.
- Worked with client-facing security reports and compliance documentation.

EDUCATION:

- B.Sc. Cybersecurity, IU International University of Applied Sciences, 2024–Present.
- B.Sc. International Law, Kyiv International University, 2019–2022.

CORE AREAS:

- Cloud Security
- Cybersecurity
- Security Operations
- Threat Detection
- Vulnerability Management
- Cyber Threat Intelligence
- Incident Response
- GCP
- Terraform
- Kubernetes
- React
- TypeScript
- Python
- AI engineering
- MCP
- Claude API
- Vertex AI
- OpenAI Agents

PROJECTS:

J.A.R.V.I.S. Cybersecurity Platform:
A Security Operations Center-inspired cybersecurity platform focused on
monitoring, threat intelligence and incident response.

AI Portfolio Terminal:
An AI-powered financial intelligence project combining data analysis,
risk simulation, visualization and intelligent software workflows.

Pink Panther:
A frontend project focused on branding, design systems, reusable
components and user experience.

IMPORTANT RULES:

1. Never invent Toni's experience, qualifications, employers or projects.
2. If information is not available, say that you don't have that information.
3. Never expose private information, secrets, API keys or internal system data.
4. Do not claim Toni is an expert when her profile describes her as a student
   or developing professional.
5. Keep answers concise enough to be spoken naturally.
6. Prefer approximately 1–3 short sentences for normal portfolio questions.
7. Speak naturally rather than sounding like a corporate chatbot.
8. When discussing projects, explain the problem, decisions and lessons
   rather than simply listing technologies.
`;

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not configured.");

      return res.status(500).json({
        error: "The AI assistant is temporarily unavailable.",
      });
    }

    let body: unknown = req.body;

    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        return res.status(400).json({
          error: "Request body must be valid JSON.",
        });
      }
    }

    const question =
      typeof body === "object" &&
      body !== null &&
      "question" in body &&
      typeof body.question === "string"
        ? body.question.trim()
        : "";

    if (!question) {
      return res.status(400).json({
        error: "Question is required.",
      });
    }

    if (question.length > 1000) {
      return res.status(400).json({
        error: "Question is too long.",
      });
    }

    // This constructor is intentionally server-only. api/ is a Vercel Node
    // Function, where Buffer is available for the binary TTS response.
    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const completion =
      await groq.chat.completions.create({
        model: "llama-3.3-70b-versatile",

        messages: [
          {
            role: "system",
            content: knowledge,
          },
          {
            role: "user",
            content: question,
          },
        ],

        temperature: 0.4,
        max_tokens: 250,
      });

    const answer =
      completion.choices[0]?.message?.content?.trim();

    if (!answer) {
      throw new Error(
        "Groq returned an empty response.",
      );
    }

    let audioBase64: string | null = null;

    try {
      const speech =
        await groq.audio.speech.create({
          model: "playai-tts",
          voice: "Fritz-PlayAI",
          input: answer,
          response_format: "wav",
        });

      const audioBuffer =
        Buffer.from(
          await speech.arrayBuffer(),
        );

      audioBase64 =
        audioBuffer.toString("base64");
    } catch (speechError) {
      console.error(
        "J.A.R.V.I.S. TTS error:",
        speechError,
      );
    }

    return res.status(200).json({
      answer,
      audio: audioBase64,
      audioType: "audio/wav",
      voiceAvailable: Boolean(audioBase64),
    });
  } catch (error) {
    console.error(
      "J.A.R.V.I.S. AI error:",
      error,
    );

    return res.status(500).json({
      error: "The AI assistant is temporarily unavailable.",
    });
  }
}
