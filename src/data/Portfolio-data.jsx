import ProfilePic from '../assets/profilePic.JPG'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faFolderOpen, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faCode, faLocationDot } from '@fortawesome/free-solid-svg-icons'

export const PROFILE = {
    name: "Michael",
    title: "Full-Stack Developer & AI Engineer",
    location: "London, UK",
    email: "michaeljohn_charles@yahoo.com",
    github: "https://github.com/Mickman7",
    linkedin: "www.linkedin.com/in/michael-john-charles-1a7538200/",
    bio: `I build things for the web — from pixel-perfect interfaces to 
  scalable backend systems. Passionate about clean code, thoughtful design, 
  and making the complex feel simple.
  
  When I'm not coding, you'll find me experimenting with generative art, 
  hiking trails, or hunting for the city's best espresso.`,
    avatar: ProfilePic,
  };
  
  export const PROJECTS = [
    {
        name: "OfficeEye",
        tech: ["Python", "DeepFace", "Streamlit", "SQLite", "OpenCV", "NumPy"],
        desc: "A specialised security system developed as an end-to-end computer vision project, the application utilises Deep Learning models to detect and identify registered office staff in real-time while managing a secure identity database. ",
        link: "https://github.com/Mickman7/OfficeEye",
        status: "Live",
      },
    {
      name: "QualityLens",
      tech: ["Streamlit", "PyTorch", "MobileNetV3", "FastAPI"],
      desc: "An intuitive AI-powered application I developed to automate fruit quality assessment through computer vision. ",
      link: "https://github.com/Mickman7/QualityLens",
      status: "Live",
    },
    {
      name: "AI-PPLY",
      tech: ["React.js", "FastAPI", "Tailwind", "OpenAI"],
      desc: "A specialised Applicant Tracking System (ATS) tool used to evaluate resume compatibility against job descriptions.",
      link: "https://github.com/Mickman7/AI-PPLY",
      status: "Live",
    },
    {
      name: "Healify",
      tech: ["React Native", "Firebase", "Firestore", "FirebaseAuth"],
      desc: "Healify is a eGFR calculator application for patients with kidney disease.",
      link: "https://github.com/Mickman7/Healify",
      status: "Mobile App",
    },
    {
      name: "OptiCare",
      tech: ["React Native", "Firebase", "Firestore", "FirebaseAuth"],
      desc: "A cross-platform mobile application using React Native to streamline hospital workflows, including appointment booking and treatment scheduling.",
      link: "https://github.com/Mickman7/OptiCare",
      status: "Mobile App",
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
      icon: <FontAwesomeIcon icon={faUser} size="xl" />,
    },
    {
      id: "projects",
      label: "Projects",
      color: "#a78bfa",
      glowColor: "rgba(167,139,250,0.3)",
      icon: <FontAwesomeIcon icon={faFolderOpen} size="xl" />,
    },
    {
      id: "skills",
      label: "Skills",
      color: "#34d399",
      glowColor: "rgba(52,211,153,0.3)",
      icon: <FontAwesomeIcon icon={faCode} size="xl" />,
    },
    {
      id: "contact",
      label: "Contact",
      color: "#fbbf24",
      glowColor: "rgba(251,191,36,0.3)",
      icon: <FontAwesomeIcon icon={faEnvelope} size="xl" />,
    },
  ];
