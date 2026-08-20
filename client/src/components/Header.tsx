import { Link, useLocation } from "wouter";
import { Mail } from "lucide-react";

export default function Header() {
  const [location] = useLocation();

  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Writeups",
      href: "/writeups",
    },
    {
      label: "About",
      href: "/about",
    },
  ];

  /*
   * Ask the J.A.R.V.I.S. reaction system to speak.
   *
   * This replaces the old static MP3 approach.
   *
   * Reactions are intentionally short and occasional.
   */
  async function triggerRobotReaction(
    context:
      | "contact"
      | "projects"
      | "writeups"
      | "about",
  ) {
    try {
      const response = await fetch(
        "/api/robot-reaction",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            context,
          }),
        },
      );

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      if (
        !data.audio ||
        !data.audioType
      ) {
        return;
      }

      /*
       * Convert base64 audio returned by
       * the server into a playable Blob.
       */
      const binaryString = atob(
        data.audio,
      );

      const bytes = new Uint8Array(
        binaryString.length,
      );

      for (
        let i = 0;
        i < binaryString.length;
        i++
      ) {
        bytes[i] =
          binaryString.charCodeAt(i);
      }

      const blob = new Blob(
        [bytes],
        {
          type: data.audioType,
        },
      );

      const audioUrl =
        URL.createObjectURL(blob);

      const audio = new Audio(
        audioUrl,
      );

      audio.volume = 1;

      audio.onended = () => {
        URL.revokeObjectURL(
          audioUrl,
        );
      };

      await audio.play();
    } catch (error) {
      /*
       * The navigation should NEVER fail
       * just because the robot reaction failed.
       */
      console.debug(
        "J.A.R.V.I.S. reaction unavailable:",
        error,
      );
    }
  }

  return (
    <header
      className="
        fixed
        top-0
        left-0
        right-0

        z-50

        px-4
        pt-5
      "
    >
      <div className="container">
        <div
          className="
            relative

            flex
            items-center
            justify-between

            px-6
            py-4

            rounded-2xl

            bg-[#101522]/80

            backdrop-blur-xl

            shadow-[0_10px_40px_rgba(0,0,0,.35)]
          "
        >
          {/* subtle reactor glow */}

          <div
            className="
              absolute
              inset-0

              rounded-2xl

              bg-[radial-gradient(circle_at_top_left,rgba(214,165,68,.12),transparent_45%)]

              pointer-events-none
            "
          />

          {/* LOGO */}

          <Link href="/">
            <span
              className="
                relative

                flex
                items-center
                gap-3

                cursor-pointer

                group
              "
            >
              <div
                className="
                  w-10
                  h-10

                  rounded-xl

                  border
                  border-[#D6A544]

                  flex
                  items-center
                  justify-center

                  text-[#E4B95E]

                  bg-[#0B0E16]

                  shadow-[0_0_20px_rgba(214,165,68,.18)]

                  group-hover:shadow-[0_0_30px_rgba(181,26,43,.35)]

                  transition
                "
              >
                ◆
              </div>

              <span
                className="
                  hidden
                  sm:block

                  font-bold

                  tracking-tight

                  text-white

                  group-hover:text-[#E4B95E]

                  transition
                "
              >
                &lt;DevSecOps/&gt;
              </span>
            </span>
          </Link>

          {/* NAVIGATION */}

          <nav
            className="
              hidden
              md:flex

              items-center

              gap-8

              relative
            "
          >
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
              >
                <span
                  className={`
                    relative

                    cursor-pointer

                    text-sm

                    font-medium

                    transition

                    ${
                      location ===
                      item.href
                        ? "text-[#E4B95E]"
                        : "text-[#A8B2D1] hover:text-white"
                    }
                  `}
                >
                  {item.label}

                  <span
                    className={`
                      absolute

                      left-0

                      -bottom-2

                      h-[2px]

                      transition-all

                      duration-300

                      ${
                        location ===
                        item.href
                          ? "w-full bg-[#B51A2B] shadow-[0_0_12px_#B51A2B]"
                          : "w-0 bg-[#D6A544]"
                      }
                    `}
                  />
                </span>
              </Link>
            ))}
          </nav>

          {/* CONTACT */}

          <Link
            href="/contact"
            onClick={() => {
              /*
               * Contact gets its own J.A.R.V.I.S.
               * personality reaction.
               *
               * Navigation continues immediately;
               * the voice is completely independent.
               */
              void triggerRobotReaction(
                "contact",
              );
            }}
          >
            <span
              className="
                relative

                hidden
                sm:flex

                items-center
                gap-2

                px-5
                py-2.5

                rounded-full

                bg-[#B51A2B]

                text-white

                font-medium

                text-sm

                shadow-[0_0_20px_rgba(181,26,43,.25)]

                hover:bg-[#D02B40]

                hover:shadow-[0_0_35px_rgba(181,26,43,.45)]

                transition

                cursor-pointer
              "
            >
              <Mail size={16} />

              Contact
            </span>
          </Link>

          {/* MOBILE CONTACT */}

          <Link
            href="/contact"
            onClick={() => {
              void triggerRobotReaction(
                "contact",
              );
            }}
          >
            <span
              className="
                sm:hidden

                flex

                items-center
                justify-center

                w-10
                h-10

                rounded-full

                bg-[#B51A2B]

                text-white

                cursor-pointer
              "
            >
              <Mail size={18} />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}