import { Link } from "wouter";
import { Mail } from "lucide-react";

/**
 * Header component - persistent navigation and contact CTA
 * Design: Dark theme with cyan accents, minimal navigation
 * Features: Active link highlighting, responsive design
 */
export default function Header() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Writeups", href: "/writeups" },
    { label: "About", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="container flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/">
          <span className="flex items-center gap-2 font-bold text-lg hover:text-accent transition-colors cursor-pointer">
            <div className="w-8 h-8 rounded border-2 border-accent flex items-center justify-center text-accent text-sm">
              ◆
            </div>
            <span className="hidden sm:inline">&lt;devsec/&gt;</span>
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <span className="text-sm font-medium text-foreground/70 hover:text-accent transition-colors relative group cursor-pointer">
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
              </span>
            </Link>
          ))}
        </nav>

        {/* Contact CTA */}
        <div className="flex items-center gap-3">
          <Link href="/contact">
            <span className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-accent-foreground font-medium hover:opacity-90 transition-opacity text-sm cursor-pointer">
              <Mail size={16} />
              <span>Contact</span>
            </span>
          </Link>
          <Link href="/contact">
            <span className="sm:hidden flex items-center justify-center w-10 h-10 rounded-md bg-accent text-accent-foreground hover:opacity-90 transition-opacity cursor-pointer">
              <Mail size={18} />
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
