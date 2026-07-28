import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

/**
 * Projects Page
 *
 * Displays all portfolio projects.
 * Lead with your strongest work first.
 */

export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "J.A.R.V.I.S. Cybersecurity Platform",
      description:
        "A modern cybersecurity command center combining monitoring, incident response, attack simulation, and threat intelligence into a unified dashboard.",
      tags: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Cybersecurity",
        "Dashboard",
      ],
      href: "/projects/1",
      featured: true,
    },

    {
      id: 2,
      title: "Secure Chat Application",
      description:
        "End-to-end encrypted messaging application designed using security-first principles and threat modeling.",
      tags: [
        "Node.js",
        "React",
        "Encryption",
        "Security",
      ],
      href: "/projects/2",
      featured: false,
    },

    {
      id: 3,
      title: "Cybersecurity Portfolio",
      description:
        "Personal portfolio showcasing cybersecurity projects, secure software engineering principles, and technical case studies.",
      tags: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Portfolio",
      ],
      href: "/projects/3",
      featured: false,
    },

    // Future projects
    {
      id: 4,
      title: "Coming Soon",
      description:
        "New cybersecurity project currently in development.",
      tags: ["Future Project"],
      href: "/projects/4",
      featured: false,
    },

    {
      id: 5,
      title: "Coming Soon",
      description:
        "Another project will be added here as my portfolio grows.",
      tags: ["Future Project"],
      href: "/projects/5",
      featured: false,
    },

    {
      id: 6,
      title: "Coming Soon",
      description:
        "More security-focused work is on the way.",
      tags: ["Future Project"],
      href: "/projects/6",
      featured: false,
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <p className="text-accent font-mono text-sm font-medium">
            Portfolio
          </p>

          <h1 className="text-5xl font-bold">
            Selected Projects
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A collection of projects exploring secure software
            engineering, cybersecurity, and modern web
            development. Each case study explains the problem,
            the technical decisions I made, and what I learned
            throughout the project.
          </p>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20">
        <div className="container">

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {projects.map((project) => (

              <Link
                key={project.id}
                href={project.href}
              >
                <span
                  className={`group flex flex-col h-full rounded-xl border transition-all cursor-pointer p-6

                  ${
                    project.featured
                      ? "border-accent/50 bg-secondary/40 hover:border-accent"
                      : "border-border hover:border-accent/50 hover:bg-secondary/50"
                  }`}
                >

                  {/* Featured badge */}
                  {project.featured && (
                    <span className="mb-4 w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      Featured Project
                    </span>
                  )}

                  {/* Title */}
                  <h2 className="text-xl font-bold group-hover:text-accent transition-colors">
                    {project.title}
                  </h2>

                  {/* Description */}
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="mt-6 flex flex-wrap gap-2">

                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded bg-secondary px-2 py-1 text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}

                  </div>

                  {/* CTA */}
                  <div className="mt-auto pt-8 flex items-center gap-2 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                    Read Case Study
                    <ArrowRight size={16} />
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