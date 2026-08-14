# FE-06 — Streaming AI Chat Interface

## Overview

For FE-06, I implemented a streaming AI assistant directly into my cybersecurity portfolio.

The feature is presented as **J.A.R.V.I.S.**, an AI portfolio assistant that can answer questions about my projects, skills, cybersecurity experience, and portfolio.

The implementation uses:

- React
- TypeScript
- SSE (Server-Sent Events)
- A custom client-side SSE consumer
- Groq API for AI generation
- Groq Orpheus for text-to-speech
- Server-side API routes
- AbortController for request cancellation
- Browser Audio API for voice playback

The API key is kept entirely server-side.

---

## What I Built

The central interaction is a conversational AI assistant.

A visitor can:

1. Open J.A.R.V.I.S.
2. Type a question.
3. Submit the question.
4. See the assistant enter a `thinking` state.
5. Receive the response progressively as streamed text.
6. Hear the completed response spoken using TTS.
7. Continue the conversation with additional questions.

The assistant maintains conversation history during the current session so that later questions can use previous messages as context.

---

# Architecture

The feature is split into two main parts:

```text
User
  │
  ▼
RobotAssistant.tsx
  │
  │ POST /api/assistant
  ▼
Server API Route
  │
  ├── AI model
  │
  └── TTS generation
  │
  ▼
SSE stream
  │
  ▼
RobotAssistant.tsx
  │
  ├── streamed text
  ├── thinking state
  ├── speaking state
  └── audio playback

  There is also a separate route for short ambient J.A.R.V.I.S. reactions:

RobotAssistant
      │
      ▼
POST /api/robot-reaction
      │
      ▼
Groq Orpheus TTS
      │
      ▼
Base64 WAV audio
      │
      ▼
Browser Audio API
Client: RobotAssistant.tsx

The main client component is:

src/components/robot/RobotAssistant.tsx

It is responsible for:

Rendering the chat interface
Managing user input
Managing conversation history
Consuming the SSE stream
Displaying streamed text
Managing AI states
Playing generated audio
Stopping audio
Cancelling requests
Handling errors
Managing voice preferences
AI States

The interface uses three explicit states:

type RobotState =
  | "ready"
  | "thinking"
  | "speaking";
Ready

The assistant is idle and waiting for input.

Thinking

The request has been sent and the application is waiting for the AI response.

The UI displays:

ANALYZING
Speaking

The response has been received and J.A.R.V.I.S. is playing the generated audio.

The UI displays:

SPEAKING

These states are also passed to the robot model through:

onSpeakingChange
onStateChange

This allows the 3D robot to react visually to the assistant's state.

Streaming

The server sends the response using Server-Sent Events.

The client sends:

POST /api/assistant
Content-Type: application/json
Accept: text/event-stream

The request contains:

{
  question,
  history
}

The client then reads the response using:

const reader = response.body.getReader();

and:

const decoder = new TextDecoder();

The incoming stream is buffered and separated into SSE events.

Each event is parsed and handled according to its type.

Stream Event Types

The client understands the following events:

type StreamEvent =
  | {
      type: "chunk";
      text: string;
    }
  | {
      type: "done";
      answer: string;
    }
  | {
      type: "audio";
      audio: string | null;
      audioType: string;
    }
  | {
      type: "complete";
    }
  | {
      type: "error";
      error: string;
    };
chunk

A partial AI response.

Each chunk is appended to the currently displayed response:

streamedAnswer += streamEvent.text;

The UI is updated immediately.

This creates the visible streaming effect instead of waiting for the complete response.

done

This event contains the final AI answer.

The final answer is stored in the temporary conversation history:

{
  role: "user",
  content: question
}

{
  role: "assistant",
  content: finalAnswer
}

Only the most recent messages are kept to prevent the conversation context from growing indefinitely.

audio

The server can return generated speech as Base64 audio.

The client converts it into a Blob:

Base64
   ↓
Uint8Array
   ↓
Blob
   ↓
Object URL
   ↓
HTMLAudioElement

The generated audio is then played through the browser.

complete

Signals that the server has finished sending the response.

If no audio was generated, the interface safely returns to the ready state.

error

Server-side errors are converted into a user-visible error state without crashing the interface.

Request Cancellation

The interface uses AbortController to prevent stale requests.

Before sending a new request, an existing request is cancelled:

abortControllerRef.current?.abort();

Each request also receives its own request ID.

This prevents an older asynchronous response from modifying the state of a newer request.

The mechanism is:

Request A
   │
   ├── requestId = 1
   │
   ▼
Request B starts
   │
   ├── requestId = 2
   │
   ▼
Request A finishes late
   │
   └── ignored because 1 !== 2

This is important for preventing race conditions.

Conversation State

Conversation history is stored in React state:

const [conversation, setConversation] =
  useState<ConversationMessage[]>([]);

Before a new request, the latest messages are sent to the server:

const history =
  conversation.slice(
    -MAX_CONVERSATION_MESSAGES,
  );

The current implementation keeps:

MAX_CONVERSATION_MESSAGES = 8;

This allows multiple turns without allowing the request context to grow indefinitely.

The conversation is intentionally session-based rather than permanently stored.

Voice System

The assistant uses Groq's Orpheus text-to-speech model.

The generated audio is returned by the server and played dynamically.

No audio files are required for the AI responses.

The browser creates an object URL:

URL.createObjectURL(blob)

and plays it through:

new Audio(audioUrl)

After playback, the object URL is revoked to avoid unnecessary memory usage.

Voice Controls

The interface includes a voice toggle.

When voice is disabled:

Current audio is stopped.
New audio is not played.
The AI text functionality remains available.

This separates the AI interaction from the optional voice layer.

Ambient J.A.R.V.I.S. Presence

I also added a small ambient interaction layer.

The goal is not to constantly interrupt the visitor.

Instead, after the visitor has interacted with the website, J.A.R.V.I.S. can occasionally make a short contextual comment.

Examples include:

"Still here if you need me."

"Everything appears to be running smoothly."

"No suspicious activity detected. For now."

The delay is randomized between:

60 seconds

and:

90 seconds

This prevents the interaction from feeling like a repetitive timer.

Ambient Safety Rules

Ambient speech only happens when:

The assistant is open.
Voice is enabled.
The visitor has already interacted with the page.
J.A.R.V.I.S. is not thinking.
J.A.R.V.I.S. is not already speaking.

Ambient reactions never intentionally interrupt an active conversation.

Autoplay Protection

Browsers restrict audio playback that begins without user interaction.

To avoid unexpected autoplay failures, the application records whether the visitor has interacted with the page:

audioUnlockedRef

Ambient voice is not attempted before that interaction.

This makes the voice system more compatible with browser autoplay policies.

3D Robot Integration

The chat assistant is connected to the 3D J.A.R.V.I.S. model.

The parent component can receive:

onSpeakingChange

and:

onStateChange

The robot can therefore react to:

READY
   ↓
THINKING
   ↓
SPEAKING
   ↓
READY

The voice state is not only a UI label — it can also drive the robot's visual behavior.

Mobile Design

The assistant uses a responsive container:

w-[calc(100%-2rem)]
max-w-[520px]

This keeps the interface usable on narrow screens while preventing it from becoming excessively wide on desktop.

The input is flexible and the send button remains available at phone widths.

Security

The Groq API key is never exposed to the browser.

The client only communicates with:

/api/assistant
/api/robot-reaction

The server-side route is responsible for communicating with Groq.

Therefore:

Browser
  │
  │ no API key
  ▼
Portfolio API route
  │
  │ GROQ_API_KEY
  ▼
Groq

The secret is stored in the server environment rather than client-side JavaScript.

Why SSE Instead of useChat

The assignment allows a custom SSE consumer.

Instead of using the AI SDK useChat hook, I implemented the streaming client manually.

This gave me direct control over:

Stream event handling
Request cancellation
Robot state synchronization
TTS timing
Audio lifecycle
Ambient reactions
Error handling

The implementation therefore demonstrates the underlying streaming concepts rather than relying entirely on a pre-built chat abstraction.

Result

The completed feature provides:

Streaming AI responses
Multi-turn conversation
Thinking state
Speaking state
Voice output
Voice toggle
Request cancellation
Server-side API key protection
Responsive mobile UI
3D robot state integration
Ambient AI presence
Error handling
SSE-based client streaming

The result is a portfolio interaction that behaves more like an AI product interface than a traditional static chatbot.