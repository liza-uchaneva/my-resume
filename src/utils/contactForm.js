// Validation and sending for the contact form (Web3Forms: https://web3forms.com).

export const LIMITS = { name: 100, email: 254, message: 5000 };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Returns { field: "error text" } for every invalid field; empty object when all is well.
export function validate({ name = "", email = "", message = "" }) {
  const errors = {};
  const n = name.trim();
  const e = email.trim();
  const m = message.trim();

  if (!n) errors.name = "Please tell me your name.";
  else if (n.length > LIMITS.name) errors.name = `Name is too long (max ${LIMITS.name}).`;

  if (!e) errors.email = "I need an email to write back.";
  else if (e.length > LIMITS.email || !EMAIL_RE.test(e)) errors.email = "That email doesn’t look right.";

  if (!m) errors.message = "The message is empty.";
  else if (m.length < 10) errors.message = "A little more, please (at least 10 characters).";
  else if (m.length > LIMITS.message) errors.message = `Message is too long (max ${LIMITS.message}).`;

  return errors;
}

// Posts the form to Web3Forms. Resolves on success, throws an Error with a
// readable message otherwise. `botcheck` is the honeypot: Web3Forms rejects
// any submission where it is filled in.
export async function send({ name, email, message, botcheck = false }, accessKey, fetchImpl = fetch) {
  if (!accessKey) throw new Error("The form isn’t set up yet — please email me directly.");

  let res;
  try {
    res = await fetchImpl("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `New message from ${name.trim()} (portfolio)`,
        from_name: "Portfolio contact form",
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
        botcheck,
      }),
    });
  } catch {
    throw new Error("Couldn’t reach the server. Check your connection and try again.");
  }

  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data.success) {
    throw new Error("Something went wrong sending your message. Please try again or email me directly.");
  }
}
