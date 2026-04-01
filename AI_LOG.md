# AI use log — JavaScript frameworks assignment

This is a short note on how I actually use AI (mostly Cursor-style assistants) on this project. Our course asks us to be open about that, so here’s what I do, what I don’t do, and how I tend to ask for help, especially because I am having trouble remembering everything.

---

## Why I use AI

Sometimes the lecture or the docs only half-click, and I want someone to walk through how things fit together — like how Next.js routing lines up with React state on a page. I also use it when I’m stuck on an error or a weird behaviour: I’ll paste the message and a bit of code so I’m not guessing alone. Before I lock in a design, I might ask “what are a couple of sane ways to do X?” so I’m not coding into a dead end. For README text or comments, I sometimes ask for cleaner wording, but I still need to know what the feature does myself.

I’m not trying to outsource the course. I run the app, I read what it suggests, and what I hand in is still on me.

**Important:** I don’t copy-paste whole answers from AI into my files. I write the code myself — I type it in, change it so it matches this project, and I only keep what I get and could explain to someone else. If the tool throws a snippet at me, I treat it like a hint, not something to drop in wholesale.

---

## How I try to work with it

I’ve landed on a few habits that keep things honest and useful. I give real context: which file, what I tried, what I thought would happen vs what actually happened. If I need to present or defend the work, I ask *why*, not only “make it work.” I keep asks small — one screen or one bug — unless the whole file really is the question. I always run `npm run dev` and click through the flows myself; the assignment has to work for me, not just on paper. And I don’t dump big generated blocks into the repo — I implement bit by bit so I know what’s going on.

---

## Example prompts (the kind of thing I actually type)

**Concept stuff**

> Can you explain server vs client components in plain language for *this* Next.js app, and where my cart page fits? Short answer, and tell me which files are worth opening.

I’m asking for understanding tied to my repo, not a rewrite of my project.

**Debugging**

> When I add something to the cart and open `/cart`, the quantity is off. Here’s the component and the state update — what would you check first for stale state or a race?

I say what broke, where, and I show enough code that we’re not guessing in the dark.

**Picking an approach**

> After checkout I need a success message. What are two sensible options in Next.js (like query params vs local state), and which is simpler for a small school demo without new deps?

I want trade-offs I can explain later, not a single “correct” answer copied from nowhere.

**A focused change**

> In `ProductGrid.tsx`, can we show loading while the filter runs, without touching the API, and using the same CSS variables as in `globals.css`?

File, behaviour, and what *not* to change — that keeps the answer usable.

---

## What I still do on my own

I read the assignment brief and the rubric — AI doesn’t replace that. The overall structure and what features I build are usually my call unless I’m explicitly brainstorming out loud. I test everything myself and fix what I see. I follow whatever academic-integrity rules the school sets; this log is about being straight about help, not about hiding behind it. And again: the code in the repo is mine — written and edited by me, not pasted in as a shortcut.

---

## In short

AI is more like a tutor or someone pair-programming with me: questions, debugging, and ideas in small pieces. It’s not a place I go to download a finished solution and paste it in. I write my own code, I need to understand what ships, and I’m responsible for what I submit.

---

*April 2026*
