import Hero from "./containers/Hero";
import About from "./containers/About";
import Services from "./containers/Services";
import WhyChoose from "./containers/WhyChoose";
import TechStack from "./containers/TechStack";
import Portfolio from "./containers/Portfolio";
import Testimonials from "./containers/Testimonials";
import Team from "./containers/Team";
import Trends from "./containers/Trends";
import ContactCTA from "./containers/ContactCTA";
import useScrollReveal from "./hooks/useScrollReveal";
import "./App.css";

function App() {
  useScrollReveal();

  return (
    <div className="page-wrapper">
      <Hero />
      <main>
        <About />
        <Services />
        <WhyChoose />
        <TechStack />
        <Portfolio />
        <Testimonials />
        <Team />
        <Trends />
        <ContactCTA />
      </main>
      <footer className="footer">
        <div>© {new Date().getFullYear()} WebyPixels. Building growth-ready digital products worldwide.</div>
      </footer>
    </div>
  );
}

export default App;


