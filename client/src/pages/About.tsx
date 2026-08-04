import { Download } from "lucide-react";
import { Link } from "wouter";
import Layout from "@/components/Layout";

/**
 * About page
 *
 * Security-focused personal introduction.
 * Explains engineering philosophy, background,
 * and approach to building secure systems.
 */

export default function About() {
  return (
    <Layout>

      {/* Header */}
      <section className="py-16 border-b border-border">

        <div className="container space-y-4">

          <p className="text-accent font-mono text-sm font-medium">
            About
          </p>

          <h1 className="text-5xl font-bold">
            Security-Minded Software Engineer
          </h1>

          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            I build software with security, architecture, and maintainability
            in mind. My focus is creating applications that are not only
            functional, but designed with the mindset of understanding
            threats and reducing risk.
          </p>

        </div>

      </section>



      {/* Content */}
      <section className="py-20">

        <div className="container max-w-4xl space-y-16">



          {/* Philosophy */}

          <section className="space-y-6">

            <h2 className="text-3xl font-bold">
              Security Starts With Architecture
            </h2>


            <p className="text-lg text-muted-foreground leading-relaxed">
              I believe security should be considered from the beginning of
              the development process, not added after problems appear.
              Good security starts with understanding the system, identifying
              possible threats, and making thoughtful engineering decisions.
            </p>


            <p className="text-lg text-muted-foreground leading-relaxed">
              My approach combines software development with security thinking:
              understanding how systems are built, how they can fail, and how
              they can be improved through better design.
            </p>


          </section>




          {/* Journey */}

          <section className="space-y-6 border-t border-border pt-12">

            <h2 className="text-3xl font-bold">
              My Journey
            </h2>


            <p className="text-lg text-muted-foreground leading-relaxed">
              My interest in cybersecurity started from curiosity about how
              technology works and how attackers find weaknesses in systems.
              Exploring security concepts, vulnerability research, and
              practical challenges helped me understand both offensive and
              defensive security.
            </p>


            <p className="text-lg text-muted-foreground leading-relaxed">
              Over time, my focus moved toward secure software engineering:
              building applications, designing better architectures, and
              applying cybersecurity principles throughout the development
              lifecycle.
            </p>


          </section>





          {/* Engineering mindset */}

          <section className="space-y-6 border-t border-border pt-12">

            <h2 className="text-3xl font-bold">
              Engineering Mindset
            </h2>


            <div className="grid md:grid-cols-2 gap-6">


              <div className="rounded-xl border border-border p-6">

                <h3 className="font-bold text-accent mb-3">
                  Threat Modeling First
                </h3>

                <p className="text-muted-foreground">
                  I analyze possible risks before implementation and design
                  systems with security considerations from the beginning.
                </p>

              </div>



              <div className="rounded-xl border border-border p-6">

                <h3 className="font-bold text-accent mb-3">
                  Secure Architecture
                </h3>

                <p className="text-muted-foreground">
                  I focus on creating clear structures, reusable components,
                  and maintainable systems.
                </p>

              </div>



              <div className="rounded-xl border border-border p-6">

                <h3 className="font-bold text-accent mb-3">
                  Defense in Depth
                </h3>

                <p className="text-muted-foreground">
                  Security should not depend on one protection layer.
                  Multiple controls create stronger systems.
                </p>

              </div>



              <div className="rounded-xl border border-border p-6">

                <h3 className="font-bold text-accent mb-3">
                  Continuous Improvement
                </h3>

                <p className="text-muted-foreground">
                  Technology changes constantly, so improving skills and
                  understanding new threats is part of the process.
                </p>

              </div>


            </div>


          </section>






          {/* Projects connection */}

          <section className="space-y-6 border-t border-border pt-12">


            <h2 className="text-3xl font-bold">
              Building Real Projects
            </h2>


            <p className="text-lg text-muted-foreground leading-relaxed">

              My projects are built as practical demonstrations of engineering
              decisions. From cybersecurity dashboards to AI-driven platforms,
              each project focuses on architecture, usability, and explaining
              why specific technical choices were made.

            </p>


          </section>






          {/* Skills */}

          <section className="space-y-6 border-t border-border pt-12">


            <h2 className="text-3xl font-bold">
              Skills & Technologies
            </h2>



            <div className="grid md:grid-cols-2 gap-8">


              <div>

                <h3 className="font-bold text-accent mb-3">
                  Software Engineering
                </h3>


                <ul className="space-y-2 text-muted-foreground">

                  <li>• React / TypeScript</li>
                  <li>• Node.js</li>
                  <li>• Python</li>
                  <li>• REST APIs</li>
                  <li>• Git & Version Control</li>

                </ul>


              </div>




              <div>

                <h3 className="font-bold text-accent mb-3">
                  Cybersecurity
                </h3>


                <ul className="space-y-2 text-muted-foreground">

                  <li>• Threat Modeling</li>
                  <li>• OWASP Top 10</li>
                  <li>• Authentication Security</li>
                  <li>• Secure Architecture</li>
                  <li>• Security Testing</li>

                </ul>


              </div>


            </div>


          </section>







          {/* Resume */}

          <section className="border-t border-border pt-12">


            <div className="
              flex
              flex-col
              sm:flex-row
              items-start
              sm:items-center
              justify-between
              gap-6
              p-6
              rounded-xl
              bg-secondary
              border
              border-border
            ">


              <div>

                <h3 className="font-bold mb-2">
                  Professional Background
                </h3>


                <p className="text-sm text-muted-foreground">
                  Download my resume for more details about my experience,
                  projects, and technical skills.
                </p>


              </div>



              <a
                href="/cv.pdf"
                className="
                inline-flex
                items-center
                gap-2
                px-5
                py-3
                rounded-md
                bg-accent
                text-accent-foreground
                font-medium
                hover:opacity-90
                transition
                "
              >

                <Download size={16}/>

                Download Resume

              </a>


            </div>


          </section>






          {/* CTA */}

          <section className="
            border-t
            border-border
            pt-12
            text-center
          ">


            <p className="text-muted-foreground mb-6">

              Interested in secure software development and cybersecurity
              engineering? Let's connect.

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


          </section>



        </div>

      </section>


    </Layout>
  );
}