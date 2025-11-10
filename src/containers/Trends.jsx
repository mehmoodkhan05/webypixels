import { Container, Row, Col } from "react-bootstrap";
import SectionHeading from "../components/SectionHeading";
import { trendsData } from "../data/trends";

const Trends = () => {
  return (
    <section className="section-padding section-light" id="trends">
      <Container>
        <SectionHeading
          eyebrow="2025 Experience Upgrades"
          title="Dynamic additions that keep your brand ahead."
          description="Stay trend-forward with immersive interactions and intelligent automation baked into your digital experience."
        />
        <Row className="g-4" data-animate="fade-up" data-animate-delay="0.1s">
          {trendsData.map((trend, index) => (
            <Col key={trend.title} lg={3} md={6} data-animate="fade-up" data-animate-delay={`${0.14 + index * 0.05}s`}>
              <div className="trend-card">
                <h6>{trend.title}</h6>
                <p>{trend.description}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Trends;


