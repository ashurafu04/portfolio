import "./App.css";
import Contact from "./sections/ContactSection/Contact";
import Footer from "./sections/FooterSection/Footer";
import Hero from "./sections/Hero/Hero";
import Projects from "./sections/ProjectSection/projects";
import Skills from "./sections/SkillsSection/Skills";
function App() {
  return (
    <>
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
