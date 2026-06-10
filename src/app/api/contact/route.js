// Contact / request-demo handler. Reads the submitted lead, validates the
// essentials, and posts a rich "New Lead" message to Slack via an incoming
// webhook. The webhook URL stays server-side (process.env.SLACK_WEBHOOK_URL)
// and is never sent to the client.

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  let body = {};
  try {
    body = await req.json();
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  // Safe string accessor: guard undefined/null -> "".
  const s = (v) => (v == null ? "" : String(v)).trim();

  const name = s(body.name);
  const email = s(body.email);
  const company = s(body.company);
  const phone = s(body.phone);
  const country = s(body.country);
  const teamSize = s(body.teamSize);
  const message = s(body.message);

  // Required: name, email, message.
  if (!name || !email || !message) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const webhook = process.env.SLACK_WEBHOOK_URL;
  if (!webhook) {
    console.warn("[contact] SLACK_WEBHOOK_URL is not configured; skipping Slack notification.");
    return Response.json({ ok: false }, { status: 500 });
  }

  // Unix seconds for Slack's <!date> token (renders in each viewer's timezone).
  const ts = Math.floor(Date.now() / 1000);

  const payload = {
    attachments: [
      {
        color: "#0066FF",
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "🎯  *New Lead — Someone wants in!*\nA potential customer just submitted the contact form on *labgenie.ai*. Reach out while interest is hot 🔥",
            },
          },
          { type: "divider" },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `👤  *Name*\n${name}` },
              { type: "mrkdwn", text: `🏢  *Company*\n${company}` },
              { type: "mrkdwn", text: `📧  *Email*\n<mailto:${email}|${email}>` },
              { type: "mrkdwn", text: `📞  *Phone*\n${phone}` },
            ],
          },
          {
            type: "section",
            text: { type: "mrkdwn", text: `💬  *Their Message*\n> ${message}` },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `🌍  *Country*\n${country}` },
              { type: "mrkdwn", text: `⭐  *Interest*\n${teamSize}` },
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
