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

type Props = {
  open: boolean;
  onClose: () => void;
  onSpeakingChange?: (speaking: boolean) => void;
  onStateChange?: (state: RobotState) => void;
};

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

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  const audioUrlRef =
    useRef<string | null>(null);

  const requestIdRef = useRef(0);

  /*
   * ------------------------------------------
   * CLEANUP
   * ------------------------------------------
   */

  useEffect(() => {
    return () => {
      requestIdRef.current += 1;
      stopSpeaking();
    };
  }, []);

  /*
   * ------------------------------------------
   * INFORM ROBOT WHEN SPEAKING
   * ------------------------------------------
   */

  useEffect(() => {
    onSpeakingChange?.(
      state === "speaking"
    );
    onStateChange?.(state);
  }, [state, onSpeakingChange, onStateChange]);

  /*
   * ------------------------------------------
   * BASE64 → AUDIO
   * ------------------------------------------
   */

  function base64ToBlob(
    base64: string,
    mimeType: string
  ) {
    const byteCharacters =
      atob(base64);

    const byteNumbers =
      new Array(byteCharacters.length);

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
      { type: mimeType }
    );
  }

  /*
   * ------------------------------------------
   * PLAY J.A.R.V.I.S. VOICE
   * ------------------------------------------
   */

  async function speak(
    audioBase64: string,
    audioType: string
  ) {
    if (!voiceEnabled) {
      setState("ready");
      return;
    }

    try {
      stopSpeaking();

      const blob =
        base64ToBlob(
          audioBase64,
          audioType || "audio/wav"
        );

      const audioUrl =
        URL.createObjectURL(blob);

      audioUrlRef.current =
        audioUrl;

      const audio =
        new Audio(audioUrl);

      audioRef.current =
        audio;

      setState("speaking");

      audio.onended = () => {
        cleanupAudio();
        setState("ready");
      };

      audio.onerror = () => {
        cleanupAudio();
        setState("ready");
      };

      await audio.play();

    } catch (error) {
      console.error(
        "J.A.R.V.I.S. voice error:",
        error
      );

      cleanupAudio();
      setState("ready");
    }
  }

  /*
   * ------------------------------------------
   * CLEAN AUDIO
   * ------------------------------------------
   */

  function cleanupAudio() {
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current = null;
    }

    if (audioUrlRef.current) {
      URL.revokeObjectURL(
        audioUrlRef.current
      );

      audioUrlRef.current = null;
    }
  }

  /*
   * ------------------------------------------
   * SEND QUESTION
   * ------------------------------------------
   */

  async function sendMessage(
    event: FormEvent
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

    setInput("");
    setTranscript("");
    setState("thinking");

    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;

    try {
      const response =
        await fetch(
          "/api/assistant",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              question,
            }),
          }
        );

      const responseText =
        await response.text();

      let data: unknown = null;

      if (responseText) {
        try {
          data = JSON.parse(responseText);
        } catch {
          throw new Error(
            "The AI assistant is temporarily unavailable."
          );
        }
      }

      // Closing the assistant invalidates an in-flight request. Its eventual
      // response must never restart speech in the background.
      if (requestId !== requestIdRef.current) {
        return;
      }

      if (!response.ok) {
        throw new Error(
          typeof data === "object" &&
          data !== null &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            :
          "AI service unavailable."
        );
      }

      const answer =
        typeof data === "object" &&
        data !== null &&
        "answer" in data &&
        typeof data.answer === "string"
          ? data.answer.trim()
          : "";

      if (!answer) {
        throw new Error(
          "No AI response received."
        );
      }

      setTranscript(answer);

      /*
       * New API returns audio
       * together with the answer.
       */

      if (
        typeof data === "object" &&
        data !== null &&
        "audio" in data &&
        typeof data.audio === "string" &&
        data.audio.length > 0
      ) {
        await speak(
          data.audio,
          "audioType" in data &&
          typeof data.audioType === "string"
            ? data.audioType
            :
            "audio/wav"
        );
      } else {
        /*
         * Text still works if TTS
         * temporarily fails.
         */

        setState("ready");
      }

    } catch (error) {
      console.error(
        "J.A.R.V.I.S. error:",
        error
      );

      setTranscript(
        error instanceof Error
          ? error.message
          : "I'm having trouble connecting to my AI system right now."
      );

      setState("ready");
    }
  }

  /*
   * ------------------------------------------
   * STOP SPEAKING
   * ------------------------------------------
   */

  function stopSpeaking() {
    cleanupAudio();
    setState("ready");
  }

  /*
   * ------------------------------------------
   * CLOSE
   * ------------------------------------------
   */

  function closeAssistant() {
    requestIdRef.current += 1;
    stopSpeaking();

    setTranscript("");
    setInput("");

    onClose();
  }

  /*
   * ------------------------------------------
   * DON'T RENDER WHEN CLOSED
   * ------------------------------------------
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
            onClick={() => {
              if (state === "speaking") {
                stopSpeaking();
              }

              setVoiceEnabled(
                current => !current
              );
            }}
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

            onChange={event =>
              setInput(
                event.target.value
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
          {" "}•{" "}
          VOICE ENABLED
        </div>

      </form>

    </div>
  );
}
