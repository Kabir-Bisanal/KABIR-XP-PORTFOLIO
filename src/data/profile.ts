export type ProfileData = {
  highlights: {
  title: string;
  detail: string;
}[];
  name: string;
  initials: string;
  professionalTitle: string;
  shortIntroduction: string;
  location: string;
  degree: string;
  branch: string;
  college: string;
  university: string;
  email: string;
  githubUrl: string;
  githubUsername: string;
  linkedInUrl: string;
  availability: string;
};

export const profile: ProfileData = {
  name: "Kabir Bisanal",

  initials: "KB",

  professionalTitle:
  "Software Developer | Full-Stack & Data Science Projects",

 shortIntroduction:
  "Computer Science student building end-to-end software projects across full-stack web development, data science, automation and databases. My recent work includes SmartStock, Topicora and this Windows XP portfolio.",

  highlights: [
  {
    title: "SmartStock",
    detail: "582K+ retail observations",
  },
  {
    title: "Topicora",
    detail: "Full-stack publishing platform",
  },
  {
    title: "XP Portfolio",
    detail: "Live at kabirbisanal.com",
  },
],
  location: "Karnataka, India",

  degree: "Bachelor of Engineering",

  branch: "Computer Science and Engineering",

  college: "SEA College of Engineering and Technology",

  university: "Visvesvaraya Technological University",

  /*
    Replace this with your professional email later.

    Example:
    email: "kabir@example.com",
  */
  email: "",

  githubUrl: "https://github.com/Kabir-Bisanal",

  githubUsername: "Kabir-Bisanal",

  /*
    Replace this with your complete LinkedIn profile URL later.

    Example:
    linkedInUrl: "https://www.linkedin.com/in/your-name",
  */
  linkedInUrl: "",

  availability:
    "Available for internships, entry-level opportunities and project collaborations.",
};