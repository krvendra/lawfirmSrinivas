const RECORD_KEY = "client-preview:visits";

const commonHeaders = {
  "Cache-Control": "no-store, max-age=0",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
};

function reply(body, status = 200, headers = {}) {
  return new Response(body, { status, headers: { ...commonHeaders, ...headers } });
}

function istTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
    timeZoneName: "short",
  }).format(date);
}

function approximateLocation(request) {
  const cf = request.cf ?? {};
  return { city: cf.city || null, region: cf.region || null, country: cf.country || null };
}

export async function handlePreviewRoute(request, env, action, token) {
  if (action === "home" && token === "continue" && request.method === "POST") {
    const origin = request.headers.get("Origin");
    if (origin && origin !== new URL(request.url).origin) {
      return reply("Request origin not allowed.", 403, { "Content-Type": "text/plain; charset=utf-8" });
    }
    const form = await request.formData();
    if (form.get("consent") !== "yes") {
      return reply("Please confirm the access notice before continuing.", 400, {
        "Content-Type": "text/plain; charset=utf-8",
      });
    }
    if (!env.PREVIEW_LOG) {
      return reply("Preview tracking is not configured.", 503, { "Content-Type": "text/plain; charset=utf-8" });
    }
    const existing = await env.PREVIEW_LOG.get(RECORD_KEY);
    const previous = existing ? JSON.parse(existing) : null;
    const now = istTimestamp();
    const visitCount = (Number(previous?.visitCount) || (previous ? 1 : 0)) + 1;
    await env.PREVIEW_LOG.put(RECORD_KEY, JSON.stringify({
      visitCount,
      firstContinueAtIst: previous?.firstContinueAtIst || now,
      lastContinueAtIst: now,
      location: previous?.location || approximateLocation(request),
    }));
    return reply(JSON.stringify({ visitCount }), 200, { "Content-Type": "application/json; charset=utf-8" });
  }

  if (action === "status" && request.method === "GET") {
    if (!env.STATUS_TOKEN || token !== env.STATUS_TOKEN) {
      return reply("Not found", 404, { "Content-Type": "text/plain; charset=utf-8" });
    }
    if (!env.PREVIEW_LOG) {
      return reply(JSON.stringify({ error: "Preview tracking is not configured." }), 503, {
        "Content-Type": "application/json; charset=utf-8",
      });
    }
    const saved = await env.PREVIEW_LOG.get(RECORD_KEY);
    const record = saved ? JSON.parse(saved) : null;
    return reply(JSON.stringify(record ? {
      opened: true,
      visitCount: Number(record.visitCount) || 1,
      firstContinueAtIst: record.firstContinueAtIst || null,
      lastContinueAtIst: record.lastContinueAtIst || record.firstContinueAtIst || null,
      location: record.location || null,
    } : {
      opened: false,
      visitCount: 0,
      firstContinueAtIst: null,
      lastContinueAtIst: null,
      location: null,
    }), 200, { "Content-Type": "application/json; charset=utf-8" });
  }

  if (action === "count" && request.method === "GET" && token === "total") {
    const saved = env.PREVIEW_LOG ? await env.PREVIEW_LOG.get(RECORD_KEY) : null;
    const record = saved ? JSON.parse(saved) : null;
    const visitCount = Number(record?.visitCount) || (record ? 1 : 0);
    return reply(JSON.stringify({ visitCount }), 200, { "Content-Type": "application/json; charset=utf-8" });
  }

  return reply("Not found", 404, { "Content-Type": "text/plain; charset=utf-8" });
}
