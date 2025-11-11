import { useMemo, useState } from "react";
import { contactOptions } from "../data/contact";
import { sendLeadSubmission } from "../services/emailClient";
import "./quote.css";

const initialFormState = {
  name: "",
  email: "",
  company: "",
  phone: "",
  service: "Product Strategy & Discovery",
  budget: "Under $5k",
  timeline: "",
  details: "",
};

function QuotePage() {
  const [formValues, setFormValues] = useState(initialFormState);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const contactLinks = useMemo(
    () =>
      contactOptions.map((option) => {
        const shouldOpenNew = option.href?.startsWith("http");
        return {
          ...option,
          target: shouldOpenNew ? "_blank" : undefined,
          rel: shouldOpenNew ? "noreferrer" : undefined,
        };
      }),
    []
  );

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    const projectSummary = [
      `Primary service: ${formValues.service}`,
      `Estimated budget: ${formValues.budget}`,
      formValues.phone ? `Preferred contact number: ${formValues.phone}` : "",
      formValues.details,
    ]
      .filter(Boolean)
      .join("\n\n");

    try {
      await sendLeadSubmission({
        name: formValues.name,
        email: formValues.email,
        company: formValues.company,
        timeline: formValues.timeline,
        projectScope: projectSummary,
        conversation: [
          {
            role: "user",
            text: "Quote request submitted through the Get a Free Quote page.",
          },
        ],
        submittedAt: new Date().toISOString(),
      });
      setStatus("sent");
      setFormValues(initialFormState);
    } catch (err) {
      console.error("Quote form submission failed", err);
      setStatus("error");
      setError(
        err.message ||
          "We couldn’t send that just now. Please double-check your details or try again shortly."
      );
    }
  };

  return (
    <div className="quote-page">
      <main className="quote-card" data-state={status}>
        <header>
          <a href="/" className="quote-card__back-link">
            ← Back to WebyPixels
          </a>
          <h1>Let’s Build Something Exceptional</h1>
          <p>
            Tell us about your project so we can prepare a tailored quote and roadmap.
            One of our producers will reach out within 24 hours.
          </p>
        </header>

        <form className="quote-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="name">Full name</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jane Doe"
                value={formValues.name}
                onChange={handleChange}
                required
                disabled={status === "sending"}
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Work email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@company.com"
                value={formValues.email}
                onChange={handleChange}
                required
                disabled={status === "sending"}
              />
            </div>
            <div className="form-field">
              <label htmlFor="company">Company or brand</label>
              <input
                id="company"
                name="company"
                type="text"
                placeholder="Your brand name"
                value={formValues.company}
                onChange={handleChange}
                disabled={status === "sending"}
              />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                placeholder="+92 310 1234567"
                value={formValues.phone}
                onChange={handleChange}
                disabled={status === "sending"}
              />
            </div>
            <div className="form-field">
              <label htmlFor="service">What do you need help with?</label>
              <select
                id="service"
                name="service"
                value={formValues.service}
                onChange={handleChange}
                disabled={status === "sending"}
              >
                <option value="Product Strategy & Discovery">Product Strategy & Discovery</option>
                <option value="Web Design & Development">Web Design & Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="AI & Automation">AI & Automation</option>
                <option value="Product Maintenance">Product Maintenance</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="budget">Estimated budget</label>
              <select
                id="budget"
                name="budget"
                value={formValues.budget}
                onChange={handleChange}
                disabled={status === "sending"}
              >
                <option value="Under $5k">Under $5k</option>
                <option value="$5k - $10k">$5k - $10k</option>
                <option value="$10k - $25k">$10k - $25k</option>
                <option value="$25k - $50k">$25k - $50k</option>
                <option value="$50k+">$50k+</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="timeline">Ideal launch timeline</label>
              <input
                id="timeline"
                name="timeline"
                type="text"
                placeholder="e.g. 8 weeks, Q1 2026"
                value={formValues.timeline}
                onChange={handleChange}
                disabled={status === "sending"}
              />
            </div>
            <div className="form-field form-field--full">
              <label htmlFor="details">Project goals & context</label>
              <textarea
                id="details"
                name="details"
                placeholder="Share the vision, target users, and any success metrics that matter to you."
                value={formValues.details}
                onChange={handleChange}
                required
                rows={5}
                disabled={status === "sending"}
              />
            </div>
          </div>

          {error && <p className="quote-form__error">{error}</p>}
          {status === "sent" && (
            <p className="quote-form__success">
              Thank you! Our producers are already reviewing your brief and will respond within 24 hours.
            </p>
          )}

          <div className="quote-form__footer">
            <button type="submit" className="btn-gradient" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Submit Request"}
            </button>
            <div className="supporting-text">
              <span>⏱</span>
              Responses within 24 hours. Prefer to talk now?{" "}
              <a href="tel:+923109313131">Call +92 310 9313131</a>
            </div>
          </div>
        </form>

        <section className="contact-links">
          {contactLinks.map((option) => (
            <a key={option.label} href={option.href} target={option.target} rel={option.rel}>
              <span>{option.icon}</span>
              {option.label}
            </a>
          ))}
        </section>
      </main>
    </div>
  );
}

export default QuotePage;


