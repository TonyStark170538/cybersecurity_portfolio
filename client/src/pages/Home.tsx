
import { Link } from "wouter";

import {
  ArrowRight,
  Github,
  Linkedin,
  Cloud,
  Brain,
  Code2,
  Shield,
  Cpu,
  Lock,
  FileText,
} from "lucide-react";

import Layout from "@/components/Layout";
import Robot from "@/components/robot/Robot";
import { Download } from "lucide-react";
import { useState } from "react";
import RobotAssistant from "@/components/robot/RobotAssistant";
import type { RobotVisualState } from "@/components/robot/RobotModel";

export default function Home() {
const [aiMode, setAiMode] = useState(false);
const [robotState, setRobotState] =
  useState<RobotVisualState>("ready");


const focusAreas = [

{
title:"Security Engineering",
icon:Shield,
description:
"Designing secure applications through threat modeling, secure architecture, vulnerability awareness, and defensive engineering."
},

{
title:"Cloud Infrastructure",
icon:Cloud,
description:
"Building and exploring cloud-native systems with AWS, Google Cloud, Docker, and modern deployment practices."
},

{
title:"AI Systems",
icon:Brain,
description:
"Creating intelligent applications by combining AI workflows, data processing, and modern software engineering."
}

];





const projects = [

{
title:"AI Portfolio Terminal",
badge:"Featured AI Project",
description:
"An AI-powered financial intelligence platform combining data analysis, visualization, and intelligent workflows.",
tags:[
"AI",
"Python",
"Data Engineering",
"React"
],
href:"/projects/1"
},


{
title:"J.A.R.V.I.S. Cybersecurity Platform",
badge:"Security Platform",
description:
"A futuristic SOC-inspired platform focused on threat intelligence, monitoring, incident response, and security automation.",
tags:[
"Cybersecurity",
"React",
"TypeScript",
"SOC"
],
href:"/projects/2"
},


{
title:"Pink Panther",
badge:"Frontend Engineering",
description:
"A premium commercial website focused on branding, user experience, and modern frontend development.",
tags:[
"React",
"Tailwind",
"UI/UX"
],
href:"/projects/3"
}

];






const technologies = [

{
title:"Application Development",
icon:Code2,
items:[
"React",
"TypeScript",
"Node.js",
"APIs"
]
},


{
title:"Security Engineering",
icon:Shield,
items:[
"OWASP",
"Threat Modeling",
"Secure Coding",
"Web Security"
]
},


{
title:"Cloud & DevOps",
icon:Cloud,
items:[
"AWS",
"Google Cloud",
"Docker",
"GitHub Actions"
]
},


{
title:"AI Systems",
icon:Cpu,
items:[
"Python",
"AI APIs",
"Data Processing",
"MLOps"
]
}

];





const writeups = [

{
title:"Understanding XSS Vulnerabilities",
tag:"Web Security"
},

{
title:"OWASP Top 10 Security Analysis",
tag:"Application Security"
},

{
title:"AES vs RSA Cryptography Basics",
tag:"Cryptography"
}

];





const learning = [

"AWS Cloud",
"Google Cloud",
"Cloud Security",
"AI Engineering",
"Docker",
"MLOps"

];



return (

<Layout>

<div
className={`
min-h-screen
transition-all
duration-700
${aiMode ? "ai-mode" : ""}
`}
>


{/* HERO */}


<section className="
relative
overflow-hidden

pt-20
pb-12

lg:pt-32
lg:pb-32
">


<div className="
absolute
top-0
right-0

w-[700px]
h-[700px]

bg-[radial-gradient(circle,rgba(181,26,43,.22),transparent_65%)]

blur-3xl

pointer-events-none
"/>


<div
  className="
  absolute
  bottom-0
  left-0

  w-[500px]
  h-[500px]

  bg-[radial-gradient(circle,rgba(214,165,68,.10),transparent_70%)]

  blur-3xl

  pointer-events-none
"
/>




<div className="container">


<div className="
grid
lg:grid-cols-[1.1fr_0.9fr]
gap-4
items-center
">





<div className="space-y-8">



<p className="
text-accent
font-mono
text-sm
tracking-widest
uppercase
">

Software Engineer • Security • Cloud • AI

</p>





<h1 className="
text-5xl
md:text-7xl
font-bold
leading-tight
">


Hi I


<span className="
text-[#D6A544]
">

'm Toni

</span>


</h1>





<p className="
text-lg
text-muted-foreground
max-w-xl
leading-relaxed
">


A software engineer focused on
cybersecurity, cloud infrastructure, and AI-powered applications.


<br/><br/>


I build projects that combine secure architecture,
clean user experiences, and engineering practices inspired
by real-world security teams.


</p>






<div className="
flex
flex-wrap
gap-5
">



<Link
  href="/projects"
  onClick={()=>{
    const audio = new Audio("/models/projects.mp3");
    audio.play().catch((error)=>{
      console.error("Unable to play robot voice:", error);
    });
  }}
  className="stark-button inline-flex items-center gap-3 px-7 py-3"
>
  View Projects
  <ArrowRight size={18} />
</Link>





<a
  href="/CV.pdf"
  download="Antonina_Shcherbakova_CV.pdf"
  target="_blank"
  rel="noopener noreferrer"
  className="stark-button inline-flex items-center gap-3 px-7 py-3 cursor-pointer"
>
  <Download size={18} />
  Download CV
</a>




</div>



</div>







{/* SECURITY STATUS */}

<div className="flex justify-center lg:justify-end relative">

  <div
    className="
    relative

    w-[320px]
    h-[320px]

    sm:w-[400px]
    sm:h-[400px]

    lg:w-[500px]
    lg:h-[660px]

    translate-y-6
    "
  >

<Robot
  state={robotState}
  frozen={aiMode}
  onActivate={() => {
    setAiMode(true);
  }}
/>

<RobotAssistant
  open={aiMode}

  onClose={() => {
    setAiMode(false);
    setRobotState("ready");
  }}

  onStateChange={setRobotState}
/>



</div>

</div>
</div>
</div>
</section>



{/* SECURITY PROFILE */}


<section className="
py-24
relative
">


<div className="container">



<div className="
max-w-3xl

mb-14
">


<p className="
text-accent

font-mono

text-sm

tracking-widest

uppercase

mb-4
">

Security Profile

</p>




<h2 className="
text-4xl

md:text-5xl

font-bold
">

How I Build

</h2>




<p className="
text-muted-foreground

mt-5

leading-relaxed
">

Security is not added at the end. I focus on designing,
building, and improving systems with security considered
from the beginning.

</p>


</div>






<div className="
grid

md:grid-cols-2

lg:grid-cols-4

gap-12
">


{

[
[
"Threat Modeling",
"Thinking like an attacker before writing code."
],

[
"Secure Architecture",
"Designing systems with security from the beginning."
],

[
"Application Security",
"Understanding vulnerabilities and defenses."
],

[
"Continuous Learning",
"Following new technologies and threats."
]

].map(item=>(



<div
key={item[0]}

className="
group

relative

pl-6
"
>


<div className="
absolute

left-0

top-0

bottom-0

w-px

bg-gradient-to-b

from-[#D6A544]

to-transparent

opacity-40

group-hover:opacity-100

transition
"/>





<h3 className="
font-bold

text-lg

mb-3

group-hover:text-[#E4B95E]

transition
">

{item[0]}

</h3>




<p className="
text-sm

text-muted-foreground

leading-relaxed
">

{item[1]}

</p>



</div>



))

}



</div>



</div>


</section>









{/* ENGINEERING INTERESTS */}



<section className="
py-24
">


<div className="container">



<p className="
text-accent

font-mono

text-sm

tracking-widest

uppercase

mb-4
">

Core Systems

</p>




<h2 className="
text-4xl

md:text-5xl

font-bold

mb-14
">

Engineering Interests

</h2>






<div className="
grid

md:grid-cols-3

gap-10
">


{

focusAreas.map(item=>{


const Icon=item.icon;



return (



<div

key={item.title}

className="
group

relative

py-8
"
>



<div className="
absolute

inset-0

rounded-3xl

bg-[radial-gradient(circle_at_top,rgba(181,26,43,.12),transparent_70%)]

opacity-0

group-hover:opacity-100

transition

blur-xl
"/>





<div className="
relative
">



<Icon

className="
text-[#D6A544]

group-hover:text-[#B51A2B]

transition

mb-6
"

size={36}

/>




<h3 className="
text-xl

font-bold

mb-4
">

{item.title}

</h3>




<p className="
text-muted-foreground

leading-relaxed
">

{item.description}

</p>



</div>




</div>



)


})

}



</div>



</div>


</section>









{/* FEATURED PROJECTS */}



<section className="
py-28
">


<div className="container">



<div className="
mb-14
">


<p className="
text-accent

font-mono

text-sm

tracking-widest

uppercase

mb-4
">

Selected Work

</p>



<h2 className="
text-4xl

md:text-5xl

font-bold
">

Featured Projects

</h2>


</div>






<div className="
grid

lg:grid-cols-3

gap-8
">


{

projects.map(project=>(



<Link
  href={project.href}
  key={project.title}
  onClick={()=>{
    const audio = new Audio("/models/projects.mp3");
    audio.play().catch((error)=>{
      console.error("Unable to play robot voice:", error);
    });
  }}
>



<span

className="
group

relative

block

h-full

cursor-pointer
"
>




<div className="
absolute

inset-0

rounded-3xl

bg-[#B51A2B]

opacity-0

blur-3xl

group-hover:opacity-10

transition
"/>







<div className="
relative
rounded-3xl
bg-[#161E3F]/40
backdrop-blur-xl
p-8
min-h-[360px]
flex
flex-col
hover:bg-[#242F49]/60
transition
">





<p className="
text-xs

uppercase

tracking-widest

font-mono

text-[#D6A544]

mb-8
">

{project.badge}

</p>





<h3 className="
text-2xl

font-bold

mb-5

group-hover:text-[#E4B95E]

transition
">

{project.title}

</h3>





<p className="
text-muted-foreground

leading-relaxed
">

{project.description}

</p>






<div className="
flex

flex-wrap

gap-3

mt-8
">


{

project.tags.map(tag=>(


<span

key={tag}

className="
text-xs

px-3

py-1

rounded-full

bg-[#0B0E16]

text-[#A8B2D1]
"

>

{tag}

</span>


))

}


</div>






<div className="
mt-auto
pt-8
flex
items-center
gap-2
text-[#E4B95E]
text-sm
group-hover:gap-3
transition-all
">

View Project

<ArrowRight size={16}/>

</div>




</div>




</span>



</Link>



))


}



</div>



</div>


</section>



{/* TECHNOLOGY STACK */}


<section className="
py-24
">


<div className="container">



<p className="
text-accent

font-mono

text-sm

tracking-widest

uppercase

mb-4
">

Technology Matrix

</p>




<h2 className="
text-4xl

md:text-5xl

font-bold

mb-14
">

Technology Stack

</h2>







<div className="
grid

md:grid-cols-2

lg:grid-cols-4

gap-10
">


{


technologies.map(item=>{


const Icon=item.icon;



return (


<div

key={item.title}

className="
group
"
>



<Icon

size={34}

className="
text-[#D6A544]

group-hover:text-[#B51A2B]

transition

mb-6
"

/>




<h3 className="
font-bold

text-lg

mb-5
">

{item.title}

</h3>




<div className="
space-y-2
">


{

item.items.map(skill=>(


<p

key={skill}

className="
text-sm

text-muted-foreground

hover:text-white

transition
"
>

{skill}

</p>


))


}


</div>




</div>



)


})


}


</div>



</div>


</section>









{/* SECURITY RESEARCH */}



<section className="
py-24
">


<div className="container">



<div className="
flex

justify-between

items-end

mb-14
">



<div>


<p className="
text-accent

font-mono

text-sm

tracking-widest

uppercase

mb-4
">

Research Database

</p>




<h2 className="
text-4xl

md:text-5xl

font-bold
">

Security Research

</h2>


</div>




<Link href="/writeups">


<span className="
text-muted-foreground

hover:text-[#E4B95E]

transition

cursor-pointer
">

View All

</span>


</Link>



</div>







<div className="
grid

md:grid-cols-3

gap-10
">


{


writeups.map(item=>(



<div

key={item.title}

className="
group

relative
"
>




<div className="
absolute

inset-0

bg-[radial-gradient(circle_at_top,rgba(181,26,43,.12),transparent_70%)]

opacity-0

group-hover:opacity-100

blur-2xl

transition
"/>






<div className="
relative

py-8
">





<FileText

className="
text-[#D6A544]

group-hover:text-[#B51A2B]

transition

mb-6
"

/>





<h3 className="
text-xl

font-bold

mb-4

group-hover:text-[#E4B95E]

transition
">

{item.title}

</h3>





<p className="
text-sm

text-muted-foreground
">

{item.tag}

</p>




</div>





</div>



))


}



</div>



</div>


</section>









{/* LEARNING */}



<section className="
py-24
">


<div className="container">


<p className="
text-accent

font-mono

text-sm

tracking-widest

uppercase

mb-4
">

Active Development

</p>





<h2 className="
text-4xl

md:text-5xl

font-bold

mb-10
">

Currently Exploring

</h2>







<div className="
flex

flex-wrap

gap-5
">


{


learning.map(item=>(



<div

key={item}

className="
px-6

py-3

rounded-full

bg-[#161E3F]/50

backdrop-blur

text-[#A8B2D1]

hover:text-[#E4B95E]

hover:bg-[#242F49]

transition
"
>


{item}


</div>



))


}



</div>


</div>


</section>


</div>


</Layout>


);


}








function Status({

label,

value,

icon:Icon,

}:{

label:string;

value:string;

icon:any;

}){


return (


<div className="
flex

justify-between

items-center

border-b

border-border

py-3
">


<div className="
flex

items-center

gap-3
">


<Icon

size={20}

/>



<span>

{label}

</span>


</div>




<span className="
text-accent

font-mono

text-sm
">

{value}

</span>



</div>


)

}
