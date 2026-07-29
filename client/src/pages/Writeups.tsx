import { useState } from "react";
import { Calendar, ArrowRight, X } from "lucide-react";
import Layout from "@/components/Layout";


export default function Writeups() {


const [selected, setSelected] = useState<any>(null);



const writeups = [

{
id:1,

title:"Understanding XSS Vulnerabilities in React",

date:"2026-01-15",

summary:
"Understanding how Cross-Site Scripting works and how modern frontend frameworks reduce security risks.",

tags:[
"Web Security",
"React",
"XSS"
],

article:`
Cross-Site Scripting (XSS) is one of the most common web application vulnerabilities.

The vulnerability happens when an attacker is able to inject malicious JavaScript into a page viewed by another user.

Modern frameworks like React reduce many XSS risks by escaping values automatically.

However, security problems can still appear when developers:

• use dangerouslySetInnerHTML
• render unsafe external content
• trust user input without validation


Security approach:

1. Validate user input.

2. Avoid rendering raw HTML.

3. Sanitize external content.

4. Understand where user-controlled data flows.


The main lesson is that frameworks provide protection,
but secure development still requires understanding how attacks work.
`

},



{
id:2,

title:"CTF Walkthrough: Security Mindset",

date:"2026-01-10",

summary:
"A beginner-friendly explanation of approaching CTF challenges through enumeration and analysis.",

tags:[
"CTF",
"Enumeration",
"Security"
],

article:`
Capture The Flag challenges are useful because they teach attackers' thinking.

A common mistake is immediately trying exploits.

A better workflow:

1. Information gathering

Understand the target and identify possible entry points.


2. Enumeration

Look for exposed services, technologies, and weaknesses.


3. Exploitation

Use discovered weaknesses carefully.


4. Documentation

Record what happened and why the vulnerability existed.


CTFs teach an important security principle:

Good attackers understand systems deeply before attempting attacks.
`

},




{
id:3,

title:"AES vs RSA: Understanding Encryption",

date:"2026-01-05",

summary:
"A practical explanation of symmetric and asymmetric encryption.",

tags:[
"Cryptography",
"Encryption"
],

article:`
Encryption protects information by transforming readable data into unreadable ciphertext.

AES:

AES is symmetric encryption.

The same key is used for encryption and decryption.

Advantages:

• Very fast
• Good for large amounts of data


RSA:

RSA is asymmetric encryption.

It uses two keys:

• Public key
• Private key


Advantages:

• Secure key exchange
• Digital signatures


Modern systems often combine both approaches.

For example:

RSA protects the AES key,
while AES encrypts the actual data.
`

},




{
id:4,

title:"OWASP Top 10 Security Thinking",

date:"2025-12-28",

summary:
"How security engineers approach common web application risks.",

tags:[
"OWASP",
"Web Security"
],

article:`
The OWASP Top 10 represents common security risks found in applications.

Important examples:

Injection:

Prevent by using prepared statements and validation.


Broken Authentication:

Protect accounts with strong authentication design.


Security Misconfiguration:

Reduce unnecessary exposure and follow secure defaults.


The goal is not only fixing vulnerabilities.

The goal is designing systems where vulnerabilities are harder to create.
`

},




{
id:5,

title:"SQL Injection Explained",

date:"2025-12-20",

summary:
"How attackers manipulate database queries and how developers prevent it.",

tags:[
"SQL",
"Database Security"
],

article:`
SQL Injection happens when user input is directly combined with database queries.

Example problem:

User input becomes part of the SQL command.

Attackers can manipulate queries to access or modify data.


Prevention:

• Prepared statements
• Input validation
• Least privilege database accounts


Secure applications treat all external input as potentially dangerous.
`

},




{
id:6,

title:"Building Secure APIs",

date:"2025-12-15",

summary:
"Important principles for authentication, authorization, and API protection.",

tags:[
"API Security",
"Backend"
],

article:`
APIs are common attack targets because they expose application functionality.

Security principles:

Authentication:

Verify who the user is.


Authorization:

Verify what the user can access.


Rate limiting:

Reduce abuse and automated attacks.


Logging:

Detect suspicious activity.


A secure API is not only functional,
it is designed with misuse in mind.
`

}

];





return (

<Layout>


{/* HERO */}


<section className="
relative
overflow-hidden
py-32
">


<div className="
absolute
top-0
right-0

w-[650px]
h-[650px]

bg-[radial-gradient(circle,rgba(181,26,43,.22),transparent_65%)]

blur-3xl
"
/>



<div className="container">


<div className="max-w-4xl">


<p className="
text-[#E4B95E]

font-mono

text-sm

tracking-widest

uppercase

mb-6
">

Knowledge Base

</p>



<h1 className="
text-5xl

md:text-6xl

font-bold
">

Writeups & Notes

</h1>




<p className="
mt-6

text-lg

text-[#A8B2D1]

leading-relaxed

max-w-3xl
">

Technical security research, vulnerability analysis,
and engineering notes from building secure systems.

</p>


</div>


</div>


</section>








{/* ARTICLES */}


<section className="
py-20
">


<div className="
container

max-w-5xl
">


<div className="
grid

gap-8
">


{
writeups.map(writeup=>(


<button

key={writeup.id}

onClick={()=>setSelected(writeup)}

className="
group

relative

text-left

cursor-pointer

w-full
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
"
/>





<div className="
relative

rounded-3xl

bg-[#161E3F]/50

backdrop-blur-xl

p-8

hover:bg-[#242F49]/60

transition
">



<div className="
flex

justify-between

gap-8
">


<div>


<p className="
text-xs

font-mono

tracking-widest

uppercase

text-[#D6A544]

mb-5
">

Security Research

</p>




<h2 className="
text-2xl

font-bold

group-hover:text-[#E4B95E]

transition
">

{writeup.title}

</h2>




<p className="
mt-4

text-[#A8B2D1]

leading-relaxed
">

{writeup.summary}

</p>


</div>



<ArrowRight

className="
text-[#D6A544]

group-hover:text-[#B51A2B]

transition

mt-2
"

/>


</div>






<div className="
flex

flex-wrap

gap-3

mt-8
">


{
writeup.tags.map(tag=>(


<span

key={tag}

className="
px-3

py-1

rounded-full

bg-[#0B0E16]

text-xs

text-[#A8B2D1]
">

{tag}

</span>


))

}


</div>






<div className="
flex

items-center

gap-2

mt-6

text-xs

font-mono

text-[#6E7897]
">

<Calendar size={14}/>

{writeup.date}

</div>




</div>


</button>


))

}


</div>


</div>


</section>








{/* ARTICLE MODAL */}



{
selected && (


<div className="
fixed

inset-0

z-50

flex

items-center

justify-center

p-6

bg-black/70

backdrop-blur-md
">


<div className="
relative

max-w-4xl

max-h-[85vh]

overflow-y-auto

w-full


rounded-3xl


bg-[#101522]/95


p-8

md:p-12


shadow-[0_0_80px_rgba(181,26,43,.25)]
">



<button

onClick={()=>setSelected(null)}

className="
absolute

right-6

top-6

text-[#A8B2D1]

hover:text-[#E4B95E]

transition
">

<X size={22}/>

</button>




<p className="
text-[#D6A544]

font-mono

text-xs

uppercase

tracking-widest

mb-6
">

Security Article

</p>




<h2 className="
text-3xl

md:text-4xl

font-bold
">

{selected.title}

</h2>




<div className="
flex

items-center

gap-2

mt-5

text-sm

font-mono

text-[#6E7897]
">

<Calendar size={15}/>

{selected.date}

</div>





<div className="
my-8

h-px

bg-gradient-to-r

from-[#D6A544]

via-[#B51A2B]

to-transparent
"
/>




<p className="
whitespace-pre-wrap

leading-[1.9]

text-[#A8B2D1]
">

{selected.article}

</p>



</div>


</div>


)

}



</Layout>

);

}