import { Container, Row, Col } from "react-bootstrap";
import SectionHeading from "../components/SectionHeading";
import { servicesData } from "../data/services";

const Services = () => {
  return (
    <section className="section-padding" id="services">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="Build experiences that spark conversions."
          description="From landing pages to enterprise ecosystems, we code experiences that turn visitors into loyal customers."
        />
        <Row className="g-4" data-animate="fade-up" data-animate-delay="0.1s">
          {servicesData.map((service, index) => (
            <Col key={service.title} lg={4} md={6} data-animate="fade-up" data-animate-delay={`${0.15 + index * 0.05}s`}>
              <div className="service-card">
                <span className="fs-2">{service.icon}</span>
                <h5 className="mt-3">{service.title}</h5>
                <p>{service.description}</p>
                <ul className="service-bullets">
                  {service.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default Services;


