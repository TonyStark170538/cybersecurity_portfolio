import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

/**
 * Projects page - grid of all project cards with links to case studies
 * Design: Card-based layout with consistent styling
 */
export default function Projects() {
  const projects = [
    {
      id: 1,
      title: "Secure Chat Application",
      description: "End-to-end encrypted messaging app with threat modeling",
      tags: ["Node.js", "Encryption", "Security", "React"],
      href: "/projects/1",
    },
    {
      id: 2,
      title: "Web Vulnerability Scanner",
      description: "Automated security testing tool for XSS and SQL injection",
      tags: ["Python", "Web Security", "Automation", "CLI"],
      href: "/projects/2",
    },
    {
      id: 3,
      title: "API Rate Limiter",
      description: "Distributed rate limiting with security best practices",
      tags: ["JavaScript", "Backend", "Performance", "Redis"],
      href: "/projects/3",
    },
    {
      id: 4,
      title: "JWT Authentication System",
      description: "Secure token-based auth with refresh token rotation",
      tags: ["Node.js", "Authentication", "Security", "Express"],
      href: "/projects/4",
    },
    {
      id: 5,
      title: "OWASP Compliance Checker",
      description: "Tool to audit web applications against OWASP Top 10",
      tags: ["Python", "Security Audit", "Web", "Automation"],
      href: "/projects/5",
    },
    {
      id: 6,
      title: "Secrets Management CLI",
      description: "Encrypted secrets storage with Git integration",
      tags: ["Node.js", "CLI", "Encryption", "DevOps"],
      href: "/projects/6",
    },
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <p className="text-accent font-mono text-sm font-medium">Portfolio</p>
          <h1 className="text-5xl font-bold">All Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A comprehensive collection of my security and software engineering projects. Each includes a detailed case study covering threat modeling, implementation decisions, and security practices.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link key={project.id} href={project.href}>
                <span className="group flex flex-col gap-4 p-6 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all h-full cursor-pointer">
                  <div className="space-y-2">
                    <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded bg-secondary text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-accent font-medium text-sm group-hover:gap-3 transition-all">
                    Read case study
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
