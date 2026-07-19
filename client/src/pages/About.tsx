import { Download } from "lucide-react";
import Layout from "@/components/Layout";

/**
 * About page - security philosophy and background
 * Design: Personal narrative focused on security mindset, not generic bio
 */
export default function About() {
  return (
    <Layout>
      {/* Header */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-4">
          <p className="text-accent font-mono text-sm font-medium">About</p>
          <h1 className="text-5xl font-bold">My Security Philosophy</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container max-w-3xl space-y-12">
          {/* Philosophy */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Security by Design, Not by Accident</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe that security isn't a feature to be bolted on at the end—it's a foundational principle that should guide every decision in software development. From architecture to code review, security considerations should be woven into the fabric of how we build.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              This philosophy stems from my understanding that vulnerabilities aren't just technical failures; they're often the result of incomplete threat modeling, unclear assumptions, or shortcuts taken under pressure. By thinking like an attacker early and often, we can build systems that are resilient to both known and unknown threats.
            </p>
          </div>

          {/* Background */}
          <div className="space-y-6 border-t border-border pt-12">
            <h2 className="text-3xl font-bold">My Journey</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              My interest in cybersecurity started with curiosity about how systems work and how they break. I began exploring CTF challenges on platforms like TryHackMe and HackTheBox, which taught me the fundamentals of penetration testing, vulnerability analysis, and exploit development.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              As I progressed, I realized that the most impactful security work happens on the defensive side—building systems that are secure from the ground up. This led me to focus on secure software development, threat modeling, and secure architecture design. I've since applied these principles to real-world projects, always keeping the attacker's perspective in mind.
            </p>
          </div>

          {/* Approach */}
          <div className="space-y-6 border-t border-border pt-12">
            <h2 className="text-3xl font-bold">My Approach</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold text-foreground mb-2">Threat Modeling First</h3>
                <p className="text-muted-foreground">
                  Before writing a single line of code, I identify potential threats and design mitigations. This prevents security from being an afterthought.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Defense in Depth</h3>
                <p className="text-muted-foreground">
                  I implement multiple layers of security controls. If one fails, others are in place to catch the attack.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Practical Over Perfect</h3>
                <p className="text-muted-foreground">
                  Security is a balance between protection and usability. I aim for practical, maintainable solutions that don't sacrifice user experience.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-foreground mb-2">Continuous Learning</h3>
                <p className="text-muted-foreground">
                  The threat landscape evolves constantly. I stay updated on new vulnerabilities, attack techniques, and best practices.
                </p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6 border-t border-border pt-12">
            <h2 className="text-3xl font-bold">Skills & Expertise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-accent mb-3">Languages & Frameworks</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• JavaScript / Node.js</li>
                  <li>• Python</li>
                  <li>• React</li>
                  <li>• Express.js</li>
                  <li>• Git & Version Control</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-accent mb-3">Security Expertise</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Threat Modeling (STRIDE)</li>
                  <li>• Cryptography & Encryption</li>
                  <li>• Authentication & Authorization</li>
                  <li>• Web Application Security</li>
                  <li>• OWASP Top 10</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Resume */}
          <div className="border-t border-border pt-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 rounded-lg bg-secondary border border-border">
              <div>
                <h3 className="font-bold text-foreground mb-1">Want to learn more?</h3>
                <p className="text-sm text-muted-foreground">
                  Download my resume for a detailed overview of my experience and qualifications.
                </p>
              </div>
              <a
                href="/resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity flex-shrink-0 text-sm"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </div>

          {/* CTA */}
          <div className="border-t border-border pt-12 text-center">
            <p className="text-muted-foreground mb-6">
              I'm actively seeking internship and junior cybersecurity opportunities. Let's connect!
            </p>
            <a
              href="mailto:contact@example.com"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
