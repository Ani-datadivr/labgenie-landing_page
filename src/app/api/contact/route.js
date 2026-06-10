// Contact / request-demo handler. Reads the submitted lead, validates the
// essentials, and posts a rich "New Lead" message to Slack via an incoming
// webhook. The webhook URL stays server-side (process.env.SLACK_WEBHOOK_URL)
// and is never sent to the client.
//
// Hardening: a honeypot field for bots, length caps (Slack section blocks
// reject text over 3000 chars), mrkdwn escaping of user input, and the lead is
// logged server-side BEFORE the Slack call so a webhook hiccup never silently
// loses it (recoverable from function logs).

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Escape the three characters Slack mrkdwn treats as control syntax.
const mrkdwn = (v) => v.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Safe string accessor: guard undefined/null -> "", cap length.
  const s = (v, max = 200) => (v == null ? "" : String(v)).trim().slice(0, max);

  // Honeypot: real users never see or fill this field. Pretend success so the
  // bot learns nothing.
  if (s(body.website)) {
    return Response.json({ ok: true });
  }

  const name = s(body.name);
  const email = s(body.email);
  const company = s(body.company);
  const phone = s(body.phone);
  const country = s(body.country);
  const teamSize = s(body.teamSize);
  const message = s(body.message, 2000);

  // Required: name, email (sane shape), message.
  if (!name || !email || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Record the lead before any external call: even if Slack is down or
  // unconfigured, the submission is recoverable from the function logs.
  console.log("[contact] lead", JSON.stringify({ name, email, company, phone, country, teamSize, message }));

  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[contact] SLACK_WEBHOOK_URL is not configured; skipping Slack notification.");
    return Response.json({ ok: false }, { status: 500 });
  }

  // Unix seconds for Slack's <!date> token (renders in each viewer's timezone).
  const ts = Math.floor(Date.now() / 1000);

  // User text, escaped for mrkdwn; the message keeps its blockquote shape even
  // across newlines.
  const quoted = mrkdwn(message).split("\n").map((l) => `> ${l}`).join("\n");

  const payload = {
    attachments: [
      {
        color: "#0066FF",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "🎯  *New Lead: someone wants in!*\nA potential customer just submitted the contact form on *labgenie.ai*. Reach out while interest is hot 🔥",
            },
          },
          { type: "divider" },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `👤  *Name*\n${mrkdwn(name)}` },
              { type: "mrkdwn", text: `🏢  *Company*\n${mrkdwn(company)}` },
              { type: "mrkdwn", text: `📧  *Email*\n<mailto:${email}|${mrkdwn(email)}>` },
              { type: "mrkdwn", text: `📞  *Phone*\n${mrkdwn(phone)}` },
            ],
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `💬  *Their Message*\n${quoted}` },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `🌍  *Country*\n${mrkdwn(country)}` },
              { type: "mrkdwn", text: `⭐  *Interest*\n${mrkdwn(teamSize)}` },
            ],
          },
          { type: "divider" },
          {
            type: "actions",
            elements: [
              {
                type: "button",
                text: { type: "plain_text", text: "✉️  Reply via Email" },
                style: "primary",
                url: `mailto:${email}`,
              },
              {
                type: "button",
                text: { type: "plain_text", text: "📅  Book a Demo" },
                url: "https://cal.com/labgenie",
              },
            ],
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: `⏱️  <!date^${ts}^{date_long_pretty} at {time}|just now>  •  Source: *labgenie.ai/contact*  •  LabGenie CRM Bot`,
              },
            ],
          },
        ],
      },
    ],
  };

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      console.warn("[contact] Slack webhook returned a non-OK status:", res.status);
      return Response.json({ ok: false }, { status: 500 });
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.warn("[contact] Failed to post to Slack webhook:", err);
    return Response.json({ ok: false }, { status: 500 });
  }
}
