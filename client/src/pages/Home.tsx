import { Link } from "wouter";
import { ArrowRight, Github, Linkedin, Shield } from "lucide-react";
import Layout from "@/components/Layout";

/**
 * Home page - hero section with positioning statement and project highlights
 * Design: Dark background, cyan accents, asymmetric layout
 * Features: Hero with CTA, proof row (social links), featured projects
 */
export default function Home() {
  const proofItems = [
    {
      label: "GitHub",
      url: "https://github.com",
      icon: Github,
      description: "github.com/devsec-ali",
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com",
      icon: Linkedin,
      description: "linkedin.com/in/devsec-ali",
    },
    {
      label: "TryHackMe",
      url: "https://tryhackme.com",
      icon: Shield,
      description: "tryhackme.com/p/devsec-ali",
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "Secure Chat Application",
      description: "End-to-end encrypted messaging app with threat modeling",
      tags: ["Node.js", "Encryption", "Security"],
      href: "/projects/1",
    },
    {
      id: 2,
      title: "Web Vulnerability Scanner",
      description: "Automated security testing tool for XSS and SQL injection",
      tags: ["Python", "Web Security", "Automation"],
      href: "/projects/2",
    },
    {
      id: 3,
      title: "API Rate Limiter",
      description: "Distributed rate limiting with security best practices",
      tags: ["JavaScript", "Backend", "Performance"],
      href: "/projects/3",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-20 md:py-32 border-b border-border">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-accent font-mono text-sm font-medium">
                  Hello, I'm Ali
                </p>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                  I am an aspiring{" "}
                  <span className="text-accent">cybersecurity</span> and{" "}
                  <span className="text-accent">AI engineer</span>
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Building secure, practical applications with JavaScript, Node.js, Git, and modern AI tools.
                </p>
              </div>

              {/* CTA Button */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="mailto:contact@example.com"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
                >
                  Contact me
                  <ArrowRight size={18} />
                </a>
                <Link href="/projects">
                  <span className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-border text-foreground font-medium hover:bg-secondary transition-colors cursor-pointer">
                    View Projects
                  </span>
                </Link>
              </div>
            </div>

            {/* Right: Visual Element */}
            <div className="hidden md:flex items-center justify-center">
              <div className="relative w-64 h-64">
                {/* Hexagon shield background */}
                <div className="absolute inset-0 border-2 border-accent/30 rounded-3xl transform rotate-45" />
                <div className="absolute inset-4 border-2 border-accent/20 rounded-2xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield size={120} className="text-accent/40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Row - Social Links */}
      <section className="py-16 border-b border-border">
        <div className="container">
          <p className="text-sm text-muted-foreground mb-8 font-mono">
            Proof of work
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {proofItems.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center group-hover:text-accent transition-colors">
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0"
                  />
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20">
        <div className="container">
          <div className="space-y-4 mb-12">
            <p className="text-accent font-mono text-sm font-medium">
              Featured Work
            </p>
            <h2 className="text-4xl font-bold">Selected Projects</h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              A selection of my strongest projects showcasing security practices and technical depth.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
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

          {/* View All Projects Link */}
          <div className="mt-12 text-center">
            <Link href="/projects">
              <span className="inline-flex items-center gap-2 text-accent font-medium hover:gap-3 transition-all cursor-pointer">
                View all projects
                <ArrowRight size={18} />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
