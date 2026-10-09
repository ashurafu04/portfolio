import oracleLogo from "../../assets/oracle-com-logo.png";
import awsLogo from "../../assets/aws-eu-logo.png";
import harvardLogo from "../../assets/harvard-edu-logo.png";
import ibmLogo from "../../assets/ibm-com-logo.png";
import metaLogo from "../../assets/meta-com-logo.png";
import googleLogo from "../../assets/google-com-logo.png";
import courseraLogo from "../../assets/coursera-org-logo.png";

// Curated for the consulting profile: proctored certification first, then
// coursework that backs the stack on the page. `kind` must describe the
// credential exactly as the issuer does; labels live in locales (kinds.*).
//   professional   — proctored exam (e.g. Oracle OCP)
//   specialization — multi-course program certificate
//   course         — single-course certificate
// `platform` names the delivery platform when it differs from the issuer.
export const certifications = [
  {
    id: "oracle-java-17",
    title: "Oracle Certified Professional: Java SE 17 Developer",
    issuer: "Oracle",
    date: "Aug 2026",
    credentialId: "103502707",
    url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=5AFD796832F37D01BECB3FE71EF92C4E192D1297535504D6B26A1DE8007ABE99",
    logo: oracleLogo,
    skills: "Java SE 17 · Core Java · OOP Architecture",
    kind: "professional",
  },
  {
    id: "aws-cloud-essentials",
    title: "AWS Cloud Technical Essentials",
    issuer: "Amazon Web Services",
    platform: "Coursera",
    date: "Sep 2025",
    credentialId: "BZOJRUGYZI2Y",
    url: "https://www.coursera.org/account/accomplishments/records/BZOJRUGYZI2Y",
    logo: awsLogo,
    skills: "AWS EC2 · S3 · IAM · Cloud Security",
    kind: "course",
  },
  {
    id: "harvard-cs50x",
    title: "CS50x: Introduction to Computer Science",
    issuer: "Harvard University",
    platform: "CS50",
    date: "Oct 2023",
    credentialId: "359f2060-ff40-4bc6-94c9-a46217d65bf0",
    url: "https://certificates.cs50.io/359f2060-ff40-4bc6-94c9-a46217d65bf0.pdf?size=letter",
    logo: harvardLogo,
    skills: "C · Python · Data Structures · Memory Management",
    kind: "course",
  },
  {
    id: "harvard-cs50-sql",
    title: "CS50: Introduction to Databases with SQL",
    issuer: "Harvard University",
    platform: "CS50",
    date: "Oct 2024",
    credentialId: "ac10e7b4-07fa-445f-bbb3-d09b163bf1a5",
    url: "https://certificates.cs50.io/ac10e7b4-07fa-445f-bbb3-d09b163bf1a5.pdf?size=letter",
    logo: harvardLogo,
    skills: "SQL · PostgreSQL · Normalization · SQLite",
    kind: "course",
  },
  {
    id: "ibm-python-ai",
    title: "Python for Data Science, AI & Development",
    issuer: "IBM",
    platform: "Coursera",
    date: "Apr 2025",
    credentialId: "VXLVKFNC1Q7X",
    url: "https://www.coursera.org/account/accomplishments/verify/VXLVKFNC1Q7X",
    logo: ibmLogo,
    skills: "Python · Pandas · NumPy · REST APIs",
    kind: "course",
  },
  {
    id: "meta-react-native",
    title: "React Native Specialization",
    issuer: "Meta",
    platform: "Coursera",
    date: "Dec 2025",
    credentialId: "5GA8FKZ470DV",
    url: "https://www.coursera.org/account/accomplishments/verify/5GA8FKZ470DV",
    logo: metaLogo,
    skills: "React Native · Mobile Architecture · Cross-Platform",
    kind: "specialization",
  },
  {
    id: "google-agile-pm",
    title: "Agile Project Management",
    issuer: "Google",
    platform: "Coursera",
    date: "May 2026",
    credentialId: "S7B9A8DACWSK",
    url: "https://www.coursera.org/account/accomplishments/records/S7B9A8DACWSK",
    logo: googleLogo,
    skills: "Scrum · Agile Delivery · Sprint Planning",
    kind: "course",
  },
  {
    id: "hkust-software-design",
    title: "Software Design & Project Management",
    issuer: "HKUST",
    platform: "Coursera",
    date: "Apr 2025",
    credentialId: "NNFCOERJLJSC",
    url: "https://www.coursera.org/account/accomplishments/verify/NNFCOERJLJSC",
    logo: courseraLogo,
    skills: "Design Patterns · Software Engineering · UML",
    kind: "course",
  },
];
