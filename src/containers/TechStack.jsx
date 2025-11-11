import { Container, Row, Col } from "react-bootstrap";
import SectionHeading from "../components/SectionHeading";
import { techStackData } from "../data/techStack";

const TechStack = () => {
  return (
    <section className="section-padding" id="tech">
      <Container>
        <SectionHeading
          eyebrow="Tech Stack"
          title="Future-ready architecture from frontend to cloud."
          description="We partner with leading technologies to deliver reliable, scalable, and delightfully fast digital products."
        />
        <Row className="g-4 justify-content-center" data-animate="fade-up" data-animate-delay="0.1s">
          {techStackData.map((group, index) => (
            <Col key={group.category} lg={4} md={6} data-animate="fade-up" data-animate-delay={`${0.14 + index * 0.05}s`}>
              <div className="tech-card">
                <h5>{group.category}</h5>
                {group.tools.map((tool) => (
                  <span key={tool} className="tech-pill">
                    {tool}
                  </span>
                ))}
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default TechStack;


