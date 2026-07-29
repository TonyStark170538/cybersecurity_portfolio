import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import Layout from "@/components/Layout";

export default function Projects() {

  const projects = [
    {
      id: 1,
      title: "AI Portfolio Terminal",
      description:
        "An AI-powered financial intelligence platform combining data visualization, analytics workflows, and intelligent software design.",
      tags: [
        "React",
        "TypeScript",
        "Python",
        "AI",
        "Data Engineering",
      ],
      metrics: [
        "AI Workflow",
        "Data Processing",
        "Visualization",
      ],
      href: "/projects/1",
      featured: true,
    },

    {
      id: 2,
      title: "J.A.R.V.I.S. Cybersecurity Platform",
      description:
        "A Security Operations Center inspired cybersecurity dashboard focused on monitoring, threat intelligence, and incident response workflows.",
      tags: [
        "React",
        "TypeScript",
        "Cybersecurity",
        "SOC",
      ],
      metrics: [
        "8 Security Modules",
        "Threat Intelligence",
        "Incident Response",
      ],
      href: "/projects/2",
      featured: false,
    },

    {
      id: 3,
      title: "Pink Panther",
      description:
        "A premium frontend project focused on branding, design systems, animations, and modern user experience.",
      tags: [
        "React",
        "Tailwind",
        "UI/UX",
      ],
      metrics: [
        "Design System",
        "Responsive UI",
        "Frontend Architecture",
      ],
      href: "/projects/3",
      featured: false,
    },
  ];

  return (
    <Layout>

      {/* HERO */}

      <section className="relative overflow-hidden py-32">

        <div className="absolute right-0 top-0 h-[650px] w-[650px] bg-[radial-gradient(circle,rgba(181,26,43,.22),transparent_65%)] blur-3xl" />

        <div className="absolute left-0 bottom-0 h-[500px] w-[500px] bg-[radial-gradient(circle,rgba(214,165,68,.08),transparent_70%)] blur-3xl" />

        <div className="container">

          <div className="max-w-4xl">

            <p className="mb-5 font-mono text-sm uppercase tracking-[0.3em] text-[#E4B95E]">
              Engineering Portfolio
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-6xl">
              Selected
              <span className="text-[#E4B95E]"> Projects</span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[#A8B2D1]">
              A collection of software engineering, cybersecurity,
              cloud and AI projects focused on clean architecture,
              premium user experiences and secure system design.
            </p>

          </div>

        </div>

      </section>

      {/* PROJECTS */}

      <section className="pb-24">

        <div className="container">

          <div className="grid gap-8 lg:grid-cols-2">

            {projects.map((project) => (

              <Link
                key={project.id}
                href={project.href}
              >

                <span
                  className={`
                  group
                  relative
                  block
                  overflow-hidden
                  rounded-[32px]
                  cursor-pointer
                  transition-all
                  duration-500

                  ${
                    project.featured
                      ? "lg:col-span-2"
                      : ""
                  }
                  `}
                >

                  {/* Reactor Glow */}

                  <div className="
                  absolute
                  inset-0
                  rounded-[32px]
                  bg-[#B51A2B]
                  opacity-0
                  blur-3xl
                  transition-all
                  duration-500
                  group-hover:opacity-10
                  " />

                  {/* Card */}

                  <div className="
                  relative
                  h-full
                  rounded-[32px]
                  bg-[#161E3F]/55
                  backdrop-blur-xl
                  p-9
                  transition-all
                  duration-500
                  group-hover:-translate-y-1
                  group-hover:bg-[#242F49]/70
                  ">

                    {project.featured && (

                      <div className="mb-8 flex items-center gap-2">

                        <div className="rounded-full bg-[#D6A544]/15 px-4 py-2 text-xs font-medium uppercase tracking-widest text-[#E4B95E]">
                          Featured Project
                        </div>

                        <Sparkles
                          size={16}
                          className="text-[#D6A544]"
                        />

                      </div>

                    )}

                    <h2 className="text-3xl font-bold transition group-hover:text-[#E4B95E]">
                      {project.title}
                    </h2>

                    <p className="mt-5 max-w-3xl leading-8 text-[#A8B2D1]">
                      {project.description}
                    </p>

                    <div className="mt-8 grid gap-3">

                      {project.metrics.map(metric => (

                        <div
                          key={metric}
                          className="flex items-center gap-3 text-[#A8B2D1]"
                        >

                          <div className="
                          h-2
                          w-2
                          rounded-full
                          bg-[#D6A544]
                          shadow-[0_0_12px_rgba(214,165,68,.45)]
                          " />

                          {metric}

                        </div>

                      ))}

                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">

                      {project.tags.map(tag => (

                        <span
                          key={tag}
                          className="
                          rounded-full
                          bg-[#0B0E16]
                          px-4
                          py-2
                          text-xs
                          text-[#A8B2D1]
                          "
                        >
                          {tag}
                        </span>

                      ))}

                    </div>

                    <div className="
                    mt-10
                    flex
                    items-center
                    gap-2
                    font-medium
                    text-[#E4B95E]
                    transition-all
                    group-hover:gap-4
                    ">

                      Read Case Study

                      <ArrowRight size={18} />

                    </div>

                  </div>

                </span>

              </Link>

            ))}

          </div>

        </div>

      </section>

    </Layout>
  );

}