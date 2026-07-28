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
  Lock,
  FileText,
} from "lucide-react";

import Layout from "@/components/Layout";

export default function Home() {

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
title:"J.A.R.V.I.S. Cybersecurity Platform",
badge:"Featured Security Project",
description:
"A futuristic SOC-inspired platform focused on threat intelligence, monitoring, incident response, and security automation.",
tags:[
"Cybersecurity",
"React",
"TypeScript",
"SOC"
],
href:"/projects/1"
},

{
title:"AI Portfolio Terminal",
badge:"AI Engineering",
description:
"An AI-powered financial intelligence platform combining data analysis, visualization, and intelligent workflows.",
tags:[
"AI",
"Python",
"Data Engineering",
"React"
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


{/* HERO */}

<section className="py-24 border-b border-border">

<div className="container">

<div className="grid lg:grid-cols-2 gap-16 items-center">


<div className="space-y-8">


<p className="text-accent font-mono text-sm tracking-widest uppercase">
Software Engineer • Security • Cloud • AI
</p>


<h1 className="text-5xl md:text-6xl font-bold leading-tight">

Building secure software systems powered by

<span className="text-accent">
{" "}cloud, AI, and modern engineering
</span>

</h1>


<p className="text-lg text-muted-foreground max-w-xl leading-relaxed">

I'm Toni, a software engineering student focused on
cybersecurity, cloud infrastructure, and AI-powered applications.

<br/><br/>

I build projects that combine secure architecture,
clean user experiences, and engineering practices inspired
by real-world security teams.

</p>



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
px-6
py-3
rounded-md
border
border-border
hover:bg-secondary
"
>

Download CV

</a>


</div>


</div>



{/* SYSTEM STATUS */}

<div className="hidden lg:flex justify-center">


<div className="
w-80
rounded-xl
border
border-border
bg-secondary/30
p-6
">


<div className="flex justify-between mb-6">

<p className="font-mono text-sm text-accent">
SECURITY STATUS
</p>

<span className="h-3 w-3 rounded-full bg-accent"/>

</div>



<Status
label="Cloud"
value="AWS + GCP"
icon={Cloud}
/>


<Status
label="Security"
value="Active"
icon={Shield}
/>


<Status
label="AI"
value="Building"
icon={Brain}
/>


<Status
label="Projects"
value="3 Active"
icon={Code2}
/>


</div>


</div>


</div>

</div>

</section>




{/* SECURITY PROFILE */}

<section className="py-20 border-b border-border">

<div className="container">


<p className="text-accent font-mono text-sm mb-4">
Security Profile
</p>


<h2 className="text-4xl font-bold mb-10">
How I Build
</h2>


<div className="grid md:grid-cols-4 gap-6">


{
[
["Threat Modeling","Thinking like an attacker before writing code."],
["Secure Architecture","Designing systems with security from the beginning."],
["Application Security","Understanding vulnerabilities and defenses."],
["Continuous Learning","Following new technologies and threats."]
].map(item=>(

<div
key={item[0]}
className="
border
border-border
rounded-xl
p-6
"
>

<Lock className="text-accent mb-4"/>

<h3 className="font-bold mb-3">
{item[0]}
</h3>

<p className="text-sm text-muted-foreground">
{item[1]}
</p>


</div>

))
}


</div>

</div>

</section>





{/* FOCUS */}


<section className="py-20">

<div className="container">


<h2 className="text-4xl font-bold mb-10">
Engineering Interests
</h2>


<div className="grid md:grid-cols-3 gap-6">


{
focusAreas.map(item=>{

const Icon=item.icon;

return (

<div
key={item.title}
className="
border
border-border
rounded-xl
p-6
"
>

<Icon className="text-accent mb-5"/>

<h3 className="text-xl font-semibold mb-3">
{item.title}
</h3>


<p className="text-muted-foreground">
{item.description}
</p>


</div>

)

})
}


</div>

</div>

</section>





{/* PROJECTS */}


<section className="py-24 border-t border-border">

<div className="container">


<h2 className="text-4xl font-bold mb-10">
Featured Projects
</h2>



<div className="grid lg:grid-cols-3 gap-8">


{
projects.map(project=>(

<Link href={project.href} key={project.title}>

<span className="
group
flex
flex-col
border
border-border
rounded-xl
p-6
cursor-pointer
hover:border-accent/50
transition
h-full
">


<p className="text-accent text-xs font-mono mb-4">
{project.badge}
</p>


<h3 className="text-xl font-bold mb-4 group-hover:text-accent">
{project.title}
</h3>


<p className="text-muted-foreground text-sm">
{project.description}
</p>


<div className="flex flex-wrap gap-2 mt-6">

{
project.tags.map(tag=>(

<span
key={tag}
className="text-xs bg-secondary px-3 py-1 rounded"
>
{tag}
</span>

))
}

</div>


<div className="mt-auto pt-8 flex gap-2 text-accent">
View Project
<ArrowRight size={16}/>
</div>


</span>

</Link>

))
}


</div>

</div>

</section>





{/* TECHNOLOGY */}


<section className="py-20">


<div className="container">


<h2 className="text-4xl font-bold mb-10">
Technology Stack
</h2>


<div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">


{
technologies.map(item=>{

const Icon=item.icon;


return (

<div
key={item.title}
className="
border
border-border
rounded-xl
p-6
"
>

<Icon className="text-accent mb-4"/>


<h3 className="font-bold mb-3">
{item.title}
</h3>


{
item.items.map(x=>(

<p
key={x}
className="text-sm text-muted-foreground"
>
{x}
</p>

))
}


</div>

)

})
}


</div>


</div>


</section>





{/* WRITEUPS */}


<section className="py-20 border-t border-border">


<div className="container">


<div className="flex justify-between items-center mb-8">


<h2 className="text-4xl font-bold">
Security Research
</h2>


<Link href="/writeups">
<span className="text-accent cursor-pointer">
View All
</span>
</Link>


</div>


<div className="grid md:grid-cols-3 gap-6">


{
writeups.map(item=>(

<div
key={item.title}
className="
border
border-border
rounded-xl
p-6
"
>

<FileText className="text-accent mb-4"/>

<h3 className="font-bold">
{item.title}
</h3>

<p className="text-sm text-muted-foreground mt-3">
{item.tag}
</p>

</div>

))
}


</div>


</div>


</section>





{/* LEARNING */}


<section className="py-20">


<div className="container">


<h2 className="text-4xl font-bold mb-8">
Currently Exploring
</h2>


<div className="flex flex-wrap gap-4">


{
learning.map(x=>(

<div
key={x}
className="
border
border-border
rounded-lg
px-5
py-3
"
>

{x}

</div>

))
}


</div>


</div>


</section>






{/* CTA */}


<section className="py-24 border-t border-border">

<div className="container text-center">


<h2 className="text-4xl font-bold mb-5">
Interested in secure software?
</h2>


<p className="text-muted-foreground mb-8">
Let's connect and build something meaningful.
</p>


<div className="flex justify-center gap-5">


<a href="https://github.com/YOUR_GITHUB">
<Github className="text-accent"/>
</a>


<a href="https://linkedin.com/in/YOUR_LINKEDIN">
<Linkedin className="text-accent"/>
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


<div className="flex gap-3 items-center">

<Icon size={20}/>

{label}

</div>


<span className="text-accent font-mono text-sm">
{value}
</span>


</div>

)

}