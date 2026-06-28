export interface Experience {
  id: number;
  role: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: 1,
    role: "Full Stack Engineer Intern",
    company: "Tech Innovators Inc.",
    duration: "June 2024 - Present",
    location: "Remote",
    description: [
      "Engineered high-performance web applications using React and Node.js, improving load times by 40%.",
      "Designed and implemented RESTful APIs to integrate machine learning pipelines for predictive analytics.",
      "Collaborated with cross-functional teams in an Agile environment to deliver features ahead of schedule."
    ],
    skills: ["React", "Node.js", "TypeScript", "AWS"]
  },
  {
    id: 2,
    role: "AI/ML Research Assistant",
    company: "University Lab",
    duration: "Jan 2023 - May 2024",
    location: "Chennai, India",
    description: [
      "Developed deep learning models for computer vision tasks using PyTorch, achieving 95% accuracy on benchmark datasets.",
      "Published a research paper on optimizing neural networks for edge computing devices.",
      "Mentored junior students in foundational data science concepts and Python programming."
    ],
    skills: ["Python", "PyTorch", "OpenCV", "TensorFlow"]
  },
  {
    id: 3,
    role: "Software Developer Intern",
    company: "Startup Hub",
    duration: "May 2022 - Aug 2022",
    location: "Bangalore, India",
    description: [
      "Built a highly responsive front-end dashboard for a fintech application using Tailwind CSS and React.",
      "Integrated third-party payment gateways, securing transactions for over 10,000 active users.",
      "Optimized database queries in PostgreSQL, reducing data retrieval latency by 30%."
    ],
    skills: ["JavaScript", "React", "PostgreSQL", "Tailwind CSS"]
  }
];
