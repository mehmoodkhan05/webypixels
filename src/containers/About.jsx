import { Container, Row, Col } from "react-bootstrap";
import SectionHeading from "../components/SectionHeading";
import { aboutHighlights } from "../data/about";

const About = () => {
  return (
    <section className="section-padding section-light" id="about">
      <Container>
        <SectionHeading
          eyebrow="About WebyPixels"
          title="Blending creativity with code."
          description="Our expert developers, designers, and strategists build next-gen digital solutions that help businesses grow, engage, and innovate."
        />
        <p className="about-highlight text-center" data-animate="fade-up" data-animate-delay="0.1s">
          We deliver excellence across modern web builds, mobile apps, custom software, and cloud-ready solutions.
        </p>
        <Row className="g-4 justify-content-center mt-4">
          {aboutHighlights.map((item, index) => (
            <Col key={item} lg={6} data-animate="fade-up" data-animate-delay={`${0.12 + index * 0.05}s`}>
              <div className="about-list-item">{item}</div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default About;


