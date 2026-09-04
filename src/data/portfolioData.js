export const roles = [
  "Frontend Web Developer",
  "App Developer",
  "UI / UX Designer",
  "Backend Developer",
  "Student",
];

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "resume", label: "Skills" },
  { id: "portfolio", label: "Projects" },
  { id: "blog", label: "Certificates" },
  { id: "contact", label: "Contact" },
];

export const projects = [
  {
    id: "project-1",
    title: "Classroom Management System",
    type: "Web Application",
    badge: "MAGNUM OPUS",
    date: "2024 - 2025",
    subtitle: "FULL-STACK ACADEMIC SUITE",
    image: "/image/Project.png",
    description:
      "A lightweight web suite for student enrollment, grading, and attendance tracking, designed to streamline school administrative tasks.",
    keyFeatures: [
      "Student Enrollment & Grading Portals",
      "Real-time Attendance Tracking System",
      "Automated Grade Report & Analytics",
      "Role-Based Admin & Teacher Access",
    ],
    technologies: ["Python", "Django", "Tailwind", "MySQL"],
  },
  {
    id: "project-2",
    title: "Arduino Automated Gate",
    type: "Hardware IoT Project",
    badge: "FEATURED IOT",
    date: "2023 - 2024",
    subtitle: "HARDWARE & SENSOR SYSTEM",
    image: "/image/Gate monitoring system.png",
    description:
      "An Arduino-powered gate monitoring and automation system that secures entryways using RFID sensors, real-time logging, and mechanical gate controls.",
    keyFeatures: [
      "RFID Sensor Access Verification",
      "Real-Time Entryway Activity Logging",
      "Mechanical Motor Gate Actuation",
      "Hardware Override Security Logic",
    ],
    technologies: ["Arduino", "C++", "RFID Sensors", "Hardware Integration"],
  },
  {
    id: "project-3",
    title: "Event Management",
    type: "Web Application",
    badge: "WEB PLATFORM",
    date: "2024",
    subtitle: "TASK & SCHEDULING SYSTEM",
    image: "/image/Event Task manager.jpg",
    description:
      "A task and event manager designed to schedule, assign, and coordinate events, tasks, and deadlines within teams seamlessly.",
    keyFeatures: [
      "Interactive Task & Deadline Board",
      "Automated Event Reminders & Alerts",
      "Team Member Assignment & Roles",
      "Calendar View & Scheduling Sync",
    ],
    technologies: ["JavaScript", "Node.js", "Express", "MongoDB"],
  },
  {
    id: "project-4",
    title: "Personal Portfolio",
    type: "Frontend Website",
    badge: "FRONTEND SUITE",
    date: "2026",
    subtitle: "INTERACTIVE WEB SHOWCASE",
    video: "/video/DEMO PRESENTATION.mp4",
    poster: "/image/loading screen.png",
    description:
      "A professional personal portfolio website showcasing academic projects, certifications, technical skills, and contact information.",
    keyFeatures: [
      "GSAP Gooey & ScrollTrigger Reveals",
      "Morphing Role Text Rotator",
      "Responsive Full Screen Fitting",
      "Interactive Modal Case Study Previews",
    ],
    technologies: ["React", "Vite", "JavaScript", "Tailwind CSS"],
  },
];

export const certificates = [
  {
    id: "cert-1",
    title: "Programming Foundations: Fundamentals",
    provider: "LinkedIn Learning",
    image: "/image/Programming foundations.jpg",
    description:
      "This course builds a strong base in programming logic, problem solving, and core concepts used in software development.",
    technologies: ["Programming", "Foundations", "Problem Solving"],
  },
  {
    id: "cert-2",
    title: "Incident Response Leadership",
    provider: "LinkedIn Learning",
    image: "/image/Incident Respone Leadership for Cybersecurity Managers.jpg",
    description:
      "Focuses on leading security response teams, coordinating recovery, and minimizing operational impact during cyber incidents.",
    technologies: ["Incident Response", "Cybersecurity Leadership", "Business Continuity"],
  },
  {
    id: "cert-3",
    title: "Cybersecurity Audit & Assessment",
    provider: "LinkedIn Learning",
    image: "/image/Cybersecurity Audit and Assessment Fundamentals.jpg",
    description:
      "Covers how to assess risk, review controls, and evaluate the security posture of systems and processes.",
    technologies: ["Cybersecurity Audit", "GRC", "Risk Management"],
  },
  {
    id: "cert-4",
    title: "Cybersecurity Foundations: GRC",
    provider: "LinkedIn Learning",
    image: "/image/Cybersecurity Foundations.jpg",
    description:
      "Explains governance, risk, compliance, and the foundations of protecting business systems and information.",
    technologies: ["Cybersecurity", "GRC", "Governance"],
  },
  {
    id: "cert-5",
    title: "Learning Threat Modeling for Security",
    provider: "LinkedIn Learning",
    image: "/image/Learning Threat Modeling for Security.jpg",
    description:
      "Builds understanding of identifying attack surfaces, evaluating risk, and designing stronger application security controls.",
    technologies: ["Threat Modeling", "Application Security", "Risk Mitigation"],
  },
];

export const seminarCertificates = [
  {
    id: "seminar-1",
    title: "Ethical Hacking",
    provider: "Online Seminar",
    image: "/image/Ethical Hacking.png",
    description:
      "This seminar focused on ethical hacking principles, identifying vulnerabilities, and strengthening organizational cyber defenses.",
    technologies: ["Ethical Hacking", "Vulnerability Assessment", "Cyber Security"],
  },
  {
    id: "seminar-2",
    title: "Cybersecurity",
    provider: "Online Seminar",
    image: "/image/Cybersecurity.png",
    description:
      "Covered cybersecurity awareness, risk reduction strategies, and the practical steps needed to protect digital systems and information.",
    technologies: ["Security Awareness", "Risk Reduction", "Digital Protection"],
  },
  {
    id: "seminar-3",
    title: "Certificate of Appearance",
    provider: "Seminar",
    image: "/image/Certificate of Appearance.png",
    description:
      "This certificate recognizes participation in the CHED RAISE 2026 event held in Iloilo City, Philippines.",
    technologies: ["CHED RAISE", "Conference", "Iloilo City"],
  },
  {
    id: "seminar-4",
    title: "Certificate of Participation",
    provider: "Seminar",
    image: "/image/Certificate of Participation.png",
    description:
      "This certificate acknowledges active participation and engagement in the CHED RAISE 2026 seminar.",
    technologies: ["CHED RAISE", "Seminar", "Professional Growth"],
  },
];

export const skillGroups = {
  "Frontend Frameworks": [
    ["Vue.js", "https://img.icons8.com/fluency/96/vuejs.png"],
    ["React", "https://img.icons8.com/office/80/react.png"],
    ["Tailwind CSS", "https://img.icons8.com/fluency/96/tailwind_css.png"],
  ],
  "Backend Frameworks": [
    ["Node.js", "https://img.icons8.com/fluency/96/node-js.png"],
    ["Python", "https://img.icons8.com/fluency/96/python.png"],
    ["PHP", "https://img.icons8.com/officel/80/php-logo.png"],
    ["Laravel", "https://img.icons8.com/fluency/96/laravel.png"],
    ["Django", "https://img.icons8.com/color/48/django.png"],
  ],
  "Developer Tools": [
    ["Git", "https://img.icons8.com/fluency/96/git.png"],
    ["GitHub", "https://img.icons8.com/fluency/96/github.png"],
    ["VS Code", "https://img.icons8.com/fluency/96/visual-studio-code-2019.png"],
    ["Npm", "https://img.icons8.com/color/96/npm.png"],
    ["Visual Studio", "https://img.icons8.com/fluency/96/visual-studio.png"],
    ["Arduino", "https://img.icons8.com/color/48/arduino.png"],
  ],
  "Operating Systems": [
    ["Windows", "https://img.icons8.com/fluency/96/windows-10.png"],
    ["Kali", "https://img.icons8.com/color/96/kali-linux.png"],
    ["Fedora", "https://img.icons8.com/fluency/96/fedora.png"],
  ],
  Database: [
    ["MySQL", "https://img.icons8.com/color/96/mysql-logo.png"],
  ],
};

export const timelineItems = [
  {
    title: "Lead Application Developer",
    detail: "Bluewind Asia",
    year: "2021",
  },
  {
    title: "Software Engineer",
    detail: "GCM",
    year: "2020",
  },
  {
    title: "BS Information Technology",
    detail: "Filamer Christian University",
    year: "2023 - Present",
  },
  {
    title: "Hello World!",
    detail: "Wrote my first line of code",
    year: "2022",
  },
];

export const socialLinks = [
  {
    icon: "fab fa-linkedin-in",
    title: "LinkedIn",
    text: "Connect with me professionally",
    href: "https://www.linkedin.com",
  },
  {
    icon: "fab fa-github",
    title: "GitHub",
    text: "Explore my repositories",
    href: "https://github.com/joshua662",
  },
  {
    icon: "fas fa-envelope",
    title: "Email",
    text: "joshiasimpas36@gmail.com",
    href: "mailto:joshiasimpas36@gmail.com",
  },
];
