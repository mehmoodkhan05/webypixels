import { Container, Row, Col, Button } from "react-bootstrap";
import SectionHeading from "../components/SectionHeading";
import { portfolioProjects } from "../data/portfolio";

const Portfolio = () => {
  return (
    <section className="section-padding section-light" id="portfolio">
      <Container>
        <SectionHeading
          eyebrow="Portfolio / Case Studies"
          title="See how we help startups scale and enterprises transform."
          description="Selected wins that highlight the velocity, craftsmanship, and measurable impact of WebyPixels."
        />
        <Row className="g-4" data-animate="fade-up" data-animate-delay="0.1s">
          {portfolioProjects.map((project, index) => (
            <Col key={project.title} lg={4} md={6} data-animate="fade-up" data-animate-delay={`${0.14 + index * 0.05}s`}>
              <div className="portfolio-card">
                <div className="fs-5 fw-semibold">{project.title}</div>
                <p className="mt-3">{project.description}</p>
                <div className="portfolio-meta">
                  {project.stack.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>
                <strong>{project.outcome}</strong>
              </div>
            </Col>
          ))}
        </Row>
        <div className="text-center mt-4" data-animate="fade-up" data-animate-delay="0.3s">
          <Button variant="outline-light" className="rounded-pill px-4 py-2">
            View All Projects →
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default Portfolio;


