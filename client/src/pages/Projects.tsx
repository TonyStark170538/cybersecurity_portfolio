import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";

/**
 * Projects Page
 *
 * Displays all portfolio projects.
 * Each project links to its case study page.
 */

export default function Projects() {

  const projects = [

    {
      id:1,

      title:"AI Portfolio Terminal",

      description:
      "An AI-powered financial intelligence platform combining data visualization, analytics workflows, and intelligent software design.",

      tags:[
        "React",
        "TypeScript",
        "Python",
        "AI",
        "Data Engineering"
      ],

      metrics:[
        "AI Workflow",
        "Data Processing",
        "Visualization"
      ],

      href:"/projects/1",

      featured:true,
    },


    {
      id:2,

      title:"J.A.R.V.I.S. Cybersecurity Platform",

      description:
      "A Security Operations Center inspired cybersecurity dashboard focused on monitoring, threat intelligence, and incident response workflows.",

      tags:[
        "React",
        "TypeScript",
        "Cybersecurity",
        "SOC"
      ],

      metrics:[
        "8 Security Modules",
        "Threat Intelligence",
        "Incident Response"
      ],

      href:"/projects/2",

      featured:false,
    },


    {
      id:3,

      title:"Pink Panther",

      description:
      "A premium frontend project focused on branding, design systems, animations, and modern user experience.",

      tags:[
        "React",
        "Tailwind",
        "UI/UX"
      ],

      metrics:[
        "Design System",
        "Responsive UI",
        "Frontend Architecture"
      ],

      href:"/projects/3",

      featured:false,
    },

  ];



  return (

    <Layout>


      {/* Header */}

      <section className="py-16 border-b border-border">

        <div className="container space-y-4">


          <p className="text-accent font-mono text-sm font-medium">

            Portfolio

          </p>



          <h1 className="text-5xl font-bold">

            Selected Projects

          </h1>




          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">

            A collection of projects exploring secure software
            engineering, cybersecurity, artificial intelligence,
            and modern frontend development. Each case study
            explains the problem, architecture, engineering
            decisions, and lessons learned.

          </p>


        </div>

      </section>





      {/* Project Cards */}


      <section className="py-20">


        <div className="container">


          <div className="grid md:grid-cols-2 gap-8">



            {projects.map((project)=>(


              <Link
                key={project.id}
                href={project.href}
              >


                <span

                  className={`
                  group
                  flex
                  flex-col
                  h-full
                  rounded-xl
                  border
                  cursor-pointer
                  p-8
                  transition-all

                  ${
                    project.featured
                    ?
                    "md:col-span-2 border-accent/50 bg-secondary/40 hover:border-accent"
                    :
                    "border-border hover:border-accent/50 hover:bg-secondary/50"
                  }

                  `}

                >




                  {/* Featured Badge */}


                  {project.featured && (

                    <span

                      className="
                      mb-5
                      w-fit
                      rounded-full
                      bg-accent/10
                      px-3
                      py-1
                      text-xs
                      font-medium
                      text-accent
                      "

                    >

                      Featured Project

                    </span>

                  )}






                  {/* Title */}


                  <h2

                    className="
                    text-2xl
                    font-bold
                    group-hover:text-accent
                    transition-colors
                    "

                  >

                    {project.title}

                  </h2>







                  {/* Description */}


                  <p

                    className="
                    mt-4
                    max-w-3xl
                    text-sm
                    leading-relaxed
                    text-muted-foreground
                    "

                  >

                    {project.description}

                  </p>







                  {/* Metrics */}


                  <div className="mt-6 space-y-2">


                    {project.metrics.map((metric)=>(


                      <div

                        key={metric}

                        className="
                        flex
                        items-center
                        gap-2
                        text-sm
                        text-muted-foreground
                        "

                      >


                        <span className="text-accent">

                          ✓

                        </span>


                        {metric}


                      </div>


                    ))}


                  </div>








                  {/* Tags */}


                  <div className="mt-6 flex flex-wrap gap-2">


                    {project.tags.map((tag)=>(


                      <span

                        key={tag}

                        className="
                        rounded
                        bg-secondary
                        px-3
                        py-1
                        text-xs
                        text-muted-foreground
                        "

                      >

                        {tag}

                      </span>


                    ))}


                  </div>







                  {/* Button */}


                  <div

                    className="
                    mt-auto
                    pt-8
                    flex
                    items-center
                    gap-2
                    text-sm
                    font-medium
                    text-accent
                    group-hover:gap-3
                    transition-all
                    "

                  >

                    Read Case Study

                    <ArrowRight size={16}/>


                  </div>





                </span>


              </Link>



            ))}



          </div>



        </div>


      </section>



    </Layout>

  );

}