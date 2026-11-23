(function () {
  const app = document.getElementById("app");
  const Q = new URLSearchParams(location.search);
  const S16 = "8,1 9.23,5.03 12.95,3.05 10.97,6.77 15,8 10.97,9.23 12.95,12.95 9.23,10.97 8,15 6.77,10.97 3.05,12.95 5.03,9.23 1,8 5.03,6.77 3.05,3.05 6.77,5.03";
  const star = (s, fill, extra) => `<svg width="${s}" height="${s}" viewBox="0 0 16 16" aria-hidden="true" ${extra || ""}><polygon fill="${fill}" points="${S16}"/></svg>`;
  const starO = (s, c) => `<svg width="${s}" height="${s}" viewBox="0 0 16 16" aria-hidden="true"><polygon fill="none" stroke="${c}" stroke-linejoin="round" points="${S16}"/></svg>`;
  const esc = (t) => String(t == null ? "" : t).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const I = {
    back: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5l-7 7 7 7"/></svg>',
    x: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    go: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 5l5 5-5 5"/></svg>',
    bell: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 17c1.6-1.6 2-3.4 2-6a5 5 0 0 1 10 0c0 2.6.4 4.4 2 6z"/><path d="M10 20a2.1 2.1 0 0 0 4 0"/></svg>',
    sun: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"/></svg>',
    ok: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 7.4l2.6 2.6L11 4.4"/></svg>',
    st: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10.6 2.5h2.8v5.6H19v2.8h-5.6v10.6h-2.8V10.9H5V8.1h5.6z"/></svg>',
    pin: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21.5s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><circle cx="12" cy="10.5" r="2.4"/></svg>',
    yo: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c.9-4 3.9-6 7.5-6s6.6 2 7.5 6"/></svg>'
  };

  /* ---------- emblemas (línea fina, como grabado) ---------- */
  const em = (d) => `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
  const sp = (x, y, k) => `<polygon transform="translate(${x - 8 * k} ${y - 8 * k}) scale(${k})" fill="currentColor" stroke="none" points="${S16}"/>`;
  const EM = {
    gozosos: em('<path d="M24 5c3.6 5.6 4.6 13 0 22.5-4.6-9.5-3.6-16.9 0-22.5z"/><path d="M22 28.5c-1.5-6-6-10.5-12.5-9.5-.6 4.6 2 8.6 6.5 9.5M26 28.5c1.5-6 6-10.5 12.5-9.5.6 4.6-2 8.6-6.5 9.5"/><path d="M15.5 30.5h17M24 31v12.5M24 37c-2.6 0-5 1.2-6.5 3.5M24 37c2.6 0 5 1.2 6.5 3.5"/>'),
    luminosos: em('<circle cx="24" cy="12.5" r="6"/><path d="M24 9.8v5.4M21.3 12.5h5.4M24 2.5V4M34 12.5h1.5M12.5 12.5H14M31 5.5l1.1-1.1M17 5.5l-1.1-1.1"/><path d="M15.5 22.5h17c0 6.3-3.6 10.2-8.5 10.2s-8.5-3.9-8.5-10.2z"/><path d="M24 32.7V40M17.5 44c.8-2.6 3.3-4 6.5-4s5.7 1.4 6.5 4z"/>'),
    dolorosos: em('<path d="M24 4v40M13 17h22"/><circle cx="24" cy="17" r="7"/><path d="M30.1 20.5l2.6 1.5M27.5 23.1l1.5 2.6M20.5 23.1L19 25.7M17.9 20.5l-2.6 1.5M17.9 13.5l-2.6-1.5M20.5 10.9L19 8.3M27.5 10.9L29 8.3M30.1 13.5l2.6-1.5"/>'),
    gloriosos: em('<path d="M11 36L8.5 19l8.5 7 7-12 7 12 8.5-7L37 36z"/><path d="M11 40.5h26M24 4.5V14M21 8h6"/><circle cx="8.5" cy="16.6" r="1.7"/><circle cx="39.5" cy="16.6" r="1.7"/><path d="M17 31.5h0M24 31.5h0M31 31.5h0" stroke-width="2.6"/>'),
    virgen: em('<path d="M11 40V13l13 17 13-17v27"/><path d="M15 40l9-28 9 28M18.9 28.5h10.2"/>' + sp(24, 5, 0.5)),
    angelus: em('<path d="M24 9c-6 0-9.5 4.6-9.5 11.5V29l-4 6.5h27l-4-6.5v-8.5C33.5 13.6 30 9 24 9zM24 5v4M20.5 35.5v1a3.5 3.5 0 0 0 7 0v-1"/><path d="M6.5 17c-1 2.6-1 5.4 0 8M41.5 17c1 2.6 1 5.4 0 8" stroke-opacity=".6"/>'),
    novena: em('<path d="M19.77 18.18A6.2 6.2 0 1 1 28.23 18.18A6.2 6.2 0 1 1 30.85 26.22A6.2 6.2 0 1 1 24 31.2A6.2 6.2 0 1 1 17.15 26.22A6.2 6.2 0 1 1 19.77 18.18z"/><circle cx="24" cy="24" r="3"/>')
  };

  const rayos = (rx, ry, n) => { let r = ""; for (let i = 0; i < n; i++) { const a = (2 * Math.PI * i) / n, c = Math.cos(a), q = Math.sin(a), l = i % 2 ? 2 : 3.6; r += `M${(24 + (rx + 1.6) * c).toFixed(1)} ${(24 + (ry + 1.6) * q).toFixed(1)}L${(24 + (rx + 1.6 + l) * c).toFixed(1)} ${(24 + (ry + 1.6 + l) * q).toFixed(1)}`; } return r; };
  const doce = () => { let r = ""; for (let i = 0; i < 12; i++) { const a = ((i * 30 + 15) * Math.PI) / 180; r += `<circle cx="${(24 + 11.4 * Math.cos(a)).toFixed(1)}" cy="${(26 + 14.9 * Math.sin(a)).toFixed(1)}" r=".75" fill="currentColor" stroke="none"/>`; } return r; };
  const EMA = {
    guadalupe: em(`<path d="M24 9.5c5.8 4.2 8 9 8 14.5s-2.2 10.3-8 14.5c-5.8-4.2-8-9-8-14.5s2.2-10.3 8-14.5z"/><path d="${rayos(8, 14.5, 22)}" stroke-width="1.1"/>` + sp(24, 24, 0.6)),
    fatima: em('<path d="M14.5 27C10.9 27 8 24.4 8 21.1c0-2.8 2-5.1 4.8-5.7C13.4 11.2 16.7 8 20.8 8c1.2 0 2.3.3 3.2.8.9-.5 2-.8 3.2-.8 4.1 0 7.4 3.2 8 7.4 2.8.6 4.8 2.9 4.8 5.7 0 3.3-2.9 5.9-6.5 5.9z"/><path d="M24 27v15.5M18.5 42.5h11M24 34.5l-4.2-4.2M24 31.5l3.6-3.6"/>' + sp(24, 3.6, 0.36)),
    lourdes: em('<path d="M24 5.5c5.6 4.6 8.5 10.2 8.5 16.5v7.5h-17V22c0-6.3 2.9-11.9 8.5-16.5z"/><path d="M11 35c2.2-1.8 4.3-1.8 6.5 0s4.3 1.8 6.5 0 4.3-1.8 6.5 0 4.3 1.8 6.5 0M14.5 40c1.6-1.5 3.2-1.5 4.75 0s3.2 1.5 4.75 0 3.2-1.5 4.75 0 3.2 1.5 4.75 0M18.5 44.5c1.8-1.4 3.7-1.4 5.5 0s3.7 1.4 5.5 0" stroke-opacity=".8"/>' + sp(24, 19.5, 0.62)),
    carmen: em('<path d="M16.5 23C15.5 16 13.5 10 10.5 4.5M31.5 23c1-7 3-13 6-18.5"/><rect x="13.5" y="23" width="21" height="19.5" rx="2"/><rect x="16.5" y="26" width="15" height="13.5" rx="1" stroke-opacity=".45"/>' + sp(24, 32.75, 0.6)),
    pilar: em('<path d="M19 12.5L18 6l3.6 2.8L24 5l2.4 3.8L30 6l-1 6.5z"/><path d="M17 16h14M20.5 16v21M27.5 16v21M17 37h14M14.5 41.5h19M17 37v4.5M31 37v4.5"/><path d="M24 19.5v14" stroke-opacity=".5"/>'),
    sanjuan: em('<path d="M10.5 22c1.6 8.4 6.9 13 13.5 13s11.9-4.6 13.5-13c-2.9 5.2-7.6 8-13.5 8s-10.6-2.8-13.5-8z"/><path d="M12.5 42c1.9-1.7 3.8-1.7 5.75 0s3.8 1.7 5.75 0 3.8-1.7 5.75 0 3.8 1.7 5.75 0" stroke-opacity=".7"/>' + sp(24, 14.5, 0.95) + sp(11.5, 12, 0.36) + sp(36.5, 12, 0.36)),
    zapopan: em('<path d="M19 9.5L18 4l3.6 2.4L24 3l2.4 3.4L30 4l-1 5.5z"/><circle cx="24" cy="18" r="5.5"/><circle cx="24" cy="18" r="1.8"/><path d="M24 23.5V44M24 37h5.5M24 41.5h4"/>'),
    juquila: em('<path d="M24 4c1 6.5 10 10.5 10 21a10 10 0 0 1-20 0c0-3.6 1.6-6.4 3.9-8.6.5 2.8 2 4.6 3.6 4.9C20.6 16 21.5 9.5 24 4z"/><path d="M15 43.5h18" stroke-opacity=".7"/>' + sp(24, 28.5, 0.55)),
    socorro: em('<rect x="13" y="5" width="22" height="38" rx="2"/><rect x="16.5" y="8.5" width="15" height="31" rx="1" stroke-opacity=".5"/><path d="M24 27.5v8M21 30.5h6"/>' + sp(24, 17.5, 0.8)),
    milagrosa: em('<circle cx="24" cy="4.2" r="2"/><ellipse cx="24" cy="26" rx="14.5" ry="18"/><path d="M17.5 34V24l6.5 6.5 6.5-6.5v10M16.5 21.5h15M24 21.5v-7M21.2 17.5h5.6"/>' + doce()),
    auxiliadora: em('<path d="M24 5l13 4.5v11c0 9.4-5.2 16.6-13 21.5-7.8-4.9-13-12.1-13-21.5v-11z"/>' + sp(24, 21.5, 0.95)),
    dolores: em('<path d="M24 41C14 33.5 8.5 27.6 8.5 21.2c0-4.3 3.3-7.7 7.5-7.7 3.2 0 6 1.9 8 5 2-3.1 4.8-5 8-5 4.2 0 7.5 3.4 7.5 7.7C39.5 27.6 34 33.5 24 41z"/><path d="M11.5 7.5L37 38M17.3 9.8l-4.6 3.8"/><circle cx="10.6" cy="6.4" r="1.2"/>')
  };
  const ARCO = `<svg class="nt" viewBox="0 0 346 173" aria-hidden="true"><defs><path id="arco" d="M21.3 173A151.7 151.7 0 0 1 324.7 173"/></defs><text><textPath href="#arco" startOffset="50%" text-anchor="middle">AVE · MARIA · GRATIA · PLENA</textPath></text><g fill="#E6C27A">${sp(16.5, 160, 0.5)}${sp(329.5, 160, 0.5)}</g></svg>`;

  /* ---------- estado guardado en este dispositivo ---------- */
  let S = { n: "", e: -1, d: {}, nov: {}, ang: 1 };
  try { const r = localStorage.getItem("atrio1"); if (r) S = Object.assign(S, JSON.parse(r)); } catch (_) {}
  let U = null, tNube = 0;
  const save = () => { try { localStorage.setItem("atrio1", JSON.stringify(S)); } catch (_) {} clearTimeout(tNube); tNube = setTimeout(nube, 1200); };
  if (Q.get("demo")) { S.n = S.n || "Lucía"; if (S.e < 0) S.e = 22; if (Q.get("adv")) S.vs = Q.get("adv").split(","); }
  if (!Array.isArray(S.vs)) S.vs = S.v ? [S.v] : [];

  /* ---------- fechas y tiempo litúrgico ---------- */
  const FAKE = Q.get("fecha");
  const now = () => (FAKE ? new Date(FAKE + "T" + (Q.get("hora") || "10:00") + ":00") : new Date());
  const key = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const dia = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const add = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const hoy = () => S.d[key(now())] || {};
  const marca = (k) => { const h = key(now()); S.d[h] = Object.assign(S.d[h] || {}, { [k]: 1 }); save(); presLobby(); };
  function pascua(y) { const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451), mo = Math.floor((h + l - 7 * m + 114) / 31), da = ((h + l - 7 * m + 114) % 31) + 1; return new Date(y, mo - 1, da); }
  function adviento(y) { const w = new Date(y, 11, 25).getDay(); return new Date(y, 11, 25 - (w === 0 ? 7 : w) - 21); }
  const FIESTAS = { "1-1": "Santa María, Madre de Dios", "3-19": "San José", "8-15": "La Asunción de María", "10-28": "San Judas Tadeo", "11-1": "Todos los Santos", "11-2": "Fieles difuntos", "12-8": "La Inmaculada Concepción", "12-9": "San Juan Diego", "12-12": "Nuestra Señora de Guadalupe", "12-25": "Navidad" };
  function tiempo(d) {
    const y = d.getFullYear(), t = dia(d), ad = adviento(y), p = pascua(y);
    let r;
    if (t >= ad && t < new Date(y, 11, 25)) r = [["Primera", "Segunda", "Tercera", "Cuarta"][Math.min(3, Math.floor((t - ad) / 6048e5))] + " semana de Adviento", "#6B4C93"];
    else if (t >= new Date(y, 11, 25) || t <= new Date(y, 0, 12)) r = ["Tiempo de Navidad", "#C8962E"];
    else if (t >= add(p, -46) && t < p) r = [t >= add(p, -7) ? "Semana Santa" : "Cuaresma", "#6B4C93"];
    else if (t >= p && t <= add(p, 49)) r = ["Tiempo de Pascua", "#C8962E"];
    else r = ["Tiempo ordinario", "#2E7D5B"];
    const f = FIESTAS[(d.getMonth() + 1) + "-" + d.getDate()];
    return { t: r[0] + (f ? ". " + f : ""), c: r[1] };
  }
  function nov() {
    const t = dia(now()), y = t.getFullYear(), a = new Date(y, 11, 3), b = new Date(y, 11, 11);
    if (t < a) return { f: Math.round((a - t) / 864e5) };
    if (t <= b) return { n: t.getDate() - 2 };
    if (t.getMonth() === 11 && t.getDate() === 12) return { fiesta: 1 };
    return { f: Math.round((new Date(y + 1, 11, 3) - t) / 864e5) };
  }
  const novHechos = () => S.nov[now().getFullYear()] || {};
  function racha() { let n = 0, d = dia(now()); if (!(S.d[key(d)] || {}).r) d = add(d, -1); while ((S.d[key(d)] || {}).r) { n++; d = add(d, -1); } return n; }
  const total = () => Object.keys(S.d).filter((k) => S.d[k].r).length;
  const estado = (i) => (i === 99 ? "Fuera de México" : (MX.e[i] || [""])[0]);
  const mis = () => { const l = (S.vs || []).map((k) => ADV.find((x) => x.k === k)).filter(Boolean); return l.length ? l : [ADV[0]]; };
  const advN = (a) => a.p + " " + a.c;
  function fiesta(a) { const t = dia(now()); let d = new Date(t.getFullYear(), a.f[1] - 1, a.f[0]); if (d < t) d = new Date(t.getFullYear() + 1, a.f[1] - 1, a.f[0]); return Math.round((d - t) / 864e5); }
  const nDia = () => { const t = dia(now()); return Math.floor((t.getTime() - t.getTimezoneOffset() * 6e4) / 864e5); };
  // La Virgen del día: la que tenga fiesta hoy; si no, se turnan entre las que elegiste
  const delDia = () => { const l = mis(); return l.find((a) => !fiesta(a)) || l[nDia() % l.length]; };
  let va = "";
  const adv = () => mis().find((x) => x.k === va) || delDia();
  function frase(a) {
    if (!fiesta(a)) return a.fr[0];
    const todas = []; for (let i = 0; i < Math.max(a.fr.length, MARIA.length); i++) { if (a.fr[i]) todas.push(a.fr[i]); if (MARIA[i]) todas.push(MARIA[i]); }
    return todas[Math.floor(nDia() / mis().length) % todas.length];
  }
  const cita = (f) => `<span class="ci">${f[0] === "c" ? "«" + f[1] + "»" : f[1]}</span>`;
  const deHoy = (extra) => { const a = delDia(), f = frase(a); return `<button class="fra${extra || ""}" data-a="verv" data-k="${a.k}" aria-label="Mensaje del día, de ${advN(a)}. Ver su historia y su oración"><span class="fh"><span class="md">${EMA[a.k]}</span><span class="g"><span class="ru">${fiesta(a) ? "Mensaje del día" : "Hoy es su fiesta"}</span><b>${advN(a)}</b></span><span class="fl">${I.go}</span></span>${cita(f)}<small>${f[2]}</small><span class="fv">Ver su historia y su oración</span></button>`; };

  /* ---------- campana ---------- */
  let AC = null;
  function bell(n) {
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === "suspended") AC.resume();
      const t0 = AC.currentTime + 0.05;
      for (let j = 0; j < (n || 3); j++) {
        const t = t0 + j * 1.7;
        [[1, 0.5], [2, 0.32], [2.4, 0.2], [3, 0.14], [4.2, 0.08], [5.4, 0.05]].forEach(([m, g], i) => {
          const o = AC.createOscillator(), ga = AC.createGain();
          o.type = "sine"; o.frequency.value = 196 * m;
          ga.gain.setValueAtTime(0.0001, t); ga.gain.exponentialRampToValueAtTime(g * 0.5, t + 0.012); ga.gain.exponentialRampToValueAtTime(0.0001, t + 3.4 - i * 0.35);
          o.connect(ga); ga.connect(AC.destination); o.start(t); o.stop(t + 3.6);
        });
      }
    } catch (_) {}
  }
  let sono = "", tic = 0, WL = null;
  function despierta(on) {
    try {
      if (on) { if (!WL && navigator.wakeLock && document.visibilityState === "visible") navigator.wakeLock.request("screen").then((w) => { WL = w; w.addEventListener("release", () => { if (WL === w) WL = null; }); }, () => {}); }
      else if (WL) { const w = WL; WL = null; w.release().catch(() => {}); }
    } catch (_) {}
  }
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { despierta(view === "ros"); if (view === "mapa" || view === "listo") cargaVelas(); } });
  setInterval(() => { const d = now(); if (++tic % 3 === 0 && (view === "mapa" || view === "listo") && !document.hidden) cargaVelas(); if (S.ang && S.n && d.getHours() === 12 && d.getMinutes() < 10 && sono !== key(d) && !hoy().a && view !== "ros") { sono = key(d); bell(3); go("ang"); } }, 20000);

  /* ---------- sala y mapa en vivo (solo cuando la plataforma lo permite) ---------- */
  const SB_URL = "__SB_URL__", SB_KEY = "__SB_KEY__";
  let RM = null, peersL = [], sala = null, peersS = [], lead = false, codigo = "", SB = null, velasHoy = null;
  function sbRoom(cli) {
    // El servidor cierra el canal a quien manda más de 5 cambios de presencia en 30 s. Por eso la presencia
    // lleva solo lo que casi no cambia (quién está, quién dirige) y la cuenta del rosario viaja por "broadcast".
    const me = Math.random().toString(36).slice(2, 12), RAPIDO = { on: 1, i: 1, set: 1, fin: 1 };
    let marcas = [];
    const mk = (name) => {
      let ch = null, st = {}, subs = [], lento = {}, rapido = {}, deOtros = {}, ok = false, fuera = false, ultimo = "", llaves = "", tT = 0, tR = 0;
      const fire = () => { const peers = Object.keys(st).map((k) => { const m = st[k] || []; return { peer: k, isMe: k === me, kind: "viewer", presence: Object.assign({}, m[m.length - 1] || {}, k === me ? rapido : deOtros[k] || {}) }; }); subs.forEach((f) => { try { f({ peers }); } catch (_) {} }); };
      const di = () => { if (ok && !fuera && lento.lead) try { ch.send({ type: "broadcast", event: "st", payload: { k: me, s: rapido } }); } catch (_) {} };
      const track = () => {
        clearTimeout(tT); if (!ok || fuera) return;
        const j = JSON.stringify(lento); if (j === ultimo) return;
        const t = Date.now(); marcas = marcas.filter((x) => t - x < 31000);
        if (marcas.length >= 4) { tT = setTimeout(track, 31000 - (t - marcas[0])); return; }
        marcas.push(t); ultimo = j; try { ch.track(lento); } catch (_) {}
      };
      const abre = () => {
        if (fuera) return; ok = false;
        const c = ch = cli.channel(name, { config: { presence: { key: me } } });
        c.on("presence", { event: "sync" }, () => { if (c !== ch) return; st = c.presenceState(); Object.keys(deOtros).forEach((k) => { if (!st[k]) delete deOtros[k]; }); const l = Object.keys(st).sort().join(); if (l !== llaves) { llaves = l; di(); } fire(); });
        c.on("broadcast", { event: "st" }, (m) => { const q = m && m.payload; if (c === ch && q && q.k && q.k !== me) { deOtros[q.k] = q.s || {}; fire(); } });
        c.subscribe((x) => {
          if (c !== ch || fuera) return;
          if (x === "SUBSCRIBED") { ok = true; ultimo = ""; track(); di(); }
          else { ok = false; clearTimeout(tR); tR = setTimeout(() => { if (c === ch && !ok && !fuera) { try { cli.removeChannel(c); } catch (_) {} abre(); } }, 6000); }
        });
      };
      abre();
      const tB = setInterval(di, 5000);
      return {
        presence: (q) => { let l = 0, r = 0; Object.keys(q).forEach((k) => { const T = RAPIDO[k] ? rapido : lento, v = q[k]; if (v === null || v === undefined) { if (k in T) { delete T[k]; RAPIDO[k] ? r++ : l++; } } else if (T[k] !== v) { T[k] = v; RAPIDO[k] ? r++ : l++; } }); if (l) track(); if (r) { di(); fire(); } return Promise.resolve(); },
        onPeers: (fn) => { subs.push(fn); fire(); return () => {}; },
        leave: () => { fuera = true; clearTimeout(tT); clearTimeout(tR); clearInterval(tB); try { cli.removeChannel(ch); } catch (_) {} return Promise.resolve(); }
      };
    };
    // Sin canal general: el mapa se arma con las veladoras guardadas, así solo abre conexión quien entra a una sala.
    return { presence: () => Promise.resolve(), onPeers: () => () => {}, join: (n) => Promise.resolve(mk(n)) };
  }
  function nube() { if (!SB || !U) return; try { SB.from("progreso").upsert({ user_id: U.id, datos: S, actualizado: new Date().toISOString() }).then(() => {}, () => {}); } catch (_) {} }
  function sincroniza() {
    if (!SB || !U) return;
    try { SB.from("progreso").select("datos").eq("user_id", U.id).maybeSingle().then((r) => {
      const R = (r && r.data && r.data.datos) || null;
      if (R) { const d = Object.assign({}, R.d || {}); Object.keys(S.d).forEach((k) => { d[k] = Object.assign({}, d[k] || {}, S.d[k]); }); const nv = Object.assign({}, R.nov || {}); Object.keys(S.nov).forEach((y) => { nv[y] = Object.assign({}, nv[y] || {}, S.nov[y]); }); S.d = d; S.nov = nv; if (!S.n && R.n) S.n = R.n; if (!S.vs.length && (R.vs || R.v)) S.vs = R.vs || [R.v]; if (S.e < 0 && R.e >= 0) S.e = R.e; }
      try { localStorage.setItem("atrio1", JSON.stringify(S)); } catch (_) {} nube(); render();
    }, () => {}); } catch (_) {}
  }
  function cargaVelas() {
    if (!SB) return;
    const pon = (c) => { const j = JSON.stringify(c); if (j === JSON.stringify(velasHoy)) return; velasHoy = c; if (view === "mapa" || view === "listo") render(); };
    const lento = () => SB.from("velas").select("estado").eq("dia", key(now())).limit(1000).then((q) => { if (q && q.data) { const c = {}; q.data.forEach((x) => { c[x.estado] = (c[x.estado] || 0) + 1; }); pon(c); } }, () => {});
    try { SB.rpc("velas_del_dia", { d: key(now()) }).then((r) => { if (r && r.data && !r.error) { const c = {}; r.data.forEach((x) => { c[x.estado] = x.n; }); pon(c); } else lento(); }, lento); } catch (_) {}
  }
  function enciende() {
    if (!SB || hoy().v || !MX.e[S.e]) return;
    const h = key(now()); S.d[h] = Object.assign(S.d[h] || {}, { v: 1 }); save();
    try { SB.from("velas").insert({ dia: h, estado: S.e }).then(() => cargaVelas(), () => {}); } catch (_) {}
  }
  function conectaSB() {
    if (SB_URL.indexOf("http") !== 0 || RM) return;
    const init = () => { try { SB = window.supabase.createClient(SB_URL, SB_KEY, { auth: { flowType: "pkce" } }); RM = sbRoom(SB);
      try { SB.auth.getSession().then((r) => { U = (r && r.data && r.data.session && r.data.session.user) || null; if (U) sincroniza(); }, () => {}); SB.auth.onAuthStateChange((_e, ses) => { const u = (ses && ses.user) || null, cambia = (u && u.id) !== (U && U.id); U = u; if (U && cambia) sincroniza(); else if (cambia) render(); }); } catch (_) {} RM.onPeers((c) => { peersL = c.peers || []; if (view === "mapa" || view === "listo" || (view === "sala" && !sala)) render(); }); presLobby(); cargaVelas(); if (hoy().r) enciende(); if (view === "sala") render(); } catch (_) { RM = null; SB = null; } };
    if (window.supabase && window.supabase.createClient) return init();
    const sc = document.createElement("script"); sc.src = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js"; sc.onload = init; document.head.appendChild(sc);
  }
  const presLobby = () => { if (RM) RM.presence({ e: S.e, r: hoy().r ? 1 : 0 }).catch(() => {}); };
  function conecta(n) {
    if (RM) return;
    try {
      if (window.claude && window.claude.use) window.claude.use("room").then((r) => {
        if (!r || RM) return; RM = r;
        r.onPeers((c) => { peersL = c.peers || []; if (view === "mapa" || view === "listo" || (view === "sala" && !sala)) render(); }, () => { RM = null; peersL = []; });
        presLobby(); if (view === "sala") render();
      }).catch(() => {});
      else if (SB_URL.indexOf("http") === 0) setTimeout(conectaSB, 0);
      else if (n < 8) setTimeout(() => conecta(n + 1), 700);
    } catch (_) {}
  }
  conecta(0);
  const presSala = () => { if (sala) sala.presence({ n: S.n.slice(0, 24), e: S.e, lead: lead ? 1 : 0, on: ros && ros.sala ? 1 : 0, i: ros ? ros.i : 0, set: ros ? ros.set : "", fin: null }).catch(() => {}); };
  const guia = () => peersS.filter((p) => p.presence && p.presence.lead).sort((a, b) => (a.peer < b.peer ? -1 : 1))[0];
  async function entrar(code, crea) {
    if (!RM) return;
    try {
      codigo = code; lead = !!crea; sala = await RM.join("s-" + code.toLowerCase());
      sala.onPeers((c) => {
        peersS = c.peers || [];
        const g = guia();
        if (!lead && g && !g.isMe && g.presence.fin && ros && ros.sala) { fin(); return; }
        if (!lead && g && !g.isMe && g.presence.on) {
          if (!ros || !ros.sala || ros.set !== g.presence.set) { ros = { set: MIS[g.presence.set] ? g.presence.set : MIS_DIA[now().getDay()], i: 0, sala: 1 }; ros.p = pasos(); view = "ros"; }
          const i = Math.max(0, Math.min(ros.p.length - 1, g.presence.i | 0));
          if (i !== ros.i || view !== "ros") { ros.i = i; view = "ros"; }
          render();
        } else if (view === "sala") render();
      }, () => { sala = null; peersS = []; if (view === "sala") render(); });
      presSala(); render();
    } catch (_) { sala = null; aviso("No se pudo abrir la sala. Intenta otra vez."); }
  }
  function salir() { try { if (sala) sala.leave(); } catch (_) {} sala = null; peersS = []; lead = false; codigo = ""; }

  /* ---------- piezas visuales ---------- */
  const sky = () => '<div class="sky">' + [[20, 5, 10, 0], [55, 8, 8, 1.4], [86, 4, 10, 2.6], [1.5, 430, 9, 0.8], [96.5, 300, 9, 3.3], [96, 610, 8, 2], [1.5, 700, 8, 1.1]].map(([x, y, s, d]) => star(s, "#F4DCA6", `class="tw" style="left:${x}%;top:${y}px;animation-delay:${d}s"`)).join("") + "</div>";
  function portal() {
    let r = "";
    for (let i = 0; i < 61; i++) { const a = Math.PI + (Math.PI * i) / 60, r1 = 104, r2 = r1 + (i % 2 ? 40 : 24); r += `<line x1="${(150 + r1 * Math.cos(a)).toFixed(1)}" y1="${(132 + r1 * Math.sin(a)).toFixed(1)}" x2="${(150 + r2 * Math.cos(a)).toFixed(1)}" y2="${(132 + r2 * Math.sin(a)).toFixed(1)}"/>`; }
    const st = [[112, 96, 0.8], [150, 70, 0.55], [186, 100, 0.7], [128, 140, 0.5], [170, 150, 0.85], [104, 180, 0.55], [148, 196, 0.7], [192, 186, 0.5], [160, 112, 0.4], [122, 214, 0.45]].map(([x, y, s]) => `<polygon transform="translate(${x - 8 * s} ${y - 8 * s}) scale(${s})" fill="#F4DCA6" points="${S16}"/>`).join("");
    return `<svg viewBox="0 0 300 250" width="300" height="250" aria-hidden="true" style="align-self:center"><g stroke="#E6C27A" stroke-opacity=".5" stroke-width="1" stroke-linecap="round">${r}</g><path d="M75 236V107a75 75 0 0 1 150 0v129z" fill="#125158" stroke="#E6C27A" stroke-width="1.5"/><path d="M83 236V107a67 67 0 0 1 134 0v129" fill="none" stroke="#E6C27A" stroke-opacity=".4"/>${st}<path d="M50 236h200" stroke="#E6C27A" stroke-width="2"/><path d="M78 244h144" stroke="#E6C27A" stroke-opacity=".45"/></svg>`;
  }
  let dotsPath = "";
  function mapa(lit, mine, full, extra) {
    const VX = full ? 20 : 0, VY = full ? 4 : 0, VW = full ? 344 : MX.w, VH = full ? 230 : MX.h;
    if (!dotsPath) { const d = MX.d; for (let i = 0; i < d.length; i += 2) dotsPath += `M${d[i] / 10} ${d[i + 1] / 10}h0`; }
    let g = "";
    Object.keys(lit).forEach((k) => { const e = MX.e[k]; if (!e) return; const n = lit[k], R = Math.min(30, 13 + n * 3); g += `<circle cx="${e[1]}" cy="${e[2]}" r="${R}" fill="url(#gl)"/><polygon transform="translate(${e[1] - 6} ${e[2] - 6}) scale(.75)" fill="#F4DCA6" points="${S16}"/>`; });
    const m = MX.e[mine];
    if (m) g += `<circle cx="${m[1]}" cy="${m[2]}" r="24" fill="url(#gl)"/><circle cx="${m[1]}" cy="${m[2]}" r="11" fill="none" stroke="#FBE9BE" stroke-width="1"/><polygon transform="translate(${m[1] - 8} ${m[2] - 8})" fill="#FFF3D0" points="${S16}"/>`;
    const pu = m ? `<span class="pu" style="position:absolute;left:${((m[1] - VX) / VW * 100).toFixed(2)}%;top:${((m[2] - VY) / VH * 100).toFixed(2)}%;width:22px;height:22px;margin:-11px 0 0 -11px;border-radius:50%;border:1.2px solid #FBE9BE"></span>` : "";
    return `<div style="position:relative;${full ? "margin:0 -16px" : "margin:6px -22px 0"}"><svg viewBox="${VX} ${VY} ${VW} ${VH}" role="img" aria-label="Mapa de México con veladoras encendidas" style="display:block;width:100%"><defs><radialGradient id="gl"><stop offset="0" stop-color="#FBE9BE" stop-opacity=".85"/><stop offset=".4" stop-color="#F0CF8A" stop-opacity=".32"/><stop offset="1" stop-color="#E6C27A" stop-opacity="0"/></radialGradient></defs><path d="${MX.o}" fill="#134A50" fill-opacity=".55" stroke="#E6C27A" stroke-opacity=".38" stroke-width=".7" stroke-linejoin="round"/><path d="${dotsPath}" stroke="#8FB3B2" stroke-opacity=".5" stroke-width="2" stroke-linecap="round"/>${g}</svg>${pu}${extra || ""}</div>`;
  }
  function pasos() {
    const p = [{ t: "cruz", b: "x" }, { t: "credo", b: "x" }, { t: "pn", b: "p0" }, { t: "am", k: 1, of: 3, b: "p1" }, { t: "am", k: 2, of: 3, b: "p2" }, { t: "am", k: 3, of: 3, b: "p3" }, { t: "gl", b: "p3" }];
    for (let m = 0; m < 5; m++) { p.push({ t: "mis", m, b: "L" + m }); p.push({ t: "pn", m, b: "L" + m }); for (let k = 1; k <= 10; k++) p.push({ t: "am", m, k, of: 10, b: "s" + m + "_" + k }); p.push({ t: "gl", m, x: 1, b: "s" + m + "_10" }); }
    p.push({ t: "salve", b: "M" }); return p;
  }
  function ring(i) {
    const P = ros.p, done = {}, cur = P[i].b; for (let j = 0; j < i; j++) done[P[j].b] = 1;
    const cx = 130, cy = 108, R = 98, st = 360 / 56; let s = "";
    const bead = (id, x, y, r) => { const c = id === cur, d = done[id]; s += (c ? `<circle class="pu" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r + 3}" fill="none" stroke="#F4DCA6" stroke-width="1.2"/>` : "") + `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${c ? r + 1.2 : r}" fill="${c ? "#FFF3D0" : d ? "#E6C27A" : "none"}" stroke="${d || c ? "none" : "rgba(244,220,166,.55)"}" stroke-width="1"/>`; };
    for (let m = 0; m < 5; m++) for (let k = 0; k <= 10; k++) { const a = ((90 + (m * 11 + k + 1) * st) * Math.PI) / 180; bead(k === 0 ? "L" + m : "s" + m + "_" + k, cx + R * Math.cos(a), cy + R * Math.sin(a), k === 0 ? 4.6 : 3); }
    const mc = cur === "M";
    s += `<polygon transform="translate(${cx - 8} ${cy + R - 8})" fill="${mc || i > 0 ? "#F4DCA6" : "none"}" stroke="rgba(244,220,166,.7)" stroke-width=".8" points="${S16}"/>` + (mc ? `<circle class="pu" cx="${cx}" cy="${cy + R}" r="11" fill="none" stroke="#F4DCA6" stroke-width="1.2"/>` : "");
    bead("p3", cx, cy + R + 14, 3); bead("p2", cx, cy + R + 23, 3); bead("p1", cx, cy + R + 32, 3); bead("p0", cx, cy + R + 42, 4.2);
    const xc = cur === "x" ? "#FFF3D0" : "#E6C27A";
    s += `<path d="M${cx} ${cy + R + 48}v13M${cx - 4.5} ${cy + R + 52}h9" stroke="${xc}" stroke-width="1.6" stroke-linecap="round"/>`;
    return `<svg width="260" height="262" viewBox="0 0 260 270" aria-hidden="true">${s}</svg>`;
  }
  const tabs = (on, dk) => `<nav class="tabs dk" aria-label="Secciones">` + [["hoy", "Hoy", I.sun], ["rezar", "Rezar", I.st], ["mapa", "Mapa", I.pin], ["yo", "Yo", I.yo]].map(([v, t, ic]) => `<button class="tab${on === v ? " on" : ""}" data-a="go" data-v="${v}"${on === v ? ' aria-current="page"' : ""}>${ic}${t}</button>`).join("") + "</nav>";
  const hd = (back, title, right) => `<div class="hd z"><button class="ic" data-a="go" data-v="${back[0]}" aria-label="${back[1] === "x" ? "Cerrar" : "Regresar"}">${back[1] === "x" ? I.x : I.back}</button><p class="ru">${title}</p>${right || '<span class="ic"></span>'}</div>`;
  const vivos = () => peersL.filter((p) => p.kind !== "agent");
  function encendidos() { if (velasHoy) return Object.assign({}, velasHoy); const lit = {}; vivos().forEach((p) => { const pr = p.presence || {}; if (pr.r && !p.isMe && MX.e[pr.e]) lit[pr.e] = (lit[pr.e] || 0) + 1; }); return lit; }

  /* ---------- pantallas ---------- */
  let view = "hoy", ros = null, nd = 1, vn = 0, msg = "", paso3 = 0, vuelve = "hoy", sel = [];
  const V = {
    bien: () => `<section class="v d in">${sky()}<div class="hd z" style="justify-content:flex-start;gap:10px"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M6.5 24.5V13a7.5 7.5 0 0 1 15 0v11.5M3.5 24.5h21" stroke="#E6C27A" stroke-width="1.6" stroke-linecap="round"/><polygon transform="translate(8 8.2) scale(.75)" fill="#E6C27A" points="${S16}"/></svg><b style="font-family:var(--se);font-size:26px;font-weight:600">Atrio</b></div>${portal()}
      <p class="z" style="margin-top:14px;font-family:var(--se);font-style:italic;font-weight:500;font-size:33px;line-height:39px">¿No estoy yo aquí,<br>que soy tu madre?</p><p class="ru z" style="margin-top:8px;font-size:16px">Santa María de Guadalupe a san Juan Diego, 1531</p>
      <p class="sub z" style="margin-top:14px;font-size:16px;line-height:24px">Reza el rosario, la novena y el Ángelus, solo o con tu familia. No importa cuánto tiempo pasó.</p>
      <div class="mt z" style="padding-top:24px"><button class="btn go" data-a="go" data-v="nom">Empezar</button></div></section>`,
    nom: () => `<section class="v d in">${sky()}${hd([S.e >= 0 ? "yo" : "bien"], "Paso 1 de 2")}<h1 class="z" style="margin-top:30px;font-size:34px;line-height:40px">¿Cómo te llamas?</h1><p class="sub z">Solo tu nombre de pila.</p>
      <label class="lab z" for="fn">Tu nombre</label><input class="fld z" id="fn" type="text" autocomplete="given-name" maxlength="24" value="${esc(S.n)}">
      <button class="btn go mt z" data-a="nom">Continuar</button></section>`,
    est: () => `<section class="v d in">${sky()}${hd(["nom"], "Paso 2 de 2")}<h1 class="z" style="margin-top:30px;font-size:34px;line-height:40px">¿Desde dónde rezas?</h1><p class="sub z">Ahí se enciende tu veladora en el mapa.</p>
      <label class="lab z" for="fe">Tu estado</label><select class="fld z" id="fe">${MX.e.map((e, i) => `<option value="${i}"${i === (S.e < 0 ? 6 : S.e) ? " selected" : ""}>${e[0]}</option>`).join("")}<option value="99"${S.e === 99 ? " selected" : ""}>Fuera de México</option></select>
      <p class="note z" style="margin-top:12px">Tu nombre y tu avance se guardan solo en este dispositivo.</p>
      <button class="btn go mt z" data-a="est">Entrar a Atrio</button></section>`,
    advs: () => { const n = sel.length; return `<section class="v d in" style="padding-bottom:120px">${sky()}${hd([paso3 ? "est" : "adv"], paso3 ? "Paso 3 de 3" : "Tus Vírgenes")}<h1 class="z" style="margin-top:${paso3 ? 30 : 10}px;font-size:34px;line-height:40px">¿A qué Virgen le rezas?</h1><p class="sub z">Elige una o varias. Es la misma María, con el nombre que le dan en tu casa.</p>
      <div class="advg z">${ADV.map((a) => { const on = sel.includes(a.k); return `<button class="ni${on ? " on" : ""}" data-a="advt" data-k="${a.k}" aria-pressed="${on}" aria-label="${advN(a)}">${on ? `<span class="pal">${I.ok}</span>` : ""}<span class="em">${EMA[a.k]}</span><b>${a.c}</b><small>${a.f[0]} ${MESES[a.f[1] - 1].slice(0, 3)}</small></button>`; }).join("")}</div>
      <p class="note z" style="margin-top:18px">¿No está la tuya? Iremos sumando más advocaciones.</p>
      <div class="pie"><button class="btn go" data-a="advok"${n ? "" : " disabled"}>${n ? (n === 1 ? "Listo, elegí 1" : "Listo, elegí " + n) : "Elige al menos una"}</button></div></section>`; },
    adv: () => { const a = adv(), ff = fiesta(a), f = frase(a);
      const ob = paso3 === 2;
      return `<section class="v d in"${ob ? ' style="padding-bottom:120px"' : ""}>${sky()}${hd([ob ? "advs" : vuelve], ob ? "Paso 3 de 3" : "Tu Virgen")}
        ${mis().length > 1 ? `<div class="chips z">${mis().map((x) => `<button class="chip${x.k === a.k ? " on" : ""}" data-a="verv" data-k="${x.k}">${x.c}</button>`).join("")}</div>` : ""}
        <div class="nicho z"><i class="n1"></i><i class="n2"></i>${ARCO}<div class="nb"><span class="em">${EMA[a.k]}</span><p class="ru">${a.p}</p><h2>${a.c}</h2><p class="ins">${a.l}</p><p class="fie">${ff ? `Su fiesta es el ${a.f[0]} de ${MESES[a.f[1] - 1]}. ${ff === 1 ? "Es mañana." : "Faltan " + ff + " días."}` : "Hoy es su fiesta."}</p></div></div>
        <p class="tit z">${a.k === delDia().k ? "Mensaje del día" : "Su mensaje"}</p><div class="z c">${cita(f)}<p class="note" style="margin-top:8px">${f[2]}</p></div>
        <p class="tit z">Su historia</p>${a.h.map((x) => `<p class="his z">${x}</p>`).join("")}${a.fx ? `<p class="note z" style="margin-top:12px">${a.fx}</p>` : ""}
        <p class="tit z">Oración</p>${a.o[0] === "Oración" ? "" : `<p class="ru z c">${a.o[0]}</p>`}<p class="pr z c" style="font-size:20px;line-height:30px">${a.o[1]}</p>
        <div class="z" style="padding-top:28px">${ob ? `<p class="note c">${mis().length > 1 ? "Cada día te llega el mensaje de una de ellas, en Hoy." : "Cada día te llega su mensaje, en Hoy."}</p><button class="lk" data-a="advsel" style="display:block;margin:4px auto 0">Cambiar mi elección</button><div class="pie"><button class="btn go" data-a="entra">Entrar a Atrio</button></div>` : `<button class="btn go" data-a="ros">Rezar el rosario de hoy</button><button class="lk" data-a="advsel" style="display:block;margin:4px auto 0">Elegir mis Vírgenes</button>`}</div></section>`; },
    hoy: () => {
      const d = now(), h = d.getHours(), tp = tiempo(d), set = MIS_DIA[d.getDay()], nv = nov(), hh = hoy(), rc = racha();
      const nvTxt = nv.n ? `Día ${nv.n} de 9` : nv.fiesta ? "Hoy es su fiesta" : nv.f === 1 ? "Empieza mañana" : `Empieza el 3 de diciembre, faltan ${nv.f} días`;
      const item = (cls, on, a, ru, t, right) => `<li><span class="nd">${on ? star(16, "#C8962E") : starO(16, "rgba(244,220,166,.6)")}</span><button class="it ${cls}" ${a}><span class="g"><span class="ru" style="display:block">${ru}</span><b>${t}</b></span>${right}</button></li>`;
      return `<section class="v d n tb in">${sky()}<div class="hd"><p class="ru">${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}</p>
        <button class="btn" data-a="go" data-v="yo" aria-label="Tu racha: ${rc} ${rc === 1 ? "día" : "días"}" style="width:auto;flex:none;white-space:nowrap;min-height:44px;padding:0 14px;gap:6px;border:1px solid var(--line);background:rgba(246,239,233,.06);color:var(--oroc);font-size:14px"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="#C8962E" d="M8 1.5c.4 2.2 3.5 3.7 3.5 7.2a3.5 3.5 0 0 1-7 0c0-1.3.6-2.3 1.4-3.1.2 1 .8 1.6 1.3 1.7C7 5.5 7.3 3.3 8 1.5z"/></svg>${rc} ${rc === 1 ? "día" : "días"}</button></div><h1>${h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches"}, ${esc(S.n)}</h1>
        <p style="margin-top:8px;display:flex;align-items:center;gap:8px;font-size:14px;line-height:20px;color:var(--ink2)"><span style="flex:none;width:10px;height:10px;border-radius:5px;background:${tp.c};box-shadow:0 0 0 1.5px rgba(246,239,233,.5)"></span>${tp.t}</p>
        ${deHoy()}
        <ol class="tl">
        ${item(hh.r ? "" : "now", !hh.r, 'data-a="ros"', hh.r ? "Ya lo rezaste hoy" : "Hoy, " + MIS[set].n.toLowerCase(), "Santo rosario", hh.r ? '<span class="ok">Hecho</span>' : `<span style="color:var(--teal)">${I.go}</span>`)}
        ${item("", false, 'data-a="go" data-v="ang"', hh.a ? "Ya lo rezaste hoy" : "A las 12:00, con campana", "Ángelus", hh.a ? '<span class="ok">Hecho</span>' : `<span style="color:var(--teal)">${I.bell}</span>`)}
        ${item("", false, 'data-a="go" data-v="nov"', nvTxt, "Novena de Guadalupe", `<span style="color:var(--ink2)">${I.go}</span>`)}
        <li><span class="nd">${starO(16, "rgba(244,220,166,.6)")}</span><div class="hero"><p class="ru">Cada quien desde donde está</p><h2>Rosario en familia</h2><p class="sub">Abre una sala, comparte el código y recen el mismo rosario al mismo tiempo.</p><button class="btn go sm" data-a="go" data-v="sala" style="margin-top:12px">Abrir la sala</button></div></li>
        </ol>${tabs("hoy")}</section>`;
    },
    rezar: () => {
      const d = now(), set = MIS_DIA[d.getDay()], hh = hoy(), nv = nov();
      const dias = { gozosos: ["Lun y sáb", "lunes y sábado"], luminosos: ["Jueves", "jueves"], dolorosos: ["Mar y vie", "martes y viernes"], gloriosos: ["Mié y dom", "miércoles y domingo"] };
      const ni = (k) => `<button class="ni${k === set ? " on" : ""}" data-a="ros" data-set="${k}" aria-label="${MIS[k].n}, ${dias[k][1]}${k === set ? ", los de hoy" : ""}"><span class="em">${EM[k]}</span><b>${MIS[k].n.replace("Misterios ", "").replace(/^./, (c) => c.toUpperCase())}</b><small>${k === set ? "Hoy" : dias[k][0]}</small></button>`;
      const row = (at, e, t, sm) => `<button class="row" ${at}><span class="md">${EM[e]}</span><span class="g"><b>${t}</b><small>${sm}</small></span>${I.go}</button>`;
      const nvTxt = nv.n ? `Hoy es el día ${nv.n} de 9` : nv.fiesta ? "Hoy es su fiesta" : nv.f === 1 ? "Empieza mañana" : "Empieza el 3 de diciembre";
      return `<section class="v d n tb in">${sky()}<h1 class="xl">Rezar</h1><p class="sub">Todo va guiado, cuenta por cuenta.</p>
        <div class="nicho"><i class="n1"></i><i class="n2"></i>${ARCO}
          <div class="nb"><span class="em">${EM[set]}</span><p class="ru">${hh.r ? "Ya lo rezaste hoy" : "Hoy, " + DIAS[d.getDay()].toLowerCase()}</p><h2>Santo rosario</h2><p class="ins">${MIS[set].n}</p>
          <button class="btn go" data-a="ros">${hh.r ? "Rezarlo otra vez" : "Empezar a rezar"}</button><button class="lk" data-a="go" data-v="sala">Rezarlo en familia</button></div></div>
        <p class="tit">Los cuatro misterios</p><div class="ret">${ni("gozosos")}${ni("luminosos")}${ni("dolorosos")}${ni("gloriosos")}</div>
        <p class="tit">${mis().length > 1 ? "Tus Vírgenes" : "Tu Virgen"}</p><div class="card">${mis().map((x) => `<button class="row" data-a="verv" data-k="${x.k}"><span class="md">${EMA[x.k]}</span><span class="g"><b>${advN(x)}</b><small>${x.k === delDia().k ? "Hoy te trae el mensaje del día" : "Su historia y su oración"}</small></span>${I.go}</button>`).join("")}<button class="row" data-a="advsel"><span class="g"><b style="font-size:16px">Elegir mis Vírgenes</b></span>${I.go}</button></div>
        <p class="tit">Devociones</p><div class="card">${row('data-a="go" data-v="vir"', "virgen", "Devociones a la Virgen", "Bajo tu amparo, Acordaos y más")}${row('data-a="go" data-v="ang"', "angelus", "Ángelus", hh.a ? "Ya lo rezaste hoy" : "A mediodía, con campana")}${row('data-a="go" data-v="nov"', "novena", "Novena de Guadalupe", nvTxt)}</div>${tabs("rezar")}</section>`;
    },
    ros: () => {
      const st = ros.p[ros.i], M = MIS[ros.set], o = ORA[st.t], mm = st.m != null ? M.m[st.m] : null, g = guia(), sigo = ros.sala && !lead;
      const cab = `<div class="hd z"><button class="ic" data-a="cerrar" aria-label="Cerrar el rosario">${I.x}</button><p class="ru">${M.n}</p><span class="ic r" style="font-size:13px;color:var(--txt2)">${ros.i + 1}/${ros.p.length}</span></div>`;
      const pie = (sigo ? `<p class="note c z mt" style="margin-bottom:6px">${esc((g && g.presence.n) || "Tu familia")} dirige. Tú respondes.</p>` : `<button class="btn go se mt z" data-a="sig">${st.t === "mis" ? "Continuar" : "Amén"}</button>`) + (ros.i > 0 && !sigo ? `<button class="lk c z" data-a="ant" style="margin-top:4px;color:var(--txt2)">Regresar una cuenta</button>` : "") + (ros.sala ? `<p class="note c z" style="margin-top:4px">En vivo: ${peersS.length} en la sala</p>` : "");
      if (st.t === "mis") return `<section class="v d">${sky()}${cab}<p class="c z" style="margin-top:12px;font-size:14px;font-weight:600;color:var(--txt2)">${ORD[st.m]} misterio</p><h1 class="c z" style="font-size:28px;line-height:34px">${mm[0]}</h1><p class="ru c z" style="margin-top:6px;font-size:16px">${mm[1]}</p><div class="ring z">${ring(ros.i)}</div><p class="pr c z" style="font-size:21px;line-height:29px">${mm[2]}</p>${pie}</section>`;
      return `<section class="v d">${sky()}${cab}<p class="c z" style="margin-top:8px;font-size:14px;font-weight:600;color:var(--txt2);min-height:20px">${mm ? ORD[st.m] + " misterio: " + mm[0] : st.t === "salve" ? "Para terminar" : "Para empezar"}</p>
        <div class="ring z">${ring(ros.i)}<div><b>${o.n}</b><span>${st.of ? st.k + " de " + st.of : "&nbsp;"}</span></div></div>
        <p class="pr z"><i>V/.</i> ${o.v}</p><p class="pr rr z"><i>R/.</i> ${o.r}</p>${st.x ? `<p class="ex z">${o.x}</p>` : ""}${pie}</section>`;
    },
    listo: () => { const lit = encendidos(), n = vivos().length; return `<section class="v d in">${sky()}${hd(["hoy", "x"], "México en oración")}<h1 class="c z" style="margin-top:14px;font-size:34px;line-height:40px">Tu veladora ya<br>está encendida</h1><p class="ru c z" style="margin-top:6px">${esc(estado(S.e))}</p><div class="z mapa-full"><div class="halo"></div>${mapa(lit, S.e, 1)}</div>
      <div class="z" style="display:flex;align-items:center;gap:16px;margin-top:4px"><p style="font-family:var(--se);font-weight:600;font-size:46px;line-height:48px;color:var(--oroc)">${racha()}</p><p class="sub" style="margin:0">${racha() === 1 ? "día seguido rezando. Mañana vuelve por el segundo." : "días seguidos rezando el rosario."}</p></div>
      ${n > 1 ? `<p class="note z" style="margin-top:12px">Ahora mismo hay ${n} personas con Atrio abierto.</p>` : ""}
      <button class="btn go mt z" data-a="go" data-v="hoy">Volver a hoy</button>${SB && !U ? `<button class="lk c z" data-a="login" style="margin-top:4px">Guardar mi avance con Google</button>` : `<button class="lk c z" data-a="copiar" style="margin-top:4px">Copiar invitación para mi familia</button>`}</section>`; },
    mapa: () => { const lit = encendidos(), n = vivos().length, r = hoy().r, mio = r && MX.e[S.e] ? 1 : 0, c = Object.keys(lit).filter((k) => MX.e[k]).length + (mio && !lit[S.e] ? 1 : 0), tot = Object.keys(lit).reduce((a, k) => a + (MX.e[k] ? lit[k] : 0), 0) + (mio && (!velasHoy || !lit[S.e]) ? 1 : 0); return `<section class="v d tb in">${sky()}<p class="ru z">México en oración</p><h1 class="z">${r ? "Tu veladora está encendida" : "Enciende tu estado"}</h1><p class="sub z">${r ? esc(estado(S.e)) + " brilla hoy por tu rosario." : "Cada rosario terminado enciende una veladora en " + esc(estado(S.e)) + "."}</p>
      <div class="z mapa-full"><div class="halo"></div>${mapa(lit, r ? S.e : -1, 1, `<div class="cuenta"><p class="num">${tot}</p><p>${tot === 1 ? "veladora encendida" : "veladoras encendidas"} ${velasHoy ? "hoy" : "ahora"}<br>${tot ? `en ${c} ${c === 1 ? "estado" : "estados"}` : "Enciende la primera."}${n > 1 ? `<br>${n} personas con Atrio abierto` : ""}</p></div>`)}</div>
      <p class="note z" style="margin-top:4px">${velasHoy ? "Cada veladora es un rosario terminado hoy en ese estado." : RM ? "El mapa muestra a quienes tienen Atrio abierto en este momento." : "En esta versión el mapa muestra tu veladora."}</p>
      ${r ? "" : `<button class="btn go z" style="margin-top:14px" data-a="ros">Rezar el rosario de hoy</button>`}${tabs("mapa", 1)}</section>`; },
    nov: () => { const nv = nov(), he = novHechos(); return `<section class="v d in">${sky()}${hd(["hoy"], "Del 3 al 11 de diciembre")}<h1 class="z" style="margin-top:10px">Novena de Guadalupe</h1><p class="sub z">${nv.n ? `Hoy es el día ${nv.n} de 9.` : nv.fiesta ? "Hoy es 12 de diciembre, su fiesta." : `Empieza el 3 de diciembre. ${nv.f === 1 ? "Falta un día" : "Faltan " + nv.f + " días"}; mientras, puedes leer cada día.`}</p>
      <div class="card z" style="margin-top:14px">${NOV.map((x, i) => `<button class="row" data-a="novd" data-n="${i + 1}"><span style="flex:none;width:30px;height:30px;border-radius:15px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;${he[i + 1] ? "background:var(--oro);color:var(--manto)" : nv.n === i + 1 ? "border:1.5px solid var(--oro);color:var(--oroc)" : "border:1px solid rgba(246,239,233,.28);color:#A3B6B5"}">${i + 1}</span><span class="g"><b>${x[0]}</b></span>${I.go}</button>`).join("")}</div></section>`; },
    novd: () => { const x = NOV[nd - 1], he = novHechos(); return `<section class="v d in">${sky()}${hd(["nov"], `Novena, día ${nd} de 9`)}<h1 class="z" style="margin-top:14px;font-size:34px;line-height:40px">${x[0]}</h1><p class="pr z" style="margin-top:16px;font-size:20px;line-height:29px">${x[1]}</p><p class="ru z" style="margin-top:22px">Para hoy</p><p class="z" style="margin-top:4px;font-size:17px;line-height:25px">${x[2]}</p>
      <button class="btn go mt z" data-a="ros" data-nov="${nd}">Rezar el rosario de este día</button><button class="btn gh z" data-a="novok" style="margin-top:8px">${he[nd] ? "Día rezado" : "Ya lo recé por mi cuenta"}</button></section>`; },
    ang: () => `<section class="v d in">${sky()}${hd(["hoy", "x"], "Mediodía")}<svg class="bell z" width="120" height="112" viewBox="0 0 160 150" aria-hidden="true" style="align-self:center"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#C99A45"/><stop offset=".38" stop-color="#F6E0AC"/><stop offset="1" stop-color="#D2A552"/></linearGradient></defs><path d="M72 36V30a8 8 0 0 1 16 0v6" fill="none" stroke="#E6C27A" stroke-width="3" stroke-linecap="round"/><path d="M66 36C58 40 55 52 55 64C55 82 49 95 36 104L124 104C111 95 105 82 105 64C105 52 102 40 94 36C89 33 71 33 66 36Z" fill="url(#bg)"/><path d="M43 98C60 102 100 102 117 98" fill="none" stroke="#9A7227" stroke-opacity=".55" stroke-width="1.4"/><path d="M80 104v6" stroke="#B88A3A" stroke-width="3" stroke-linecap="round"/><circle cx="80" cy="116" r="6.5" fill="#D9AE5C"/></svg>
      <h1 class="c z">El Ángelus</h1><div class="z" style="margin-top:6px">${ANG.map((a, i) => `<p class="pr" style="font-size:17px;line-height:24px;margin-top:${i ? 10 : 6}px"><i>V/.</i> ${a[0]}</p><p class="pr rr" style="font-size:17px;line-height:24px;margin-top:0"><i>R/.</i> ${a[1]}${i < 3 ? " <i>Ave María.</i>" : ""}</p>`).join("")}<p class="pr" style="font-size:16px;line-height:23px;margin-top:12px"><i>Oremos.</i> ${ANG_ORA}</p></div>
      <label class="card z" style="margin-top:14px;display:flex;align-items:center;gap:12px;min-height:56px;padding:8px 16px 8px 18px;cursor:pointer"><span style="flex:1;font-size:15px;line-height:21px;font-weight:600">Tocar la campana a las 12:00 si tengo Atrio abierto</span><span class="sw"><input type="checkbox" id="fa"${S.ang ? " checked" : ""}><span></span></span></label>
      <div class="z mt" style="display:flex;gap:10px;margin-top:14px"><button class="btn gh" data-a="bell" style="flex:1;min-height:56px">Oír la campana</button><button class="btn go se" data-a="angok" style="flex:1">Amén</button></div></section>`,
    vir: () => `<section class="v d in">${sky()}${hd(["rezar"], "Devociones a la Virgen")}<h1 class="z" style="margin-top:10px">Con María</h1><p class="sub z">Las oraciones de siempre a la Virgen, completas y a la mano.</p>${deHoy(" z")}
      <div class="card z" style="margin-top:14px"><button class="row" data-a="ros"><span class="g"><b>Santo rosario</b><small>${MIS[MIS_DIA[now().getDay()]].n}, cuenta por cuenta</small></span>${I.go}</button><button class="row" data-a="go" data-v="ang"><span class="g"><b>Ángelus</b><small>A mediodía, con campana</small></span>${I.go}</button><button class="row" data-a="go" data-v="nov"><span class="g"><b>Novena de Guadalupe</b><small>Del 3 al 11 de diciembre</small></span>${I.go}</button></div>
      <p class="ru z" style="margin:16px 0 6px;font-size:16px">Oraciones</p><div class="card z">${VIR.map((x, i) => `<button class="row" data-a="vird" data-n="${i}"><span class="g"><b>${x[0]}</b><small>${x[1]}</small></span>${I.go}</button>`).join("")}</div></section>`,
    vird: () => { const x = VIR[vn] || VIR[0]; return `<section class="v d in">${sky()}${hd(["vir"], "Devociones a la Virgen")}<h1 class="z" style="margin-top:14px;font-size:34px;line-height:40px">${x[0]}</h1><p class="ru z" style="margin-top:6px;font-size:16px">${x[1]}</p><p class="pr z" style="margin-top:18px;font-size:20px;line-height:30px">${x[2]}</p><div class="mt z" style="padding-top:24px"><button class="btn go se" data-a="go" data-v="vir">Amén</button></div></section>`; },
    yo: () => { const d = now(), y = d.getFullYear(), m = d.getMonth(), f = new Date(y, m, 1).getDay(), n = new Date(y, m + 1, 0).getDate(); let c = "DLMMJVS".split("").map((x) => `<span class="w">${x}</span>`).join("") + "<span></span>".repeat(f);
      for (let i = 1; i <= n; i++) { const k = key(new Date(y, m, i)), cl = i === d.getDate() ? "hoy" : (S.d[k] || {}).r ? "rez" : m === 11 && (i === 12 || i === 25) ? "fi" : ""; c += `<span>${cl ? `<i class="${cl}">${i}</i>` : i}</span>`; }
      return `<section class="v d n tb in">${sky()}<div class="hd" style="align-items:flex-start"><div><p class="ru">Tu bitácora</p><h1>${esc(S.n)}</h1></div><span aria-hidden="true" style="flex:none;margin-top:8px;width:44px;height:44px;border-radius:22px;background:var(--teal);color:var(--card);font-family:var(--se);font-size:22px;font-weight:600;display:flex;align-items:center;justify-content:center">${esc(S.n.slice(0, 1).toUpperCase())}</span></div>
      <div class="st"><div><b>${racha()}</b><span>${racha() === 1 ? "día seguido" : "días seguidos"}</span></div><div><b>${total()}</b><span>${total() === 1 ? "rosario rezado" : "rosarios rezados"}</span></div></div>
      <div class="card" style="margin-top:12px;padding:12px 12px 14px"><p class="ru" style="margin:0 6px 6px;font-size:16px">${MESES[m][0].toUpperCase() + MESES[m].slice(1)} de ${y}</p><div class="cal">${c}</div></div>
      <div class="card" style="margin-top:12px"><button class="row" data-a="go" data-v="nom"><span class="g"><b>Cambiar mi nombre o mi estado</b><small>${esc(estado(S.e))}</small></span>${I.go}</button><button class="row" data-a="advsel"><span class="g"><b>${mis().length > 1 ? "Mis Vírgenes" : "Mi Virgen"}</b><small>${mis().map((x) => x.c).join(", ")}</small></span>${I.go}</button><button class="row" data-a="copiar"><span class="g"><b>Invitar a mi familia</b><small>Copia un mensaje para WhatsApp</small></span>${I.go}</button></div>
      ${SB ? (U ? `<div class="card" style="margin-top:12px"><div class="row" style="cursor:default"><span class="g"><b>Tu avance está guardado</b><small>${esc(U.email || "Cuenta de Google")}</small></span><span class="ok">Listo</span></div><button class="row" data-a="logout"><span class="g"><b>Cerrar sesión</b></span>${I.go}</button></div>` : `<button class="btn te" data-a="login" style="margin-top:12px">Guardar mi avance con Google</button><p class="note" style="margin-top:8px">Sin cuenta, tu avance vive solo en este teléfono.</p>`) : `<p class="note" style="margin-top:12px">Tu avance se guarda solo en este dispositivo.</p>`}${tabs("yo")}</section>`; },
    sala: () => {
      const cab = sky() + hd(["hoy"], "Rosario en familia");
      if (!RM) return `<section class="v d in">${cab}<h1 class="z" style="margin-top:14px">Cada quien desde donde está</h1><p class="sub z" style="font-size:16px;line-height:24px">La sala en vivo todavía no está disponible desde este enlace. Mientras llega, pónganse de acuerdo en una hora y recen el mismo rosario cada quien en su teléfono.</p>
        <div class="card z" style="margin-top:18px;padding:16px 18px"><p class="ru">Hoy tocan</p><p style="font-family:var(--se);font-size:24px;line-height:30px;font-weight:600">${MIS[MIS_DIA[now().getDay()]].n}</p></div>
        <button class="btn go mt z" data-a="copiar">Copiar invitación para WhatsApp</button><button class="btn gh z" data-a="ros" style="margin-top:8px">Rezar ahora</button></section>`;
      if (!sala) return `<section class="v d in">${cab}<h1 class="z" style="margin-top:14px">Cada quien desde donde está</h1><p class="sub z">Abre una sala y comparte el código. Quien la abre dirige; los demás siguen la misma cuenta.</p>
        <button class="btn go z" data-a="crear" style="margin-top:22px">Abrir una sala</button>
        <label class="lab z" for="fc">Tengo un código</label><input class="fld z" id="fc" type="text" autocapitalize="characters" maxlength="5" placeholder="LUZ37" style="letter-spacing:6px;text-transform:uppercase"><button class="btn gh z" data-a="unir" style="margin-top:10px">Entrar a la sala</button></section>`;
      const g = guia(), set = MIS_DIA[now().getDay()];
      return `<section class="v d in">${cab}<p class="c z" style="margin-top:14px;font-size:14px;font-weight:600;color:var(--txt2)">Código de la sala</p><p class="code c z">${esc(codigo)}</p>
        <p class="ru z" style="margin:18px 0 6px;font-size:16px">${peersS.length === 1 ? "Estás tú. Comparte el código." : peersS.length + " conectados"}</p>
        <div class="card z">${peersS.map((p) => `<div class="row" style="cursor:default"><span class="av">${esc(((p.presence || {}).n || "?").slice(0, 1).toUpperCase())}</span><span class="g"><b>${esc((p.presence || {}).n || "Alguien")}${p.isMe ? " (tú)" : ""}</b><small>${esc(estado((p.presence || {}).e))}${(p.presence || {}).lead ? ", dirige" : ""}</small></span></div>`).join("")}</div>
        ${lead ? `<button class="btn go mt z" data-a="rosala">Empezar: ${MIS[set].n.toLowerCase()}</button>` : `<p class="note c mt z">${g ? "Esperando a que " + esc(g.presence.n || "quien dirige") + " empiece." : "Esperando a quien dirige."}</p>`}
        <button class="lk c z" data-a="salir" style="margin-top:4px">Salir de la sala</button></section>`;
    }
  };

  /* ---------- acciones ---------- */
  function aviso(t) { msg = t; render(); setTimeout(() => { msg = ""; const x = document.querySelector(".toast"); if (x) x.remove(); }, 2600); }
  function fin() { const s = ros; ros = null; marca("r"); enciende(); if (s && s.nov) { const y = now().getFullYear(); S.nov[y] = Object.assign(S.nov[y] || {}, { [s.nov]: 1 }); save(); } if (lead && sala) sala.presence({ fin: 1, on: 0 }).catch(() => {}); go("listo"); }
  function go(v) { if (v === "advs" && !sel.length) sel = S.vs.slice(); if (v === "adv" && /^(hoy|vir|yo|rezar)$/.test(view)) vuelve = view; view = V[v] ? v : "hoy"; if (v === "mapa") cargaVelas(); if (view === "ros" && !ros) view = "hoy"; if (!S.n && !/^(bien|nom|est)$/.test(view)) view = "bien"; try { if (/^(hoy|rezar|mapa|yo)$/.test(view)) history.replaceState(null, "", "#" + view); } catch (_) {} render(); try { window.scrollTo(0, 0); } catch (_) {} }
  function render() { despierta(view === "ros"); app.innerHTML = V[view]() + (msg ? `<div class="toast" role="status">${esc(msg)}</div>` : ""); }
  const A = {
    go: (d) => go(d.v),
    nom: () => { const v = (document.getElementById("fn").value || "").trim(); if (!v) { document.getElementById("fn").focus(); return; } S.n = v; save(); go("est"); },
    est: () => { S.e = parseInt(document.getElementById("fe").value, 10); save(); presLobby(); if (S.vs.length) go("hoy"); else { paso3 = 1; sel = []; go("advs"); } },
    advt: (d) => { if (!ADV.some((x) => x.k === d.k)) return; sel = sel.includes(d.k) ? sel.filter((k) => k !== d.k) : sel.concat(d.k); render(); },
    advsel: () => { sel = S.vs.slice(); go("advs"); },
    advok: () => { if (!sel.length) return; S.vs = ADV.filter((x) => sel.includes(x.k)).map((x) => x.k); S.v = S.vs[0]; save(); va = ""; if (paso3) paso3 = 2; go("adv"); },
    verv: (d) => { va = d.k; go("adv"); },
    entra: () => { paso3 = 0; go("hoy"); },
    ros: (d) => { ros = { set: d.set || MIS_DIA[now().getDay()], i: 0, nov: d.nov ? +d.nov : 0 }; ros.p = pasos(); if (Q.get("paso")) ros.i = Math.min(ros.p.length - 1, +Q.get("paso")); go("ros"); },
    rosala: () => { ros = { set: MIS_DIA[now().getDay()], i: 0, sala: 1 }; ros.p = pasos(); presSala(); go("ros"); },
    sig: () => { if (!ros) return; if (ros.i >= ros.p.length - 1) return fin(); ros.i++; presSala(); render(); try { window.scrollTo(0, 0); } catch (_) {} },
    ant: () => { if (ros && ros.i > 0) { ros.i--; presSala(); render(); } },
    cerrar: () => { const s = ros && ros.sala; ros = null; if (s) presSala(); go(s ? "sala" : "hoy"); },
    novd: (d) => { nd = +d.n; go("novd"); },
    vird: (d) => { vn = +d.n; go("vird"); },
    novok: () => { const y = now().getFullYear(); S.nov[y] = Object.assign(S.nov[y] || {}, { [nd]: 1 }); save(); go("nov"); },
    bell: () => bell(3),
    angok: () => { marca("a"); go("hoy"); },
    copiar: () => { const t = "Te invito a rezar el rosario conmigo en Atrio. Hoy tocan los " + MIS[MIS_DIA[now().getDay()]].n.toLowerCase() + "."; try { navigator.clipboard.writeText(t).then(() => aviso("Mensaje copiado. Pégalo en WhatsApp con el enlace."), () => aviso(t)); } catch (_) { aviso(t); } },
    crear: () => { const L = "ABCDEFGHJKLMNPQRSTUVWXYZ"; let c = ""; for (let i = 0; i < 3; i++) c += L[Math.floor(Math.random() * L.length)]; c += Math.floor(10 + Math.random() * 90); entrar(c, true); },
    unir: () => { const c = (document.getElementById("fc").value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, ""); if (c.length < 4) { document.getElementById("fc").focus(); return; } entrar(c, false); },
    salir: () => { salir(); go("hoy"); },
    login: () => { if (!SB) return; if (/FBAN|FBAV|FB_IAB|Instagram|TikTok|musical_ly|Snapchat|Line\//i.test(navigator.userAgent)) { aviso("Para entrar con Google, abre Atrio en Safari o Chrome."); return; } try { SB.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } }).then((r) => { if (r && r.error) aviso("No se pudo abrir Google. Intenta otra vez."); }, () => aviso("No se pudo abrir Google. Intenta otra vez.")); } catch (_) {} },
    logout: () => { if (SB) try { SB.auth.signOut().then(() => { U = null; render(); }, () => {}); } catch (_) {} }
  };
  document.addEventListener("click", (e) => { const t = e.target.closest ? e.target.closest("[data-a]") : null; if (t && A[t.dataset.a]) A[t.dataset.a](t.dataset); });
  document.addEventListener("change", (e) => { if (e.target && e.target.id === "fa") { S.ang = e.target.checked ? 1 : 0; save(); if (S.ang) bell(1); } });
  document.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target && e.target.id === "fn") A.nom(); });
  window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (/^(hoy|rezar|mapa|yo)$/.test(h) && h !== view && view !== "ros") go(h); });
  if (Q.get("demo") && Q.get("ob")) paso3 = 2;
  const h0 = Q.get("v") || location.hash.slice(1);
  if (h0 === "ros" && S.n) A.ros({}); else if (h0 === "novd" && S.n) { nd = +(Q.get("n") || 6); go("novd"); } else go(V[h0] ? h0 : "hoy");
})();
