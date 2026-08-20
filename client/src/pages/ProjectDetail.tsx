import { useRoute, Link } from "wouter";

import {
  Github,
  ExternalLink,
  ArrowLeft,
  Layers,
  CheckCircle,
  Lightbulb,
  Sparkles,
  Shield,
  Cpu,
} from "lucide-react";

import Layout from "@/components/Layout";

import jarvis from "@/images/jarvis.png";
import jarvisDiagram from "@/images/jarvisdiagram.png";

import terminal from "@/images/terminal.png";
import terminalDiagram from "@/images/terminaldiagram.png";

import pink from "@/images/pink.png";
import pinkDiagram from "@/images/pinkdiagram.png";



const themes = {

ai: {

name:"AI Intelligence System",

background:"#0B0E16",

glow:
"radial-gradient(circle, rgba(214,165,68,.22), transparent 65%)",

accent:"#D6A544",

accentSoft:"#E4B95E",

card:
"bg-[#161E3F]/60",

border:
"border-[#2D3650]",

button:
"bg-[#D6A544] text-[#0B0E16]",

icon:Cpu

},



security: {

name:"Security Operations Center",

background:"#0B0E16",

glow:
"radial-gradient(circle, rgba(181,26,43,.28), transparent 65%)",

accent:"#B51A2B",

accentSoft:"#D02B40",

card:
"bg-[#161E3F]/60",

border:
"border-[#2D3650]",

button:
"bg-[#B51A2B] text-white",

icon:Shield

},




pink: {

name:"Luxury Creative System",

background:"#0D0B10",

glow:
"radial-gradient(circle, rgba(232,138,168,.28), transparent 65%)",

accent:"#E8A7B8",

accentSoft:"#F6C5D5",

card:
"bg-[#21151D]/70",

border:
"border-[#3A2630]",

button:
"bg-[#E8A7B8] text-black",

icon:Sparkles

}

};





export default function ProjectDetail() {


const [match, params] = useRoute("/projects/:id");


if(!match)
return null;




const projects = {



"1": {


id:1,

theme:"ai",

title:"AI Portfolio Terminal",

image:terminal,

diagram:terminalDiagram,


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
"https://github.com/TonyStark170538/portfolio",


demoUrl:
"https://portfolio-chi-navy-93.vercel.app",



overview:
`
AI Portfolio Terminal explores how artificial intelligence
can improve financial analysis and decision making.

The project combines frontend engineering,
data processing, and AI workflows into one interactive experience.
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
Financial information is often difficult to understand
because users must combine multiple sources of data.

The goal was creating a simple interface where users
can explore and analyze information through intelligent software.
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
`

},





"2": {


id:2,

theme:"security",

title:"J.A.R.V.I.S. Cybersecurity Platform",

image:jarvis,

diagram:jarvisDiagram,



subtitle:
"A Security Operations Center dashboard focused on monitoring, threat intelligence, and incident response.",



tags:[

"React",

"TypeScript",

"Cybersecurity",

"SOC"

],



repoUrl:
"https://github.com/TonyStark170538/jarvis-platform",



demoUrl:
"https://jarvis-platform-gamma.vercel.app",



overview:
`
J.A.R.V.I.S. is a cybersecurity platform designed
to simulate a modern Security Operations Center environment.

The project explores how security analysts interact
with alerts, incidents, and threat intelligence.
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

The goal was designing one interface that improves
visibility and simplifies security workflows.
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

theme:"pink",

title:"Pink Panther",

image:pink,

diagram:pinkDiagram,



subtitle:
"A premium frontend project focused on branding, design systems, and user experience.",



tags:[

"React",

"Tailwind",

"UI/UX"

],



repoUrl:
"https://github.com/TonyStark170538/pinkpanther",



demoUrl:
"https://pinkpanther1.onrender.com/",



overview:
`
Pink Panther demonstrates frontend engineering
combined with modern product design principles.

The focus was creating a memorable digital experience
while maintaining strong engineering foundations.
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
Many websites function correctly but fail
to create memorable experiences.

This project focused on balancing visual design
and engineering quality.
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





const project =
projects[params?.id as keyof typeof projects];



if(!project){

return(

<Layout>

<section className="py-32">

<div className="container text-center">

<h1 className="text-5xl font-bold">
Project Not Found
</h1>


<Link href="/projects">

<span className="
inline-flex
mt-8
text-[#D6A544]
cursor-pointer
">

Back to Projects

</span>

</Link>


</div>

</section>

</Layout>

)

}





const theme =
project.theme === "ai"
?
themes.ai
:
project.theme === "security"
?
themes.security
:
themes.pink;



const ThemeIcon = theme.icon;
return (

<Layout>


{/* PROJECT HERO */}

<section
className="
relative
overflow-hidden
py-20
"
style={{
background:
`linear-gradient(
135deg,
${theme.background},
#161E3F
)`
}}
>


{/* Atmospheric Glow */}

<div
className="
absolute
inset-0
pointer-events-none
"
style={{
background:theme.glow
}}
/>



<div className="container relative">


<Link href="/projects">

<span
className="
inline-flex
items-center
gap-2
text-sm
mb-10
text-muted-foreground
hover:text-white
transition
cursor-pointer
"
>

<ArrowLeft size={16}/>

Back to Projects

</span>

</Link>





<div className="grid lg:grid-cols-2 gap-14 items-center">



<div className="space-y-8">



<div
className="
flex
items-center
gap-3
font-mono
text-sm
"
style={{
color:theme.accent
}}
>

<ThemeIcon size={18}/>

{theme.name}

</div>





<h1
className="
text-5xl
md:text-6xl
font-bold
leading-tight
"
>

{project.title}

</h1>





<p
className="
text-xl
text-muted-foreground
leading-relaxed
max-w-xl
"
>

{project.subtitle}

</p>







<div className="flex flex-wrap gap-3">


{project.tags.map(tag=>(


<span

key={tag}

className="
px-3
py-1
rounded-full
text-xs
border
"
style={{

borderColor:theme.accent,

color:theme.accent

}}

>

{tag}

</span>


))}



</div>








<div className="flex flex-wrap gap-4 pt-4">



<a

href={project.repoUrl}

target="_blank"

className="
inline-flex
items-center
gap-2
px-6
py-3
rounded-full
font-medium
transition
hover:scale-105
"

style={{

background:theme.accent,

color:
project.theme==="pink"
?
"#000"
:
"#0B0E16"

}}

>


<Github size={17}/>

Repository


</a>







<a

href={project.demoUrl}

target="_blank"

className="
inline-flex
items-center
gap-2
px-6
py-3
rounded-full
border
font-medium
transition
hover:scale-105
"

style={{

borderColor:theme.accent,

color:theme.accent

}}

>


<ExternalLink size={17}/>

Live Demo


</a>



</div>



</div>







{/* IMAGE */}

<div
className="
relative
"
>


<div

className="
absolute
inset-0
blur-3xl
opacity-40
"
style={{
background:theme.accent
}}

/>



<div
className="
relative
rounded-3xl
overflow-hidden
border
shadow-2xl
"
style={{

borderColor:theme.accent

}}

>


<img

src={project.image}

alt={project.title}

className="
w-full
object-cover
"

/>


</div>


</div>





</div>


</div>


</section>







{/* OVERVIEW */}



<section className="py-20">


<div className="container max-w-5xl">


<div

className="
rounded-3xl
p-8
backdrop-blur-xl
border
"

style={{

background:"rgba(36,47,73,.72)",

borderColor:theme.accent

}}

>



<h2 className="text-3xl font-bold mb-6">

Project Overview

</h2>



<p

className="
whitespace-pre-wrap
leading-relaxed
text-muted-foreground
"

>

{project.overview}

</p>


</div>



</div>


</section>









{/* METRICS */}


<section className="pb-20">


<div className="container">


<h2 className="text-3xl font-bold mb-8">

System Metrics

</h2>



<div className="
grid
md:grid-cols-3
gap-6
">


{project.metrics.map(metric=>(


<div

key={metric.label}

className="
rounded-3xl
p-7
border
backdrop-blur
transition
hover:-translate-y-2
"

style={{

background:"rgba(36,47,73,.55)",

borderColor:"#2D3650"

}}

>


<p

className="
text-4xl
font-bold
mb-2
"

style={{

color:theme.accent

}}

>

{metric.value}

</p>


<p className="
text-muted-foreground
font-mono
text-sm
">

{metric.label}

</p>



</div>


))}


</div>


</div>


</section>









{/* ARCHITECTURE */}



<section className="pb-24">


<div className="container">


<h2 className="text-3xl font-bold mb-10">

Architecture

</h2>





<div

className="
rounded-3xl
border
p-6
mb-10
"

style={{

borderColor:"#2D3650",

background:"rgba(36,47,73,.5)"

}}

>


<img

src={project.diagram}

alt="Architecture"

className="
rounded-2xl
w-full
"

/>


</div>








<div className="
grid
md:grid-cols-4
gap-5
">


{project.architecture.map((item,index)=>(


<div

key={item}

className="
relative
rounded-2xl
border
p-6
text-center
transition
hover:-translate-y-2
"

style={{

borderColor:theme.accent,

background:"rgba(36,47,73,.45)"

}}

>


<Layers

className="
mx-auto
mb-4
"

style={{

color:theme.accent

}}

/>



<p className="font-medium">

{item}

</p>




{index !== project.architecture.length-1 && (

<span
className="
hidden
md:block
absolute
right-[-15px]
top-1/2
"
style={{

color:theme.accent

}}

>

→

</span>

)}



</div>


))}



</div>




</div>


</section>
{/* PROBLEM */}

<section className="pb-20">

<div className="container max-w-5xl">


<h2 className="text-3xl font-bold mb-8">

Problem

</h2>



<div

className="
rounded-3xl
border
p-8
"

style={{

background:"rgba(36,47,73,.45)",

borderColor:"#2D3650"

}}

>


<p

className="
whitespace-pre-wrap
leading-relaxed
text-muted-foreground
"

>

{project.problem}

</p>


</div>



</div>

</section>








{/* ENGINEERING DECISIONS */}



<section className="pb-20">


<div className="container max-w-5xl">


<h2 className="text-3xl font-bold mb-8">

Engineering Decisions

</h2>




<div className="
grid
md:grid-cols-2
gap-6
">


{project.decisions.map(item=>(



<div

key={item}

className="
rounded-3xl
border
p-6
flex
gap-4
items-start
transition
hover:-translate-y-1
"

style={{

background:"rgba(36,47,73,.55)",

borderColor:"#2D3650"

}}

>


<CheckCircle

size={24}

style={{

color:theme.accent

}}

/>



<p className="text-muted-foreground">

{item}

</p>


</div>


))}


</div>



</div>


</section>









{/* TIMELINE */}



<section className="pb-20">


<div className="container max-w-5xl">


<h2 className="text-3xl font-bold mb-10">

Development Timeline

</h2>




<div className="space-y-6">


{project.timeline.map((item,index)=>(


<div

key={item}

className="
flex
items-center
gap-6
"

>


<div

className="
w-12
h-12
rounded-full
flex
items-center
justify-center
font-bold
border
"

style={{

color:theme.accent,

borderColor:theme.accent,

background:"rgba(36,47,73,.5)"

}}

>

{index+1}

</div>




<div

className="
flex-1
rounded-2xl
border
px-6
py-4
"

style={{

background:"rgba(36,47,73,.45)",

borderColor:"#2D3650"

}}

>


<p>

{item}

</p>


</div>



</div>



))}



</div>



</div>



</section>









{/* LESSONS */}



<section className="pb-20">


<div className="container max-w-5xl">


<h2 className="text-3xl font-bold mb-8">

Lessons Learned

</h2>





<div className="
grid
md:grid-cols-3
gap-6
">



{project.lessons.map(item=>(



<div

key={item}

className="
rounded-3xl
border
p-6
"

style={{

background:"rgba(36,47,73,.5)",

borderColor:"#2D3650"

}}

>


<Lightbulb

className="mb-5"

style={{

color:theme.accent

}}

/>



<p className="text-muted-foreground">

{item}

</p>



</div>


))}



</div>


</div>


</section>









{/* FUTURE IMPROVEMENTS */}



<section className="pb-24">


<div className="container max-w-5xl">



<div

className="
rounded-3xl
border
p-10
relative
overflow-hidden
"

style={{

background:
`linear-gradient(
135deg,
rgba(36,47,73,.8),
rgba(11,14,22,.9)
)`,

borderColor:theme.accent

}}

>



<div

className="
absolute
right-0
top-0
w-72
h-72
blur-3xl
opacity-20
"

style={{

background:theme.accent

}}

/>





<h2 className="text-3xl font-bold mb-6 relative">

Future Improvements

</h2>



<p

className="
relative
whitespace-pre-wrap
leading-relaxed
text-muted-foreground
"

>

{project.improvements}

</p>



</div>




</div>


</section>









{/* PROJECT END */}



<section className="pb-32">


<div className="container text-center">



<div

className="
inline-flex
items-center
gap-3
rounded-full
px-6
py-3
border
"

style={{

borderColor:theme.accent,

color:theme.accent

}}

>


<ThemeIcon size={18}/>


<span className="font-mono text-sm">

Project In Progress

</span>


</div>



<h2 className="text-4xl font-bold mt-8">

Building the next generation of security systems
</h2>



<p className="mt-4 text-muted-foreground">

The platform is actively evolving through new security
modules, integrations, and threat intelligence capabilities.


</p>



</div>


</section>



</Layout>

);

}