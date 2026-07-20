import { Github, Linkedin, Mail } from "lucide-react";

/**
 * Footer component - social links and contact info
 * Design: Dark background with muted text and accent links
 */
export default function Footer() {
  return (
    <footer className="border-t border-border bg-secondary py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left: Brand + CTA */}
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-foreground">Let's work together</h3>
            <p className="text-sm text-muted-foreground">
              Interested in cybersecurity opportunities? Get in touch.
            </p>
          </div>

          {/* Right: Social Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:contact@example.com"
              className="text-muted-foreground hover:text-accent transition-colors"
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © 2026 Antonina Shcherbakova. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-accent transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
