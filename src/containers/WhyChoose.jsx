import { Container } from "react-bootstrap";
import SectionHeading from "../components/SectionHeading";
import { whyChooseReasons } from "../data/whyChoose";

const WhyChoose = () => {
  return (
    <section className="section-padding section-light" id="why">
      <Container>
        <SectionHeading
          eyebrow="Why Choose WebyPixels"
          title="We don’t just build apps — we build growth engines."
          description="Your roadmap from concept to launch is powered by agile delivery, transparent communication, and relentless optimization."
        />
        <div className="why-choose-list" data-animate="fade-up" data-animate-delay="0.1s">
          {whyChooseReasons.map((reason, index) => (
            <div key={reason} className="why-choose-item" data-animate="fade-up" data-animate-delay={`${0.12 + index * 0.05}s`}>
              ✅ {reason}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default WhyChoose;


