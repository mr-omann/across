// POST /api/subscribe — stores a sign-up email in the SUBSCRIBERS KV namespace.
// Key = lowercased email, metadata = first sign-up time. Nothing is ever sent from here.
// Export: npx wrangler kv key list --binding SUBSCRIBERS --remote  (see README)
// ponytail: honeypot only, add Cloudflare Turnstile if bots start filling the list.

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json' } });

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'Send JSON with an email field.' }, 400);
  }

  if (data.website) return json({ ok: true }); // honeypot filled = bot; pretend success

  const email = String(data.email ?? '').trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'That doesn’t look like an email address.' }, 400);
  }

  if (!env.SUBSCRIBERS) return json({ error: 'Storage is not connected yet.' }, 503);

  if ((await env.SUBSCRIBERS.get(email)) === null) {
    await env.SUBSCRIBERS.put(email, '', {
      metadata: { signedUp: new Date().toISOString(), source: 'acrossfestival.com inter-season form' },
    });
  }
  return json({ ok: true });
}
