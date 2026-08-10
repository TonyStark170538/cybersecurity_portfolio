# Toni's Cybersecurity Portfolio

A React and TypeScript portfolio for Antonina (Toni) Shcherbakova, focused on cybersecurity, cloud security, AI engineering, and modern web development. It includes an interactive 3D J.A.R.V.I.S. portfolio assistant that can answer questions about Toni's background and projects and optionally speak its responses.

**Live site:** [cybersecurity-portfolio-snowy.vercel.app](https://cybersecurity-portfolio-snowy.vercel.app/)

## Highlights

- Responsive portfolio pages for projects, writeups, about, and contact information.
- Interactive Three.js robot built with React Three Fiber and Drei.
- Authored GLB animation plus idle cursor-following, activation, thinking, and speaking visual states.
- J.A.R.V.I.S. assistant backed by a secure Vercel Function and Groq.
- Concise, portfolio-specific answers with optional PlayAI WAV speech.
- Client-side routing with Wouter.

## Architecture

This is a **Vite single-page application with a Vercel serverless function**. It is not an Express or separate custom backend application.

```text
Browser
  │
  ├─ Vite / React application
  │    └─ POST /api/assistant
  │
  └─ Vercel Node Function: api/assistant.ts
       ├─ validates the question
       ├─ calls Groq Llama 3.3 70B Versatile
       └─ attempts Groq PlayAI TTS (Fritz-PlayAI)
```

The Vite HTML entry is the repository-root `index.html`. Application source and public assets remain under `client/`; this is configured in `vite.config.ts` so Vercel detects the application correctly.

## J.A.R.V.I.S. interaction

1. The visitor sees the robot's authored idle/flying animation and subtle cursor response.
2. Clicking the robot opens `RobotAssistant`.
3. A submitted question changes the UI and robot to **thinking**.
4. The browser posts `{ "question": "..." }` to `/api/assistant`.
5. The function returns an answer and, when TTS succeeds, Base64-encoded WAV audio.
6. The assistant displays the answer and plays only the current voice response.
7. During voice playback, the robot enters its **speaking** state; it returns to ready when playback ends or is muted/stopped.

Text responses remain available if text-to-speech fails. Closing the assistant stops audio, revokes its object URL, and prevents an in-flight request from starting background speech.

## Tech stack

- React 19, TypeScript, Vite
- Tailwind CSS and Radix UI components
- Wouter routing
- Three.js, React Three Fiber, React Three Drei
- Groq SDK: `llama-3.3-70b-versatile` and `playai-tts`
- Vercel Functions and Vercel hosting
- React Hook Form, Zod, Formspree, Sonner, Lucide

## Project structure

```text
.
├── api/
│   └── assistant.ts              # Secure Vercel Node Function
├── client/
│   ├── public/
│   │   └── models/robot.glb      # 3D model and authored animation
│   └── src/
│       ├── components/robot/
│       │   ├── Robot.tsx         # Canvas scene
│       │   ├── RobotModel.tsx    # Model, movement, glow, interactions
│       │   └── RobotAssistant.tsx# AI request and audio lifecycle
│       ├── pages/
│       └── App.tsx
├── index.html                    # Vite HTML entry
├── vite.config.ts
├── vercel.json
└── package.json
```

## Routes

| Route | Page |
| --- | --- |
| `/` | Home and J.A.R.V.I.S. |
| `/projects` | Projects |
| `/projects/:id` | Project detail |
| `/writeups` | Security writeups |
| `/about` | About Toni |
| `/contact` | Contact |
| `/404` | Not found |

## Setup

### Prerequisites

- Node.js 18 or later
- pnpm

### Install

```bash
pnpm install
```

### Environment variables

Create a local `.env.local` file:

```dotenv
GROQ_API_KEY=your_groq_api_key
```

Never prefix this key with `VITE_`, commit it, or add it to client-side code. `.env.local` is ignored by Git.

For deployed environments, add `GROQ_API_KEY` in **Vercel Project Settings → Environment Variables**. Local environment files are not automatically deployed.

## Development and verification

```bash
# Vite frontend only — does not serve Vercel Functions
pnpm run dev

# Full frontend + /api/assistant Vercel environment
pnpm exec vercel dev

# TypeScript validation
pnpm run check

# Production build
pnpm run build

# Preview the built frontend only
pnpm run preview
```

`pnpm run dev` normally uses port 3000. For full-stack J.A.R.V.I.S. testing, use `pnpm exec vercel dev` and use the exact port it reports.

Test the function after Vercel Dev starts:

```powershell
Invoke-RestMethod `
  -Uri "http://localhost:PORT/api/assistant" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"question":"Who is Toni?"}'
```

The response shape is:

```json
{
  "answer": "...",
  "audio": "base64 WAV data or null",
  "audioType": "audio/wav",
  "voiceAvailable": true
}
```

## API contract

`POST /api/assistant`

- Accepts JSON with a `question` string.
- Rejects malformed JSON, missing/empty questions, and questions longer than 1000 characters.
- Returns `405 Method not allowed` for non-POST requests.
- Produces a safe generic availability error if the service cannot respond.
- TTS errors are handled separately so a valid text answer is still returned.

## Security notes

- `GROQ_API_KEY` is read only in `api/assistant.ts`, never by browser code.
- No Groq request is made directly from the browser.
- The API key is excluded through `.gitignore` and is not part of the Vite bundle.
- Input length is capped at 1000 characters.
- The function applies a per-instance, per-IP limit of 10 requests per minute and returns `429` with `Retry-After` when exceeded.
- Server errors are logged server-side without returning secrets or provider internals to visitors.
- The assistant prompt is constrained to Toni's documented portfolio information and instructs the model not to invent experience or credentials.

## Deployment

Deploy through the connected Vercel project or with the Vercel CLI:

```bash
pnpm exec vercel --prod
```

Before deploying, set `GROQ_API_KEY` in Vercel for the relevant environment. Vercel serves the Vite build and automatically exposes `api/assistant.ts` as `/api/assistant`; `vercel.json` preserves API routing before the SPA fallback.

## License

MIT
