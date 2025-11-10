import { Container, Button } from "react-bootstrap";
import { contactOptions } from "../data/contact";

const ContactCTA = () => (
  <section className="section-padding" id="contact">
    <Container>
      <div className="cta-section" data-animate="scale-in" data-animate-delay="0.1s">
        <h3 data-animate="fade-up" data-animate-delay="0.12s">Ready to build something extraordinary?</h3>
        <p data-animate="fade-up" data-animate-delay="0.18s">Let’s discuss your next web or mobile project. Get a free consultation today.</p>
        <Button className="btn-cta-primary" size="lg" data-animate="fade-up" data-animate-delay="0.24s">
          Get a Free Quote →
        </Button>
        <div className="contact-grid" data-animate="fade-up" data-animate-delay="0.3s">
          {contactOptions.map((option, index) => (
            <a
              key={option.label}
              href={option.href}
              className="contact-item"
              target={option.href?.startsWith("http") ? "_blank" : undefined}
              rel={option.href?.startsWith("http") ? "noreferrer" : undefined}
              data-animate="fade-up"
              data-animate-delay={`${0.32 + index * 0.05}s`}
            >
              <span>{option.icon}</span>
              <span>{option.label}</span>
            </a>
          ))}
        </div>
      </div>
    </Container>
  </section>
);

export default ContactCTA;


