import {
  FormEvent,
  useCallback,
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

const FALLBACK_AUDIO_TYPE = "audio/wav";

/*
 * ============================================================
 * J.A.R.V.I.S. AMBIENT PRESENCE
 * ============================================================
 *
 * Random interval:
 *
 * 45–75 seconds
 *
 * This is frequent enough to make J.A.R.V.I.S. feel present,
 * but not so frequent that he becomes annoying.
 */

const AMBIENT_MIN_DELAY = 45_000;
const AMBIENT_MAX_DELAY = 75_000;

/*
 * After the user sends a question, give them some quiet time.
 *
 * This prevents:
 *
 * User asks something
 *       ↓
 * J.A.R.V.I.S. answers
 *       ↓
 * 10 seconds later
 * J.A.R.V.I.S. talks again
 *
 * Instead, we wait at least 60 seconds after interaction.
 */
const AMBIENT_INTERACTION_COOLDOWN = 60_000;

export default function RobotAssistant({
  open,
  onClose,
  onSpeakingChange,
  onStateChange,
}: Props) {
  const [input, setInput] = useState("");

  const [state, setState] =
    useState<RobotState>("ready");

  const [transcript, setTranscript] =
    useState("");

  const [voiceEnabled, setVoiceEnabled] =
    useState(true);

  const [conversation, setConversation] =
    useState<ConversationMessage[]>([]);

  /*
   * ==========================================================
   * AUDIO
   * ==========================================================
   */

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const audioUrlRef =
    useRef<string | null>(null);

  /*
   * ==========================================================
   * REQUEST CONTROL
   * ==========================================================
   */

  const requestIdRef = useRef(0);

  const abortControllerRef =
    useRef<AbortController | null>(null);

  /*
   * Always-current voice state.
   */
  const voiceEnabledRef =
    useRef(true);

  /*
   * ==========================================================
   * AUDIO UNLOCK
   * ==========================================================
   *
   * Browsers usually block autoplay until the user interacts
   * with the page.
   */

  const audioUnlockedRef =
    useRef(false);

  /*
   * ==========================================================
   * AMBIENT PRESENCE
   * ==========================================================
   */

  const ambientTimerRef =
    useRef<ReturnType<typeof setTimeout> | null>(
      null,
    );

  /*
   * Prevent multiple ambient requests
   * from being started at the same time.
   */
  const ambientRunningRef =
    useRef(false);

  /*
   * Last time the user actively interacted
   * with J.A.R.V.I.S.
   */
  const lastInteractionRef =
    useRef(0);

  /*
   * ==========================================================
   * KEEP VOICE REF SYNCHRONIZED
   * ==========================================================
   */

  useEffect(() => {
    voiceEnabledRef.current =
      voiceEnabled;
  }, [voiceEnabled]);

  /*
   * ==========================================================
   * BASE64 → AUDIO BLOB
   * ==========================================================
   */

  function base64ToBlob(
    base64: string,
    mimeType: string,
  ) {
    const byteCharacters =
      atob(base64);

    const byteNumbers =
      new Array(
        byteCharacters.length,
      );

    for (
      let i = 0;
      i < byteCharacters.length;
      i += 1
    ) {
      byteNumbers[i] =
        byteCharacters.charCodeAt(i);
    }

    const byteArray =
      new Uint8Array(
        byteNumbers,
      );

    return new Blob(
      [byteArray],
      {
        type:
          mimeType ||
          FALLBACK_AUDIO_TYPE,
      },
    );
  }

  /*
   * ==========================================================
   * CLEAN AUDIO
   * ==========================================================
   */

  function cleanupAudio() {
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;

      audioRef.current.pause();

      try {
        audioRef.current.currentTime = 0;
      } catch {
        // Ignore cleanup errors.
      }

      audioRef.current.src = "";

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
   * ==========================================================
   * PLAY J.A.R.V.I.S. VOICE
   * ==========================================================
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
      requestId !==
      requestIdRef.current
    ) {
      return;
    }

    if (!audioBase64) {
      setState("ready");
      return;
    }

    try {
      /*
       * Always stop previous audio first.
       */
      cleanupAudio();

      const blob =
        base64ToBlob(
          audioBase64,
          audioType ||
            FALLBACK_AUDIO_TYPE,
        );

      const audioUrl =
        URL.createObjectURL(blob);

      audioUrlRef.current =
        audioUrl;

      const audio =
        new Audio(audioUrl);

      audio.preload = "auto";

      audioRef.current =
        audio;

      /*
       * Make sure this request is still valid.
       */
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
        console.error(
          "J.A.R.V.I.S. audio playback error.",
        );

        cleanupAudio();

        if (
          requestId ===
          requestIdRef.current
        ) {
          setState("ready");
        }
      };

      await audio.play();

      if (
        requestId ===
        requestIdRef.current
      ) {
        setState("speaking");
      }
    } catch (error) {
      console.error(
        "J.A.R.V.I.S. voice playback failed:",
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
   * ==========================================================
   * STOP SPEAKING
   * ==========================================================
   */

  function stopSpeaking() {
    cleanupAudio();

    setState("ready");
  }

  /*
   * ==========================================================
   * PARSE SSE EVENT
   * ==========================================================
   */

  function parseStreamEvent(
    rawEvent: string,
  ): StreamEvent | null {
    const lines =
      rawEvent.split("\n");

    const dataLines =
      lines
        .filter((line) =>
          line.startsWith("data:"),
        )
        .map((line) =>
          line.slice(5).trim(),
        );

    if (dataLines.length === 0) {
      return null;
    }

    const data =
      dataLines.join("\n");

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
   * ==========================================================
   * SCHEDULE AMBIENT REACTION
   * ==========================================================
   *
   * Uses a random delay so J.A.R.V.I.S. doesn't feel like
   * a predictable timer.
   */

  const scheduleAmbientReaction =
    useCallback(() => {
      /*
       * Remove existing timer.
       */
      if (
        ambientTimerRef.current
      ) {
        clearTimeout(
          ambientTimerRef.current,
        );

        ambientTimerRef.current =
          null;
      }

      /*
       * Don't schedule when assistant is closed.
       */
      if (!open) {
        return;
      }

      /*
       * Don't schedule when voice is muted.
       */
      if (!voiceEnabledRef.current) {
        return;
      }

      /*
       * Don't schedule until browser audio has
       * been unlocked by user interaction.
       */
      if (!audioUnlockedRef.current) {
        return;
      }

      const randomDelay =
        AMBIENT_MIN_DELAY +
        Math.random() *
          (AMBIENT_MAX_DELAY -
            AMBIENT_MIN_DELAY);

      ambientTimerRef.current =
        setTimeout(() => {
          void speakAmbientReaction();
        }, randomDelay);
    }, [open]);

  /*
   * ==========================================================
   * AMBIENT REACTION
   * ==========================================================
   */

  async function speakAmbientReaction() {
    /*
     * Don't do anything if assistant is closed.
     */
    if (!open) {
      return;
    }

    /*
     * Voice disabled.
     */
    if (!voiceEnabledRef.current) {
      return;
    }

    /*
     * Prevent duplicate ambient requests.
     */
    if (ambientRunningRef.current) {
      scheduleAmbientReaction();
      return;
    }

    /*
     * Never interrupt an active conversation.
     */
    if (
      state === "thinking" ||
      state === "speaking"
    ) {
      scheduleAmbientReaction();
      return;
    }

    /*
     * Don't speak immediately after user interaction.
     */
    const timeSinceInteraction =
      Date.now() -
      lastInteractionRef.current;

    if (
      timeSinceInteraction <
      AMBIENT_INTERACTION_COOLDOWN
    ) {
      const remaining =
        AMBIENT_INTERACTION_COOLDOWN -
        timeSinceInteraction;

      /*
       * Wait until cooldown expires, then add
       * a small random amount.
       */
      ambientTimerRef.current =
        setTimeout(
          () => {
            void speakAmbientReaction();
          },
          remaining +
            Math.random() * 15_000,
        );

      return;
    }

    /*
     * Browser audio isn't unlocked yet.
     */
    if (!audioUnlockedRef.current) {
      scheduleAmbientReaction();
      return;
    }

    ambientRunningRef.current =
      true;

    try {
      const response =
        await fetch(
          "/api/robot-reaction",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              context: "general",
            }),
          },
        );

      if (!response.ok) {
        throw new Error(
          "Ambient reaction request failed.",
        );
      }

      const data =
        (await response.json()) as {
          audio?: string;
          audioType?: string;
          text?: string;
        };

      /*
       * User may have started interacting while
       * the backend was generating speech.
       */
      if (
        state === "thinking" ||
        state === "speaking" ||
        !voiceEnabledRef.current
      ) {
        return;
      }

      if (!data.audio) {
        console.warn(
          "J.A.R.V.I.S. ambient reaction contained no audio.",
        );

        return;
      }

      /*
       * Use the current request identity.
       *
       * Ambient speech does NOT invalidate a normal
       * assistant request.
       */
      const requestId =
        requestIdRef.current;

      await speak(
        data.audio,
        data.audioType ||
          FALLBACK_AUDIO_TYPE,
        requestId,
      );
    } catch (error) {
      console.warn(
        "J.A.R.V.I.S. ambient reaction failed:",
        error,
      );
    } finally {
      ambientRunningRef.current =
        false;

      /*
       * Always schedule another ambient check.
       */
      scheduleAmbientReaction();
    }
  }

  /*
   * ==========================================================
   * AUDIO UNLOCK + INITIAL AMBIENT PRESENCE
   * ==========================================================
   */

  useEffect(() => {
    const unlockAudio = () => {
      audioUnlockedRef.current =
        true;

      /*
       * Record this as user activity.
       */
      lastInteractionRef.current =
        Date.now();

      /*
       * We intentionally DON'T speak immediately.
       *
       * Instead, J.A.R.V.I.S. waits a random
       * 45–75 seconds.
       */
      if (open) {
        scheduleAmbientReaction();
      }
    };

    window.addEventListener(
      "pointerdown",
      unlockAudio,
      { once: true },
    );

    window.addEventListener(
      "keydown",
      unlockAudio,
      { once: true },
    );

    return () => {
      window.removeEventListener(
        "pointerdown",
        unlockAudio,
      );

      window.removeEventListener(
        "keydown",
        unlockAudio,
      );
    };
  }, [
    open,
    scheduleAmbientReaction,
  ]);

  /*
   * ==========================================================
   * HANDLE OPEN/CLOSE
   * ==========================================================
   *
   * When the assistant opens, start the ambient timer.
   *
   * When it closes, completely remove it.
   */

  useEffect(() => {
    if (!open) {
      if (
        ambientTimerRef.current
      ) {
        clearTimeout(
          ambientTimerRef.current,
        );

        ambientTimerRef.current =
          null;
      }

      return;
    }

    /*
     * If the browser is already unlocked,
     * schedule ambient presence.
     */
    if (
      audioUnlockedRef.current &&
      voiceEnabledRef.current
    ) {
      scheduleAmbientReaction();
    }

    return () => {
      if (
        ambientTimerRef.current
      ) {
        clearTimeout(
          ambientTimerRef.current,
        );

        ambientTimerRef.current =
          null;
      }
    };
  }, [
    open,
    scheduleAmbientReaction,
  ]);

  /*
   * ==========================================================
   * CLEANUP ON UNMOUNT
   * ==========================================================
   */

  useEffect(() => {
    return () => {
      requestIdRef.current += 1;

      abortControllerRef.current?.abort();

      if (
        ambientTimerRef.current
      ) {
        clearTimeout(
          ambientTimerRef.current,
        );

        ambientTimerRef.current =
          null;
      }

      cleanupAudio();
    };
  }, []);

  /*
   * ==========================================================
   * SYNCHRONIZE ROBOT VISUAL STATE
   * ==========================================================
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
   * ==========================================================
   * SEND QUESTION
   * ==========================================================
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
     * IMPORTANT:
     * User interaction resets ambient timing.
     */
    lastInteractionRef.current =
      Date.now();

    /*
     * Cancel any existing request.
     */
    abortControllerRef.current?.abort();

    const controller =
      new AbortController();

    abortControllerRef.current =
      controller;

    /*
     * Create new request identity.
     */
    const requestId =
      requestIdRef.current + 1;

    requestIdRef.current =
      requestId;

    /*
     * Stop any ambient timer.
     *
     * We don't want an ambient reaction
     * firing while the user is asking something.
     */
    if (
      ambientTimerRef.current
    ) {
      clearTimeout(
        ambientTimerRef.current,
      );

      ambientTimerRef.current =
        null;
    }

    setInput("");
    setTranscript("");
    setState("thinking");

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

      /*
       * Ignore stale requests.
       */
      if (
        requestId !==
        requestIdRef.current
      ) {
        return;
      }

      /*
       * HTTP error.
       */
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
          // Keep fallback.
        }

        throw new Error(
          errorMessage,
        );
      }

      /*
       * Streaming support check.
       */
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

      /*
       * ========================================================
       * READ SSE STREAM
       * ========================================================
       */

      while (true) {
        const {
          value,
          done,
        } = await reader.read();

        /*
         * Ignore stale requests.
         */
        if (
          requestId !==
          requestIdRef.current
        ) {
          reader
            .cancel()
            .catch(() => {});

          return;
        }

        if (done) {
          break;
        }

        buffer +=
          decoder.decode(
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

        for (
          const rawEvent of events
        ) {
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
            /*
             * AI TEXT CHUNK
             */
            case "chunk": {
              streamedAnswer +=
                streamEvent.text;

              setTranscript(
                streamedAnswer,
              );

              break;
            }

            /*
             * COMPLETE ANSWER
             */
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

                setConversation(
                  (previous) => {
                    const next = [
                      ...previous,

                      {
                        role:
                          "user" as const,
                        content:
                          question,
                      },

                      {
                        role:
                          "assistant" as const,
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

            /*
             * TTS AUDIO
             */
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
                !voiceEnabledRef.current
              ) {
                setState("ready");
                break;
              }

              if (
                streamEvent.audio
              ) {
                audioReceived =
                  true;

                await speak(
                  streamEvent.audio,
                  streamEvent.audioType ||
                    FALLBACK_AUDIO_TYPE,
                  requestId,
                );
              } else {
                console.warn(
                  "J.A.R.V.I.S. received no TTS audio.",
                );

                setState("ready");
              }

              break;
            }

            /*
             * STREAM COMPLETE
             */
            case "complete": {
              if (
                requestId ===
                  requestIdRef.current &&
                !audioReceived
              ) {
                setState("ready");
              }

              break;
            }

            /*
             * SERVER ERROR
             */
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
       * Handle final buffered event.
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
       * Safety fallback.
       */
      if (
        requestId ===
          requestIdRef.current &&
        responseCompleted &&
        !audioReceived
      ) {
        setState("ready");
      }
    } catch (error) {
      /*
       * Aborted requests are normal.
       */
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

      const message =
        error instanceof Error
          ? error.message
          : "I'm having trouble connecting to my AI system right now.";

      setTranscript(message);

      setState("ready");
    } finally {
      if (
        requestId ===
        requestIdRef.current
      ) {
        abortControllerRef.current =
          null;

        /*
         * User just finished interacting.
         *
         * Give them another quiet 60+ seconds
         * before ambient presence returns.
         */
        lastInteractionRef.current =
          Date.now();

        scheduleAmbientReaction();
      }
    }
  }

  /*
   * ==========================================================
   * CLOSE ASSISTANT
   * ==========================================================
   */

  function closeAssistant() {
    /*
     * Invalidate async callbacks.
     */
    requestIdRef.current += 1;

    /*
     * Abort network request.
     */
    abortControllerRef.current?.abort();

    abortControllerRef.current =
      null;

    /*
     * Stop ambient timer.
     */
    if (
      ambientTimerRef.current
    ) {
      clearTimeout(
        ambientTimerRef.current,
      );

      ambientTimerRef.current =
        null;
    }

    /*
     * Stop speech.
     */
    cleanupAudio();

    ambientRunningRef.current =
      false;

    /*
     * Clear conversation.
     */
    setConversation([]);

    setTranscript("");
    setInput("");
    setState("ready");

    onClose();
  }

  /*
   * ==========================================================
   * TOGGLE VOICE
   * ==========================================================
   */

  function toggleVoice() {
    /*
     * Stop current speech immediately.
     */
    if (state === "speaking") {
      stopSpeaking();
    }

    setVoiceEnabled(
      (current) => {
        const next = !current;

        voiceEnabledRef.current =
          next;

        if (!next) {
          /*
           * Voice disabled:
           * stop audio + ambient timer.
           */
          cleanupAudio();

          if (
            ambientTimerRef.current
          ) {
            clearTimeout(
              ambientTimerRef.current,
            );

            ambientTimerRef.current =
              null;
          }

          setState("ready");
        } else if (open) {
          /*
           * Voice enabled again:
           * restart ambient timer.
           */
          lastInteractionRef.current =
            Date.now();

          scheduleAmbientReaction();
        }

        return next;
      },
    );
  }

  /*
   * ==========================================================
   * CLOSED
   * ==========================================================
   */

  if (!open) {
    return null;
  }

  /*
   * ==========================================================
   * UI
   * ==========================================================
   */

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
              : state === "speaking"
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
              <Volume2 size={17} />
            ) : (
              <VolumeX size={17} />
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
        {/* STATUS LIGHT */}

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

        {/* STATUS LABEL */}

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