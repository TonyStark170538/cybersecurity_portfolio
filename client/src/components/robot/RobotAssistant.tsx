import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Send,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";

type RobotState =
  | "ready"
  | "thinking"
  | "speaking";

type ConversationMessage = {
  role: "user" | "assistant";
  content: string;
};

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

type Props = {
  open: boolean;
  onClose: () => void;
  onSpeakingChange?: (
    speaking: boolean,
  ) => void;
  onStateChange?: (
    state: RobotState,
  ) => void;
};

const MAX_CONVERSATION_MESSAGES = 8;

export default function RobotAssistant({
  open,
  onClose,
  onSpeakingChange,
  onStateChange,
}: Props) {
  const [input, setInput] =
    useState("");

  const [state, setState] =
    useState<RobotState>("ready");

  const [transcript, setTranscript] =
    useState("");

  const [voiceEnabled, setVoiceEnabled] =
    useState(true);

  const [conversation, setConversation] =
    useState<ConversationMessage[]>([]);

  const audioRef =
    useRef<HTMLAudioElement | null>(
      null,
    );

  const audioUrlRef =
    useRef<string | null>(null);

  const requestIdRef =
    useRef(0);

  const abortControllerRef =
    useRef<AbortController | null>(
      null,
    );

  const voiceEnabledRef =
    useRef(true);

  useEffect(() => {
    voiceEnabledRef.current =
      voiceEnabled;
  }, [voiceEnabled]);

  /*
   * Cleanup when component unmounts.
   */

  useEffect(() => {
    return () => {
      requestIdRef.current += 1;

      abortControllerRef.current?.abort();

      cleanupAudio();
    };
  }, []);

  /*
   * Synchronize robot visual state.
   */

  useEffect(() => {
    onSpeakingChange?.(
      state === "speaking",
    );

    onStateChange?.(state);
  }, [
    state,
    onSpeakingChange,
    onStateChange,
  ]);

  /*
   * BASE64 → AUDIO
   */

  function base64ToBlob(
    base64: string,
    mimeType: string,
  ) {
    const byteCharacters =
      atob(base64);

    const byteNumbers = new Array(
      byteCharacters.length,
    );

    for (
      let i = 0;
      i < byteCharacters.length;
      i++
    ) {
      byteNumbers[i] =
        byteCharacters.charCodeAt(i);
    }

    const byteArray =
      new Uint8Array(byteNumbers);

    return new Blob(
      [byteArray],
      {
        type: mimeType,
      },
    );
  }

  /*
   * CLEAN AUDIO
   */

  function cleanupAudio() {
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;

      audioRef.current.pause();

      audioRef.current.currentTime = 0;

      audioRef.current = null;
    }

    if (audioUrlRef.current) {
      URL.revokeObjectURL(
        audioUrlRef.current,
      );

      audioUrlRef.current = null;
    }
  }

  /*
   * PLAY J.A.R.V.I.S. VOICE
   */

  async function speak(
    audioBase64: string,
    audioType: string,
    requestId: number,
  ) {
    if (!voiceEnabledRef.current) {
      setState("ready");
      return;
    }

    if (
      requestId !== requestIdRef.current
    ) {
      return;
    }

    try {
      cleanupAudio();

      const blob =
        base64ToBlob(
          audioBase64,
          audioType || "audio/wav",
        );

      const audioUrl =
        URL.createObjectURL(blob);

      audioUrlRef.current =
        audioUrl;

      const audio =
        new Audio(audioUrl);

      audioRef.current =
        audio;

      if (
        requestId !==
        requestIdRef.current
      ) {
        cleanupAudio();
        return;
      }

      setState("speaking");

      audio.onended = () => {
        cleanupAudio();

        if (
          requestId ===
          requestIdRef.current
        ) {
          setState("ready");
        }
      };

      audio.onerror = () => {
        cleanupAudio();

        if (
          requestId ===
          requestIdRef.current
        ) {
          setState("ready");
        }
      };

      await audio.play();
    } catch (error) {
      console.error(
        "J.A.R.V.I.S. voice error:",
        error,
      );

      cleanupAudio();

      if (
        requestId ===
        requestIdRef.current
      ) {
        setState("ready");
      }
    }
  }

  /*
   * STOP SPEAKING
   */

  function stopSpeaking() {
    cleanupAudio();

    setState("ready");
  }

  /*
   * PARSE ONE SSE EVENT
   */

  function parseStreamEvent(
    rawEvent: string,
  ): StreamEvent | null {
    const lines =
      rawEvent.split("\n");

    const dataLines = lines
      .filter((line) =>
        line.startsWith("data:"),
      )
      .map((line) =>
        line.slice(5).trim(),
      );

    if (dataLines.length === 0) {
      return null;
    }

    const data = dataLines.join("\n");

    try {
      return JSON.parse(
        data,
      ) as StreamEvent;
    } catch {
      console.warn(
        "Unable to parse J.A.R.V.I.S. stream event:",
        data,
      );

      return null;
    }
  }

  /*
   * SEND QUESTION
   */

  async function sendMessage(
    event: FormEvent,
  ) {
    event.preventDefault();

    const question =
      input.trim();

    if (
      !question ||
      state === "thinking" ||
      state === "speaking"
    ) {
      return;
    }

    /*
     * Invalidate any previous request.
     */

    abortControllerRef.current?.abort();

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    const requestId =
      requestIdRef.current + 1;

    requestIdRef.current =
      requestId;

    setInput("");
    setTranscript("");
    setState("thinking");

    /*
     * Keep the current session context.
     *
     * Do NOT add the current question here.
     * The server receives it separately.
     */

    const history =
      conversation.slice(
        -MAX_CONVERSATION_MESSAGES,
      );

    let streamedAnswer = "";
    let responseCompleted = false;
    let audioReceived = false;

    try {
      const response =
        await fetch(
          "/api/assistant",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",

              Accept:
                "text/event-stream",
            },

            signal:
              controller.signal,

            body: JSON.stringify({
              question,
              history,
            }),
          },
        );

      if (
        requestId !==
        requestIdRef.current
      ) {
        return;
      }

      if (!response.ok) {
        let errorMessage =
          "AI service unavailable.";

        try {
          const errorData =
            await response.json();

          if (
            typeof errorData ===
              "object" &&
            errorData !== null &&
            "error" in errorData &&
            typeof errorData.error ===
              "string"
          ) {
            errorMessage =
              errorData.error;
          }
        } catch {
          // Keep fallback error.
        }

        throw new Error(
          errorMessage,
        );
      }

      if (!response.body) {
        throw new Error(
          "Streaming is not available.",
        );
      }

      const reader =
        response.body.getReader();

      const decoder =
        new TextDecoder();

      let buffer = "";

      while (true) {
        const {
          value,
          done,
        } = await reader.read();

        if (
          requestId !==
          requestIdRef.current
        ) {
          reader.cancel().catch(() => {});
          return;
        }

        if (done) {
          break;
        }

        buffer += decoder.decode(
          value,
          {
            stream: true,
          },
        );

        const events =
          buffer.split(
            "\n\n",
          );

        buffer =
          events.pop() ?? "";

        for (const rawEvent of events) {
          if (
            requestId !==
            requestIdRef.current
          ) {
            return;
          }

          const streamEvent =
            parseStreamEvent(
              rawEvent,
            );

          if (!streamEvent) {
            continue;
          }

          switch (
            streamEvent.type
          ) {
            case "chunk": {
              streamedAnswer +=
                streamEvent.text;

              /*
               * THIS is the actual
               * visible streaming behavior.
               */

              setTranscript(
                streamedAnswer,
              );

              break;
            }

            case "done": {
              const finalAnswer =
                streamEvent.answer.trim();

              if (finalAnswer) {
                streamedAnswer =
                  finalAnswer;

                setTranscript(
                  finalAnswer,
                );

                responseCompleted =
                  true;

                /*
                 * Add the completed turn
                 * to temporary session state.
                 *
                 * It is NOT persisted anywhere.
                 */

                setConversation(
                  (previous) => {
                    const next = [
                      ...previous,
                      {
                        role: "user" as const,
                        content: question,
                      },
                      {
                        role: "assistant" as const,
                        content:
                          finalAnswer,
                      },
                    ];

                    return next.slice(
                      -MAX_CONVERSATION_MESSAGES,
                    );
                  },
                );
              }

              break;
            }

            case "audio": {
              if (
                !responseCompleted
              ) {
                break;
              }

              if (
                requestId !==
                requestIdRef.current
              ) {
                return;
              }

              if (
                streamEvent.audio
              ) {
                audioReceived = true;

                await speak(
                  streamEvent.audio,
                  streamEvent.audioType ||
                    "audio/wav",
                  requestId,
                );
              } else {
                setState("ready");
              }

              break;
            }

            case "complete": {
              /*
               * If voice is disabled or TTS
               * failed, finish cleanly.
               */

              if (
                requestId ===
                  requestIdRef.current &&
                !audioReceived
              ) {
                setState("ready");
              }

              break;
            }

            case "error": {
              throw new Error(
                streamEvent.error ||
                  "AI service unavailable.",
              );
            }
          }
        }
      }

      /*
       * Handle any final buffered SSE event.
       */

      if (buffer.trim()) {
        const streamEvent =
          parseStreamEvent(
            buffer,
          );

        if (
          streamEvent?.type ===
          "chunk"
        ) {
          streamedAnswer +=
            streamEvent.text;

          setTranscript(
            streamedAnswer,
          );
        }
      }

      /*
       * Fallback in case the backend
       * completed without sending audio.
       */

      if (
        requestId ===
          requestIdRef.current &&
        responseCompleted &&
        !audioReceived &&
        !voiceEnabledRef.current
      ) {
        setState("ready");
      }
    } catch (error) {
      if (
        controller.signal.aborted ||
        requestId !==
          requestIdRef.current
      ) {
        return;
      }

      console.error(
        "J.A.R.V.I.S. error:",
        error,
      );

      setTranscript(
        error instanceof Error
          ? error.message
          : "I'm having trouble connecting to my AI system right now.",
      );

      setState("ready");
    } finally {
      if (
        requestId ===
        requestIdRef.current
      ) {
        abortControllerRef.current =
          null;
      }
    }
  }

  /*
   * CLOSE ASSISTANT
   */

  function closeAssistant() {
    /*
     * Make every outstanding async
     * callback stale immediately.
     */

    requestIdRef.current += 1;

    /*
     * Abort network request.
     */

    abortControllerRef.current?.abort();

    abortControllerRef.current =
      null;

    /*
     * Stop audio immediately.
     */

    cleanupAudio();

    /*
     * IMPORTANT:
     * The temporary conversation disappears
     * when this interaction closes.
     */

    setConversation([]);

    setTranscript("");
    setInput("");
    setState("ready");

    onClose();
  }

  /*
   * If muted while speaking,
   * stop current speech.
   */

  function toggleVoice() {
    if (state === "speaking") {
      stopSpeaking();
    }

    setVoiceEnabled(
      (current) => {
        const next =
          !current;

        voiceEnabledRef.current =
          next;

        return next;
      },
    );
  }

  /*
   * Don't render while closed.
   */

  if (!open) {
    return null;
  }

  return (
    <div
      className="
        fixed
        z-50

        left-1/2
        -translate-x-1/2

        bottom-5

        w-[calc(100%-2rem)]
        max-w-[520px]

        overflow-hidden

        rounded-2xl

        border
        border-cyan-400/25

        bg-[#05070D]/90
        backdrop-blur-2xl

        shadow-[0_0_80px_rgba(0,255,255,0.12)]

        animate-in
        fade-in
        slide-in-from-bottom-4
        duration-300
      "
    >
      {/* HEADER */}

      <div
        className="
          flex
          items-center
          justify-between

          px-5
          py-4

          border-b
          border-cyan-400/10
        "
      >
        <div>
          <div
            className="
              font-mono
              text-[10px]
              tracking-[0.3em]
              uppercase
              text-cyan-400
            "
          >
            J.A.R.V.I.S.
          </div>

          <div
            className="
              mt-1
              text-xs
              text-white/50
            "
          >
            {state === "thinking"
              ? "PROCESSING REQUEST"
              : state ===
                "speaking"
              ? "VOICE OUTPUT ACTIVE"
              : "SYSTEM ONLINE"}
          </div>
        </div>

        <div
          className="
            flex
            items-center
            gap-1
          "
        >
          {/* VOICE */}

          <button
            type="button"
            onClick={toggleVoice}
            className="
              p-2
              rounded-lg

              text-cyan-300

              hover:bg-cyan-400/10

              transition
            "
            aria-label={
              voiceEnabled
                ? "Mute J.A.R.V.I.S."
                : "Enable J.A.R.V.I.S."
            }
          >
            {voiceEnabled ? (
              <Volume2
                size={17}
              />
            ) : (
              <VolumeX
                size={17}
              />
            )}
          </button>

          {/* CLOSE */}

          <button
            type="button"
            onClick={
              closeAssistant
            }
            className="
              p-2
              rounded-lg

              text-white/40

              hover:text-white
              hover:bg-white/5

              transition
            "
            aria-label="Close J.A.R.V.I.S."
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* ROBOT STATUS */}

      <div
        className="
          px-6
          py-8
          text-center
        "
      >
        <div
          className={`
            mx-auto

            w-3
            h-3

            rounded-full

            transition-all
            duration-500

            ${
              state === "thinking"
                ? `
                  bg-purple-400

                  shadow-[0_0_28px_8px_rgba(168,85,247,.35)]

                  animate-pulse
                `
                : state === "speaking"
                  ? `
                    bg-cyan-300

                    shadow-[0_0_35px_10px_rgba(34,211,238,.45)]

                    animate-pulse
                  `
                  : `
                    bg-cyan-400

                    shadow-[0_0_20px_5px_rgba(34,211,238,.25)]
                  `
            }
          `}
        />

        <div
          className="
            mt-4

            font-mono
            text-[10px]

            tracking-[0.25em]

            text-white/35
          "
        >
          {state === "thinking"
            ? "ANALYZING"
            : state === "speaking"
              ? "SPEAKING"
              : "READY"}
        </div>

        {/* RESPONSE */}

        {transcript && (
          <div
            aria-live="polite"
            className="
              mt-5
              mx-auto
              max-w-[430px]

              text-sm
              leading-relaxed

              text-white/55
            "
          >
            {transcript}
          </div>
        )}
      </div>

      {/* INPUT */}

      <form
        onSubmit={sendMessage}
        className="
          border-t
          border-cyan-400/10

          p-4
        "
      >
        <div
          className="
            flex
            items-center
            gap-2

            rounded-xl

            border
            border-white/10

            bg-black/30

            px-3
            py-2
          "
        >
          <input
            value={input}
            onChange={(event) =>
              setInput(
                event.target.value,
              )
            }
            disabled={
              state === "thinking" ||
              state === "speaking"
            }
            maxLength={1000}
            placeholder={
              state === "speaking"
                ? "J.A.R.V.I.S. is speaking..."
                : "Ask J.A.R.V.I.S. something..."
            }
            className="
              flex-1
              min-w-0

              bg-transparent

              outline-none

              text-sm
              text-white

              placeholder:text-white/25
            "
          />

          <button
            type="submit"
            disabled={
              !input.trim() ||
              state === "thinking" ||
              state === "speaking"
            }
            className="
              flex
              items-center
              justify-center

              shrink-0

              w-9
              h-9

              rounded-lg

              bg-cyan-400

              text-black

              hover:bg-cyan-300

              disabled:opacity-20
              disabled:cursor-not-allowed

              transition
            "
            aria-label="Ask J.A.R.V.I.S."
          >
            <Send size={15} />
          </button>
        </div>

        <div
          className="
            mt-2

            text-center

            font-mono
            text-[9px]

            tracking-[0.18em]

            text-white/20
          "
        >
          AI PORTFOLIO ASSISTANT
          {" • "}
          {voiceEnabled
            ? "VOICE ENABLED"
            : "VOICE MUTED"}
        </div>
      </form>
    </div>
  );
}