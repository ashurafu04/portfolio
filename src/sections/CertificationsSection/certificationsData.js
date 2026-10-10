import oracleLogo from "../../assets/oracle-com-logo.png";
import awsLogo from "../../assets/aws-eu-logo.png";
import harvardLogo from "../../assets/harvard-edu-logo.png";
import ibmLogo from "../../assets/ibm-com-logo.png";
import metaLogo from "../../assets/meta-com-logo.png";
import googleLogo from "../../assets/google-com-logo.png";
import umichLogo from "../../assets/umich-edu-logo.png";
import courseraLogo from "../../assets/coursera-org-logo.png";

// `kind` must describe the credential exactly as the issuer does; labels
// live in locales (certifications.kinds.*).
//   professional   — proctored exam (e.g. Oracle OCP)
//   specialization — multi-course program certificate
//   course         — single-course certificate
// `platform` names the delivery platform when it differs from the issuer.
// Beginner platform certificates (Sololearn, Udemy) are deliberately left to
// LinkedIn: on this page they would undercut the senior positioning.

// Static first row: the credentials a buyer is most likely to verify.
// Ordered by weight for a consulting buyer: proctored certification, then the
// strongest vendor names and delivery leadership.
export const featuredCertifications = [
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
];

// Moving second row: continuous learning that shows breadth.
export const learningCertifications = [
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
    id: "ibm-node-express",
    title: "Developing Back-End Apps with Node.js & Express",
    issuer: "IBM",
    platform: "Coursera",
    date: "Feb 2025",
    credentialId: "UZL6WXHFXHDT",
    url: "https://www.coursera.org/account/accomplishments/verify/UZL6WXHFXHDT",
    logo: ibmLogo,
    skills: "Node.js · Express.js · RESTful Services",
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
  {
    id: "epfl-cpp-oop",
    title: "Programmation Orientée Objet (C++)",
    issuer: "EPFL",
    platform: "Coursera",
    date: "Dec 2024",
    credentialId: "b8db35384de054f13f9eb9af610977a1",
    url: "https://coursera.org/share/b8db35384de054f13f9eb9af610977a1",
    logo: courseraLogo,
    skills: "C++ · OOP Principles · Abstraction",
    kind: "course",
  },
  {
    id: "jhu-unix-workbench",
    title: "The Unix Workbench",
    issuer: "Johns Hopkins University",
    platform: "Coursera",
    date: "Dec 2024",
    credentialId: "5289b44f84c7200fd85d0f1430fcb832",
    url: "https://coursera.org/share/5289b44f84c7200fd85d0f1430fcb832",
    logo: courseraLogo,
    skills: "Linux · Bash · Git · CLI Automation",
    kind: "course",
  },
  {
    id: "laravel-php-mastering",
    title: "Mastering Laravel Framework & PHP",
    issuer: "Board Infinity",
    platform: "Coursera",
    date: "Feb 2025",
    credentialId: "KTS607O8Y4E5",
    url: "https://www.coursera.org/account/accomplishments/verify/KTS607O8Y4E5",
    logo: courseraLogo,
    skills: "Laravel · PHP 8 · Eloquent ORM · Blade",
    kind: "course",
  },
  {
    id: "umich-js-interactivity",
    title: "Interactivity with JavaScript",
    issuer: "University of Michigan",
    platform: "Coursera",
    date: "Nov 2024",
    credentialId: "8ec75aaf19a413c1cd94882035d9b104",
    url: "https://coursera.org/share/8ec75aaf19a413c1cd94882035d9b104",
    logo: umichLogo,
    skills: "JavaScript · DOM Manipulation · Events",
    kind: "course",
  },
  {
    id: "meta-js-programming",
    title: "Programming with JavaScript",
    issuer: "Meta",
    platform: "Coursera",
    date: "Jul 2024",
    credentialId: "LPHBTMQQU8L2",
    url: "https://www.coursera.org/account/accomplishments/records/LPHBTMQQU8L2",
    logo: metaLogo,
    skills: "JavaScript ES6+ · Testing with Jest · OOP",
    kind: "course",
  },
  {
    id: "meta-react-basics",
    title: "React Basics",
    issuer: "Meta",
    platform: "Coursera",
    date: "Mar 2025",
    credentialId: "3TH344WX8SBP",
    url: "https://www.coursera.org/account/accomplishments/verify/3TH344WX8SBP",
    logo: metaLogo,
    skills: "React.js · Components · Virtual DOM",
    kind: "course",
  },
];
