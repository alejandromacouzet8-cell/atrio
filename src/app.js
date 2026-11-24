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
    mic: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>',
    mute: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M9 9V6a3 3 0 0 1 5.8-1.1M15 10v1a3 3 0 0 1-4.6 2.5M5.5 11a6.5 6.5 0 0 0 10.6 5M18.4 12.6c.1-.5.1-1 .1-1.6M12 17.5V21M4 4l16 16"/></svg>',
    cam: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><rect x="2.5" y="6.5" width="13" height="11" rx="2.5"/><path d="M15.5 10.5l5.5-3.2v9.4l-5.5-3.2z"/></svg>',
    camno: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6.5h5a2.5 2.5 0 0 1 2.5 2.5v3M15.5 15v.5a2 2 0 0 1-2 2H5A2.5 2.5 0 0 1 2.5 15V9a2.5 2.5 0 0 1 1.8-2.4M15.5 10.5l5.5-3.2v9.4l-3-1.7M3 3l18 18"/></svg>',
    nota: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V5.5l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/></svg>',
    notano: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="opacity:.75"><path d="M9 18V5.5l10-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="15.5" r="2.5"/><path d="M3.5 3.5l17 17" stroke-width="2"/></svg>',
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
  /* Silueta de María en línea dorada (original). Cada advocación suma sus atributos. */
  function figura(k) {
    const G = "#E6C27A", st = (x, y, e) => `<polygon transform="translate(${(x - 8 * e).toFixed(1)} ${(y - 8 * e).toFixed(1)}) scale(${e})" fill="#F4DCA6" points="${S16}"/>`;
    const brazosAbiertos = k === "milagrosa";
    let tras = "", sobre = "", pies = "", cab = "";
    const corona = (y) => `<path d="M51 ${y}l2-8 4 5 3-7 3 7 4-5 2 8z" fill="${G}" fill-opacity=".9" stroke="${G}" stroke-width="1" stroke-linejoin="round"/>`;
    if (k === "guadalupe") { let r = ""; for (let i = 0; i < 44; i++) { const a = (i / 44) * Math.PI * 2, rx = 52, ry = 92, l = i % 2 ? 7 : 12; r += `M${(60 + rx * Math.cos(a)).toFixed(1)} ${(104 + ry * Math.sin(a)).toFixed(1)}L${(60 + (rx + l) * Math.cos(a)).toFixed(1)} ${(104 + (ry + l) * Math.sin(a)).toFixed(1)}`; } tras = `<path d="${r}" stroke="${G}" stroke-opacity=".55" stroke-width="1.2" stroke-linecap="round"/>`; pies = `<path d="M36 194c8 10 40 10 48 0-8 5-40 5-48 0z" fill="${G}" fill-opacity=".85"/>`; sobre = st(40, 120, .32) + st(44, 152, .3) + st(80, 120, .32) + st(76, 152, .3) + st(38, 90, .28) + st(82, 90, .28); }
    else if (k === "fatima") { cab = corona(16); sobre = st(60, 178, .45); }
    else if (k === "lourdes") { sobre = `<path d="M48 112c8 3 16 3 24 0M58 112c-2 22-4 40-6 58M62 112c2 22 4 40 6 58" stroke="#9EC9E8" stroke-width="1.6" stroke-linecap="round"/><path d="M57 98c-5 14-6 28-4 40" stroke="${G}" stroke-width="1" stroke-dasharray="1 3" stroke-linecap="round"/>`; tras = `<circle cx="60" cy="40" r="26" stroke="${G}" stroke-opacity=".4"/>`; }
    else if (k === "carmen") { cab = corona(16); sobre = `<rect x="66" y="98" width="10" height="13" rx="1" fill="#3B2A22" stroke="${G}"/>${st(71, 104.5, .35)}`; }
    else if (k === "pilar") { pies = `<path d="M38 196h44M42 196v18M78 196v18M36 214h48M50 200v12M60 200v12M70 200v12" stroke="${G}" stroke-width="1.4"/>`; cab = corona(16); }
    else if (k === "dolores") { sobre = `<path d="M60 112c-6-6-14-1-9 6l9 8 9-8c5-7-3-12-9-6z" fill="#A8434F" stroke="${G}"/><path d="M44 104l28 26" stroke="${G}" stroke-width="1.4" stroke-linecap="round"/>`; }
    else if (k === "auxiliadora") { cab = corona(16); sobre = `<path d="M80 92v66" stroke="${G}" stroke-width="1.6" stroke-linecap="round"/>${st(80, 89, .45)}`; }
    else if (k === "milagrosa") { pies = `<path d="M30 196a30 12 0 0 1 60 0" fill="${G}" fill-opacity=".25" stroke="${G}"/>`; let r = ""; for (let i = 0; i < 5; i++) r += `M${30 + i * 3} ${118 + i * 7}l-10 ${14 + i}M${90 - i * 3} ${118 + i * 7}l10 ${14 + i}`; sobre = `<path d="${r}" stroke="${G}" stroke-opacity=".7" stroke-linecap="round"/>`; let e = ""; for (let i = 0; i < 12; i++) { const a = Math.PI + (i / 11) * Math.PI; e += st(60 + 30 * Math.cos(a), 40 + 30 * Math.sin(a), .26); } tras = e; }
    else { cab = corona(16); tras = `<circle cx="60" cy="40" r="26" stroke="${G}" stroke-opacity=".4"/>`; }
    if (k === "fatima" || k === "pilar" || k === "carmen" || k === "auxiliadora") tras += `<circle cx="60" cy="40" r="28" stroke="${G}" stroke-opacity=".35"/>`;
    const manos = brazosAbiertos ? `<path d="M50 84c-6 10-14 22-20 34M70 84c6 10 14 22 20 34" stroke="${G}" stroke-width="1.4" stroke-linecap="round"/>` : `<path d="M60 84l-5 17c3 3 7 3 10 0z" fill="${G}" fill-opacity=".9"/>`;
    return `<svg class="fig" viewBox="0 0 120 ${k === "pilar" ? 218 : 206}" fill="none" aria-hidden="true">${tras}
      <path d="M60 14C47 14 39 25 38 38c-1 12-4 22-9 36-8 26-12 66-14 122h90c-2-56-6-96-14-122-5-14-8-24-9-36C81 25 73 14 60 14z" fill="#13505A" stroke="${G}" stroke-width="1.4" stroke-linejoin="round"/>
      <path d="M50 64c-4 30-6 80-6 132h32c0-52-2-102-6-132z" fill="#1E6872" stroke="${G}" stroke-opacity=".5"/>
      <path d="M50 64C40 84 32 132 30 196M70 64c10 20 18 68 20 132" stroke="${G}" stroke-opacity=".55"/>
      <path d="M60 24c-9 0-13 9-12 18 1 10 6 16 12 16s11-6 12-16c1-9-3-18-12-18z" fill="#0C3B41" stroke="${G}" stroke-opacity=".7"/>
      ${manos}${sobre}${pies}${cab}</svg>`;
  }
  // Intenciones rápidas: un toque las agrega al cuadro de texto
  const PIS = ["Por mi familia", "Por mis papás", "Por un enfermo", "Por la paz en México", "Por mí"];
  const LOGO = em('<path d="M11 42V22a13 13 0 0 1 26 0v20M6 42h36"/>' + sp(24, 25, 0.95));
  const ARCO = `<svg class="nt" viewBox="0 0 346 173" aria-hidden="true"><defs><path id="arco" d="M21.3 173A151.7 151.7 0 0 1 324.7 173"/></defs><text><textPath href="#arco" startOffset="50%" text-anchor="middle">AVE · MARIA · GRATIA · PLENA</textPath></text><g fill="#E6C27A">${sp(16.5, 160, 0.5)}${sp(329.5, 160, 0.5)}</g></svg>`;

  /* ---------- estado guardado en este dispositivo ---------- */
  let S = { n: "", e: -1, d: {}, nov: {}, ang: 1 };
  try { const r = localStorage.getItem("atrio1"); if (r) S = Object.assign(S, JSON.parse(r)); } catch (_) {}
  // El acceso con Google se abre a todos con G_AB = "1"; mientras tanto solo lo ve quien entra una vez con ?google=1
  const G_AB = "__G__";
  if (Q.get("google")) { S.g = 1; try { localStorage.setItem("atrio1", JSON.stringify(S)); } catch (_) {} }
  let U = null, tNube = 0, lista = 0;
  const save = () => { try { localStorage.setItem("atrio1", JSON.stringify(S)); } catch (_) {} clearTimeout(tNube); tNube = setTimeout(nube, 1200); };
  if (Q.get("demo")) { S.n = S.n || "Lucía"; if (S.e < 0) S.e = 22; if (Q.get("adv")) S.vs = Q.get("adv").split(","); if (Q.get("pi") !== null) S.pi = Q.get("pi"); }
  if (!Array.isArray(S.vs)) S.vs = S.v ? [S.v] : [];
  if (typeof S.pi !== "string") S.pi = "";
  const conG = () => SB_URL.indexOf("http") === 0 && (G_AB === "1" || S.g === 1);
  // A quien no tiene cuenta se le invita a guardar. Mientras el servidor confirma la sesión se usa la pista
  // de si este teléfono ya entró antes: así el aviso no aparece ni desaparece de golpe al abrir.
  const pideG = () => conG() && !U && (lista === 1 || !pista);

  /* ---------- fechas y tiempo litúrgico ---------- */
  const FAKE = Q.get("fecha");
  const now = () => (FAKE ? new Date(FAKE + "T" + (Q.get("hora") || "10:00") + ":00") : new Date());
  const key = (d) => d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  const dia = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const add = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
  const hoy = () => S.d[key(now())] || {};
  if (Q.get("demo") && Q.get("r")) { const k0 = key(add(now(), -1)); S.d[k0] = Object.assign({}, S.d[k0] || {}, { r: 1 }); }
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
  // Paloma (dibujo propio): llega una vez al día a dejar el mensaje en su tarjeta
  const PALOMA = `<span class="dov" aria-hidden="true"><svg viewBox="0 0 72 56" fill="none"><g class="al2"><path d="M33 25C35 15 43 8 55 7C52.5 12 53 14 49.5 18C46.5 22 41 26 36 27Z" fill="#DDE7E2" stroke="#E6C27A" stroke-width="1" stroke-linejoin="round"/></g><path d="M11 27C12 22.5 18 21 21.5 23.5C30 22.5 40 25 47 28.5L62 24.5L57.5 30L65 32.5L57 34.5L61 40C50 39.5 40 40.5 31 38.5C23 37 15.5 34 12 30.5Z" fill="#F6EFE9" stroke="#E6C27A" stroke-width="1.1" stroke-linejoin="round"/><path d="M11.2 26.6L5.6 28.4L11.6 30Z" fill="#E6C27A"/><circle cx="15.2" cy="26.4" r=".85" fill="#0B3237"/><g class="al1"><path d="M26 27C25 16 30 6 43 2C42.5 8 44 11 41 16C45 14.5 46.5 16 45 19.5C42 24 37 28 31.5 29.5Z" fill="#F6EFE9" stroke="#E6C27A" stroke-width="1.1" stroke-linejoin="round"/></g><g class="carta"><g transform="rotate(-10 7 33.5)"><rect x=".8" y="29.2" width="12.4" height="8.6" rx="1.1" fill="#F6EFE9" stroke="#E6C27A"/><path d="M1.2 29.9l5.8 4.3 5.8-4.3" stroke="#E6C27A"/></g></g></svg></span>`;
  let palT = 0;
  const deHoy = (extra, hoyV) => { const a = delDia(), f = frase(a), el = hoyV && palT ? Date.now() - palT : 1e9, trae = el < 3800; return `${trae ? `<div class="frw" style="--t:-${el}ms">` : ""}<button class="fra${extra || ""}${trae ? " trae" : ""}" data-a="verv" data-k="${a.k}" aria-label="Mensaje del día, de ${advN(a)}. Ver su historia y su oración"><span class="fh"><span class="md">${EMA[a.k]}</span><span class="g"><span class="ru">${fiesta(a) ? "Mensaje del día" : "Hoy es su fiesta"}</span><b>${advN(a)}</b></span><span class="fl">${I.go}</span></span>${cita(f)}<small>${f[2]}</small><span class="fv">Ver su historia y su oración</span></button>${trae ? PALOMA + "</div>" : ""}`; };

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
  /* ---------- vibración: cada cuenta se siente en la mano ---------- */
  // Android usa la API de vibración. En iPhone (iOS 18 o posterior) el interruptor nativo da un toque al cambiar.
  const TOQUE = [0, 20, [30, 70, 30], [40, 80, 40, 80, 70]];
  function vibra(n) {
    if (S.vib === 0) return;
    try {
      if (navigator.vibrate) { navigator.vibrate(TOQUE[n] || 20); return; }
      if (!window.matchMedia || !window.matchMedia("(pointer: coarse)").matches) return;
      const uno = () => { try { const l = document.createElement("label"); l.setAttribute("aria-hidden", "true"); l.style.display = "none"; const x = document.createElement("input"); x.type = "checkbox"; x.setAttribute("switch", ""); l.appendChild(x); document.head.appendChild(l); l.click(); document.head.removeChild(l); } catch (_) {} };
      uno(); for (let k = 1; k < n; k++) setTimeout(uno, k * 130);
    } catch (_) {}
  }
  // un toque por cuenta, dos al cerrar la decena (Gloria) y tres al llegar a un misterio nuevo o a la Salve
  const vibraPaso = () => { const t = ros && ros.p[ros.i] ? ros.p[ros.i].t : ""; vibra(t === "mis" || t === "salve" ? 3 : t === "gl" ? 2 : 1); };
  let sono = "", tic = 0, WL = null;
  function despierta(on) {
    try {
      if (on) { if (!WL && navigator.wakeLock && document.visibilityState === "visible") navigator.wakeLock.request("screen").then((w) => { WL = w; w.addEventListener("release", () => { if (WL === w) WL = null; }); }, () => {}); }
      else if (WL) { const w = WL; WL = null; w.release().catch(() => {}); }
    } catch (_) {}
  }
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { despierta(view === "ros"); if (view === "mapa" || view === "listo") cargaVelas(); } });
  setInterval(() => { if (!document.hidden && SB) { if (view === "jt" && jtA) jtVer(jtA); else if (view === "hoy" && tic % 3 === 0) jtTodos(); } }, 20000);
  setInterval(() => { const d = now(); if (++tic % 3 === 0 && (view === "mapa" || view === "listo") && !document.hidden) cargaVelas(); if (S.ang && S.n && d.getHours() === 12 && d.getMinutes() < 10 && sono !== key(d) && !hoy().a && view !== "ros") { sono = key(d); bell(3); go("ang"); } }, 20000);

  /* ---------- sala y mapa en vivo (solo cuando la plataforma lo permite) ---------- */
  const SB_URL = "__SB_URL__", SB_KEY = "__SB_KEY__";
  let pista = /[?&]code=/.test(location.search) ? 1 : 0;
  try { if (localStorage.getItem("sb-" + new URL(SB_URL).hostname.split(".")[0] + "-auth-token")) pista = 1; } catch (_) {}
  let RM = null, peersL = [], sala = null, peersS = [], lead = false, codigo = "", SB = null, velasHoy = null;
  function sbRoom(cli) {
    // El servidor cierra el canal a quien manda más de 5 cambios de presencia en 30 s. Por eso la presencia
    // lleva solo lo que casi no cambia (quién está, quién dirige) y la cuenta del rosario viaja por "broadcast".
    const me = Math.random().toString(36).slice(2, 12), RAPIDO = { on: 1, i: 1, set: 1, fin: 1 };
    let marcas = [];
    const mk = (name) => {
      let ch = null, st = {}, subs = [], rtc = [], lento = {}, rapido = {}, deOtros = {}, ok = false, fuera = false, ultimo = "", llaves = "", tT = 0, tR = 0;
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
        // voz: los teléfonos se presentan por aquí y luego hablan directo entre ellos
        c.on("broadcast", { event: "rtc" }, (m) => { const q = m && m.payload; if (c === ch && q && q.de && q.de !== me && (!q.para || q.para === me)) rtc.forEach((f) => { try { f(q); } catch (_) {} }); });
        c.on("broadcast", { event: "st" }, (m) => { const q = m && m.payload; if (c === ch && q && q.k && q.k !== me) { deOtros[q.k] = q.s || {}; fire(); } });
        c.subscribe((x) => {
          if (c !== ch || fuera) return;
          if (x === "SUBSCRIBED") { ok = true; ultimo = ""; track(); di(); rtc.forEach((f) => { try { f({ t: "_listo" }); } catch (_) {} }); }
          else { ok = false; clearTimeout(tR); tR = setTimeout(() => { if (c === ch && !ok && !fuera) { try { cli.removeChannel(c); } catch (_) {} abre(); } }, 6000); }
        });
      };
      abre();
      const tB = setInterval(di, 5000);
      return {
        presence: (q) => { let l = 0, r = 0; Object.keys(q).forEach((k) => { const T = RAPIDO[k] ? rapido : lento, v = q[k]; if (v === null || v === undefined) { if (k in T) { delete T[k]; RAPIDO[k] ? r++ : l++; } } else if (T[k] !== v) { T[k] = v; RAPIDO[k] ? r++ : l++; } }); if (l) track(); if (r) { di(); fire(); } return Promise.resolve(); },
        onPeers: (fn) => { subs.push(fn); fire(); return () => {}; },
        yo: me,
        senal: (fn) => { rtc.push(fn); },
        manda: (q) => { if (ok && !fuera) try { ch.send({ type: "broadcast", event: "rtc", payload: Object.assign({ de: me }, q) }); } catch (_) {} },
        leave: () => { fuera = true; clearTimeout(tT); clearTimeout(tR); clearInterval(tB); try { cli.removeChannel(ch); } catch (_) {} return Promise.resolve(); }
      };
    };
    // Sin canal general: el mapa se arma con las veladoras guardadas, así solo abre conexión quien entra a una sala.
    return { presence: () => Promise.resolve(), onPeers: () => () => {}, join: (n) => Promise.resolve(mk(n)) };
  }
  function nube() { if (!SB || !U) return; try { SB.from("progreso").upsert({ user_id: U.id, datos: Object.assign({}, S, { cf: undefined }), actualizado: new Date().toISOString() }).then(() => {}, () => {}); } catch (_) {} }
  function sincroniza() {
    if (!SB || !U) return;
    try { SB.from("progreso").select("datos").eq("user_id", U.id).maybeSingle().then((r) => {
      const R = (r && r.data && r.data.datos) || null;
      if (R) { const d = Object.assign({}, R.d || {}); Object.keys(S.d).forEach((k) => { d[k] = Object.assign({}, d[k] || {}, S.d[k]); }); const nv = Object.assign({}, R.nov || {}); Object.keys(S.nov).forEach((y) => { nv[y] = Object.assign({}, nv[y] || {}, S.nov[y]); }); S.d = d; S.nov = nv; if (!S.n && R.n) S.n = R.n; if (!S.vs.length && (R.vs || R.v)) S.vs = R.vs || [R.v]; if (S.e < 0 && R.e >= 0) S.e = R.e; if (!S.pi && R.pi) S.pi = R.pi; }
      // quien ya tenía avance en su cuenta y abre un teléfono nuevo se salta la bienvenida
      const g = deG, vuelta = !!(S.n && S.e >= 0 && view === "bien"); deG = 0;
      if (vuelta) { ob = 0; delete S.ob; }
      try { localStorage.setItem("atrio1", JSON.stringify(S)); } catch (_) {} nube();
      if (vuelta) { go("hoy"); if (g) aviso("Listo. Aquí está tu avance."); return; }
      if (!/^(nom|est|sala|ros)$/.test(view)) render(1);
      if (g) aviso(S.n ? "Listo. Tu avance ya se guarda en tu cuenta." : "Esa cuenta todavía no tiene avance guardado. Toca Empezar para crearlo.");
    }, () => { if (/^(hoy|yo|listo|atrio|bien)$/.test(view)) render(1); }); } catch (_) {}
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
    const init = () => { try { SB = window.supabase.createClient(SB_URL, SB_KEY, { auth: { flowType: "pkce" } }); RM = sbRoom(SB); setTimeout(() => { jtTodos(); if (jtA && !S.jt.some((x) => x.id === jtA)) jtVer(jtA); }, 0);
      const sesion = (u) => { const cambia = (u && u.id) !== (U && U.id), p0 = pideG(); U = u; lista = 1; if (U && view === "entrar" && otpE === 0) { go(V[vuelveE] && vuelveE !== "entrar" ? vuelveE : "hoy"); } if (U && cambia) setTimeout(sincroniza, 0); else if ((cambia || p0 !== pideG()) && /^(hoy|yo|listo|atrio|bien)$/.test(view)) render(1); };
      try { SB.auth.getSession().then((r) => sesion((r && r.data && r.data.session && r.data.session.user) || null), () => sesion(null)); SB.auth.onAuthStateChange((_e, ses) => sesion((ses && ses.user) || null)); } catch (_) {} RM.onPeers((c) => { peersL = c.peers || []; if (view === "mapa" || view === "listo" || (view === "sala" && !sala)) render(); }); presLobby(); cargaVelas(); if (hoy().r) enciende(); if (view === "sala") render(); } catch (_) { RM = null; SB = null; } };
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
  /* ---------- voz en la sala: cada teléfono habla directo con los demás (WebRTC) ---------- */
  let VZ = null;
  const ICE = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:stun1.l.google.com:19302"] }] };
  const hayVoz = () => !!(sala && sala.manda && window.RTCPeerConnection && navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  const conVoz = () => peersS.filter((p) => p.presence && p.presence.v).length;
  const oidos = () => (VZ ? Object.keys(VZ.pcs).filter((k) => VZ.pcs[k].connectionState === "connected").length : 0);
  function cajaVoz() { let b = document.getElementById("voces"); if (!b) { b = document.createElement("div"); b.id = "voces"; b.style.display = "none"; document.body.appendChild(b); } return b; }
  const pinta = () => { if (view === "sala") render(1); else if (view === "ros") render(); };
  const vidT = (pc) => pc.getTransceivers().find((t) => t.receiver && t.receiver.track && t.receiver.track.kind === "video");
  // quién está hablando: se mide el volumen de cada voz y su círculo se ilumina
  function mide(id, ms) { if (!VZ || !VZ.ac) return; try { const src = VZ.ac.createMediaStreamSource(ms), an = VZ.ac.createAnalyser(); an.fftSize = 512; src.connect(an); VZ.an[id] = { an, b: new Uint8Array(512), h: 0 }; } catch (_) {} }
  function escucha() {
    if (!VZ) return; const t = Date.now();
    Object.keys(VZ.an).forEach((id) => { const x = VZ.an[id]; x.an.getByteTimeDomainData(x.b); let q = 0; for (let i = 0; i < x.b.length; i++) { const v = (x.b[i] - 128) / 128; q += v * v; } if (Math.sqrt(q / x.b.length) > 0.035 && !(id === (sala && sala.yo) && VZ.mudo)) x.h = t;
      app.querySelectorAll(`[data-p="${id}"]`).forEach((el) => el.classList.toggle("habla", t - x.h < 450)); });
  }
  function pegaVideos() {
    if (!VZ || !sala) return;
    app.querySelectorAll("video[data-v]").forEach((v) => { const id = v.dataset.v, ms = id === sala.yo ? VZ.camMs : VZ.rs[id]; if (ms && v.srcObject !== ms) { v.srcObject = ms; try { const r = v.play(); if (r && r.catch) r.catch(() => {}); } catch (_) {} } });
  }
  async function camara() {
    if (!VZ) return;
    if (VZ.cam) { VZ.cam.stop(); VZ.cam = null; VZ.camMs = null; Object.keys(VZ.pcs).forEach((k) => { const tv = vidT(VZ.pcs[k]); if (tv) tv.sender.replaceTrack(null).catch(() => {}); }); if (sala) sala.presence({ c: null }).catch(() => {}); pinta(); return; }
    let v;
    try { v = (await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 480 }, height: { ideal: 480 }, frameRate: { ideal: 15, max: 20 } } })).getVideoTracks()[0]; }
    catch (_) { aviso("Para usar la cámara, permítela para Atrio en tu navegador."); return; }
    if (!VZ) { v.stop(); return; }
    VZ.cam = v; VZ.camMs = new MediaStream([v]);
    Object.keys(VZ.pcs).forEach((k) => { const tv = vidT(VZ.pcs[k]); if (tv) tv.sender.replaceTrack(v).catch(() => {}); });
    if (sala) sala.presence({ c: 1 }).catch(() => {}); vibra(1); pinta();
  }
  // los participantes, como en una videollamada: círculo con inicial o con su cámara
  const tiles = (gr) => !sala ? "" : `<div class="ppl${gr ? " gr" : ""}">` + peersS.map((p) => { const pr = p.presence || {}, id = esc(p.peer), cam = pr.c && VZ && (p.isMe ? VZ.cam : VZ.rs[p.peer]); return `<div class="pp${pr.v ? " vz" : ""}${p.isMe ? " me" : ""}" data-p="${id}"><span class="cara">${cam ? `<video data-v="${id}" autoplay playsinline muted></video>` : `<b>${esc((pr.n || "?").slice(0, 1).toUpperCase())}</b>`}${pr.v === 2 ? `<i class="mm" aria-label="Sin micrófono">${I.mute}</i>` : pr.v ? "" : ""}</span><small>${esc(p.isMe ? "Tú" : (pr.n || "Alguien").split(" ")[0])}${pr.lead ? `<em>dirige</em>` : ""}</small></div>`; }).join("") + "</div>";
  // en el rosario la familia rodea las cuentas, como si rezaran en círculo
  const orbita = () => { const L = peersS.slice(0, 12), n = L.length; if (!n) return ""; const ab = Math.min(300, (n - 1) * 46), a0 = -90 - ab / 2, R = 132;
    return `<span class="orb">` + L.map((p, i) => { const pr = p.presence || {}, id = esc(p.peer), a = ((n === 1 ? -90 : a0 + (i * ab) / (n - 1)) * Math.PI) / 180, x = ((130 + R * Math.cos(a)) / 260) * 100, y = ((108 + R * Math.sin(a)) / 270) * 100, cam = pr.c && VZ && (p.isMe ? VZ.cam : VZ.rs[p.peer]);
      return `<span class="of${pr.v ? " vz" : ""}${p.isMe ? " me" : ""}${pr.lead ? " ld" : ""}" data-p="${id}" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%" title="${esc(p.isMe ? "Tú" : pr.n || "Alguien")}"><span class="cara">${cam ? `<video data-v="${id}" autoplay playsinline muted></video>` : `<b>${esc((pr.n || "?").slice(0, 1).toUpperCase())}</b>`}${pr.v === 2 ? `<i class="mm">${I.mute}</i>` : ""}</span></span>`; }).join("") + "</span>"; };
  function cuelga(id) { if (!VZ || !VZ.pcs[id]) return; try { VZ.pcs[id].close(); } catch (_) {} delete VZ.pcs[id]; delete VZ.cola[id]; delete VZ.rs[id]; delete VZ.an[id]; const a = document.getElementById("vz-" + id); if (a) { a.srcObject = null; a.remove(); } pinta(); }
  function par(id, ofrece) {
    if (!VZ) return null; if (VZ.pcs[id]) return VZ.pcs[id];
    const pc = new RTCPeerConnection(ICE); VZ.pcs[id] = pc; VZ.cola[id] = VZ.cola[id] || [];
    VZ.st.getAudioTracks().forEach((t) => pc.addTrack(t, VZ.st));
    // el canal de video se abre desde el principio, vacío; al prender la cámara solo se le pone la imagen
    if (ofrece) { const tv = pc.addTransceiver("video", { direction: "sendrecv" }); if (VZ.cam) tv.sender.replaceTrack(VZ.cam).catch(() => {}); }
    pc.onicecandidate = (e) => { if (e.candidate && sala) sala.manda({ para: id, t: "ice", d: e.candidate.toJSON ? e.candidate.toJSON() : e.candidate }); };
    pc.ontrack = (e) => {
      const ms = VZ.rs[id] || (VZ.rs[id] = new MediaStream()); if (!ms.getTracks().includes(e.track)) ms.addTrack(e.track);
      if (e.track.kind === "video") { e.track.onunmute = () => pegaVideos(); return; }
      let a = document.getElementById("vz-" + id); if (!a) { a = document.createElement("audio"); a.id = "vz-" + id; a.autoplay = true; a.setAttribute("playsinline", ""); cajaVoz().appendChild(a); }
      a.srcObject = ms; try { const r = a.play(); if (r && r.catch) r.catch(() => {}); } catch (_) {}
      mide(id, new MediaStream([e.track]));
    };
    pc.onconnectionstatechange = () => { const s = pc.connectionState; if (s === "failed" || s === "closed") cuelga(id); else if (s === "connected") { vibra(1); pinta(); } };
    if (ofrece) pc.createOffer().then((o) => pc.setLocalDescription(o)).then(() => { if (sala) sala.manda({ para: id, t: "offer", d: { type: pc.localDescription.type, sdp: pc.localDescription.sdp } }); }).catch(() => cuelga(id));
    return pc;
  }
  const vacia = (id) => { const pc = VZ && VZ.pcs[id]; if (!pc) return; (VZ.cola[id] || []).splice(0).forEach((c) => pc.addIceCandidate(c).catch(() => {})); };
  function senal(q) {
    if (!VZ || !sala) return;
    const id = q.de;
    if (q.t === "_listo") { sala.manda({ t: "hola" }); return; }
    // el de identificador menor llama; el otro contesta. Así cada par se conecta una sola vez.
    if (q.t === "hola") { if (!q.para) sala.manda({ para: id, t: "hola" }); if (sala.yo < id && !VZ.pcs[id]) par(id, true); return; }
    if (q.t === "adios") { cuelga(id); return; }
    if (q.t === "offer") { const pc = par(id, false); pc.setRemoteDescription(q.d).then(() => { const tv = vidT(pc); if (tv) { tv.direction = "sendrecv"; if (VZ && VZ.cam) tv.sender.replaceTrack(VZ.cam).catch(() => {}); } return pc.createAnswer(); }).then((a) => pc.setLocalDescription(a)).then(() => { vacia(id); sala.manda({ para: id, t: "answer", d: { type: pc.localDescription.type, sdp: pc.localDescription.sdp } }); }).catch(() => cuelga(id)); return; }
    if (q.t === "answer") { const pc = VZ.pcs[id]; if (pc && pc.signalingState === "have-local-offer") pc.setRemoteDescription(q.d).then(() => vacia(id)).catch(() => cuelga(id)); return; }
    if (q.t === "ice") { const pc = VZ.pcs[id]; if (!pc || !pc.remoteDescription) { (VZ.cola[id] = VZ.cola[id] || []).push(q.d); return; } pc.addIceCandidate(q.d).catch(() => {}); }
  }
  async function prendeVoz() {
    if (VZ || !hayVoz()) return;
    let st;
    try { st = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }); }
    catch (_) { aviso("Para hablar, permite el micrófono para Atrio en tu navegador."); return; }
    if (!sala) { st.getTracks().forEach((t) => t.stop()); return; }
    VZ = { st, pcs: {}, cola: {}, rs: {}, an: {}, mudo: 0, cam: null, camMs: null, ac: null };
    try { VZ.ac = new (window.AudioContext || window.webkitAudioContext)(); if (VZ.ac.state === "suspended") VZ.ac.resume(); } catch (_) {}
    mide(sala.yo, st); VZ.tk = setInterval(escucha, 140);
    if (!sala.vz) { sala.vz = 1; sala.senal(senal); }
    sala.presence({ v: 1 }).catch(() => {}); sala.manda({ t: "hola" }); vibra(2); despierta(true); pinta();
  }
  function apagaVoz(callado) {
    if (!VZ) return;
    if (sala) { sala.manda({ t: "adios" }); sala.presence({ v: null }).catch(() => {}); }
    Object.keys(VZ.pcs).forEach((id) => { try { VZ.pcs[id].close(); } catch (_) {} });
    VZ.st.getTracks().forEach((t) => t.stop()); if (VZ.cam) VZ.cam.stop(); clearInterval(VZ.tk); try { if (VZ.ac) VZ.ac.close(); } catch (_) {} VZ = null;
    if (sala) sala.presence({ c: null }).catch(() => {});
    const b = document.getElementById("voces"); if (b) b.innerHTML = "";
    despierta(view === "ros"); if (!callado) pinta();
  }
  // botones de voz, iguales en la sala y durante el rosario
  const botVoz = (chico) => {
    if (!hayVoz()) return "";
    if (!VZ) return `<button class="vzb${chico ? " ch" : ""}" data-a="voz">${I.mic}<span>${chico ? "Hablar" : "Hablar con la familia"}</span></button>`;
    const lb = VZ.mudo ? (chico ? "Silenciado" : "Te silenciaste") : oidos() ? "Te escuchan" : conVoz() > 1 ? "Conectando…" : chico ? "Micrófono abierto" : "Esperando a los demás";
    return `<span class="vzr${chico ? " ch" : ""}"><button class="vzb on${VZ.mudo ? " mu" : ""}" data-a="mudo" aria-pressed="${!VZ.mudo}">${VZ.mudo ? I.mute : I.mic}<span>${lb}</span></button><button class="vzb ic2${VZ.cam ? " on" : ""}" data-a="cam" aria-label="${VZ.cam ? "Apagar cámara" : "Encender cámara"}" aria-pressed="${!!VZ.cam}">${VZ.cam ? I.cam : I.camno}</button>${chico ? "" : `<button class="vzb" data-a="cuelga">Colgar</button>`}</span>`;
  };
  if (Q.get("demo") || Q.get("prueba")) window.atrioVoz = () => (VZ ? { mudo: VZ.mudo, pcs: Object.keys(VZ.pcs).map((k) => VZ.pcs[k].connectionState), audios: document.querySelectorAll("#voces audio").length } : null);
  /* ---------- rosario juntos: cada quien reza su misterio cuando puede, y el rosario del día se va llenando ---------- */
  if (!Array.isArray(S.jt)) S.jt = [];
  const JT = {}, UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  let jtA = "", jtErr = 0;
  const jtOk = () => SB_URL.indexOf("http") === 0;
  const jtHechos = (id) => ((JT[id] && JT[id].cuentas) || []).map((c) => c.m);
  const jtCon = (j) => { const d = JT[j.id]; if (j.con) return j.con; const g = d ? (d.gente || []).concat(d.creador).filter((x) => x && x !== S.n) : []; return g.length ? [...new Set(g)].slice(0, 3).join(", ") : "tu familia"; };
  const jtRacha = (id) => { const c = (JT[id] && JT[id].completos) || []; let n = 0, d = now(); if (!c.includes(key(d))) d = add(d, -1); while (c.includes(key(d))) { n++; d = add(d, -1); } return n; };
  function jtVer(id, pinta) {
    if (!SB || !UUID.test(id)) return Promise.resolve(null);
    return SB.rpc("juntos_ver", { j: id, d: key(now()) }).then((r) => {
      if (r && !r.error && r.data) { JT[id] = r.data; jtErr = 0;
        // si entre todos completaron el rosario de hoy y yo recé un misterio, mi veladora también se enciende
        if (jtHechos(id).length === 5 && (r.data.cuentas || []).some((c) => c.quien === S.n) && !hoy().r) { marca("r"); enciende(); }
      } else if (r && r.error) jtErr = 1;
      if (pinta !== false && /^(hoy|jt)$/.test(view)) render(1); return JT[id];
    }, () => { jtErr = 1; if (/^(jt)$/.test(view)) render(1); return null; });
  }
  const jtTodos = () => S.jt.forEach((j) => jtVer(j.id));
  const ligaJt = (id) => location.origin + location.pathname + "?j=" + id;
  const jtComparte = (id, txt) => { const t = txt + "\n" + ligaJt(id); if (navigator.share) { navigator.share({ text: t }).catch(() => {}); return; } try { window.open("https://wa.me/?text=" + encodeURIComponent(t), "_blank"); } catch (_) {} };
  /* ---------- rezar por alguien: se manda una luz por WhatsApp ---------- */
  const LQ = { am: ["un Ave María", "Ave María"], ros: ["un rosario", "Rosario"], vel: ["una veladora", "Veladora"] };
  let LUZ = null, luzQ = "am", luzPara = "", luzRe = 0;
  try { if (Q.get("luz")) { const j = JSON.parse(decodeURIComponent(escape(atob(Q.get("luz").replace(/-/g, "+").replace(/_/g, "/"))))); if (j && j.d && LQ[j.q]) LUZ = { d: String(j.d).slice(0, 40), p: String(j.p || "").slice(0, 40), q: j.q }; } } catch (_) {}
  const ligaLuz = (o) => { const b = btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); return location.origin + location.pathname + "?luz=" + b; };
  /* ---------- música de fondo: acordes lentos de órgano con eco de capilla, generados aquí ---------- */
  let MU = null;
  const MUS = [[62, 69, 74, 78, 81], [55, 67, 74, 79, 83], [59, 66, 71, 74, 78], [57, 64, 69, 74, 76], [57, 64, 69, 73, 76], [62, 69, 74, 78, 81], [55, 62, 71, 74, 79], [57, 64, 69, 73, 81]];
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  function acorde(t0, i) {
    if (!MU) return; const ac = MU.ac, d = 11;
    MUS[i % MUS.length].forEach((m, j) => { [["sine", 0, 1], ["triangle", 5, 0.6], ["sine", 1200, 0.18], ["sine", -1200, j === 0 ? 0.5 : 0]].forEach(([ty, dt, vol]) => {
      const o = ac.createOscillator(), g = ac.createGain(); o.type = ty; o.frequency.value = hz(m); o.detune.value = dt + (j % 2 ? 2 : -2);
      const v = (j === 0 ? 0.05 : 0.032) * vol; g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(v, t0 + 3.5); g.gain.setValueAtTime(v, t0 + d - 3.5); g.gain.linearRampToValueAtTime(0, t0 + d + 1.5);
      o.connect(g); g.connect(MU.in); o.start(t0); o.stop(t0 + d + 2); }); });
  }
  function musica(on) {
    if (on && !MU) {
      try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (_) {}
      let ac; try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { return; }
      const lp = ac.createBiquadFilter(), rv = ac.createConvolver(), seco = ac.createGain(), humedo = ac.createGain(), out = ac.createGain();
      lp.type = "lowpass"; lp.frequency.value = 2600; lp.Q.value = 0.4;
      // eco de capilla: ruido que se apaga en cinco segundos
      const n = ac.sampleRate * 5, b = ac.createBuffer(2, n, ac.sampleRate); for (let c = 0; c < 2; c++) { const x = b.getChannelData(c); for (let i = 0; i < n; i++) x[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 3.2); } rv.buffer = b;
      seco.gain.value = 0.45; humedo.gain.value = 0.9; out.gain.value = 0;
      lp.connect(seco); lp.connect(rv); rv.connect(humedo); seco.connect(out); humedo.connect(out); out.connect(ac.destination);
      MU = { ac, in: lp, out, i: 0, t: 0 }; if (ac.state !== "running") ac.resume().catch(() => {});
      // si el teléfono interrumpe el audio (llamada, otra app), se reanuda al volver
      ac.onstatechange = () => { if (MU && MU.ac === ac && ac.state !== "running" && ac.state !== "closed") ac.resume().catch(() => {}); };
      const t = ac.currentTime + 0.1; MU.t = t; acorde(t, 0); MU.i = 1; MU.t = t + 8;
      MU.k = setInterval(() => { if (!MU) return; while (MU.t < MU.ac.currentTime + 4) { acorde(MU.t, MU.i++); MU.t += 8; } }, 1000);
      volMu();
    } else if (!on && MU) { const m = MU; MU = null; clearInterval(m.k); try { m.out.gain.cancelScheduledValues(m.ac.currentTime); m.out.gain.setTargetAtTime(0, m.ac.currentTime, 0.6); } catch (_) {} setTimeout(() => { try { m.ac.close(); } catch (_) {} }, 3500); }
  }
  // más bajita cuando la familia habla por la sala
  function volMu() { if (!MU) return; const v = VZ ? 0.6 : 1.8; try { MU.out.gain.cancelScheduledValues(MU.ac.currentTime); MU.out.gain.setTargetAtTime(v, MU.ac.currentTime, 0.8); } catch (_) {} }
  if (Q.get("demo") || Q.get("prueba")) window.atrioMu = () => { if (!MU) return null; if (!MU.an) { MU.an = MU.ac.createAnalyser(); MU.out.connect(MU.an); } const b = new Float32Array(2048); MU.an.getFloatTimeDomainData(b); let q = 0; for (const v of b) q += v * v; return { st: MU.ac.state, rms: Math.sqrt(q / b.length) }; };
  const botMu = () => `<button class="ic r mu${S.mu ? " on" : ""}" data-a="mu" aria-label="${S.mu ? "Apagar la música" : "Poner música de fondo"}" aria-pressed="${!!S.mu}">${S.mu ? I.nota : I.notano}</button>`;
  const presSala = () => { if (sala) sala.presence({ n: S.n.slice(0, 24), e: S.e, lead: lead ? 1 : 0, on: ros && ros.sala ? 1 : 0, i: ros ? ros.i : 0, set: ros ? ros.set : "", fin: null }).catch(() => {}); };
  const guia = () => peersS.filter((p) => p.presence && p.presence.lead).sort((a, b) => (a.peer < b.peer ? -1 : 1))[0];
  async function entrar(code, crea) {
    if (!RM) return;
    try {
      codigo = code; lead = !!crea; sala = await RM.join("s-" + code.toLowerCase());
      sala.onPeers((c) => {
        peersS = c.peers || [];
        if (VZ) Object.keys(VZ.pcs).forEach((id) => { if (!peersS.some((p) => p.peer === id)) cuelga(id); });
        const g = guia();
        if (!lead && g && !g.isMe && g.presence.fin && ros && ros.sala) { fin(); return; }
        if (!lead && g && !g.isMe && g.presence.on) {
          if (!ros || !ros.sala || ros.set !== g.presence.set) { ros = { set: MIS[g.presence.set] ? g.presence.set : MIS_DIA[now().getDay()], i: 0, sala: 1 }; ros.p = pasos(); view = "ros"; }
          const i = Math.max(0, Math.min(ros.p.length - 1, g.presence.i | 0));
          if (i !== ros.i || view !== "ros") { ros.an = i < ros.i ? "at" : "sg"; ros.i = i; view = "ros"; vibraPaso(); }
          render(); ros.an = "";
        } else if (view === "sala") render();
      }, () => { sala = null; peersS = []; if (view === "sala") render(); });
      presSala(); render();
    } catch (_) { sala = null; render(); aviso("No se pudo abrir la sala. Intenta otra vez."); }
  }
  function salir() { apagaVoz(1); try { if (sala) sala.leave(); } catch (_) {} sala = null; peersS = []; lead = false; codigo = ""; }

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
    if (ros.jt) jtHechos(ros.jt.id).forEach((m) => { done["L" + m] = 1; for (let k = 1; k <= 10; k++) done["s" + m + "_" + k] = 1; });
    const cx = 130, cy = 108, R = 98, st = 360 / 56; let s = "";
    const bead = (id, x, y, r) => { const c = id === cur, d = done[id]; s += (c ? `<circle class="pu" cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r + 3}" fill="none" stroke="#F4DCA6" stroke-width="1.2"/>` : "") + `<circle${c ? ' class="cur"' : ""} cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${c ? r + 1.2 : r}" fill="${c ? "#FFF3D0" : d ? "#E6C27A" : "none"}" stroke="${d || c ? "none" : "rgba(244,220,166,.55)"}" stroke-width="1"/>`; };
    for (let m = 0; m < 5; m++) for (let k = 0; k <= 10; k++) { const a = ((90 + (m * 11 + k + 1) * st) * Math.PI) / 180; bead(k === 0 ? "L" + m : "s" + m + "_" + k, cx + R * Math.cos(a), cy + R * Math.sin(a), k === 0 ? 4.6 : 3); }
    const mc = cur === "M";
    s += `<polygon transform="translate(${cx - 8} ${cy + R - 8})" fill="${mc || i > 0 ? "#F4DCA6" : "none"}" stroke="rgba(244,220,166,.7)" stroke-width=".8" points="${S16}"/>` + (mc ? `<circle class="pu" cx="${cx}" cy="${cy + R}" r="11" fill="none" stroke="#F4DCA6" stroke-width="1.2"/>` : "");
    bead("p3", cx, cy + R + 14, 3); bead("p2", cx, cy + R + 23, 3); bead("p1", cx, cy + R + 32, 3); bead("p0", cx, cy + R + 42, 4.2);
    const xc = cur === "x" ? "#FFF3D0" : "#E6C27A";
    s += `<path d="M${cx} ${cy + R + 48}v13M${cx - 4.5} ${cy + R + 52}h9" stroke="${xc}" stroke-width="1.6" stroke-linecap="round"/>`;
    return `<svg width="260" height="262" viewBox="0 0 260 270" aria-hidden="true">${s}</svg>`;
  }
  const tabs = (on, dk) => `<nav class="tabs dk" aria-label="Secciones">` + [["hoy", "Hoy", I.sun], ["rezar", "Rezar", I.st], ["mapa", "Mapa", I.pin], ["yo", "Yo", I.yo]].map(([v, t, ic]) => `<button class="tab${on === v ? " on" : ""}" data-a="go" data-v="${v}"${on === v ? ' aria-current="page"' : ""}>${ic}${t}</button>`).join("") + "</nav>";
  const hd = (back, title, right) => `<div class="hd z"><button class="ic" data-a="go" data-v="${back[0]}" data-b="1" aria-label="${back[1] === "x" ? "Cerrar" : "Regresar"}">${back[1] === "x" ? I.x : I.back}</button><p class="ru">${title}</p>${right || '<span class="ic"></span>'}</div>`;
  const vivos = () => peersL.filter((p) => p.kind !== "agent");
  function encendidos() { if (velasHoy) return Object.assign({}, velasHoy); const lit = {}; vivos().forEach((p) => { const pr = p.presence || {}; if (pr.r && !p.isMe && MX.e[pr.e]) lit[pr.e] = (lit[pr.e] || 0) + 1; }); return lit; }

  /* ---------- pantallas ---------- */
  let view = "hoy", ros = null, nd = 1, vn = 0, msg = "", ob = 0, vuelve = "hoy", sel = [], deG = /[?&]code=/.test(location.search) ? 1 : 0;
  const V = {
    bien: () => `<section class="v d in">${sky()}<div class="hd z" style="justify-content:flex-start;gap:10px"><svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M6.5 24.5V13a7.5 7.5 0 0 1 15 0v11.5M3.5 24.5h21" stroke="#E6C27A" stroke-width="1.6" stroke-linecap="round"/><polygon transform="translate(8 8.2) scale(.75)" fill="#E6C27A" points="${S16}"/></svg><b style="font-family:var(--se);font-size:26px;font-weight:600">Atrio</b></div>${portal()}
      <p class="z" style="margin-top:14px;font-family:var(--se);font-style:italic;font-weight:500;font-size:33px;line-height:39px">¿No estoy yo aquí,<br>que soy tu madre?</p><p class="ru z" style="margin-top:8px;font-size:16px">Santa María de Guadalupe a san Juan Diego, 1531</p>
      <p class="sub z" style="margin-top:14px;font-size:16px;line-height:24px">Reza el rosario, la novena y el Ángelus, solo o con tu familia. No importa cuánto tiempo pasó.</p>
      <div class="mt z" style="padding-top:24px"><button class="btn go" data-a="empieza">Empezar</button>${conG() && !U ? `<button class="lk" data-a="login" style="display:block;margin:6px auto 0">Ya tengo cuenta</button>` : ""}</div></section>`,
    nom: () => `<section class="v d in">${sky()}${hd([ob ? "bien" : "yo"], ob ? "Paso 1 de 5" : "Tus datos")}<h1 class="z" style="margin-top:30px;font-size:34px;line-height:40px">¿Cómo te llamas?</h1><p class="sub z">Solo tu nombre de pila.</p>
      <label class="lab z" for="fn">Tu nombre</label><input class="fld z" id="fn" type="text" autocomplete="given-name" maxlength="24" value="${esc(S.n)}">
      <button class="btn go mt z" data-a="nom">Continuar</button></section>`,
    est: () => { const su = sugEst(), L = MX.e.map((e, i) => [i, e[0]]).concat([[99, "Fuera de México"]]), cab = `${sky()}${hd(["nom"], ob ? "Paso 2 de 5" : "Tus datos")}<h1 class="z" style="margin-top:${ob ? 30 : 10}px;font-size:34px;line-height:40px">¿Desde dónde rezas?</h1>`;
      // 1) una sola pregunta, si el teléfono sabe dónde está
      if (su !== null && !estAbre && S.e < 0) return `<section class="v d n in">${cab}<p class="sub z">Ahí se enciende tu veladora en el mapa.</p>
        <div class="esq z"><p class="ru">Parece que estás en</p><h2>${estado(su)}</h2><button class="btn go" data-a="esc" data-k="${su}">Sí, rezo desde aquí</button><button class="lk" data-a="esab" style="display:block;margin:6px auto 0">Estoy en otro estado</button></div></section>`;
      // 2) la lista: un toque elige y avanza
      return `<section class="v d n in">${cab}<p class="sub z">Toca tu estado. Ahí se enciende tu veladora en el mapa.</p>
      <input class="fld bus z" id="fb" type="search" placeholder="Busca tu estado" autocomplete="off" aria-label="Busca tu estado">
      <div class="esl z" id="esl">${L.map(([i, n]) => `<button class="es${S.e === i ? " on" : ""}" data-a="esc" data-k="${i}" data-n="${esc(sinAc(n))}"><span>${n}</span>${S.e === i ? `<i class="pal">${I.ok}</i>` : I.go}</button>`).join("")}<p class="note c" id="esn" hidden>No encontramos ese estado.</p></div></section>`; },
    advs: () => { const n = sel.length; return `<section class="v d in" style="padding-bottom:120px">${sky()}${hd([ob ? "est" : "adv"], ob ? "Paso 3 de 5" : "Tus Vírgenes")}<h1 class="z" style="margin-top:${ob ? 30 : 10}px;font-size:34px;line-height:40px">¿A qué Virgen le rezas?</h1><p class="sub z">Elige una o varias. Es la misma María, con el nombre que le dan en tu casa.</p>
      <div class="advg z">${ADV.map((a) => { const on = sel.includes(a.k); return `<button class="ni${on ? " on" : ""}" data-a="advt" data-k="${a.k}" aria-pressed="${on}" aria-label="${advN(a)}">${on ? `<span class="pal">${I.ok}</span>` : ""}<span class="em">${EMA[a.k]}</span><b>${a.c}</b><small>${a.f[0]} ${MESES[a.f[1] - 1].slice(0, 3)}</small></button>`; }).join("")}</div>
      <p class="note z" style="margin-top:18px">¿No está la tuya? Iremos sumando más advocaciones.</p>
      <div class="pie"><button class="btn go" data-a="advok"${n ? "" : " disabled"}>${n ? (n === 1 ? "Listo, elegí 1" : "Listo, elegí " + n) : "Elige al menos una"}</button></div></section>`; },
    adv: () => { const a = adv(), ff = fiesta(a), f = frase(a);
      return `<section class="v d in">${sky()}${hd([vuelve], "Tu Virgen")}
        ${mis().length > 1 ? `<div class="chips z">${mis().map((x) => `<button class="chip${x.k === a.k ? " on" : ""}" data-a="verv" data-k="${x.k}">${x.c}</button>`).join("")}</div>` : ""}
        <div class="nicho z"><i class="n1"></i><i class="n2"></i>${ARCO}<div class="nb"><span class="em">${EMA[a.k]}</span><p class="ru">${a.p}</p><h2>${a.c}</h2><p class="ins">${a.l}</p><p class="fie">${ff ? `Su fiesta es el ${a.f[0]} de ${MESES[a.f[1] - 1]}. ${ff === 1 ? "Es mañana." : "Faltan " + ff + " días."}` : "Hoy es su fiesta."}</p></div></div>
        <p class="tit z">${a.k === delDia().k ? "Mensaje del día" : "Su mensaje"}</p><div class="z c">${cita(f)}<p class="note" style="margin-top:8px">${f[2]}</p></div>
        <p class="tit z">Su historia</p>${a.h.map((x) => `<p class="his z">${x}</p>`).join("")}${a.fx ? `<p class="note z" style="margin-top:12px">${a.fx}</p>` : ""}
        <p class="tit z">Oración</p>${a.o[0] === "Oración" ? "" : `<p class="ru z c">${a.o[0]}</p>`}<p class="pr z c" style="font-size:20px;line-height:30px">${a.o[1]}</p>
        <div class="z" style="padding-top:28px"><button class="btn go" data-a="ros">Rezar el rosario de hoy</button><button class="lk" data-a="advsel" style="display:block;margin:4px auto 0">Elegir mis Vírgenes</button></div></section>`; },
    pid: () => `<section class="v d n in">${sky()}${hd([ob ? "advs" : "yo"], ob ? "Paso 4 de 5" : "Tu intención")}<h1 style="margin-top:${ob ? 30 : 10}px;font-size:34px;line-height:40px">¿Por quién vas a rezar?</h1><p class="sub">Cada rosario se ofrece por alguien. Escríbelo y te lo recordamos cada vez que reces. Solo tú lo ves.</p>
      <label class="ru" for="fi" style="display:block;margin-top:22px;font-size:15px">Tu intención</label><textarea class="fld ta" id="fi" rows="3" maxlength="140" placeholder="Por mi mamá, por mi abuelo que está enfermo…">${esc(S.pi)}</textarea>
      <div class="chips wr">${PIS.map((t, i) => `<button class="chip" data-a="pich" data-k="${i}">${t}</button>`).join("")}</div>
      <div style="padding-top:26px"><button class="btn go" data-a="piok">${ob ? "Continuar" : "Guardar"}</button>${ob ? `<button class="lk" data-a="pisk" style="display:block;margin:4px auto 0">Saltar este paso</button>` : ""}</div></section>`,
    entrar: () => { const nuevo = vuelveE === "bien";
      const G = `<svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>`;
      if (otpE >= 2) return `<section class="v d n in">${sky()}${hd(["entrar"], "Tu código")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">Revisa tu correo</h1><p class="sub">Te mandamos un código a <b style="color:var(--oroc)">${esc(correo)}</b>. Si no lo ves, busca en spam o en promociones.</p>
        <label class="ru" for="fk" style="display:block;margin-top:22px;font-size:15px">Código</label><input class="fld cod" id="fk" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="000000">
        <div style="padding-top:22px"><button class="btn go" data-a="otpok"${otpE === 3 ? " disabled" : ""}>${otpE === 3 ? "Entrando…" : "Entrar"}</button><button class="lk" data-a="otp" style="display:block;margin:6px auto 0">Mandar otro código</button><button class="lk" data-a="otpno" style="display:block;margin:0 auto">Usar otro correo</button></div></section>`;
      return `<section class="v d n in">${sky()}${hd([vuelveE === "entrar" ? "hoy" : vuelveE], nuevo ? "Ya tengo cuenta" : "Guardar mi avance")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">${nuevo ? "Entra a tu cuenta" : "Guarda tu avance"}</h1><p class="sub">${nuevo ? "Recupera tu racha, tus Vírgenes y tu intención." : "Así no pierdes tu racha ni tus veladoras si cambias de teléfono."}</p>
        <button class="btn gw" data-a="gg" style="margin-top:24px">${G}<span>Continuar con Google</span></button>
        ${OTP_ON ? `<p class="tit">o con tu correo, sin contraseña</p>
        <label class="ru" for="fm" style="display:block;font-size:15px">Tu correo</label><input class="fld" id="fm" type="email" inputmode="email" autocomplete="email" autocapitalize="off" placeholder="tucorreo@gmail.com" value="${esc(correo)}">
        <button class="btn go" data-a="otp" style="margin-top:14px"${otpE === 1 ? " disabled" : ""}>${otpE === 1 ? "Mandando…" : "Mandarme un código"}</button>
        <p class="note c" style="margin-top:12px">Te llega un código de un solo uso. No guardamos contraseñas.</p>` : ""}</section>`; },
    jnew: () => `<section class="v d n in">${sky()}${hd(["hoy"], "Rosario juntos")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">Recen juntos el rosario de cada día</h1>
      <ol class="jex"><li><b>Cada quien a su hora.</b> El rosario de hoy tiene cinco misterios; cada uno reza los que pueda.</li><li><b>Se va llenando solo.</b> Ves quién rezó cada misterio y cuántos faltan.</li><li><b>El último cierra.</b> Quien reza el quinto termina con la Salve y se enciende su veladora.</li></ol>
      <label class="ru" for="fj" style="display:block;margin-top:22px;font-size:15px">¿Con quién?</label><input class="fld" id="fj" maxlength="40" autocomplete="off" placeholder="Constanza, mi mamá…">
      <label class="ru" for="fji" style="display:block;margin-top:16px;font-size:15px">¿Por quién rezan? <span style="font-family:var(--sa);font-style:normal;font-size:13px;color:var(--txt2)">opcional</span></label><input class="fld" id="fji" maxlength="140" autocomplete="off" placeholder="Por nuestra familia…">
      <div style="padding-top:22px"><button class="btn go" data-a="jcrea">Crear e invitar por WhatsApp</button></div></section>`,
    jt: () => { const id = jtA, d = JT[id], j = S.jt.find((x) => x.id === id) || { id }, set = MIS_DIA[now().getDay()], M = MIS[set], hechos = d ? d.cuentas || [] : [], n = hechos.length, ra = jtRacha(id);
      if (!S.n) return `<section class="v d n in">${sky()}<div class="hd"><span></span><p class="ru">Rosario juntos</p><span></span></div><h1 style="margin-top:30px;font-size:34px;line-height:40px">${d ? esc(d.creador) + " te invitó a rezar el rosario juntos" : "Te invitaron a rezar el rosario juntos"}</h1><p class="sub">Cada quien reza su misterio cuando puede. Para que sepan quién rezó, ¿cómo te llamas?</p>
        <label class="ru" for="fn" style="display:block;margin-top:22px;font-size:15px">Tu nombre</label><input class="fld" id="fn" maxlength="24" autocomplete="given-name" placeholder="Tu nombre de pila"><div style="padding-top:22px"><button class="btn go" data-a="jnom">Entrar</button></div></section>`;
      const fila = (m) => { const c = hechos.find((x) => x.m === m), mm = M.m[m], h = c ? new Date(c.hecho) : null, yo = c && c.quien === S.n;
        return `<li class="jm${c ? " ok" : ""}"><span class="jb">${c ? `<b>${esc(c.quien.slice(0, 1).toUpperCase())}</b>` : `<i>${m + 1}</i>`}</span><span class="g"><span class="ru">${ORD[m]} misterio</span><b>${mm[0]}</b>${c ? `<small>${yo ? "Lo rezaste tú" : "Lo rezó " + esc(c.quien)}${h && !isNaN(h) ? ", " + String(h.getHours()).padStart(2, "0") + ":" + String(h.getMinutes()).padStart(2, "0") : ""}</small>` : ""}</span>${c ? `<span class="pal2">${I.ok}</span>` : `<button class="btn go sm jr" data-a="jtr" data-k="${m}">Rezar</button>`}</li>`; };
      return `<section class="v d n in">${sky()}${hd(["hoy"], "Rosario juntos")}<h1 style="margin-top:10px;font-size:32px;line-height:38px">Con ${esc(jtCon(j))}</h1>
        <p class="sub">Hoy, ${M.n.toLowerCase()}.${d && d.intencion ? "" : " Cada quien reza su misterio cuando puede."}</p>${d && d.intencion ? `<p class="pin">«${esc(d.intencion)}»</p>` : ""}
        ${!d ? `<p class="note" style="margin-top:20px">${jtErr ? "No pudimos cargar el rosario. Revisa tu internet." : "Cargando…"}</p>` : `
        <div class="jp"><div class="jpb"><i style="width:${n * 20}%"></i></div><p>${n === 5 ? "Completo" : n + " de 5"}</p></div>
        ${n === 5 ? `<div class="jok"><span class="em">${LOGO}</span><p class="ru">Su rosario de hoy está completo</p><p class="sub c" style="margin:2px 0 0">Mañana empieza uno nuevo.</p></div>` : ""}
        <ol class="jl">${[0, 1, 2, 3, 4].map(fila).join("")}</ol>
        ${ra > 1 ? `<p class="jra"><b>${ra}</b> días seguidos rezando juntos</p>` : ""}`}
        <div class="jbt"><button class="vzb" data-a="jtv">${I.cam}<span>Videollamada</span></button><button class="vzb" data-a="jtw">${n && n < 5 ? "Avisarles" : "Invitar"}</button></div>
        <p class="note c" style="margin-top:12px">Quien tenga la liga puede ver y rezar este rosario. Compártela solo con tu familia.</p></section>`; },
    luz: () => `<section class="v d n in">${sky()}${hd(["hoy"], "Rezar por alguien")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">¿Por quién rezaste?</h1><p class="sub">Le llega por WhatsApp con una paloma. Así sabe que alguien lo tuvo en su oración.</p>
      <label class="ru" for="fl" style="display:block;margin-top:22px;font-size:15px">Su nombre</label><input class="fld" id="fl" maxlength="40" autocomplete="off" placeholder="Constanza, mi mamá…" value="${esc(luzPara)}">
      <p class="ru" style="margin-top:22px;font-size:15px">Recé</p><div class="lq">${Object.keys(LQ).map((k) => `<button class="lqo${luzQ === k ? " on" : ""}" data-a="luzq" data-k="${k}" aria-pressed="${luzQ === k}"><span class="md">${k === "am" ? EM.virgen : k === "ros" ? EM.gozosos : LOGO}</span><b>${LQ[k][1]}</b></button>`).join("")}</div>
      <div class="lprev"><p class="ru">Así le va a llegar</p><p class="pin">${esc(S.n || "Tú")} rezó ${LQ[luzQ][0]} por ti</p></div>
      <div style="padding-top:22px"><button class="btn go" data-a="luzm">Enviar por WhatsApp</button></div></section>`,
    luzv: () => { const L = LUZ || { d: "Alguien", p: "", q: "am" };
      return `<section class="v d n in">${sky()}<div class="hd"><span></span><p class="ru">Atrio</p><span></span></div>
        ${luzRe ? "" : `<div class="lzd">${PALOMA.replace('class="dov"', 'class="dov fija"')}</div>`}
        <p class="ru c" style="margin-top:${luzRe ? 30 : 10}px">${L.p ? esc(L.p) + ", alguien pensó en ti" : "Alguien pensó en ti"}</p>
        <h1 class="c" style="font-size:36px;line-height:42px;margin-top:6px">${esc(L.d)} rezó ${LQ[L.q][0]} por ti</h1>
        ${luzRe === 1 ? `<div class="card" style="margin-top:24px;padding:18px 18px 6px"><p class="ru">Ave María</p><p class="pr"><i>V/.</i> ${ORA.am.v}</p><p class="pr rr"><i>R/.</i> ${ORA.am.r}</p></div><button class="btn go" data-a="luzok" style="margin-top:18px">Amén</button>`
        : luzRe === 2 ? `<p class="sub c" style="margin-top:22px">Rezaste por ${esc(L.d)}. ¿Le avisas?</p><button class="btn go" data-a="luzdev" style="margin-top:16px">Avisarle a ${esc(L.d)}</button><button class="lk" data-a="go" data-v="${S.n ? "hoy" : "bien"}" style="display:block;margin:6px auto 0">${S.n ? "Ir a Atrio" : "Conocer Atrio"}</button>`
        : `<p class="sub c" style="margin-top:14px">Devuélvele el gesto: reza un Ave María por ${esc(L.d)}. Toma menos de un minuto.</p><button class="btn go" data-a="luzam" style="margin-top:22px">Rezar por ${esc(L.d)}</button><button class="lk" data-a="go" data-v="${S.n ? "hoy" : "bien"}" style="display:block;margin:6px auto 0">${S.n ? "Ir a Atrio" : "Qué es Atrio"}</button>`}</section>`; },
    conf: () => { const k = S.cf, dd = k ? Math.max(0, Math.round((now() - new Date(k + "T12:00:00")) / 864e5)) : -1, f = k ? new Date(k + "T12:00:00") : null;
      const cuanto = dd < 0 ? "" : dd === 0 ? "Hoy" : dd === 1 ? "Ayer" : dd < 60 ? `Hace ${dd} días` : dd < 730 ? `Hace ${Math.round(dd / 30.4)} meses` : `Hace ${Math.floor(dd / 365)} años`;
      return `<section class="v d n in">${sky()}${hd(["yo"], "Confesión")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">Tu última confesión</h1><p class="sub">Solo tú lo ves. Se queda en este teléfono y no se guarda en tu cuenta.</p>
      ${k ? `<div class="cfd"><p class="ru">${cuanto}</p><p class="ins">${f.getDate()} de ${MESES[f.getMonth()]} de ${f.getFullYear()}</p></div>` : `<p class="sub" style="margin-top:22px">¿Cuándo fue? Si no te acuerdas, pon una fecha aproximada.</p>`}
      <div class="cfb"><button class="btn go" data-a="cfhoy">Me confesé hoy</button><label class="ru" for="fcd" style="display:block;margin-top:16px;font-size:15px">${k ? "Cambiar la fecha" : "Otra fecha"}</label><input class="fld" id="fcd" type="date" max="${key(now())}" value="${k || ""}"></div>
      <p class="tit">Antes de confesarte</p>
      <div class="card exa">${EXA.map(([t, q]) => `<p class="ru">${t}</p><ul>${q.map((x) => `<li>${x}</li>`).join("")}</ul>`).join("")}</div>
      <p class="tit">Cómo confesarte</p><ol class="card pasos">${CFP.map((x) => `<li>${x}</li>`).join("")}</ol>
      <p class="tit">Acto de contrición</p><div class="card" style="padding:16px 18px"><p class="pr" style="margin:0">${CONTRI}</p></div>
      <p class="note c" style="margin-top:14px">Preguntas sencillas para prepararte; tu sacerdote te puede guiar mejor.</p></section>`; },
    atrio: () => { const vs = mis(), g = pideG();
      return `<section class="v d n in" style="padding-bottom:${g ? 176 : 128}px">${sky()}${hd(["pid"], "Paso 5 de 5")}
        <div class="nicho"><i class="n1"></i><i class="n2"></i>${ARCO}<div class="nb"><span class="em">${LOGO}</span><p class="ru">Tu atrio está listo</p><h2>${esc(S.n)}</h2><p class="ins">${esc(estado(S.e))}</p></div></div>
        <p class="tit">${vs.length > 1 ? "Tus Vírgenes" : "Tu Virgen"}</p><div class="meds">${vs.map((a) => `<span class="med"><span class="md">${EMA[a.k]}</span><small>${a.c}</small></span>`).join("")}</div>
        ${S.pi ? `<p class="tit">Tu intención</p><p class="ci c pin">«${esc(S.pi)}»</p>` : ""}
        <p class="sub c" style="margin-top:24px">${g ? "Guárdalo con tu cuenta de Google para no perderlo si cambias de teléfono." : `Hoy se rezan los ${MIS[MIS_DIA[now().getDay()]].n.toLowerCase()}.${U ? " Tu avance se guarda en tu cuenta." : ""}`}</p>
        <div class="pie">${g ? `<button class="btn go" data-a="login">Guardar con Google</button><button class="lk" data-a="entra" style="display:block;margin:4px auto 0">Ahora no</button>` : `<button class="btn go" data-a="entra">Entrar a Atrio</button>`}</div></section>`; },
    hoy: () => {
      const d = now(), h = d.getHours(), tp = tiempo(d), set = MIS_DIA[d.getDay()], nv = nov(), hh = hoy(), rc = racha();
      const nvTxt = nv.n ? `Día ${nv.n} de 9` : nv.fiesta ? "Hoy es su fiesta" : nv.f === 1 ? "Empieza mañana" : `Empieza el 3 de diciembre, faltan ${nv.f} días`;
      const item = (cls, on, a, ru, t, right) => `<li><span class="nd">${on ? star(16, "#C8962E") : starO(16, "rgba(244,220,166,.6)")}</span><button class="it ${cls}" ${a}><span class="g"><span class="ru" style="display:block">${ru}</span><b>${t}</b></span>${right}</button></li>`;
      return `<section class="v d n tb in">${sky()}<div class="hd"><p class="ru">${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}</p>
        <button class="btn" data-a="go" data-v="yo" aria-label="Tu racha: ${rc} ${rc === 1 ? "día" : "días"}" style="width:auto;flex:none;white-space:nowrap;min-height:44px;padding:0 14px;gap:6px;border:1px solid var(--line);background:rgba(246,239,233,.06);color:var(--oroc);font-size:14px"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="#C8962E" d="M8 1.5c.4 2.2 3.5 3.7 3.5 7.2a3.5 3.5 0 0 1-7 0c0-1.3.6-2.3 1.4-3.1.2 1 .8 1.6 1.3 1.7C7 5.5 7.3 3.3 8 1.5z"/></svg>${rc} ${rc === 1 ? "día" : "días"}</button></div><h1>${h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches"}, ${esc(S.n)}</h1>
        <p style="margin-top:8px;display:flex;align-items:center;gap:8px;font-size:14px;line-height:20px;color:var(--ink2)"><span style="flex:none;width:10px;height:10px;border-radius:5px;background:${tp.c};box-shadow:0 0 0 1.5px rgba(246,239,233,.5)"></span>${tp.t}</p>
        ${pideG() && total() > 0 ? `<button class="avi" data-a="login">Tu avance vive solo en este teléfono. <u>Guardar con Google</u></button>` : ""}
        ${deHoy("", 1)}
        <ol class="tl">
        ${item(hh.r ? "" : "now", !hh.r, 'data-a="ros"', hh.r ? "Ya lo rezaste hoy" : "Hoy, " + MIS[set].n.toLowerCase(), "Santo rosario", hh.r ? '<span class="ok">Hecho</span>' : `<span style="color:var(--teal)">${I.go}</span>`)}
        ${item("", false, 'data-a="go" data-v="ang"', hh.a ? "Ya lo rezaste hoy" : "A las 12:00, con campana", "Ángelus", hh.a ? '<span class="ok">Hecho</span>' : `<span style="color:var(--teal)">${I.bell}</span>`)}
        ${item("", false, 'data-a="go" data-v="nov"', nvTxt, "Novena de Guadalupe", `<span style="color:var(--ink2)">${I.go}</span>`)}
        ${jtOk() ? (S.jt.length ? S.jt.slice(0, 3).map((j) => { const d = JT[j.id], c = d ? d.cuentas || [] : [], n = c.length, ot = c.filter((x) => x.quien !== S.n).sort((a, b) => (a.hecho < b.hecho ? 1 : -1))[0];
          return `<li><span class="nd">${n === 5 ? star(16, "#C8962E") : starO(16, "rgba(244,220,166,.6)")}</span><button class="it${n && n < 5 ? " now" : ""}" data-a="jabre" data-k="${j.id}"><span class="g"><span class="ru" style="display:block">${ot && n < 5 ? esc(ot.quien) + " rezó el " + ORD[ot.m].toLowerCase() + " misterio" : "Rosario juntos, con " + esc(jtCon(j))}</span><b>${n === 5 ? "Completo hoy" : d ? `Van ${n} de 5 misterios` : "Rosario juntos"}</b></span>${n === 5 ? '<span class="ok">Hecho</span>' : `<span class="jmini">${[0, 1, 2, 3, 4].map((m) => `<i${c.some((x) => x.m === m) ? ' class="on"' : ""}></i>`).join("")}</span>`}</button></li>`; }).join("")
          : `<li><span class="nd">${starO(16, "rgba(244,220,166,.6)")}</span><button class="it" data-a="jnew"><span class="g"><span class="ru" style="display:block">Cada quien a su hora</span><b>Rezar el rosario con alguien</b></span><span style="color:var(--teal)">${I.go}</span></button></li>`) : ""}
        <li><span class="nd">${starO(16, "rgba(244,220,166,.6)")}</span><button class="it" data-a="luzn"><span class="g"><span class="ru" style="display:block">Mándale una luz</span><b>Rezar por alguien</b></span><span style="color:var(--teal)">${I.go}</span></button></li>
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
      const st = ros.p[ros.i], M = MIS[ros.set], o = ORA[st.t], mm = st.m != null ? M.m[st.m] : null, g = guia(), sigo = ros.sala && !lead, cl = (ros.sala ? " sl" : "") + (ros.an ? " " + ros.an : "");
      const cab = `<div class="hd z"><button class="ic" data-a="cerrar" aria-label="Cerrar el rosario">${I.x}</button><p class="ru">${M.n}<small class="cnt">${ros.i + 1} de ${ros.p.length}</small></p>${botMu()}</div>`;
      // La barra de abajo queda fija: «Amén» siempre está en el mismo lugar y el pulgar lo encuentra sin mirar
      const pie = `<div class="rpie">${ros.sala ? `<div class="vzl"><p class="note">${peersS.length === 1 ? "Solo tú" : peersS.length + " rezando"}</p>${botVoz(1)}</div>` : ""}${sigo ? `<p class="rs">${esc((g && g.presence.n) || "Tu familia")} dirige. Tú respondes.</p>` : `<div class="rb"><button class="ra" data-a="ant" aria-label="Regresar una cuenta"${ros.i > 0 ? "" : " disabled"}>${I.back}</button><button class="btn go se" data-a="sig">${st.t === "mis" ? "Continuar" : "Amén"}</button></div>`}</div>`;
      const gente = "", orb = ros.sala ? orbita() : "";
      if (st.t === "mis") return `<section class="v d ro mi${cl}">${sky()}${cab}${gente}<div class="rt z"><p class="c" style="margin-top:12px;font-size:14px;font-weight:600;color:var(--txt2)">${ORD[st.m]} misterio</p><h1 class="c" style="font-size:28px;line-height:34px">${mm[0]}</h1><p class="ru c" style="margin-top:6px;font-size:16px">${mm[1]}</p></div><div class="ring z">${ring(ros.i)}${orb}</div><div class="rt z"><p class="pr c" style="font-size:21px;line-height:29px">${mm[2]}</p></div>${pie}</section>`;
      return `<section class="v d ro${cl}">${sky()}${cab}${gente}<p class="rl z">${mm ? ORD[st.m] + " misterio: " + mm[0] : (ros.jt && JT[ros.jt.id] && JT[ros.jt.id].intencion) ? `<span><small>Su intención</small><em>«${esc(JT[ros.jt.id].intencion)}»</em></span>` : S.pi ? `<span><small>Tu intención</small><em>«${esc(S.pi)}»</em></span>` : st.t === "salve" ? "Para terminar" : "Para empezar"}</p>
        <div class="ring z">${ring(ros.i)}${orb}<div><b>${o.n}</b><span>${st.of ? st.k + " de " + st.of : "&nbsp;"}</span></div></div>
        <div class="rt z"><p class="pr"><i>V/.</i> ${o.v}</p><p class="pr rr"><i>R/.</i> ${o.r}</p>${st.x ? `<p class="ex">${o.x}</p>` : ""}</div>${pie}</section>`;
    },
    listo: () => { const lit = encendidos(), n = vivos().length, ra = racha(), hito = total() <= 1 ? 1 : [3, 7, 14, 30, 60, 100, 200, 365].includes(ra) ? 2 : 0; return `<section class="v d in">${sky()}${hd(["hoy", "x"], "México en oración")}<h1 class="c z" style="margin-top:14px;font-size:34px;line-height:40px">Tu veladora ya<br>está encendida</h1><p class="ru c z" style="margin-top:6px">${esc(estado(S.e))}</p>${S.pi ? `<p class="pin c z">Lo ofreciste «${esc(S.pi)}»</p>` : ""}<div class="z mapa-full"><div class="halo"></div>${mapa(lit, S.e, 1)}</div>
      <div class="z" style="display:flex;align-items:center;gap:16px;margin-top:4px"><p style="font-family:var(--se);font-weight:600;font-size:46px;line-height:48px;color:var(--oroc)">${racha()}</p><p class="sub" style="margin:0">${racha() === 1 ? "día seguido rezando. Mañana vuelve por el segundo." : "días seguidos rezando el rosario."}</p></div>
      ${n > 1 ? `<p class="note z" style="margin-top:12px">Ahora mismo hay ${n} personas con Atrio abierto.</p>` : ""}
      ${pideG() && hito ? `<div class="gua z"><p class="ru">${hito === 1 ? "No la pierdas" : "No los pierdas"}</p><p class="sub" style="margin:2px 0 12px">${hito === 1 ? "Tu veladora y tu racha viven solo en este teléfono. Guárdalas con tu cuenta de Google." : `Tus ${ra} días seguidos viven solo en este teléfono. Guárdalos con tu cuenta de Google.`}</p><button class="btn go" data-a="login">Guardar con Google</button></div><button class="btn gh z" data-a="go" data-v="hoy" style="margin-top:10px">Volver a hoy</button>` : `<button class="btn go mt z" data-a="go" data-v="hoy">Volver a hoy</button>`}<button class="btn gh z" data-a="luzn" data-q="ros" style="margin-top:10px">Avisarle a alguien que recé por él</button><button class="lk c z" data-a="copiar" style="margin-top:4px">Copiar invitación para mi familia</button></section>`; },
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
      <div class="card" style="margin-top:12px"><button class="row" data-a="go" data-v="nom"><span class="g"><b>Cambiar mi nombre o mi estado</b><small>${esc(estado(S.e))}</small></span>${I.go}</button><button class="row" data-a="advsel"><span class="g"><b>${mis().length > 1 ? "Mis Vírgenes" : "Mi Virgen"}</b><small>${mis().map((x) => x.c).join(", ")}</small></span>${I.go}</button><button class="row" data-a="go" data-v="pid"><span class="g"><b>Por quién rezo</b><small>${S.pi ? esc(S.pi) : "Escribe tu intención"}</small></span>${I.go}</button>${jtOk() ? `<button class="row" data-a="jnueva"><span class="g"><b>Rosario juntos</b><small>${S.jt.length ? "Crear otro con alguien más" : "Reza por misterios con tu pareja o familia"}</small></span>${I.go}</button>` : ""}<button class="row" data-a="go" data-v="conf"><span class="g"><b>Mi última confesión</b><small>${S.cf ? (() => { const n = Math.max(0, Math.round((now() - new Date(S.cf + "T12:00:00")) / 864e5)); return n === 0 ? "Hoy" : n === 1 ? "Ayer" : n < 60 ? "Hace " + n + " días" : "Hace " + Math.round(n / 30.4) + " meses"; })() : "Solo tú la ves"}</small></span>${I.go}</button><label class="row"><span class="g"><b>Música de fondo al rezar</b><small>Órgano suave, como en una capilla</small></span><span class="sw"><input type="checkbox" id="fmu"${S.mu ? " checked" : ""}><span></span></span></label><label class="row"><span class="g"><b>Vibración al rezar</b><small>Un toque en cada cuenta, más fuerte en cada misterio</small></span><span class="sw"><input type="checkbox" id="fv"${S.vib !== 0 ? " checked" : ""}><span></span></span></label><button class="row" data-a="copiar"><span class="g"><b>Invitar a mi familia</b><small>Copia un mensaje para WhatsApp</small></span>${I.go}</button></div>
      ${U ? `<div class="card" style="margin-top:12px"><div class="row" style="cursor:default"><span class="g"><b>Tu avance está guardado</b><small>${esc(U.email || "Cuenta de Google")}</small></span><span class="ok">Listo</span></div><button class="row" data-a="logout"><span class="g"><b>Cerrar sesión</b></span>${I.go}</button></div>` : !conG() ? `<p class="note" style="margin-top:12px">Tu avance se guarda solo en este dispositivo.</p>` : pideG() ? `<button class="btn te" data-a="login" style="margin-top:12px">Guardar con Google</button><p class="note" style="margin-top:8px">Sin cuenta, tu avance vive solo en este teléfono.</p>` : ""}${tabs("yo")}</section>`; },
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
        <div class="z">${tiles(1)}</div><div class="card z" hidden>${peersS.map((p) => `<div class="row" style="cursor:default"><span class="av">${esc(((p.presence || {}).n || "?").slice(0, 1).toUpperCase())}</span><span class="g"><b>${esc((p.presence || {}).n || "Alguien")}${p.isMe ? " (tú)" : ""}</b><small>${esc(estado((p.presence || {}).e))}${(p.presence || {}).lead ? ", dirige" : ""}</small></span>${(p.presence || {}).v ? `<span class="vzi" aria-label="Con voz">${I.mic}</span>` : ""}</div>`).join("")}</div>
        ${hayVoz() ? `<div class="vzc z">${botVoz()}<p class="note">${VZ ? (conVoz() > 1 ? `${conVoz()} con voz. Usa audífonos para que no haya eco.` : "Eres el primero con voz. Cuando otro toque Hablar, se van a escuchar.") : conVoz() ? `${conVoz() === 1 ? "1 persona habla" : conVoz() + " personas hablan"} en la sala. Toca para escucharlos y hablar.` : "Se escuchan entre quienes toquen Hablar. Mejor con audífonos."}</p></div>` : ""}
        ${lead ? `<button class="btn go mt z" data-a="rosala">Empezar: ${MIS[set].n.toLowerCase()}</button>` : `<p class="note c mt z">${g ? "Esperando a que " + esc(g.presence.n || "quien dirige") + " empiece." : "Esperando a quien dirige."}</p>`}
        <button class="lk c z" data-a="salir" style="margin-top:4px">Salir de la sala</button></section>`;
    }
  };

  /* ---------- acciones ---------- */
  // El aviso se pone encima de la vista sin volver a dibujarla (no repite animaciones ni borra lo que se escribe)
  let tMsg = 0;
  function aviso(t) { msg = t; const x = app.querySelector(".toast"); if (x) x.remove(); app.insertAdjacentHTML("beforeend", `<div class="toast" role="status">${esc(t)}</div>`); clearTimeout(tMsg); tMsg = setTimeout(() => { msg = ""; const y = app.querySelector(".toast"); if (y) y.remove(); }, Math.max(2600, 1400 + t.length * 45)); }
  function finJt(s) {
    ros = null; vibra(3); musica(false); jtA = s.jt.id;
    const pend = () => 5 - jtHechos(s.jt.id).length;
    go("jt");
    SB.rpc("juntos_marca", { j: s.jt.id, d: key(now()), m: s.jt.m, q: S.n || "Alguien" }).then((r) => {
      if (r && !r.error && r.data) JT[s.jt.id] = r.data;
      if (pend() === 0) { marca("r"); enciende(); go("listo"); aviso("Entre todos completaron el rosario de hoy."); }
      else { render(1); aviso(pend() === 1 ? "Listo. Falta un misterio." : `Listo. Faltan ${pend()} misterios.`); }
    }, () => aviso("No se pudo guardar. Revisa tu internet e intenta otra vez."));
  }
  function fin() { const s = ros; if (s && s.jt) return finJt(s); ros = null; vibra(3); musica(false); marca("r"); enciende(); if (s && s.nov) { const y = now().getFullYear(); S.nov[y] = Object.assign(S.nov[y] || {}, { [s.nov]: 1 }); save(); } if (lead && sala) sala.presence({ fin: 1, on: 0 }).catch(() => {}); go("listo"); }
  const OTP_ON = SB_URL.indexOf("http") === 0 && (Q.get("correo") || "__OTP__" === "1");
  let dirN = "", estAbre = 0, vuelveE = "hoy", correo = "", otpE = 0, otpT = 0;
  const sinAc = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  // sugerencia por la zona horaria del teléfono (solo las que señalan un estado con claridad)
  const sugEst = () => { let z = ""; try { z = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (_) {} if (Q.get("tz")) z = Q.get("tz");
    const M = { "America/Cancun": 22, "America/Merida": 30, "America/Monterrey": 18, "America/Tijuana": 1, "America/Hermosillo": 25, "America/Chihuahua": 5, "America/Ciudad_Juarez": 5, "America/Ojinaga": 5, "America/Matamoros": 27, "America/Bahia_Banderas": 17, "America/Mazatlan": 24 };
    if (M[z] !== undefined) return M[z]; if (z && !/^America\/(Mexico_City|Monterrey|Merida|Cancun|Matamoros|Chihuahua|Ojinaga|Ciudad_Juarez|Hermosillo|Mazatlan|Bahia_Banderas|Tijuana)$/.test(z) && !/^(UTC|Etc\/)/.test(z)) return 99; return null; };
  function go(v, b) { if (v === "advs" && !sel.length) sel = S.vs.slice(); if (v === "adv" && /^(hoy|vir|yo|rezar)$/.test(view)) vuelve = view; view = V[v] ? v : "hoy"; if (v === "mapa") cargaVelas(); if (view === "ros" && !ros) view = "hoy"; if (!S.n && !/^(bien|nom|est|luzv|entrar|jt)$/.test(view)) view = "bien"; if (S.n && S.e < 0 && !/^(bien|nom|est|jt|ros|listo|sala)$/.test(view)) { ob = 1; view = "est"; } try { if (/^(hoy|rezar|mapa|yo)$/.test(view)) history.replaceState(null, "", "#" + view); } catch (_) {}
    // la paloma trae el mensaje la primera vez que se abre Hoy cada día
    if (view === "hoy" && SB) jtTodos();
    if (view === "jt" && SB && jtA) jtVer(jtA);
    if (view === "hoy" && S.n && S.pd !== key(now())) { palT = Date.now(); S.pd = key(now()); save(); }
    // hacia adentro la vista entra por la derecha; al regresar, por la izquierda; las pestañas solo suben
    dirN = b ? "bk" : /^(nom|est|advs|adv|pid|nov|novd|ang|vir|vird|sala)$/.test(view) ? "fw" : "";
    render(); dirN = ""; try { window.scrollTo(0, 0); } catch (_) {} }
  function render(quieto) { despierta(view === "ros" || !!VZ); app.innerHTML = V[view]() + (msg ? `<div class="toast" role="status">${esc(msg)}</div>` : ""); if (VZ) { pegaVideos(); escucha(); } volMu(); const x = app.querySelector(".in"); if (x) { if (quieto === 1) x.classList.remove("in"); else if (dirN) x.classList.add(dirN); } }
  // tras redibujar una lista de opciones, el foco vuelve al botón que se tocó (teclado y lectores de pantalla)
  // y si quedó elegido, su palomita brota y el teléfono da un toque
  const foco = (a, k) => { try { const b = app.querySelector(`[data-a="${a}"][data-k="${k}"]`); if (!b) return; b.focus({ preventScroll: true }); if (b.classList.contains("on") || b.classList.contains("now")) { b.classList.add("ya"); const li = b.closest("li"); if (li) li.classList.add("ya"); } vibra(1); } catch (_) {} };
  const A = {
    go: (d) => go(d.v, d.b),
    nom: () => { const v = (document.getElementById("fn").value || "").trim(); if (!v) { document.getElementById("fn").focus(); return; } S.n = v; if (ob) S.ob = 1; save(); go("est"); },
    empieza: () => { ob = 1; go("nom"); },
    esab: () => { estAbre = 1; render(1); },
    esc: (d) => { const k = +d.k; if (!(k === 99 || MX.e[k])) return; const b = app.querySelector(`[data-a="esc"][data-k="${k}"]`); if (b) b.classList.add("on"); vibra(1); A.est({ k }); },
    est: (d) => { if (!d || d.k == null) return; estAbre = 0; S.e = +d.k; save(); presLobby(); if (ob) { sel = S.vs.slice(); go("advs"); } else go("yo"); },
    pich: (d) => { const f = document.getElementById("fi"), t = PIS[+d.k]; if (!f || !t) return; const v = f.value.trim(); if (v.toLowerCase().includes(t.toLowerCase())) return; f.value = (v ? v.replace(/[.,;]$/, "") + ", " + t.charAt(0).toLowerCase() + t.slice(1) : t).slice(0, 140); vibra(1); },
    piok: () => { const f = document.getElementById("fi"); S.pi = ((f && f.value) || "").replace(/\s+/g, " ").trim().slice(0, 140); save(); vibra(1); go(ob ? "atrio" : "yo"); },
    pisk: () => go("atrio"),
    advt: (d) => { if (!ADV.some((x) => x.k === d.k)) return; sel = sel.includes(d.k) ? sel.filter((k) => k !== d.k) : sel.concat(d.k); render(1); foco("advt", d.k); },
    advsel: () => { sel = S.vs.slice(); go("advs"); },
    advok: () => { if (!sel.length) return; S.vs = ADV.filter((x) => sel.includes(x.k)).map((x) => x.k); S.v = S.vs[0]; save(); va = ""; go(ob ? "pid" : "adv"); },
    verv: (d) => { va = d.k; go("adv"); },
    entra: () => { ob = 0; delete S.ob; save(); go("hoy"); },
    ros: (d) => { ros = { set: d.set || MIS_DIA[now().getDay()], i: 0, nov: d.nov ? +d.nov : 0 }; ros.p = pasos(); if (S.mu) musica(true); if (Q.get("paso")) ros.i = Math.min(ros.p.length - 1, +Q.get("paso")); ros.an = "sg"; go("ros"); if (ros) ros.an = ""; },
    rosala: () => { ros = { set: MIS_DIA[now().getDay()], i: 0, sala: 1 }; ros.p = pasos(); if (S.mu) musica(true); presSala(); ros.an = "sg"; go("ros"); if (ros) ros.an = ""; },
    sig: () => { if (!ros) return; if (ros.i >= ros.p.length - 1) return fin(); ros.i++; vibraPaso(); presSala(); ros.an = "sg"; render(); ros.an = ""; try { window.scrollTo(0, 0); } catch (_) {} },
    ant: () => { if (ros && ros.i > 0) { ros.i--; vibra(1); presSala(); ros.an = "at"; render(); ros.an = ""; } },
    cerrar: () => { const s = ros && ros.sala; ros = null; musica(false); if (s) presSala(); go(s ? "sala" : "hoy"); },
    novd: (d) => { nd = +d.n; go("novd"); },
    vird: (d) => { vn = +d.n; go("vird"); },
    novok: () => { vibra(2); const y = now().getFullYear(); S.nov[y] = Object.assign(S.nov[y] || {}, { [nd]: 1 }); save(); go("nov"); },
    bell: () => bell(3),
    angok: () => { vibra(2); marca("a"); go("hoy"); },
    copiar: () => { const t = "Te invito a rezar el rosario conmigo en Atrio. Hoy tocan los " + MIS[MIS_DIA[now().getDay()]].n.toLowerCase() + "."; try { navigator.clipboard.writeText(t).then(() => aviso("Mensaje copiado. Pégalo en WhatsApp con el enlace."), () => aviso(t)); } catch (_) { aviso(t); } },
    crear: () => { const L = "ABCDEFGHJKLMNPQRSTUVWXYZ"; let c = ""; for (let i = 0; i < 3; i++) c += L[Math.floor(Math.random() * L.length)]; c += Math.floor(10 + Math.random() * 90); entrar(c, true); },
    unir: () => { const c = (document.getElementById("fc").value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, ""); if (c.length < 4) { document.getElementById("fc").focus(); return; } entrar(c, false); },
    salir: () => { salir(); go("hoy"); },
    voz: () => { prendeVoz(); },
    cuelga: () => { apagaVoz(); },
    cam: () => { camara(); },
    cfhoy: () => { S.cf = key(now()); save(); vibra(2); render(1); aviso("Que Dios te bendiga."); },
    jnew: () => { if (!jtOk()) { aviso("Necesitas internet para rezar juntos."); return; } go(S.jt.length && !Q.get("nuevo") ? "jt" : "jnew"); },
    jnueva: () => go("jnew"),
    jabre: (d) => { jtA = d.k; go("jt"); jtVer(d.k); },
    jcrea: () => { if (!SB) { aviso("Conectando. Intenta en un momento."); return; } const c = ((document.getElementById("fj") || {}).value || "").replace(/\s+/g, " ").trim().slice(0, 40), i = ((document.getElementById("fji") || {}).value || "").replace(/\s+/g, " ").trim().slice(0, 140);
      if (!c) { aviso("Escribe con quién van a rezar."); const f = document.getElementById("fj"); if (f) f.focus(); return; }
      const b = app.querySelector('[data-a="jcrea"]'); if (b) { b.disabled = true; b.textContent = "Creando…"; }
      SB.rpc("juntos_crear", { c: S.n || "Alguien", i }).then((r) => {
        if (!r || r.error || !UUID.test(String(r.data))) { aviso("No se pudo crear. Intenta otra vez."); render(1); return; }
        const id = String(r.data); S.jt.unshift({ id, con: c }); save(); jtA = id; vibra(2);
        jtComparte(id, `${c}, te invito a rezar el rosario conmigo en Atrio. Cada quien reza su misterio cuando pueda y se va completando solito.`);
        go("jt"); jtVer(id);
      }, () => { aviso("Sin conexión. Intenta otra vez."); render(1); });
    },
    jnom: () => { const f = document.getElementById("fn"), v = ((f && f.value) || "").replace(/\s+/g, " ").trim().slice(0, 24); if (!v) { if (f) f.focus(); return; } S.n = v; if (S.e < 0) S.ob = 1; save(); render(); },
    jtr: (d) => { if (!SB) return; const m = +d.k, h = jtHechos(jtA); if (h.includes(m)) return; const set = MIS_DIA[now().getDay()], ult = h.length === 4;
      ros = { set, i: 0, jt: { id: jtA, m } };
      ros.p = [{ t: "cruz", b: "x" }, { t: "mis", m, b: "L" + m }, { t: "pn", m, b: "L" + m }]; for (let k = 1; k <= 10; k++) ros.p.push({ t: "am", m, k, of: 10, b: "s" + m + "_" + k }); ros.p.push({ t: "gl", m, x: 1, b: "s" + m + "_10" }); if (ult) ros.p.push({ t: "salve", b: "M" });
      if (S.mu) musica(true); ros.an = "sg"; go("ros"); if (ros) ros.an = ""; },
    jtv: () => { if (!RM) { aviso("La videollamada necesita internet."); return; } const c = "J" + jtA.replace(/-/g, "").slice(0, 5).toUpperCase(); if (!sala || codigo !== c) { if (sala) salir(); entrar(c, false); } go("sala"); },
    jtw: () => { const d = JT[jtA], n = d ? (d.cuentas || []).length : 0, f = 5 - n, j = S.jt.find((x) => x.id === jtA) || {};
      jtComparte(jtA, n && n < 5 ? `Ya vamos ${n} de 5 misterios del rosario de hoy. ${f === 1 ? "Falta uno" : "Faltan " + f}, ¿te echas uno?` : `${j.con ? j.con + ", r" : "R"}ecemos juntos el rosario de hoy en Atrio. Cada quien reza su misterio cuando pueda.`); },
    luzn: (d) => { luzPara = d && d.p ? d.p : ""; luzQ = d && d.q ? d.q : "am"; go("luz"); },
    luzq: (d) => { if (LQ[d.k]) { luzQ = d.k; const f = document.getElementById("fl"); luzPara = f ? f.value : luzPara; render(1); } },
    luzm: () => {
      const f = document.getElementById("fl"), para = ((f && f.value) || "").replace(/\s+/g, " ").trim().slice(0, 40);
      if (!para) { aviso("Escribe por quién rezaste."); if (f) f.focus(); return; }
      const url = ligaLuz({ d: S.n || "Alguien", p: para, q: luzQ }), t = `${para}, recé ${LQ[luzQ][0]} por ti.\n${url}`;
      S.lz = (S.lz || 0) + 1; save(); vibra(2);
      if (navigator.share) { navigator.share({ text: t }).then(() => { aviso("Tu luz va en camino."); go("hoy"); }, () => {}); return; }
      try { window.open("https://wa.me/?text=" + encodeURIComponent(t), "_blank"); } catch (_) {} aviso("Tu luz va en camino."); go("hoy");
    },
    luzam: () => { luzRe = 1; vibra(1); render(1); },
    luzok: () => { luzRe = 2; vibra(2); render(1); },
    luzdev: () => { luzPara = LUZ ? LUZ.d : ""; luzQ = "am"; go(S.n ? "luz" : "bien"); },
    mu: () => { S.mu = S.mu ? 0 : 1; save(); musica(!!S.mu); vibra(1); render(1); if (S.mu) aviso("Música de fondo encendida. Sube el volumen si no la oyes."); },
    mudo: () => { if (!VZ) return; VZ.mudo = VZ.mudo ? 0 : 1; VZ.st.getAudioTracks().forEach((t) => { t.enabled = !VZ.mudo; }); vibra(1); if (sala) sala.presence({ v: VZ.mudo ? 2 : 1 }).catch(() => {}); pinta(); },
    login: () => { if (!SB) { aviso("Conectando. Intenta de nuevo en un momento."); return; } if (view !== "entrar") vuelveE = view; go("entrar"); },
    gg: () => { if (!SB) return; if (/FBAN|FBAV|FB_IAB|Instagram|TikTok|musical_ly|Snapchat|Line\//i.test(navigator.userAgent)) { aviso("Para entrar con Google, abre Atrio en Safari o Chrome. O entra con tu correo."); return; } if (vuelveE === "atrio") { ob = 0; delete S.ob; save(); } try { SB.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } }).then((r) => { if (r && r.error) aviso("No se pudo abrir Google. Intenta otra vez."); }, () => aviso("No se pudo abrir Google. Intenta otra vez.")); } catch (_) {} },
    otp: () => { const f = document.getElementById("fm"), m = ((f && f.value) || correo).trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(m)) { aviso("Ese correo parece incompleto. Revísalo."); if (f) f.focus(); return; }
      if (Date.now() - otpT < 55000 && m === correo) { aviso("Ya te mandamos uno. Espera un minuto para pedir otro."); return; }
      correo = m; otpE = 1; otpT = Date.now(); render(1);
      SB.auth.signInWithOtp({ email: m, options: { shouldCreateUser: true } }).then((r) => { if (r && r.error) { const t = /rate|limit|seconds/i.test(r.error.message || "") ? "Ya pedimos varios códigos. Espera unos minutos e intenta otra vez." : "No pudimos mandar el código. Revisa tu correo e intenta otra vez."; otpE = 0; otpT = 0; render(1); aviso(t); } else { otpE = 2; render(1); const k = document.getElementById("fk"); if (k) k.focus(); } }, () => { otpE = 0; render(1); aviso("Sin conexión. Intenta otra vez."); });
    },
    otpok: () => { const k = document.getElementById("fk"), t = ((k && k.value) || "").replace(/\D/g, "");
      if (t.length < 6) { aviso("Escribe los números que te llegaron."); if (k) k.focus(); return; }
      otpE = 3; render(1);
      SB.auth.verifyOtp({ email: correo, token: t, type: "email" }).then((r) => {
        if (r && r.error) { otpE = 2; render(1); aviso("Ese código no es correcto o ya venció. Revísalo o pide otro."); const x = document.getElementById("fk"); if (x) x.focus(); return; }
        otpE = 0; vibra(2); if (vuelveE === "atrio") { ob = 0; delete S.ob; save(); } deG = 1; const v = vuelveE === "entrar" ? "hoy" : vuelveE; go(V[v] ? v : "hoy");
      }, () => { otpE = 2; render(1); aviso("Sin conexión. Intenta otra vez."); });
    },
    otpno: () => { otpE = 0; render(1); },
    logout: () => { if (SB) try { SB.auth.signOut().then(() => { U = null; render(1); }, () => {}); } catch (_) {} }
  };
  let tSig = 0;
  document.addEventListener("click", (e) => { const t = e.target.closest ? e.target.closest("[data-a]") : null; if (!t || !A[t.dataset.a] || t.disabled) return; if (t.dataset.a === "sig" && e.isTrusted) { const n = Date.now(); if (n - tSig < 240) return; tSig = n; } A[t.dataset.a](t.dataset); });
  document.addEventListener("change", (e) => { if (e.target && e.target.id === "fcd" && e.target.value) { const v = e.target.value; if (/^\d{4}-\d{2}-\d{2}$/.test(v) && v <= key(now())) { S.cf = v; save(); vibra(1); render(1); } } });
  document.addEventListener("input", (e) => { if (!e.target || e.target.id !== "fb") return; const q = sinAc(e.target.value.trim()); let n = 0; app.querySelectorAll("#esl .es").forEach((b) => { const ok = !q || b.dataset.n.includes(q); b.hidden = !ok; if (ok) n++; }); const x = document.getElementById("esn"); if (x) x.hidden = n > 0; });
  document.addEventListener("change", (e) => { if (e.target && e.target.id === "fa") { S.ang = e.target.checked ? 1 : 0; save(); if (S.ang) bell(1); } if (e.target && e.target.id === "fmu") { S.mu = e.target.checked ? 1 : 0; save(); } if (e.target && e.target.id === "fv") { S.vib = e.target.checked ? 1 : 0; save(); vibra(2); } });
  // en iPhone los botones solo muestran su estado presionado si alguien escucha el toque
  document.addEventListener("touchstart", () => {}, { passive: true });
  document.addEventListener("keydown", (e) => { if (e.key === "Enter" && e.target && e.target.id === "fn") A.nom(); });
  window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (/^(hoy|rezar|mapa|yo)$/.test(h) && h !== view && view !== "ros") go(h); });
  if (Q.get("demo") && Q.get("ob")) ob = 1;
  if (Q.get("paloma")) S.pd = "";
  const errG = /[?&#]error(_code|_description)?=/.test(location.search + location.hash);
  let h0 = Q.get("v") || (errG ? "" : location.hash.slice(1));
  if (S.ob && S.n && !Q.get("demo")) { ob = 1; h0 = S.e < 0 ? "est" : S.vs.length ? "pid" : "advs"; }
  const jQ = Q.get("j");
  if (jQ && UUID.test(jQ)) { if (!S.jt.some((x) => x.id === jQ)) { S.jt.unshift({ id: jQ }); save(); } jtA = jQ; h0 = "jt"; try { history.replaceState(null, "", location.pathname); } catch (_) {} }
  if (LUZ) { h0 = "luzv"; try { history.replaceState(null, "", location.pathname); } catch (_) {} }
  if (h0 === "ros" && S.n) A.ros({}); else if (h0 === "novd" && S.n) { nd = +(Q.get("n") || 6); go("novd"); } else go(V[h0] ? h0 : "hoy");
  if (errG) { try { history.replaceState(null, "", location.pathname); } catch (_) {} setTimeout(() => aviso("No se pudo entrar con Google. Intenta de nuevo."), 400); }
  if (Q.get("demo") && Q.get("gente") && ros) { const N = ["Lucía", "Pedro", "Ana", "Rosa", "Juan", "Carmen", "Luis", "Sofía", "Diego", "Elena", "Pablo", "Marta"]; ros.sala = 1; lead = true; peersS = N.slice(0, +Q.get("gente")).map((n, i) => ({ peer: "p" + i, isMe: !i, presence: { n, v: i % 4 === 3 ? 2 : 1, lead: !i ? 1 : 0 } })); render(); const h = app.querySelector('[data-p="p2"]'); if (h) h.classList.add("habla"); }
  if (Q.get("demo") && Q.get("jtd")) { const id = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", n = +Q.get("jtd"), Q2 = ["Constanza", S.n, "Constanza", S.n, "Constanza"], hh = ["T13:40:00", "T15:05:00", "T19:20:00", "T21:10:00", "T22:30:00"];
    S.jt = [{ id, con: "Constanza" }]; JT[id] = { creador: S.n, intencion: "Por nuestra familia", cuentas: [0, 1, 2, 3, 4].slice(0, n).map((m) => ({ m, quien: Q2[m], hecho: key(now()) + hh[m] })), completos: n === 5 ? [key(now()), key(add(now(), -1)), key(add(now(), -2))] : [key(add(now(), -1)), key(add(now(), -2))], gente: ["Constanza"] }; jtA = id; if (Q.get("v") === "jt") go("jt"); else render(1); }
  if (Q.get("demo") && Q.get("t")) setTimeout(() => aviso(Q.get("t")), 30);
  if (Q.get("demo") && Q.get("lista")) { lista = 1; render(1); }
  if (Q.get("demo") && Q.get("pt")) { palT = Date.now() - +Q.get("pt"); render(1); }
})();
