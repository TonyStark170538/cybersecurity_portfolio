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

article:

`
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

article:

`
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

article:

`
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

article:

`
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

article:

`
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

article:

`
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


<section className="py-16 border-b border-border">

<div className="container space-y-4">


<p className="text-accent font-mono text-sm">
Knowledge Base
</p>


<h1 className="text-5xl font-bold">
Writeups & Notes
</h1>


<p className="text-lg text-muted-foreground max-w-3xl">

Technical security articles, research notes,
and lessons learned from building secure systems.

</p>


</div>

</section>





<section className="py-20">

<div className="container max-w-3xl space-y-6">


{writeups.map((writeup)=>(


<button

key={writeup.id}

onClick={()=>setSelected(writeup)}

className="
w-full
text-left
group
p-6
rounded-xl
border
border-border
hover:border-accent/50
hover:bg-secondary/50
transition
"


>


<div className="flex justify-between gap-4">


<div>


<h2 className="
font-bold
text-lg
group-hover:text-accent
">

{writeup.title}

</h2>


<p className="
mt-3
text-sm
text-muted-foreground
">

{writeup.summary}

</p>


</div>



<ArrowRight
size={20}
className="
text-muted-foreground
group-hover:text-accent
"
/>


</div>




<div className="flex flex-wrap gap-2 mt-5">


{writeup.tags.map(tag=>(

<span
key={tag}
className="
px-2
py-1
rounded
bg-secondary
text-xs
text-muted-foreground
"
>

{tag}

</span>

))}


</div>




<div className="
mt-4
flex
items-center
gap-2
text-xs
text-muted-foreground
">

<Calendar size={14}/>

{writeup.date}

</div>



</button>


))}


</div>

</section>






{selected && (

<div
className="
fixed
inset-0
bg-black/70
flex
items-center
justify-center
p-6
z-50
"
>


<div
className="
bg-background
border
border-border
rounded-xl
max-w-3xl
max-h-[85vh]
overflow-y-auto
p-8
relative
"
>


<button

onClick={()=>setSelected(null)}

className="
absolute
right-5
top-5
text-muted-foreground
hover:text-accent
"

>

<X size={22}/>

</button>



<h2 className="text-3xl font-bold mb-4">

{selected.title}

</h2>



<p className="
text-sm
text-muted-foreground
mb-6
">

{selected.date}

</p>



<p className="
whitespace-pre-wrap
leading-relaxed
text-muted-foreground
">

{selected.article}

</p>



</div>


</div>

)}



</Layout>

);

}