/**
 * Portfolio Data Configuration
 * Easily update profile information, projects, skills, and experience.
 */

const portfolioData = {
  profile: {
    name: "Alex Vance",
    brandName: "Plantform Tech",
    title: "Senior Full Stack Architect & Creative Technologist",
    tagline: "Architecting minimal, high-impact digital experiences with precision engineering and glassy monochrome aesthetics.",
    status: "Available for Q1/Q2 Projects & Advisory",
    bio: "With over 7 years of engineering high-concurrency cloud systems and award-winning minimalist interfaces, I merge technical rigor with refined visual craftsmanship. Based at the intersection of performant web architectures and human-centric UI/UX.",
    location: "San Francisco, CA / Remote Worldwide",
    email: "alex@plantformtech.com",
    phone: "+1 (555) 392-8810",
    yearsExperience: 8,
    projectsCompleted: 48,
    clientSatisfaction: 99.4,
    openSourceContribs: "2.4k+"
  },

  socials: [
    { name: "GitHub", url: "https://github.com", icon: "github" },
    { name: "LinkedIn", url: "https://linkedin.com", icon: "linkedin" },
    { name: "Twitter / X", url: "https://x.com", icon: "x" },
    { name: "Dribbble", url: "https://dribbble.com", icon: "dribbble" },
    { name: "ReadCV", url: "#", icon: "document" }
  ],

  stats: [
    { label: "Years of Experience", value: "8+", num: 8, suffix: "+" },
    { label: "Projects Shipped", value: "48+", num: 48, suffix: "+" },
    { label: "Client Satisfaction", value: "99.4%", num: 99.4, suffix: "%" },
    { label: "Code Commits in 2026", value: "2,450+", num: 2450, suffix: "+" }
  ],

  skills: [
    {
      category: "Frontend & Architecture",
      items: [
        { name: "React / Next.js 15", level: 96 },
        { name: "TypeScript & Modern JS", level: 98 },
        { name: "Tailwind & Vanilla CSS3", level: 95 },
        { name: "Three.js / WebGL / Canvas", level: 85 },
        { name: "Vue.js / Nuxt", level: 88 }
      ]
    },
    {
      category: "Backend & Systems",
      items: [
        { name: "Node.js & Bun runtime", level: 94 },
        { name: "Python / FastAPI / PyTorch", level: 90 },
        { name: "PostgreSQL & Redis Cache", level: 92 },
        { name: "GraphQL & RESTful APIs", level: 95 },
        { name: "Go (Golang)", level: 82 }
      ]
    },
    {
      category: "Cloud, DevOps & AI",
      items: [
        { name: "AWS / Google Cloud / Vercel", level: 90 },
        { name: "Docker & Kubernetes CI/CD", level: 86 },
        { name: "LLM Orchestration & RAG", level: 92 },
        { name: "Microservices Architecture", level: 89 },
        { name: "Security & OWASP Hardening", level: 88 }
      ]
    },
    {
      category: "UI/UX & Product Design",
      items: [
        { name: "Figma & Design Systems", level: 94 },
        { name: "Micro-interactions & Motion", level: 92 },
        { name: "Accessibility (WCAG AAA)", level: 96 },
        { name: "Information Architecture", level: 91 },
        { name: "Prototyping & User Testing", level: 89 }
      ]
    }
  ],

  projects: [
    {
      id: "prism-os",
      title: "Prism OS - Glassmorphic Workspace",
      category: "fullstack",
      categoryLabel: "Full Stack & WebGL",
      featured: true,
      year: "2026",
      shortDesc: "Next-generation browser operating system featuring real-time glass refractive shaders, multi-window tiling, and AI-assisted workflows.",
      fullDesc: "Prism OS is an experimental yet ultra-performant browser-based desktop environment built for high-focus engineering teams. It leverages WebGL pixel shaders to achieve real-time frosted glass refraction at 60fps on mobile and 120fps on desktop displays. Includes integrated terminal, code editor, multi-model AI assistant, and zero-latency markdown collaboration.",
      tags: ["TypeScript", "WebGL", "Next.js", "WebSockets", "Tailwind"],
      metrics: "Sub-16ms render pipeline • 35k monthly active users • 99.98% uptime",
      github: "https://github.com",
      live: "https://example.com/prism",
      imageTheme: "geometric-cube",
      highlights: [
        "Custom GLSL shader engine for realistic optical glass refraction and chromatic aberration",
        "Encrypted peer-to-peer real-time document sync via WebRTC data channels",
        "Zero-latency virtualized filesystem with local IndexedDB fallback"
      ]
    },
    {
      id: "strata-cloud",
      title: "Strata - Autonomous Cloud Engine",
      category: "cloud-ai",
      categoryLabel: "Cloud & AI",
      featured: true,
      year: "2025",
      shortDesc: "Self-healing cloud infrastructure automation platform with LLM-powered anomaly mitigation and zero-downtime scaling.",
      fullDesc: "Strata continuously monitors Kubernetes clusters, traces multi-region telemetry, and identifies cascading bottlenecks before they cause service degradation. With an autonomous agentic loop, it generates self-contained git pull requests with root-cause fixes and rollbacks.",
      tags: ["Python", "FastAPI", "Docker", "Kubernetes", "Prometheus"],
      metrics: "84% reduction in incident MTTR • Analyzed 1.2M queries/sec",
      github: "https://github.com",
      live: "https://example.com/strata",
      imageTheme: "data-waves",
      highlights: [
        "Distributed log analysis engine written in Rust and Go with Python orchestration",
        "Automated semantic vector searching over 500GB of historical system incidents",
        "Enterprise role-based access control with SOC2 Type II compliance audit trails"
      ]
    },
    {
      id: "lumina-design",
      title: "Lumina - Monochromatic Design System",
      category: "design",
      categoryLabel: "Design System & UI/UX",
      featured: true,
      year: "2025",
      shortDesc: "A stark, luxury black-and-white design system comprising 80+ accessible components, glassmorphism tokens, and micro-animations.",
      fullDesc: "Designed for fintech and developer tools demanding extreme visual clarity and modern refinement. Lumina avoids visual clutter by relying entirely on spatial hierarchy, optical weight, subtle glass reflections, and micro-typography.",
      tags: ["Figma", "Design Tokens", "React", "Storybook", "CSS Custom Props"],
      metrics: "Adopted by 14 enterprise products • 100% WCAG AA contrast",
      github: "https://github.com",
      live: "https://example.com/lumina",
      imageTheme: "abstract-grid",
      highlights: [
        "Mathematical layout grid scaled on a 4px baseline rhythm",
        "Automated Figma-to-code token sync via GitHub Actions",
        "Comprehensive keyboard accessibility with full screen reader support"
      ]
    },
    {
      id: "apex-crypto",
      title: "Apex Vault - Glass Financial Terminal",
      category: "fullstack",
      categoryLabel: "Fintech & Web3",
      featured: false,
      year: "2025",
      shortDesc: "High-frequency institutional asset dashboard with real-time order books, sub-millisecond execution, and hardware wallet integration.",
      fullDesc: "Apex Vault presents complex market depth and algorithmic trade execution within a tranquil, dark frosted glass interface. By offloading charting to Canvas 2D and WebGL, the interface delivers buttery-smooth 120 FPS data feeds even during intense market volatility.",
      tags: ["React 19", "WebSockets", "Canvas API", "Node.js", "Redis"],
      metrics: "$240M+ daily simulated trade throughput • <4ms order book lag",
      github: "https://github.com",
      live: "https://example.com/apex",
      imageTheme: "crypto-vault",
      highlights: [
        "Custom high-speed binary protocol over WebSockets for live market depth",
        "Biometric WebAuthn passkey authentication for instant physical signing",
        "Dark/Light high-contrast financial color schemes"
      ]
    },
    {
      id: "nexus-flow",
      title: "Nexus Flow - Minimalist Task Canvas",
      category: "design",
      categoryLabel: "Productivity & UI",
      featured: false,
      year: "2024",
      shortDesc: "Infinite visual canvas for systems architecture and product workflows with instant markdown export and spatial audio collaboration.",
      fullDesc: "A spatial whiteboard built for architects who think visually. Combines infinite zoom mechanics with clean minimalist black & white typography and frosted overlays, eliminating the rainbow clutter of typical canvas tools.",
      tags: ["TypeScript", "SVG / Canvas", "Tailwind CSS", "IndexedDB"],
      metrics: "Over 50,000 architectural boards created • 4.9/5 user rating",
      github: "https://github.com",
      live: "https://example.com/nexus",
      imageTheme: "infinite-canvas",
      highlights: [
        "Adaptive Level-of-Detail (LoD) rendering engine handles 10,000+ nodes smoothly",
        "Keyboard-first navigation with vim-style command shortcuts",
        "Local-first encryption ensuring client enterprise blueprints remain confidential"
      ]
    },
    {
      id: "aegis-sentinel",
      title: "Aegis Sentinel - Zero-Trust API Shield",
      category: "cloud-ai",
      categoryLabel: "Security & Cloud",
      featured: false,
      year: "2024",
      shortDesc: "Edge-based API gateway implementing cryptographic request verification, distributed rate limiting, and automated bot mitigation.",
      fullDesc: "Deployed across 280 edge locations globally, Aegis Sentinel safeguards microservices with zero-trust token handshakes and real-time cryptographic fingerprinting. Packaged with a glassy management console providing millisecond latency breakdown.",
      tags: ["Cloudflare Workers", "Rust", "TypeScript", "Wasm", "GraphQL"],
      metrics: "Filtered 450M malicious probes • Sub-2ms edge overhead",
      github: "https://github.com",
      live: "https://example.com/aegis",
      imageTheme: "shield-monochrome",
      highlights: [
        "Edge-compiled WebAssembly regex filter processing 100k requests/core",
        "Dynamic token rotation with asymmetric elliptic-curve signing (Ed25519)",
        "Zero dependency core architecture"
      ]
    }
  ],

  experience: [
    {
      period: "2023 - Present",
      role: "Lead Platform Architect",
      company: "Plantform Tech Labs",
      location: "San Francisco, CA",
      description: "Spearheading the core infrastructure and design engineering team. Architected distributed cloud platforms handling 40M+ monthly requests and led the rollout of a unified glassy monochrome design language across 6 web applications.",
      skills: ["System Architecture", "Next.js", "TypeScript", "Microservices", "Design Systems"]
    },
    {
      period: "2021 - 2023",
      role: "Senior Full Stack Engineer",
      company: "Aether Matrix Systems",
      location: "New York / Remote",
      description: "Engineered real-time telemetry dashboards and reactive micro-frontends. Reduced frontend initial bundle payloads by 58% and introduced automated end-to-end testing pipelines.",
      skills: ["React", "Node.js", "GraphQL", "Docker", "Performance Tuning"]
    },
    {
      period: "2019 - 2021",
      role: "Software & UI/UX Engineer",
      company: "Vanguard Digital Studio",
      location: "Austin, TX",
      description: "Crafted bespoke digital products, interactive brand platforms, and high-conversion SaaS web applications for Fortune 500 clients. Championed accessible, minimalist monochrome design standards.",
      skills: ["JavaScript (ES6+)", "CSS3 / Sass", "UI/UX Prototyping", "WebGL", "REST APIs"]
    },
    {
      period: "2017 - 2019",
      role: "Frontend Developer",
      company: "Kinesis Creative Labs",
      location: "Remote",
      description: "Developed responsive web applications, animated interactive landing pages, and client portals with focus on smooth micro-interactions and mobile responsiveness.",
      skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Git"]
    }
  ],

  testimonials: [
    {
      quote: "Working with Alex and the Plantform Tech team was transformative. The level of craftsmanship, architectural foresight, and clean glassy aesthetic turned our complex data pipeline into a tool our clients genuinely love using.",
      author: "Marcus Vance",
      title: "VP of Engineering, Apex Dynamics",
      avatar: "MV"
    },
    {
      quote: "An extraordinary engineer who possesses rare dual mastery of low-level systems architecture and high-end visual aesthetics. The monochrome interface is sleek, fast, and remarkably intuitive.",
      author: "Elena Rostova",
      title: "Head of Product, Horizon Global",
      avatar: "ER"
    },
    {
      quote: "Delivered our flagship platform 3 weeks ahead of schedule with zero architectural debt. Our user retention jumped 42% following the launch of the new glassy interface.",
      author: "David Chen",
      title: "Founder & CEO, Novus Cloud",
      avatar: "DC"
    }
  ]
};
