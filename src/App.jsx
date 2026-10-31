import About from "./components/About";
import BackToTop from "./components/BackToTop";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Projects from "./components/Projects";
import ProjectsCarousel from "./components/ProjectsCarousel";
import Skills from "./components/Skills";

export default function App() {
  return (
    <div className="relative min-h-screen">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <About />
        <Skills />
        <Education />
        <Experience />
        <Projects />
        <ProjectsCarousel />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
