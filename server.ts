import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { randomBytes, scryptSync, timingSafeEqual } from "crypto";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

type ServerAccount = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: "admin" | "student";
};

const serverAccounts = new Map<string, ServerAccount>();

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [salt, expectedHex] = storedHash.split(":");
  if (!salt || !expectedHex) return false;
  const expected = Buffer.from(expectedHex, "hex");
  const actual = scryptSync(password, salt, 64);
  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

function seedAdminAccount() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || serverAccounts.has("admin")) return;
  serverAccounts.set("admin", {
    id: "server-admin",
    name: "Koderarena Admin",
    email: "admin",
    passwordHash: hashPassword(adminPassword),
    role: "admin"
  });
}

seedAdminAccount();

// Lazy-load Gemini AI client
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: Date.now() });
});

app.post("/api/auth/register", (req, res) => {
  const { name, email, password } = req.body as { name?: string; email?: string; password?: string };
  const normalizedEmail = email?.trim().toLowerCase();
  if (!name?.trim() || !normalizedEmail || !password || password.length < 8) {
    return res.status(400).json({ error: "Name, email, and an 8-character password are required." });
  }
  if (serverAccounts.has(normalizedEmail)) {
    return res.status(409).json({ error: "An account with that email already exists." });
  }
  const account: ServerAccount = {
    id: `server-${Date.now()}`,
    name: name.trim(),
    email: normalizedEmail,
    passwordHash: hashPassword(password),
    role: "student"
  };
  serverAccounts.set(normalizedEmail, account);
  return res.status(201).json({ id: account.id, name: account.name, email: account.email, role: account.role });
});

app.post("/api/auth/login", (req, res) => {
  seedAdminAccount();
  const { email, password } = req.body as { email?: string; password?: string };
  const account = email ? serverAccounts.get(email.trim().toLowerCase()) : undefined;
  if (!account || !password || !verifyPassword(password, account.passwordHash)) {
    return res.status(401).json({ error: "Invalid email or password." });
  }
  return res.json({ id: account.id, name: account.name, email: account.email, role: account.role });
});

// AI Coach endpoint
app.post("/api/ai/coach", async (req, res) => {
  try {
    const { question, currentCode, exerciseTitle, exerciseDescription, level } = req.body;

    const ai = getAIClient();
    if (!ai) {
      // Helpful fallback response when API key is not configured
      return res.json({
        response: `🤖 **Python-Coachens snabbtips:**\n\nFör "${exerciseTitle || 'övningen'}":\n- Kontrollera noga att alla strängar har matchande citattecken (\`"..."\` eller \`'...' \`).\n- Tänk på indentering i Python (använd 4 mellanslag för kodblock inuti \`if\`, \`for\`, \`def\`).\n- Testa att skriva ut värden med \`print(...)\` för att se vad som händer steg för steg!\n\n*(Tips: För full AI-interaktivitet, se till att GEMINI_API_KEY är aktiv).*`
      });
    }

    const systemPrompt = `Du är "PyMaster Coach", en superpedagogisk, inspirerande och vänlig svensk Python-lärare och mentor.
Ditt mål är att hjälpa användaren förstå och lära sig Python från 0 till proffsnivå på ett roligt, smidigt och engagerande sätt.
Ge korta, tydliga och lättförståeliga förklaringar på svenska med tydlig formatering i Markdown och små kodexempel.
Om användaren har fastnat på en övning, ge gärna en ledtråd eller förklara konceptet först istället för att bara ge bort hela koden direkt, om de inte uttryckligen ber om full lösning.`;

    const userPrompt = `
Kontext:
- Nivå: ${level || 'Nivå 1: Grunderna'}
- Övning: ${exerciseTitle || 'Python Kodning'}
- Övningsbeskrivning: ${exerciseDescription || 'Standard'}
- Användarens nuvarande kod:
\`\`\`python
${currentCode || '# Ingen kod skriven än'}
\`\`\`

Användarens fråga/meddelande:
${question}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [
        { role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }
      ],
    });

    const text = response.text || "Kunde inte generera svar från AI-coachen just nu.";
    res.json({ response: text });
  } catch (error: any) {
    console.error("Gemini AI coach error:", error);
    res.status(500).json({
      error: "Kunde inte kontakta AI-coachen.",
      fallback: "Tips: Kontrollera din syntax och indentering (4 mellanslag)."
    });
  }
});

// AI Debugger endpoint
app.post("/api/ai/debug", async (req, res) => {
  try {
    const { code, errorMessage, exerciseTitle } = req.body;
    const ai = getAIClient();

    if (!ai) {
      return res.json({
        analysis: `🔍 **Felsökningshjälp:**\n\nNär du ser felet: \`${errorMessage || 'Felaktigt resultat'}\`\n1. Kontrollera att alla variabler är definierade innan de används.\n2. Se till att alla kolon (\`:\`) finns efter \`if\`, \`for\`, \`while\`, \`def\`, \`class\`.\n3. Se till att indrag/mellanslag är konsekventa.`
      });
    }

    const prompt = `Du är en expert på Python-felsökning för nybörjare och avancerade elever.
Analysera följande Python-kod och felmeddelande/resultat.
Förklara på ett vänligt och pedagogiskt sätt på svenska:
1. Vad felet beror på på ett enkelt sätt.
2. Hur användaren åtgärdar det.
3. Ett litet illustrativt exempel.

Övning: ${exerciseTitle || 'Python övning'}
Kod:
\`\`\`python
${code}
\`\`\`

Felmeddelande / problem:
${errorMessage}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }]
    });

    res.json({ analysis: response.text || "Ingen analys kunde skapas." });
  } catch (error: any) {
    console.error("AI Debug error:", error);
    res.status(500).json({ error: "Kunde inte analysera felet." });
  }
});

// Start Server & Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();
