export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  github: string;
  live: string;
  image: string;
  logo: string;
  mediaType: 'image' | 'video'; // To support rendering the video instead of an image
  description: string;
  technologies: string[];
  features: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "ssblast",
    title: "SSBLAST",
    subtitle: "FP8 Linear Solver for NVIDIA GPUs",
    github: "https://github.com/Sharveswar007/SSBLAST",
    live: "https://pypi.org/project/ssblast",
    image: "/videos/ssblast.mp4",
    logo: "/images/logo/ssblast_logo.png",
    mediaType: "video",
    description: "SSBLAST is a groundbreaking high-performance computing project that introduces the first open-source FP8 scaled linear solver for consumer NVIDIA GPUs. By utilizing FP8-precision matrix kernels with per-tile dynamic scaling and iterative refinement, it recovers full FP64 accuracy while running 2-3x faster than cuBLAS FP64. This tool unlocks enterprise-grade matrix calculations on hardware ranging from the GTX 10-series through the RTX 40-series.",
    technologies: ["Python", "CUDA", "CuPy", "Triton", "PyPI"],
    features: [
      "2-3x speedup over cuBLAS FP64 via FP8 tensor cores.",
      "Hardware-agnostic support for consumer NVIDIA GPUs.",
      "Per-tile dynamic scaling to prevent FP8 precision loss.",
      "Iterative refinement algorithm for full FP64 recovery.",
      "Easy integration via pip install and drop-in replacements."
    ]
  },
  {
    slug: "truthlayer",
    title: "TruthLayer",
    subtitle: "AI Output Verification Framework",
    github: "https://github.com/Sharveswar007/Trust-Layer",
    live: "https://trust-layer-delta.vercel.app",
    image: "/videos/TruthLayer.mp4",
    logo: "/images/logo/truthlayer_logo.png",
    mediaType: "video",
    description: "TruthLayer is an intelligent fact-checking and verification pipeline designed to detect factual errors and hallucinations in AI-generated text. It leverages a multi-source API integration (Wikidata, Wikipedia, Google FactCheck, Serper) coupled with intelligent claim routing. The system produces a definitive verdict on AI outputs with precise source attribution and hallucination classification.",
    technologies: ["TypeScript", "Next.js", "LangChain", "OpenAI", "Tailwind CSS"],
    features: [
      "Automated detection and classification of AI hallucinations.",
      "Intelligent claim routing across multiple authoritative knowledge bases.",
      "Verifiable output verdicts (correct, incorrect, unverifiable).",
      "Inline source attribution and citation generation.",
      "Developer API for integrating fact-checking into existing AI pipelines."
    ]
  },
  {
    slug: "hirenex",
    title: "HIRENEX",
    subtitle: "AI-Powered Recruitment Ecosystem",
    github: "https://github.com/Sharveswar007/HR-portal",
    live: "https://hirenex-hr.vercel.app/login",
    image: "/videos/HIRENEX.mp4",
    logo: "/images/logo/hirenex_logo.png",
    mediaType: "video",
    description: "HIRENEX is a massive, dual-sided full-stack recruitment ecosystem consisting of a Candidate Assessment Portal and an HR Analytics Dashboard. Built for scale, it enables organizations to conduct AI-powered candidate assessments while providing HR teams with deep, real-time analytics on recruitment metrics, candidate performance, and hiring funnels.",
    technologies: ["Next.js", "React 19", "TypeScript", "Supabase", "Tailwind CSS"],
    features: [
      "Dual-portal architecture separating Candidate and HR experiences.",
      "AI-driven recruitment assessment engine.",
      "Comprehensive HR analytics dashboard with visual metrics.",
      "Secure authentication and role-based access via Supabase.",
      "Modern, highly responsive UI powered by React 19."
    ]
  },
  {
    slug: "careerpath-ai",
    title: "CareerPath",
    subtitle: "AI-Powered Career Platform",
    github: "https://github.com/Sharveswar007/CareerPath",
    live: "https://career-path-neon.vercel.app",
    image: "/videos/Careerpath.mp4",
    logo: "/images/logo/careerpath_logo.png",
    mediaType: "video",
    description: "CareerPath is a comprehensive, AI-powered career guidance platform tailored specifically for Indian students. It helps users discover their ideal career through a suite of intelligent tools, including an AI Career Counselor, RIASEC-based personality quizzes, skills gap analysis, real-time job market trends, AI-generated coding challenges, and instant resume analysis.",
    technologies: ["Next.js", "Supabase", "Groq AI", "Tailwind CSS", "TypeScript"],
    features: [
      "AI Career Counselor tailored to Indian education systems.",
      "50+ Question Career Assessment Quiz based on RIASEC.",
      "Live Job Market Trends parsing LinkedIn & Naukri data.",
      "AI-Generated Coding Challenges for DSA and interview prep.",
      "Instant AI-Powered Resume Analysis with ATS optimization."
    ]
  },
  {
    slug: "mvs-analysis",
    title: "MVS Analysis",
    subtitle: "TLP Result Parsing Engine",
    github: "https://github.com/Sharveswar007/MVS-Analysis-",
    live: "#",
    image: "/videos/MVS%20Analysis.mp4",
    logo: "/images/logo/mvs_analysis_logo.png",
    mediaType: "video",
    description: "MVS Analysis is a robust backend utility built with FastAPI that automates the tedious process of analyzing SRM TLP result PDFs. The engine extracts massive amounts of raw grading and attendance data, applies complex aggregations (teacher-wise, Faculty Advisor, and multi-subject), and outputs structured, chart-ready Excel reports instantly.",
    technologies: ["Python", "FastAPI", "Pandas", "PyPDF2", "OpenPyXL"],
    features: [
      "Automated parsing of complex academic PDF reports.",
      "Teacher-wise and Faculty Advisor data aggregation.",
      "Automated extraction of low-attendance student records.",
      "Dynamic generation of structured Excel reports with charts.",
      "High-speed FastAPI backend architecture."
    ]
  },
  {
    slug: "yolo-arduino",
    title: "YOLO CV Arduino",
    subtitle: "Real-Time Detection Pipeline",
    github: "https://github.com/Sharveswar007/YOLO-Object-Detection",
    live: "#",
    image: "/videos/YOLO.mp4",
    logo: "/images/logo/yolo_arduino_logo.png",
    mediaType: "video",
    description: "A hardware-software integration project that bridges advanced computer vision with physical microcontrollers. Utilizing the YOLOv8 object detection model running on a local machine, the pipeline processes live video feeds, detects specific target objects with bounding boxes, and communicates spatial coordinates via serial port to an Arduino for automated physical actuation.",
    technologies: ["Python", "YOLOv8", "OpenCV", "C++", "Arduino"],
    features: [
      "Real-time object detection and classification using YOLOv8.",
      "Low-latency serial communication protocol between Python and Arduino.",
      "Automated hardware actuation (LEDs/Servos) based on spatial CV data.",
      "Custom-trained model weights for specific target objects.",
      "Optimized inference pipeline for high frame-rate processing."
    ]
  },
  {
    slug: "bloggify",
    title: "Bloggify",
    subtitle: "Full-Stack Blogging App",
    github: "https://github.com/Sharveswar007/Blogging-platform-project",
    live: "https://bloggify-y0jal.sevalla.app/",
    image: "/videos/Bloggify.mp4",
    logo: "/images/logo/bloggify_logo.png",
    mediaType: "video",
    description: "A modern, full-stack blogging platform built for content creators. The application features a rich text editor, markdown support, image uploading, and a clean reading interface. The backend is powered by a robust REST API that handles user authentication, session management, and CRUD operations, wrapped in an elegant and highly responsive frontend.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Supabase", "React"],
    features: [
      "Rich text and markdown support for article creation.",
      "Secure JWT-based authentication and route protection.",
      "Relational database design using PostgreSQL and Supabase.",
      "Responsive, mobile-first reading interface.",
      "One-click automated batch deployment scripts."
    ]
  },
  {
    slug: "ultron",
    title: "ULTRON 9.0",
    subtitle: "Futurix Tech Club Portal",
    github: "https://github.com/Sharveswar007/ultron-futurix",
    live: "https://ultron-futurix.vercel.app",
    image: "/videos/Ultron Futurix.mp4",
    logo: "/images/logo/ultron_logo.png",
    mediaType: "video",
    description: "ULTRON 9.0 is the official, high-performance web portal for the Futurix Tech Club. Engineered to handle large-scale concurrent traffic during technical symposiums and events, it features robust user authentication, dynamic event registration systems, and real-time leaderboards. The platform serves as the central hub for thousands of students to interact with the club's activities.",
    technologies: ["TypeScript", "Next.js", "Prisma", "Tailwind CSS", "PostgreSQL"],
    features: [
      "Secure user authentication and role-based access control.",
      "Dynamic event registration and ticketing system.",
      "Real-time event leaderboards and live announcements.",
      "Optimized for high concurrency during flash registrations.",
      "Admin dashboard for member and content management."
    ]
  },
  {
    slug: "type-plus",
    title: "Type plus",
    subtitle: "Modern Typing Test Dashboard",
    github: "https://github.com/Sharveswar007/Type-plus",
    live: "#",
    image: "/videos/TypeAI Plus.mp4",
    logo: "/images/logo/typeai_logo.png",
    mediaType: "video",
    description: "Type plus is a premium, pure-frontend typing test application built for developers and typists who demand a clean, distraction-free environment. Featuring a deep obsidian and frosted glassmorphic design, it offers a highly focused typing experience with real, grammatically structured paragraphs and instant statistical feedback.",
    technologies: ["HTML5", "Vanilla CSS3", "Vanilla JavaScript", "Chart.js", "DummyJSON API"],
    features: [
      "Modern Dashboard interface with frosted glassmorphism.",
      "Meaningful paragraphs fetched dynamically via API.",
      "Offline fallback cache for uninterrupted typing sessions.",
      "Real-time visual keystroke analytics and error tracking.",
      "Second-by-second WPM progression charts using Chart.js."
    ]
  },
  {
    slug: "sisco-chatbot",
    title: "Sisco AI Chatbot",
    subtitle: "Conversational Interface",
    github: "https://github.com/Sharveswar007/Sisco-AI-Chatbot",
    live: "https://celebrated-cendol-40ca35.netlify.app/",
    image: "/videos/Sisco AI Chatbot.mp4",
    logo: "/images/logo/sisco_logo.png",
    mediaType: "video",
    description: "Sisco AI is a lightweight conversational chatbot interface built for rapid deployment. It provides a seamless, responsive UI for users to interact with underlying LLM APIs, featuring real-time message streaming, conversation history, and a modern chat aesthetic.",
    technologies: ["JavaScript", "HTML5", "CSS3", "LLM APIs", "Netlify"],
    features: [
      "Clean, modern conversational UI.",
      "Real-time streaming response handling.",
      "Fully responsive mobile and desktop layouts.",
      "Session-based conversation memory.",
      "Zero-dependency vanilla JavaScript implementation."
    ]
  },
  {
    slug: "s-news",
    title: "S-News App",
    subtitle: "Live News Aggregator",
    github: "https://github.com/Sharveswar007/S-News-App",
    live: "https://s-news-app.onrender.com/",
    image: "/videos/S-News App.mp4",
    logo: "/images/logo/snews_logo.png",
    mediaType: "video",
    description: "S-News App is a live news aggregation platform hosted on Render. It pulls real-time news data from global APIs, categorizing articles by topic and displaying them in an easy-to-read, masonry-style feed. Designed for speed and simplicity.",
    technologies: ["HTML5", "CSS3", "JavaScript", "NewsAPI", "Render"],
    features: [
      "Real-time global news aggregation.",
      "Dynamic topic-based filtering and search.",
      "Responsive masonry grid layout.",
      "Optimized API fetching and caching.",
      "Clean, distraction-free reading mode."
    ]
  }
];
