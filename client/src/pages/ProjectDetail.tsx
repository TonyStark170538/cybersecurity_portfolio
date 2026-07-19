import { useRoute } from "wouter";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

/**
 * ProjectDetail page - case study template for individual projects
 * Design: Detailed technical writeup with sections for problem, threat model, implementation, security decisions
 * Features: Code snippets, links to repo and demo
 */
export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");

  if (!match) return null;

  // Mock project data - replace with real data from props or API
  const project = {
    id: params?.id,
    title: "Secure Chat Application",
    subtitle: "End-to-end encrypted messaging with threat modeling",
    tags: ["Node.js", "Encryption", "React", "Security"],
    repoUrl: "https://github.com/devsec-ali/secure-chat",
    demoUrl: "https://secure-chat-demo.com",
    problem: `This project addresses the need for a secure communication platform that protects user privacy through end-to-end encryption. Traditional chat applications often store messages in plaintext on servers, creating a single point of failure for sensitive conversations. The goal was to build a messaging application where only the sender and recipient can read messages, even if the server is compromised.`,
    threatModel: `
- **Eavesdropping**: Mitigated by TLS 1.3 for transport and AES-256-GCM for message encryption
- **Man-in-the-Middle (MITM)**: Prevented through certificate pinning and key verification
- **Replay Attacks**: Countered with message timestamps and nonces
- **Compromised Server**: Even if the server is breached, messages remain encrypted
- **Malicious Input**: All user inputs are validated and sanitized to prevent injection attacks
    `,
    implementation: `
The application uses Node.js with Express for the backend and React for the frontend. Messages are encrypted client-side using TweetNaCl.js before being sent to the server. The server stores only encrypted messages and never has access to plaintext content.

Key technical decisions:
- **Encryption**: TweetNaCl.js for public-key cryptography (Curve25519)
- **Transport**: TLS 1.3 with certificate pinning
- **Key Exchange**: ECDH for establishing shared secrets
- **Message Format**: JSON with encrypted payload and metadata
    `,
    securityDecisions: `
1. **Input Validation**: All inputs are validated against expected formats using Zod schemas. User messages are limited to 10KB to prevent DoS attacks.
2. **Dependency Auditing**: Regular npm audit runs catch known vulnerabilities. Critical dependencies are pinned to specific versions.
3. **Secrets Management**: API keys and certificates are stored in environment variables, never committed to Git.
4. **Authentication**: JWT tokens with 1-hour expiration and refresh token rotation.
5. **CORS**: Restricted to known domains to prevent cross-site attacks.
6. **Rate Limiting**: 100 requests per minute per IP to prevent brute force attacks.
    `,
    improvements: `
With more time, I would implement:
- Hardware security module (HSM) integration for key storage
- Perfect forward secrecy (PFS) with ephemeral keys
- Message deletion with cryptographic erasure
- Audit logging for compliance requirements
- End-to-end testing with security-focused test cases
    `,
  };

  return (
    <Layout>
      {/* Back Button */}
      <section className="border-b border-border">
        <div className="container py-4">
          <Link href="/projects">
            <span className="inline-flex items-center gap-2 text-accent hover:gap-3 transition-all font-medium text-sm cursor-pointer">
              <ArrowLeft size={16} />
              Back to Projects
            </span>
          </Link>
        </div>
      </section>

      {/* Hero */}
      <section className="py-16 border-b border-border">
        <div className="container space-y-6">
          <div className="space-y-2">
            <p className="text-accent font-mono text-sm font-medium">
              Case Study
            </p>
            <h1 className="text-5xl font-bold">{project.title}</h1>
            <p className="text-xl text-muted-foreground">{project.subtitle}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm rounded bg-secondary text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border hover:border-accent/50 hover:bg-secondary/50 transition-all text-sm font-medium"
            >
              <Github size={16} />
              View Repository
            </a>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-accent-foreground hover:opacity-90 transition-opacity text-sm font-medium"
              >
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="container max-w-3xl space-y-16">
          {/* Problem */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Problem</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.problem}
            </p>
          </div>

          {/* Threat Model */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Threat Model</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.threatModel}
            </p>
          </div>

          {/* Implementation */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Implementation</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.implementation}
            </p>

            {/* Code Snippet Example */}
            <div className="mt-6 p-4 rounded-lg bg-secondary border border-border overflow-x-auto">
              <pre className="text-sm text-muted-foreground font-mono">
                <code>{`// Example: Encrypting a message
const nacl = require('tweetnacl');

function encryptMessage(message, recipientPublicKey) {
  const nonce = nacl.randomBytes(24);
  const encrypted = nacl.box(
    nacl.util.decodeUTF8(message),
    nonce,
    recipientPublicKey,
    senderSecretKey
  );
  return {
    nonce: nacl.util.encodeBase64(nonce),
    encrypted: nacl.util.encodeBase64(encrypted)
  };
}`}</code>
              </pre>
            </div>
          </div>

          {/* Security Decisions */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Security Decisions</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.securityDecisions}
            </p>
          </div>

          {/* Improvements */}
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">What I'd Harden Next</h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {project.improvements}
            </p>
          </div>

          {/* CTA */}
          <div className="border-t border-border pt-12">
            <p className="text-muted-foreground mb-4">
              Interested in this project or have questions about my approach?
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
