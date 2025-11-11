import { Navbar as BootstrapNavbar, Nav, Container } from "react-bootstrap";
import headerLogo from "../assets/wp_logo.png";

const Navbar = () => (
  <BootstrapNavbar
    expand="lg"
    variant="dark"
    className="custom-navbar"
    sticky="top"
    data-animate="fade-down"
    data-animate-delay="0.05s"
  >
    <Container>
      <BootstrapNavbar.Brand href="#home" className="d-flex align-items-center">
        <img src={headerLogo} alt="WebyPixels logo" className="navbar-logo" />
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="main-navbar" />
      <BootstrapNavbar.Collapse id="main-navbar">
        <Nav className="ms-auto align-items-start align-items-lg-center gap-lg-3">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/#about">About Us</Nav.Link>
          <Nav.Link href="/#services">Services</Nav.Link>
          <Nav.Link href="/#contact">Contact Us</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </Container>
  </BootstrapNavbar>
);

export default Navbar;

