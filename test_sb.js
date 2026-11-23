// Prueba del modo "servidor propio": dos teléfonos sin cuenta, con un Supabase simulado.
const { JSDOM } = require("jsdom"); const fs = require("fs");
const html = fs.readFileSync("out/sb.html", "utf8"); const sc = html.match(/<script>([\s\S]*)<\/script>/)[1];
const chans = {}, velas = [], nubeRows = {}, tracks = {}, viola = []; let enviados = 0; const errs = [];
function fakeSupabase() {
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
    rpc: (fn, arg) => { if (fn !== "velas_del_dia") return Promise.resolve({ data: null, error: { message: "no existe" } }); const c = {}; velas.filter((x) => x.dia === arg.d).forEach((x) => { c[x.estado] = (c[x.estado] || 0) + 1; }); return Promise.resolve({ data: Object.keys(c).map((e) => ({ estado: +e, n: c[e] })), error: null }); },
    auth: (() => { let cb = null, ses = null; const A = { getSession: () => Promise.resolve({ data: { session: ses } }), onAuthStateChange: (f) => { cb = f; return { data: { subscription: { unsubscribe() {} } } }; }, signInWithOAuth: () => { ses = { user: { id: 'u1', email: 'lucia@example.com' } }; setTimeout(() => cb && cb('SIGNED_IN', ses), 2); return Promise.resolve({ error: null }); }, signOut: () => { ses = null; cb && cb('SIGNED_OUT', null); return Promise.resolve({}); } }; return A; })(),
    from: (t) => t === 'progreso' ? { upsert: (row) => { nubeRows[row.user_id] = JSON.parse(JSON.stringify(row)); return Promise.resolve({ error: null }); }, select: () => ({ eq: (_c, v) => ({ maybeSingle: () => Promise.resolve({ data: nubeRows[v] ? { datos: nubeRows[v].datos } : null }) }) }) } : ({ insert: (row) => { if (t !== "velas") throw new Error("tabla"); velas.push(row); return Promise.resolve({ error: null }); }, select: () => ({ eq: (_c, v) => ({ limit: () => Promise.resolve({ data: velas.filter((x) => x.dia === v) }) }) }) })
  }; } };
}
const mkWin = (q) => { const w = new JSDOM(html, { runScripts: "outside-only", url: "https://atrio.test/?demo=1&fecha=2026-12-03" + q, pretendToBeVisual: true }); w.window.scrollTo = () => {}; w.window.supabase = fakeSupabase(); w.window.addEventListener("error", (e) => errs.push(e.message)); w.window.eval(sc); return w; };
const click = (d, sel) => { const el = d.window.document.querySelector(sel); if (!el) throw new Error("no encuentro " + sel + " | " + d.window.document.querySelector("#app").textContent.slice(0, 160)); el.dispatchEvent(new d.window.MouseEvent("click", { bubbles: true })); };
const txt = (d) => d.window.document.querySelector("#app").textContent; const wait = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const a = mkWin(""), b = mkWin(""); await wait(40);
  click(a, '[data-a="go"][data-v="sala"]'); if (!txt(a).includes("Abre una sala y comparte el código")) throw new Error("sala no disponible con servidor: " + txt(a).slice(0, 200));
  click(a, '[data-a="crear"]'); await wait(40); const code = a.window.document.querySelector(".code").textContent;
  click(b, '[data-a="go"][data-v="sala"]'); b.window.document.getElementById("fc").value = code; click(b, '[data-a="unir"]'); await wait(40);
  if (!txt(a).includes("2 conectados") || !txt(b).includes("Esperando a que Lucía empiece")) throw new Error("presencia: " + txt(a).slice(0, 220) + " || " + txt(b).slice(0, 220));
  click(a, '[data-a="rosala"]'); await wait(40); for (let i = 0; i < 20; i++) click(a, '[data-a="sig"]'); await wait(40);
  if (!txt(b).includes("21/73") || b.window.document.querySelector('[data-a="sig"]')) throw new Error("no sincroniza: " + txt(b).slice(0, 200));
  while (a.window.document.querySelector('[data-a="sig"]')) click(a, '[data-a="sig"]'); await wait(60);
  if (!txt(a).includes("Tu veladora ya") || !txt(b).includes("Tu veladora ya")) throw new Error("cierre: " + txt(b).slice(0, 200));
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
  if (!txt(b2).includes("11/73")) throw new Error("quien entra tarde no alcanza la cuenta: " + txt(b2).slice(0, 200));
  click(a2, '[data-a="sig"]'); await wait(40); if (!txt(b2).includes("12/73")) throw new Error("no sigue después de entrar tarde: " + txt(b2).slice(0, 120));
  // cuenta de Google: guarda el avance en la nube y lo recupera en otro teléfono
  click(a, '[data-a="go"][data-v="hoy"]'); click(a, '[data-a="go"][data-v="yo"]'); if (!txt(a).includes("Guardar mi avance con Google")) throw new Error("sin botón de Google"); click(a, '[data-a="login"]'); await wait(1500);
  if (!txt(a).includes("Tu avance está guardado") || !nubeRows.u1 || !nubeRows.u1.datos.d["2026-12-03"].r) throw new Error("nube: " + JSON.stringify(nubeRows).slice(0, 200) + txt(a).slice(0, 200));
  const e = new JSDOM(html, { runScripts: "outside-only", url: "https://atrio.test/?fecha=2026-12-04", pretendToBeVisual: true }); e.window.scrollTo = () => {}; const fs2 = fakeSupabase(); e.window.supabase = fs2; e.window.eval(sc); await wait(30);
  click(e, '[data-a="go"][data-v="nom"]'); e.window.document.getElementById("fn").value = "Lucía"; click(e, '[data-a="nom"]'); click(e, '[data-a="est"]'); click(e, '[data-a="adv"][data-k="lourdes"]'); click(e, '[data-a="entra"]'); click(e, '[data-a="go"][data-v="yo"]'); click(e, '[data-a="login"]'); await wait(1500);
  if (!/1\s*rosario rezado/.test(txt(e).replace(/\s+/g, " ")) && !txt(e).includes("1rosario rezado")) throw new Error("no recupera el avance en otro teléfono: " + txt(e).slice(0, 300));
  if (!txt(e).includes("Nuestra Señora de Lourdes") || nubeRows.u1.datos.v !== "lourdes") throw new Error("la advocación no viaja con la cuenta: " + JSON.stringify(nubeRows.u1.datos).slice(0, 120));
  if (viola.length) throw new Error("rebasó el límite de presencia del servidor: " + viola.join(", "));
  if (errs.length) throw new Error("errores: " + errs.join(" | "));
  console.log("presencia por cliente:", JSON.stringify(Object.values(tracks)), "| mensajes de la cuenta:", enviados);
  console.log("servidor propio: sala", code, "sincronizada, 2 veladoras guardadas, mapa compartido OK"); process.exit(0);
})().catch((e) => { console.error("FALLA:", e.message); process.exit(1); });
