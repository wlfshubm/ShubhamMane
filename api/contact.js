// Vercel serverless function: POST /api/contact
// Receives the portfolio contact form and emails it to your Gmail inbox.
const nodemailer = require('nodemailer');

const TYPES = ['Website design', 'Web development', 'Brand identity', 'Design review', 'Something else'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Best-effort rate limit (per warm serverless instance): 5 messages / 10 min / IP
const hits = new Map();
function limited(ip) {
  const now = Date.now(), win = 10 * 60 * 1000;
  const list = (hits.get(ip) || []).filter(t => now - t < win);
  list.push(now);
  hits.set(ip, list);
  return list.length > 5;
}

const oneLine = s => String(s || '').replace(/[\r\n]+/g, ' ').trim();
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  let body = req.body;
  if (typeof body === 'string') { try { body = JSON.parse(body); } catch (e) { body = {}; } }
  body = body || {};

  // Honeypot: real people never fill this hidden field. Pretend success for bots.
  if (body.website) return res.status(200).json({ ok: true });

  const name = oneLine(body.name).slice(0, 100);
  const email = oneLine(body.email).slice(0, 200);
  const type = TYPES.includes(body.type) ? body.type : 'Something else';
  const message = String(body.message || '').trim().slice(0, 5000);

  if (!name || !message) return res.status(400).json({ error: 'Please fill in your name and message.' });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ error: 'Please enter a valid email address.' });

  const ip = (req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
  if (limited(ip)) return res.status(429).json({ error: 'Too many messages. Please try again later.' });

  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  const to = process.env.CONTACT_TO || user;
  if (!user || !pass) {
    console.error('Contact form: GMAIL_USER / GMAIL_APP_PASSWORD are not set.');
    return res.status(500).json({ error: 'The contact form is not set up yet. Please email me directly.' });
  }

  try {
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user, pass } });
    await transporter.sendMail({
      from: `"Portfolio contact" <${user}>`,
      to,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`, // hit Reply in Gmail to answer the visitor
      subject: `Project enquiry: ${type} — ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nType: ${type}\n\n${message}`,
      html: `<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Type:</b> ${esc(type)}</p>` +
            `<p style="white-space:pre-wrap">${esc(message)}</p>`,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Contact form: send failed:', err && err.message);
    return res.status(502).json({ error: 'Could not send your message. Please email me directly.' });
  }
};
