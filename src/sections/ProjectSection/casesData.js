import magmaLogo from "../../assets/nortis_logo.jpg";
import chamiongLogo from "../../assets/chamiong_logo.webp";
import dxcLogo from "../../assets/dxc_logo.svg";
import qodeepLogo from "../../assets/qodeep_logo.webp";
import previzmaLogo from "../../assets/previzma_logo.webp";
import sggLogo from "../../assets/sgg-logo.png";

// Single source for the engineering cases: rendered by Projects.jsx and
// emitted as CreativeWork structured data by src/seo/structuredData.js.
// Copy (title, subtitle, description, alt) lives in locales under
// projects.cases[id]. width/height are the files' intrinsic dimensions.
// logoType selects an optical-size class in ProjectCardStyles.module.css.
export const cases = [
  {
    id: "magma",
    logo: magmaLogo,
    width: 200,
    height: 200,
    logoType: "square",
    keywords: "Enterprise AI, B2B Intelligence, Anti-Hallucination Engine, Zero-PII, Multi-tenant Architecture, AI Orchestration",
  },
  {
    id: "chamiong",
    logo: chamiongLogo,
    width: 256,
    height: 256,
    logoType: "square",
    keywords: "Headless Commerce, ERP Decoupling, Odoo, Next.js, Sanity, B2B E-commerce, JSON-RPC",
  },
  {
    id: "dxc",
    logo: dxcLogo,
    width: 860,
    height: 240,
    logoType: "dxc",
    keywords: "Enterprise Systems, BI Engineering, Power BI, Dataverse, Power Apps, DAX, Run Teams",
  },
  {
    id: "qodeep",
    logo: qodeepLogo,
    width: 256,
    height: 256,
    logoType: "circle",
    keywords: "Architecture Audit, B2B Systems, AI Orchestration, Technical Governance, Digital Products",
  },
  {
    id: "previzma",
    logo: previzmaLogo,
    width: 512,
    height: 512,
    logoType: "prism",
    keywords: "Java 21, Spring Boot, Microservices, PostgreSQL, FastAPI, LightGBM, Angular",
  },
  {
    id: "sgg",
    logo: sggLogo,
    width: 425,
    height: 84,
    logoType: "sgg",
    keywords: "Odoo, Python, Public Sector ERP, Workflow Automation, BPMN, RBAC Security",
  },
];
