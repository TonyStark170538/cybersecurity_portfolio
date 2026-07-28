import { useRoute } from "wouter";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  Layers,
  CheckCircle,
  Lightbulb,
} from "lucide-react";
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

  const projects = {

"1": {

id:1,

title:"AI Portfolio Terminal",

subtitle:
"An AI-powered financial intelligence platform combining data analysis, risk simulation, and intelligent software design.",


tags:[
"React",
"TypeScript",
"Python",
"AI",
"Data Engineering"
],


repoUrl:
"https://github.com/YOUR_USERNAME/ai-terminal",


demoUrl:
"https://YOUR-DEMO.com",


overview:
`
AI Portfolio Terminal is an application exploring how artificial intelligence
can improve financial analysis and decision making.

The project combines frontend engineering, data processing,
and AI workflows into one interactive experience.

My goal was building a product rather than only a technical demo.
`,


metrics:[
{
label:"Components",
value:"25+"
},
{
label:"Technologies",
value:"8"
},
{
label:"Focus",
value:"AI + Data"
}
],


architecture:[
"React Frontend",
"API Layer",
"AI Processing",
"Data Visualization"
],


problem:
`
Financial information is often difficult to understand because users need
to combine multiple sources of data.

The goal was creating a simple interface where users can explore,
visualize, and analyze information through intelligent software.
`,


decisions:[
"Used TypeScript to improve reliability",
"Created reusable React components",
"Separated UI and business logic",
"Designed architecture for future AI expansion"
],


timeline:[
"Research and planning",
"Frontend development",
"AI integration",
"Testing and improvements"
],


lessons:[
"Designing scalable frontend architecture",
"Integrating AI into real products",
"Building maintainable software systems"
],


improvements:
`
Future improvements:

• Real-time data integration

• Cloud deployment

• Authentication

• Machine learning models

• Automated testing

`,



},




"2": {


id:2,

title:"J.A.R.V.I.S. Cybersecurity Platform",

subtitle:
"A Security Operations Center dashboard focused on monitoring, threat intelligence, and incident response.",


tags:[
"React",
"TypeScript",
"Cybersecurity",
"SOC"
],


repoUrl:
"https://github.com/YOUR_USERNAME/jarvis",


demoUrl:
"https://YOUR-DEMO.com",


overview:
`
J.A.R.V.I.S. is a cybersecurity platform designed to simulate
a modern Security Operations Center environment.

The project explores how security analysts interact with
alerts, incidents, and threat intelligence.
`,


metrics:[
{
label:"Modules",
value:"8"
},
{
label:"Focus",
value:"SOC"
},
{
label:"Status",
value:"Building"
}
],


architecture:[
"React Dashboard",
"Security API",
"Threat Intelligence",
"Monitoring System"
],


problem:
`
Security teams often use many disconnected tools.

The goal was designing one interface that improves visibility
and simplifies security workflows.
`,


decisions:[
"Security workflow based design",
"Reusable dashboard components",
"TypeScript architecture",
"Future SIEM integration"
],


timeline:[
"Research",
"UI Development",
"Security Modules",
"Future Integration"
],


lessons:[
"Security UX design",
"Threat modeling",
"Building complex dashboards"
],


improvements:
`
Future improvements:

• Real security telemetry

• Wazuh integration

• MITRE ATT&CK mapping

• Automated response

`

},




"3": {


id:3,

title:"Pink Panther",

subtitle:
"A premium frontend project focused on branding, design systems, and user experience.",


tags:[
"React",
"Tailwind",
"UI/UX"
],


repoUrl:
"https://github.com/YOUR_USERNAME/pink-panther",


demoUrl:
"https://YOUR-DEMO.com",


overview:
`
Pink Panther demonstrates frontend engineering
combined with modern product design principles.
`,


metrics:[
{
label:"Type",
value:"Frontend"
},
{
label:"Focus",
value:"UX"
},
{
label:"Stack",
value:"React"
}
],


architecture:[
"React Components",
"Design System",
"Responsive UI",
"Deployment"
],


problem:
`
Many websites function correctly but fail to create memorable experiences.

This project focused on balancing visual design and engineering quality.
`,


decisions:[
"Component architecture",
"Reusable UI patterns",
"Responsive layouts"
],


timeline:[
"Design",
"Development",
"Testing",
"Polishing"
],


lessons:[
"Frontend architecture",
"UX thinking",
"Visual consistency"
],


improvements:
`
Future improvements:

• Backend integration

• CMS

• Analytics

`

}

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




      {/* Case Study Content */}

<section className="py-20">

<div className="container max-w-5xl space-y-20">


{/* OVERVIEW */}

<div className="
rounded-xl
border
border-border
p-8
bg-secondary/20
">


<h2 className="text-3xl font-bold mb-6">
Project Overview
</h2>


<p className="
text-muted-foreground
leading-relaxed
whitespace-pre-wrap
">
{project.overview}
</p>


</div>





{/* METRICS */}


<div>


<h2 className="text-3xl font-bold mb-8">
Project Metrics
</h2>


<div className="grid md:grid-cols-3 gap-6">


{project.metrics?.map((item)=>(
<div
key={item.label}
className="
rounded-xl
border
border-border
p-6
text-center
"
>


<p className="
text-3xl
font-bold
text-accent
">

{item.value}

</p>


<p className="
text-sm
text-muted-foreground
mt-2
">

{item.label}

</p>


</div>
))}


</div>


</div>






{/* ARCHITECTURE */}



<div>


<h2 className="text-3xl font-bold mb-8">

Architecture

</h2>



<div className="
grid
md:grid-cols-4
gap-4
">


{project.architecture?.map((item,index)=>(

<div
key={item}
className="
relative
rounded-xl
border
border-border
p-6
text-center
bg-secondary/20
"
>


<Layers
className="
mx-auto
mb-4
text-accent
"
/>


<p className="font-medium">

{item}

</p>


{index !== project.architecture.length -1 && (

<span className="
hidden
md:block
absolute
right-[-15px]
top-1/2
text-accent
">

→

</span>

)}



</div>


))}


</div>


</div>







{/* PROBLEM */}


<div>


<h2 className="text-3xl font-bold mb-6">

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







{/* ENGINEERING DECISIONS */}



<div>


<h2 className="text-3xl font-bold mb-8">

Engineering Decisions

</h2>


<div className="grid md:grid-cols-2 gap-5">


{project.decisions?.map((item)=>(


<div
key={item}
className="
rounded-xl
border
border-border
p-6
"
>


<CheckCircle
className="
text-accent
mb-4
"
/>


<p className="
text-muted-foreground
">

{item}

</p>


</div>


))}


</div>


</div>







{/* TIMELINE */}



<div>


<h2 className="text-3xl font-bold mb-8">

Development Timeline

</h2>



<div className="space-y-5">


{project.timeline?.map((item,index)=>(


<div
key={item}
className="
flex
items-center
gap-5
"
>


<div className="
h-10
w-10
rounded-full
bg-accent/10
text-accent
flex
items-center
justify-center
font-bold
">

{index+1}

</div>



<p>

{item}

</p>


</div>


))}


</div>


</div>








{/* LESSONS */}



<div>


<h2 className="text-3xl font-bold mb-8">

Lessons Learned

</h2>



<div className="
grid
md:grid-cols-3
gap-5
">


{project.lessons?.map((item)=>(


<div
key={item}
className="
rounded-xl
border
border-border
p-6
"
>


<Lightbulb
className="
text-accent
mb-4
"
/>


<p className="
text-muted-foreground
">

{item}

</p>


</div>



))}


</div>


</div>








{/* IMPROVEMENTS */}



<div>


<h2 className="text-3xl font-bold mb-6">

Future Improvements

</h2>


<p className="
text-muted-foreground
leading-relaxed
whitespace-pre-wrap
">

{project.improvements}

</p>


</div>




</div>


</section>

      {/* CTA */}

      <section className="border-t border-border py-12">

        <div className="container">

          <p className="
            text-muted-foreground
            mb-6
          ">

            Interested in my engineering approach?

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

      </section>


    </Layout>
  );
}