import { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import { heroStats } from "../data/hero";
import SiteNavbar from "../components/Navbar";

const Hero = () => {
  const [showConvert, setShowConvert] = useState(false);

  const handleChatClick = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("chatbot:open"));
    }
  };

  return (
    <header className="hero-section" id="home">
      <SiteNavbar />
      <div className="pixel-grid" aria-hidden="true" />
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={7} className="hero-content" data-animate="fade-up">
            <span className="hero-eyebrow" data-animate="fade-up" data-animate-delay="0.05s">Full-cycle Web & App Studio</span>
            <h1 className="hero-title" data-animate="fade-up" data-animate-delay="0.1s">
              <TypeAnimation
                sequence={[
                  "Crafting Digital ",
                  () => {
                    setShowConvert(true);
                  },
                ]}
                speed={55}
                deletionSpeed={40}
                cursor={false}
                wrapper="span"
                repeat={0}
              />
              {showConvert && (
                <TypeAnimation
                  sequence={[" Experiences That Convert", 1600]}
                  speed={55}
                  cursor={false}
                  wrapper="span"
                  repeat={0}
                  className="hero-title-highlight"
                />
              )}
            </h1>
            <p className="hero-subtitle" data-animate="fade-up" data-animate-delay="0.18s">
              WebyPixels is a full-cycle web and app development company turning your ideas into scalable,
              user-focused digital products. We blend bold visuals with conversion-first UX to fuel growth.
            </p>
            <div className="hero-buttons mt-4" data-animate="fade-up" data-animate-delay="0.25s">
              <Button className="btn-cta-primary" size="lg" as="a" href="/quote">
                🚀 Get a Free Quote
              </Button>
              <Button className="btn-cta-secondary" size="lg" onClick={handleChatClick}>
                💬 Let’s Build Your App
              </Button>
            </div>
            <div className="hero-stats" data-animate="fade-up" data-animate-delay="0.35s">
              {heroStats.map((stat) => (
                <div key={stat.label} className="stat-chip">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </Col>
          <Col lg={5} data-animate="fade-left" data-animate-delay="0.2s">
            <div className="hero-visual">
              <div className="hero-panel" data-animate="fade-up" data-animate-delay="0.28s">
                <h5>Every Pixel, Perfectly Placed.</h5>
                <p>
                  Dedicated pods of strategists, designers, and engineers shipping next-gen digital products with clarity
                  and speed.
                </p>
                <ul className="hero-panel-list">
                  <li>
                    <span>⚡</span> Agile roadmaps tailored to your metrics
                  </li>
                  <li>
                    <span>🧠</span> Conversion-led design backed by data
                  </li>
                  <li>
                    <span>☁</span> Cloud-ready and API-driven from day one
                  </li>
                </ul>
                <div className="hero-panel-footer">
                  <small>Trend-forward builds with animated gradients & micro-interactions.</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Hero;


