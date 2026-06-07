import { STATIONS, ALL_MODULES, MODULE_DESCRIPTIONS, stationIdForModule } from "@/lib/operations";

// Conversational F&B co-pilot. Gemini 2.5 Flash answers in LabGenie's voice
// (always a `reply`) and, when the user asks to actually perform an operation,
// also returns the matching `module` (constrained to a real label or "NONE")
// so the UI can fire the route animation. The API key stays server-side.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";

// Simple in-memory LRU-ish cache so repeated identical questions don't spend
// quota. Per server instance; fine for low traffic / single-instance deploys.
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours
const CACHE_MAX = 500;
const _cache = new Map();

function cacheGet(key) {
  const e = _cache.get(key);
  if (!e) return null;
  if (Date.now() > e.exp) {
    _cache.delete(key);
    return null;
  }
  // refresh recency
  _cache.delete(key);
  _cache.set(key, e);
  return e.val;
}

function cacheSet(key, val) {
  if (_cache.size >= CACHE_MAX) _cache.delete(_cache.keys().next().value);
  _cache.set(key, { val, exp: Date.now() + CACHE_TTL });
}

export async function POST(req) {
  let query = "";
  try {
    const body = await req.json();
    query = (body?.query ?? "").toString().slice(0, 400).trim();
  } catch {
    /* ignore malformed body */
  }
  if (!query) return Response.json({ reply: null });

  const cacheKey = query.toLowerCase();
  const cached = cacheGet(cacheKey);
  if (cached) return Response.json({ ...cached, cached: true });

  const key = process.env.GEMINI_API_KEY;
  if (!key) return Response.json({ reply: null, error: "unconfigured" });

  const catalog = STATIONS.map((s) => {
    const mods = s.modules.map((m) => `      • ${m} — ${MODULE_DESCRIPTIONS[m] ?? ""}`).join("\n");
    return `  ${s.short} [${GROUP_NAME(s.group)}] (${s.status}):\n${mods}`;
  }).join("\n");

  const prompt =
    `You are LabGenie, a witty, upbeat AI operations co-pilot for food & beverage (F&B) manufacturers ` +
    `(flavors, spices, oleoresins, specialty ingredients). You know this plant's stations and modules inside out:\n\n` +
    `${catalog}\n\n` +
    `Reply to the user with two fields:\n` +
    `- "reply": your answer in LabGenie's voice — warm, concise (1–2 sentences, max ~40 words), F&B-savvy. ` +
    `Shown in a small chat bubble, so keep it tight and use no markdown.\n` +
    `- "module": if the user is asking to DO an operation that matches one module, set it to that exact module label; ` +
    `otherwise "NONE".\n\n` +
    `Guidelines:\n` +
    `- If they only ask WHAT a station or module does, or HOW to use you (not asking to run it), explain it warmly ` +
    `from the catalogue and set module = "NONE".\n` +
    `- If they ask to perform / run / start an operation (including phrasings like "can you ..."), pick the matching ` +
    `module and make "reply" a short confident "on it" line.\n` +
    `- If they're off-topic (jokes, weather, chit-chat): stay in character. For a joke, tell a short ` +
    `food/manufacturing-themed joke. For anything else off-topic, answer in one playful line and steer back to ` +
    `operations (e.g. "let's keep our eyes on the line"). Never be rude. Set module = "NONE".\n\n` +
    `User: "${query}"`;

  const payload = {
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.6,
      thinkingConfig: { thinkingBudget: 0 },
      responseMimeType: "application/json",
      responseSchema: {
        type: "OBJECT",
        properties: {
          reply: { type: "STRING" },
          module: { type: "STRING", enum: [...ALL_MODULES, "NONE"] },
        },
        required: ["reply", "module"],
      },
    },
  };

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${key}`;

  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 9000);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: ctrl.signal,
    });
    clearTimeout(timer);

    if (!res.ok) return Response.json({ reply: null, error: "upstream" });

    const data = await res.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    let reply = null;
    let module = null;
    try {
      const parsed = JSON.parse(text);
      reply = parsed?.reply ?? null;
      module = parsed?.module ?? null;
    } catch {
      /* model returned non-JSON */
    }

    let result = { reply };
    if (module && module !== "NONE") {
      const stationId = stationIdForModule(module);
      if (stationId) result = { stationId, module, reply };
    }
    if (result.reply || result.stationId) cacheSet(cacheKey, result);
    return Response.json(result);
  } catch {
    return Response.json({ reply: null, error: "exception" });
  }
}

function GROUP_NAME(g) {
  return g === "gtm" ? "Go-to-Market" : g === "factory" ? "Factory" : "Innovation";
}
