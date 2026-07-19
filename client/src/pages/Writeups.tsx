import { Link } from "wouter";
import { ArrowRight, Calendar } from "lucide-react";
import Layout from "@/components/Layout";

/**
 * Writeups page - technical writeups, CTF walkthroughs, and security notes
 * Design: List of writeup cards with metadata
 */
export default function Writeups() {
  const writeups = [
    {
      id: 1,
      title: "Understanding XSS Vulnerabilities in React",
      date: "2026-01-15",
      summary: "Deep dive into cross-site scripting attacks and how React's JSX helps prevent them",
      tags: ["Web Security", "React", "XSS"],
      href: "/writeups/1",
    },
    {
      id: 2,
      title: "CTF Walkthrough: TryHackMe - Pickle Rick",
      date: "2026-01-10",
      summary: "Step-by-step solution to the Pickle Rick challenge covering enumeration and exploitation",
      tags: ["CTF", "Enumeration", "Web"],
      href: "/writeups/2",
    },
    {
      id: 3,
      title: "Cryptography Basics: AES vs RSA",
      date: "2026-01-05",
      summary: "Comparison of symmetric and asymmetric encryption with practical examples",
      tags: ["Cryptography", "Encryption", "Theory"],
      href: "/writeups/3",
    },
    {
      id: 4,
      title: "OWASP Top 10 2024: A Security Engineer's Perspective",
      date: "2025-12-28",
      summary: "Analysis of the most critical web application security risks and mitigation strategies",
      tags: ["OWASP", "Web Security", "Best Practices"],
      href: "/writeups/4",
    },
    {
      id: 5,
      title: "SQL Injection: From Basics to Advanced Exploitation",
      date: "2025-12-20",
      summary: "Comprehensive guide to SQL injection vulnerabilities, detection, and prevention",
      tags: ["SQL Injection", "Database Security", "Exploitation"],
      href: "/writeups/5",
    },
    {
      id: 6,
      title: "API Security: Authentication, Authorization, and Rate Limiting",
      date: "2025-12-15",
      summary: "Best practices for securing REST APIs with JWT, OAuth2, and rate limiting",
      tags: ["API Security", "Authentication", "Backend"],
      href: "/writeups/6",
    },
  ];

  const tagColors: Record<string, string> = {
    "Web Security": "bg-red-500/10 text-red-400",
    React: "bg-blue-500/10 text-blue-400",
    XSS: "bg-red-500/10 text-red-400",
    CTF: "bg-purple-500/10 text-purple-400",
    Enumeration: "bg-orange-500/10 text-orange-400",
    Web: "bg-blue-500/10 text-blue-400",
    Cryptography: "bg-green-500/10 text-green-400",
    Encryption: "bg-green-500/10 text-green-400",
    Theory: "bg-gray-500/10 text-gray-400",
    OWASP: "bg-red-500/10 text-red-400",
    "Best Practices": "bg-yellow-500/10 text-yellow-400",
    "SQL Injection": "bg-red-500/10 text-red-400",
    "Database Security": "bg-orange-500/10 text-orange-400",
    Exploitation: "bg-red-500/10 text-red-400",
    "API Security": "bg-blue-500/10 text-blue-400",
    Authentication: "bg-green-500/10 text-green-400",
    Authorization: "bg-green-500/10 text-green-400",
    "Rate Limiting": "bg-yellow-500/10 text-yellow-400",
    Backend: "bg-blue-500/10 text-blue-400",
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <p className="text-accent font-mono text-sm font-medium">Knowledge Base</p>
          <h1 className="text-5xl font-bold">Writeups & Notes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Technical writeups, CTF walkthroughs, and security research. Exploring vulnerabilities, best practices, and lessons learned.
          </p>
        </div>
      </section>

      {/* Writeups List */}
      <section className="py-20">
        <div className="container max-w-3xl space-y-6">
          {writeups.map((writeup) => (
            <Link key={writeup.id} href={writeup.href}>
              <span className="group flex flex-col gap-4 p-6 rounded-lg border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all cursor-pointer">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg group-hover:text-accent transition-colors">
                      {writeup.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {writeup.summary}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    className="text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0 mt-1"
                  />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-border">
                  <div className="flex flex-wrap gap-2">
                    {writeup.tags.map((tag) => (
                      <span
                        key={tag}
                        className={`px-2 py-1 text-xs rounded ${
                          tagColors[tag] || "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Calendar size={14} />
                    {new Date(writeup.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Empty State for Future Writeups */}
      <section className="py-12 border-t border-border">
        <div className="container max-w-3xl text-center">
          <p className="text-muted-foreground">
            More writeups coming soon. Check back regularly for new content on security topics.
          </p>
        </div>
      </section>
    </Layout>
  );
}
