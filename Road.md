Three Roads: Choosing My Tech Stack
Project Constraints

Before deciding on my stack, I identified the main constraints for this project.

Budget
Free tools and hosting only.
Skill Level
Intermediate React developer with beginner-to-intermediate backend experience using Python and FastAPI.
Comfortable with TypeScript, Tailwind CSS, and building responsive user interfaces.
Currently learning cloud technologies, cybersecurity, and AI integration.
Portfolio Requirements

My portfolio needs to include:

Home page
Projects page
Individual project case studies
Technical writeups
About page
Contact page

Each project should include:

Project screenshots
Architecture diagrams
Technology stack
GitHub repository
Live demo
Engineering decisions
Lessons learned
Future improvements

The portfolio should also showcase my AI Portfolio Terminal, J.A.R.V.I.S. Cybersecurity Platform, and Pink Panther frontend project.

Content Display Requirements

My portfolio must display:

Large project images
Architecture diagrams
Embedded live demos (via external links)
GitHub repositories
Long-form case studies
Technical writeups
Responsive layouts
Modern UI with animations
Dynamic Features

The portfolio itself does not require a backend for navigation or content.

However, my AI Portfolio Terminal project requires a backend because it integrates with Google's Gemini API to generate AI-powered market analysis.

Stack Options Considered
Option 1 – React + Vite + Tailwind CSS (Simplest)
Stack
React
TypeScript
Tailwind CSS
Vite
Hosting
Vercel (Free)
Backend

No backend required.

Advantages
Very easy to build and maintain.
Fast deployment.
Excellent performance.
Perfect for static portfolio websites.
Simple project structure.
Trade-offs
No server-side functionality.
Cannot easily integrate AI features.
Limited backend expansion.
Portfolio would mainly be a showcase rather than an interactive application.
Option 2 – React + FastAPI + Tailwind CSS (Chosen)
Stack
React
TypeScript
Tailwind CSS
FastAPI
Python
Hosting
Frontend: Vercel
Backend: Render (or Railway)
Backend

Yes.

The backend is responsible for AI features, API communication, and future integrations.

Advantages
Clean separation between frontend and backend.
Supports AI-powered applications.
Easy to build REST APIs.
Uses Python, which is widely used for AI and cybersecurity.
Scalable architecture.
Matches my current skills and learning goals.
Trade-offs
Two deployments instead of one.
Backend requires maintenance.
Slightly more configuration than a static portfolio.
Option 3 – Next.js + Tailwind + AI SDK (Most Powerful)
Stack
Next.js
React
Tailwind CSS
AI SDK
Server Components
Hosting
Vercel
Backend

Built into Next.js using API Routes and Server Actions.

Advantages
Excellent SEO.
Server-side rendering.
Built-in API routes.
Great performance.
Strong production architecture.
Trade-offs
Much steeper learning curve.
More complex deployment.
More concepts to understand.
Higher maintenance cost.
Difficult to complete within the available time.
Pressure Testing the Options
What breaks if I choose the simplest stack?

Without a backend, I would not be able to build meaningful AI-powered features such as my Market Brief generator. The portfolio would only display information and could not demonstrate real AI integration or backend engineering skills.

What would I maintain if I chose the most powerful stack?

Using Next.js would require maintaining server-side rendering, API routes, authentication, deployment configuration, and a more complex architecture. Although it provides many advantages, it would significantly increase development and maintenance time.

Can I finish it in two weeks?
React + Vite: Yes, but it would limit the functionality I wanted to demonstrate.
React + FastAPI: Yes. It provides the right balance between functionality and complexity.
Next.js: Probably not while maintaining the same quality and understanding every part of the code.
Does it display my work properly?

Yes.

React with FastAPI allows me to present:

Large project galleries
Architecture diagrams
Technical writeups
GitHub repositories
Live demos
AI-powered applications
Responsive layouts
Interactive components

It supports both static portfolio content and dynamic AI functionality.

Final Decision

After comparing the three options, I chose React, TypeScript, Tailwind CSS, and FastAPI.

This stack best matches my current skill level while giving me room to continue learning backend development, artificial intelligence, cloud computing, and cybersecurity.

I considered building a simpler static React portfolio, but it would not support the AI-powered functionality that I wanted to showcase. Since one of my main projects is an AI Portfolio Terminal, a backend was necessary to demonstrate real-world AI integration.

I also considered using Next.js because of its server-side rendering and built-in API features. While it is a powerful framework, I felt it would require learning many additional concepts within a limited timeframe. Rather than spending time learning a completely new framework, I chose to focus on improving the quality of my application and strengthening my existing skills.

React with FastAPI gives me the best balance between simplicity, flexibility, and maintainability. It allows me to build modern user interfaces, integrate AI services, and create applications that are easy to extend in the future.

Most importantly, it is a stack that I understand, can confidently explain, and can continue maintaining after this course.