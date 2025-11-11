const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_MODEL =
  import.meta.env.VITE_GEMINI_MODEL?.trim() || "gemini-2.0-flash";

const DEFAULT_GENERATION_CONFIG = {
  temperature: 0.85,
  topP: 0.9,
  topK: 40,
  maxOutputTokens: 256,
};

const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

function mapHistoryToGeminiFormat(history) {
  return history.map((entry) => ({
    role: entry.role,
    parts: entry.parts,
  }));
}

export async function generateChatResponse({ history, systemInstruction }) {
  if (!GEMINI_API_KEY) {
    throw new Error(
      "Gemini API key missing. Set VITE_GEMINI_API_KEY in your environment."
    );
  }

  const payload = {
    contents: mapHistoryToGeminiFormat(history),
    generationConfig: DEFAULT_GENERATION_CONFIG,
    systemInstruction: {
      role: "system",
      parts: [{ text: systemInstruction }],
    },
  };

  const response = await fetch(`${API_ENDPOINT}?key=${GEMINI_API_KEY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Gemini API error (${response.status}): ${errorBody.slice(0, 160)}`
    );
  }

  const data = await response.json();
  const text =
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part.text)
      .filter(Boolean)
      .join("\n")
      .trim() ?? "";

  if (!text) {
    throw new Error("Gemini did not return a response.");
  }

  return text;
}


