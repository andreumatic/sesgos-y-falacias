// Pages Function · POST /api/contacto
// Recibe el formulario de contacto de la guía, comprueba el captcha de
// Cloudflare Turnstile y reenvía el mensaje por correo.
//
// Variables de entorno necesarias en el proyecto de Pages:
//   TURNSTILE_SECRET  → clave secreta del widget (obligatoria)
//   RESEND_API_KEY    → clave de Resend para el envío (opcional)
//   CONTACT_TO        → destino (por defecto info@andreumatic.com)
//   CONTACT_FROM      → remitente verificado en Resend
// Si falta RESEND_API_KEY se responde { error: 'no-provider' } y la web
// ofrece el enlace de correo directo en lugar de dar el mensaje por enviado.

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' }
  });

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: 'formato' }, 400);
  }

  const mensaje = typeof data?.mensaje === 'string' ? data.mensaje.trim() : '';
  const token = typeof data?.token === 'string' ? data.token : '';
  const honeypot = typeof data?.empresa === 'string' ? data.empresa.trim() : '';

  // Campo trampa: si viene relleno es un bot. Respondemos ok para no darle pistas.
  if (honeypot) return json({ ok: true });

  if (mensaje.length < 10) return json({ ok: false, error: 'corto' }, 400);
  if (mensaje.length > 1200) return json({ ok: false, error: 'largo' }, 400);
  if (!token) return json({ ok: false, error: 'captcha' }, 400);
  if (!env.TURNSTILE_SECRET) return json({ ok: false, error: 'no-provider' }, 503);

  // 1. Verificar el captcha contra Cloudflare
  const form = new FormData();
  form.append('secret', env.TURNSTILE_SECRET);
  form.append('response', token);
  const ip = request.headers.get('cf-connecting-ip');
  if (ip) form.append('remoteip', ip);

  let verificado = false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: form
    });
    const out = await res.json();
    verificado = out.success === true;
  } catch {
    return json({ ok: false, error: 'captcha' }, 502);
  }
  if (!verificado) return json({ ok: false, error: 'captcha' }, 403);

  // 2. Enviar el correo
  if (!env.RESEND_API_KEY) return json({ ok: false, error: 'no-provider' }, 503);

  const to = env.CONTACT_TO || 'info@andreumatic.com';
  const from = env.CONTACT_FROM || 'contacto@andreumatic.com';
  const asunto = 'Mensaje desde la guía de sesgos y falacias';
  const texto = [
    'Nuevo mensaje del formulario de sesgosyfalacias.andreumatic.com',
    '',
    mensaje,
    '',
    '—',
    'IP: ' + (ip || 'desconocida'),
    'Fecha: ' + new Date().toISOString()
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        authorization: 'Bearer ' + env.RESEND_API_KEY,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Sesgos y Falacias <' + from + '>',
        to: [to],
        reply_to: to,
        subject: asunto,
        text: texto
      })
    });
    if (!res.ok) return json({ ok: false, error: 'envio' }, 502);
  } catch {
    return json({ ok: false, error: 'envio' }, 502);
  }

  return json({ ok: true });
}

export async function onRequestGet() {
  return json({ ok: false, error: 'metodo' }, 405);
}
