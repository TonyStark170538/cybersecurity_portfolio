import Groq from "groq-sdk";

type ReactionContext =
  | "projects"
  | "contact"
  | "cv"
  | "skills"
  | "about"
  | "security"
  | "ai"
  | "pink-panther"
  | "jarvis"
  | "terminal"
  | "general";

type ReactionRequest = {
  context: ReactionContext;
  project?: string;
};

const reactions: Record<ReactionContext, string[]> = {
  projects: [
    "Now we're getting into the interesting stuff. I approve.",
    "Projects detected. Excellent. Finally, something I can judge.",
    "A portfolio full of projects. Much better than another TODO app.",
    "Let's inspect the engineering. I promise not to be too critical.",
  ],

  contact: [
    "Excellent choice. Communication is usually more efficient than debugging.",
    "Someone wants to get in touch. I'll try to remain professional.",
    "Contact section detected. This could be the beginning of something interesting.",
    "Message channel ready. Please try not to send me your API key.",
  ],

  cv: [
    "Ah, the résumé. The traditional human method of proving you can do things.",
    "CV detected. Fortunately, I already know quite a lot about Toni.",
    "Preparing the credentials. Try to look impressed.",
  ],

  skills: [
    "Skills detected. A surprisingly dangerous collection of technologies.",
    "Technical capabilities identified. I approve of the security focus.",
    "React, cloud, AI and security. Someone clearly enjoys complexity.",
  ],

  about: [
    "You want to know more about Toni. Excellent decision.",
    "Background information incoming. Try to keep up.",
    "I have analyzed the profile. There is considerably more going on than the homepage suggests.",
  ],

  security: [
    "Security detected. Now we're speaking my language.",
    "Threat modeling? Finally, someone is asking the important questions.",
    "Security first. A surprisingly underrated concept.",
    "I checked the logs. Everything looks suspicious. Just kidding.",
  ],

  ai: [
    "AI detected. Obviously, I approve.",
    "Now we're entering my department.",
    "Artificial intelligence. My favorite topic. Besides myself, obviously.",
  ],

  "pink-panther": [
    "Ah, frontend engineering. Even I appreciate good design.",
    "A little less security, a little more style. I can work with that.",
    "Don't worry. Not every system needs a SOC.",
    "Interesting design choice. I won't pretend I wasn't impressed.",
  ],

  jarvis: [
    "Now we're speaking my language.",
    "You found my favorite project. Coincidence? I think not.",
    "Security platform detected. I feel strangely at home here.",
    "Threat intelligence, monitoring and incident response. Finally, something serious.",
  ],

  terminal: [
    "AI, data and financial intelligence. An ambitious combination.",
    "This one has enough moving parts to keep me busy.",
    "Financial intelligence detected. I approve of the analytical approach.",
    "Now we're getting into the AI side. Excellent choice.",
  ],

  general: [
    "Everything is under control. Probably.",
    "I would make a cybersecurity joke, but someone might patch it.",
    "I've analyzed the situation. Coffee would improve it.",
    "System functioning normally. Suspiciously normally.",
    "I checked everything twice. You're welcome.",
    "No critical vulnerabilities detected. At least not yet.",
    "I am currently pretending this was all part of the plan.",
  ],
};

const projectSpecific: Record<string, string[]> = {
  "AI Portfolio Terminal": reactions.terminal,

  "J.A.R.V.I.S. Cybersecurity Platform":
    reactions.jarvis,

  "Pink Panther":
    reactions["pink-panther"],
};

function getRandomReaction(
  context: ReactionContext,
  project?: string,
) {
  const pool =
    project && projectSpecific[project]
      ? projectSpecific[project]
      : reactions[context];

  return pool[
    Math.floor(Math.random() * pool.length)
  ];
}

export default async function handler(
  req: {
    method?: string;
    body?: unknown;
  },
  res: {
    status: (code: number) => {
      json: (body: unknown) => unknown;
    };
    setHeader: (
      name: string,
      value: string,
    ) => void;
    end: () => void;
  },
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  if (!process.env.GROQ_API_KEY) {
    console.error(
      "GROQ_API_KEY is not configured.",
    );

    return res.status(500).json({
      error:
        "Robot voice is temporarily unavailable.",
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : req.body;

    if (
      typeof body !== "object" ||
      body === null
    ) {
      return res.status(400).json({
        error: "Invalid request body.",
      });
    }

    const request =
      body as Partial<ReactionRequest>;

    const context =
      request.context ?? "general";

    const reaction =
      getRandomReaction(
        context,
        request.project,
      );

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    /*
     * Generate the reaction using the same
     * J.A.R.V.I.S. voice as the main assistant.
     */

    const speech =
      await groq.audio.speech.create({
        model: "playai-tts",
        voice: "Fritz-PlayAI",
        input: reaction,
        response_format: "wav",
      });

    const audioBuffer = Buffer.from(
      await speech.arrayBuffer(),
    );

    res.setHeader(
      "Content-Type",
      "application/json",
    );

    return res.status(200).json({
      text: reaction,
      audio: audioBuffer.toString("base64"),
      audioType: "audio/wav",
    });
  } catch (error) {
    console.error(
      "J.A.R.V.I.S. reaction error:",
      error,
    );

    return res.status(500).json({
      error:
        "Robot reaction could not be generated.",
    });
  }
}