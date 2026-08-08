# Cybersecurity Specialist Portfolio

A modern, clean personal portfolio website for a junior cybersecurity and AI engineer. Built with React, Tailwind CSS, and vanilla JavaScript to showcase projects, security expertise, and technical writeups.

## Overview

This portfolio demonstrates security best practices through both its content and its codebase. It features:

- **Home**: Hero section with positioning statement and featured projects
- **Projects**: Comprehensive project case studies with threat modeling and security decisions
- **Writeups**: Technical articles, CTF walkthroughs, and security research
- **About**: Security philosophy and background
- **Responsive Design**: Mobile-first, accessible interface
- **Dark Theme**: Modern cybersecurity aesthetic with cyan accents

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4 + shadcn/ui components
- **Routing**: Wouter (lightweight client-side router)
- **Build**: Vite
- **Fonts**: Outfit (display), Inter (body), JetBrains Mono (code)

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm)

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The development server runs at `http://localhost:3000`.

## Project Structure

```
client/
├── public/              # Static assets (favicon, robots.txt)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Header.tsx   # Navigation header
│   │   ├── Footer.tsx   # Footer with social links
│   │   ├── Layout.tsx   # Page wrapper
│   │   └── ui/          # shadcn/ui components
│   ├── pages/           # Page components
│   │   ├── Home.tsx     # Hero and featured projects
│   │   ├── Projects.tsx # All projects grid
│   │   ├── ProjectDetail.tsx # Case study template
│   │   ├── Writeups.tsx # Technical articles
│   │   └── About.tsx    # Security philosophy
│   ├── App.tsx          # Routes and theme setup
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles and theme
└── index.html           # HTML template
```

## Security Practices

This codebase demonstrates security best practices:

### Input Validation & Sanitization

All user inputs are validated and sanitized. While this portfolio doesn't have a contact form, any future forms will include:

```typescript
// Example: Zod schema for validation
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(10).max(5000),
});

// Sanitize before processing
const sanitized = DOMPurify.sanitize(userInput);
```

### Secrets Management

- No API keys or secrets are committed to Git
- Environment variables are used for sensitive data
- See `.gitignore` for excluded files

### Dependency Auditing

```bash
# Check for known vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Content Security Policy

The site includes security headers to prevent common attacks:

- XSS prevention through React's automatic escaping
- CSRF protection through SameSite cookies
- Clickjacking prevention through X-Frame-Options

## Customization

### Update Personal Information

Edit the following files to add your information:

- `client/src/components/Header.tsx` - Email and social links
- `client/src/components/Footer.tsx` - Social media URLs
- `client/src/pages/Home.tsx` - Featured projects
- `client/src/pages/About.tsx` - Your background and philosophy

### Add Projects

1. Create a new project entry in `client/src/pages/Projects.tsx`
2. Add a case study by updating `client/src/pages/ProjectDetail.tsx`
3. Link to your GitHub repository and live demo

### Add Writeups

1. Add a new writeup to the list in `client/src/pages/Writeups.tsx`
2. Create a detail page for the writeup
3. Include tags for categorization

# Interactive Cybersecurity AI Robot

## Overview

I built an interactive 3D cybersecurity assistant as part of my
portfolio website.

The experience uses React Three Fiber and a GLB robot model
embedded directly into the homepage.

The robot is designed to feel like an interactive security assistant
rather than a static 3D decoration.

## Interactions

The robot reacts to the user's cursor and follows its movement
using smooth interpolation.

Users can also click the robot to activate it.

The first interaction triggers an introduction voice response,
while subsequent interactions can trigger a secondary response.

The robot also uses subtle floating and animation to create a
continuous sense of activity.

## Technology

- React
- TypeScript
- React Three Fiber
- Three.js
- Drei
- GLB 3D model
- Web Audio

## Performance

The 3D experience is lazy-loaded so the Three.js scene does not
block the initial page rendering.

A loading fallback is displayed while the 3D experience initializes.

The experience detects users who prefer reduced motion and provides
a static fallback instead of running the animated 3D scene.

Basic device capability detection is also used to avoid loading
the experience on lower-powered devices.

The scene uses simple lighting and limited animation rather than
expensive post-processing effects.

## Accessibility

Users who enable `prefers-reduced-motion` receive a static fallback.

The interaction is designed to work with pointer and touch input.

## FE-10 Performance Reflection

The main performance cost comes from loading and rendering the
3D model and maintaining the animation loop.

To keep the experience lightweight, I lazy-loaded the Canvas,
limited the number of lights and effects, avoided expensive
post-processing, and added fallbacks for reduced-motion and
lower-powered devices.

## Future Improvements

With more time I would:

- Compress the GLB using Draco or Meshopt if further optimization
  is needed.
- Add more interaction states.
- Add additional robot animations.
- Measure frame rate and GPU usage on a wider range of mobile devices.
- Add a more sophisticated loading experience.

### Customize Theme

Edit `client/src/index.css` to change:

- Color palette (OKLCH format)
- Typography (font families and sizes)
- Spacing and border radius
- Dark/light theme values

## Accessibility

This portfolio follows web accessibility best practices:

- Semantic HTML structure
- Proper heading hierarchy (H1 → H6)
- Alt text on images (when applicable)
- Sufficient color contrast (WCAG AA)
- Keyboard navigation support
- Focus indicators on interactive elements
- ARIA labels where needed

## Performance

- Optimized images and assets
- Minimal JavaScript bundle
- CSS-in-JS with Tailwind for efficient styling
- Fast page transitions with Wouter
- No unnecessary dependencies

## Deployment

### Build for Production

```bash
pnpm build
```

The production build is optimized and ready for deployment.

### Hosting Options

- **Manus**: Built-in hosting with custom domain support
- **Vercel**: Zero-config deployment
- **Netlify**: Drag-and-drop deployment
- **GitHub Pages**: Free static hosting

## Contributing

This is a personal portfolio, but feel free to fork and customize for your own use.

## License

MIT License - feel free to use this as a template for your own portfolio.

## Support

For issues or questions about the portfolio, please open an issue or contact me through the website.

---

**Built with security and design in mind.** 🔐
