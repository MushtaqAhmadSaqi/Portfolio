/**
 * ============================================================================
 * SINGLE SOURCE OF TRUTH: src/data/content.js
 * ============================================================================
 * Edit any text, project, lab log entry, skill, or link in this file and the
 * entire portfolio updates automatically without touching any React component.
 */

export const siteContent = {
  meta: {
    notebookCode: "NB-2026 // VOL. IV",
    name: "Mushtaq Ahmad",
    fullName: "Mushtaq Ahmad Saqi",
    location: "Islamabad, Pakistan",
    hometown: "Skardu, Gilgit-Baltistan",
    timezone: "Asia/Karachi",
    lastUpdated: "November 2026",
    email: "mushtaqahmedsaqi1234@gmail.com",
    phone: "+92 340 8500976",
    resumeUrl: "/Mushtaq_Ahmad_Resume.pdf",
    formspreeEndpoint: "https://formspree.io/f/YOUR_FORM_ID", // Replace YOUR_FORM_ID when connecting Formspree
    socials: {
      github: "https://github.com/MushtaqAhmadSaqi",
      linkedin: "https://www.linkedin.com/in/mushtaqahmad12/",
      openprep: "https://openprep.com.pk",
      comsatsprephub: "https://comsatsprephub.vercel.app"
    }
  },

  hero: {
    stamp: "BS AI · COMSATS ISLAMABAD",
    headlinePrefix: "Building student tools and learning how ",
    headlineHighlight: "machine intelligence",
    headlineSuffix: " works under the hood.",
    positioning:
      "AI student who learns by shipping. Co-founder of OpenPrep and builder of practical AI study tools.",
    currentStatus: {
      badge: "ACTIVE SPRINT // AUTUMN 2026",
      primary:
        "BS AI · COMSATS Islamabad · CGPA 3.60/4.00",
      items: [
        {
          label: "SHIPPING",
          text: "OpenPrep and AI quiz tools for students."
        },
        {
          label: "STUDYING",
          text: "Python, classical ML, Java and C++."
        },
        {
          label: "OPEN TO",
          text: "Frontend, full-stack and AI internships."
        }
      ]
    },
    ctas: {
      primary: { label: "See selected work", href: "#work" },
      secondary: { label: "Résumé PDF", href: "/Mushtaq_Ahmad_Resume.pdf" }
    }
  },

  /**
   * SELECTED WORK (4 real projects from CV & GitHub)
   * The first item (featured: true) renders as a full-width architectural blueprint card.
   * Items 2-4 render in an asymmetric staggered 2-column ledger below it.
   */
  projects: [
    {
      slug: "openprep",
      category: "WEB",
      indexNumber: "FIG. 01",
      featured: true,
      title: "OpenPrep",
      subtitle: "Free National Entry-Test Preparation Platform (IBA Karachi & MDCAT Tracks)",
      oneLiner: "Free exam prep platform with 12,100+ practice questions.",
      role: "Co-Founder — Technical & Front-End Development",
      period: "Mar 2026 – Present",
      status: "LIVE IN PRODUCTION",
      metrics: "12,100+ Practice Questions · 2 Exam Tracks · Zero Paywalls",
      marginNote: "Built with Mehdi Ali Qoli — live at openprep.com.pk",
      techTags: ["React", "JavaScript", "Tailwind CSS", "Supabase (PostgreSQL)", "Vercel"],
      links: {
        live: "https://openprep.com.pk",
        github: "https://github.com/MushtaqAhmadSaqi"
      },
      architecturePreview: {
        caption: "SYSTEM SCHEMATIC // TIMED MOCK ENGINE & QUESTION BANK PIPELINE",
        nodes: [
          "12,100+ Normalized MCQ Bank (Supabase Postgres)",
          "Topic & Difficulty Filter Query Layer",
          "Client-Side Timed Session State Machine",
          "Instant Diagnostic & Mistake Review Ledger"
        ]
      },
      caseStudy: {
        readingTime: "4 min read",
        summary:
          "How we built and scaled a free, friction-free test preparation platform for Pakistani students preparing for IBA Karachi and MDCAT entrance exams without charging expensive academy fees.",
        problem:
          "In Pakistan, preparing for university entrance exams like IBA Karachi and MDCAT often requires expensive coaching academies or paid question-bank subscriptions (like PreMed or private portals). Free resources were scattered across blurry WhatsApp PDFs and unindexed Google Drive folders with no way to simulate timed exam pressure or review weak topics.",
        approach:
          "Having experienced the frustration of MDCAT preparation firsthand before switching to Artificial Intelligence at COMSATS, I partnered with Mehdi Ali Qoli to build an open, fast, mobile-first web platform. We decided early on that a first-time visitor should be able to start a timed practice drill in under three clicks—no credit card walls, no bloated onboarding.",
        whatIBuilt: [
          "Designed and engineered the responsive frontend interface for topic selection, timed mock exams, and instant answer explanations.",
          "Structured and normalized the question bank pipeline to scale past 12,100+ verified items across IBA Karachi and MDCAT subjects.",
          "Built a low-latency review workflow where students can flag ambiguous questions, inspect step-by-step solutions, and track accuracy by topic.",
          "Optimized asset delivery and client-side state transitions so the platform stays snappy on budget Android phones over 3G/4G connections."
        ],
        hardestChallenge:
          "Keeping test sessions resilient when a student's mobile internet drops mid-quiz—and cleaning inconsistent formatting across thousands of ingested math and science questions. I had to write defensive parsing rules and persist active quiz progress locally so a brief connection hiccup never wiped out a 45-minute practice run.",
        whatILearned:
          "Real users care far more about speed, legibility, and trust than flashy animations. Watching real students use OpenPrep daily taught me how to structure database queries carefully on Supabase's free tier and how small UI details (like keyboard shortcuts and clear mistake summaries) drive organic retention.",
        whatIdDoDifferently:
          "If I started over today, I would enforce a strict JSON schema validator and automated LaTeX math-rendering check on question imports from day one, rather than fixing malformed question strings after they were already in the database."
      }
    },
    {
      slug: "comsatsprephub",
      category: "AI",
      indexNumber: "FIG. 02",
      featured: false,
      title: "COMSATSPrepHub",
      subtitle: "Gemini-Powered University Exam & Past-Paper Platform",
      oneLiner: "AI study hub with past papers, GPA tools and Gemini quizzes.",
      role: "Creator & Lead Developer",
      period: "2026",
      status: "LIVE ON VERCEL",
      metrics: "Gemini API Quiz Engine · Supabase Auth · Per-User Rate Limiting",
      marginNote: "Used by COMSATS peers during midterms & finals",
      techTags: ["JavaScript", "Google Gemini API", "Supabase Auth", "Tailwind CSS", "Vercel"],
      links: {
        live: "https://comsatsprephub.vercel.app",
        github: "https://github.com/MushtaqAhmadSaqi"
      },
      architecturePreview: {
        caption: "AI GUARDRAIL FLOW // PROMPT TO VALIDATED QUIZ JSON",
        nodes: [
          "Student Selects Course, Topic & Difficulty",
          "Supabase Auth + Per-User Quota Check",
          "Structured Gemini API Prompt w/ Schema Constraint",
          "Strict JSON Validator → Interactive Quiz UI"
        ]
      },
      caseStudy: {
        readingTime: "4 min read",
        summary:
          "Combining static university past papers with a guarded Google Gemini API quiz generator so COMSATS students can test themselves on exact syllabus topics before exams.",
        problem:
          "Every semester at COMSATS University Islamabad, students scramble through fragmented WhatsApp groups looking for past Sessional and Final papers. Even when you find a past paper, there are no answer keys, no explanations, and no way to generate fresh practice questions on the specific lecture topic you're struggling with.",
        approach:
          "I built COMSATSPrepHub to unify three things in one clean workspace: an organized archive of course past papers, accurate semester/cumulative GPA calculators, and an on-demand AI quiz generator powered by the Google Gemini API that creates custom MCQs with per-option explanations.",
        whatIBuilt: [
          "Integrated the Google Gemini API to generate custom multiple-choice quizzes with configurable subject, topic, difficulty tier, and question count.",
          "Secured the AI generation endpoint with Supabase Authentication and per-user usage quotas so a single user or bot couldn't exhaust API credits.",
          "Implemented strict client-and-edge JSON response validation and fallback retry logic to handle malformed LLM outputs gracefully.",
          "Created interactive GPA/CGPA planning calculators tailored to the exact COMSATS grading scale."
        ],
        hardestChallenge:
          "Getting an LLM to reliably return strictly formatted, syllabus-accurate JSON without markdown wrappers or hallucinated fields. Early versions occasionally crashed the quiz renderer when Gemini wrapped JSON in backticks or omitted an explanation field. Adding a strict schema parser and sanitizing pipeline solved it.",
        whatILearned:
          "Shipping an AI feature to real students taught me that prompt engineering is only 30% of the job—the other 70% is authentication, rate limiting, output validation, and designing clear fallback states when an API times out.",
        whatIdDoDifferently:
          "I would move the quiz history into a spaced-repetition table so students can automatically re-test questions they got wrong three days later."
      }
    },
    {
      slug: "edulearn",
      category: "WEB",
      indexNumber: "FIG. 03",
      featured: false,
      title: "EduLearn",
      subtitle: "Distraction-Free Student Video Learning Workspace",
      oneLiner: "Focused YouTube learning workspace with notes and Pomodoro.",
      role: "Solo Designer & Developer",
      period: "2026",
      status: "OPEN SOURCE",
      metrics: "100% Client-Side · Zero Backend Latency · LocalStorage Persistence",
      marginNote: "Built to stop falling down YouTube algorithm rabbit holes",
      techTags: ["HTML5", "CSS3", "Vanilla JavaScript", "YouTube IFrame API", "localStorage"],
      links: {
        live: "https://github.com/MushtaqAhmadSaqi/EduLearn",
        github: "https://github.com/MushtaqAhmadSaqi/EduLearn"
      },
      architecturePreview: {
        caption: "CLIENT-SIDE ARCHITECTURE // ZERO-SERVER STUDY LOOP",
        nodes: [
          "YouTube IFrame Player API Controller",
          "Timestamped Note Capture (Synced to Video Clock)",
          "Pomodoro Focus Timer & Streak Engine",
          "Versioned localStorage State Persistence"
        ]
      },
      caseStudy: {
        readingTime: "3 min read",
        summary:
          "Building a lightweight, zero-backend learning workspace in pure HTML, CSS, and JavaScript that turns YouTube lecture playlists into structured courses.",
        problem:
          "When self-studying programming or linear algebra on YouTube, the sidebar recommendations and comments constantly pull your attention away. Plus, taking notes in a separate app means you lose the exact video timestamp where a professor explained a tricky formula.",
        approach:
          "Before reaching for heavy frameworks, I wanted to prove I could architect a clean, modular application using pure HTML, CSS, and vanilla JavaScript. I designed EduLearn as a self-contained browser workspace that requires zero account sign-up and stores all playlists, notes, and focus logs right in the user's browser.",
        whatIBuilt: [
          "Built a custom playlist manager and video player wrapper that strips away YouTube's algorithmic feed.",
          "Engineered timestamp-synced note-taking: clicking a note badge jumps the video directly to that second.",
          "Added an integrated Pomodoro timer coupled with daily study-hour goal tracking and visual progress summaries.",
          "Designed a clean state layer over browser localStorage so user data persists reliably across sessions."
        ],
        hardestChallenge:
          "Keeping the UI state synchronized across the video player, the countdown timer, and the notes list without React's virtual DOM. Writing my own clean event-driven state updates in vanilla JS gave me a much deeper appreciation for what React actually does under the hood.",
        whatILearned:
          "Mastering DOM manipulation, event delegation, and state serialization in plain JavaScript made learning React hooks significantly easier afterward.",
        whatIdDoDifferently:
          "I would add a one-click JSON/Markdown export button so students can back up their timestamped lecture notes to Obsidian or GitHub."
      }
    },
    {
      slug: "hotel-management-system",
      category: "SYSTEMS",
      indexNumber: "FIG. 04",
      featured: false,
      title: "Hotel Management System (API & OOP Suite)",
      subtitle: "Two-Part Engineering Study: Node/Mongo REST API + Java Swing OOP Desktop App",
      oneLiner: "Hotel domain modeled as a Node/Mongo API and Java desktop app.",
      role: "Backend & OOP Developer",
      period: "2025 – 2026",
      status: "2 GITHUB REPOS",
      metrics: "1,001 Seeded Test Records · Full CRUD REST API · Java Swing OOP GUI",
      marginNote: "Same domain modeled twice: first in Java OOP, then as a Node/Mongo REST API",
      techTags: ["Node.js", "Express.js", "MongoDB", "Mongoose", "Java", "Swing GUI"],
      links: {
        live: "https://github.com/MushtaqAhmadSaqi/Hotel-Management-System-DB-Project-",
        github: "https://github.com/MushtaqAhmadSaqi/Hotel-Management-System-DB-Project-",
        secondaryGithub: "https://github.com/MushtaqAhmadSaqi/OOP-final-project.git"
      },
      architecturePreview: {
        caption: "DUAL IMPLEMENTATION // JAVA OOP DESKTOP vs. NODE/MONGO REST API",
        nodes: [
          "v1 (2025): Java Swing GUI + Encapsulated OOP Domain Classes",
          "v2 (2026): Express.js REST Router + Auth Middleware",
          "Mongoose Schema Layer (Rooms, Bookings, Guests, Payments)",
          "1,001-Record Automated Seed & Load Testing Suite"
        ]
      },
      caseStudy: {
        readingTime: "4 min read",
        summary:
          "Revisiting the same real-world domain across two university semesters: first building a desktop GUI in Java Swing to master Object-Oriented Programming, then re-architecting it as a scalable Node.js, Express, and MongoDB REST API.",
        problem:
          "Many university projects stop at five dummy records in a local array. I wanted to understand how domain modeling changes when you move from an in-memory Object-Oriented desktop program in Java to a networked REST API backed by a document database with over a thousand records.",
        approach:
          "In 2025, I built the first version in Java Swing (`OOP-final-project`) focusing strictly on inheritance, polymorphism, and encapsulation for room tiers, reservations, and billing. In 2026, for my Database Systems project (`Hotel-Management-System-DB-Project-`), I rebuilt the entire backend architecture using Node.js, Express, and MongoDB/Mongoose, and seeded it with 1,001 realistic records.",
        whatIBuilt: [
          "Engineered RESTful API endpoints covering staff authentication, room availability, guest check-in/out, billing, and role management.",
          "Designed normalized and embedded Mongoose schemas with validation rules to prevent double-booking date collisions.",
          "Generated a 1,001-record synthetic dataset to benchmark query filtering, pagination, and aggregation pipelines under realistic load.",
          "Built the earlier Java Swing desktop interface with modular class hierarchies (`Room`, `Suite`, `Reservation`, `Invoice`)."
        ],
        hardestChallenge:
          "Preventing overlapping room reservations when multiple booking requests hit the API for intersecting date ranges, and designing MongoDB indexes so filtering across 1,001+ records stayed instantaneous.",
        whatILearned:
          "Building the exact same product in Java OOP first and Node.js/MongoDB second connected the dots between classroom theory (class hierarchies and encapsulation) and production backend engineering (stateless REST routes, schema validation, and database indexing).",
        whatIdDoDifferently:
          "Next, I would connect a lightweight React dashboard to the Express API and wrap the booking + payment step inside a multi-document MongoDB transaction."
      }
    }
  ],

  /**
   * LAB LOG / LEARNING IN PUBLIC
   * Honest, dated notebook entries showing continuous growth across AI, Web, Java, and C++.
   */
  labLog: [
    {
      id: "LOG-06",
      date: "OCT 2026",
      category: "AI / ML",
      title: "Enrolled in UTokyo's GCI World AI Course & wrestling with overfitting",
      summary:
        "Working through data preprocessing, NumPy vectorization, and classical ML baselines in the Matsuo & Iwasawa Lab Global Course in AI. Built a classification pipeline in Python where training accuracy hit 96% but validation lagged at 81%—spent two nights learning how feature leakage and regularization actually behave on noisy tabular data.",
      tags: ["Python", "NumPy", "pandas", "Scikit-learn", "UTokyo GCI"],
      metric: "Val accuracy +9% after fixing leakage"
    },
    {
      id: "LOG-05",
      date: "AUG – SEP 2026",
      category: "Web",
      title: "Frontend Engineering Internship @ Horquva LLC & Backend Track @ FlyRank",
      summary:
        "Spent 8 weeks building reusable, accessible frontend UI components and client-side data flows at Horquva LLC, while exploring backend automation pipelines and context engineering tasks during the FlyRank internship program. Learned how much cleaner React code becomes when state lives close to where it's read.",
      tags: ["React", "Component Architecture", "REST APIs", "Code Reviews"],
      metric: "8-week remote engineering sprint"
    },
    {
      id: "LOG-04",
      date: "JUN – JUL 2026",
      category: "AI / ML",
      title: "Wiring Google Gemini API into COMSATSPrepHub without breaking the UI",
      summary:
        "My first time putting an LLM API in front of real university students. Quickly discovered that raw prompt responses fail ~15% of the time if you don't enforce structured JSON schemas and per-user rate limits via Supabase Auth.",
      tags: ["Gemini API", "Prompt Engineering", "Supabase", "JSON Validation"],
      metric: "Strict schema parser shipped"
    },
    {
      id: "LOG-03",
      date: "MAR – MAY 2026",
      category: "Web",
      title: "Co-founding OpenPrep & scaling the question bank past 12,100+ items",
      summary:
        "Launched openprep.com.pk with Mehdi Ali Qoli to give IBA Karachi and MDCAT aspirants a free, fast alternative to paid prep portals. Learned how to structure PostgreSQL queries in Supabase and design mobile-first exam interfaces that don't lag on budget phones.",
      tags: ["React", "Supabase", "PostgreSQL", "Product Design"],
      metric: "12,100+ live questions indexed"
    },
    {
      id: "LOG-02",
      date: "JAN – FEB 2026",
      category: "Systems / OOP",
      title: "Load-testing a MongoDB & Express API with 1,001 seeded hotel records",
      summary:
        "Moved beyond 10-row toy databases by seeding 1,001 guest and booking records into MongoDB. Debugged slow date-range queries and learned how compound indexes and Mongoose schema validators prevent subtle data corruption.",
      tags: ["Node.js", "Express.js", "MongoDB", "Database Indexing"],
      metric: "1,001 records seeded & tested"
    },
    {
      id: "LOG-01",
      date: "AUTUMN 2025",
      category: "Systems / OOP",
      title: "C++ pointers, Java Swing GUIs, and surviving OOP finals at COMSATS",
      summary:
        "Built a full desktop Hotel Management GUI in Java Swing after spending months tracing memory addresses in C++. Writing event listeners and class hierarchies by hand made object-oriented design click for the first time.",
      tags: ["Java", "Swing", "C++", "OOP Fundamentals"],
      metric: "3.60 / 4.00 CGPA at COMSATS"
    }
  ],

  /**
   * TOOLBOX (SKILLS)
   * Grouped honestly by comfort level with real context — NO percentage bars, NO icon grids.
   */
  toolbox: [
    {
      tier: "01 // COMFORTABLE WITH",
      subtitle: "Tools I can pick up today to build, debug, and ship a working product from scratch.",
      items: [
        {
          name: "HTML5 & Semantic CSS3",
          context:
            "Built responsive layouts, custom token systems, and accessible forms across OpenPrep, EduLearn, and client-side interfaces without relying on heavy UI kits."
        },
        {
          name: "JavaScript (ES6+)",
          context:
            "Comfortable with async/await, DOM architecture, REST API integration, state serialization, and defensive JSON parsing in production apps."
        },
        {
          name: "Git, GitHub & Zero-Cost Deployment",
          context:
            "Daily workflow with branches, pull requests, and deploying static and serverless apps on Vercel, Netlify, and GitHub Pages."
        }
      ]
    },
    {
      tier: "02 // WORKING KNOWLEDGE",
      subtitle: "Technologies I've shipped real projects with and am actively sharpening in production.",
      items: [
        {
          name: "React & Vite",
          context:
            "Co-built OpenPrep and completed my Frontend Engineering internship at Horquva LLC using functional components, custom hooks, and clean prop/data separation."
        },
        {
          name: "Supabase (PostgreSQL & Auth) + Node.js / Express",
          context:
            "Used Supabase for authentication, row-level security, and a 12,100+ item question bank, plus built a 1,001-record REST API with Node.js, Express, and MongoDB."
        },
        {
          name: "Generative AI Integration (Gemini API)",
          context:
            "Shipped on-demand MCQ quiz generation in COMSATSPrepHub with structured prompt templates, usage quotas, and strict JSON output validation."
        }
      ]
    },
    {
      tier: "03 // STUDYING & CURRENTLY LEARNING",
      subtitle: "Core CS foundations and AI/ML coursework I'm actively practicing in my notebook.",
      items: [
        {
          name: "Python for AI & Machine Learning",
          context:
            "Working with NumPy, pandas, Matplotlib, and Scikit-learn through my BS AI coursework at COMSATS and the University of Tokyo's GCI World AI program—focusing on data cleaning, evaluation metrics, and basic neural networks."
        },
        {
          name: "Java & Object-Oriented Design",
          context:
            "Built a desktop Hotel Management GUI in Java Swing; comfortable with inheritance, polymorphism, file I/O, and collection frameworks."
        },
        {
          name: "C++ & Data Structures",
          context:
            "Used for university algorithms and systems labs—practicing pointers, memory management, trees, graphs, and algorithmic complexity."
        }
      ]
    }
  ],

  /**
   * ABOUT SECTION
   * Warm, human, first-person story grounded in real details (Skardu -> Karachi -> Islamabad).
   */
  about: {
    heading: "From the mountains of Skardu to building AI tools in Islamabad.",
    photoCaption: "FIG. 05 // MUSHTAQ AHMAD — ISLAMABAD, PK (4TH SEM BS AI @ COMSATS)",
    storyParagraphs: [
      "I grew up in Skardu, Gilgit-Baltistan, completed my intermediate studies in Karachi, and moved to Islamabad to study Artificial Intelligence at COMSATS University. Before choosing AI, I actually spent months preparing for the MDCAT medical entrance exam—and hated how expensive, scattered, and stressful the online study tools were.",
      "That frustration is how I got hooked on programming. Once I realized I could write code to build the exact study tools my friends and I wished we had, classroom assignments stopped feeling abstract. Within my first two years of university, I co-founded OpenPrep (now holding 12,100+ free practice questions) and built COMSATSPrepHub so my classmates could generate practice quizzes with AI.",
      "Right now, I sit at the intersection of frontend engineering and applied AI: I know how to build clean, fast interfaces that real people enjoy using, and I'm putting in the daily hours to master the Python, math, and machine learning fundamentals underneath."
    ],
    humanDetails: [
      {
        label: "HOW I GOT INTO CODE",
        text: "Trying to fix my own exam-prep headaches after switching paths from pre-medical (MDCAT) to Artificial Intelligence—and realizing a single weekend project could help hundreds of students."
      },
      {
        label: "OUTSIDE OF TERMINAL WINDOWS",
        text: "Playing table tennis (and obsessing over spin/control rubber setups on DHS and LOKI Kirin blades), trekking mountain trails back home in Skardu, reading Franz Kafka, and catching up on One Piece."
      },
      {
        label: "WHAT I BELIEVE ABOUT GOOD SOFTWARE",
        text: "Good software respects the user's time, data plan, and attention. If a student on a budget phone with shaky internet can't use your app without waiting ten seconds or hitting a paywall, the architecture isn't finished."
      },
      {
        label: "WHAT I'M CURIOUS ABOUT RIGHT NOW",
        text: "How to combine deterministic database rules (like SQL filters and strict excerpt verification) with small, fast language models so AI tools stop hallucinating on educational and policy data."
      }
    ]
  },

  contact: {
    stamp: "SIGN-OFF SHEET // SECTION 06",
    heading: "Have a project in mind?",
    subtext:
      "Internships, student tools, or AI engineering — say hello.",
    availabilityNote: "Currently based in Islamabad (PKT / UTC+5) · Available for remote & local roles."
  }
};
