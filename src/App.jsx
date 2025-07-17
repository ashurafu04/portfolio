import "./App.css";
import Contact from "./sections/ContactSection/Contact";
import Footer from "./sections/FooterSection/Footer";
import Hero from "./sections/Hero/Hero";
import Projects from "./sections/ProjectSection/Projects";
import Skills from "./sections/SkillsSection/Skills";
import Navbar from "./common/Navbar";
import ScrollToTop from "./common/ScrollToTop";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
