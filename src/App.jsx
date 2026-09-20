import "./App.css";
import Contact from "./sections/ContactSection/Contact";
import Footer from "./sections/FooterSection/Footer";
import Hero from "./sections/Hero/Hero";
import Experience from "./sections/ExperienceSection/Experience";
import Projects from "./sections/ProjectSection/Projects";
import Skills from "./sections/SkillsSection/Skills";
import Navbar from "./common/Navbar";
import ScrollToTop from "./common/ScrollToTop";

function App() {
  return (
    <>
      <Navbar />
      <main className="siteMain">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
