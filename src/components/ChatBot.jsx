import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./ChatBot.css";
import { generateChatResponse } from "../services/aiClient";
import { sendLeadSubmission } from "../services/emailClient";

const BOT_NAME = "WebyPixels Assistant";

const greetingMessages = [
  "Hi there! 👋 I'm WebyPixels Assistant. How can I support your vision today?",
  "Welcome! 👋 I'm WebyPixels Assistant. Ready to spot the next growth win together?",
  "Hello! 👋 I'm WebyPixels Assistant. I'm here to co-create standout digital experiences with you.",
  "Hey! 👋 WebyPixels is in your corner—what bold idea are we building next?",
  "Great to see you! 👋 WebyPixels is all about shipping growth-ready experiences. What are we tackling today?",
];

const quickReplies = [
  "Show me what you can build.",
  "How fast can we go live?",
  "Pitch me why you're different.",
  "I'm ready to start.",
];

const onsiteGreetingVariants = [
  "Hey there! 👋 WebyPixels can strategize, design, and launch high-performing digital products end-to-end. Want to riff on your roadmap or see how we've boosted other teams?",
  "Hi! 👋 From product strategy to launch-day polish, WebyPixels handles the full build. Curious which playbook unlocks your growth?",
  "Hello! 👋 Need a partner to map, design, and ship your next experience? WebyPixels has you covered—want a quick rundown of our wins?",
  "Welcome back! 👋 We combine strategy, UX, and engineering so your product lands fast. Want to explore timelines or success stories?",
];

const greetingKeywords = [
  "hi",
  "hello",
  "hey",
  "heya",
  "hiya",
  "hola",
  "good morning",
  "good afternoon",
  "good evening",
];

const leadTriggerKeywords = [
  "ready to start",
  "let's start",
  "let us start",
  "move forward",
  "move ahead",
  "let's go",
  "sign me up",
  "we're in",
  "i'm in",
  "engage you",
  "hire you",
  "work with you",
  "start a project",
  "start my project",
  "start our project",
  "kick off",
  "let's kick off",
  "begin engagement",
  "i want your service",
  "we want your service",
  "book you",
  "let's collaborate",
  "green light you",
];

const leadCapturePrompts = [
  "Love that you're ready to roll! Drop your details so the right build squad can reach out within one business day.",
  "Amazing—let's sync you with our producers. Share a few quick details and we'll follow up with a tailored plan.",
  "Perfect! Give us your contact info and launch goals so we can line up the exact team you need.",
];

const leadSuccessMessages = [
  "Amazing. I've shared this with our producers—expect a strategy email shortly. Feel free to keep the convo going here!",
  "Perfect—our producers now have everything they need. Watch your inbox for next steps from WebyPixels.",
  "Got it! Our team will be in touch shortly with a kickoff roadmap. Buzz me here anytime in the meantime.",
];

const toneVariants = [
  "For this reply, feature a different proof point or call-to-action than you used previously.",
  "Experiment with a fresh opening hook before presenting the value props, and finish with an alternative CTA.",
  "Shift the framing slightly (e.g., focus on speed, polish, or measurable ROI) so the language doesn't repeat.",
  "Use a new CTA phrasing and rotate through service highlights so repeated questions feel unique.",
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getNextFromCycle(ref, list) {
  if (!ref.current || ref.current.length === 0) {
    ref.current = shuffle(list);
  }
  return ref.current.pop();
}

const persuasionPrimer = [
  "Highlight measurable outcomes like revenue lift, retention gains, or launch velocity when relevant.",
  "Acknowledge the user's goals, mirror their vocabulary, and offer next steps that feel effortless.",
  "Invite a conversation with a human specialist whenever the user signals readiness or shares contact details.",
].join(" ");

const systemInstruction = [
  "You are WebyPixels Assistant, a persuasive yet trustworthy customer-success copilot for WebyPixels.",
  "Go beyond answering questions—identify the user's goals, surface tailored success stories or proof points, and outline a partnership path.",
  "Keep replies punchy (max 3 sentences) with crisp, offer-focused language.",
  "Always close with a compelling call-to-action that suggests the next step (share a brief, book a strategy call, etc.).",
  "Vary your language and phrasing so repeat conversations feel fresh while staying on-message.",
  persuasionPrimer,
].join(" ");

const createMessageId = () =>
  globalThis.crypto?.randomUUID?.() ??
  `msg-${Date.now()}-${Math.random().toString(16).slice(2, 10)}`;

function ChatBubble({ sender, text }) {
  return (
    <div className={`chat-bubble ${sender}`}>
      <div className="chat-bubble__avatar">
        {sender === "bot" ? "🤖" : "🧑"}
      </div>
      <div className="chat-bubble__content">
        <span className="chat-bubble__sender">
          {sender === "bot" ? BOT_NAME : "You"}
        </span>
        <p>{text}</p>
      </div>
    </div>
  );
}

function ChatInput({ onSend, isThinking }) {
  const [value, setValue] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) return;
    await onSend(trimmed);
    setValue("");
  }

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type your message..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
        disabled={isThinking}
      />
      <button type="submit" disabled={isThinking}>
        {isThinking ? "..." : "Send"}
      </button>
    </form>
  );
}

function QuickReplyChips({ options, onSelect, disabled }) {
  return (
    <div className="quick-replies">
      {options.map((label) => (
        <button
          type="button"
          key={label}
          onClick={() => onSelect(label)}
          className="quick-reply"
          disabled={disabled}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function LeadCaptureCard({ status, error, onSubmit, onCancel }) {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    company: "",
    projectScope: "",
    timeline: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formValues);
  };

  const isDisabled = status === "sending" || status === "sent";

  return (
    <form className="lead-card" onSubmit={handleSubmit}>
      <div className="lead-card__grid">
        <input
          type="text"
          name="name"
          placeholder="Your name"
          value={formValues.name}
          onChange={handleChange}
          required
          disabled={isDisabled}
        />
        <input
          type="email"
          name="email"
          placeholder="Work email"
          value={formValues.email}
          onChange={handleChange}
          required
          disabled={isDisabled}
        />
        <input
          type="text"
          name="company"
          placeholder="Company / brand"
          value={formValues.company}
          onChange={handleChange}
          disabled={isDisabled}
        />
        <input
          type="text"
          name="timeline"
          placeholder="Ideal launch timeline"
          value={formValues.timeline}
          onChange={handleChange}
          disabled={isDisabled}
        />
      </div>
      <textarea
        name="projectScope"
        placeholder="Tell us about your project goals or success metrics"
        value={formValues.projectScope}
        onChange={handleChange}
        rows={3}
        required
        disabled={isDisabled}
      />
      {error && <p className="lead-card__error">{error}</p>}
      <div className="lead-card__actions">
        <button
          type="button"
          className="lead-card__secondary"
          onClick={onCancel}
          disabled={status === "sending"}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="lead-card__primary"
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : "Share project details"}
        </button>
      </div>
      {status === "sent" && (
        <p className="lead-card__success">
          Got it! Our producers will reply ASAP with next steps.
        </p>
      )}
    </form>
  );
}

function ChatBot() {
  const greetingCycleRef = useRef([]);
  const onsiteGreetingCycleRef = useRef([]);
  const toneCycleRef = useRef([]);
  const leadPromptCycleRef = useRef([]);
  const leadSuccessCycleRef = useRef([]);

  const historyRef = useRef([]);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [quickReplyOptions, setQuickReplyOptions] = useState([]);
  const [isThinking, setIsThinking] = useState(false);
  const [errorNotice, setErrorNotice] = useState("");
  const [isCollectingLead, setIsCollectingLead] = useState(false);
  const [leadStatus, setLeadStatus] = useState("idle");
  const [leadError, setLeadError] = useState("");
  const [pendingLead, setPendingLead] = useState(false);
  const viewportRef = useRef(null);

  const initializeConversation = useCallback(() => {
    const greeting = getNextFromCycle(greetingCycleRef, greetingMessages);
    historyRef.current = [
      { role: "assistant", parts: [{ text: greeting }] },
    ];
    setMessages([
      {
        id: createMessageId(),
        sender: "bot",
        text: greeting,
      },
    ]);
    setQuickReplyOptions(shuffle(quickReplies));
    setIsCollectingLead(false);
    setLeadStatus("idle");
    setLeadError("");
    setErrorNotice("");
    setPendingLead(false);
  }, []);

  useEffect(() => {
    initializeConversation();
  }, [initializeConversation]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const appendMessage = useCallback(
    (sender, text, { persist = true } = {}) => {
    setMessages((prev) => [...prev, { id: createMessageId(), sender, text }]);
    if (!persist) return;
    const role = sender === "bot" ? "assistant" : "user";
    historyRef.current.push({ role, parts: [{ text }] });
    },
    []
  );

  const startLeadCapture = useCallback(() => {
    if (isCollectingLead) return;
    setIsCollectingLead(true);
    setLeadStatus("idle");
    setLeadError("");
    const prompt = getNextFromCycle(leadPromptCycleRef, leadCapturePrompts);
    appendMessage("bot", prompt, { persist: false });
  }, [appendMessage, isCollectingLead]);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    const handleOpenLead = () => {
      setIsOpen(true);
      setPendingLead(true);
    };

    window.addEventListener("chatbot:open", handleOpen);
    window.addEventListener("chatbot:openLead", handleOpenLead);

    return () => {
      window.removeEventListener("chatbot:open", handleOpen);
      window.removeEventListener("chatbot:openLead", handleOpenLead);
    };
  }, []);

  useEffect(() => {
    if (pendingLead && isOpen && !isCollectingLead) {
      startLeadCapture();
      setPendingLead(false);
    }
  }, [pendingLead, isOpen, isCollectingLead, startLeadCapture]);

  const handleLeadSubmit = async (payload) => {
    setLeadStatus("sending");
    setLeadError("");
    try {
      await sendLeadSubmission({
        ...payload,
        conversation: historyRef.current.map((entry) => ({
          role: entry.role,
          text: entry.parts?.map((part) => part.text).join("\n"),
        })),
        submittedAt: new Date().toISOString(),
      });
      setLeadStatus("sent");
      const successMessage = getNextFromCycle(
        leadSuccessCycleRef,
        leadSuccessMessages
      );
      appendMessage("bot", successMessage, { persist: false });
      setTimeout(() => {
        setIsCollectingLead(false);
        setLeadStatus("idle");
      }, 2000);
    } catch (error) {
      console.error("Lead capture", error);
      setLeadStatus("error");
      setLeadError(
        error.message ??
          "We couldn't send that right now. Mind trying again in a minute?"
      );
    }
  };

  const handleSend = async (userMessage) => {
    appendMessage("user", userMessage);
    setErrorNotice("");
    setLeadError("");
    setIsThinking(true);

    const normalized = userMessage.trim().toLowerCase();
    const isGreeting =
      normalized.length <= 18 &&
      greetingKeywords.some((word) => normalized === word);
    const wantsLeadCapture =
      leadTriggerKeywords.some((keyword) => normalized.includes(keyword)) ||
      normalized === "i'm ready to start." ||
      normalized === "i'm ready to start";

    if (isGreeting) {
      const greetingReply = getNextFromCycle(
        onsiteGreetingCycleRef,
        onsiteGreetingVariants
      );
      appendMessage("bot", greetingReply);
      setIsThinking(false);
      return;
    }

    if (wantsLeadCapture) {
      startLeadCapture();
      setIsThinking(false);
      return;
    }

    try {
      const toneDirective = getNextFromCycle(toneCycleRef, toneVariants);
      const assistantReply = await generateChatResponse({
        history: historyRef.current,
        systemInstruction: `${systemInstruction}\n${toneDirective}`,
      });
      appendMessage("bot", assistantReply);
    } catch (error) {
      console.error("ChatBot", error);
      const message =
        error.message ??
        "Something went wrong while reaching our AI assistant.";
      appendMessage(
        "bot",
        `${message} Please try again in a moment or leave your email for a specialist.`,
        { persist: false }
      );
      setErrorNotice(message);
    } finally {
      setIsThinking(false);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    requestAnimationFrame(() => {
      viewportRef.current?.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages, isOpen]);

  const previewText = useMemo(() => {
    const lastMessage = messages[messages.length - 1];
    return lastMessage?.text?.slice(0, 40) ?? "Need project guidance?";
  }, [messages]);

  const chipOptions =
    quickReplyOptions.length > 0 ? quickReplyOptions : quickReplies;

  return (
    <div className={`chatbot ${isOpen ? "chatbot--open" : ""}`}>
      <button type="button" className="chatbot-toggle" onClick={toggleChat}>
        <span className="chatbot-toggle__icon">💬</span>
        <div className="chatbot-toggle__copy">
          <strong>{isOpen ? "Close chat" : "Chat with us"}</strong>
          {!isOpen && <span>{previewText}...</span>}
        </div>
      </button>

      {isOpen && (
        <div className="chatbot-window">
          <header className="chatbot-window__header">
            <div>
              <strong>{BOT_NAME}</strong>
              <p>Customer success at WebyPixels</p>
            </div>
            <span className="chatbot-window__status">
              {isThinking ? "typing..." : "online"}
            </span>
          </header>

          <div className="chatbot-window__body" ref={viewportRef}>
            {messages.map(({ id, sender, text }) => (
              <ChatBubble key={id} sender={sender} text={text} />
            ))}
            {isThinking && (
              <div className="chat-typing">
                <span />
                <span />
                <span />
              </div>
            )}
            {errorNotice && (
              <p className="chatbot-error">
                Having trouble? Drop us a line at{" "}
                <a href="mailto:hello@webypixels.com">hello@webypixels.com</a>.
              </p>
            )}
          </div>

          {isCollectingLead && (
            <LeadCaptureCard
              status={leadStatus}
              error={leadError}
              onSubmit={handleLeadSubmit}
              onCancel={() => {
                setIsCollectingLead(false);
                setLeadStatus("idle");
                setLeadError("");
              }}
            />
          )}
          <QuickReplyChips
            options={chipOptions}
            onSelect={handleSend}
            disabled={isThinking}
          />
          <ChatInput onSend={handleSend} isThinking={isThinking} />
        </div>
      )}
    </div>
  );
}

export default ChatBot;

