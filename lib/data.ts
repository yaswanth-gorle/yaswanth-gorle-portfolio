/** All portfolio content lives here. Edit this file to update the site. */

export const PROFILE = {
  name: "Yaswanth Gorle",
  shortName: "Yaswanth",
  role: "Software Developer",
  tagline: "I build reliable Python and web applications, from database to browser.",
  summary:
    "Entry-level Software Developer with hands-on internship experience building, testing, debugging, and maintaining Python/Flask applications and responsive web applications. Comfortable across Java, Python, SQL databases, backend and full-stack development, with a working grasp of the SDLC, object-oriented programming, data structures and algorithms, API development, and testing.",
  location: "Vadodara, India",
  email: "yashwanth.gorle117@gmail.com",
  resume: "/files/Gorle_Yaswanth_Resume.pdf",
} as const;

export const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/yaswanth-gorle-182049272/" },
  { label: "GitHub", href: "https://github.com/yaswanth-gorle" },
  { label: "LeetCode", href: "https://leetcode.com/u/GORLE_YASWANTH/" },
] as const;

export const STATS = [
  { value: "3", label: "Internships completed" },
  { value: "3", label: "Languages: Java, Python, JS" },
  { value: "2", label: "Databases: MySQL, MongoDB" },
  { value: "2027", label: "B.Tech graduation" },
];

export type Job = {
  title: string;
  company: string;
  mode: string;
  period: string;
  points: string[];
  tags: string[];
};

export const EXPERIENCE: Job[] = [
  {
    title: "Python Developer Intern",
    company: "CodeAlpha",
    mode: "Remote",
    period: "Feb 2026 – May 2026",
    points: [
      "Developed and enhanced backend features for a Wedding and Event Management System using Python, Flask, SQLAlchemy, and MySQL.",
      "Implemented database-backed workflows for reliable data storage, retrieval, and application operations within the SDLC framework.",
    ],
    tags: ["Python", "Flask", "SQLAlchemy", "MySQL"],
  },
  {
    title: "Web Developer Intern",
    company: "Saiket Systems",
    mode: "Remote",
    period: "Jan 2026 – Feb 2026",
    points: [
      "Designed and optimized responsive web pages using HTML, CSS, and JavaScript for cross-device compatibility.",
      "Debugged frontend issues, resolved implementation errors, and improved overall website usability and performance.",
    ],
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "Digital Marketing Intern",
    company: "InAmigos Foundation",
    mode: "Remote",
    period: "Jul 2025",
    points: [
      "Assisted in coordinating digital campaigns and audience engagement initiatives while maintaining communication consistency.",
    ],
    tags: ["Communication", "Campaigns"],
  },
];

export type Project = {
  title: string;
  kind: string;
  description: string;
  tags: string[];
  link?: { href: string; label: string };
  featured?: boolean;
};

export const PROJECTS: Project[] = [
  {
    title: "Wedding & Event Management System",
    kind: "Full-stack web application",
    description:
      "A full-stack application featuring venue booking, vendor management, event scheduling, and a secure administrative login. The Flask backend is wired to MySQL through SQLAlchemy for persistent data and efficient queries.",
    tags: ["Python", "Flask", "SQLAlchemy", "MySQL", "Bootstrap", "JavaScript"],
    link: { href: "https://github.com/yaswanth-gorle", label: "View on GitHub" },
    featured: true,
  },
  {
    title: "Java Mini Projects",
    kind: "Object-oriented practice",
    description:
      "A Todo Management System, Tic-Tac-Toe, and Snake game built to practice control flow, data handling, and modular design using object-oriented programming.",
    tags: ["Java", "OOP", "Application Logic"],
  },
];

export const SKILLS = [
  { group: "Programming", items: ["Java", "Python", "JavaScript"] },
  {
    group: "Core Concepts",
    items: ["Object-Oriented Programming", "Data Structures & Algorithms", "SDLC", "Debugging"],
  },
  {
    group: "Backend & Web",
    items: ["Flask", "SQLAlchemy", "HTML", "CSS", "Bootstrap", "API Development"],
  },
  { group: "Databases", items: ["MySQL", "MongoDB"] },
  { group: "Tools & Cloud", items: ["Git", "GitHub", "VS Code", "AWS (familiarity)"] },
  {
    group: "Practices",
    items: ["Application Testing", "Responsive Web Design", "Database Management"],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Technology, Computer Science and Engineering (Artificial Intelligence)",
  school: "Parul University",
  place: "Vadodara, India",
  period: "2023 – 2027",
};

export const CERTIFICATIONS = [
  { title: "Python 101 for Data Science", issuer: "Cognitive Class" },
  { title: "Web Development Training", issuer: "Internshala Trainings" },
  {
    title: "Data Visualisation: Empowering Business with Effective Insights",
    issuer: "Tata Consultancy Services (Forage)",
  },
];
