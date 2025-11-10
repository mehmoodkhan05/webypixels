import { useState } from "react";
import { Container, Row, Col, Button, Navbar, Nav } from "react-bootstrap";
import { TypeAnimation } from "react-type-animation";
import headerLogo from "./assets/wp_logo.png";
import "./App.css";

const SectionHeading = ({ eyebrow, title, description, align = "center" }) => {
  const alignmentClass =
    align === "start"
      ? "section-heading section-heading-start"
      : "section-heading";
  return (
    <div className={alignmentClass}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
};

function App() {
  const [showConvert, setShowConvert] = useState(false);

  const stats = [
    { label: "Projects Delivered", value: "50+" },
    { label: "Industries Served", value: "20+" },
    { label: "Client Satisfaction", value: "100%" },
  ];

  const services = [
    {
      icon: "💻",
      title: "Web Development",
      description:
        "Blazing-fast, responsive, and beautiful web experiences powered by React, Tailwind CSS, and Laravel.",
      bullets: [
        "Landing pages & growth funnels",
        "Enterprise portals & dashboards",
        "SEO-first architecture",
      ],
    },
    {
      icon: "📱",
      title: "App Development",
      description:
        "Pixel-perfect native and cross-platform mobile apps that feel seamless on every device.",
      bullets: [
        "Flutter cross-platform builds",
        "Android SDK & Kotlin native apps",
        "Hybrid & PWA experiences",
      ],
    },
    {
      icon: "🧩",
      title: "Custom Software Solutions",
      description:
        "Intelligent, secure software tailored to your workflows—from CRMs to automated platforms.",
      bullets: [
        "Process automation & integrations",
        "Role-based access & security",
        "Scalable API ecosystems",
      ],
    },
    {
      icon: "🛍",
      title: "E-Commerce Development",
      description:
        "Conversion-first e-commerce solutions with frictionless checkout, inventory control, and analytics.",
      bullets: [
        "Headless commerce builds",
        "Payment gateway integrations",
        "Data-driven merchandising",
      ],
    },
    {
      icon: "🔒",
      title: "Maintenance & Support",
      description:
        "Stay future-ready with proactive updates, security patches, and 24/7 monitoring.",
      bullets: [
        "Performance tuning",
        "Security hardening",
        "Dedicated success teams",
      ],
    },
  ];

  const reasons = [
    "Full-cycle development — from strategy to launch",
    "Agile sprints with transparent communication",
    "Scalable, future-ready architecture every time",
    "Dedicated pods for web, app, and backend",
    "24/7 technical support & proactive maintenance",
  ];

  const techStack = [
    {
      category: "Frontend",
      tools: ["React.js", "Next.js", "Tailwind CSS", "Vue.js"],
    },
    {
      category: "Backend",
      tools: ["Laravel", "CodeIgniter", "Node.js", "PHP"],
    },
    { category: "Mobile", tools: ["Flutter", "Kotlin", "Android SDK"] },
    { category: "Database", tools: ["MySQL", "Firebase", "MongoDB"] },
    { category: "Cloud & APIs", tools: ["AWS", "Firebase", "REST", "GraphQL"] },
  ];

  const portfolio = [
    {
      title: "GrowthX SaaS Platform",
      description:
        "Reengineered a SaaS dashboard that now loads 50% faster and scales effortlessly worldwide.",
      stack: ["React", "Laravel", "AWS"],
      outcome: "+50% faster load time",
    },
    {
      title: "Nova Retail Commerce",
      description:
        "Delivered a conversion-optimized headless storefront that doubled monthly revenue in 90 days.",
      stack: ["Next.js", "Tailwind CSS", "Stripe"],
      outcome: "2x sales lift in 90 days",
    },
    {
      title: "PulseFit Mobile Suite",
      description:
        "Launched a cross-platform fitness app that hit 10K downloads within the first quarter.",
      stack: ["Flutter", "Firebase", "Node.js"],
      outcome: "10K downloads in 3 months",
    },
  ];

  const testimonials = [
    {
      quote:
        "WebyPixels turned our idea into a fully functional product in record time. The team is incredibly responsive and creative.",
      author: "Sarah K., Startup Founder",
    },
    {
      quote:
        "They delivered a custom ERP system that’s now the backbone of our operations. Highly recommend!",
      author: "Raj P., Business Owner",
    },
  ];

  const trends = [
    {
      title: "AI Project Estimator",
      description:
        "On-site assistant to scope timelines and budgets in minutes, boosting lead conversions.",
    },
    {
      title: "Live Performance Metrics",
      description:
        "Animated counters highlight achievements: 50+ projects, 20+ industries, 100% satisfaction.",
    },
    {
      title: "Dark / Light Mode Toggle",
      description:
        "Accessible theme switch with micro-interactions that keep users engaged as they explore.",
    },
    {
      title: "Micro-interactions Everywhere",
      description:
        "Hover states, floating CTAs, and scroll-based reveals deliver a tactile, modern UX.",
    },
  ];

  const contactOptions = [
    {
      icon: "📧",
      label: "info@webypixels.com",
      href: "mailto:info@webypixels.com",
    },
    { icon: "📞", label: "+92 310 9313131", href: "tel:+923109313131" },
    {
      icon: "🌐",
      label: "www.webypixels.com",
      href: "https://www.webypixels.com",
    },
    {
      icon: "📍",
      label: "2nd Floor, Swat Market, Swat Mingora, 19130, Pakistan",
      href: "https://www.google.com/maps/place/WebyPixels/@34.771237,72.357914,18z/data=!3m1!4b1!4m6!3m5!1s0x38dc2375412b36b5:0xe180648e57f21e58!8m2!3d34.7712348!4d72.3592015!16s%2Fg%2F11t9mrsr_c?entry=ttu&g_ep=EgoyMDI1MTEwNC4xIKXMDSoASAFQAw%3D%3D",
    },
  ];

  return (
    <div className="page-wrapper">
      <header className="hero-section" id="home">
        <Navbar
          expand="lg"
          variant="dark"
          className="custom-navbar"
          sticky="top"
        >
          <Container>
            <Navbar.Brand href="#home" className="d-flex align-items-center">
              <img
                src={headerLogo}
                alt="WebyPixels logo"
                className="navbar-logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="main-navbar" />
            <Navbar.Collapse id="main-navbar">
              <Nav className="ms-auto align-items-start align-items-lg-center gap-lg-3">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#about">About Us</Nav.Link>
                <Nav.Link href="#services">Services</Nav.Link>
                <Nav.Link href="#contact">Contact Us</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className="pixel-grid" aria-hidden="true" />
        <Container>
          <Row className="align-items-center g-5">
            <Col lg={7} className="hero-content">
              <span className="hero-eyebrow">Full-cycle Web & App Studio</span>
              <h1 className="hero-title">
                <TypeAnimation
                  sequence={[
                    "Crafting Digital ",
                    () => {
                      setShowConvert(true);
                    },
                  ]}
                  speed={50}
                  cursor={false}
                  wrapper="span"
                  repeat={0}
                />
                {showConvert && (
                  <TypeAnimation
                    sequence={[" Experiences That Convert"]}
                    speed={50}
                    cursor={false}
                    wrapper="span"
                    repeat={0}
                    className="hero-title-highlight"
                  />
                )}
              </h1>
              <p className="hero-subtitle">
                WebyPixels is a full-cycle web and app development company
                turning your ideas into scalable, user-focused digital products.
                We blend bold visuals with conversion-first UX to fuel growth.
              </p>
              <div className="hero-buttons mt-4">
                <Button className="btn-cta-primary" size="lg">
                  🚀 Get a Free Quote
                </Button>
                <Button className="btn-cta-secondary" size="lg">
                  💬 Let’s Build Your App
                </Button>
              </div>
              <div className="hero-stats">
                {stats.map((stat) => (
                  <div key={stat.label} className="stat-chip">
                    <strong>{stat.value}</strong>
                    <span>{stat.label}</span>
                  </div>
                ))}
              </div>
            </Col>
            <Col lg={5}>
              <div className="hero-visual">
                <div className="hero-panel">
                  <h5>Every Pixel, Perfectly Placed.</h5>
                  <p>
                    Dedicated pods of strategists, designers, and engineers
                    shipping next-gen digital products with clarity and speed.
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
                    <small>
                      Trend-forward builds with animated gradients &
                      micro-interactions.
                    </small>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      <main>
        <section className="section-padding section-light" id="about">
          <Container>
            <Row className="align-items-center g-5">
              <Col lg={6}>
                <SectionHeading
                  eyebrow="About WebyPixels"
                  title="Blending creativity with code."
                  description="Our expert developers, designers, and strategists build next-gen digital solutions that help businesses grow, engage, and innovate."
                  align="start"
                />
                <p className="about-highlight">
                  We deliver excellence across modern web builds, mobile apps,
                  custom software, and cloud-ready solutions.
                </p>
              </Col>
              <Col lg={6}>
                <ul className="about-list">
                  <li>
                    ⚡ Modern Web Development (React, Tailwind CSS, Laravel,
                    CodeIgniter)
                  </li>
                  <li>📱 Mobile Apps (Flutter, Android SDK, iOS)</li>
                  <li>🧠 Custom Software for businesses & startups</li>
                  <li>☁ Cloud-ready & API-driven solutions</li>
                </ul>
              </Col>
            </Row>
          </Container>
        </section>

        <section className="section-padding" id="services">
          <Container>
            <SectionHeading
              eyebrow="Our Services"
              title="Build experiences that spark conversions."
              description="From landing pages to enterprise ecosystems, we code experiences that turn visitors into loyal customers."
            />
            <Row className="g-4">
              {services.map((service) => (
                <Col key={service.title} lg={4} md={6}>
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

        <section className="section-padding section-light" id="why">
          <Container>
            <SectionHeading
              eyebrow="Why Choose WebyPixels"
              title="We don’t just build apps — we build growth engines."
              description="Your roadmap from concept to launch is powered by agile delivery, transparent communication, and relentless optimization."
            />
            <div className="why-choose-list">
              {reasons.map((reason) => (
                <div key={reason} className="why-choose-item">
                  ✅ {reason}
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="section-padding" id="tech">
          <Container>
            <SectionHeading
              eyebrow="Tech Stack"
              title="Future-ready architecture from frontend to cloud."
              description="We partner with leading technologies to deliver reliable, scalable, and delightfully fast digital products."
            />
            <Row className="g-4">
              {techStack.map((group) => (
                <Col key={group.category} lg={4} md={6}>
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

        <section className="section-padding section-light" id="portfolio">
          <Container>
            <SectionHeading
              eyebrow="Portfolio / Case Studies"
              title="See how we help startups scale and enterprises transform."
              description="Selected wins that highlight the velocity, craftsmanship, and measurable impact of WebyPixels."
            />
            <Row className="g-4">
              {portfolio.map((item) => (
                <Col key={item.title} lg={4} md={6}>
                  <div className="portfolio-card">
                    <div className="fs-5 fw-semibold">{item.title}</div>
                    <p className="mt-3">{item.description}</p>
                    <div className="portfolio-meta">
                      {item.stack.map((tech) => (
                        <span key={tech}>{tech}</span>
                      ))}
                    </div>
                    <strong>{item.outcome}</strong>
                  </div>
                </Col>
              ))}
            </Row>
            <div className="text-center mt-4">
              <Button
                variant="outline-light"
                className="rounded-pill px-4 py-2"
              >
                View All Projects →
              </Button>
            </div>
          </Container>
        </section>

        <section className="section-padding" id="testimonials">
          <Container>
            <SectionHeading
              eyebrow="Testimonials"
              title="What our partners are saying."
              description="Real words from the founders and teams scaling with WebyPixels."
            />
            <Row className="g-4">
              {testimonials.map((testimonial) => (
                <Col key={testimonial.author} lg={6}>
                  <div className="testimonial-card">
                    <p>“{testimonial.quote}”</p>
                    <div className="testimonial-author">
                      — {testimonial.author}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className="section-padding section-light" id="trends">
          <Container>
            <SectionHeading
              eyebrow="2025 Experience Upgrades"
              title="Dynamic additions that keep your brand ahead."
              description="Stay trend-forward with immersive interactions and intelligent automation baked into your digital experience."
            />
            <Row className="g-4">
              {trends.map((trend) => (
                <Col key={trend.title} lg={3} md={6}>
                  <div className="trend-card">
                    <h6>{trend.title}</h6>
                    <p>{trend.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>

        <section className="section-padding" id="contact">
          <Container>
            <div className="cta-section">
              <h3>Ready to build something extraordinary?</h3>
              <p>
                Let’s discuss your next web or mobile project. Get a free
                consultation today.
              </p>
              <Button className="btn-cta-primary" size="lg">
                Get a Free Quote →
              </Button>
              <div className="contact-grid">
                {contactOptions.map((option) => (
                  <a
                    key={option.label}
                    href={option.href}
                    className="contact-item"
                    target={
                      option.href?.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      option.href?.startsWith("http") ? "noreferrer" : undefined
                    }
                  >
                    <span>{option.icon}</span>
                    <span>{option.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </main>

      <footer className="footer">
        <Container>
          <div>
            © {new Date().getFullYear()} WebyPixels. Building growth-ready
            digital products worldwide.
          </div>
        </Container>
      </footer>
    </div>
  );
}

export default App;
