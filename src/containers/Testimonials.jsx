import { Container, Row, Col } from "react-bootstrap";
import SectionHeading from "../components/SectionHeading";
import { testimonialsData } from "../data/testimonials";

const Testimonials = () => {
  return (
    <section className="section-padding" id="testimonials">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="What our partners are saying."
          description="Real words from the founders and teams scaling with WebyPixels."
        />
        <Row className="g-4" data-animate="fade-up" data-animate-delay="0.1s">
          {testimonialsData.map((testimonial, index) => (
            <Col key={testimonial.author} lg={6} data-animate="fade-up" data-animate-delay={`${0.14 + index * 0.05}s`}>
              <div className="testimonial-card">
                <p>“{testimonial.quote}”</p>
                <div className="testimonial-author">— {testimonial.author}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Testimonials;


