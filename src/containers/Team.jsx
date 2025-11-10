import { Container, Row, Col, Card } from "react-bootstrap";
import SectionHeading from "../components/SectionHeading";
import { teamMembers } from "../data/team";

const Team = () => (
  <section className="section-padding" id="team">
    <Container>
      <SectionHeading
        eyebrow="Core Team"
        title="Meet Our Leadership & Specialists"
        description="The talent behind WebyPixels’ strategy, design, and engineering excellence."
      />

      <Row className="g-4 justify-content-center" data-animate="fade-up" data-animate-delay="0.1s">
        {teamMembers.map((member, index) => (
          <Col sm={6} lg={4} key={member.name} data-animate="fade-up" data-animate-delay={`${0.14 + index * 0.05}s`}>
            <Card className="team-card">
              <div className="team-avatar">
                <img src={member.image} alt={member.name} loading="lazy" />
              </div>
              <Card.Body>
                <Card.Title className="team-name">{member.name}</Card.Title>
                <Card.Text className="team-role">{member.designation}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default Team;


