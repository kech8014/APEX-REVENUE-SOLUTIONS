import crypto from "node:crypto";

// Signed slide-puzzle challenges. The token carries the target position and
// an expiry, signed so the browser cannot forge a solved challenge.
const SECRET = process.env.CAPTCHA_SECRET || "apex-revenue-solutions-captcha";
const TTL_MS = 5 * 60 * 1000;
export const PUZZLE = { width: 300, height: 120, piece: 44 };
const TOLERANCE = 6;

const sign = (data) => crypto.createHmac("sha256", SECRET).update(data).digest("base64url");

export function createChallenge() {
  const x = 110 + Math.floor(Math.random() * (PUZZLE.width - PUZZLE.piece - 120));
  const y = 14 + Math.floor(Math.random() * (PUZZLE.height - PUZZLE.piece - 28));
  const body = Buffer.from(JSON.stringify({ x, y, exp: Date.now() + TTL_MS })).toString("base64url");
  return { token: `${body}.${sign(body)}`, x, y };
}

// `answer` is { token, x, moves, ms } as reported by the puzzle widget.
export function verifyChallenge(answer) {
  if (!answer || typeof answer.token !== "string") return false;
  const [body, sig] = answer.token.split(".");
  if (!body || !sig) return false;
  const expected = sign(body);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  let data;
  try {
    data = JSON.parse(Buffer.from(body, "base64url").toString());
  } catch {
    return false;
  }
  if (Date.now() > data.exp) return false;
  // A real drag lands near the gap, takes a moment and produces several moves.
  return Math.abs(Number(answer.x) - data.x) <= TOLERANCE && Number(answer.moves) >= 4 && Number(answer.ms) >= 250;
}
