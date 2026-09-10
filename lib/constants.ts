import {
  Compass,
  MessageSquare,
  BrainCircuit,
  Database,
  ScanEye,
  Workflow,
  Sparkles,
  Target,
  Github,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import type {
  NavLink,
  Service,
  Project,
  BlogPost,
  TeamMember,
  ValueItem,
  SocialLink,
} from "@/types";

export const SITE = {
  name: "Nuviq AI Studio",
  shortName: "Nuviq",
  tagline: "Intelligent Solutions for Tomorrow",
  description:
    "Nuviq AI Studio designs and builds applied AI systems — from strategy through production — for teams who need machine learning that ships.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.nuviq.ai",
  email: "hello@nuviq.ai",
  phone: "+880 1234 567890",
  address: "Gulshan Avenue, Dhaka 1212, Bangladesh",
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/our-work" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  quick: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
  ],
  more: [
    { label: "Our Work", href: "/our-work" },
    { label: "Blogs", href: "/blogs" },
    { label: "Contact", href: "/contact" },
  ],
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "LinkedIn", href: "https://linkedin.com/company/nuviq-ai", icon: Linkedin },
  { label: "Twitter", href: "https://twitter.com/nuviqai", icon: Twitter },
  { label: "GitHub", href: "https://github.com/nuviq-ai", icon: Github },
  { label: "Instagram", href: "https://instagram.com/nuviqai", icon: Instagram },
];

export const SERVICES: Service[] = [
  {
    slug: "ai-strategy-consulting",
    icon: Compass,
    title: "AI Strategy & Consulting",
    shortDescription:
      "A clear-eyed roadmap for where AI actually creates value in your business — and where it doesn't.",
    description:
      "We start with your operating model, not a technology wishlist. Our strategists map your data, workflows, and margins to find the handful of AI initiatives worth building first, then sequence them into a roadmap your team can execute against.",
    capabilities: [
      "Opportunity assessment & ROI modeling",
      "Data & infrastructure readiness audit",
      "AI adoption roadmap and governance",
      "Build-vs-buy vendor evaluation",
    ],
  },
  {
    slug: "nlp-chatbot-development",
    icon: MessageSquare,
    title: "NLP & Chatbot Development",
    shortDescription:
      "Conversational systems that understand intent, hold context, and hand off gracefully when they should.",
    description:
      "From support deflection to internal knowledge assistants, we build language systems on top of retrieval-augmented generation, fine-tuned models, and structured guardrails so your bot stays accurate and on-brand.",
    capabilities: [
      "Retrieval-augmented generation (RAG) pipelines",
      "Custom fine-tuning & prompt engineering",
      "Multi-turn dialogue and intent routing",
      "Omnichannel deployment (web, WhatsApp, Slack)",
    ],
  },
  {
    slug: "machine-learning-development",
    icon: BrainCircuit,
    title: "Machine Learning Development",
    shortDescription:
      "Custom models built for your data, evaluated against your metrics, and shipped into production.",
    description:
      "We design, train, and deploy predictive and generative models tailored to your problem space — forecasting, recommendation, anomaly detection, and beyond — with MLOps built in from day one.",
    capabilities: [
      "Custom model design & training",
      "Feature engineering and evaluation frameworks",
      "MLOps: versioning, monitoring, retraining",
      "Model serving at scale",
    ],
  },
  {
    slug: "data-engineering-analytics",
    icon: Database,
    title: "Data Engineering & Analytics",
    shortDescription:
      "The pipelines and warehouses that make every downstream model and dashboard trustworthy.",
    description:
      "AI is only as good as the data feeding it. We build resilient ingestion pipelines, model your warehouse for analytics, and stand up dashboards that turn raw events into decisions.",
    capabilities: [
      "ETL / ELT pipeline design",
      "Data warehouse & lakehouse architecture",
      "Real-time streaming & event pipelines",
      "BI dashboards and self-serve analytics",
    ],
  },
  {
    slug: "computer-vision-solutions",
    icon: ScanEye,
    title: "Computer Vision Solutions",
    shortDescription:
      "Systems that see: quality inspection, tracking, and visual search built for real-world conditions.",
    description:
      "We build vision models that hold up outside the lab — trained on your imagery, tuned for your lighting and hardware, and deployed at the edge or in the cloud depending on latency needs.",
    capabilities: [
      "Object detection & defect inspection",
      "Image classification & visual search",
      "Video analytics & tracking",
      "Edge deployment on embedded hardware",
    ],
  },
  {
    slug: "ai-integration-automation",
    icon: Workflow,
    title: "AI Integration & Automation",
    shortDescription:
      "Wiring intelligence into the tools your team already uses, so the model becomes a workflow, not a demo.",
    description:
      "A great model that lives in a notebook creates no value. We integrate AI directly into your CRM, ERP, or internal tools, and automate the surrounding workflow so the output reaches the people who need it.",
    capabilities: [
      "API & workflow integration",
      "Robotic process automation (RPA)",
      "Human-in-the-loop review systems",
      "Internal tooling and admin consoles",
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    slug: "ai-powered-analytics-dashboard",
    eyebrow: "Project 01",
    title: "AI-Powered Analytics Dashboard",
    description:
      "A real-time analytics platform that turns complex data into actionable insights.",
    longDescription:
      "Built for a mid-market logistics operator drowning in spreadsheets, this platform unifies fleet, warehouse, and sales data into a single real-time view. Anomaly detection flags at-risk shipments before they're late, and a forecasting layer gives ops leads a 14-day demand outlook instead of a rear-view mirror.",
    technologies: ["Next.js", "Python", "PyTorch", "PostgreSQL", "Kafka"],
    image: "/images/project-analytics-dashboard.jpg",
    mediaType: "image",
    href: "/our-work#ai-powered-analytics-dashboard",
  },
  {
    slug: "intelligent-automation-system",
    eyebrow: "Project 02",
    title: "Intelligent Automation System",
    description:
      "An AI system that automates industrial processes with high accuracy and efficiency.",
    longDescription:
      "For a contract manufacturer running three shifts, we paired computer vision with robotic process control to automate defect sorting on the line. The system now inspects parts faster than the human QA team it augments, routing edge cases to a reviewer instead of stopping the line.",
    technologies: ["Computer Vision", "ROS", "TensorFlow", "Edge AI", "OPC-UA"],
    image: "/images/project-automation-system.jpg",
    mediaType: "video",
    href: "/our-work#intelligent-automation-system",
  },
  {
    slug: "conversational-support-assistant",
    eyebrow: "Project 03",
    title: "Conversational Support Assistant",
    description:
      "A RAG-powered assistant that resolves half of inbound support tickets without a human.",
    longDescription:
      "We indexed a fintech client's entire knowledge base and policy library into a retrieval-augmented assistant, then layered in strict guardrails for anything touching account changes. It now resolves the majority of tier-1 tickets directly and hands off complex cases with full conversation context.",
    technologies: ["RAG", "Claude API", "Node.js", "Vector DB", "Twilio"],
    image: "/images/services-panel.jpg",
    mediaType: "image",
    href: "/our-work#conversational-support-assistant",
  },
  {
    slug: "predictive-maintenance-engine",
    eyebrow: "Project 04",
    title: "Predictive Maintenance Engine",
    description:
      "Sensor-driven failure prediction that cut unplanned downtime by more than a third.",
    longDescription:
      "By fusing vibration, temperature, and throughput sensor data with historical maintenance logs, we trained a model that flags failing equipment days before a breakdown — giving maintenance teams a scheduled window instead of an emergency call.",
    technologies: ["Time Series ML", "IoT", "Python", "Grafana", "MLflow"],
    image: "/images/work-hero.jpg",
    mediaType: "image",
    href: "/our-work#predictive-maintenance-engine",
  },
];

// Home page shows a capped preview (4) in the same alternating layout as
// the full Our Work page, which always renders every project.
export const FEATURED_PROJECTS = PROJECTS.slice(0, 4);

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "future-of-ai-in-business",
    title: "The Future of AI in Business",
    excerpt:
      "Why the next wave of AI adoption will be won by teams that automate narrow workflows first, not the ones chasing general intelligence.",
    date: "2024-05-20",
    readTime: "6 min read",
    category: "Strategy",
    image: "/images/blog-1.jpg",
    content: [
      "Most of the AI headlines are about frontier models. Most of the AI value we've seen delivered, though, comes from something far less glamorous: a well-scoped model wired into a workflow someone actually uses every day.",
      "The businesses getting the clearest return aren't the ones with the biggest model — they're the ones that picked one repetitive, high-volume decision and automated it end to end, including the parts before and after the model call.",
      "That means treating the AI system as one component in a pipeline, not the whole product. Data ingestion, review queues, and fallback paths for the cases the model gets wrong usually take longer to build than the model itself — and they're what determine whether the system survives contact with real users.",
      "Our advice to teams starting out: pick the smallest workflow where being right 90% of the time and fast beats being right 100% of the time and slow. Ship that, measure it honestly, and let the roadmap grow from there.",
    ],
  },
  {
    slug: "how-ai-is-transforming-industries",
    title: "How AI Is Transforming Industries",
    excerpt:
      "From logistics to healthcare, a look at the specific decisions AI is now making faster and more consistently than people.",
    date: "2024-05-15",
    readTime: "5 min read",
    category: "Industry",
    image: "/images/blog-2.jpg",
    content: [
      "It's easy to talk about AI transforming industries in the abstract. It's more useful to look at the specific decisions that have quietly moved from a person's judgment to a model's output over the last two years.",
      "In logistics, that's dynamic routing and demand forecasting — decisions that used to rely on a dispatcher's intuition and now run on models retrained nightly against live traffic and order data.",
      "In manufacturing, it's visual quality inspection: a task that was always subjective and fatigue-prone for human inspectors is now handled by consistent, tireless vision models that flag genuine anomalies instead of noise.",
      "The common thread isn't the industry — it's that each of these decisions was high-frequency, well-defined, and expensive to get wrong. That's the pattern worth watching for in your own operation.",
    ],
  },
  {
    slug: "building-scalable-ai-solutions",
    title: "Building Scalable AI Solutions",
    excerpt:
      "The infrastructure decisions that determine whether your model survives contact with real production traffic.",
    date: "2024-05-10",
    readTime: "8 min read",
    category: "Engineering",
    image: "/images/blog-3.jpg",
    content: [
      "A model that performs well in a notebook and a model that performs well at 3am under real load are two very different engineering problems. The gap between them is almost entirely infrastructure.",
      "Three decisions tend to matter most: how you version and roll back models, how you monitor for drift once real-world data starts looking different from training data, and how you handle the inevitable slow request without taking down the rest of your system.",
      "We default to treating every model as a service with its own SLA, not a function call. That means health checks, timeouts, circuit breakers, and a clear fallback behavior — not just a retry loop.",
      "None of this is unique to AI. It's the same discipline that makes any distributed system reliable. The teams that scale AI successfully are usually the ones who stopped treating it as special.",
    ],
  },
  {
    slug: "rag-vs-fine-tuning",
    title: "RAG vs. Fine-Tuning: Choosing the Right Approach",
    excerpt:
      "A practical framework for deciding when to retrieve, when to fine-tune, and when you need both.",
    date: "2024-04-28",
    readTime: "7 min read",
    category: "Engineering",
    image: "/images/blog-1.jpg",
    content: [
      "The RAG-versus-fine-tuning debate usually gets framed as a technology choice. It's really a question about what kind of knowledge you're trying to change: facts, or behavior.",
      "If your problem is that the model doesn't know something — your latest pricing, a policy that changed last week — retrieval almost always wins. It's faster to update, easier to audit, and you can cite the source.",
      "If your problem is that the model knows the facts but responds in the wrong tone, format, or reasoning style, fine-tuning is usually the more direct fix. No amount of retrieved context reliably changes how a model writes.",
      "In practice, most production systems we build end up using both: retrieval for grounding, and light fine-tuning or careful prompting for voice and structure.",
    ],
  },
  {
    slug: "computer-vision-on-the-factory-floor",
    title: "Computer Vision on the Factory Floor",
    excerpt:
      "What changes when a vision model has to work under real lighting, real dust, and real deadlines.",
    date: "2024-04-12",
    readTime: "5 min read",
    category: "Case Study",
    image: "/images/blog-2.jpg",
    content: [
      "A vision model trained on clean, well-lit product photos rarely survives its first week on a factory floor. Real lighting shifts by the hour, lenses collect dust, and the parts move.",
      "The fix isn't a better model architecture — it's a better data collection process. We spend more time building representative training sets from the actual line than we do tuning hyperparameters.",
      "We also design for graceful degradation. When the model's confidence drops, the system doesn't guess — it routes the part to a human reviewer. That single design choice does more for trust on the floor than any accuracy metric.",
    ],
  },
  {
    slug: "governance-for-ai-systems",
    title: "Governance for AI Systems That Ship",
    excerpt:
      "Guardrails, evaluation, and human review — the unglamorous work that keeps AI systems trustworthy.",
    date: "2024-03-30",
    readTime: "6 min read",
    category: "Strategy",
    image: "/images/blog-3.jpg",
    content: [
      "Governance sounds like a compliance exercise, but the teams doing it well treat it as an engineering practice: a set of tests and checkpoints that run alongside the model, not a document that sits next to it.",
      "That starts with an evaluation set that reflects real usage, not a handful of hand-picked examples. It continues with clear boundaries for what the system is and isn't allowed to decide on its own.",
      "The unglamorous part — logging every decision, sampling outputs for human review, and having a fast path to disable a feature — is what actually keeps an AI system trustworthy once it's live and the person who built it isn't watching every request.",
    ],
  },
];

export const VALUES: ValueItem[] = [
  {
    icon: Sparkles,
    title: "Innovation",
    description:
      "We chase the smallest model that solves the problem, not the flashiest one — and we're always testing what's next.",
  },
  {
    icon: BrainCircuit,
    title: "Intelligence",
    description:
      "Every system we ship is grounded in rigorous evaluation, not vibes — we measure what matters before we call it done.",
  },
  {
    icon: Target,
    title: "Impact",
    description:
      "We measure success in hours saved and decisions improved for the people using what we build, not in demo applause.",
  },
];

export const TEAM: TeamMember[] = [
  { name: "Ariana Rahman", role: "Founder & CEO", image: "/images/team-1.jpg", initials: "AR" },
  { name: "Marcus Kim", role: "Head of Machine Learning", image: "/images/team-2.jpg", initials: "MK" },
  { name: "Sana Jahan", role: "Lead AI Engineer", image: "/images/team-3.jpg", initials: "SJ" },
  { name: "Tomas Lindqvist", role: "Design & Product Lead", image: "/images/team-4.jpg", initials: "TL" },
];

export const TIMELINE = [
  { year: "2021", title: "Nuviq is founded", description: "Started as a three-person applied ML consultancy in Dhaka." },
  { year: "2022", title: "First enterprise clients", description: "Shipped production forecasting and NLP systems for logistics and fintech clients." },
  { year: "2023", title: "Studio model launch", description: "Grew into a full studio spanning strategy, ML engineering, and computer vision." },
  { year: "2025", title: "Vision & automation practice", description: "Opened a dedicated computer vision and industrial automation practice." },
];

export const HOME_SERVICES_PREVIEW = SERVICES.slice(0, 4);
