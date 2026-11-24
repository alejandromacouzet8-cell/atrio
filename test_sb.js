// Prueba del modo "servidor propio": dos teléfonos sin cuenta, con un Supabase simulado.
const { JSDOM } = require("jsdom"); const fs = require("fs");
const html = fs.readFileSync("out/sb.html", "utf8"); const sc = html.match(/<script>([\s\S]*)<\/script>/)[1];
const chans = {}, velas = [], nubeRows = {}, tracks = {}, viola = []; let enviados = 0; const errs = [];
function fakeSupabase(sesIni) {
  return { createClient: (url, key) => { if (url !== "https://demo.supabase.co" || !key) throw new Error("config"); return {
    channel: (name, opt) => {
      const C = chans[name] = chans[name] || { st: {}, mem: [] }; const k = opt.config.presence.key, H = { presence: [], broadcast: [] }, yo = { H }; let dentro = false;
      const sync = () => C.mem.forEach((m) => m.H.presence.forEach((f) => f()));
      const ch = {
        on: (tipo, _f, fn) => { H[tipo].push(fn); return ch; },
        subscribe: (cb) => { setTimeout(() => { dentro = true; C.mem.push(yo); cb("SUBSCRIBED"); sync(); }, 1); return ch; },
        // como el servidor real: más de 5 cambios de presencia por cliente en 30 s cierra el canal
        track: (p) => { tracks[k] = (tracks[k] || 0) + 1; if (tracks[k] > 5) viola.push(k + " en " + name); C.st[k] = [Object.assign({ presence_ref: "r" + tracks[k] }, p)]; setTimeout(sync, 1); return Promise.resolve("ok"); },
        send: (m) => { if (!dentro || m.type !== "broadcast") return Promise.resolve("error"); enviados++; const copia = JSON.stringify(m.payload); C.mem.forEach((x) => { if (x !== yo) x.H.broadcast.forEach((f) => setTimeout(() => f({ type: "broadcast", event: m.event, payload: JSON.parse(copia) }), 1)); }); return Promise.resolve("ok"); },
        presenceState: () => JSON.parse(JSON.stringify(C.st)),
        _leave: () => { dentro = false; C.mem = C.mem.filter((x) => x !== yo); delete C.st[k]; sync(); }
      };
      return ch;
    },
    removeChannel: (ch) => ch._leave(),
    rpc: (fn, arg) => { const JTS = globalThis.__jt || (globalThis.__jt = {}); const ver = (j, d) => { const g = JTS[j]; if (!g) return null; const cs = g.c.filter((x) => x.dia === d); const dias = {}; g.c.forEach((x) => { dias[x.dia] = (dias[x.dia] || 0) + 1; }); return JSON.parse(JSON.stringify({ creador: g.creador, intencion: g.i, cuentas: cs.sort((a, b) => a.m - b.m), completos: Object.keys(dias).filter((k) => dias[k] === 5), gente: [...new Set(g.c.map((x) => x.quien))] })); };
      if (fn === "juntos_crear") { const id = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4b" + String(Object.keys(JTS).length + 10).padStart(2, "0"); JTS[id] = { creador: arg.c, i: arg.i || null, c: [] }; return Promise.resolve({ data: id, error: null }); }
      if (fn === "juntos_ver") return Promise.resolve({ data: ver(arg.j, arg.d), error: null });
      if (fn === "juntos_marca") { const g = JTS[arg.j]; if (!g) return Promise.resolve({ data: null, error: { message: "no existe" } }); if (!g.c.some((x) => x.dia === arg.d && x.m === arg.m)) g.c.push({ dia: arg.d, m: arg.m, quien: arg.q, hecho: "2026-12-05T13:40:00Z" }); return Promise.resolve({ data: ver(arg.j, arg.d), error: null }); }
      if (fn !== "velas_del_dia") return Promise.resolve({ data: null, error: { message: "no existe" } }); const c = {}; velas.filter((x) => x.dia === arg.d).forEach((x) => { c[x.estado] = (c[x.estado] || 0) + 1; }); return Promise.resolve({ data: Object.keys(c).map((e) => ({ estado: +e, n: c[e] })), error: null }); },
    auth: (() => { let cb = null, ses = sesIni || null; const A = { getSession: () => Promise.resolve({ data: { session: ses } }), onAuthStateChange: (f) => { cb = f; return { data: { subscription: { unsubscribe() {} } } }; }, signInWithOtp: (o) => { A.__otp = o.options && o.options.shouldCreateUser && /@/.test(o.email) ? "123456" : null; return Promise.resolve({ error: A.__otp ? null : { message: "bad" } }); },
      verifyOtp: (o) => { if (o.token !== A.__otp) return Promise.resolve({ error: { message: "Token has expired or is invalid" } }); ses = { user: { id: "u2", email: o.email } }; setTimeout(() => cb && cb("SIGNED_IN", ses), 5); return Promise.resolve({ data: { session: ses }, error: null }); },
      signInWithOAuth: () => { ses = { user: { id: 'u1', email: 'lucia@example.com' } }; setTimeout(() => cb && cb('SIGNED_IN', ses), 2); return Promise.resolve({ error: null }); }, signOut: () => { ses = null; cb && cb('SIGNED_OUT', null); return Promise.resolve({}); } }; return A; })(),
    from: (t) => t === 'progreso' ? { upsert: (row) => { nubeRows[row.user_id] = JSON.parse(JSON.stringify(row)); return Promise.resolve({ error: null }); }, select: () => ({ eq: (_c, v) => ({ maybeSingle: () => Promise.resolve({ data: nubeRows[v] ? { datos: nubeRows[v].datos } : null }) }) }) } : ({ insert: (row) => { if (t !== "velas") throw new Error("tabla"); velas.push(row); return Promise.resolve({ error: null }); }, select: () => ({ eq: (_c, v) => ({ limit: () => Promise.resolve({ data: velas.filter((x) => x.dia === v) }) }) }) })
  }; } };
}
const mkWin = (q) => { const w = new JSDOM(html, { runScripts: "outside-only", url: "https://atrio.test/?demo=1&google=1&fecha=2026-12-03" + q, pretendToBeVisual: true }); w.window.scrollTo = () => {}; w.window.supabase = fakeSupabase(); w.window.addEventListener("error", (e) => errs.push(e.message)); w.window.eval(sc); return w; };
const click = (d, sel) => { const el = d.window.document.querySelector(sel); if (!el) throw new Error("no encuentro " + sel + " | " + d.window.document.querySelector("#app").textContent.slice(0, 160)); el.dispatchEvent(new d.window.MouseEvent("click", { bubbles: true })); };
const txt = (d) => d.window.document.querySelector("#app").textContent; const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const a = mkWin(""), b = mkWin(""); await wait(40);
  click(a, '[data-a="go"][data-v="sala"]'); if (!txt(a).includes("Abre una sala y comparte el código")) throw new Error("sala no disponible con servidor: " + txt(a).slice(0, 200));
  click(a, '[data-a="crear"]'); await wait(40); const code = a.window.document.querySelector(".code").textContent;
  click(b, '[data-a="go"][data-v="sala"]'); b.window.document.getElementById("fc").value = code; click(b, '[data-a="unir"]'); await wait(40);
  if (!txt(a).includes("2 conectados") || !txt(b).includes("Esperando a que Lucía empiece")) throw new Error("presencia: " + txt(a).slice(0, 220) + " || " + txt(b).slice(0, 220));
  click(a, '[data-a="rosala"]'); await wait(40); for (let i = 0; i < 20; i++) click(a, '[data-a="sig"]'); await wait(40);
  if (!txt(b).includes("21 de 82") || b.window.document.querySelector('[data-a="sig"]')) throw new Error("no sincroniza: " + txt(b).slice(0, 200));
  while (a.window.document.querySelector('[data-a="sig"]')) click(a, '[data-a="sig"]'); await wait(60);
  if (!txt(a).includes("Tu veladora ya") || !txt(b).includes("Tu veladora ya")) throw new Error("cierre: " + txt(b).slice(0, 200));
  if (!txt(a).includes("No la pierdas") || !a.window.document.querySelector('.gua [data-a="login"]')) throw new Error("al terminar no ofrece guardar: " + txt(a).slice(-300));
  if (velas.length !== 2 || velas[0].dia !== "2026-12-03" || velas[0].estado !== 22) throw new Error("velas guardadas: " + JSON.stringify(velas));
  // un tercer teléfono abre el mapa después: ve las veladoras del día aunque los otros se hayan ido
  const c = mkWin("&v=mapa"); await wait(60); const t = txt(c);
  if (!t.includes("rosario terminado hoy") || !/2\s*veladoras encendidas hoy\s*en 1 estado/.test(t.replace(/\s+/g, " "))) throw new Error("mapa compartido: " + t.slice(0, 400));
  click(a, '[data-a="go"][data-v="hoy"]'); click(a, '[data-a="go"][data-v="rezar"]'); click(a, '[data-a="ros"][data-set="gozosos"]'); while (a.window.document.querySelector('[data-a="sig"]')) click(a, '[data-a="sig"]'); await wait(30);
  if (velas.length !== 2) throw new Error("duplicó la veladora del día: " + velas.length);
  // alguien que entra tarde a la sala alcanza a quien dirige
  const a2 = mkWin("&x=2"), b2 = mkWin("&x=3"); await wait(40);
  click(a2, '[data-a="go"][data-v="sala"]'); click(a2, '[data-a="crear"]'); await wait(40); const code2 = a2.window.document.querySelector(".code").textContent;
  click(a2, '[data-a="rosala"]'); await wait(20); for (let i = 0; i < 10; i++) click(a2, '[data-a="sig"]'); await wait(40);
  click(b2, '[data-a="go"][data-v="sala"]'); b2.window.document.getElementById("fc").value = code2; click(b2, '[data-a="unir"]'); await wait(80);
  if (!txt(b2).includes("11 de 82")) throw new Error("quien entra tarde no alcanza la cuenta: " + txt(b2).slice(0, 200));
  click(a2, '[data-a="sig"]'); await wait(40); if (!txt(b2).includes("12 de 82")) throw new Error("no sigue después de entrar tarde: " + txt(b2).slice(0, 120));
  // cuenta de Google: guarda el avance en la nube y lo recupera en otro teléfono
  click(a, '[data-a="go"][data-v="hoy"]'); click(a, '[data-a="go"][data-v="yo"]'); if (!txt(a).includes("Guardar con Google")) throw new Error("sin botón de Google"); click(a, '[data-a="login"]'); click(a, '[data-a="gg"]'); await wait(1500);
  click(a, '[data-a="go"][data-v="yo"]'); if (!txt(a).includes("Tu avance está guardado") || !nubeRows.u1 || !nubeRows.u1.datos.d["2026-12-03"].r) throw new Error("nube: " + JSON.stringify(nubeRows).slice(0, 200) + txt(a).slice(0, 200));
  const e = new JSDOM(html, { runScripts: "outside-only", url: "https://atrio.test/?fecha=2026-12-04&google=1", pretendToBeVisual: true }); e.window.scrollTo = () => {}; const fs2 = fakeSupabase(); e.window.supabase = fs2; e.window.eval(sc); await wait(30);
  if (!txt(e).includes("Ya tengo cuenta")) throw new Error("bienvenida sin «Ya tengo cuenta»");
  click(e, '[data-a="empieza"]'); e.window.document.getElementById("fn").value = "Lucía"; click(e, '[data-a="nom"]'); click(e, '#esl [data-a="esc"][data-k="22"]'); click(e, '[data-a="advt"][data-k="lourdes"]'); click(e, '[data-a="advok"]'); e.window.document.getElementById("fi").value = "Por mi abuela"; click(e, '.btn[data-a="piok"]');
  if (!txt(e).includes("Guardar con Google") || !txt(e).includes("Ahora no")) throw new Error("resumen sin guardar con Google: " + txt(e).slice(-300));
  click(e, '[data-a="login"]'); if (!txt(e).includes("Guarda tu avance")) throw new Error("pantalla de entrar: " + txt(e).slice(0, 200)); click(e, '[data-a="gg"]'); await wait(1500);
  if (!txt(e).includes("Tu avance se guarda en tu cuenta")) throw new Error("resumen después de entrar: " + txt(e).slice(-300));
  click(e, '[data-a="entra"]'); if (txt(e).includes("vive solo en este teléfono")) throw new Error("sigue pidiendo guardar con sesión"); click(e, '[data-a="go"][data-v="yo"]');
  if (!/1\s*rosario rezado/.test(txt(e).replace(/\s+/g, " ")) && !txt(e).includes("1rosario rezado")) throw new Error("no recupera el avance en otro teléfono: " + txt(e).slice(0, 300));
  if (!txt(e).includes("Lourdes") || nubeRows.u1.datos.vs[0] !== "lourdes") throw new Error("la advocación no viaja con la cuenta: " + JSON.stringify(nubeRows.u1.datos).slice(0, 120));
  if (nubeRows.u1.datos.pi !== "Por mi abuela") throw new Error("la intención no viaja con la cuenta");
  // teléfono nuevo: «Ya tengo cuenta» en la bienvenida recupera todo y salta los pasos
  const f = new JSDOM(html, { runScripts: "outside-only", url: "https://atrio.test/?fecha=2026-12-05&google=1", pretendToBeVisual: true }); f.window.scrollTo = () => {}; f.window.supabase = fakeSupabase(); f.window.eval(sc); await wait(30);
  click(f, '[data-a="login"]'); if (!txt(f).includes("Entra a tu cuenta")) throw new Error("entrar desde bienvenida"); click(f, '[data-a="gg"]'); await wait(1500);
  if (!txt(f).includes("Lucía") || !txt(f).includes("Mensaje del día") || !txt(f).includes("Lourdes")) throw new Error("«Ya tengo cuenta» no recupera: " + txt(f).slice(0, 300));
  // quien ya tiene sesión nunca ve el aviso de «vive solo en este teléfono», ni un instante al abrir
  const guardado = e.window.localStorage.getItem("atrio1");
  // como el servidor real, quien ya entró deja su sesión guardada en el teléfono (sb-<proyecto>-auth-token)
  const abre = (q, ses, antes, token) => { const w = new JSDOM(html, { runScripts: "outside-only", url: "https://atrio.test/?fecha=2026-12-05" + q, pretendToBeVisual: true, beforeParse(x) { if (antes) x.localStorage.setItem("atrio1", antes); if (ses || token) x.localStorage.setItem("sb-demo-auth-token", "{}"); } }); w.window.scrollTo = () => {}; w.window.supabase = fakeSupabase(ses); w.window.eval(sc); return w; };
  const h = abre("", { user: { id: "u1", email: "lucia@example.com" } }, guardado);
  if (txt(h).includes("vive solo en este teléfono")) throw new Error("aviso de guardar antes de saber si hay sesión");
  await wait(60); if (txt(h).includes("vive solo en este teléfono") || !txt(h).includes("Lucía")) throw new Error("aviso de guardar con sesión: " + txt(h).slice(0, 200));
  click(h, '[data-a="go"][data-v="yo"]'); if (!txt(h).includes("Tu avance está guardado") || h.window.document.querySelector('[data-a="login"]')) throw new Error("Yo con sesión: " + txt(h).slice(-300));
  // sin sesión y con rosarios rezados, el aviso aparece en Hoy en cuanto se sabe que no hay cuenta
  const conRezo = JSON.stringify(Object.assign(JSON.parse(guardado), { d: { "2026-12-04": { r: 1 } } }));
  const i = abre("", null, conRezo);
  if (!txt(i).includes("Tu avance vive solo en este teléfono")) throw new Error("sin sesión guardada, el aviso debe estar desde que abre (sin saltos): " + txt(i).slice(0, 200));
  const antesHtml = i.window.document.querySelector("#app").innerHTML; await wait(60);
  if (!txt(i).includes("Tu avance vive solo en este teléfono") || !i.window.document.querySelector('.avi[data-a="login"]')) throw new Error("falta el aviso en Hoy: " + txt(i).slice(0, 300));
  if (i.window.document.querySelector("#app").innerHTML !== antesHtml) throw new Error("Hoy se volvió a dibujar sin que cambiara nada");
  // sesión guardada que ya no sirve: no se pide nada hasta confirmarlo, y entonces sí aparece el aviso
  const i2 = abre("", null, conRezo, 1);
  if (txt(i2).includes("vive solo en este teléfono")) throw new Error("aviso antes de confirmar la sesión");
  await wait(60); if (!txt(i2).includes("Tu avance vive solo en este teléfono")) throw new Error("sesión vencida: falta el aviso");
  // sin rosarios todavía no se pide nada en Hoy
  const j = abre("", null, JSON.stringify(Object.assign(JSON.parse(guardado), { d: {} }))); await wait(60);
  if (!txt(j).includes("Lucía") || txt(j).includes("vive solo en este teléfono")) throw new Error("pide guardar sin haber rezado: " + txt(j).slice(0, 200));
  // al terminar el rosario la invitación fuerte sale la primera vez y en las marcas de la racha, no todos los días
  const dias = (n) => { const d = {}; for (let x = 0; x < n; x++) d["2026-12-0" + (5 - x)] = { r: 1 }; return JSON.stringify(Object.assign(JSON.parse(guardado), { d })); };
  const l2 = abre("&v=listo", null, dias(2)); await wait(60);
  if (l2.window.document.querySelector(".gua") || !txt(l2).includes("Volver a hoy")) throw new Error("pide guardar en un día cualquiera: " + txt(l2).slice(-300));
  const l3 = abre("&v=listo", null, dias(3)); await wait(60);
  if (!txt(l3).includes("Tus 3 días seguidos viven solo en este teléfono") || !l3.window.document.querySelector('.gua [data-a="login"]')) throw new Error("no pide guardar a los 3 días: " + txt(l3).slice(-300));
  const l3s = abre("&v=listo", { user: { id: "u1", email: "lucia@example.com" } }, dias(3)); await wait(60);
  if (l3s.window.document.querySelector(".gua")) throw new Error("pide guardar a quien ya tiene cuenta");
  // al volver de Google se confirma con un aviso
  const k = abre("&code=abc123", { user: { id: "u1", email: "lucia@example.com" } }, conRezo); await wait(80);
  if (!txt(k).includes("Listo. Tu avance ya se guarda en tu cuenta.") || txt(k).includes("vive solo en este teléfono")) throw new Error("sin confirmación al volver de Google: " + txt(k).slice(-200));
  if (!nubeRows.u1.datos.d["2026-12-04"]) throw new Error("lo rezado sin cuenta no sube al entrar");
  // teléfono nuevo que vuelve de Google con una cuenta que ya tenía avance
  const l = abre("&code=abc123", { user: { id: "u1", email: "lucia@example.com" } }, null); await wait(80);
  if (!txt(l).includes("Listo. Aquí está tu avance.") || !txt(l).includes("Lucía") || !l.window.document.querySelector(".tabs")) throw new Error("teléfono nuevo al volver de Google: " + txt(l).slice(0, 200));
  // cuenta sin avance: se queda en la bienvenida y lo dice
  const m = abre("&code=abc123", { user: { id: "u9", email: "otra@example.com" } }, null); await wait(80);
  if (!txt(m).includes("todavía no tiene avance guardado") || !txt(m).includes("Empezar") || m.window.document.querySelector('[data-a="login"]')) throw new Error("cuenta vacía: " + txt(m).slice(0, 300));
  // entrar con código por correo
  const o = abre("&correo=1", null, conRezo); await wait(60);
  click(o, '[data-a="go"][data-v="yo"]'); click(o, '[data-a="login"]');
  o.window.document.getElementById("fm").value = "sin-arroba"; click(o, '[data-a="otp"]'); if (txt(o).includes("Revisa tu correo")) throw new Error("acepta correo inválido");
  o.window.document.getElementById("fm").value = " Rosa@Gmail.com "; click(o, '[data-a="otp"]'); await wait(30);
  if (!txt(o).includes("Revisa tu correo") || !txt(o).includes("rosa@gmail.com")) throw new Error("no pasa al código: " + txt(o).slice(0, 200));
  o.window.document.getElementById("fk").value = "111111"; click(o, '[data-a="otpok"]'); await wait(30); if (!txt(o).includes("no es correcto")) throw new Error("acepta código malo");
  o.window.document.getElementById("fk").value = "123 456"; click(o, '[data-a="otpok"]'); await wait(200);
  if (!txt(o).includes("Tu avance está guardado") || !txt(o).includes("rosa@gmail.com")) throw new Error("no entra con el código: " + txt(o).slice(0, 300));
  if (!nubeRows.u2 || !nubeRows.u2.datos.d["2026-12-04"]) throw new Error("no sube el avance al entrar con código");
  // rosario juntos: Lucía crea, Rosa abre la liga, cada quien reza misterios a su hora y se completa
  const rezaMis = async (w) => { for (let k = 0; k < 20 && w.window.document.querySelector('[data-a="sig"]'); k++) { click(w, '[data-a="sig"]'); await wait(2); } await wait(40); };
  const pa = abre("", null, JSON.stringify(Object.assign(JSON.parse(guardado), { d: {}, jt: [] }))); await wait(60);
  if (!txt(pa).includes("Rezar el rosario con alguien")) throw new Error("Hoy sin rosario juntos: " + txt(pa).slice(0, 300));
  pa.window.open = (u) => { pa.window.__wa = u; };
  click(pa, '[data-a="jnew"]'); if (!txt(pa).includes("Recen juntos el rosario")) throw new Error("pantalla para crear");
  pa.window.document.getElementById("fj").value = "Rosa"; pa.window.document.getElementById("fji").value = "Por mi abuela <b>"; click(pa, '[data-a="jcrea"]'); await wait(60);
  if (!pa.window.__wa || !decodeURIComponent(pa.window.__wa).includes("?j=")) throw new Error("no invita por WhatsApp");
  const lj = decodeURIComponent(pa.window.__wa).split("\n")[1];
  if (!txt(pa).includes("Con Rosa") || !txt(pa).includes("0 de 5") || !txt(pa).includes("«Por mi abuela <b>»")) throw new Error("pantalla del rosario juntos: " + txt(pa).slice(0, 300));
  click(pa, '[data-a="jtr"][data-k="0"]'); if (!txt(pa).includes("Señal de la cruz") || !txt(pa).includes("Su intención")) throw new Error("rezar un misterio: " + txt(pa).slice(0, 200));
  await rezaMis(pa); if (!txt(pa).includes("1 de 5") || !txt(pa).includes("Lo rezaste tú")) throw new Error("no marca el misterio: " + txt(pa).slice(0, 300));
  // Rosa abre la liga en su teléfono, sin Atrio
  const pb = new JSDOM(html, { runScripts: "outside-only", url: lj.replace("https://atrio.test/?", "https://atrio.test/?fecha=2026-12-05&"), pretendToBeVisual: true }); pb.window.scrollTo = () => {}; pb.window.supabase = fakeSupabase(); pb.window.eval(sc); await wait(80);
  if (!txt(pb).includes("Lucía te invitó")) throw new Error("invitación sin Atrio: " + txt(pb).slice(0, 200));
  pb.window.document.getElementById("fn").value = "Rosa"; click(pb, '[data-a="jnom"]'); await wait(60);
  if (!txt(pb).includes("Lo rezó Lucía") || !txt(pb).includes("1 de 5")) throw new Error("Rosa no ve el misterio de Lucía: " + txt(pb).slice(0, 300));
  for (const m of [1, 2, 3]) { click(pb, '[data-a="jtr"][data-k="' + m + '"]'); await rezaMis(pb); }
  if (!txt(pb).includes("4 de 5")) throw new Error("no lleva la cuenta: " + txt(pb).slice(0, 200));
  // Lucía vuelve a Hoy y ve lo que rezó Rosa; reza el último con la Salve
  click(pa, '.hd [data-a="go"]'); await wait(60);
  if (!txt(pa).includes("Rosa rezó el cuarto misterio") || !txt(pa).includes("Van 4 de 5")) throw new Error("Hoy no muestra el avance: " + txt(pa).slice(0, 400));
  click(pa, '[data-a="jabre"]'); await wait(40); click(pa, '[data-a="jtr"][data-k="4"]');
  if (!pa.window.document.querySelector(".ro")) throw new Error("no abre el último misterio");
  { let vioSalve = false; for (let k = 0; k < 20 && pa.window.document.querySelector('[data-a="sig"]'); k++) { if (txt(pa).includes("Salve")) vioSalve = true; click(pa, '[data-a="sig"]'); await wait(2); } await wait(60); if (!vioSalve) throw new Error("el último no cierra con la Salve"); }
  if (!txt(pa).includes("Tu veladora ya") ) throw new Error("al completar no enciende: " + txt(pa).slice(0, 200));
  click(pa, '[data-a="go"][data-v="hoy"]'); await wait(40); if (!txt(pa).includes("Completo hoy")) throw new Error("Hoy no dice completo");
  // la videollamada usa una sala propia del grupo
  click(pa, '[data-a="jabre"]'); await wait(30); click(pa, '[data-a="jtv"]'); await wait(80); if (!txt(pa).includes("Rosario en familia")) throw new Error("videollamada: " + txt(pa).slice(0, 200));
  // sin la bandera, nadie ve botones de Google
  const g = new JSDOM(html, { runScripts: "outside-only", url: "https://atrio.test/?demo=1&fecha=2026-12-06&v=yo", pretendToBeVisual: true }); g.window.scrollTo = () => {}; g.window.supabase = fakeSupabase(); g.window.eval(sc); await wait(30);
  if (g.window.document.querySelector('[data-a="login"]')) throw new Error("ofrece Google con el acceso cerrado");
  if (viola.length) throw new Error("rebasó el límite de presencia del servidor: " + viola.join(", "));
  if (errs.length) throw new Error("errores: " + errs.join(" | "));
  console.log("presencia por cliente:", JSON.stringify(Object.values(tracks)), "| mensajes de la cuenta:", enviados);
  console.log("servidor propio: sala", code, "sincronizada, 2 veladoras guardadas, mapa compartido OK"); process.exit(0);
})().catch((e) => { console.error("FALLA:", e.message); process.exit(1); });
