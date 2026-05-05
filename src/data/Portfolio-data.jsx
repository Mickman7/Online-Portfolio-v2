import ProfilePic from '../assets/profilePic.jpg'

export const PROFILE = {
    name: "Michael",
    title: "Full-Stack Developer & AI Engineer",
    location: "London, UK",
    email: "michaeljohn_charles@yahoo.com",
    github: "https://github.com/Mickman7",
    linkedin: "https://www.linkedin.com/in/michael-john-charles-1a7538200/",
    bio: `I build things for the web — from pixel-perfect interfaces to 
  scalable backend systems. Passionate about clean code, thoughtful design, 
  and making the complex feel simple.
  
  When I'm not coding, you'll find me experimenting with generative art, 
  hiking trails, or hunting for the city's best espresso.`,
    avatar: ProfilePic,
  };
  
  export const PROJECTS = [
    {
      name: "Orbit Dashboard",
      tech: ["React", "D3.js", "Node.js"],
      desc: "Real-time analytics dashboard with interactive data visualisations for a SaaS platform serving 50k+ users.",
      link: "#",
      status: "Live",
    },
    {
      name: "Verdant",
      tech: ["Next.js", "Supabase", "Tailwind"],
      desc: "Sustainable shopping companion that scores products by environmental impact using ML-powered analysis.",
      link: "#",
      status: "Live",
    },
    {
      name: "Pulse API",
      tech: ["Go", "PostgreSQL", "Docker"],
      desc: "High-performance REST API gateway handling 10M+ requests/day with intelligent rate limiting and caching.",
      link: "#",
      status: "Open Source",
    },
    {
      name: "Chromatic",
      tech: ["Three.js", "GLSL", "WebAudio"],
      desc: "Browser-based audio visualiser that generates procedural 3D art synced to microphone input in real time.",
      link: "#",
      status: "Experiment",
    },
  ];
  
  export const SKILLS = {
    Frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML", "CSS", "PHP"],
    Backend: ["Node.js", "Python", "SQL"],
    AI: ["PyTorch", "TensorFlow", "OpenCV", "Scikit-Learn", "MATLAB"],
    DevOps: ["Docker", "AWS", "Git", "GitHub"],
    Design: ["Figma"],
  };
  
  export const CONTACT = {
    email: "michaeljohn_charles@yahoo.com",
    availability: "Open to Work",
    preferredRole: "Full-Stack Engineer & AI Engineer",
    message: `I'm always happy to chat about interesting projects, 
  collaborations, or just nerdy things. Drop me a message`
  };

  export const WINDOWS_CONFIG = [
    {
      id: "profile",
      label: "Profile",
      color: "#6ee7f7",
      glowColor: "rgba(110,231,247,0.3)",
      icon: "👤",
    },
    {
      id: "projects",
      label: "Projects",
      color: "#a78bfa",
      glowColor: "rgba(167,139,250,0.3)",
      icon: "📁",
    },
    {
      id: "skills",
      label: "Skills",
      color: "#34d399",
      glowColor: "rgba(52,211,153,0.3)",
      icon: "⚡",
    },
    {
      id: "contact",
      label: "Contact",
      color: "#fbbf24",
      glowColor: "rgba(251,191,36,0.3)",
      icon: "✉️",
    },
  ];
