import { useRoute } from "wouter";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

/**
 * ProjectDetail page
 *
 * Dynamic case study page.
 * Projects are loaded by URL:
 *
 * /projects/1 -> J.A.R.V.I.S.
 * /projects/2 -> Secure Chat
 * /projects/3 -> Cybersecurity Portfolio
 */

export default function ProjectDetail() {
  const [match, params] = useRoute("/projects/:id");

  if (!match) return null;

  const projects = {     "1": {
      id: 1,
      title: "J.A.R.V.I.S. Cybersecurity Platform",
      subtitle:
        "A futuristic cybersecurity command center for monitoring, threat analysis, and incident response",

      tags: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Cybersecurity",
        "Dashboard",
      ],

      repoUrl: "https://github.com/YOUR_USERNAME/jarvis-platform",
      demoUrl: "https://YOUR-DEMO-LINK.com",

      problem: `
Security teams often work with multiple disconnected tools to monitor systems, investigate incidents, and understand threats.

Switching between different platforms can slow down investigations and make it difficult to see the complete security picture.

The goal of this project was to design a unified cybersecurity dashboard that combines important security workflows into one clear interface.

Instead of creating only a visual dashboard, I wanted to explore how security professionals interact with information during monitoring and incident response.
      `,

      threatModel: `
This project focuses on improving security visibility and helping analysts identify important events faster.

The main security concepts represented in the platform include:

• Threat monitoring
• Incident investigation
• Asset visibility
• Risk assessment
• Attack simulation workflows

The current version uses simulated data. The architecture is designed for future integration with real security tools and telemetry sources.
      `,

      implementation: `
I built the platform using React, TypeScript, and Tailwind CSS.

The application includes eight main modules:

• Dashboard
• Attack Lab
• Monitoring
• Incidents
• Assets
• Reports
• Threat Intelligence
• Settings

The interface uses a cybersecurity-focused design system with:

• Dark theme
• Neon cyan accents
• Glassmorphism panels
• Responsive layouts
• Reusable components
• Smooth animations

The goal was to create an interface that feels like a professional Security Operations Center while maintaining usability and clear information hierarchy.
      `,

      securityDecisions: `
1. Designed the interface around security workflows instead of generic dashboard components.

2. Used TypeScript to improve reliability and maintainability.

3. Created reusable React components to keep the application scalable.

4. Focused on information hierarchy to reduce cognitive overload.

5. Designed the frontend architecture so future APIs and security data sources can be integrated.

6. Planned future connections with security tools such as Suricata, Zeek, and Wazuh.
      `,

      improvements: `
Future improvements:

• Connect real system telemetry
• Add backend API services
• Integrate security monitoring tools
• Add real-time event streaming
• Implement MITRE ATT&CK mappings
• Add automated response actions
• Replace mock data with live security events
      `,

      code: `
// Example: Security dashboard modules

const modules = [
  "Dashboard",
  "Attack Lab",
  "Monitoring",
  "Incidents",
  "Assets",
  "Reports",
  "Threat Intelligence"
];

modules.forEach(loadSecurityModule);
`,
    },


    "2": {
      id: 2,

      title: "Secure Chat Application",

      subtitle:
        "End-to-end encrypted messaging application with threat modeling",

      tags: [
        "Node.js",
        "React",
        "Encryption",
        "Security",
      ],

      repoUrl:
        "https://github.com/devsec-ali/secure-chat",

      demoUrl:
        "https://secure-chat-demo.com",


      problem: `
Traditional messaging applications often store user messages on servers.

If the server is compromised, sensitive conversations may become exposed.

The goal of this project was to create a messaging application where only the sender and recipient can access message contents.
      `,


      threatModel: `
Threats considered:

• Eavesdropping
• Man-in-the-middle attacks
• Replay attacks
• Server compromise
• Malicious input

Security controls were designed around protecting message confidentiality and user data.
      `,


      implementation: `
The application uses React for the frontend and Node.js for backend services.

Messages are encrypted before being stored by the server.

Technical decisions:

• Client-side encryption
• Secure key exchange
• Encrypted message storage
• Protected API communication
      `,


      securityDecisions: `
1. Input validation to reduce injection risks.

2. JWT authentication with secure token handling.

3. Environment variables for sensitive configuration.

4. Dependency auditing for vulnerable packages.

5. Restricted CORS configuration.

6. Rate limiting to reduce abuse.
      `,


      improvements: `
Future improvements:

• Perfect Forward Secrecy
• Hardware security modules
• Security testing automation
• Advanced key management
• Audit logging
      `,


      code: `
// Example: Encrypting a message

function encryptMessage(message) {
  return encryptedPayload;
}
`,
    },


    "3": {
      id: 3,

      title: "Cybersecurity Portfolio Website",

      subtitle:
        "A security-focused portfolio built to demonstrate engineering decisions and cybersecurity mindset",

      tags: [
        "React",
        "TypeScript",
        "Tailwind CSS",
        "Web Development",
      ],

      repoUrl:
        "https://github.com/YOUR_USERNAME/cybersecurity-portfolio",

      demoUrl:
        "https://YOUR-PORTFOLIO-LINK.com",


      problem: `
Cybersecurity professionals need more than a list of skills. They need a way to demonstrate how they think, design, and solve problems.

The goal was to build a portfolio that communicates technical ability through real projects and detailed case studies.
      `,


      threatModel: `
The portfolio follows security-focused development principles:

• Clear project documentation
• Secure coding practices
• Attention to user experience
• Separation of concerns
      `,


      implementation: `
Built using React, TypeScript, Tailwind CSS, and modern component architecture.

The design follows a modern hacker minimalism approach:

• Dark-first interface
• Cyan security accents
• Technical typography
• Case-study driven presentation
      `,


      securityDecisions: `
• Component-based architecture
• Maintainable code structure
• Clear project documentation
• Focus on practical security engineering
      `,


      improvements: `
Future improvements:

• More real-world case studies
• Additional security projects
• Interactive demonstrations
• Technical blog section
      `,


      code: `
// Example component structure

function PortfolioProject() {
  return <ProjectCard />;
}
`,
    },
  };


  const project = projects[params?.id as keyof typeof projects];

  if (!project) {
    return (
      <Layout>
        <section className="py-20">
          <div className="container text-center">
            <h1 className="text-4xl font-bold">Project Not Found</h1>

            <Link href="/projects">
              <span className="inline-flex mt-6 text-accent cursor-pointer">Back to Projects</span>
            </Link>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>

      {/* Back Button */}
      <section className="border-b border-border">
        <div className="container py-4">

          <Link href="/projects">

            <span className="
              inline-flex
              items-center
              gap-2
              text-accent
              hover:gap-3
              transition-all
              font-medium
              text-sm
              cursor-pointer
            ">

              <ArrowLeft size={16} />

              Back to Projects

            </span>

          </Link>

        </div>
      </section>



      {/* Hero */}
      <section className="py-16 border-b border-border">

        <div className="container space-y-6">


          <p className="text-accent font-mono text-sm">
            Case Study
          </p>


          <h1 className="text-5xl font-bold">
            {project.title}
          </h1>


          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.subtitle}
          </p>



          {/* Tags */}

          <div className="flex flex-wrap gap-2">

            {project.tags.map((tag) => (

              <span
                key={tag}
                className="
                px-3
                py-1
                rounded
                bg-secondary
                text-sm
                text-muted-foreground
                "
              >

                {tag}

              </span>

            ))}

          </div>



          {/* Buttons */}

          <div className="flex flex-wrap gap-4 pt-4">


            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
              inline-flex
              items-center
              gap-2
              px-5
              py-3
              rounded-md
              border
              border-border
              hover:border-accent
              transition-all
              text-sm
              font-medium
              "
            >

              <Github size={16}/>

              View Repository

            </a>



            {project.demoUrl && (

              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-md
                bg-accent
                text-accent-foreground
                hover:opacity-90
                transition
                text-sm
                font-medium
                "
              >

                <ExternalLink size={16}/>

                Live Demo

              </a>

            )}


          </div>


        </div>

      </section>




      {/* Content */}

      <section className="py-20">

        <div className="
          container
          max-w-3xl
          space-y-16
        ">



          {/* Problem */}

          <div className="space-y-4">

            <h2 className="text-3xl font-bold">
              Problem
            </h2>


            <p className="
              text-muted-foreground
              leading-relaxed
              whitespace-pre-wrap
            ">
              {project.problem}
            </p>

          </div>




          {/* Threat Model */}

          <div className="space-y-4">

            <h2 className="text-3xl font-bold">
              Security Thinking
            </h2>


            <p className="
              text-muted-foreground
              leading-relaxed
              whitespace-pre-wrap
            ">
              {project.threatModel}
            </p>


          </div>




          {/* Implementation */}

          <div className="space-y-4">


            <h2 className="text-3xl font-bold">
              Implementation
            </h2>



            <p className="
              text-muted-foreground
              leading-relaxed
              whitespace-pre-wrap
            ">
              {project.implementation}
            </p>




            {/* Code */}

            <div className="
              mt-6
              rounded-lg
              bg-secondary
              border
              border-border
              p-5
              overflow-x-auto
            ">


              <pre className="
                text-sm
                font-mono
                text-muted-foreground
              ">

                <code>

                  {project.code}

                </code>


              </pre>


            </div>


          </div>





          {/* Security Decisions */}

          <div className="space-y-4">

            <h2 className="text-3xl font-bold">
              Security Decisions
            </h2>


            <p className="
              text-muted-foreground
              leading-relaxed
              whitespace-pre-wrap
            ">

              {project.securityDecisions}

            </p>


          </div>





          {/* Improvements */}

          <div className="space-y-4">


            <h2 className="text-3xl font-bold">
              What I'd Improve Next
            </h2>



            <p className="
              text-muted-foreground
              leading-relaxed
              whitespace-pre-wrap
            ">

              {project.improvements}

            </p>


          </div>






          {/* CTA */}

          <div className="
            border-t
            border-border
            pt-12
          ">


            <p className="
              text-muted-foreground
              mb-6
            ">

              Interested in my approach to secure software development and cybersecurity engineering?

            </p>



            <Link href="/contact">

              <span
                className="
                inline-flex
                px-6
                py-3
                rounded-md
                bg-accent
                text-accent-foreground
                font-medium
                cursor-pointer
                hover:opacity-90
                transition
                "
              >

                Get in Touch

              </span>


            </Link>


          </div>



        </div>

      </section>


    </Layout>
  );
}
