export interface Award {
  id: number;
  slug: string;
  color: string;
  title: string;
  issuer: string;
  logo: string;
  fullImage: string;
  description: string;
  link?: string; // Optional external verification link
}

export const AWARDS: Award[] = [
  { 
    id: 1, 
    slug: "salesforce-agentforce",
    color: "#3b82f6", 
    title: "Salesforce Agentforce Specialist", 
    issuer: "Salesforce", 
    logo: "/images/awards/salesforce.svg",
    fullImage: "/photos/tokyo-shinjuku-2/image-1.jpg", // Placeholder for actual certificate
    description: "Achieved the Salesforce Agentforce Specialist certification, demonstrating expertise in AI-driven CRM solutions, automated agent workflows, and intelligent customer engagement platforms."
  },
  { 
    id: 2, 
    slug: "hackathon-sharpalthon",
    color: "#fb923c", 
    title: "3rd Prize — SharpAlthon", 
    issuer: "Hackathon", 
    logo: "/images/awards/hackathon.svg", 
    fullImage: "/photos/tokyo-shinjuku-2/image-2.jpg",
    description: "Awarded 3rd Prize at the SharpAlthon Hackathon for developing an innovative, high-performance software solution under extreme time constraints."
  },
  { 
    id: 3, 
    slug: "aws-cloud-foundations",
    color: "#34d399", 
    title: "AWS Cloud Foundations", 
    issuer: "Amazon Web Services", 
    logo: "/images/awards/aws.svg", 
    fullImage: "/photos/tokyo-shinjuku-2/image-3.jpg",
    description: "Certified by Amazon Web Services in Cloud Foundations, validating a comprehensive understanding of AWS infrastructure, security, pricing, and core architectural principles."
  },
  { 
    id: 4, 
    slug: "aws-ml-foundations",
    color: "#818cf8", 
    title: "AWS ML Foundations", 
    issuer: "Amazon Web Services", 
    logo: "/images/awards/aws.svg", 
    fullImage: "/photos/tokyo-shinjuku-2/image-4.jpg",
    description: "Completed the AWS Machine Learning Foundations program, mastering the deployment of scalable AI models and predictive analytics using AWS SageMaker and associated services."
  },
  { 
    id: 5, 
    slug: "best-project-careerpath",
    color: "#c4b5fd", 
    title: "Best Project — CareerPath AI", 
    issuer: "SRM Placement Cell", 
    logo: "/images/logo/careerpath_logo.png", 
    fullImage: "/photos/tokyo-shinjuku-2/image-8.jpg",
    description: "Recognized by the SRM Placement Cell for building CareerPath AI, securing the Best Project award for its immediate impact on student career discovery and resume optimization."
  },
  { 
    id: 6, 
    slug: "dsa-using-java",
    color: "#38bdf8", 
    title: "DSA using Java (12-Week)", 
    issuer: "NPTEL / IIT", 
    logo: "/images/awards/nptel.png", 
    fullImage: "/photos/tokyo-shinjuku-2/image-1.jpg",
    description: "Successfully completed a rigorous 12-week Data Structures and Algorithms curriculum administered by the Indian Institutes of Technology (IIT) via NPTEL."
  },
  { 
    id: 7, 
    slug: "hackerrank-stars",
    color: "#fbbf24", 
    title: "HackerRank 5★ C++ & 4★ Python", 
    issuer: "HackerRank", 
    logo: "/images/awards/hackerrank.svg", 
    fullImage: "/photos/tokyo-shinjuku-2/image-2.jpg",
    description: "Achieved a 5-star rating in C++ and a 4-star rating in Python on HackerRank, validating advanced algorithmic problem-solving capabilities and language mastery."
  },
  { 
    id: 8, 
    slug: "certificate-of-appreciation",
    color: "#f472b6", 
    title: "Certificate of Appreciation", 
    issuer: "Futurix Tech Club", 
    logo: "/images/logo/ultron_logo.png", 
    fullImage: "/photos/tokyo-shinjuku-2/image-3.jpg",
    description: "Received a Certificate of Appreciation from the Futurix Tech Club for outstanding technical contributions and leadership within the organization."
  },
];
