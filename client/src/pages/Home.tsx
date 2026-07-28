import { Link } from "wouter";
import {
  ArrowRight,
  Github,
  Linkedin,
  Cloud,
  Brain,
  Code2,
  Shield,
  Container,
  Cpu,
  Database,
} from "lucide-react";

import Layout from "@/components/Layout";

export default function Home() {
  const focusAreas = [
    {
      title: "Cloud Security",
      icon: Cloud,
      description:
        "Building secure cloud-native applications while exploring identity, infrastructure security, and modern cloud practices.",
    },
    {
      title: "AI Engineering",
      icon: Brain,
      description:
        "Creating AI-powered applications, intelligent interfaces, and data-driven software experiences.",
    },
    {
      title: "Software Engineering",
      icon: Code2,
      description:
        "Developing modern full-stack applications with clean architecture, scalable systems, and strong UX.",
    },
  ];


  const projects = [
    {
      title: "AI Portfolio Terminal",
      badge: "Featured",
      description:
        "An AI-powered finance application combining data analysis, risk simulations, and intelligent interfaces.",
      tags: [
        "AI",
        "Python",
        "Data Engineering",
        "React",
      ],
      href: "/projects/1",
    },
    {
      title: "J.A.R.V.I.S. Cybersecurity Platform",
      badge: "In Development",
      description:
        "A futuristic SOC platform focused on threat intelligence, security monitoring, incident response, and automation.",
      tags: [
        "Cybersecurity",
        "React",
        "TypeScript",
        "Security Engineering",
      ],
      href: "/projects/2",
    },
    {
      title: "Pink Panther",
      badge: "UI / UX",
      description:
        "A premium commercial website focused on branding, user experience, and modern frontend development.",
      tags: [
        "Frontend",
        "Design",
        "React",
        "Tailwind",
      ],
      href: "/projects/3",
    },
  ];


  const technologies = [
    {
      title: "Frontend",
      items: ["React", "TypeScript", "Tailwind CSS"],
      icon: Code2,
    },
    {
      title: "Backend",
      items: ["Node.js", "Express", "APIs"],
      icon: Database,
    },
    {
      title: "Cloud",
      items: ["AWS", "Docker", "GitHub Actions"],
      icon: Cloud,
    },
    {
      title: "Security & AI",
      items: [
        "OWASP",
        "Threat Modeling",
        "Python",
        "AI APIs",
      ],
      icon: Shield,
    },
  ];


  const learning = [
    {
      name: "AWS Cloud",
      icon: Cloud,
    },
    {
      name: "Cloud Security",
      icon: Shield,
    },
    {
      name: "AI Engineering",
      icon: Brain,
    },
    {
      name: "Docker",
      icon: Container,
    },
    {
      name: "MLOps",
      icon: Cpu,
    },
  ];


  return (
    <Layout>

      {/* HERO */}

      <section className="py-24 border-b border-border">

        <div className="container">

          <div className="grid lg:grid-cols-2 gap-16 items-center">


            <div className="space-y-8">


              <div className="space-y-5">


                <p className="text-accent font-mono text-sm tracking-widest uppercase">
                  Software Engineer • Cloud Security • AI
                </p>


                <h1 className="text-5xl md:text-6xl font-bold leading-tight">

                  Building intelligent software for

                  <span className="text-accent">
                    {" "}cloud, AI, and secure applications
                  </span>

                </h1>


                <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">

                  I'm Toni, a software engineering student passionate about
                  cloud security, AI-powered applications, and modern web
                  development.

                  <br /><br />

                  I enjoy building products that combine clean user
                  experiences, scalable architecture, and security-first
                  thinking.

                </p>


              </div>



              <div className="flex flex-wrap gap-4">


                <Link href="/projects">

                  <span className="
                    inline-flex
                    items-center
                    gap-2
                    px-6
                    py-3
                    rounded-md
                    bg-accent
                    text-accent-foreground
                    font-medium
                    cursor-pointer
                    hover:opacity-90
                    transition
                  ">

                    View Projects

                    <ArrowRight size={18}/>

                  </span>

                </Link>



                <a
                  href="/cv.pdf"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    px-6
                    py-3
                    rounded-md
                    border
                    border-border
                    hover:bg-secondary
                    transition
                  "
                >

                  Download CV

                </a>


              </div>



            </div>




            {/* ENGINEERING DASHBOARD */}


            <div className="hidden lg:flex justify-center">


              <div className="
                w-80
                rounded-xl
                border
                border-border
                bg-secondary/30
                backdrop-blur
                p-6
              ">


                <div className="flex items-center justify-between mb-6">

                  <p className="font-mono text-sm text-accent">
                    SYSTEM STATUS
                  </p>

                  <span className="h-3 w-3 rounded-full bg-accent"></span>

                </div>



                <div className="space-y-5">


                  <Status
                    label="Cloud"
                    value="Learning"
                    icon={Cloud}
                  />

                  <Status
                    label="AI"
                    value="Building"
                    icon={Brain}
                  />

                  <Status
                    label="Security"
                    value="Active"
                    icon={Shield}
                  />

                  <Status
                    label="Projects"
                    value="4"
                    icon={Code2}
                  />


                </div>


              </div>


            </div>


          </div>

        </div>

      </section>





      {/* FOCUS AREAS */}


      <section className="py-20 border-b border-border">


        <div className="container">


          <p className="text-accent font-mono text-sm mb-4">
            What I Focus On
          </p>


          <h2 className="text-4xl font-bold mb-10">
            Engineering Interests
          </h2>



          <div className="grid md:grid-cols-3 gap-6">


            {focusAreas.map((item)=>{


              const Icon=item.icon;


              return (

                <div
                  key={item.title}
                  className="
                  rounded-xl
                  border
                  border-border
                  p-6
                  hover:border-accent/50
                  transition
                  "
                >

                  <Icon
                    className="text-accent mb-5"
                    size={32}
                  />


                  <h3 className="text-xl font-semibold mb-3">

                    {item.title}

                  </h3>


                  <p className="text-muted-foreground leading-relaxed">

                    {item.description}

                  </p>


                </div>

              );


            })}


          </div>


        </div>


      </section>





      {/* PROJECTS */}


      <section className="py-24">


        <div className="container">


          <p className="text-accent font-mono text-sm">
            Featured Work
          </p>


          <h2 className="text-4xl font-bold mt-3 mb-10">
            Selected Projects
          </h2>



          <div className="grid lg:grid-cols-3 gap-8">


            {projects.map(project=>(


              <Link href={project.href} key={project.title}>


                <span className="
                  group
                  flex
                  flex-col
                  h-full
                  rounded-xl
                  border
                  border-border
                  p-6
                  cursor-pointer
                  hover:bg-secondary/40
                  hover:border-accent/50
                  transition
                ">


                  <span className="
                    text-xs
                    text-accent
                    font-mono
                    mb-4
                  ">

                    {project.badge}

                  </span>



                  <h3 className="
                    text-xl
                    font-semibold
                    mb-4
                    group-hover:text-accent
                  ">

                    {project.title}

                  </h3>



                  <p className="
                    text-muted-foreground
                    text-sm
                    leading-relaxed
                  ">

                    {project.description}

                  </p>



                  <div className="flex flex-wrap gap-2 mt-6">


                    {project.tags.map(tag=>(

                      <span
                        key={tag}
                        className="
                        text-xs
                        px-3
                        py-1
                        rounded-md
                        bg-secondary
                        "
                      >

                        {tag}

                      </span>

                    ))}


                  </div>



                  <div className="
                    mt-auto
                    pt-8
                    flex
                    items-center
                    gap-2
                    text-accent
                  ">

                    View Project

                    <ArrowRight size={16}/>


                  </div>


                </span>


              </Link>


            ))}


          </div>


        </div>


      </section>






      {/* TECHNOLOGY */}



      <section className="py-20 border-t border-border">


        <div className="container">


          <h2 className="text-4xl font-bold mb-10">

            Technology Stack

          </h2>


          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


            {technologies.map(item=>{


              const Icon=item.icon;


              return (

                <div
                  key={item.title}
                  className="
                  border
                  border-border
                  rounded-xl
                  p-5
                  "
                >

                  <Icon
                    size={28}
                    className="text-accent mb-4"
                  />


                  <h3 className="font-semibold mb-3">

                    {item.title}

                  </h3>


                  {item.items.map(x=>(

                    <p
                      key={x}
                      className="text-sm text-muted-foreground"
                    >

                      {x}

                    </p>

                  ))}


                </div>

              );


            })}


          </div>


        </div>


      </section>





      {/* LEARNING */}


      <section className="py-20">


        <div className="container">


          <p className="text-accent font-mono text-sm mb-5">
            Currently Exploring
          </p>


          <div className="flex flex-wrap gap-4">


            {learning.map(item=>{


              const Icon=item.icon;


              return (

                <div
                  key={item.name}
                  className="
                  flex
                  items-center
                  gap-3
                  border
                  border-border
                  rounded-lg
                  px-5
                  py-3
                  "
                >

                  <Icon size={20}/>

                  {item.name}


                </div>

              );


            })}


          </div>


        </div>


      </section>






      {/* CONNECT CTA */}


      <section className="py-24 border-t border-border">


        <div className="container text-center">


          <h2 className="text-4xl font-bold mb-5">

            Interested in building secure software?

          </h2>


          <p className="text-muted-foreground mb-8">

            Let's connect and build something together.

          </p>



          <div className="flex justify-center gap-5">


            <a
              href="https://github.com/YOUR_GITHUB"
              target="_blank"
              className="text-accent"
            >

              <Github/>

            </a>


            <a
              href="https://linkedin.com/in/YOUR_LINKEDIN"
              target="_blank"
              className="text-accent"
            >

              <Linkedin/>

            </a>


          </div>


        </div>


      </section>


    </Layout>
  );
}





function Status({
  label,
  value,
  icon: Icon,
}:{
  label:string;
  value:string;
  icon:any;
}){


return (

<div className="
flex
items-center
justify-between
border-b
border-border
pb-3
">


<div className="flex items-center gap-3">

<Icon size={20}/>

<span>
{label}
</span>

</div>


<span className="text-accent font-mono text-sm">

{value}

</span>


</div>

);


}