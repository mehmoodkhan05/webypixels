import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export async function sendLeadSubmission(payload) {
  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY
  ) {
    throw new Error(
      "Missing EmailJS credentials. Set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY."
    );
  }

  const templateParams = {
    lead_name: payload.name,
    lead_email: payload.email,
    lead_company: payload.company || "Not provided",
    lead_timeline: payload.timeline || "Not provided",
    project_scope: payload.projectScope,
    submitted_at: payload.submittedAt,
    conversation:
      payload.conversation
        ?.map(
          (entry) => `${entry.role.toUpperCase()}: ${entry.text || ""}`.trim()
        )
        .join("\n") || "No additional conversation captured.",
  };

  return emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    templateParams,
    {
      publicKey: EMAILJS_PUBLIC_KEY,
    }
  );
}

