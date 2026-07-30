Prompt Iteration Log
Task

Create an image strategy for my cybersecurity portfolio.

The goal is to decide which images should be real captures of my work and which visuals can be AI-generated while maintaining authenticity and professional presentation.

Version 0 — Naive Prompt
Prompt
Help me choose images for my cybersecurity portfolio.
Output Summary

The response suggested:

cybersecurity screenshots
diagrams
profile photos
AI-generated backgrounds

However, it was generic and did not understand:

my actual projects
the difference between evidence and decoration
why real screenshots matter
Observation

The output focused on listing possible images instead of making design decisions.

Version 1 — Role Assignment Technique
Technique Used:

Role assignment

Prompt
Act as a senior cybersecurity portfolio designer reviewing my portfolio.

Help me decide which images I should use for my cybersecurity portfolio. 
Identify which images should be real screenshots of my work and which can be AI-generated supporting visuals.
Output Summary

The response became more professional and started considering:

credibility
recruiter expectations
authenticity

It recommended:

real screenshots for projects
AI images only for backgrounds and atmosphere
What Changed

Giving the AI a role changed the answer from a general design assistant into an expert reviewer.

The output included stronger reasoning instead of only suggestions.

Version 2 — Context and Motivation Technique
Technique Used:

Context and motivation

Prompt
Act as a cybersecurity portfolio reviewer.

I am creating a professional portfolio containing:
- J.A.R.V.I.S. SOC cybersecurity platform
- AI Portfolio Terminal
- frontend design projects

My goal is to impress recruiters by showing real engineering ability, not create fictional-looking visuals.

Help me decide which portfolio images should be real captures and which can be AI-generated.
Explain the reasoning behind every decision.
Output Summary

The response improved because it understood:

the purpose of the portfolio
the target audience
the difference between proof and decoration

It suggested:

J.A.R.V.I.S screenshots → real
architecture explanation visuals → possible AI support
profile photo → real
What Changed

Adding context reduced generic answers.

The AI started making decisions based on portfolio credibility rather than aesthetics alone.

Version 3 — Few-Shot Examples Technique
Technique Used:

Few-shot examples

Prompt
Act as a cybersecurity portfolio reviewer.

My goal is to choose images that prove my skills.

Examples:

Example 1:
A SOC dashboard screenshot showing my own React application.
Decision: Use real image.
Reason: It proves actual development work.

Example 2:
A futuristic cybersecurity background with no connection to my project.
Decision: AI-generated is acceptable.
Reason: It supports visual style but does not claim to be my work.

Now evaluate my portfolio images using the same reasoning.

Images:
- J.A.R.V.I.S dashboard screenshots
- Architecture diagram
- AI Portfolio Terminal screenshot
- Profile photo
- Cybersecurity background visuals
Output Summary

The response became more consistent.

It followed the examples and applied the same decision logic:

Real:

project screenshots
personal photo

AI:

decorative backgrounds
What Changed

Examples reduced ambiguity.

The AI copied the evaluation pattern instead of inventing a new evaluation method.

Version 4 — Output Structure Technique
Technique Used:

Output structure

Prompt
Act as a professional cybersecurity portfolio reviewer.

Evaluate my portfolio images.

For every image provide:

1. Image name
2. Recommended choice:
   - Real capture
   - AI-generated
3. Purpose
4. Reasoning
5. Risk if chosen incorrectly

Finish with:
- Final image set
- Images rejected
- Overall recommendation
Output Summary

The response became easier to use.

Instead of paragraphs, it created a decision document.

Example:

Image	Choice	Reason
J.A.R.V.I.S Screenshot	Real	Evidence of work
Cyber background	AI	Decorative
Profile photo	Real	Personal identity
What Changed

The structure made the output directly usable for submission.

The AI spent less effort deciding formatting and more effort analyzing.

Version 5 — Step Decomposition Technique
Technique Used:

Step decomposition

Prompt
Act as a cybersecurity portfolio reviewer.

Complete this task step by step:

Step 1:
Identify the purpose of each portfolio image.

Step 2:
Classify each image as evidence or decoration.

Step 3:
Decide whether it should be real or AI-generated.

Step 4:
Explain the reasoning.

Step 5:
Create the final curated image set.

Step 6:
Write a rejection note explaining one image that should not be used.
Output Summary

This produced the strongest result.

The AI first analyzed the purpose of images before choosing generation methods.

It avoided common mistakes like:

fake dashboards
unrealistic hacker imagery
AI replacing real work evidence
What Changed

Breaking the task into steps improved reasoning quality.

The AI was less likely to jump directly to recommendations.

Claude vs ChatGPT Comparison
Claude

Strengths:

More cautious reasoning
Strong emphasis on authenticity
Better at explaining design philosophy

Example behavior:
Claude strongly avoided AI-generated screenshots because they could misrepresent real work.

Weakness:

Sometimes produced longer explanations than needed.
ChatGPT

Strengths:

Better formatting
More structured deliverables
Easier to transform into assignment documents

Example behavior:
ChatGPT created clearer tables, sections, and submission-ready formats.

Weakness:

Without enough context, it was more likely to provide generic portfolio advice.
Final Reusable Prompt Template
Act as a [ROLE] reviewing my [TASK].

Context:
I am working on [PROJECT/GOAL].
The audience is [AUDIENCE].
The main objective is [SUCCESS CRITERIA].

Evaluate the following:

[INPUT]

For each item:

1. Identify its purpose.
2. Decide whether it is evidence or decoration.
3. Recommend the best approach.
4. Explain the reasoning.
5. Identify possible risks.

Use this output format:

## Evaluation

Item:
Decision:
Purpose:
Reason:
Risk:

Finish with:
- Final recommendations
- Rejected options
- Improvements
Final Reflection

The biggest improvement came from adding context and forcing structured evaluation. The naive prompt produced generic suggestions, while the final prompt produced decisions based on credibility, audience, and purpose.

The main lesson was that prompt engineering is not only about asking for better answers. It is about giving the AI enough information and structure to make better decisions.