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
    txt: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h9"/></svg>',
    ros: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="9" r="6.4" stroke-width="2.1" stroke-dasharray=".1 3.35"/><path d="M12 15.6v6.2M10.2 18.6h3.6" stroke-width="1.7"/></svg>',
    yo: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="8.5" r="3.8"/><path d="M4.5 20c.9-4 3.9-6 7.5-6s6.6 2 7.5 6"/></svg>',
    comp: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 15V3.5M7.8 7.6L12 3.4l4.2 4.2M6 11.5v7A1.5 1.5 0 0 0 7.5 20h9a1.5 1.5 0 0 0 1.5-1.5v-7"/></svg>'
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
  // la rosa del ramillete: dos coronas de cinco pétalos, como la rosa de los vitrales
  const cinco = (R, r, g) => { const P = [0, 1, 2, 3, 4].map((k) => { const a = ((g + k * 72) * Math.PI) / 180; return (24 + R * Math.cos(a)).toFixed(2) + " " + (24 + R * Math.sin(a)).toFixed(2); }); return "M" + P[0] + P.slice(1).concat(P[0]).map((p) => `A${r} ${r} 0 1 1 ${p}`).join("") + "z"; };
  EM.rosa = em(`<path d="${cinco(10.6, 9.2, -126)}"/><path d="${cinco(5.1, 4.5, -90)}"/><circle cx="24" cy="24" r="1.7" fill="currentColor" stroke="none"/>`);

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
  if (Q.get("demo")) { S.n = S.n || "Lucía"; if (S.e < 0) S.e = 22; if (Q.get("adv")) S.vs = Q.get("adv").split(","); if (Q.get("pi") !== null) S.pi = Q.get("pi"); if (Q.get("fr")) S.fr = Q.get("fr"); }
  if (!Array.isArray(S.vs)) S.vs = S.v ? [S.v] : [];
  if (typeof S.pi !== "string") S.pi = "";
  const conG = () => SB_URL.indexOf("http") === 0 && (G_AB === "1" || S.g === 1);
  // A quien no tiene cuenta se le invita a guardar. Mientras el servidor confirma la sesión se usa la pista
  // de si este teléfono ya entró antes: así el aviso no aparece ni desaparece de golpe al abrir.
  // arriba a la derecha: tu foto o inicial si entraste; si no, «Entrar» con Google
  const perfil = () => { if (!conG()) return ""; if (U) { const m = U.user_metadata || {}, f = m.avatar_url || m.picture; return `<button class="pf" data-a="go" data-v="yo" aria-label="Tu perfil">${f ? `<img src="${esc(f)}" alt="" referrerpolicy="no-referrer">` : `<b>${esc((S.n || m.full_name || "?").slice(0, 1).toUpperCase())}</b>`}</button>`; }
    if (!pideG()) return "";
    return `<button class="pfe" data-a="login" aria-label="Entrar con Google"><svg width="16" height="16" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg><span>Entrar</span></button>`; };
  const GLOGO = '<svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>';
  const gBtn = (t) => `<div class="gsiw"><button class="btn gw" data-a="gg">${GLOGO}<span>${t || "Continuar con Google"}</span></button><div class="gsi"></div></div>`;
  /* Pedir la cuenta en el momento justo: después de rezar algo, no antes. Una hoja que sube desde abajo,
     una vez por motivo y no más de una vez cada tres días. */
  function guarda(motivo, t, d) {
    if (!pideG() || (S.gx || {})[motivo] || Date.now() - (S.gt || 0) < 3 * 864e5) return;
    S.gx = Object.assign({}, S.gx, { [motivo]: 1 }); S.gt = Date.now(); save(); vuelveE = view;
    setTimeout(() => { const x = document.getElementById("gsh"); if (x) x.remove();
      document.body.insertAdjacentHTML("beforeend", `<div id="gsh" role="dialog" aria-label="${t}"><div class="gsf" data-a="gno"></div><div class="gsb"><span class="gsv"><svg viewBox="0 0 40 52" width="40" height="52" aria-hidden="true"><defs><radialGradient id="vlg"><stop offset="0" stop-color="#FFF3D0"/><stop offset=".5" stop-color="#F4C76A" stop-opacity=".55"/><stop offset="1" stop-color="#E6C27A" stop-opacity="0"/></radialGradient></defs><circle cx="20" cy="14" r="14" fill="url(#vlg)"/><path d="M20 4c2.4 4 5 6 5 10a5 5 0 0 1-10 0c0-4 2.6-6 5-10z" fill="#FFE7A8"/><rect x="11" y="24" width="18" height="24" rx="3" fill="#F6EFE9"/><rect x="11" y="24" width="18" height="5" rx="2.5" fill="#E6C27A"/></svg></span><b>${t}</b><p>${d}</p>${gBtn()}<button class="lk" data-a="gno" style="display:block;margin:6px auto 0">Ahora no</button><p class="note c" style="margin-top:4px">Sin contraseñas. Al entrar aceptas los <a href="/terminos/">términos</a> y el <a href="/privacidad/">aviso de privacidad</a>.</p></div></div>`); pintaG(); vibra(1); }, 650);
  }
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
  const vibraPaso = () => { const t = ros && ros.p[ros.i] ? ros.p[ros.i].t : ""; vibra(t === "mis" || t === "salve" || t === "salvemx" ? 3 : t === "gl" ? 2 : 1); };
  let sono = "", tic = 0, WL = null;
  function despierta(on) {
    try {
      if (on) { if (!WL && navigator.wakeLock && document.visibilityState === "visible") navigator.wakeLock.request("screen").then((w) => { WL = w; w.addEventListener("release", () => { if (WL === w) WL = null; }); }, () => {}); }
      else if (WL) { const w = WL; WL = null; w.release().catch(() => {}); }
    } catch (_) {}
  }
  document.addEventListener("visibilitychange", () => { if (document.visibilityState === "visible") { despierta(view === "ros"); if (view === "mapa" || view === "listo") cargaVelas(); if (view === "fam") famAbre(); else if (view === "hoy" && SB) famTodos(); famFluye(); } });
  setInterval(() => { if (!document.hidden && SB) { if (view === "jt" && jtA) jtVer(jtA); else if (view === "hoy") { if (tic % 3 === 0) jtTodos(); famTodos(); } else if (famS && (view === "fam" || view === "ros")) famVer(famS, view === "ros" ? 2 : 1); else if (view === "fam" && famA) famVer(famA); if (S.fq.length) famFluye(); } }, 20000);
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
      let ch = null, st = {}, subs = [], rtc = [], lento = {}, rapido = {}, deOtros = {}, deT = {}, ok = false, fuera = false, ultimo = "", llaves = "", tT = 0, tR = 0;
      const fire = () => { const peers = Object.keys(st).map((k) => { const m = st[k] || []; return { peer: k, isMe: k === me, kind: "viewer", presence: Object.assign({}, m[m.length - 1] || {}, k === me ? lento : null, k === me ? rapido : deOtros[k] || {}) }; }); subs.forEach((f) => { try { f({ peers }); } catch (_) {} }); };
      // Quien dirige avisa por aquí en qué cuenta va, y también que dirige y con qué forma reza: la presencia tiene tope
      // de cambios y puede tardar medio minuto. Quien deja de dirigir lo avisa una vez (suelta).
      const di = (suelta) => { if (ok && !fuera && (lento.lead || suelta)) try { ch.send({ type: "broadcast", event: "st", payload: { k: me, s: Object.assign({ lead: lento.lead ? 1 : 0, f: lento.f || "" }, rapido) } }); } catch (_) {} };
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
        c.on("presence", { event: "sync" }, () => { if (c !== ch) return; st = c.presenceState(); Object.keys(deOtros).forEach((k) => { if (!st[k]) { delete deOtros[k]; delete deT[k]; } }); const l = Object.keys(st).sort().join(); if (l !== llaves) { llaves = l; di(); } fire(); });
        // voz: los teléfonos se presentan por aquí y luego hablan directo entre ellos
        c.on("broadcast", { event: "rtc" }, (m) => { const q = m && m.payload; if (c === ch && q && q.de && q.de !== me && (!q.para || q.para === me)) rtc.forEach((f) => { try { f(q); } catch (_) {} }); });
        c.on("broadcast", { event: "st" }, (m) => { const q = m && m.payload; if (c === ch && q && q.k && q.k !== me) { deOtros[q.k] = q.s || {}; deT[q.k] = Date.now(); fire(); } });
        c.subscribe((x) => {
          if (c !== ch || fuera) return;
          if (x === "SUBSCRIBED") { ok = true; ultimo = ""; track(); di(); rtc.forEach((f) => { try { f({ t: "_listo" }); } catch (_) {} }); }
          else { ok = false; clearTimeout(tR); tR = setTimeout(() => { if (c === ch && !ok && !fuera) { try { cli.removeChannel(c); } catch (_) {} abre(); } }, 6000); }
        });
      };
      abre();
      const tB = setInterval(() => di(), 5000);
      // si quien dirige deja de avisar (se le fue la señal o se durmió su teléfono), a los 16 s su cuenta ya no vale
      const tV = setInterval(() => { const t = Date.now(); let v = 0; Object.keys(deOtros).forEach((k) => { if (t - (deT[k] || 0) > 16000) { delete deOtros[k]; delete deT[k]; v = 1; } }); if (v) fire(); }, 4000);
      return {
        presence: (q) => { let l = 0, r = 0; const era = !!lento.lead; Object.keys(q).forEach((k) => { const T = RAPIDO[k] ? rapido : lento, v = q[k]; if (v === null || v === undefined) { if (k in T) { delete T[k]; RAPIDO[k] ? r++ : l++; } } else if (T[k] !== v) { T[k] = v; RAPIDO[k] ? r++ : l++; } }); if (l) track(); const solto = era && !lento.lead; if (r || solto || (l && lento.lead)) { di(solto); if (solto) setTimeout(() => { if (!lento.lead) di(1); }, 2500); } if (r || l) fire(); return Promise.resolve(); },
        onPeers: (fn) => { subs.push(fn); fire(); return () => {}; },
        yo: me,
        senal: (fn) => { rtc.push(fn); },
        manda: (q) => { if (ok && !fuera) try { ch.send({ type: "broadcast", event: "rtc", payload: Object.assign({ de: me }, q) }); } catch (_) {} },
        leave: () => { fuera = true; clearTimeout(tT); clearTimeout(tR); clearInterval(tB); clearInterval(tV); try { cli.removeChannel(ch); } catch (_) {} return Promise.resolve(); }
      };
    };
    // Sin canal general: el mapa se arma con las veladoras guardadas, así solo abre conexión quien entra a una sala.
    return { presence: () => Promise.resolve(), onPeers: () => () => {}, join: (n) => Promise.resolve(mk(n)) };
  }
  function nube() { if (!SB || !U) return; try { SB.from("progreso").upsert({ user_id: U.id, datos: Object.assign({}, S, { cf: undefined, fq: undefined }), actualizado: new Date().toISOString() }).then(() => {}, () => {}); } catch (_) {} }
  function sincroniza() {
    if (!SB || !U) return;
    try { SB.from("progreso").select("datos").eq("user_id", U.id).maybeSingle().then((r) => {
      const R = (r && r.data && r.data.datos) || null;
      if (R) { const d = Object.assign({}, R.d || {}); Object.keys(S.d).forEach((k) => { d[k] = Object.assign({}, d[k] || {}, S.d[k]); }); const nv = Object.assign({}, R.nov || {}); Object.keys(S.nov).forEach((y) => { nv[y] = Object.assign({}, nv[y] || {}, S.nov[y]); }); S.d = d; S.nov = nv; if (!S.n && R.n) S.n = R.n; if (!S.vs.length && (R.vs || R.v)) S.vs = R.vs || [R.v]; if (S.e < 0 && R.e >= 0) S.e = R.e; if (!S.pi && R.pi) S.pi = R.pi;
        // familias: manda la llave de la cuenta; lo que este teléfono rezó sin cuenta se pasa a ella
        if (UUID.test(R.mi || "") && R.mi !== S.mi) { const vieja = S.mi; S.mi = R.mi; if (UUID.test(vieja || "")) S.fam.forEach((j) => { if (!j.p) try { SB.rpc("fam_une", { f: j.id, de: vieja, a: R.mi }).then(() => famVer(j.id), () => {}); } catch (_) {} }); }
        (Array.isArray(R.fam) ? R.fam : []).forEach((j) => { if (j && FID.test(j.id || "") && !famJ(j.id) && S.fam.length < 5) S.fam.push({ id: j.id, n: j.n || "", i: j.i || "" }); }); if (!famJ(famA) && S.fam.length) famA = S.fam[0].id; }
      // quien ya tenía avance en su cuenta y abre un teléfono nuevo se salta la bienvenida
      const g = deG, vuelta = !!(S.n && S.e >= 0 && view === "bien"); deG = 0;
      if (vuelta) { ob = 0; delete S.ob; }
      try { localStorage.setItem("atrio1", JSON.stringify(S)); } catch (_) {} nube();
      if (vuelta) { go("hoy"); if (g) aviso("Listo. Aquí está tu avance."); return; }
      if (!/^(nom|est|sala|ros|fnew|fed)$/.test(view) && !(view === "fam" && !S.n)) render(1); famPend();
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
    const init = () => { try { SB = window.supabase.createClient(SB_URL, SB_KEY, { auth: { flowType: "pkce" } }); RM = sbRoom(SB); setTimeout(() => { jtTodos(); if (jtA && !S.jt.some((x) => x.id === jtA)) jtVer(jtA); famPend(); }, 0);
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
  const pinta = () => { if (view === "sala" || view === "fam") render(1); else if (view === "ros") render(); };
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
    if (peersS.filter((p) => (p.presence || {}).c).length >= 6) { aviso("Ya hay 6 cámaras encendidas; por ahora es el máximo para que la llamada no se trabe."); return; }
    let v;
    try { v = (await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: { ideal: 480 }, height: { ideal: 480 }, frameRate: { ideal: 15, max: 20 } } })).getVideoTracks()[0]; }
    catch (_) { aviso("Para usar la cámara, permítela para Atrio en tu navegador."); return; }
    if (!VZ) { v.stop(); return; }
    VZ.cam = v; VZ.camMs = new MediaStream([v]);
    Object.keys(VZ.pcs).forEach((k) => { const tv = vidT(VZ.pcs[k]); if (tv) tv.sender.replaceTrack(v).catch(() => {}); });
    if (sala) sala.presence({ c: 1 }).catch(() => {}); vibra(1); pinta();
  }
  // los participantes, como en una videollamada: círculo con inicial o con su cámara
  const tiles = (gr) => !sala ? "" : `<div class="ppl${gr ? " gr" : ""}">` + peersS.map((p) => { const pr = p.presence || {}, id = esc(p.peer), cam = pr.c && VZ && (p.isMe ? VZ.cam : VZ.rs[p.peer]); return `<div class="pp${pr.v ? " vz" : ""}${p.isMe ? " me" : ""}" data-p="${id}"><span class="cara">${cam ? `<video data-v="${id}" autoplay playsinline muted></video>` : `<b>${esc((pr.n || "?").slice(0, 1).toUpperCase())}</b>`}${pr.v === 2 ? `<i class="mm" aria-label="Sin micrófono">${I.mute}</i>` : pr.v ? "" : ""}</span><small>${esc(p.isMe ? "Tú" : (pr.n || "Alguien").split(" ")[0])}${pr.lead && (pr.on || !famS) ? `<em>dirige</em>` : ""}</small></div>`; }).join("") + "</div>";
  // en el rosario la familia rodea las cuentas, como si rezaran en círculo
  const orbita = () => { const L = peersS.slice(0, 12), n = L.length; if (!n) return ""; const ab = Math.min(300, (n - 1) * 46), a0 = -90 - ab / 2, R = 132;
    return `<span class="orb">` + L.map((p, i) => { const pr = p.presence || {}, id = esc(p.peer), a = ((n === 1 ? -90 : a0 + (i * ab) / (n - 1)) * Math.PI) / 180, x = ((130 + R * Math.cos(a)) / 260) * 100, y = ((100 + R * Math.sin(a)) / 270) * 100, cam = pr.c && VZ && (p.isMe ? VZ.cam : VZ.rs[p.peer]);
      return `<span class="of${pr.v ? " vz" : ""}${p.isMe ? " me" : ""}${pr.lead ? " ld" : ""}" data-p="${id}" style="left:${x.toFixed(1)}%;top:${y.toFixed(1)}%" title="${esc(p.isMe ? "Tú" : pr.n || "Alguien")}"><span class="cara">${cam ? `<video data-v="${id}" autoplay playsinline muted></video>` : `<b>${esc((pr.n || "?").slice(0, 1).toUpperCase())}</b>`}${pr.v === 2 ? `<i class="mm">${I.mute}</i>` : ""}</span></span>`; }).join("") + "</span>"; };
  function cuelga(id) { if (!VZ || !VZ.pcs[id]) return; try { VZ.pcs[id].close(); } catch (_) {} delete VZ.pcs[id]; delete VZ.cola[id]; delete VZ.rs[id]; delete VZ.an[id]; const a = document.getElementById("vz-" + id); if (a) { a.srcObject = null; a.remove(); } pinta(); }
  function par(id, ofrece) {
    if (!VZ) return null; if (VZ.pcs[id]) return VZ.pcs[id];
    const pc = new RTCPeerConnection(ICE); VZ.pcs[id] = pc; VZ.cola[id] = VZ.cola[id] || []; pc._t = Date.now(); pc._c = [];
    VZ.st.getAudioTracks().forEach((t) => pc.addTrack(t, VZ.st));
    // el canal de video se abre desde el principio, vacío; al prender la cámara solo se le pone la imagen
    if (ofrece) { const tv = pc.addTransceiver("video", { direction: "sendrecv" }); if (VZ.cam) tv.sender.replaceTrack(VZ.cam).catch(() => {}); }
    pc.onicecandidate = (e) => { if (!e.candidate) return; pc._c.push(e.candidate.toJSON ? e.candidate.toJSON() : e.candidate); if (!pc._ct) pc._ct = setTimeout(() => { pc._ct = 0; const d = pc._c.splice(0); if (d.length && sala && VZ && VZ.pcs[id] === pc) sala.manda({ para: id, t: "ices", d }); }, 250); };
    pc.ontrack = (e) => {
      const ms = VZ.rs[id] || (VZ.rs[id] = new MediaStream()); if (!ms.getTracks().includes(e.track)) ms.addTrack(e.track);
      if (e.track.kind === "video") { e.track.onunmute = () => pegaVideos(); return; }
      let a = document.getElementById("vz-" + id); if (!a) { a = document.createElement("audio"); a.id = "vz-" + id; a.autoplay = true; a.setAttribute("playsinline", ""); cajaVoz().appendChild(a); }
      a.srcObject = ms; try { const r = a.play(); if (r && r.catch) r.catch(() => {}); } catch (_) {}
      mide(id, new MediaStream([e.track]));
    };
    pc.onconnectionstatechange = () => { if (!VZ || VZ.pcs[id] !== pc) return; const s = pc.connectionState; pc._d = s === "disconnected" ? Date.now() : 0; if (s === "failed" || s === "closed") cuelga(id); else if (s === "connected") { vibra(1); pinta(); } };
    if (ofrece) pc.createOffer().then((o) => pc.setLocalDescription(o)).then(() => { if (sala) sala.manda({ para: id, t: "offer", d: { type: pc.localDescription.type, sdp: pc.localDescription.sdp } }); }).catch(() => cuelga(id));
    return pc;
  }
  // soltar una conexión que no cuajó, para volver a intentarla desde cero
  const suelta = (id) => { const pc = VZ && VZ.pcs[id]; if (!pc) return; clearTimeout(pc._ct); try { pc.close(); } catch (_) {} delete VZ.pcs[id]; delete VZ.rs[id]; VZ.cola[id] = []; };
  const viva = (pc, t) => !!pc && (pc.connectionState === "connected" || (pc.connectionState === "disconnected" ? t - (pc._d || t) < 9000 : t - pc._t < 10000));
  /* Con diez o quince en la sala hay decenas de conexiones entre teléfonos; si un aviso se pierde en el camino,
     ese par se quedaría mudo. Cada pocos segundos se revisa quién falta y se vuelve a llamar. */
  function repara() {
    if (!VZ || !sala) return; const t = Date.now();
    peersS.forEach((p) => { const id = p.peer; if (p.isMe || !(p.presence || {}).v) return; const pc = VZ.pcs[id];
      if (viva(pc, t)) { if (pc.connectionState === "disconnected" && !pc._d) pc._d = t; return; }
      suelta(id); if (sala.yo < id) par(id, true); else sala.manda({ para: id, t: "hola" }); });
    Object.keys(VZ.pcs).forEach((id) => { if (!peersS.some((p) => p.peer === id)) cuelga(id); });
  }
  const vacia = (id) => { const pc = VZ && VZ.pcs[id]; if (!pc) return; (VZ.cola[id] || []).splice(0).forEach((c) => pc.addIceCandidate(c).catch(() => {})); };
  function senal(q) {
    if (!VZ || !sala) return;
    const id = q.de;
    if (q.t === "_listo") { sala.manda({ t: "hola" }); return; }
    // el de identificador menor llama; el otro contesta. Así cada par se conecta una sola vez.
    if (q.t === "hola") { if (!q.para) sala.manda({ para: id, t: "hola" }); if (sala.yo < id) { if (q.para && VZ.pcs[id] && !viva(VZ.pcs[id], Date.now() + 6000)) suelta(id); if (!VZ.pcs[id]) par(id, true); } return; }
    if (q.t === "adios") { cuelga(id); return; }
    if (q.t === "offer") { if (VZ.pcs[id]) suelta(id); const pc = par(id, false); pc.setRemoteDescription(q.d).then(() => { const tv = vidT(pc); if (tv) { tv.direction = "sendrecv"; if (VZ && VZ.cam) tv.sender.replaceTrack(VZ.cam).catch(() => {}); } return pc.createAnswer(); }).then((a) => pc.setLocalDescription(a)).then(() => { vacia(id); sala.manda({ para: id, t: "answer", d: { type: pc.localDescription.type, sdp: pc.localDescription.sdp } }); }).catch(() => cuelga(id)); return; }
    if (q.t === "answer") { const pc = VZ.pcs[id]; if (pc && pc.signalingState === "have-local-offer") pc.setRemoteDescription(q.d).then(() => vacia(id)).catch(() => cuelga(id)); return; }
    if (q.t === "ice" || q.t === "ices") { const L = q.t === "ice" ? [q.d] : q.d || [], pc = VZ.pcs[id]; if (!pc || !pc.remoteDescription) { VZ.cola[id] = (VZ.cola[id] || []).concat(L); return; } L.forEach((c) => pc.addIceCandidate(c).catch(() => {})); }
  }
  async function prendeVoz() {
    if (VZ || !hayVoz()) return;
    let st;
    try { st = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true }, video: false }); }
    catch (_) { aviso("Para hablar, permite el micrófono para Atrio en tu navegador."); return; }
    if (!sala) { st.getTracks().forEach((t) => t.stop()); return; }
    VZ = { st, pcs: {}, cola: {}, rs: {}, an: {}, mudo: 0, cam: null, camMs: null, ac: null };
    try { VZ.ac = new (window.AudioContext || window.webkitAudioContext)(); if (VZ.ac.state === "suspended") VZ.ac.resume(); } catch (_) {}
    mide(sala.yo, st); VZ.tk = setInterval(escucha, 140); VZ.rp = setInterval(repara, 4000);
    if (!sala.vz) { sala.vz = 1; sala.senal(senal); }
    sala.presence({ v: 1 }).catch(() => {}); sala.manda({ t: "hola" }); vibra(2); despierta(true); pinta();
  }
  function apagaVoz(callado) {
    if (!VZ) return;
    if (sala) { sala.manda({ t: "adios" }); sala.presence({ v: null }).catch(() => {}); }
    Object.keys(VZ.pcs).forEach((id) => { try { VZ.pcs[id].close(); } catch (_) {} });
    VZ.st.getTracks().forEach((t) => t.stop()); if (VZ.cam) VZ.cam.stop(); clearInterval(VZ.tk); clearInterval(VZ.rp); try { if (VZ.ac) VZ.ac.close(); } catch (_) {} VZ = null;
    if (sala) sala.presence({ c: null }).catch(() => {});
    const b = document.getElementById("voces"); if (b) b.innerHTML = "";
    despierta(view === "ros"); if (!callado) pinta();
  }
  if (Q.get("demo") || Q.get("prueba")) window.atrioVz = () => (!VZ ? Promise.resolve(null) : Promise.all(Object.keys(VZ.pcs).map((id) => { const pc = VZ.pcs[id]; return pc.getStats().then((st) => { let rx = 0, lv = 0; st.forEach((r) => { if (r.type === "inbound-rtp" && r.kind === "audio") { rx += r.packetsReceived || 0; lv = Math.max(lv, r.audioLevel || 0); } }); return { id, s: pc.connectionState, rx, lv }; }, () => ({ id, s: "x", rx: 0, lv: 0 })); })).then((L) => ({ yo: sala && sala.yo, n: L.length, con: L.filter((x) => x.s === "connected").length, rx: L.filter((x) => x.rx > 20).length, oyen: L.filter((x) => x.lv > 0.001).length, gente: peersS.length })));
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
  /* ---------- rosario en familia: un grupo con una intención. Se entra con la liga, sin código; lo que reza cada
     quien se suma al de todos, y quien esté en ese momento aparece en vivo en la sala de la familia. ---------- */
  if (!Array.isArray(S.fam)) S.fam = [];
  if (!Array.isArray(S.fq)) S.fq = [];
  const FM = {}, FID = /^[a-km-np-z2-9]{10}$/, famCreando = {};
  let famA = S.fam.length ? S.fam[0].id : "", famS = "", famErr = 0, famB = 0, famEnv = 0, famEnt = 0, tSinG = 0, noSigo = 0, famOjo = 0, pk0 = "", gente0 = 0, tGente = 0;
  const uuid4 = () => { try { if (crypto.randomUUID) return crypto.randomUUID(); } catch (_) {} const b = []; for (let i = 0; i < 16; i++) b.push(Math.floor(Math.random() * 256)); try { crypto.getRandomValues(new Uint8Array(16)).forEach((x, i) => { b[i] = x; }); } catch (_) {} b[6] = (b[6] & 15) | 64; b[8] = (b[8] & 63) | 128; const h = b.map((x) => x.toString(16).padStart(2, "0")).join(""); return h.slice(0, 8) + "-" + h.slice(8, 12) + "-" + h.slice(12, 16) + "-" + h.slice(16, 20) + "-" + h.slice(20); };
  // la llave privada de este teléfono dentro de sus familias; con cuenta de Google viaja a tus otros teléfonos
  const miId = () => { if (!UUID.test(S.mi || "")) { S.mi = uuid4(); save(); } return S.mi; };
  const famNuevoId = () => { const L = "abcdefghijkmnpqrstuvwxyz23456789", b = []; for (let i = 0; i < 10; i++) b.push(Math.floor(Math.random() * 256)); try { crypto.getRandomValues(new Uint8Array(10)).forEach((x, i) => { b[i] = x; }); } catch (_) {} return b.map((x) => L[x % 32]).join(""); };
  const famJ = (id) => S.fam.find((x) => x.id === id);
  const ligaFam = (id) => location.origin + location.pathname + "?f=" + id;
  const mil = (n) => { try { return Number(n || 0).toLocaleString("es-MX"); } catch (_) { return String(n || 0); } };
  const cuantos = (n, uno, varios) => mil(n) + " " + (+n === 1 ? uno : varios);
  // lo que se ve de una familia sin abrirla (para no volver a pintar Hoy si nada cambió)
  const famFirma = (id) => { const d = FM[id]; return !d ? String(d) : [d.nombre, d.intencion, d.rosarios, d.misterios, d.aves, d.dias, (d.miembros || []).map((m) => m.n + m.est + m.hoy).join()].join("|"); };
  function famPon(id, d) { if (!d || d.id !== id) return;
    // lo que llega del servidor se usa como texto o como número, nunca como HTML
    ["dias", "rosarios", "misterios", "aves", "gente", "rezados"].forEach((k) => { d[k] = +d[k] || 0; }); d.nombre = String(d.nombre || "Familia"); d.intencion = d.intencion ? String(d.intencion) : ""; d.creador = String(d.creador || "Alguien"); d.hoy = d.hoy || {};
    d.miembros = (Array.isArray(d.miembros) ? d.miembros : []).map((m) => ({ n: String(m.n || "Alguien"), yo: !!m.yo, ros: +m.ros || 0, mis: +m.mis || 0, aves: +m.aves || 0, hoy: +m.hoy || 0, est: +m.est || 0 }));
    d.reciente = (Array.isArray(d.reciente) ? d.reciente : []).map((r) => ({ n: String(r.n || "Alguien"), mis: +r.mis || 0, c: !!r.c, h: String(r.h || "") }));
    FM[id] = d; famErr = 0; const j = famJ(id); if (j && (j.n !== d.nombre || (j.i || "") !== (d.intencion || "") || j.p)) { j.n = d.nombre; j.i = d.intencion || ""; delete j.p; save(); } }
  // en la invitación hay un campo de nombre: ahí solo se cambia el texto de arriba, para no borrar lo que la persona va escribiendo
  function famPinta(id, antes) {
    if (view === "fam" && famA === id) { const x = document.getElementById("finv"); if (!S.n && x && FM[id]) x.innerHTML = famInv(); else if (!S.n && x && FM[id] !== 0) return; else render(1); }
    else if ((view === "hoy" || view === "listo") && antes !== famFirma(id) && !document.getElementById("tour")) render(1);
  }
  function famVer(id, e) {
    if (!SB || !FID.test(id)) return Promise.resolve(null);
    const j = famJ(id); if (j && j.p) { famCrea(id); return Promise.resolve(null); }
    const d = key(now()), antes = famFirma(id), q = e === undefined || !S.n ? SB.rpc("fam_ver", { f: id, d, mi: UUID.test(S.mi || "") ? S.mi : null }) : SB.rpc("fam_entra", { f: id, mi: miId(), n: S.n.slice(0, 24), e, d });
    return q.then((r) => { if (r && !r.error) { if (r.data && r.data.id === id) famPon(id, r.data); else { FM[id] = 0; const j = famJ(id); if (j && !j.n && !(view === "fam" && famA === id)) { S.fam = S.fam.filter((x) => x.id !== id); save(); if (famA === id) famA = S.fam.length ? S.fam[0].id : ""; } } } else famErr = 1; famPinta(id, antes); return FM[id]; }, () => { famErr = 1; famPinta(id, antes); return null; });
  }
  const famTodos = () => S.fam.slice(0, 3).forEach((j) => famVer(j.id));
  // La familia nace en el teléfono (así la liga se puede compartir al instante) y se guarda en el servidor; si no hay señal, se reintenta sola.
  function famCrea(id) {
    const j = famJ(id); if (!j || !j.p || !SB || famCreando[id]) return;
    famCreando[id] = 1;
    const otra = () => { delete famCreando[id]; famErr = 1; if (view === "fam" && famA === id) render(1); setTimeout(() => famCrea(id), 5000); };
    SB.rpc("fam_crear", { f: id, n: j.n || "", i: j.i || "", mi: miId(), q: (S.n || "Alguien").slice(0, 24), d: key(now()) }).then((r) => {
      if (r && !r.error && r.data && r.data.id === id) { delete famCreando[id]; famPon(id, r.data); if (view === "fam" && famA === id) { render(1); famAbre(); } return; }
      const m = (r && r.error && (r.error.message || "")) || "";
      if (/ocupado|muchas|datos/.test(m)) { delete famCreando[id]; S.fam = S.fam.filter((x) => x.id !== id); save(); delete FM[id]; if (famA === id) { famA = S.fam.length ? S.fam[0].id : ""; if (view === "fam") go("hoy"); } aviso(/muchas/.test(m) ? "Hoy ya se crearon muchas familias desde este teléfono. Intenta mañana." : "No se pudo crear la familia. Intenta otra vez."); return; }
      otra();
    }, otra);
  }
  function famTxt(id, tipo) {
    const d = FM[id] || {}, j = famJ(id) || {}, n = d.nombre || j.n || "Mi familia", i = d.intencion || j.i || "", it = i ? ` Nuestra intención: «${i}».` : "";
    if (tipo === "vivo") return `Estoy en la sala de ${n}, en Atrio, para rezar el rosario.${i ? ` Lo ofrecemos: «${i}».` : ""} Entra directo con esta liga y nos vemos:`;
    if (d.misterios > 0) return `${n}: ${d.dias > 1 ? `en ${d.dias} días llevamos` : "hoy llevamos"} ${d.rosarios ? cuantos(d.rosarios, "rosario", "rosarios") + " y " : ""}${cuantos(d.aves, "Ave María", "Ave Marías")}.${it}\n\n¿Rezas hoy con nosotros? Entras directo con esta liga, sin código ni contraseña:`;
    return `${n}\nDesde hoy vamos a rezar el rosario en familia.${it}\n\nToca la liga y entras directo, sin código ni contraseña. Es gratis. Cada quien reza cuando pueda y todo se va sumando; si coincidimos, nos vemos y rezamos juntos en vivo.`;
  }
  const famComparte = (id, tipo) => { const t = famTxt(id, tipo) + "\n" + ligaFam(id); if (navigator.share) { navigator.share({ text: t }).catch(() => {}); return; } try { window.open("https://wa.me/?text=" + encodeURIComponent(t), "_blank"); } catch (_) {} };
  // Lo rezado en este rosario desde que entré: las Ave Marías pasadas y los misterios completos (de su primera Ave María a su Gloria).
  function famCta() {
    const fs = ros.fs, p = ros.p; let a = 0, m = 0;
    for (let k = fs.i0; k < fs.mx && k < p.length; k++) if (/^am\d?$/.test(p[k].t)) a++;
    for (let k = 0; k < 5; k++) { const a1 = p.findIndex((s) => s.t === "am" && s.m === k), g = p.findIndex((s) => s.t === "gl" && s.m === k); if (a1 >= 0 && g >= 0 && a1 >= fs.i0 && g < fs.mx) m++; }
    return { a, m, c: !ros.jt && m === 5 && fs.mx >= p.length };
  }
  // Se avisa al terminar cada misterio, al terminar el rosario y al cerrarlo. cierra: 1 al cerrar a medias, 2 al terminar.
  function famSuma(cierra) {
    if (!ros || !ros.p) return;
    const fs = ros.fs || (ros.fs = { s: uuid4(), i0: ros.i, mx: ros.i, m: 0, a: 0, c: false, d: key(now()) });
    if (cierra === 2) fs.mx = ros.p.length; else if (ros.i > fs.mx) fs.mx = ros.i;
    if (!S.fam.length || !jtOk()) return;
    const q = famCta();
    if (q.m === fs.m && q.c === fs.c && !(cierra && q.a !== fs.a)) return;
    fs.m = q.m; fs.a = q.a; fs.c = q.c;
    S.fam.filter((j) => !j.p).slice(0, 3).forEach((j) => { S.fq = S.fq.filter((x) => !(x.f === j.id && x.s === fs.s)); S.fq.push({ f: j.id, s: fs.s, d: fs.d, m: q.m, a: q.a, c: q.c }); });
    if (S.fq.length > 60) S.fq = S.fq.slice(-60);
    save(); famFluye();
  }
  // La cola aguanta sin señal: lo rezado se manda cuando vuelve el internet y nunca cuenta doble.
  function famFluye() {
    if (!SB || famEnv || !S.fq.length || !UUID.test(S.mi || "")) return;
    const viejo = key(add(now(), -7)); S.fq = S.fq.filter((x) => x.d >= viejo && famJ(x.f)); if (!S.fq.length) { save(); return; }
    const q = S.fq[0]; famEnv = 1;
    const quita = () => { S.fq = S.fq.filter((x) => !(x.f === q.f && x.s === q.s && x.m === q.m && x.a === q.a && x.c === q.c)); save(); };
    SB.rpc("fam_reza", { f: q.f, mi: S.mi, n: (S.n || "Alguien").slice(0, 24), d: q.d, s: q.s, ms: q.m, av: q.a, c: !!q.c }).then((r) => {
      famEnv = 0;
      if (r && !r.error) { quita(); if (r.data && r.data.id === q.f && q.d === key(now())) { const antes = famFirma(q.f); famPon(q.f, r.data); famPinta(q.f, antes); } else famVer(q.f); famFluye(); return; }
      // lo que el servidor rechaza por regla (día muy viejo, familia borrada) no se reintenta; lo demás espera a que vuelva la señal
      const e = (r && r.error) || {}; if (/^(P0|2[23])/.test(e.code || "") || /fuera de rango|no existe|muchos|llena|datos/.test(e.message || "")) { quita(); famFluye(); }
    }, () => { famEnv = 0; });
  }
  // Al abrir la página de la familia: me apunto, cargo lo rezado y entro a su sala en vivo.
  function famAbre() {
    if (view !== "fam" || !FID.test(famA)) return;
    const j = famJ(famA); if (j && j.p) { famCrea(famA); return; }
    if (!S.n) { famVer(famA); return; }
    famVer(famA, 1); famFluye();
    if (RM && !famEnt && (!sala || famS !== famA)) { if (sala) salir(); famS = famA; famEnt = 1; const fin0 = () => { famEnt = 0; if (sala && famS && ros && ros.fam === famS && !ros.sala && !ros.jt && view === "ros") { ros.sala = 1; lead = true; presSala(); render(); famVer(famS, 2); } }; entrar("F" + famA, false).then(fin0, fin0); }
  }
  const FIS = ["Por nuestra familia", "Por un enfermo", "Por un difunto", "Por la paz en México"];
  // «Mamá», «Mamá y Pau», «Mamá, Pau y Papá», «Mamá, Pau y 2 más»: primero quien dirige
  const junta = (n) => (n.length <= 1 ? n.join("") : n.length <= 3 ? n.slice(0, -1).join(", ") + " y " + n[n.length - 1] : n.slice(0, 2).join(", ") + " y " + (n.length - 2) + " más");
  const nombresP = (L, g) => { const n = L.slice().sort((a, b) => (g && a.peer === g.peer ? -1 : g && b.peer === g.peer ? 1 : 0)).map((p) => ((p.presence || {}).n || "Alguien").split(" ")[0]); return junta(n); };
  const nombresM = (L) => junta(L.map((m) => (m.n || "Alguien").split(" ")[0]));
  const conLa = (n) => (/^familia\b/i.test(n || "") ? "la " + n : n || "su familia");
  const famCuando = (h) => { const t = new Date(h); if (isNaN(t)) return ""; const hm = String(t.getHours()).padStart(2, "0") + ":" + String(t.getMinutes()).padStart(2, "0"), k = key(t); return k === key(now()) ? "hoy, " + hm : k === key(add(now(), -1)) ? "ayer, " + hm : t.getDate() + " de " + MESES[t.getMonth()]; };
  // Cada rosario completo es una rosa del ramillete; las de hoy brillan.
  function famRam(d) {
    const r = d.rosarios || 0, m = d.misterios || 0, a = d.aves || 0, h = (d.hoy || {}).rosarios || 0;
    if (!m && !a) return `<div class="fra vac z"><span class="fro">${EM.rosa}</span><p class="pin c">Todavía no tiene rosas</p><p class="sub c" style="margin-top:4px">Cada rosario que rece alguien de la familia pone una rosa aquí. La primera puede ser la tuya.</p></div>`;
    const N = Math.min(r, 24), ros = Array.from({ length: N }, (_, k) => `<i${k >= N - Math.min(h, N) ? ' class="h"' : ""}>${EM.rosa}</i>`).join("") + (r > N ? `<em>+${mil(r - N)}</em>` : "");
    return `<div class="fra z"><p class="fral">${d.dias > 1 ? `En ${d.dias} días han rezado` : "Hoy han rezado"}</p>
      <div class="frn"><p><b>${mil(r)}</b><span>${r === 1 ? "rosario" : "rosarios"}</span></p><p><b>${mil(m)}</b><span>${m === 1 ? "misterio" : "misterios"}</span></p><p><b>${mil(a)}</b><span>${a === 1 ? "Ave María" : "Ave Marías"}</span></p></div>
      ${r ? `<div class="frr" role="img" aria-label="${cuantos(r, "rosa", "rosas")}, una por cada rosario completo">${ros}</div><p class="note c" style="margin-top:8px">Una rosa por cada rosario completo.</p>` : `<p class="note c" style="margin-top:12px">Cuando alguien complete un rosario aparece la primera rosa.</p>`}</div>`;
  }
  function famInv() {
    const d = FM[famA], aq = d ? (d.miembros || []).filter((m) => m.est > 0) : [], rz = aq.filter((m) => m.est === 2);
    if (!d) return `<h1 style="margin-top:30px;font-size:34px;line-height:40px">Te invitaron a rezar el rosario en familia</h1><p class="sub">${famErr ? "No pudimos cargar la invitación. Revisa tu internet." : "Cargando la invitación…"}</p>`;
    return `<h1 style="margin-top:30px;font-size:34px;line-height:40px">${esc(d.creador)} te invitó a rezar con ${esc(conLa(d.nombre))}</h1>${d.intencion ? `<p class="pin" style="margin-top:8px">«${esc(d.intencion)}»</p>` : ""}
      ${rz.length || aq.length ? `<p class="fah"><i class="pto"></i>${esc(nombresM(rz.length ? rz : aq))} ${rz.length ? (rz.length === 1 ? "está rezando" : "están rezando") + " ahora mismo" : (aq.length === 1 ? "está" : "están") + " en la sala ahora"}</p>` : ""}
      <p class="sub">${d.misterios ? `${d.dias > 1 ? "En " + d.dias + " días llevan" : "Hoy llevan"} ${d.rosarios ? cuantos(d.rosarios, "rosario", "rosarios") + " y " : ""}${cuantos(d.aves, "Ave María", "Ave Marías")}. ` : "Reza cuando puedas: todo se va sumando. "}Para que sepan quién eres, ¿cómo te llamas?</p>`;
  }
  function famQuita(id) { if (sala && famS === id) salir(); S.fam = S.fam.filter((x) => x.id !== id); S.fq = S.fq.filter((x) => x.f !== id); save(); delete FM[id]; famOjo = 0; famA = S.fam.length ? S.fam[0].id : ""; go(famA ? "fam" : "hoy"); }
  if (Q.get("demo") || Q.get("prueba")) window.atrioF = () => ({ view, i: ros ? ros.i : -1, de: ros ? ros.p.length : 0, sala: !!sala, lead, famS, famA, gente: peersS.length, guia: (guia() && guia().presence.n) || "", cola: S.fq.length, fam: S.fam.map((x) => x.id + (x.p ? "?" : "")), fm: FM[famA] || null, noSigo, n: S.n });
  const famPend = () => { S.fam.forEach((j) => { if (j.p) famCrea(j.id); }); famFluye(); if (view === "fam") famAbre(); else if (view === "hoy") famTodos(); };
  /* ---------- rezar por alguien: se manda una luz por WhatsApp ---------- */
  const LQ = { am: ["un Ave María", "Ave María"], ros: ["un rosario", "Rosario"], vel: ["una veladora", "Veladora"] };
  let LUZ = null, luzQ = "am", luzPara = "", luzRe = 0;
  try { if (Q.get("luz")) { const j = JSON.parse(decodeURIComponent(escape(atob(Q.get("luz").replace(/-/g, "+").replace(/_/g, "/"))))); if (j && j.d && LQ[j.q]) LUZ = { d: String(j.d).slice(0, 40), p: String(j.p || "").slice(0, 40), q: j.q }; } } catch (_) {}
  const ligaLuz = (o) => { const b = btoa(unescape(encodeURIComponent(JSON.stringify(o)))).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, ""); return location.origin + location.pathname + "?luz=" + b; };
  /* ---------- cánticos: un coro canta, sin letra, una melodía modal como las del canto llano, sobre un bajo de órgano y con eco de catedral.
     Todo se genera aquí; no hay grabaciones. Cada grupo de misterios tiene su modo, su altura y su paso. ---------- */
  let MU = null;
  const hz = (m) => 440 * Math.pow(2, (m - 69) / 12);
  const MAY = [0, 2, 4, 5, 7, 9, 11], DOR = [0, 2, 3, 5, 7, 9, 10], MIX = [0, 2, 4, 5, 7, 9, 10];
  const MODO = { gozosos: [50, MAY, 0.64], luminosos: [52, MIX, 0.62], dolorosos: [50, DOR, 0.76], gloriosos: [53, MAY, 0.6] };
  // frases en grados del modo (0 es la nota final; 4, la cuerda donde se recita) con su duración en pulsos
  const FRA = [
    [[0, 1], [2, 1], [3, 1], [4, 2], [4, 1], [5, 1], [4, 3]],
    [[4, 1], [4, 1], [5, 1], [4, 1], [3, 1], [4, 2], [3, 1], [2, 1], [3, 1], [2, 2], [1, 1], [0, 4]],
    [[2, 1], [3, 1], [4, 1], [4, 1], [6, 1], [5, 1], [4, 2], [5, 1], [4, 1], [3, 1], [2, 3]],
    [[4, 1], [5, 1], [7, 2], [6, 1], [5, 1], [4, 2], [3, 1], [4, 1], [2, 1], [1, 1], [0, 4]],
    [[0, 1], [-1, 1], [0, 1], [2, 1], [3, 2], [2, 1], [3, 1], [4, 3]],
    [[4, 1], [3, 1], [4, 1], [5, 2], [4, 1], [3, 1], [2, 1], [3, 1], [1, 1], [0, 4]],
    [[7, 2], [6, 1], [7, 1], [5, 1], [4, 2], [5, 1], [3, 1], [4, 1], [2, 2], [1, 1], [0, 5]],
    [[0, 2], [1, 1], [2, 1], [1, 1], [0, 5]]
  ], ORDF = [0, 1, 2, 3, 4, 5, 2, 6, 4, 1, 7];
  const VOC = { o: [430, 820, 2650], a: [690, 1140, 2700] };
  // eco de catedral: ruido que se apaga en cinco segundos y se va oscureciendo, con unas primeras reflexiones
  function eco(ac) {
    const sr = ac.sampleRate, n = Math.floor(sr * 5.5), b = ac.createBuffer(2, n, sr);
    for (let c = 0; c < 2; c++) { const x = b.getChannelData(c); let y = 0;
      for (let i = 0; i < n; i++) { const t = i / n, a = 0.55 - 0.47 * Math.min(1, t * 2.2); y += a * (Math.random() * 2 - 1 - y); x[i] = y * Math.pow(1 - t, 2.6) * (1 + 1.6 * (0.55 - a)) * Math.min(1, i / (sr * 0.012)); }
      [0.019, 0.031, 0.047, 0.063].forEach((d, k) => { x[Math.floor(sr * (d + c * 0.004))] += (k % 2 ? -0.5 : 0.6) / (k + 1); }); }
    return b;
  }
  function motor(ac, set) {
    const md = MODO[set] || MODO.gozosos, fin = md[0], esc_ = md[1], pulso = md[2], nota = (g) => fin + esc_[((g % 7) + 7) % 7] + 12 * Math.floor(g / 7);
    const out = ac.createGain(), bus = ac.createGain(), lp = ac.createBiquadFilter(), rv = ac.createConvolver(), seco = ac.createGain(), hum = ac.createGain(), cmp = ac.createDynamicsCompressor();
    lp.type = "lowpass"; lp.frequency.value = 3800; lp.Q.value = 0.3; rv.buffer = eco(ac); seco.gain.value = 0.34; hum.gain.value = 0.95; out.gain.value = 0; bus.gain.value = 0.8;
    cmp.threshold.value = -22; cmp.knee.value = 20; cmp.ratio.value = 3; cmp.attack.value = 0.03; cmp.release.value = 0.5;
    bus.connect(lp); lp.connect(seco); lp.connect(rv); rv.connect(hum); const lim = ac.createDynamicsCompressor(); lim.threshold.value = -2.5; lim.knee.value = 2; lim.ratio.value = 20; lim.attack.value = 0.003; lim.release.value = 0.2;
    seco.connect(cmp); hum.connect(cmp); cmp.connect(out); out.connect(lim); lim.connect(ac.destination);
    // la voz: una onda de garganta (armónicos que se apagan suave), su pecho y tres formantes que hacen la vocal
    const N = 26, re = new Float32Array(N), im = new Float32Array(N); for (let k = 1; k < N; k++) im[k] = 1 / Math.pow(k, 1.22);
    const onda = ac.createPeriodicWave(re, im), cant = [];
    const cantor = (oct, pan, vol, des) => {
      const g = ac.createGain(), mix = ac.createGain(), pe = ac.createBiquadFilter(), pg = ac.createGain(), lf = ac.createOscillator(), lg = ac.createGain(), os = [ac.createOscillator(), ac.createOscillator()], k = oct ? 1.15 : 1;
      g.gain.value = 0; mix.gain.value = 0.5; pe.type = "lowpass"; pe.frequency.value = oct ? 900 : 520; pg.gain.value = 0.3; mix.connect(pe); pe.connect(pg); pg.connect(g);
      os.forEach((o, q) => { o.setPeriodicWave(onda); o.frequency.value = hz(fin + 12 * oct); o.detune.value = des + (q ? 7 : -6); o.connect(mix); });
      lf.frequency.value = 4.3 + Math.random() * 1.2; lg.gain.value = 6 + Math.random() * 5; lf.connect(lg); os.forEach((o) => lg.connect(o.detune));
      const fs = [0, 1, 2].map((q) => { const f = ac.createBiquadFilter(), fg = ac.createGain(); f.type = "bandpass"; f.Q.value = [4.5, 7, 8][q]; f.frequency.value = k * VOC.o[q]; fg.gain.value = [1.25, 0.62, 0.22][q]; mix.connect(f); f.connect(fg); fg.connect(g); return f; });
      if (ac.createStereoPanner) { const pn = ac.createStereoPanner(); pn.pan.value = pan; g.connect(pn); pn.connect(bus); } else g.connect(bus);
      os.forEach((o) => o.start()); lf.start(); cant.push({ g, os, fs, oct, vol, k, dt: Math.random() * 0.035 });
    };
    cantor(0, -0.4, 1, -4); cantor(0, 0.35, 0.95, 5); cantor(0, 0, 1, 0); cantor(1, -0.2, 0.3, 3); cantor(1, 0.22, 0.27, -5);
    // el órgano: un bajo que no se mueve (la final y su quinta) y un acorde suave que responde entre frase y frase
    const tubo = (m, tipo, vol, t0, dur) => { const o = ac.createOscillator(), g = ac.createGain(); o.type = tipo; o.frequency.value = hz(m); o.detune.value = Math.random() * 6 - 3; g.gain.value = 0; o.connect(g); g.connect(bus);
      if (dur) { g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(vol, t0 + dur * 0.4); g.gain.setTargetAtTime(0, t0 + dur * 0.55, dur * 0.3); o.start(t0); o.stop(t0 + dur * 2.4); } else { g.gain.setTargetAtTime(vol, t0, 2.5); o.start(t0); } };
    let t = ac.currentTime + 0.3, n = 0;
    [[fin - 12, "sine", 0.02], [fin, "sine", 0.03], [fin, "triangle", 0.012], [fin + 7, "sine", 0.02]].forEach((q) => tubo(q[0], q[1], q[2], t, 0));
    const resp = (t0, gr) => { [0, 4, 7, 9].forEach((d, q) => { tubo(nota(gr + d), q % 2 ? "triangle" : "sine", [0.034, 0.026, 0.024, 0.014][q], t0, 3.6); }); };
    const camp = (t0) => { const f = hz(fin + 24); [[0.5, 0.5, 4.5], [1, 1, 3.6], [1.19, 0.4, 2.8], [1.5, 0.28, 2.3], [2, 0.42, 1.9], [2.74, 0.16, 1.2], [3, 0.12, 0.9]].forEach((q) => { const o = ac.createOscillator(), g = ac.createGain(); o.frequency.value = f * q[0]; g.gain.setValueAtTime(0, t0); g.gain.linearRampToValueAtTime(0.026 * q[1], t0 + 0.008); g.gain.setTargetAtTime(0, t0 + 0.02, q[2] / 3); o.connect(g); g.connect(bus); o.start(t0); o.stop(t0 + q[2] * 2.2); }); };
    const canta = (t0, fr, alto) => { let x = t0;
      cant.forEach((c) => { if (c.oct && !alto) return; c.g.gain.setTargetAtTime(c.vol * 0.24, t0 + c.dt, 0.3); });
      fr.forEach((q) => { const ab = Math.max(0, Math.min(1, (q[0] - 1) / 5));
        cant.forEach((c) => { if (c.oct && !alto) return; const tt = x + c.dt; c.os.forEach((o) => o.frequency.setTargetAtTime(hz(nota(q[0]) + 12 * c.oct), tt, 0.032)); c.fs.forEach((f, w) => f.frequency.setTargetAtTime(c.k * (VOC.o[w] + (VOC.a[w] - VOC.o[w]) * ab), tt, 0.14)); });
        x += q[1] * pulso; });
      cant.forEach((c) => c.g.gain.setTargetAtTime(0, x - 0.3 + c.dt, 0.45));
      return x; };
    // se va escribiendo por adelantado, frase por frase
    const agenda = (hasta) => { while (t < hasta) { const k = n % ORDF.length, fr = FRA[ORDF[k]]; if (!k) { camp(t); t += 1.3; }
        const f2 = canta(t, fr, k % 4 === 3 || ORDF[k] === 6); resp(f2 - 0.7, fr[fr.length - 1][0] === 2 ? -2 : 0); t = f2 + 2.2 + (n % 3) * 0.3; n++; } };
    return { out, agenda };
  }
  function musica(on) {
    if (on && !MU) {
      try { if (navigator.audioSession) navigator.audioSession.type = "playback"; } catch (_) {}
      let ac; try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (_) { return; }
      let m; try { m = motor(ac, ros && ros.set); } catch (_) { try { ac.close(); } catch (_) {} return; }
      MU = { ac, out: m.out, m }; if (ac.state !== "running") ac.resume().catch(() => {});
      // si el teléfono interrumpe el audio (llamada, otra app), se reanuda al volver
      ac.onstatechange = () => { if (MU && MU.ac === ac && ac.state !== "running" && ac.state !== "closed") ac.resume().catch(() => {}); };
      m.agenda(ac.currentTime + 9); MU.k = setInterval(() => { if (MU) try { MU.m.agenda(MU.ac.currentTime + 9); } catch (_) {} }, 1000);
      volMu();
    } else if (!on && MU) { const m = MU; MU = null; clearInterval(m.k); try { m.out.gain.cancelScheduledValues(m.ac.currentTime); m.out.gain.setTargetAtTime(0, m.ac.currentTime, 0.6); } catch (_) {} setTimeout(() => { try { m.ac.close(); } catch (_) {} }, 3500); }
  }
  // más bajita cuando la familia habla por la sala
  function volMu() { if (!MU) return; const v = VZ ? 0.6 : 1.8; try { MU.out.gain.cancelScheduledValues(MU.ac.currentTime); MU.out.gain.setTargetAtTime(v, MU.ac.currentTime, 0.8); } catch (_) {} }
  if (Q.get("demo") || Q.get("prueba")) { window.atrioMu = () => { if (!MU) return null; if (!MU.an) { MU.an = MU.ac.createAnalyser(); MU.out.connect(MU.an); } const b = new Float32Array(2048); MU.an.getFloatTimeDomainData(b); let q = 0; for (const v of b) q += v * v; return { st: MU.ac.state, rms: Math.sqrt(q / b.length) }; };
    // para oírlo sin teléfono: lo graba fuera de tiempo real y devuelve el sonido y su volumen
    window.atrioCanto = (seg, set) => { const oc = new OfflineAudioContext(2, 44100 * seg, 44100), m = motor(oc, set); m.out.gain.value = 1.8; m.agenda(seg); return oc.startRendering().then((b) => { const L = b.getChannelData(0), R = b.getChannelData(1), mono = new Array(L.length >> 1); let pk = 0, q = 0; for (let i = 0; i < L.length; i++) { const v = (L[i] + R[i]) / 2; pk = Math.max(pk, Math.abs(L[i]), Math.abs(R[i])); q += v * v; if (!(i & 1)) mono[i >> 1] = Math.round(Math.max(-1, Math.min(1, v)) * 32767); } return { pk, rms: Math.sqrt(q / L.length), mono }; }); }; }
  const botMu = () => `<button class="ic r mu${S.mu ? " on" : ""}" data-a="mu" aria-label="${S.mu ? "Apagar la música" : "Poner música de fondo"}" aria-pressed="${!!S.mu}">${S.mu ? I.nota : I.notano}</button>`;
  const presSala = () => { if (sala) sala.presence({ n: S.n.slice(0, 24), e: S.e, lead: lead ? 1 : 0, on: ros && ros.sala ? 1 : 0, i: ros ? ros.i : 0, set: ros ? ros.set : "", f: ros ? ros.f : "", fin: null }).catch(() => {}); };
  // dirige quien está rezando; si ya terminó, quien avisó que terminó
  const guia = () => { const L = peersS.filter((p) => p.presence && p.presence.lead).sort((a, b) => (a.peer < b.peer ? -1 : 1)); return L.find((p) => p.presence.on) || L.find((p) => p.presence.fin) || L[0]; };
  // en qué va el rosario de quien dirige: «Van en el tercer misterio»
  const PASOS = {};
  const faseDe = (g) => { const f = g.presence.f === "mx" ? "mx" : "un", p = PASOS[f] || (PASOS[f] = pasos(f)), st = p[Math.max(0, Math.min(p.length - 1, g.presence.i | 0))]; return st.m != null ? "Van en el " + ORD[st.m].toLowerCase() + " misterio" : st.fin ? "Ya van terminando" : "Van empezando"; };
  // lo que hace falta volver a pintar: quién está y, si dirige otro, en qué va (en la página de la familia basta el misterio; quien dirige ya pinta su propia cuenta)
  const pkAhora = () => { const g = guia(); return peersS.map((p) => { const r = p.presence || {}; return p.peer + ":" + (r.n || "") + (r.v || 0) + (r.c || 0) + (r.lead || 0) + (r.on || 0) + (r.fin || 0); }).join() + "|" + (g && !g.isMe && g.presence.on ? (view === "fam" ? faseDe(g) : g.presence.i | 0) + (g.presence.set || "") : ""); };
  // Cada vez que cambia algo en la sala: quién está, quién dirige y en qué cuenta va
  function salaCambio() {
    if (!sala) return;
    if (VZ) Object.keys(VZ.pcs).forEach((id) => { if (!peersS.some((p) => p.peer === id)) cuelga(id); });
    // en la sala de una familia cualquiera puede empezar; si dos empiezan a la vez, dirige quien tiene la llave menor y el otro lo sigue
    if (lead && famS && ros && ros.sala && peersS.some((p) => !p.isMe && p.presence && p.presence.lead && p.presence.on && p.peer < sala.yo)) { famSuma(1); lead = false; presSala(); }
    const g = guia(), sigue = !lead && g && !g.isMe, pk = pkAhora(), cambio = pk !== pk0; pk0 = pk;
    if (sigue && g.presence.fin && ros && ros.sala) { fin(); return; }
    if (sigue && g.presence.on && !(famS && (noSigo || view === "fed"))) {
      tSinG = 0;
      const gf = g.presence.f === "mx" ? "mx" : "un", antes = view + "|" + (ros && ros.sala ? ros.i : -1);
      if (!ros || !ros.sala || ros.set !== g.presence.set || ros.f !== gf) { if (ros) famSuma(1); ros = { set: MIS[g.presence.set] ? g.presence.set : MIS_DIA[now().getDay()], i: 0, sala: 1, f: gf, g: grande0(1) }; if (famS) { ros.fam = famS; famB = 0; famVer(famS, 2); } ros.p = pasos(gf); view = "ros"; }
      const i = Math.max(0, Math.min(ros.p.length - 1, g.presence.i | 0));
      if (i !== ros.i || view !== "ros") { ros.an = i < ros.i ? "at" : "sg"; ros.i = i; view = "ros"; vibraPaso(); }
      famSuma();
      if (cambio || antes !== view + "|" + ros.i) render(); ros.an = "";
    } else {
      // quien dirigía se fue a medio rosario: a los nueve segundos cualquiera puede seguir dirigiendo
      if (ros && ros.sala && !lead && view === "ros") { if (!tSinG) { tSinG = Date.now(); setTimeout(() => { if (tSinG && view === "ros" && ros && ros.sala && !lead) render(); }, 9200); } } else tSinG = 0;
      if (cambio) { if (view === "sala" || view === "fam") render(1); else if (view === "ros" && ros && ros.sala) render(); }
    }
    if (famS && gente0 !== peersS.length) { gente0 = peersS.length; clearTimeout(tGente); tGente = setTimeout(() => { if (famS && view === "fam") famVer(famS, 1); }, 1500); }
  }
  async function entrar(code, crea) {
    if (!RM) return;
    try {
      codigo = code; lead = !!crea; pk0 = ""; sala = await RM.join("s-" + code.toLowerCase());
      sala.onPeers((c) => { peersS = c.peers || []; salaCambio(); }, () => { sala = null; peersS = []; if (view === "sala" || view === "fam") render(1); });
      presSala(); if (view === "sala" || view === "fam") render(1);
    } catch (_) { sala = null; if (view === "sala" || view === "fam") render(1); aviso("No se pudo abrir la sala. Intenta otra vez."); }
  }
  function salir() { const f = famS; apagaVoz(1); try { if (sala) sala.leave(); } catch (_) {} sala = null; peersS = []; lead = false; codigo = ""; famS = ""; tSinG = 0; noSigo = 0; pk0 = "";
    if (f && SB && S.n && UUID.test(S.mi || "")) try { SB.rpc("fam_entra", { f, mi: S.mi, n: S.n.slice(0, 24), e: 0, d: key(now()) }).then(() => {}, () => {}); } catch (_) {} }

  /* ---------- piezas visuales ---------- */
  const SKY = [[20, 5, 10, 0], [55, 8, 8, 1.4], [86, 4, 10, 2.6], [1.5, 430, 9, 0.8], [96.5, 300, 9, 3.3], [96, 610, 8, 2], [1.5, 700, 8, 1.1], [9, 92, 5, 2.1], [38, 30, 5, 3.7], [70, 58, 6, 0.4], [93, 140, 5, 1.7], [4, 236, 6, 2.9], [97, 468, 5, 0.2], [3, 560, 5, 3.1], [95, 820, 7, 1.3], [2, 930, 6, 2.4], [97, 1080, 6, 0.9], [3, 1240, 7, 1.9]];
  const sky = () => '<div class="sky"><i class="cup"></i>' + SKY.map(([x, y, sz, d]) => star(sz, "#F4DCA6", `class="tw${sz < 7 ? " tq" : ""}" style="left:${x}%;top:${y}px;animation-delay:${d}s"`)).join("") + "</div>";
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
  // El rosario se reza de dos formas, las dos de la Iglesia (Rosarium Virginis Mariae, 37):
  //  «mx», como en México: señal de la cruz y acto de contrición; tras cada Gloria, «María, Madre de gracia» y «Oh Jesús mío»;
  //        al final, Padre nuestro, tres Ave Marías, Salve y letanías.
  //  «un», con Credo al inicio: Credo, Padre nuestro y tres Ave Marías antes de los misterios; al final, la Salve.
  // «b» es la cuenta que se enciende: la cruz (x), la medalla (M), las del colgante (g1 junto a la medalla, p3 a p1 y p0 junto a la cruz) y las de cada misterio.
  // la vista con que abre el rosario: la última que usó; en una sala, el rosario grande con la familia dentro
  const grande0 = (enSala) => ((enSala ? S.rg !== 0 : S.rg === 1) ? 1 : 0);
  // si la oración no cabe en la pantalla, el primer toque de «Amén» baja a lo que falta y el segundo avanza
  const rueda = () => document.scrollingElement || document.documentElement;
  const falta = () => { const e = rueda(); return !!e && e.scrollHeight - e.clientHeight - e.scrollTop > 30; };
  const baja = () => { const e = rueda(); try { e.scrollBy({ top: Math.max(140, e.clientHeight - 300), behavior: "smooth" }); } catch (_) { e.scrollTop += 300; } };
  const mas = () => { const q = app.querySelector(".rpie"); if (q) q.classList.toggle("mas", !!(ros && !ros.g && falta())); };
  const forma = () => (S.fr === "mx" || S.fr === "un" ? S.fr : S.e === 99 ? "un" : "mx");
  // El primer Padre nuestro no tiene cuenta en el collar: en México se reza en la medalla; con Credo, en la cuenta grande junto a ella
  const decena = (p, m, mx) => { const g = m ? "L" + m : mx ? "M" : "g1"; p.push({ t: "mis", m, b: g }); p.push({ t: "pn", m, b: g }); for (let k = 1; k <= 10; k++) p.push({ t: "am", m, k, of: 10, b: "s" + m + "_" + k }); p.push({ t: "gl", m, x: mx ? 2 : 1, lg: mx ? 1 : 0, b: "s" + m + "_10" }); };
  const cierre = (p, mx, solo) => { if (mx) { if (!solo) { p.push({ t: "pn", b: "g1", fin: 1, l: "Por las intenciones del Papa" }); [1, 2, 3].forEach((k) => p.push({ t: "am" + k, k, of: 3, b: "p" + (4 - k), fin: 1, lg: 1 })); } p.push({ t: "salvemx", b: "p0", fin: 1, lg: 2 }); if (!solo) for (let k = 1; k <= LET.length; k++) p.push({ t: "let", k, of: LET.length, b: "x", fin: 1 }); } else { p.push({ t: "salve", b: "M", fin: 1, lg: 1 }); if (!solo) p.push({ t: "fin", b: "M", fin: 1 }); } };
  function pasos(f) {
    const mx = f === "mx", p = mx
      ? [{ t: "cruz", b: "x" }, { t: "contri", b: "M", lg: 1 }, { t: "abre", b: "M" }]
      : [{ t: "cruz", b: "x" }, { t: "credo", b: "x", lg: 1 }, { t: "pn", b: "p0" }, { t: "am", k: 1, of: 3, b: "p1" }, { t: "am", k: 2, of: 3, b: "p2" }, { t: "am", k: 3, of: 3, b: "p3" }, { t: "gl", b: "p3" }];
    for (let m = 0; m < 5; m++) decena(p, m, mx);
    cierre(p, mx); return p;
  }
  // estado de cada cuenta: las ya rezadas y la que se está rezando
  const cuentas = (i) => { const P = ros.p, done = {}, cur = P[i].b; for (let j = 0; j < i; j++) done[P[j].b] = 1;
    if (ros.jt) jtHechos(ros.jt.id).forEach((m) => { if (m) done["L" + m] = 1; else if (ros.f !== "mx") done.g1 = 1; for (let k = 1; k <= 10; k++) done["s" + m + "_" + k] = 1; });
    return { done, cur }; };
  const f1 = (n) => (Math.round(n * 10) / 10).toString();
  // una cuenta: perla plateada mientras espera; de oro y con luz cuando ya se rezó. Devuelve [halo, perla]
  const perla = (o, id, x, y, r, oro) => { const c = id === o.cur, d = o.done[id], rr = c ? r * 1.38 : r;
    return [c || d ? `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(rr * (c ? 3.6 : 2.7))}" fill="url(#rgl)"${c ? "" : ' opacity=".6"'}/>` : "",
      (c ? `<circle class="pu" cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 2.05)}" fill="none" stroke="#FBE9BE" stroke-width="${f1(r * 0.32)}"/>` : "") +
      `<circle${c ? ' class="cur"' : ""} cx="${f1(x)}" cy="${f1(y)}" r="${f1(rr)}" fill="url(#${c ? "rbc" : d ? (oro ? "rbd" : "rbo") : oro ? "rbg" : "rbf"})"/><circle cx="${f1(x - rr * 0.3)}" cy="${f1(y - rr * 0.34)}" r="${f1(rr * 0.25)}" fill="#fff" opacity="${c ? 0.95 : d ? 0.85 : 0.55}"/>` +
      (c ? `<g transform="translate(${f1(x + rr * 0.95)} ${f1(y - rr * 1.05)}) scale(${f1(r * 0.13)}) translate(-8 -8)"><polygon class="gli" fill="#fff" points="${S16}"/></g>` : "")]; };
  const DEFS = `<radialGradient id="rbf" cx=".34" cy=".3" r=".78"><stop offset="0" stop-color="#F6FBFA"/><stop offset=".42" stop-color="#B4CCCA"/><stop offset=".86" stop-color="#5F8486"/><stop offset="1" stop-color="#365C60"/></radialGradient>
      <radialGradient id="rbo" cx=".34" cy=".3" r=".78"><stop offset="0" stop-color="#FFFDF2"/><stop offset=".4" stop-color="#FBE2A8"/><stop offset=".86" stop-color="#DDAA50"/><stop offset="1" stop-color="#A97722"/></radialGradient>
      <radialGradient id="rbg" cx=".34" cy=".3" r=".78"><stop offset="0" stop-color="#F3E6BC"/><stop offset=".45" stop-color="#B99C58"/><stop offset="1" stop-color="#5E4C20"/></radialGradient>
      <radialGradient id="rbd" cx=".34" cy=".3" r=".78"><stop offset="0" stop-color="#FFF9DE"/><stop offset=".4" stop-color="#F6D27A"/><stop offset=".86" stop-color="#CC9631"/><stop offset="1" stop-color="#93661A"/></radialGradient>
      <radialGradient id="rbc" cx=".4" cy=".36" r=".75"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".5" stop-color="#FFF4D2"/><stop offset="1" stop-color="#F3CB78"/></radialGradient>
      <radialGradient id="rgl"><stop offset="0" stop-color="#FFEFC4" stop-opacity=".62"/><stop offset=".45" stop-color="#F0CF8A" stop-opacity=".2"/><stop offset="1" stop-color="#E6C27A" stop-opacity="0"/></radialGradient>`;
  /* El rosario como aro de luz (para leer la oración): 50 perlas y 4 cuentas de oro en el collar, la medalla y el colgante.
     Cada cuenta tiene su rayo y lo enciende al rezarla; detrás avanza la luz del misterio. */
  const TONO = { gozosos: ["#FCE6BA", "#F2A69C"], luminosos: ["#FFF7D2", "#9AD2E8"], dolorosos: ["#F0909C", "#9150A0"], gloriosos: ["#FFE694", "#6FA0E2"] };
  function ring(i) {
    const o = cuentas(i), done = o.done, cur = o.cur, cx = 130, cy = 100, R = 94, st = 360 / 55, ang = (n) => ((90 + n * st) * Math.PI) / 180, tn = TONO[ros.set] || TONO.gozosos, RI = 57.5, RO = 88.6;
    let luz = "", cu = "", vit = "", ap = "", en = "";
    const pon = (id, x, y, r, oro) => { const q = perla(o, id, x, y, r, oro); luz += q[0]; cu += q[1]; };
    const pt = (r, a) => f1(cx + r * Math.cos(a)) + " " + f1(cy + r * Math.sin(a));
    const rayos = (n, on, largo) => { const a = ang(n), b = ang(n + 0.5), mb = (71 + RO) / 2, d = `M${pt(largo ? 58.5 : 64.5, a)}L${pt(RO, a)}M${pt(72, b)}Q${f1(cx + mb * Math.cos(b) - 1.9 * Math.sin(b))} ${f1(cy + mb * Math.sin(b) + 1.9 * Math.cos(b))} ${pt(RO, b)}`; if (on) en += d; else ap += d; };
    for (let m = 0; m < 5; m++) { let n = 0; const g = m ? "L" + m : "", pn = !!g && (done[g] || cur === g);
      if (g) { const a = ang(m * 11); rayos(m * 11, pn, 1); pon(g, cx + R * Math.cos(a), cy + R * Math.sin(a), 4.9, 1); }
      for (let k = 1; k <= 10; k++) { const id = "s" + m + "_" + k, on = done[id] || id === cur, a = ang(m * 11 + k); if (on) n = k; rayos(m * 11 + k, on); pon(id, cx + R * Math.cos(a), cy + R * Math.sin(a), 3.4); }
      if (pn || n) { const a0 = ang(m * 11 + (g ? -0.5 : 0.5)), a1 = ang(m * 11 + n + 0.5); vit += `<path d="M${pt(RO + 1, a0)}A${RO + 1} ${RO + 1} 0 0 1 ${pt(RO + 1, a1)}L${pt(RI, a1)}A${RI} ${RI} 0 0 0 ${pt(RI, a0)}Z" fill="url(#rpt)"/>`; } }
    vit += `<path d="${ap}" fill="none" stroke="#E6C27A" stroke-opacity=".3" stroke-width=".7" stroke-linecap="round"/>` + (en ? `<path d="${en}" fill="none" stroke="#FFF3D0" stroke-opacity=".34" stroke-width="2.6" stroke-linecap="round"/><path d="${en}" fill="none" stroke="#FFF1C9" stroke-width="1" stroke-linecap="round"/>` : "") +
      `<circle cx="${cx}" cy="${cy}" r="${RI - 1.6}" fill="none" stroke="#E6C27A" stroke-opacity=".34" stroke-width=".7"/>`;
    const mc = cur === "M", mon = mc || i > 0, my = cy + R + 1.5, xc = cur === "x", xy = my + 56.6;
    pon("g1", cx, my + 15.5, 4.3, 1); pon("p3", cx, my + 25.2, 3.1); pon("p2", cx, my + 33, 3.1); pon("p1", cx, my + 40.8, 3.1); pon("p0", cx, my + 50.3, 4.3, 1);
    const med = (mc ? `<circle cx="${cx}" cy="${my}" r="22" fill="url(#rgl)"/><ellipse class="pu" cx="${cx}" cy="${my}" rx="11" ry="12.6" fill="none" stroke="#FBE9BE" stroke-width="1.1"/>` : "") +
      `<g transform="translate(${cx} ${my})"${mon ? "" : ' opacity=".9"'}><ellipse rx="7.6" ry="9.2" fill="url(#${mon ? "rbd" : "rbg"})" stroke="#7E5C1B" stroke-width=".5"/><ellipse rx="5.7" ry="7.3" fill="none" stroke="#FFF6DA" stroke-opacity=".6" stroke-width=".5"/><polygon transform="translate(-3.7 -3.7) scale(.4625)" fill="${mon ? "#FFFBEA" : "#EAD9A8"}" points="${S16}"/></g>`;
    const cruz = (xc ? `<circle cx="${cx}" cy="${xy + 8}" r="21" fill="url(#rgl)"/><circle class="pu" cx="${cx}" cy="${xy + 8.5}" r="12.5" fill="none" stroke="#FBE9BE" stroke-width="1.1"/>` : "") +
      `<g transform="translate(${cx} ${f1(xy)})"><path d="M0 0v17M-6 5.5h12" stroke="${xc ? "#FFF3D0" : "#C99A45"}" stroke-width="2.7" stroke-linecap="round"/><path d="M0 .4v16.2M-5.6 5.5h11.2" stroke="${xc ? "#FFFFFF" : "#F6E0AC"}" stroke-width="1.05" stroke-linecap="round"/><circle cy="5.5" r="1.35" fill="#FFF8E1"/></g>`;
    return `<svg width="260" height="262" viewBox="0 0 260 270" aria-hidden="true"><defs>${DEFS}
      <radialGradient id="rpt" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${RO + 1}"><stop offset=".63" stop-color="${tn[0]}" stop-opacity="0"/><stop offset=".8" stop-color="${tn[0]}" stop-opacity=".34"/><stop offset="1" stop-color="${tn[1]}" stop-opacity=".62"/></radialGradient>
      <radialGradient id="rvl" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${RI}"><stop offset="0" stop-color="#113F45" stop-opacity=".55"/><stop offset=".7" stop-color="#0B3237" stop-opacity=".5"/><stop offset="1" stop-color="#082A2F" stop-opacity=".72"/></radialGradient></defs>
      <circle cx="${cx}" cy="${cy}" r="${RI - 1.6}" fill="url(#rvl)"/><g class="vit">${vit}</g>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#E6C27A" stroke-opacity=".42" stroke-width=".9"/><path d="M${cx} ${my + 9}V${f1(xy)}" stroke="#E6C27A" stroke-opacity=".5" stroke-width=".9"/>
      ${luz}${cu}${med}${cruz}</svg>`;
  }
  /* El rosario real, a pantalla completa: cinco lados, uno por misterio, con las cuentas de Padre nuestro en las esquinas;
     medalla de la Virgen, colgante de cinco cuentas y crucifijo. Va en el sentido del aro: el primer misterio sube por la izquierda. */
  const JY = (() => {
    const K = [[50, 300], [94, 100], [296, 100], [340, 300]], cen = [195, 262], pos = {}, curv = [];
    [[[186, 441], K[0], 15, 19], [K[0], K[1], 19, 19], [K[1], K[2], 19, 19], [K[2], K[3], 19, 19], [K[3], [204, 441], 19, 15]].forEach(([A, B, ga, gb], m) => {
      const mx = (A[0] + B[0]) / 2, my = (A[1] + B[1]) / 2, dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy); let nx = -dy / L, ny = dx / L;
      if (Math.hypot(mx + nx - cen[0], my + ny - cen[1]) < Math.hypot(mx - cen[0], my - cen[1])) { nx = -nx; ny = -ny; }
      const bw = m === 2 ? 7 : 11, C = [mx + nx * bw, my + ny * bw]; curv.push([A, C, B]);
      for (let k = 1; k <= 10; k++) { const t = ga / L + ((k - 1) * (1 - (ga + gb) / L)) / 9, u = 1 - t; pos["s" + m + "_" + k] = [u * u * A[0] + 2 * t * u * C[0] + t * t * B[0], u * u * A[1] + 2 * t * u * C[1] + t * t * B[1]]; } });
    K.forEach((q, n) => { pos["L" + (n + 1)] = q; });
    pos.M = [195, 462]; pos.g1 = [195, 508]; pos.p3 = [195, 530]; pos.p2 = [195, 548]; pos.p1 = [195, 566]; pos.p0 = [195, 588]; pos.x = [195, 652];
    let ray = ""; for (let k = 0; k < 28; k++) { const a = (k / 28) * 2 * Math.PI, e = k % 2 ? 0.78 : 1; ray += f1(11.8 * e * Math.cos(a)) + "," + f1(17.8 * e * Math.sin(a)) + " "; }
    return { pos, curv, ray, cad: `M${curv[0][0][0]} ${curv[0][0][1]}` + curv.map((c) => `Q${f1(c[1][0])} ${f1(c[1][1])} ${c[2][0]} ${c[2][1]}`).join("") + "M195 486V603" };
  })();
  function joya(i, corta) {
    const o = cuentas(i), done = o.done, cur = o.cur, tn = TONO[ros.set] || TONO.gozosos, P = JY.pos; let luz = "", cu = "", aura = "", som = "";
    // cada cuenta: sombra suave abajo, perla con oriente de nácar; las de Padre nuestro, esferas de filigrana de oro
    const pon = (id, r, oro) => { const x = P[id][0], y = P[id][1], c = id === cur, rr = c ? r * 1.38 : r, q = perla(o, id, x, y, r, oro), t = `translate(${f1(x)} ${f1(y)})`; luz += q[0];
      som += `<ellipse cx="${f1(x + rr * 0.12)}" cy="${f1(y + rr * 0.42)}" rx="${f1(rr * 1.02)}" ry="${f1(rr * 0.95)}" fill="#03191C" opacity=".42"/>`;
      cu += q[1] + (oro ? `<g transform="${t}" fill="none" stroke-width="${f1(rr * 0.07)}"><g stroke="#6E4E14" stroke-opacity=".55"><ellipse rx="${f1(rr * 0.97)}" ry="${f1(rr * 0.34)}"/><ellipse rx="${f1(rr * 0.34)}" ry="${f1(rr * 0.97)}"/><ellipse rx="${f1(rr * 0.72)}" ry="${f1(rr * 0.97)}"/><ellipse rx="${f1(rr * 0.97)}" ry="${f1(rr * 0.72)}"/></g><circle r="${f1(rr * 0.18)}" fill="#FFF6DA" stroke="none" opacity=".75"/><circle r="${f1(rr * 0.99)}" stroke="#FFF3D0" stroke-opacity=".55"/></g>`
        : `<g transform="${t}"><circle r="${f1(rr)}" fill="url(#jnc)"/><ellipse cy="${f1(rr * 0.58)}" rx="${f1(rr * 0.46)}" ry="${f1(rr * 0.2)}" fill="#fff" opacity=".2"/><circle cx="${f1(rr * 0.36)}" cy="${f1(-rr * 0.5)}" r="${f1(rr * 0.08)}" fill="#fff" opacity=".9"/></g>`); };
    for (let m = 0; m < 5; m++) { let n = 0; for (let k = 1; k <= 10; k++) { const id = "s" + m + "_" + k; if (done[id] || id === cur) n = k; pon(id, 7); }
      if (n) { let d = ""; for (let k = 1; k <= n; k++) d += (k === 1 ? "M" : "L") + f1(P["s" + m + "_" + k][0]) + " " + f1(P["s" + m + "_" + k][1]); if (n === 1) d += "l.1 0";
        aura += `<path d="${d}" stroke="${tn[1]}" stroke-opacity=".1" stroke-width="46"/><path d="${d}" stroke="${tn[0]}" stroke-opacity=".12" stroke-width="29"/><path d="${d}" stroke="${tn[0]}" stroke-opacity=".15" stroke-width="15"/>`; } }
    [1, 2, 3, 4].forEach((m) => pon("L" + m, 9.4, 1)); pon("g1", 9.4, 1); pon("p3", 7); pon("p2", 7); pon("p1", 7); pon("p0", 9.4, 1);
    const mc = cur === "M", mon = mc || i > 0, xc = cur === "x", pr = ros.p.length > 1 ? i / (ros.p.length - 1) : 0;
    // medalla: óvalo de oro con filo de perlitas, esmalte y la Virgen en relieve, con su resplandor
    const med = `<g transform="translate(195 462)">${mc ? `<ellipse rx="46" ry="52" fill="url(#rgl)"/><ellipse class="pu" rx="24" ry="30" fill="none" stroke="#FBE9BE" stroke-width="1.5"/>` : ""}
      <g fill="none" stroke="#D9B35A" stroke-width="1.5"><circle cx="-9" cy="-21.4" r="2.6"/><circle cx="9" cy="-21.4" r="2.6"/><circle cy="25.6" r="2.6"/></g>
      <ellipse cx="1.4" cy="3.2" rx="19" ry="25" fill="#03191C" opacity=".42"/>
      <ellipse rx="18" ry="24" fill="url(#jmm)" stroke="#6E4E14" stroke-width=".9"/><ellipse rx="17.1" ry="23.1" fill="none" stroke="#7A5716" stroke-opacity=".7" stroke-width=".9" stroke-dasharray="1.1 1.1"/><ellipse rx="15.9" ry="21.9" fill="none" stroke="#FFF6DA" stroke-opacity=".85" stroke-width="1.5" stroke-dasharray=".1 3.05" stroke-linecap="round"/>
      <ellipse rx="13.2" ry="19.2" fill="url(#jme)" stroke="#8A6420" stroke-width=".7"/>
      <polygon points="${JY.ray}" fill="#F3D484" opacity="${mon ? ".96" : ".6"}"/>
      <path d="M0-12.5C3-12.5 4.4-10 4.2-7.8 6.3-4.8 7.3-.2 7.6 5.4 7.9 9.6 6.6 12.6 0 12.6-6.6 12.6-7.9 9.6-7.6 5.4-7.3-.2-6.3-4.8-4.2-7.8-4.4-10-3-12.5 0-12.5Z" fill="url(#jmv)" stroke="#FFF3D0" stroke-width=".6"/>
      <g fill="#FFF3C4">${Array.from({ length: 12 }, (_, k) => { const a = Math.PI * (1.12 + (k * 0.76) / 11); return `<circle cx="${f1(10.6 * Math.cos(a))}" cy="${f1(-3 + 15.4 * Math.sin(a))}" r=".62"/>`; }).join("")}</g><ellipse cy="-8.5" rx="1.9" ry="2.4" fill="#F4DFBE"/><path d="M-1.5-2.4L0-5 1.5-2.4 0-.5Z" fill="#F4DFBE"/><g fill="#F6E0AC"><circle cx="-3.6" cy="3" r=".55"/><circle cx="3.4" cy="1.2" r=".55"/><circle cx="-2" cy="8" r=".55"/><circle cx="2.8" cy="7" r=".55"/><circle cx="4.6" cy="4.6" r=".5"/><circle cx="-4.8" cy="6.4" r=".5"/></g>
      <path d="M-4.6 14.2Q0 17 4.6 14.2" fill="none" stroke="#F6E0AC" stroke-width="1.1" stroke-linecap="round"/></g>`;
    // crucifijo: oro con esmalte y remates de botón
    const tre = (x, y, a) => { const c = Math.cos(a), s2 = Math.sin(a), p = (u, v) => `cx="${f1(x + u * c - v * s2)}" cy="${f1(y + u * s2 + v * c)}"`; return `<circle ${p(0, -4.6)} r="4.3"/><circle ${p(-4.4, -.4)} r="4.3"/><circle ${p(4.4, -.4)} r="4.3"/><circle ${p(0, 1.4)} r="3.4"/>`; };
    const cz = `<rect x="-6" y="0" width="12" height="96" rx="3.2"/><rect x="-29" y="23" width="58" height="12" rx="3.2"/>${tre(0, 1, 0)}${tre(0, 95, Math.PI)}${tre(-29, 29, -Math.PI / 2)}${tre(29, 29, Math.PI / 2)}`;
    const cruz = `<g transform="translate(195 606)">${xc ? `<ellipse cy="48" rx="62" ry="76" fill="url(#rgl)"/><ellipse class="pu" cy="48" rx="40" ry="58" fill="none" stroke="#FBE9BE" stroke-width="1.5"/>` : ""}
      <circle cy="-4.6" r="3.4" fill="none" stroke="#D9B35A" stroke-width="1.6"/><g fill="#03191C" opacity=".42" transform="translate(2.2 4)">${cz}</g><g fill="#6E4E14" stroke="#6E4E14" stroke-width="1.7">${cz}</g><g fill="url(#jmo)">${cz}</g>
      <g fill="url(#jme)"><rect x="-3" y="6" width="6" height="84" rx="2"/><rect x="-24.5" y="26" width="49" height="6" rx="2"/></g>
      <g fill="none" stroke="#E9C67D" stroke-opacity=".55" stroke-width=".45" stroke-dasharray=".1 1.6" stroke-linecap="round"><path d="M-4.6 14V88M4.6 14V88M-26 24.6H-8M8 24.6H26M-26 33.4H-8M8 33.4H26"/></g>
      <g stroke="#F6E0AC" stroke-width=".55" stroke-linecap="round" opacity=".8">${Array.from({ length: 16 }, (_, k) => { const a = (k / 16) * 2 * Math.PI, l = k % 2 ? 9 : 12.5; return `<path d="M${f1(5.2 * Math.cos(a))} ${f1(20 + 5.2 * Math.sin(a))}L${f1(l * Math.cos(a))} ${f1(20 + l * Math.sin(a))}"/>`; }).join("")}</g>
      <g fill="#FFF3D0"><circle cy="1" r="2.1"/><circle cy="95" r="2.1"/><circle cx="-29" cy="29" r="2.1"/><circle cx="29" cy="29" r="2.1"/><rect x="-4.4" y="9" width="8.8" height="3.8" rx=".8"/></g>
      <circle cy="19.6" r="5.2" fill="none" stroke="#FFF3D0" stroke-opacity=".7" stroke-width=".6"/><g fill="url(#jcp)" stroke="#8A6420" stroke-width=".35" stroke-linejoin="round"><path d="M-3.4 28.9L-20.2 24.6Q-21.9 24.7-21.2 26.1L-3.2 32.9ZM3.4 28.9L20.2 24.6Q21.9 24.7 21.2 26.1L3.2 32.9Z"/><path d="M-1.3 22.6H1.3L1.6 25.6Q3.6 26.4 3.9 28.8L3.8 34.6Q3.4 40.6 2.8 45.6H-2.8Q-3.4 40.6-3.8 34.6L-3.9 28.8Q-3.6 26.4-1.6 25.6Z"/><path d="M-2.6 50.2Q-2.3 60-1.8 66.6Q-1.5 72.4-.8 77.8H.9Q1.4 71.8 1.8 66Q2.3 58 2.7 50.2Z"/><path d="M-3.6 45.2H3.6L4.3 50.4Q2.4 52.2 0 51.4Q-2.4 52.2-4.3 50.4Z" fill="#FFF8E4"/></g><ellipse cy="19.7" rx="2.5" ry="3" fill="url(#jcp)" stroke="#8A6420" stroke-width=".35"/><path d="M-1.9 33.4Q0 34.6 1.9 33.4M-1.6 37.4Q0 38.4 1.6 37.4" fill="none" stroke="#B48A3C" stroke-opacity=".55" stroke-width=".35" stroke-linecap="round"/></g>`;
    const yc = cur === "x" ? 650 : cur === "p0" ? 606 : cur === "g1" ? 512 : cur === "M" ? 470 : 560, y0 = Math.max(392, Math.min(565, yc - 72.5));
    return `<svg class="jy" viewBox="${corta ? `133.5 ${f1(y0)} 123 145` : "22 76 346 634"}" aria-hidden="true"><defs>${DEFS}
      <linearGradient id="jmm" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF4CC"/><stop offset=".3" stop-color="#EBC66E"/><stop offset=".58" stop-color="#B8862A"/><stop offset=".8" stop-color="#E8C36A"/><stop offset="1" stop-color="#9A6E1C"/></linearGradient>
      <linearGradient id="jmo" gradientUnits="userSpaceOnUse" x1="-30" y1="0" x2="30" y2="98"><stop offset="0" stop-color="#FFF4CC"/><stop offset=".28" stop-color="#EBC66E"/><stop offset=".52" stop-color="#B8862A"/><stop offset=".76" stop-color="#EDCB78"/><stop offset="1" stop-color="#9A6E1C"/></linearGradient>
      <linearGradient id="jcp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#E9CF96"/><stop offset=".45" stop-color="#FFF6DC"/><stop offset="1" stop-color="#D8B670"/></linearGradient>
      <radialGradient id="jnc" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#fff" stop-opacity="0"/><stop offset=".8" stop-color="#F7C9DA" stop-opacity=".2"/><stop offset=".93" stop-color="#A8D8EE" stop-opacity=".26"/><stop offset="1" stop-color="#E8F4F2" stop-opacity=".1"/></radialGradient>
      <radialGradient id="jme" cx=".4" cy=".3" r=".9"><stop offset="0" stop-color="#1B646A"/><stop offset="1" stop-color="#082C31"/></radialGradient>
      <linearGradient id="jmv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2A8A88"/><stop offset="1" stop-color="#0F5257"/></linearGradient>
      <radialGradient id="jau"><stop offset="0" stop-color="#F4DCA6" stop-opacity=".16"/><stop offset=".6" stop-color="#F4DCA6" stop-opacity=".05"/><stop offset="1" stop-color="#F4DCA6" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="195" cy="268" rx="205" ry="240" fill="url(#jau)" opacity="${f1(0.45 + 0.55 * pr)}"/><g fill="none" stroke-linecap="round" stroke-linejoin="round">${aura}</g>
      <path d="${JY.cad}" fill="none" stroke="#03191C" stroke-opacity=".4" stroke-width="3.4" transform="translate(.8 1.8)"/><path d="${JY.cad}" fill="none" stroke="#5C4312" stroke-opacity=".7" stroke-width="2.8"/>
      <path d="${JY.cad}" fill="none" stroke="#D9AE5C" stroke-width="2.3" stroke-dasharray="3.4 1.4"/><path d="${JY.cad}" fill="none" stroke="#FFF2CC" stroke-opacity=".8" stroke-width=".7" stroke-dasharray="2 2.8" stroke-dashoffset="-.6"/><path d="${JY.cad}" fill="none" stroke="#B08433" stroke-width="1.2" stroke-dasharray="1.2 3.6" stroke-dashoffset="-3.6"/>
      ${som}${luz}${cu}${med}${cruz}</svg>`;
  }
  // dónde acomodar a la familia dentro del rosario: filas de círculos que siguen el hueco entre las cuentas
  const hueco = (y) => { const xl = y <= 300 ? 94 - ((y - 100) / 200) * 44 : 50 + ((y - 300) / 162) * 145; return [xl + 20, 370 - xl]; };
  function enjambre(n) {
    for (let s = 96; s >= 30; s -= 2) { const pts = [], g = Math.max(5, s * 0.12); let y = 126 + s / 2, ok = true;
      while (pts.length < n) { const a = hueco(y - s / 2), b = hueco(y + s / 2), w = Math.min(a[1], b[1]) - Math.max(a[0], b[0]), c = Math.min(n - pts.length, Math.floor((w + g) / (s + g)));
        if (c < 1 || y + s / 2 > 432) { ok = false; break; } const x0 = 195 - ((c - 1) * (s + g)) / 2; for (let k = 0; k < c; k++) pts.push([x0 + k * (s + g), y]); y += s + g; }
      if (ok) { const baja = Math.max(0, Math.min(26, (400 - (y - g)) / 2)); return { s, pts: baja > 8 && n > 2 ? pts : pts }; } }
    return { s: 30, pts: [] };
  }
  const tabs = (on, dk) => `<nav class="tabs dk" aria-label="Secciones">` + [["hoy", "Hoy", I.sun], ["rezar", "Rezar", I.st], ["mapa", "Mapa", I.pin], ["yo", "Yo", I.yo]].map(([v, t, ic]) => `<button class="tab${on === v ? " on" : ""}" data-a="go" data-v="${v}"${on === v ? ' aria-current="page"' : ""}>${ic}${t}</button>`).join("") + "</nav>";
  const hd = (back, title, right) => `<div class="hd z"><button class="ic" data-a="go" data-v="${back[0]}" data-b="1" aria-label="${back[1] === "x" ? "Cerrar" : "Regresar"}">${back[1] === "x" ? I.x : I.back}</button><p class="ru">${title}</p>${right || '<span class="ic"></span>'}</div>`;
  const vivos = () => peersL.filter((p) => p.kind !== "agent");
  function encendidos() { if (velasHoy) return Object.assign({}, velasHoy); const lit = {}; vivos().forEach((p) => { const pr = p.presence || {}; if (pr.r && !p.isMe && MX.e[pr.e]) lit[pr.e] = (lit[pr.e] || 0) + 1; }); return lit; }

  /* Las Vírgenes, dibujadas: cada una con su manto, su vestido y lo que la distingue,
     dentro de su nicho de luz. Iconografía tradicional, trazada aquí. */
  const VIRGD = (() => {
    const T = {
      guadalupe: { m: ["#2E8C86", "#17524F"], d: ["#E7A796", "#B9614F"], sk: "#C9946A", h: "#3A2418", est: 1, ray: "man", luna: 1, ang: 1, inc: 1 },
      fatima: { m: ["#FFFFFF", "#D8DCD8"], d: ["#FFFFFF", "#E1E4E0"], sk: "#F2D9BC", cor: 1, ro: 1, en: 1, borde: "#E3C06A", nube: 1 },
      lourdes: { m: ["#FFFFFF", "#DCE2E2"], d: ["#FFFFFF", "#E4E8E6"], sk: "#F2D9BC", faja: "#7FAEE6", ro: 1, gruta: 1, rosas: 1, ojos: 1 },
      carmen: { m: ["#F6EFDF", "#D9CDB2"], d: ["#7A5434", "#4F3520"], sk: "#F0D4B2", cor: 1, nino: 1, esc: 1 },
      pilar: { m: ["#E8F0F6", "#A9BCCB"], d: ["#E8F0F6", "#B7C6D2"], sk: "#E9C9A6", cor: 1, nino: 1, col: 1, chica: 1 },
      sanjuan: { m: ["#4E83C8", "#24508C"], d: ["#FFFFFF", "#DDE3EA"], sk: "#D8AE86", cor: 1, tri: 1, luna: 1, rayc: 1 },
      zapopan: { m: ["#3F74BC", "#1F477F"], d: ["#F4E3EA", "#D7B6C3"], sk: "#C9946A", cor: 1, tri: 1, banda: 1, rayc: 1 },
      juquila: { m: ["#FFFFFF", "#E2E2DE"], d: ["#FFFFFF", "#E2E2DE"], sk: "#D3A27C", h: "#1E140E", cor: 1, tri: 1, encaje: 1, luna: 1, rayc: 1, pelo: 1 },
      socorro: { m: ["#2B4C86", "#16294E"], d: ["#B23A34", "#7C211D"], sk: "#D9B087", icono: 1, nino: 1, estf: 1 },
      milagrosa: { m: ["#6E9FE0", "#3C67A8"], d: ["#FFFFFF", "#DDE2E6"], sk: "#F2D9BC", est: 2, manos: 1, mundo: 1 },
      auxiliadora: { m: ["#4C7FCB", "#27508F"], d: ["#E7A3A0", "#B5615D"], sk: "#F0D4B2", cor: 2, nino: 1, cetro: 1 },
      dolores: { m: ["#3A2D52", "#1C152B"], d: ["#5C3C6E", "#35223F"], sk: "#EED2B4", velo: 1, cor7: 1, llora: 1 }
    };
    const f = (n) => Math.round(n * 10) / 10;
    return (k, sz) => {
      const t = T[k] || T.guadalupe, id = "vg" + k, w = sz || 64;
      const g = `<defs><linearGradient id="${id}m" x1="0" x2="1"><stop offset="0" stop-color="${t.m[1]}"/><stop offset=".45" stop-color="${t.m[0]}"/><stop offset="1" stop-color="${t.m[1]}"/></linearGradient>
        <linearGradient id="${id}d" x1="0" x2="1"><stop offset="0" stop-color="${t.d[1]}"/><stop offset=".5" stop-color="${t.d[0]}"/><stop offset="1" stop-color="${t.d[1]}"/></linearGradient>
        <radialGradient id="${id}h" cx=".5" cy=".42" r=".55"><stop offset="0" stop-color="#FFF3CF" stop-opacity=".95"/><stop offset=".45" stop-color="#F4D58E" stop-opacity=".35"/><stop offset="1" stop-color="#F4D58E" stop-opacity="0"/></radialGradient>
        <linearGradient id="${id}o" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFF4CC"/><stop offset=".45" stop-color="#E5BF66"/><stop offset="1" stop-color="#A97A24"/></linearGradient></defs>`;
      let bg = "", fig = "", top = "";
      // fondo: el nicho de luz y lo propio de cada advocación
      if (t.icono) bg += `<rect x="6" y="4" width="48" height="74" rx="3" fill="url(#${id}o)"/><rect x="8.5" y="6.5" width="43" height="69" rx="2" fill="none" stroke="#7A5716" stroke-opacity=".5" stroke-width=".6"/>`;
      else bg += `<ellipse cx="30" cy="40" rx="27" ry="36" fill="url(#${id}h)"/>`;
      if (t.ray === "man") { let r = ""; for (let i = 0; i < 36; i++) { const a = (i / 36) * Math.PI * 2, l = i % 2 ? 0.86 : 1; r += `M${f(30 + 13 * Math.cos(a))} ${f(43 + 25 * Math.sin(a))}L${f(30 + 18 * l * Math.cos(a))} ${f(43 + 33 * l * Math.sin(a))}`; } bg += `<path d="${r}" stroke="#F3D484" stroke-width="1.4" stroke-linecap="round" opacity=".95"/>`; }
      if (t.rayc) { let r = ""; for (let i = 0; i < 20; i++) { const a = Math.PI + (i / 19) * Math.PI; r += `M${f(30 + 9 * Math.cos(a))} ${f(23 + 9 * Math.sin(a))}L${f(30 + 15 * Math.cos(a))} ${f(23 + 15 * Math.sin(a))}`; } bg += `<path d="${r}" stroke="#F3D484" stroke-width="1" stroke-linecap="round"/>`; }
      if (t.gruta) bg += `<path d="M2 78V34Q4 6 30 5Q56 6 58 34V78H50V38Q48 16 30 15Q12 16 10 38V78Z" fill="#7F8C8A" opacity=".55"/><path d="M10 38Q12 16 30 15Q48 16 50 38" fill="none" stroke="#C9D2CF" stroke-opacity=".5" stroke-width=".8"/>`;
      if (t.col) bg += `<rect x="23" y="50" width="14" height="28" fill="#C7A06A"/><rect x="21" y="48" width="18" height="3.4" rx="1" fill="#E8D1A4"/><rect x="21" y="75" width="18" height="3" fill="#E8D1A4"/><path d="M26 52V75M30 52V75M34 52V75" stroke="#9C7745" stroke-width=".6"/>`;
      if (t.nube) bg += `<g fill="#6F9A6B"><circle cx="20" cy="74" r="6"/><circle cx="30" cy="72" r="7.5"/><circle cx="40" cy="74" r="6"/></g><path d="M14 78Q30 70 46 78" fill="#FFFFFF" opacity=".85"/>`;
      // la figura: manto, vestido, rostro
      const S = t.chica ? 0.62 : t.tri ? 0.94 : 1, oy = t.chica ? 4 : t.tri ? 3 : 0;
      if (t.tri) {
        fig += `<path d="M30 15C25 15 23 19 22.5 23L10 72H50L37.5 23C37 19 35 15 30 15Z" fill="url(#${id}m)" stroke="#000" stroke-opacity=".18" stroke-width=".6"/>`;
        fig += `<path d="M30 25C27.5 25 26.4 28 26 31L20 72H40L34 31C33.6 28 32.5 25 30 25Z" fill="url(#${id}d)"/>`;
        if (t.encaje) { let e = ""; for (let y = 40; y < 72; y += 5) for (let x = 0; x < 5; x++) e += `<circle cx="${f(24 - (y - 40) * 0.16 + x * (3 + (y - 40) * 0.064))}" cy="${y}" r=".75"/>`; fig += `<g fill="#C9B98A" opacity=".8">${e}</g><path d="M10 72H50" stroke="#E3C06A" stroke-width="1.4"/>`; }
        else fig += `<path d="M10 72H50" stroke="#E3C06A" stroke-width="1.4"/><g fill="#F3D484">${[18, 24, 30, 36, 42].map((x) => `<circle cx="${x}" cy="66" r=".9"/>`).join("")}</g>`;
        if (t.banda) fig += `<path d="M22 46L38 52" stroke="#C83A3A" stroke-width="2.4"/><path d="M22 46L38 52" stroke="#F3D484" stroke-width=".6"/>`;
        if (t.pelo) fig += `<path d="M26.4 19Q25 30 23.6 40M33.6 19Q35 30 36.4 40" stroke="${t.h}" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
      } else {
        fig += `<path d="M30 13C24.6 13 22 17.6 21.4 22.6 18.6 32 15.6 52 13.4 76H46.6C44.4 52 41.4 32 38.6 22.6 38 17.6 35.4 13 30 13Z" fill="url(#${id}m)" stroke="#000" stroke-opacity=".2" stroke-width=".6"/>`;
        fig += `<path d="M30 24C27 24 25.6 27 25.2 30.6 24 42 22.6 58 21.8 76H38.2C37.4 58 36 42 34.8 30.6 34.4 27 33 24 30 24Z" fill="url(#${id}d)"/>`;
        fig += `<path d="M21.6 24Q19 50 16 76M38.4 24Q41 50 44 76" fill="none" stroke="${t.borde || "#E3C06A"}" stroke-width=".9" opacity=".9"/>`;
        if (t.faja) fig += `<path d="M25.6 38Q30 40 34.4 38" stroke="${t.faja}" stroke-width="2.2" fill="none"/><path d="M29 39.5L27.4 56M31 39.5L32.4 56" stroke="${t.faja}" stroke-width="1.4"/>`;
        if (t.esc) fig += `<rect x="27.6" y="30" width="4.8" height="6" rx=".6" fill="#5A3A22" stroke="#E3C06A" stroke-width=".4"/>`;
        if (t.velo) fig += `<path d="M24.6 17.4Q30 13.8 35.4 17.4L36 25H24Z" fill="#F4F1EA"/>`;
      }
      // rostro y manos
      const hy = t.tri ? 21 : 19.8;
      if (t.h && !t.tri) fig += `<path d="M26.4 19Q26 23 25.6 26M33.6 19Q34 23 34.4 26" stroke="${t.h}" stroke-width="1.4" fill="none"/>`;
      fig += `<ellipse cx="30" cy="${hy}" rx="3.5" ry="4.3" fill="${t.sk}"/><ellipse cx="29" cy="${hy - 1.4}" rx="1.2" ry="1.6" fill="#fff" opacity=".22"/>`;
      if (t.inc) fig += `<path d="M27.6 ${hy - 4.6}Q30 ${hy - 6.4} 33 ${hy - 4}" fill="none" stroke="${t.m[1]}" stroke-width="2"/>`;
      fig += `<g stroke="#5A3A22" stroke-opacity=".55" stroke-width=".45" stroke-linecap="round"><path d="M28.4 ${hy - 0.2}h1M30.8 ${hy - 0.2}h1"/></g>`;
      if (t.llora) fig += `<path d="M28.6 ${hy + 0.8}v1.6M31.4 ${hy + 0.8}v1.6" stroke="#BFE3F2" stroke-width=".6"/>`;
      if (!t.tri && !t.manos && !t.nino) fig += `<path d="M28.4 38.6L30 33.4 31.6 38.6Z" fill="${t.sk}" stroke="#B48A5E" stroke-opacity=".5" stroke-width=".3"/>`;
      if (t.manos) { fig += `<g fill="${t.sk}"><ellipse cx="22.6" cy="42" rx="1.5" ry="2"/><ellipse cx="37.4" cy="42" rx="1.5" ry="2"/></g>`; let r = ""; for (let i = 0; i < 7; i++) { r += `M${f(22.6 - 1 - i * 0.7)} 44L${f(16 - i * 1.4)} 70M${f(37.4 + 1 + i * 0.7)} 44L${f(44 + i * 1.4)} 70`; } fig += `<path d="${r}" stroke="#FFE9A8" stroke-width=".7" opacity=".9"/>`; }
      if (t.icono) fig = `<circle cx="30" cy="${hy}" r="6.6" fill="#F3D484" stroke="#A97A24" stroke-width=".4"/><circle cx="35.4" cy="31.8" r="4.4" fill="#F3D484" stroke="#A97A24" stroke-width=".4"/>` + fig;
      if (t.nino) { const cx = t.tri ? 34 : 35.4, cy = t.tri ? 34 : 34; fig += `<path d="M${cx - 3.6} ${cy + 1}Q${cx} ${cy - 2} ${cx + 3.6} ${cy + 1}L${cx + 3} ${cy + 9}H${cx - 3}Z" fill="${k === "socorro" ? "#2F6B4E" : "#FFF6E6"}" stroke="#000" stroke-opacity=".15" stroke-width=".4"/><circle cx="${cx}" cy="${cy - 2.2}" r="2.5" fill="${t.sk}"/><circle cx="${cx}" cy="${cy - 2.2}" r="3.6" fill="none" stroke="#F3D484" stroke-width=".7"/>`; }
      if (t.ro) { let r = ""; for (let i = 0; i < 9; i++) r += `<circle cx="${f(30 + 2.2 * Math.sin(i * 0.5))}" cy="${f(37 + i * 1.6)}" r=".55"/>`; fig += `<g fill="#F8F1DA">${r}</g><path d="M30 51.6v2.4M29 52.6h2" stroke="#E3C06A" stroke-width=".6"/>`; }
      if (t.cetro) fig += `<path d="M22.4 30L20 48" stroke="url(#${id}o)" stroke-width="1.2" stroke-linecap="round"/><circle cx="22.6" cy="29" r="1.3" fill="#F3D484"/>`;
      if (t.cor7) { fig += `<path d="M30 33.6C28.4 31.4 25.8 32.6 26.6 35 27.2 36.8 30 38.6 30 38.6S32.8 36.8 33.4 35C34.2 32.6 31.6 31.4 30 33.6Z" fill="#C8283A"/>`; let s = ""; for (let i = 0; i < 7; i++) { const a = Math.PI * (0.15 + (i / 6) * 0.7); s += `M${f(30 + 1.6 * Math.cos(a))} ${f(35.6 - 1.6 * Math.sin(a))}L${f(30 + 6 * Math.cos(a))} ${f(35.6 - 6 * Math.sin(a))}`; } fig += `<path d="${s}" stroke="#E4E8EC" stroke-width=".55"/>`; }
      if (t.estf) fig += `<polygon points="30,${f(hy - 7.4)} 30.6,${f(hy - 6)} 32,${f(hy - 6)} 30.9,${f(hy - 5.1)} 31.3,${f(hy - 3.8)} 30,${f(hy - 4.6)} 28.7,${f(hy - 3.8)} 29.1,${f(hy - 5.1)} 28,${f(hy - 6)} 29.4,${f(hy - 6)}" fill="#F3D484"/>`;
      if (t.est) { let s = ""; const n = 12; for (let i = 0; i < n; i++) { const a = t.est === 2 ? Math.PI * (1.08 + (i / (n - 1)) * 0.84) : null; const x = t.est === 2 ? 30 + 9.6 * Math.cos(a) : 17 + (i % 4) * 8.6 + (Math.floor(i / 4) % 2) * 3, y = t.est === 2 ? hy + 9.6 * Math.sin(a) : 34 + Math.floor(i / 4) * 12 + (i % 2) * 2; s += `<circle cx="${f(x)}" cy="${f(y)}" r="${t.est === 2 ? 0.8 : 0.75}"/>`; } fig += `<g fill="#F6D980">${s}</g>`; }
      // corona, aureola, luna, ángel, mundo
      if (t.cor) top += `<path d="M26.4 ${hy - 4.6}L26 ${hy - 8.6}L27.8 ${hy - 6.6}L30 ${hy - 9.6}L32.2 ${hy - 6.6}L34 ${hy - 8.6}L33.6 ${hy - 4.6}Z" fill="url(#${id}o)" stroke="#7A5716" stroke-width=".35"/>`;
      if (t.cor === 2) top += `<circle cx="30" cy="${hy - 10.4}" r=".9" fill="#F3D484"/>`;
      if (!t.icono && !t.rayc && !t.est) top += `<circle cx="30" cy="${hy - 0.6}" r="${t.cor ? 8.4 : 6.8}" fill="none" stroke="#F3D484" stroke-width=".7" opacity=".85"/>`;

      let pie = "";
      if (t.luna) pie += `<path d="M${t.tri ? 14 : 17} 72Q30 82 ${t.tri ? 46 : 43} 72Q30 77 ${t.tri ? 14 : 17} 72Z" fill="${k === "guadalupe" ? "#26201C" : "#D9DEE3"}"/>`;
      if (t.ang) pie += `<g><path d="M18 76Q24 70 30 74Q36 70 42 76" fill="none" stroke="#C9524A" stroke-width="1.6"/><path d="M18 76Q24 70 30 74Q36 70 42 76" fill="none" stroke="#2E7C6A" stroke-width=".7" transform="translate(0 1.5)"/><circle cx="30" cy="76.4" r="2" fill="#C9946A"/></g>`;
      if (t.mundo) pie += `<path d="M14 78Q30 64 46 78Z" fill="#6E8FB8"/><path d="M16 76Q24 70 32 74Q38 76 44 72" stroke="#4E8A4A" stroke-width="1.4" fill="none"/>`;
      if (t.rosas) pie += `<g fill="#F2C84B"><circle cx="24.6" cy="76.4" r="1.4"/><circle cx="35.4" cy="76.4" r="1.4"/></g>`;
      const body = (S !== 1 ? `<g transform="translate(${f(30 - 30 * S)} ${oy}) scale(${S})">${fig}${top}</g>` : fig + top);
      return `<svg class="vir" viewBox="0 0 60 82" width="${w}" height="${f(w * 82 / 60)}" aria-hidden="true">${g}${bg}${body}${pie}</svg>`;
    };
  })();
  /* La imagen real de cada Virgen. Son fotos de Wikimedia Commons, recortadas para Atrio (c = x0, y0 y ancho del recorte,
     en fracción de la foto) y guardadas en /v. «hd» es la original en grande: solo se pide al verla de cerca. */
  const WM = "https://upload.wikimedia.org/wikipedia/commons/";
  const LIC = { "CC0": "https://creativecommons.org/publicdomain/zero/1.0/deed.es", "CC BY 4.0": "https://creativecommons.org/licenses/by/4.0/deed.es", "CC BY-SA 4.0": "https://creativecommons.org/licenses/by-sa/4.0/deed.es" };
  const VFOTO = {
    guadalupe: { hd: "2/2c/Virgen_de_guadalupe1.jpg", ow: 788, oh: 1226, c: [0.02, 0.005, 0.88], a: "Imagen de la tilma, Basílica de Guadalupe", l: "Dominio público", f: "Virgen_de_guadalupe1.jpg" },
    fatima: { hd: "3/34/Fatima_0752_%2819796283042%29_%28cropped%29.jpg", ow: 614, oh: 1092, c: [0.075, 0.11, 0.83], a: "János Korom", l: "Dominio público", f: "Fatima_0752_%2819796283042%29_%28cropped%29.jpg" },
    lourdes: { hd: "thumb/6/6a/Villers-Ch%C3%A2tel_-_Grotte_-_Statue_mariale.jpg/1920px-Villers-Ch%C3%A2tel_-_Grotte_-_Statue_mariale.jpg", ow: 3654, oh: 5760, c: [0.08, 0.13, 0.8], a: "IgnaceBoitaclou", l: "CC BY 4.0", f: "Villers-Ch%C3%A2tel_-_Grotte_-_Statue_mariale.jpg" },
    carmen: { hd: "thumb/d/d3/Nuestra_Se%C3%B1ora_del_Carmen_Perchelerita.png/1280px-Nuestra_Se%C3%B1ora_del_Carmen_Perchelerita.png", ow: 1414, oh: 2000, c: [0.127, 0.08, 0.7355], a: "David.Lopez.Sala", l: "CC BY 4.0", f: "Nuestra_Se%C3%B1ora_del_Carmen_Perchelerita.png" },
    pilar: { hd: "thumb/a/a0/13_de_Mayo%2C_Virgen_del_Pilar_con_el_manto_de_la_Instituci%C3%B3n_%2852103197996%29.jpg/1280px-13_de_Mayo%2C_Virgen_del_Pilar_con_el_manto_de_la_Instituci%C3%B3n_%2852103197996%29.jpg", ow: 1338, oh: 1441, c: [0.252, 0.28, 0.4954], a: "El Justicia de Aragón", l: "CC0", f: "13_de_Mayo%2C_Virgen_del_Pilar_con_el_manto_de_la_Instituci%C3%B3n_%2852103197996%29.jpg" },
    sanjuan: { hd: "thumb/0/0c/Virgen_de_San_Juan_de_los_Lagos_%282023%29.jpg/1280px-Virgen_de_San_Juan_de_los_Lagos_%282023%29.jpg", ow: 1506, oh: 2048, c: [0.0445, 0.001, 0.905], a: "Metropolitanogto", l: "CC0", f: "Virgen_de_San_Juan_de_los_Lagos_%282023%29.jpg" },
    zapopan: { hd: "thumb/3/3a/Our_Lady_of_Zapopan_relic_on_tour_for_veneration_in_the_atrium_of_the_Cathedral.jpg/1920px-Our_Lady_of_Zapopan_relic_on_tour_for_veneration_in_the_atrium_of_the_Cathedral.jpg", ow: 1936, oh: 2592, c: [0.4508, 0.03, 0.4284], a: "ExorcisioTe", l: "CC BY-SA 4.0", f: "Our_Lady_of_Zapopan_relic_on_tour_for_veneration_in_the_atrium_of_the_Cathedral.jpg" },
    juquila: { hd: "8/84/Juquilita.jpg", ow: 314, oh: 400, c: [0.119, 0.01, 0.722], a: "Autor desconocido", l: "Dominio público", f: "Juquilita.jpg" },
    socorro: { hd: "2/26/Perpetual_help_original_icon.jpg", ow: 500, oh: 609, c: [0.12, 0, 0.811], a: "Autor desconocido", l: "Dominio público", f: "Perpetual_help_original_icon.jpg" },
    milagrosa: { hd: "thumb/f/ff/Old_Saint_Mary%27s_Church_%28Cincinnati%2C_Ohio%29_-_Immaculate_Conception_statue_2.jpg/1920px-Old_Saint_Mary%27s_Church_%28Cincinnati%2C_Ohio%29_-_Immaculate_Conception_statue_2.jpg", ow: 2122, oh: 3747, c: [0.01, 0.03, 0.93], a: "Nheyob", l: "CC BY-SA 4.0", f: "Old_Saint_Mary%27s_Church_%28Cincinnati%2C_Ohio%29_-_Immaculate_Conception_statue_2.jpg" },
    auxiliadora: { hd: "9/93/Maria_Auxilium_Christianorum%2C_ora_pro_nobis.jpg", ow: 703, oh: 1000, c: [0.138, 0.128, 0.664], a: "Sanji1986", l: "CC BY-SA 4.0", f: "Maria_Auxilium_Christianorum%2C_ora_pro_nobis.jpg" },
    dolores: { hd: "thumb/5/5a/Nuestra_Se%C3%B1ora_de_los_Dolores_-_Camas_%28Sevilla%29.jpg/1280px-Nuestra_Se%C3%B1ora_de_los_Dolores_-_Camas_%28Sevilla%29.jpg", ow: 1331, oh: 1704, c: [0.0935, 0, 0.853], a: "Pederseguro", l: "Dominio público", f: "Nuestra_Se%C3%B1ora_de_los_Dolores_-_Camas_%28Sevilla%29.jpg" }
  };
  // la foto en su arco de oro (2:3); mientras llega, o si falta, queda su dibujo
  const VIRG = (k, w, ya) => { if (!VFOTO[k]) return VIRGD(k, w); const h = Math.round(w * 1.5);
    return `<span class="vph" style="width:${w}px;height:${h}px"><span class="vpd">${VIRGD(k, Math.round(w * 0.86))}</span><img src="v/${k}${w <= 100 ? "-s" : ""}.jpg" width="${w}" height="${h}" alt=""${ya ? "" : ' loading="lazy"'} decoding="async" onerror="this.parentNode.classList.add('mal');this.remove()"></span>`; };
  /* Verla de cerca: la imagen grande con puntos dorados; cada punto cuenta un detalle. */
  let LU = null;
  const luTxt = (sim) => { const s = LU.i >= 0 ? sim[LU.i] : null; return [s ? `<b>${esc(s[2])}</b><p>${esc(s[3])}</p>` : `<b>Mírala de cerca</b><p>Toca un número y te acercamos a ese detalle.</p>`, LU.i < 0 ? "Ver el primer detalle" : LU.i >= sim.length - 1 ? "Ver la imagen completa" : "Siguiente detalle"]; };
  function lupa() {
    const x = document.getElementById("lupa"); if (x) x.remove(); if (!LU) return;
    const a = ADV.find((q) => q.k === LU.k), f = VFOTO[LU.k]; if (!a || !f) { LU = null; return; }
    const H = window.innerHeight, W = Math.round(Math.max(190, Math.min(app.clientWidth - 44, (H - 262) / 1.5, 380))), x0 = f.c[0], y0 = f.c[1], iw = W / f.c[2], ih = (iw * f.oh) / f.ow, sim = a.sim || [], tx = luTxt(sim);
    app.insertAdjacentHTML("beforeend", `<div id="lupa" role="dialog" aria-label="${esc(advN(a))}, de cerca"><div class="lub"><p class="ru">${esc(a.p)} ${esc(a.c)}</p><button class="ic r" data-a="lupax" aria-label="Cerrar">${I.x}</button></div>
      <div class="luf" style="width:${W}px;height:${Math.round(W * 1.5)}px" data-w="${W}"><div class="luz"><img src="v/${a.k}.jpg" alt=""><img class="luh" src="${WM + f.hd}" alt="" referrerpolicy="no-referrer" style="width:${f1(iw)}px;height:${f1(ih)}px;left:${f1(-x0 * iw)}px;top:${f1(-y0 * ih)}px" onload="this.classList.add('ok')" onerror="this.remove()"></div>
        ${sim.map((q, i) => `<button class="lup" data-a="lupan" data-k="${i}" style="left:${q[0]}%;top:${q[1]}%" aria-label="${esc(q[2])}"><i>${i + 1}</i></button>`).join("")}<button class="luo" data-a="lupao" aria-label="Ver la imagen completa">Ver completa</button></div>
      <div class="luc" aria-live="polite">${tx[0]}</div><button class="btn go lus" data-a="lupas">${tx[1]}</button></div>`);
    lupaT(1);
  }
  // acercarse a un detalle: la foto crece y ese punto queda al centro, sin salirse de los bordes
  function lupaT(sinAnim) { const T = document.getElementById("lupa"), a = LU && ADV.find((q) => q.k === LU.k); if (!T || !a) return; const sim = a.sim || [], tx = luTxt(sim), F = T.querySelector(".luf"), Z = T.querySelector(".luz"), W = +F.dataset.w, Hh = W * 1.5;
    if (LU.i >= 0 && sim[LU.i]) { const z = 2.6, px = (sim[LU.i][0] / 100) * W, py = (sim[LU.i][1] / 100) * Hh, tx2 = Math.min(0, Math.max(W - W * z, W / 2 - px * z)), ty = Math.min(0, Math.max(Hh - Hh * z, Hh / 2 - py * z)); Z.style.transform = `translate(${f1(tx2)}px,${f1(ty)}px) scale(${z})`; F.classList.add("zm"); }
    else { Z.style.transform = "none"; F.classList.remove("zm"); }
    const c = T.querySelector(".luc"); c.innerHTML = tx[0]; if (!sinAnim) { c.classList.remove("lin"); void c.offsetWidth; c.classList.add("lin"); } T.querySelector(".lus").textContent = tx[1]; }
  // la paloma que baja: alas abiertas, cabeza hacia abajo, como se pinta al Espíritu Santo
  const PAL_ES = (() => { const ala = `<path d="M108 104C84 86 52 64 14 38C22 62 34 80 48 92C38 92 30 92 22 90C36 106 52 116 68 122C60 126 52 128 44 128C62 138 84 142 104 138Z" fill="url(#pg2)" stroke="#fff" stroke-opacity=".7" stroke-width=".8" stroke-linejoin="round"/><path d="M104 120C80 110 50 88 26 56M104 131C84 126 62 116 46 104" fill="none" stroke="#9DB9BC" stroke-opacity=".55" stroke-width="1" stroke-linecap="round"/>`;
    return `<svg class="pal0" viewBox="0 0 240 220"><defs><radialGradient id="pg1" cx=".5" cy=".6" r=".65"><stop offset="0" stop-color="#fff"/><stop offset=".65" stop-color="#F4F9F9"/><stop offset="1" stop-color="#C6DADB"/></radialGradient><linearGradient id="pg2" x1=".9" y1=".9" x2="0" y2="0"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#EEF5F5"/><stop offset="1" stop-color="#B7CFD1"/></linearGradient><radialGradient id="pgl"><stop offset="0" stop-color="#FFF6D8" stop-opacity=".95"/><stop offset=".32" stop-color="#F4DCA6" stop-opacity=".42"/><stop offset="1" stop-color="#F4DCA6" stop-opacity="0"/></radialGradient></defs>
      <circle class="pgh" cx="120" cy="120" r="104" fill="url(#pgl)"/>
      <g class="pwl">${ala}</g><g class="pwr"><g transform="translate(240 0) scale(-1 1)">${ala}</g></g>
      <path d="M120 98L99 36Q109 27 120 31Q131 27 141 36Z" fill="url(#pg1)" stroke="#fff" stroke-opacity=".7" stroke-width=".8" stroke-linejoin="round"/><path d="M120 96V33M120 96L108 33M120 96L132 33" stroke="#9DB9BC" stroke-opacity=".5" stroke-width="1" stroke-linecap="round"/>
      <path d="M120 68C105 86 100 118 104 140C106 154 112 164 120 168C128 164 134 154 136 140C140 118 135 86 120 68Z" fill="url(#pg1)"/>
      <circle cx="120" cy="170" r="11.5" fill="url(#pg1)"/><path d="M116.2 179.5L120 191.5L123.8 179.5Z" fill="#E9B95A"/><circle cx="115.2" cy="171.5" r="1.5" fill="#23464A"/><circle cx="124.8" cy="171.5" r="1.5" fill="#23464A"/></svg>`; })();
  /* ---------- bienvenida: el camino de cinco cuentas y la veladora ---------- */
  // el avance del onboarding es una pequeña decena de oro: cada paso enciende una cuenta
  const obHd = (n, back) => `<div class="hd z obh"><button class="ic" data-a="go" data-v="${back}" data-b="1" aria-label="Regresar">${I.back}</button><div class="obr"><span class="sr">Paso ${n} de 5</span><i class="obc" aria-hidden="true"></i>${[1, 2, 3, 4, 5].map((k) => `<b class="${k < n ? "ok" : k === n ? "on" : ""}"></b>`).join("")}<svg class="obx" width="12" height="16" viewBox="0 0 12 16" aria-hidden="true"><path d="M6 1v14M1.5 5h9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg></div><span class="ic"></span></div>`;
  // veladora mexicana de vaso alto: la flama crece cuando escribes tu nombre
  const VEL = (lit) => `<div class="vel${lit ? " lit" : ""}" aria-hidden="true"><div class="velh"></div><svg viewBox="0 0 120 190"><defs>
      <linearGradient id="vgl" x1="0" x2="1"><stop offset="0" stop-color="#FFF6DE" stop-opacity=".22"/><stop offset=".18" stop-color="#FFF6DE" stop-opacity=".5"/><stop offset=".32" stop-color="#FFF6DE" stop-opacity=".12"/><stop offset=".8" stop-color="#FFF6DE" stop-opacity=".08"/><stop offset="1" stop-color="#FFF6DE" stop-opacity=".3"/></linearGradient>
      <linearGradient id="vwx" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE7B0"/><stop offset=".25" stop-color="#F4D9A4"/><stop offset="1" stop-color="#C99A5A"/></linearGradient>
      <radialGradient id="vfl" cx=".5" cy=".75" r=".7"><stop offset="0" stop-color="#FFFFFF"/><stop offset=".3" stop-color="#FFF1BE"/><stop offset=".7" stop-color="#FFC25E"/><stop offset="1" stop-color="#F08A2E" stop-opacity="0"/></radialGradient>
      <radialGradient id="vin" cx=".5" cy=".25" r=".8"><stop offset="0" stop-color="#FFE9B4" stop-opacity=".9"/><stop offset=".55" stop-color="#F4C978" stop-opacity=".25"/><stop offset="1" stop-color="#F4C978" stop-opacity="0"/></radialGradient></defs>
      <ellipse cx="60" cy="184" rx="40" ry="5" fill="#021A1D" opacity=".55"/>
      <rect x="22" y="58" width="76" height="124" rx="7" fill="url(#vwx)"/>
      <rect class="vlu" x="22" y="58" width="76" height="124" rx="7" fill="url(#vin)"/>
      <g class="vimg" transform="translate(60 124)"><ellipse rx="17" ry="24" fill="#0F5257" stroke="#E6C27A" stroke-width="1.2"/><polygon points="${JY.ray}" fill="#F3D484" transform="scale(.82)"/><path d="M0-10C2.4-10 3.5-8 3.4-6.2 5-3.8 5.8-.2 6.1 4.3 6.3 7.7 5.3 10.1 0 10.1-5.3 10.1-6.3 7.7-6.1 4.3-5.8-.2-5-3.8-3.4-6.2-3.5-8-2.4-10 0-10Z" fill="#2A8A88" stroke="#FFF3D0" stroke-width=".5"/><ellipse cy="-6.8" rx="1.5" ry="1.9" fill="#F4DFBE"/></g>
      <rect x="22" y="58" width="76" height="124" rx="7" fill="url(#vgl)" stroke="#FFF6DE" stroke-opacity=".35" stroke-width="1"/>
      <path d="M60 58v-8" stroke="#3A2A12" stroke-width="1.6" stroke-linecap="round"/>
      <g class="vfg"><path class="vfo" d="M60 6C66 20 72 28 72 38 72 46 66.6 52 60 52 53.4 52 48 46 48 38 48 28 54 20 60 6Z" fill="url(#vfl)"/><path d="M60 22C63 30 65.5 34 65.5 40 65.5 44.5 63 48 60 48 57 48 54.5 44.5 54.5 40 54.5 34 57 30 60 22Z" fill="#FFFDF2"/></g></svg></div>`;
  /* ---------- pantallas ---------- */
  let view = "hoy", ros = null, nd = 1, vn = 0, msg = "", ob = 0, vuelve = "hoy", sel = [], deG = /[?&]code=/.test(location.search) ? 1 : 0;
  const V = {
    bien: () => { const par = (() => { const prev = ros; try { const f = forma(); ros = { set: "gloriosos", f, i: 0 }; ros.p = pasos(f); return [joya(0), joya(ros.p.length - 1)]; } catch (_) { return ["", ""]; } finally { ros = prev; } })();
      const chispas = Array.from({ length: 14 }, (_, k) => `<i style="left:${(7 + ((k * 37) % 86)).toFixed(0)}%;animation-delay:${(2.2 + (k * 0.61) % 5).toFixed(2)}s;animation-duration:${(7 + (k % 4) * 1.6).toFixed(1)}s"></i>`).join("");
      return `<section class="v d bienv in">${sky()}<div class="hd z bvh"><svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M6.5 24.5V13a7.5 7.5 0 0 1 15 0v11.5M3.5 24.5h21" stroke="#E6C27A" stroke-width="1.6" stroke-linecap="round"/><polygon transform="translate(8 8.2) scale(.75)" fill="#E6C27A" points="${S16}"/></svg><b>Atrio</b></div>
      <div class="bva z" aria-hidden="true"><div class="bvr"></div><svg class="bvarc" viewBox="0 0 300 380" preserveAspectRatio="none"><path d="M12 378V150A138 138 0 0 1 288 150V378" fill="none" stroke="#E6C27A" stroke-width="1.4" stroke-opacity=".75"/><path d="M24 378V152A126 126 0 0 1 276 152V378" fill="none" stroke="#E6C27A" stroke-width=".7" stroke-opacity=".35"/></svg>
        <div class="bvj"><div class="bv0">${par[0]}</div><div class="bv1">${par[1]}</div></div><div class="bvch">${chispas}</div></div>
      <div class="bvt z"><p class="bvq">¿No estoy yo aquí,<br>que soy tu madre?</p><p class="ru bvs">Santa María de Guadalupe a san Juan Diego, 1531</p>
      <p class="sub bvd">El rosario, la novena y el Ángelus, solo o con tu familia, aunque estén lejos.</p></div>
      <div class="mt z bvb"><button class="btn go bvgo" data-a="empieza">Empezar a rezar</button>${conG() && !U ? `<button class="lk" data-a="login" style="display:block;margin:6px auto 0">Ya tengo cuenta</button>` : ""}</div></section>`; },
    nom: () => ob ? `<section class="v d in obv">${sky()}${obHd(1, "bien")}${VEL(!!S.n)}
      <h1 class="z obt">¿Cómo te llamas?</h1><p class="sub z c">Para que la Virgen y tu familia te reconozcan aquí.</p>
      <input class="fld nm z" id="fn" type="text" autocomplete="given-name" autocapitalize="words" maxlength="24" placeholder="Tu nombre" aria-label="Tu nombre" value="${esc(S.n)}">
      <button class="btn go mt z" data-a="nom">Continuar</button></section>`
      : `<section class="v d in">${sky()}${hd(["yo"], "Tus datos")}<h1 class="z" style="margin-top:10px;font-size:34px;line-height:40px">¿Cómo te llamas?</h1><p class="sub z">Como te dicen en tu casa.</p>
      <label class="lab z" for="fn">Tu nombre</label><input class="fld z" id="fn" type="text" autocomplete="given-name" maxlength="24" value="${esc(S.n)}">
      <button class="btn go mt z" data-a="nom">Continuar</button></section>`,
    // el saludo: una paloma baja con luz, como en Pentecostés, y la invocación más antigua al Espíritu Santo
    gusto: () => `<section class="v d in gst">${sky()}${obHd(1, "nom")}
      <div class="gsa z" aria-hidden="true"><div class="gsl"></div><div class="gsr"></div>${PAL_ES}<div class="gsch">${Array.from({ length: 16 }, (_, k) => `<i style="left:${(22 + ((k * 29) % 56)).toFixed(0)}%;animation-delay:${(1.4 + ((k * 0.47) % 4.4)).toFixed(2)}s;animation-duration:${(4.6 + (k % 5) * 0.7).toFixed(1)}s"></i>`).join("")}</div></div>
      <div class="gsx z"><p class="gsq">Qué gusto tenerte aquí,</p><h1 class="gsn">${esc((S.n || "").split(" ")[0])}</h1></div>
      <p class="gsp z">Ven, Espíritu Santo, llena los corazones de tus fieles y enciende en ellos el fuego de tu amor.</p>
      <div class="mt z gsk"><button class="btn go bvgo" data-a="go" data-v="est">Continuar</button></div></section>`,
    est: () => { const su = sugEst(), L = MX.e.map((e, i) => [i, e[0]]).concat([[99, "Fuera de México"]]), cab = `${sky()}${ob ? obHd(2, "nom") : hd(["nom"], "Tus datos")}<h1 class="z" style="margin-top:${ob ? 18 : 10}px;font-size:34px;line-height:40px">¿Desde dónde rezas?</h1>`;
      // 1) una sola pregunta, si el teléfono sabe dónde está
      if (su !== null && !estAbre && S.e < 0) return `<section class="v d n in">${cab}<p class="sub z">Ahí se enciende tu veladora en el mapa.</p>
        <div class="z obmap">${mapa({}, su, 0)}</div><div class="esq z"><p class="ru">Parece que estás en</p><h2>${estado(su)}</h2><button class="btn go" data-a="esc" data-k="${su}">Sí, rezo desde aquí</button><button class="lk" data-a="esab" style="display:block;margin:6px auto 0">Estoy en otro estado</button></div></section>`;
      // 2) la lista: un toque elige y avanza
      return `<section class="v d n in">${cab}<p class="sub z">Toca tu estado. Ahí se enciende tu veladora en el mapa.</p>
      <input class="fld bus z" id="fb" type="search" placeholder="Busca tu estado" autocomplete="off" aria-label="Busca tu estado">
      <div class="esl z" id="esl">${L.map(([i, n]) => `<button class="es${S.e === i ? " on" : ""}" data-a="esc" data-k="${i}" data-n="${esc(sinAc(n))}"><span>${n}</span>${S.e === i ? `<i class="pal">${I.ok}</i>` : I.go}</button>`).join("")}<p class="note c" id="esn" hidden>No encontramos ese estado.</p></div></section>`; },
    advs: () => { const n = sel.length; return `<section class="v d in" style="padding-bottom:120px">${sky()}${ob ? obHd(3, "est") : hd(["adv"], "Tus Vírgenes")}<h1 class="z" style="margin-top:${ob ? 18 : 10}px;font-size:34px;line-height:40px">¿A qué Virgen le rezas?</h1><p class="sub z">Elige una o varias. Es la misma María, con el nombre que le dan en tu casa.</p>
      <div class="advg z">${ADV.map((a) => { const on = sel.includes(a.k); return `<button class="ni${on ? " on" : ""}" data-a="advt" data-k="${a.k}" aria-pressed="${on}" aria-label="${advN(a)}">${on ? `<span class="pal">${I.ok}</span>` : ""}<span class="vfig">${VIRG(a.k, 76)}</span><b>${a.c}</b><small>${a.f[0]} ${MESES[a.f[1] - 1].slice(0, 3)}</small></button>`; }).join("")}</div>
      <p class="note z" style="margin-top:18px">¿No está la tuya? Iremos sumando más advocaciones.</p>
      <div class="pie"><button class="btn go" data-a="advok"${n ? "" : " disabled"}>${n ? (n === 1 ? "Listo, elegí 1" : "Listo, elegí " + n) : "Elige al menos una"}</button></div></section>`; },
    adv: () => { const a = adv(), ff = fiesta(a), f = frase(a);
      return `<section class="v d in advp">${sky()}${hd([vuelve], "Tu Virgen")}
        ${mis().length > 1 ? `<div class="chips z">${mis().map((x) => `<button class="chip${x.k === a.k ? " on" : ""}" data-a="verv" data-k="${x.k}">${x.c}</button>`).join("")}</div>` : ""}
        <div class="nicho z"><i class="n1"></i><i class="n2"></i>${ARCO}<div class="nb"><button class="vver" data-a="lupa" data-k="${a.k}" aria-label="Ver su imagen de cerca">${VIRG(a.k, 140, 1)}${a.sim ? `<span class="vlc"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>Tócala para verla de cerca</span>` : ""}</button><p class="ru">${a.p}</p><h2>${a.c}</h2><p class="ins">${a.l}</p><p class="fie">${ff ? `Su fiesta es el ${a.f[0]} de ${MESES[a.f[1] - 1]}. ${ff === 1 ? "Es mañana." : "Faltan " + ff + " días."}` : "Hoy es su fiesta."}</p></div></div>
        ${a.n3 ? `<div class="n3 z">${a.n3.map((q) => `<div><b>${q[0]}</b><small>${q[1]}</small></div>`).join("")}</div>` : ""}
        <p class="tit z">${a.k === delDia().k ? "Mensaje del día" : "Su mensaje"}</p><div class="z c">${cita(f)}<p class="note" style="margin-top:8px">${f[2]}</p></div>
        <p class="tit z">Su historia</p>${a.h.map((x) => `<p class="his z">${x}</p>`).join("")}${a.fx ? `<p class="note z" style="margin-top:12px">${a.fx}</p>` : ""}
        ${a.pr ? `<p class="tit z">Historias y prodigios</p><div class="prs z">${a.pr.map((q, i) => `<article class="prc"><span class="prn">${i + 1} de ${a.pr.length}</span><h3>${q[0]}</h3><p>${q[1]}</p></article>`).join("")}</div><p class="note c z prh">Desliza hacia un lado para leer las ${a.pr.length}</p>` : ""}
        ${a.sab ? `<p class="tit z">¿Sabías que…?</p><div class="sabs z">${a.sab.map((q) => `<details class="sab"><summary><span>${q[0]}</span><i aria-hidden="true"></i></summary><p>${q[1]}</p></details>`).join("")}</div>` : ""}
        ${a.san ? `<p class="tit z">Dónde visitarla</p><a class="sanc z" href="https://www.google.com/maps/search/?api=1&amp;query=${encodeURIComponent(a.san[2])}" target="_blank" rel="noopener"><span class="md">${I.pin}</span><span class="g"><b>${a.san[0]}</b><small>${a.san[1]}</small></span><em>Ver mapa</em></a>` : ""}
        <p class="tit z">Oración</p>${a.o[0] === "Oración" ? "" : `<p class="ru z c">${a.o[0]}</p>`}<p class="pr z c" style="font-size:20px;line-height:30px">${a.o[1]}</p>
        <div class="z" style="padding-top:28px"><button class="btn go" data-a="ros">Rezar el rosario de hoy</button><button class="lk" data-a="advsel" style="display:block;margin:4px auto 0">Elegir mis Vírgenes</button></div></section>`; },
    pid: () => `<section class="v d n in">${sky()}${ob ? obHd(4, "advs") : hd(["yo"], "Tu intención")}<h1 style="margin-top:${ob ? 18 : 10}px;font-size:34px;line-height:40px">¿Por quién vas a rezar?</h1><p class="sub">Cada rosario se ofrece por alguien. Escríbelo y te lo recordamos cada vez que reces. Solo tú lo ves.</p>
      <div class="lib"><p class="libt"><span>${LOGO}</span>Libro de intenciones</p><label class="sr" for="fi">Tu intención</label><textarea class="fld ta lbt" id="fi" rows="3" maxlength="140" placeholder="Por mi mamá, por mi abuelo que está enfermo…">${esc(S.pi)}</textarea><p class="libf">${esc(S.n || "")}${S.n ? " · " : ""}${now().getDate()} de ${MESES[now().getMonth()]} de ${now().getFullYear()}</p></div>
      <div class="chips wr">${PIS.map((t, i) => `<button class="chip" data-a="pich" data-k="${i}">${t}</button>`).join("")}</div>
      <div style="padding-top:26px"><button class="btn go" data-a="piok">${ob ? "Continuar" : "Guardar"}</button>${ob ? `<button class="lk" data-a="pisk" style="display:block;margin:4px auto 0">Saltar este paso</button>` : ""}</div></section>`,
    entrar: () => { const nuevo = vuelveE === "bien";
      const G = `<svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.9z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.6-.4-3.9z"/></svg>`;
      if (otpE >= 2) return `<section class="v d n in">${sky()}${hd(["entrar"], "Tu código")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">Revisa tu correo</h1><p class="sub">Te mandamos un código a <b style="color:var(--oroc)">${esc(correo)}</b>. Si no lo ves, busca en spam o en promociones.</p>
        <label class="ru" for="fk" style="display:block;margin-top:22px;font-size:15px">Código</label><input class="fld cod" id="fk" inputmode="numeric" autocomplete="one-time-code" maxlength="10" placeholder="000000">
        <div style="padding-top:22px"><button class="btn go" data-a="otpok"${otpE === 3 ? " disabled" : ""}>${otpE === 3 ? "Entrando…" : "Entrar"}</button><button class="lk" data-a="otp" style="display:block;margin:6px auto 0">Mandar otro código</button><button class="lk" data-a="otpno" style="display:block;margin:0 auto">Usar otro correo</button></div></section>`;
      return `<section class="v d n in">${sky()}${hd([vuelveE === "entrar" ? "hoy" : vuelveE], nuevo ? "Ya tengo cuenta" : "Guardar mi avance")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">${nuevo ? "Entra a tu cuenta" : "Guarda tu avance"}</h1><p class="sub">${nuevo ? "Recupera tu racha, tus Vírgenes y tu intención." : "Así no pierdes tu racha ni tus veladoras si cambias de teléfono."}</p>
        <div style="margin-top:24px">${gBtn()}</div><p class="note c" style="margin-top:12px">Al entrar aceptas los <a href="/terminos/">términos de uso</a> y el <a href="/privacidad/">aviso de privacidad</a>.</p>
        ${OTP_ON ? `<p class="tit">o con tu correo, sin contraseña</p>
        <label class="ru" for="fm" style="display:block;font-size:15px">Tu correo</label><input class="fld" id="fm" type="email" inputmode="email" autocomplete="email" autocapitalize="off" placeholder="tucorreo@gmail.com" value="${esc(correo)}">
        <button class="btn go" data-a="otp" style="margin-top:14px"${otpE === 1 ? " disabled" : ""}>${otpE === 1 ? "Mandando…" : "Mandarme un código"}</button>
        <p class="note c" style="margin-top:12px">Te llega un código de un solo uso. No guardamos contraseñas.</p>` : ""}</section>`; },
    cred: () => `<section class="v d in">${sky()}${hd(["yo"], "Créditos")}<h1 class="z" style="margin-top:10px;font-size:32px;line-height:38px">Las imágenes de la Virgen</h1><p class="sub z">Fotografías y pinturas de Wikimedia Commons, recortadas para Atrio. Gracias a quienes las compartieron. Las versiones recortadas se comparten con la misma licencia que su original.</p>
      <div class="card z" style="margin-top:16px">${ADV.map((a) => { const f = VFOTO[a.k], lu = f && LIC[f.l]; return f ? `<div class="row crd">${VIRG(a.k, 36)}<span class="g"><b>${a.c}</b><small>${esc(f.a)} · ${lu ? `<a href="${lu}" target="_blank" rel="noopener">${f.l}</a>` : f.l} · <a href="https://commons.wikimedia.org/wiki/File:${f.f}" target="_blank" rel="noopener">ver original</a></small></span></div>` : ""; }).join("")}</div></section>`,
    jnew: () => `<section class="v d n in">${sky()}${hd(["hoy"], "Rosario juntos")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">Recen juntos el rosario de cada día</h1>
      <ol class="jex"><li><b>Cada quien a su hora.</b> El rosario de hoy tiene cinco misterios; cada uno reza los que pueda.</li><li><b>Se va llenando solo.</b> Ves quién rezó cada misterio y cuántos faltan.</li><li><b>El último cierra.</b> Quien reza el quinto termina con la Salve y se enciende su veladora.</li></ol>
      <label class="ru" for="fj" style="display:block;margin-top:22px;font-size:15px">¿Con quién?</label><input class="fld" id="fj" maxlength="40" autocomplete="off" placeholder="Constanza, mi mamá…">
      <label class="ru" for="fji" style="display:block;margin-top:16px;font-size:15px">¿Por quién rezan? <span style="font-family:var(--sa);font-style:normal;font-size:13px;color:var(--txt2)">opcional</span></label><input class="fld" id="fji" maxlength="140" autocomplete="off" placeholder="Por nuestra familia…">
      <div style="padding-top:22px"><button class="btn go" data-a="jcrea">Crear e invitar por WhatsApp</button></div></section>`,
    jt: () => { const id = jtA, d = JT[id], j = S.jt.find((x) => x.id === id) || { id }, set = MIS_DIA[now().getDay()], M = MIS[set], hechos = d ? d.cuentas || [] : [], n = hechos.length, ra = jtRacha(id);
      if (!S.n) return `<section class="v d n in">${sky()}<div class="hd"><span></span><p class="ru">Rosario juntos</p><span></span></div><h1 style="margin-top:30px;font-size:34px;line-height:40px">${d ? esc(d.creador) + " te invitó a rezar el rosario juntos" : "Te invitaron a rezar el rosario juntos"}</h1><p class="sub">Cada quien reza su misterio cuando puede. Para que sepan quién rezó, ¿cómo te llamas?</p>
        <label class="ru" for="fn" style="display:block;margin-top:22px;font-size:15px">Tu nombre</label><input class="fld" id="fn" maxlength="24" autocomplete="given-name" placeholder="Ej. María, Pepe…"><div style="padding-top:22px"><button class="btn go" data-a="jnom">Entrar</button></div></section>`;
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
    fnew: () => `<section class="v d n in">${sky()}${hd([S.fam.length ? "fam" : "hoy"], "Rosario en familia")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">Recen en familia, cada quien desde donde esté</h1>
      <p class="sub">Creas tu familia y mandas la liga por WhatsApp. Quien la toca entra directo, sin código ni contraseña, y lo que reza cada quien se va sumando.</p>
      <label class="ru" for="ff" style="display:block;margin-top:22px;font-size:15px">¿Cómo se llama tu familia o tu grupo?</label><input class="fld" id="ff" maxlength="40" autocomplete="off" autocapitalize="words" placeholder="Familia Hernández">
      <label class="ru" for="ffi" style="display:block;margin-top:16px;font-size:15px">¿Por quién van a rezar? <span style="font-family:var(--sa);font-style:normal;font-size:13px;color:var(--txt2)">opcional</span></label><textarea class="fld fli" id="ffi" rows="2" maxlength="140" autocomplete="off" placeholder="Por la salud de mi papá…"></textarea>
      <div class="chips wr">${FIS.map((t, i) => `<button class="chip" data-a="fich" data-k="${i}">${t}</button>`).join("")}</div>
      <div style="padding-top:22px"><button class="btn go" data-a="fcrea">${I.comp}<span>Crear y compartir la liga</span></button></div>
      <p class="note c" style="margin-top:12px">El nombre y la intención los ve quien tenga la liga.</p></section>`,
    fed: () => { const d = FM[famA] || {}, j = famJ(famA) || {}; return `<section class="v d n in">${sky()}${hd(["fam"], "Tu familia")}<h1 style="margin-top:10px;font-size:32px;line-height:38px">Nombre e intención</h1><p class="sub">Lo que cambies aquí lo ve toda la familia.</p>
      <label class="ru" for="ff" style="display:block;margin-top:22px;font-size:15px">Nombre de la familia</label><input class="fld" id="ff" maxlength="40" autocomplete="off" autocapitalize="words" value="${esc(d.nombre || j.n || "")}">
      <label class="ru" for="ffi" style="display:block;margin-top:16px;font-size:15px">¿Por quién rezan?</label><textarea class="fld fli" id="ffi" rows="2" maxlength="140" autocomplete="off" placeholder="Por la salud de mi papá…">${esc(d.intencion || j.i || "")}</textarea>
      <div style="padding-top:22px"><button class="btn go" data-a="fguarda">Guardar</button></div>
      <button class="lk c" data-a="fborra" style="margin-top:22px;color:var(--rosa)">${famOjo === 2 ? "Toca otra vez y se borra con todo lo rezado" : "Borrar esta familia"}</button></section>`; },
    fam: () => { const id = famA, j = famJ(id) || { id }, d = FM[id];
      if (d === 0) return `<section class="v d n in">${sky()}${hd(["hoy"], "Rosario en familia")}<h1 style="margin-top:22px;font-size:34px;line-height:40px">No encontramos esta familia</h1><p class="sub">Puede que la liga llegara incompleta o que quien la creó la haya borrado. Pide que te la manden otra vez.</p><div style="padding-top:22px"><button class="btn go" data-a="fquita">Entendido</button></div></section>`;
      if (!S.n) return `<section class="v d n in">${sky()}<div class="hd"><span class="ic"></span><p class="ru">Rosario en familia</p><span class="ic"></span></div><div id="finv">${famInv()}</div>
        <label class="ru" for="fn" style="display:block;margin-top:22px;font-size:15px">Tu nombre</label><input class="fld" id="fn" maxlength="24" autocomplete="given-name" autocapitalize="words" placeholder="Ej. María, Pepe…">
        <div style="padding-top:22px"><button class="btn go" data-a="fnom">Entrar a rezar</button></div><p class="note c" style="margin-top:12px">Entras directo, sin código ni contraseña. Tu nombre solo lo ve tu familia.</p></section>`;
      const nom = (d && d.nombre) || j.n || "Tu familia", it = d ? d.intencion || "" : j.i || "", enSala = !!(sala && famS === id), g = enSala ? guia() : null, curso = !!(g && !g.isMe && g.presence.on), otros = enSala ? peersS.filter((p) => !p.isMe) : [], sola = (!d || (d.gente || 0) <= 1) && !otros.length;
      if (famB && Date.now() - famB > 45000) famB = 0;
      const vivo = !jtOk() ? "" : !enSala ? `<p class="note c z fvc">${j.p ? (famErr ? "Sin señal. Tu familia se guarda sola en cuanto vuelva el internet." : "Guardando tu familia…") : RM ? "Entrando a la sala de tu familia…" : "Conectando…"}</p>`
        : `<div class="fvv z${curso ? " on" : ""}"><p class="fvt">${curso || otros.length ? '<i class="pto"></i>' : ""}${curso ? esc(nombresP(otros, g)) + (otros.length === 1 ? " está rezando ahora" : " están rezando ahora") : otros.length ? (otros.length === 1 ? esc(nombresP(otros)) + " está aquí ahora" : "Aquí están ahora") : "Estás en la sala de tu familia"}</p>
          ${curso ? `<p class="fvs">${faseDe(g)}. Entras y sigues desde ahí.</p>` : otros.length ? "" : `<p class="fvs">Cuando alguien abra la liga, aquí aparece su cara.</p>`}
          ${tiles()}${hayVoz() ? `<div class="fvz">${botVoz()}</div>${VZ ? `<p class="note c fvn">${conVoz() > 1 ? "Usa audífonos para que no haya eco." : "Cuando otro toque Hablar, se van a escuchar."}</p>` : conVoz() ? `<p class="note c fvn">${conVoz() === 1 ? "1 persona habla" : conVoz() + " personas hablan"} en la sala. Toca Hablar para escucharlos.</p>` : ""}` : ""}</div>`;
      const bRos = curso ? `<button class="btn go z" data-a="funir">Unirme al rosario</button>` : `<button class="btn ${sola ? "gh" : "go"} z" data-a="fros">${otros.length ? "Empezar el rosario con " + (otros.length === 1 ? esc(nombresP(otros)) : "ellos") : "Empezar el rosario"}</button>`;
      const bInv = `<button class="btn ${sola && !curso ? "go" : "gh"} z" data-a="fcomp">${I.comp}<span>${sola ? "Mandar la liga por WhatsApp" : "Invitar a alguien más"}</span></button>`;
      const gente = d && (d.miembros || []).length && (!sola || d.aves > 0) ? `<p class="tit z">Quién ha rezado</p><div class="fmg z">${d.miembros.slice(0, 14).map((m) => `<div class="fmi${m.hoy ? " hoy" : ""}"><span class="fma">${esc((m.n || "?").slice(0, 1).toUpperCase())}</span><span class="g"><b>${esc(m.n)}${m.yo ? " <i>(tú)</i>" : ""}</b><small>${m.aves ? (m.ros ? cuantos(m.ros, "rosario", "rosarios") + " · " : m.mis ? cuantos(m.mis, "misterio", "misterios") + " · " : "") + cuantos(m.aves, "Ave María", "Ave Marías") : "Todavía no reza aquí"}</small></span>${m.hoy ? `<span class="fmh">${I.ok}Hoy</span>` : ""}</div>`).join("")}${d.gente > 14 ? `<p class="note c">y ${d.gente - 14} más</p>` : ""}</div>` : "";
      const ult = d && (d.reciente || []).length ? `<p class="tit z">Lo último</p><ul class="ful z">${d.reciente.slice(0, 4).map((r) => `<li><span><b>${esc(r.n)}</b> ${r.c ? "rezó el rosario completo" : r.mis === 1 ? "rezó un misterio" : "rezó " + r.mis + " misterios"}</span><small>${famCuando(r.h)}</small></li>`).join("")}</ul>` : "";
      return `<section class="v d n in fam">${sky()}<div class="hd z"><button class="ic" data-a="go" data-v="hoy" data-b="1" aria-label="Regresar">${I.back}</button><p class="ru">Rosario en familia</p><button class="ic" data-a="fcomp" aria-label="Compartir la liga de la familia">${I.comp}</button></div>
        ${famB ? `<div class="fbn z" role="status"><span>${EM.rosa}</span><p><b>Amén.</b> Lo que rezaste ya se sumó al de tu familia.</p></div>` : ""}
        <h1 class="z" style="margin-top:${famB ? 14 : 10}px;font-size:34px;line-height:40px">${esc(nom)}</h1>${it ? `<p class="pin z" style="margin-top:6px">«${esc(it)}»</p>` : d && d.mia ? `<button class="lk z fpi" data-a="go" data-v="fed">Escribir por quién rezan</button>` : ""}
        ${sola && !curso ? `<p class="sub z" style="margin-top:14px">Ya está lista. Manda la liga al grupo de tu familia: quien la toque entra directo, sin código ni contraseña.</p>` : ""}
        ${vivo}
        <div class="fbs z">${sola && !curso ? bInv + bRos : bRos + bInv}</div>
        <p class="tit z">Ramillete espiritual</p>${d ? famRam(d) : `<p class="note c z">${famErr ? "No pudimos cargar lo rezado. Revisa tu internet." : "Cargando…"}</p>`}
        ${gente}${ult}
        ${pideG() ? `<div class="gua z" style="margin-top:22px"><p class="ru">Que no se pierda</p><p class="sub" style="margin:2px 0 12px">Guarda tu familia y lo que has rezado con tu cuenta de Google. Es gratis y te sigue si cambias de teléfono.</p><button class="btn gw" data-a="login">${GLOGO}<span>Guardar con Google</span></button></div>` : ""}
        ${S.fam.length > 1 ? `<p class="tit z">Tus familias</p><div class="chips wr z" style="margin-top:0">${S.fam.map((x) => `<button class="chip${x.id === id ? " on" : ""}" data-a="fotra" data-k="${x.id}">${esc(x.n || "Familia")}</button>`).join("")}</div>` : ""}
        <p class="note c z" style="margin-top:22px">Quien tenga la liga puede ver y rezar con esta familia. Compártela solo con los tuyos.</p>
        <div class="fpl z">${d && d.mia ? `<button class="lk" data-a="go" data-v="fed">Cambiar el nombre o la intención</button>` : ""}<button class="lk" data-a="fnueva">Crear otra familia</button><button class="lk" data-a="fsale">${famOjo === 1 ? "Toca otra vez para salir" : "Salir de esta familia"}</button></div></section>`; },
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
    fr: () => { const f = forma(), op = (k, t, d) => `<button class="fo${f === k ? " on" : ""}" data-a="frk" data-k="${k}" aria-pressed="${f === k}"><span class="g"><b>${t}</b><small>${d}</small></span><i class="pal">${I.ok}</i></button>`;
      return `<section class="v d n in">${sky()}${hd(["yo"], "El rosario")}<h1 style="margin-top:10px;font-size:34px;line-height:40px">¿Cómo lo rezan en tu casa?</h1><p class="sub">Las dos formas son de la Iglesia. Elige la tuya; la puedes cambiar cuando quieras.</p>
      ${op("mx", "Como en México", "Señal de la cruz y acto de contrición. En cada misterio: Padre nuestro, diez Ave Marías, Gloria, «María, Madre de gracia» y «Oh Jesús mío». Al final: Padre nuestro, tres Ave Marías, Salve y letanías.")}
      ${op("un", "Con Credo al inicio", "Señal de la cruz, Credo, Padre nuestro y tres Ave Marías antes de los misterios. Al final, la Salve. Así se reza en muchos países.")}
      <p class="note" style="margin-top:16px">Cuando rezan en una sala, todos siguen la forma de quien dirige.</p></section>`; },
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
    atrio: () => { const vs = mis(), a0 = vs[0], ved = (n) => (n === 1 ? "la" : "las"), nv = vs.length;
      return `<section class="v d n in fin5" style="padding-bottom:128px">${sky()}${obHd(5, "pid")}
        <div class="f5 z"><div class="f5r"></div><div class="nicho f5n"><i class="n1"></i><i class="n2"></i>${ARCO}<div class="nb"><span class="em f5e">${LOGO}</span><p class="ru">Tu atrio está listo</p><h2>${esc(S.n)}</h2><p class="ins">${esc(estado(S.e))}</p></div><span class="f5p f5pl"></span><span class="f5p f5pr"></span></div></div>
        <p class="f5b z">Que ${a0 ? (a0.k === "guadalupe" ? "la Virgen de Guadalupe" : esc(a0.p + " " + a0.c)) : "la Virgen"} te cubra con su manto.</p>
        <p class="tit z">${nv > 1 ? "Tus Vírgenes" : "Tu Virgen"}</p><div class="meds z">${vs.map((a, k) => `<span class="med vmed" style="animation-delay:${(1.5 + k * 0.12).toFixed(2)}s"><span class="vfig">${VIRG(a.k, 60)}</span><small>${a.c}</small></span>`).join("")}</div>
        ${S.pi ? `<p class="tit z">Tu intención</p><p class="ci c pin z">«${esc(S.pi)}»</p>` : ""}
        <p class="sub c z" style="margin-top:22px">Hoy se rezan los ${MIS[MIS_DIA[now().getDay()]].n.toLowerCase()}.${U ? " Tu avance se guarda en tu cuenta." : ""}</p>
        <div class="pie"><button class="btn go bvgo" data-a="entra">Entrar a mi atrio</button></div></section>`; },
    /* Hoy: el rosario del día como protagonista (el rosario real, que se enciende cuando lo rezas),
       el mensaje de la Virgen, rezar con los tuyos y lo que toca hoy. */
    hoy: () => {
      const d = now(), h = d.getHours(), tp = tiempo(d), set = MIS_DIA[d.getDay()], nv = nov(), hh = hoy(), rc = racha();
      const nvTxt = nv.n ? `Día ${nv.n} de 9` : nv.fiesta ? "Hoy es su fiesta" : nv.f === 1 ? "Empieza mañana" : `Empieza el 3 de diciembre, faltan ${nv.f} días`;
      // el rosario de hoy, dibujado: apagado si no lo has rezado, encendido si ya
      const vis = (() => { const prev = ros; try { const f = forma(); ros = { set, f, i: 0 }; ros.p = pasos(f); return joya(hh.r ? ros.p.length - 1 : 0); } catch (_) { return ""; } finally { ros = prev; } })();
      const M = MIS[set], tile = (a, em, ru, t, sub, extra) => `<button class="tj" ${a}><span class="tje">${em}</span><span class="ru">${ru}</span><b>${t}</b>${sub ? `<small>${sub}</small>` : ""}${extra || ""}</button>`;
      const jt = jtOk() ? (S.jt.length ? S.jt.slice(0, 1).map((j) => { const dd = JT[j.id], c = dd ? dd.cuentas || [] : [], n = c.length, ot = c.filter((x) => x.quien !== S.n).sort((a, b) => (a.hecho < b.hecho ? 1 : -1))[0];
          return tile(`data-a="jabre" data-k="${j.id}"`, EM[set], ot && n < 5 ? esc(ot.quien) + " rezó el " + ORD[ot.m].toLowerCase() + " misterio" : "Con " + esc(jtCon(j)), n === 5 ? "Completo hoy" : dd ? `Van ${n} de 5` : "Rosario juntos", "", `<span class="jmini">${[0, 1, 2, 3, 4].map((m) => `<i${c.some((x) => x.m === m) ? ' class="on"' : ""}></i>`).join("")}</span>`); }).join("")
        : tile('data-a="jnew"', EM[set], "Cada quien a su hora", "Rezar el rosario con alguien", "Tu pareja o alguien cercano, un misterio cada quien")) : "";
      const fj = S.fam[0], fd = fj ? FM[fj.id] : null, fviv = fd ? (fd.miembros || []).filter((m) => !m.yo && m.est > 0) : [], frez = fviv.filter((m) => m.est === 2);
      const ft = !jtOk() ? "" : fj ? tile('data-a="fam"', EM.rosa, frez.length ? esc(nombresM(frez)) + (frez.length === 1 ? " está rezando ahora" : " están rezando ahora") : fviv.length ? esc(nombresM(fviv)) + (fviv.length === 1 ? " está en la sala" : " están en la sala") : "Rosario en familia", esc((fd && fd.nombre) || fj.n || "Tu familia"), fd && fd.misterios ? `${fd.rosarios ? cuantos(fd.rosarios, "rosario", "rosarios") + " y " : ""}${cuantos(fd.aves, "Ave María", "Ave Marías")}${fd.dias > 1 ? " en " + fd.dias + " días" : " hoy"}. Lo que reces se suma.` : "Lo que rece cada quien se va sumando aquí.", fviv.length ? '<i class="pto tjp"></i>' : "")
        : tile('data-a="fam"', I.cam, "En vivo o cada quien a su hora", "Rosario en familia", "Mandas una liga y entran directo, sin código");
      return `<section class="v d n tb in hv">${sky()}<div class="hd hh"><p class="ru">${DIAS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]}</p>
        <button class="rch" data-a="go" data-v="yo" aria-label="Tu racha: ${rc} ${rc === 1 ? "día" : "días"}"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path fill="#E6B356" d="M8 1.5c.4 2.2 3.5 3.7 3.5 7.2a3.5 3.5 0 0 1-7 0c0-1.3.6-2.3 1.4-3.1.2 1 .8 1.6 1.3 1.7C7 5.5 7.3 3.3 8 1.5z"/></svg>${rc}</button>${perfil()}</div>
        <h1 class="hg">${h < 12 ? "Buenos días" : h < 19 ? "Buenas tardes" : "Buenas noches"}, ${esc(S.n)}</h1>
        <p class="tpo"><span style="background:${tp.c}"></span>${tp.t}</p>
        ${fviv.length ? `<button class="fhv" data-a="fam"><i class="pto"></i><span class="g"><b>${esc(nombresM(frez.length ? frez : fviv))} ${frez.length ? (frez.length === 1 ? "está rezando" : "están rezando") + " ahora" : (fviv.length === 1 ? "está" : "están") + " en la sala"}</b><small>${esc((fd && fd.nombre) || fj.n || "Tu familia")}</small></span><em>Entrar</em></button>` : ""}
        <div class="rh${hh.r ? " lit" : ""}"><div class="rhv" data-a="ros" role="button" aria-label="Rezar el rosario de hoy">${vis}</div>
          <div class="rht"><p class="ru">${hh.r ? "Ya lo rezaste hoy" : "Hoy, " + DIAS[d.getDay()].toLowerCase()}</p><h2>${hh.r ? "Tu veladora está encendida" : "El rosario de hoy"}</h2><p class="rhs">${M.n}${S.pi && !hh.r ? ` · <em>«${esc(S.pi)}»</em>` : ""}</p>
          ${hh.r ? `<div class="rhb"><button class="btn gh" data-a="go" data-v="mapa">Ver el mapa</button><button class="btn gh" data-a="ros">Rezar otra vez</button></div>` : `<div class="rhc"><button class="btn go rhgo" data-a="ros">Empezar a rezar</button><button class="btn gh rhf" data-a="fam" aria-label="Rezarlo en familia">${I.cam}<span>En familia</span></button></div>`}</div></div>
        ${deHoy("", 1)}
        <p class="tit">Con los tuyos</p>
        <div class="tjs">${ft}${jt}${tile('data-a="luzn"', LOGO, "Mándale una luz", "Rezar por alguien", "Le llega por WhatsApp")}${ft ? "" : tile('data-a="go" data-v="sala"', I.cam, "En vivo", "Rosario en familia", "Con voz y cámara")}</div>
        <p class="tit">Para hoy</p>
        <div class="card ph"><button class="row" data-a="go" data-v="ang"><span class="md">${EM.angelus}</span><span class="g"><b>Ángelus</b><small>${hh.a ? "Ya lo rezaste hoy" : "A las 12:00, con campana"}</small></span>${hh.a ? '<span class="ok">Hecho</span>' : I.bell}</button><button class="row" data-a="go" data-v="nov"><span class="md">${EM.novena}</span><span class="g"><b>Novena de Guadalupe</b><small>${nvTxt}</small></span>${I.go}</button></div>
        ${(S.sc || 0) < 4 ? `<button class="sch" data-a="masab" aria-label="Ver lo que hay más abajo"><span class="schp">Desliza para ver más<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span></button>` : ""}
        ${tabs("hoy")}</section>`;
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
          <button class="btn go" data-a="ros">${hh.r ? "Rezarlo otra vez" : "Empezar a rezar"}</button><button class="lk" data-a="fam">Rezarlo en familia</button></div></div>
        <p class="tit">Los cuatro misterios</p><div class="ret">${ni("gozosos")}${ni("luminosos")}${ni("dolorosos")}${ni("gloriosos")}</div>
        <p class="tit">${mis().length > 1 ? "Tus Vírgenes" : "Tu Virgen"}</p><div class="card">${mis().map((x) => `<button class="row" data-a="verv" data-k="${x.k}"><span class="vfig vrow">${VIRG(x.k, 36)}</span><span class="g"><b>${advN(x)}</b><small>${x.k === delDia().k ? "Hoy te trae el mensaje del día" : "Su historia y su oración"}</small></span>${I.go}</button>`).join("")}<button class="row" data-a="advsel"><span class="g"><b style="font-size:16px">Elegir mis Vírgenes</b></span>${I.go}</button></div>
        <p class="tit">Devociones</p><div class="card">${row('data-a="go" data-v="vir"', "virgen", "Devociones a la Virgen", "Bajo tu amparo, Acordaos y más")}${row('data-a="go" data-v="ang"', "angelus", "Ángelus", hh.a ? "Ya lo rezaste hoy" : "A mediodía, con campana")}${row('data-a="go" data-v="nov"', "novena", "Novena de Guadalupe", nvTxt)}</div>${tabs("rezar")}</section>`;
    },
    /* El rosario tiene dos vistas. «Oración»: el texto completo, con el aro de luz arriba (o un acercamiento al colgante
       en lo que se reza ahí). «Grande»: el rosario real a pantalla completa, para quien se lo sabe de memoria; en una sala,
       la familia queda dentro del rosario. Se cambia tocando el rosario o con el botón de la barra. */
    ros: () => {
      const st = ros.p[ros.i], M = MIS[ros.set], o = ORA[st.t], mm = st.m != null ? M.m[st.m] : null, g = guia(), sigo = ros.sala && !lead, G = !!ros.g, cl = (ros.sala ? " sl" : "") + (ros.an ? " " + ros.an : "");
      const nom = st.t === "let" ? "Letanías" : st.t === "mis" ? "" : o.n, cta = st.of ? st.k + " de " + st.of : "", don = mm ? ORD[st.m] + " misterio: " + mm[0] : st.l ? st.l : st.fin ? "Para terminar" : "Para empezar";
      const it = ros.jt && JT[ros.jt.id] && JT[ros.jt.id].intencion ? ["Su intención", JT[ros.jt.id].intencion] : ros.fam && FM[ros.fam] && FM[ros.fam].intencion ? ["La intención de tu familia", FM[ros.fam].intencion] : S.pi ? ["Tu intención", S.pi] : null, solos = sigo && tSinG && Date.now() - tSinG > 8500 && !(g && g.presence.on);
            const tk = G ? "g" : "t", tip0 = !(S.tp || {})[tk] && !Q.get("notip") ? `<div class="tip" role="dialog" aria-label="Consejo"><p>${G ? "<b>¿Quieres leer las oraciones?</b> Toca este botón y ves cada una completa." : "<b>¿Te lo sabes de memoria?</b> Toca este botón y ves el rosario en grande, sin texto."}</p><p class="tip2">${G ? "Para avanzar, toca el rosario o «Amén»." : "Ahí avanzas tocando el rosario o «Amén»."}</p><button class="tipok" data-a="tipok" data-k="${tk}">Entendido</button></div>` : "", tip = tip0;
      const tipM = !tip && !S.mu && !(S.tp || {}).mu && !Q.get("notip") && ros.i >= 1 ? `<div class="tip tm" role="dialog" aria-label="Consejo"><p><b>¿Rezas con música?</b> Toca la notita y te acompaña un coro con órgano, como en una capilla.</p><div class="tipbs"><button class="lk" data-a="tipok" data-k="mu">Sin música</button><button class="tipok" data-a="mu">Poner música</button></div></div>` : "";
      const cab = `<div class="hd z${tipM ? " htm" : ""}"><button class="ic" data-a="cerrar" aria-label="Cerrar el rosario">${I.x}</button><p class="ru">${M.n}<small class="cnt">${ros.i + 1} de ${ros.p.length}</small></p>${botMu()}${tipM}</div>`;
      const vis = `<button class="ra vt${tip ? " tipon" : ""}" data-a="vista" aria-label="${G ? "Ver la oración escrita" : "Ver el rosario en grande"}">${G ? I.txt : I.ros}</button>`;
      // La barra de abajo queda fija: «Amén» siempre está en el mismo lugar y el pulgar lo encuentra sin mirar
      const pie = `<div class="rpie">${ros.sala ? `<div class="vzl"><p class="note">${peersS.length === 1 ? "Solo tú" : peersS.length + " rezando"}</p>${botVoz(1)}</div>` : ""}<div class="rb">${solos ? `<p class="rs rs2">Ya nadie dirige.</p><button class="btn go se" data-a="dirijo">Seguir yo</button>` : sigo ? `<p class="rs">${esc((g && g.presence.n) || "Tu familia")} dirige. Tú respondes.</p>` : `<button class="ra" data-a="ant" aria-label="Regresar una cuenta"${ros.i > 0 ? "" : " disabled"}>${I.back}</button><button class="btn go se" data-a="sig">${st.t === "mis" || (st.t === "let" && st.k < st.of) ? "Continuar" : "Amén"}</button>`}${vis}</div>${tip}</div>`;
      if (G) { const fam = ros.sala && (peersS.length > 1 || !!(VZ && VZ.cam));
        const cara = (p, xy, sz) => { const pr = p.presence || {}, id = esc(p.peer), cam = pr.c && VZ && (p.isMe ? VZ.cam : VZ.rs[p.peer]);
          return `<span class="fb${pr.v ? " vz" : ""}${p.isMe ? " me" : ""}${pr.lead ? " ld" : ""}" data-p="${id}" data-a="foco" data-k="${id}" role="button" aria-label="Ver a ${esc(p.isMe ? "ti" : pr.n || "Alguien")} en grande" style="left:${f1(((xy[0] - 22) / 346) * 100)}%;top:${f1(((xy[1] - 76) / 634) * 100)}%;width:${f1((sz / 346) * 100)}%;--s:${sz}" title="${esc(p.isMe ? "Tú" : pr.n || "Alguien")}"><span class="cara">${cam ? `<video data-v="${id}" autoplay playsinline muted></video>` : `<b>${esc((pr.n || "?").slice(0, 1).toUpperCase())}</b>`}${pr.v === 2 ? `<i class="mm">${I.mute}</i>` : ""}</span></span>`; };
        const fp = fam && ros.fo ? peersS.find((p) => p.peer === ros.fo) : null;
        if (fp) { const pr = fp.presence || {}, id = esc(fp.peer), cam = pr.c && VZ && (fp.isMe ? VZ.cam : VZ.rs[fp.peer]), otros = peersS.filter((p) => p.peer !== fp.peer).slice(0, 15);
          const mini = (p) => { const r = p.presence || {}, k = esc(p.peer), c = r.c && VZ && (p.isMe ? VZ.cam : VZ.rs[p.peer]); return `<button class="mn${r.v ? " vz" : ""}${p.isMe ? " me" : ""}" data-p="${k}" data-a="foco" data-k="${k}" aria-label="Ver a ${esc(p.isMe ? "ti" : r.n || "Alguien")}"><span class="cara">${c ? `<video data-v="${k}" autoplay playsinline muted></video>` : `<b>${esc((r.n || "?").slice(0, 1).toUpperCase())}</b>`}</span></button>`; };
          return `<section class="v d ro gr fm foc${cl}">${sky()}${cab}<p class="jyl z">${st.t === "mis" ? `<small>${ORD[st.m]} misterio</small><b>${mm[0]}</b>` : `<small>${don}</small><b class="rn">${nom}</b>${cta ? `<em>${cta}</em>` : ""}`}</p>
            <div class="spot z"><button class="spg${pr.v ? " vz" : ""}${fp.isMe ? " me" : ""}" data-p="${id}" data-a="foco" data-k="" aria-label="Regresar a ver a todos"><span class="cara">${cam ? `<video data-v="${id}" autoplay playsinline muted></video>` : `<b>${esc((pr.n || "?").slice(0, 1).toUpperCase())}</b>`}${pr.v === 2 ? `<i class="mm">${I.mute}</i>` : ""}</span><span class="spn">${esc(fp.isMe ? "Tú" : pr.n || "Alguien")}${pr.lead ? " · dirige" : ""}</span></button>
            ${sigo ? `<div class="spr">${joya(ros.i)}</div>` : `<button class="spr" data-a="sig" aria-label="${st.t === "mis" ? "Continuar" : "Amén"}">${joya(ros.i)}</button>`}</div>
            ${otros.length ? `<div class="mns z">${otros.map(mini).join("")}</div>` : ""}${pie}</section>`; }
        const L = peersS.slice(0, 16), q = fam ? enjambre(L.length) : null;
        const centro = fam ? `<div class="jyf">${L.map((p, k) => cara(p, q.pts[k] || [195, 262], q.s)).join("")}</div>`
          : `<div class="jyc">${st.t === "mis" ? `<span class="em">${EM[ros.set] || ""}</span><small>${ORD[st.m]} misterio</small><b class="tm">${mm[0]}</b><i>${mm[1]}</i>` : `<small>${don}</small><b class="rn">${nom}</b>${cta ? `<span>${cta}</span>` : ""}`}</div>`;
        const arriba = fam ? `<p class="jyl z">${st.t === "mis" ? `<small>${ORD[st.m]} misterio</small><b>${mm[0]}</b>` : `<small>${don}</small><b class="rn">${nom}</b>${cta ? `<em>${cta}</em>` : ""}`}</p>` : "";
        return `<section class="v d ro gr${fam ? " fm" : ""}${cl}">${sky()}${cab}${arriba}<div class="jyw z">${sigo ? `<div class="jyt">${joya(ros.i)}</div>` : `<button class="jyt" data-a="sig" aria-label="${st.t === "mis" ? "Continuar" : "Amén"}">${joya(ros.i)}</button>`}${centro}</div>${pie}</section>`; }
      const orb = ros.sala ? orbita() : "";
      const bloques = (bl) => (bl || []).map(([k, t]) => (k === "v" ? `<p class="pr"><i>V/.</i> ${t}</p>` : k === "r" ? `<p class="pr rr"><i>R/.</i> ${t}</p>` : k === "t" ? `<p class="pr"><i>Todos.</i> ${t}</p>` : `<p class="ex">${t}</p>`)).join("");
      const texto = () => (o.v ? `<p class="pr"><i>V/.</i> ${o.v}</p><p class="pr rr"><i>R/.</i> ${o.r}</p>` : "") + bloques(o.bl) + (st.x === 2 ? `<p class="pr jc"><i>V/.</i> ${o.mg[0]}</p><p class="pr rr jc"><i>R/.</i> ${o.mg[1]}</p><p class="pr jc"><i>Todos.</i> ${o.x}</p>` : st.x ? `<p class="ex">${o.x}</p>` : "");
      if (st.t === "mis") return `<section class="v d ro mi${cl}">${sky()}${cab}<div class="rt z"><p class="c" style="margin-top:12px;font-size:14px;font-weight:600;color:var(--txt2)">${ORD[st.m]} misterio</p><h1 class="c" style="font-size:28px;line-height:34px">${mm[0]}</h1><p class="ru c" style="margin-top:6px;font-size:16px">${mm[1]}</p></div><div class="ring z" data-a="vista">${ring(ros.i)}${orb}<div class="emc">${EM[ros.set] || ""}</div></div><div class="rt z"><p class="pr c" style="font-size:21px;line-height:29px">${mm[2]}</p></div>${pie}</section>`;
      // las cuentas de cada misterio: el aro de luz
      if (mm) return `<section class="v d ro${st.lg ? " lg" : ""}${cl}">${sky()}${cab}<p class="rl z">${don}</p><div class="ring z" data-a="vista">${ring(ros.i)}${orb}<div><b class="rn">${nom}</b>${cta ? `<span>${cta}</span>` : ""}</div></div><div class="rt z">${texto()}</div>${pie}</section>`;
      // lo que se reza en la cruz, la medalla y el colgante: un acercamiento a esa parte del rosario
      const L = st.t === "let" ? LET[st.k - 1] : null, lista = (r, inv) => (inv ? `<p class="lr"><i>R/.</i> ${r}</p><ul class="li">${inv.map((x) => `<li>${x}</li>`).join("")}</ul>` : "");
      return `<section class="v d ro cg${L ? " lt" : ""}${st.lg === 2 ? " xl" : ""}${cl}">${sky()}${cab}<div class="colg z" data-a="vista"><div class="cgv">${joya(ros.i, 1)}</div><div class="cgt"><small>${don}</small><b class="rn">${nom}</b>${cta ? `<span>${cta}</span>` : ""}${it && !st.lg && !L ? `<p class="cgi"><small>${it[0]}</small>«${esc(it[1])}»</p>` : ""}</div></div>
        <div class="rt z">${L ? lista(L.r, L.inv) + lista(L.r2, L.inv2) + bloques(L.bl) : texto()}</div>${pie}</section>`;
    },
    listo: () => { const lit = encendidos(), n = vivos().length, ra = racha(), hito = total() <= 1 ? 1 : [3, 7, 14, 30, 60, 100, 200, 365].includes(ra) ? 2 : 0; const guarda1 = pideG() && hito; return `<section class="v d in${guarda1 ? " lsg" : ""}">${sky()}${hd(["hoy", "x"], "México en oración")}<h1 class="c z" style="margin-top:14px;font-size:34px;line-height:40px">Tu veladora ya<br>está encendida</h1><p class="ru c z" style="margin-top:6px">${esc(estado(S.e))}</p>${S.pi ? `<p class="pin c z">Lo ofreciste «${esc(S.pi)}»</p>` : ""}<div class="z" style="display:flex;align-items:center;gap:16px;margin-top:4px"><p style="font-family:var(--se);font-weight:600;font-size:46px;line-height:48px;color:var(--oroc)">${racha()}</p><p class="sub" style="margin:0">${racha() === 1 ? "día seguido rezando. Mañana vuelve por el segundo." : "días seguidos rezando el rosario."}</p></div>${S.fam.length && jtOk() ? `<button class="fls z" data-a="fam"><span>${EM.rosa}</span><span class="g"><b>Se sumó al ramillete de ${esc(conLa((FM[S.fam[0].id] && FM[S.fam[0].id].nombre) || S.fam[0].n || "tu familia"))}</b>${FM[S.fam[0].id] && FM[S.fam[0].id].rosarios ? `<small>Ya llevan ${cuantos(FM[S.fam[0].id].rosarios, "rosario", "rosarios")}</small>` : ""}</span>${I.go}</button>` : ""}${guarda1 ? `<div class="gua z"><p class="ru">${hito === 1 ? "No la pierdas" : "No los pierdas"}</p><p class="sub" style="margin:2px 0 12px">${hito === 1 ? "Tu veladora y tu racha viven solo en este teléfono. Guárdalas con tu cuenta de Google." : `Tus ${ra} días seguidos viven solo en este teléfono. Guárdalos con tu cuenta de Google.`}</p>${gBtn("Guardar con Google")}</div>` : ""}<div class="z mapa-full"><div class="halo"></div>${mapa(lit, S.e, 1)}</div>
      ${n > 1 ? `<p class="note z" style="margin-top:12px">Ahora mismo hay ${n} personas con Atrio abierto.</p>` : ""}
      ${guarda1 ? `<button class="btn gh z" data-a="go" data-v="hoy" style="margin-top:14px">Volver a hoy</button>` : `<button class="btn go mt z" data-a="go" data-v="hoy">Volver a hoy</button>`}<button class="btn gh z" data-a="luzn" data-q="ros" style="margin-top:10px">Avisarle a alguien que recé por él</button><button class="lk c z" data-a="copiar" style="margin-top:4px">Copiar invitación para mi familia</button></section>`; },
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
      <div class="card" style="margin-top:12px"><button class="row" data-a="go" data-v="nom"><span class="g"><b>Cambiar mi nombre o mi estado</b><small>${esc(estado(S.e))}</small></span>${I.go}</button><button class="row" data-a="advsel"><span class="g"><b>${mis().length > 1 ? "Mis Vírgenes" : "Mi Virgen"}</b><small>${mis().map((x) => x.c).join(", ")}</small></span>${I.go}</button><button class="row" data-a="go" data-v="pid"><span class="g"><b>Por quién rezo</b><small>${S.pi ? esc(S.pi) : "Escribe tu intención"}</small></span>${I.go}</button>${jtOk() ? `<button class="row" data-a="jnueva"><span class="g"><b>Rosario juntos</b><small>${S.jt.length ? "Crear otro con alguien más" : "Reza por misterios con tu pareja o familia"}</small></span>${I.go}</button>` : ""}<button class="row" data-a="go" data-v="conf"><span class="g"><b>Mi última confesión</b><small>${S.cf ? (() => { const n = Math.max(0, Math.round((now() - new Date(S.cf + "T12:00:00")) / 864e5)); return n === 0 ? "Hoy" : n === 1 ? "Ayer" : n < 60 ? "Hace " + n + " días" : "Hace " + Math.round(n / 30.4) + " meses"; })() : "Solo tú la ves"}</small></span>${I.go}</button><button class="row" data-a="go" data-v="fr"><span class="g"><b>Cómo rezo el rosario</b><small>${forma() === "mx" ? "Como en México, con Salve y letanías" : "Con Credo al inicio"}</small></span>${I.go}</button><label class="row"><span class="g"><b>Música de fondo al rezar</b><small>Coro y órgano, como en una capilla</small></span><span class="sw"><input type="checkbox" id="fmu"${S.mu ? " checked" : ""}><span></span></span></label><label class="row"><span class="g"><b>Vibración al rezar</b><small>Un toque en cada cuenta, más fuerte en cada misterio</small></span><span class="sw"><input type="checkbox" id="fv"${S.vib !== 0 ? " checked" : ""}><span></span></span></label><button class="row" data-a="copiar"><span class="g"><b>Invitar a mi familia</b><small>Copia un mensaje para WhatsApp</small></span>${I.go}</button></div>
      ${U ? `<div class="card" style="margin-top:12px"><div class="row" style="cursor:default"><span class="g"><b>Tu avance está guardado</b><small>${esc(U.email || "Cuenta de Google")}</small></span><span class="ok">Listo</span></div><button class="row" data-a="logout"><span class="g"><b>Cerrar sesión</b></span>${I.go}</button></div>` : !conG() ? `<p class="note" style="margin-top:12px">Tu avance se guarda solo en este dispositivo.</p>` : pideG() ? `<button class="btn te" data-a="login" style="margin-top:12px">Guardar con Google</button><p class="note" style="margin-top:8px">Sin cuenta, tu avance vive solo en este teléfono.</p>` : ""}<p class="note c" style="margin-top:18px"><a href="/privacidad/">Aviso de privacidad</a> · <a href="/terminos/">Términos de uso</a> · <a href="#" data-a="go" data-v="cred">Créditos de imágenes</a></p>${tabs("yo")}</section>`; },
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
  /* Recorrido de la primera vez: cinco globos que señalan lo importante de Hoy */
  let tourI = -1;
  const TOUR = [
    ['.rhgo, .rhb', "Empieza aquí", "Toca este botón y rezas el rosario de hoy. Te guiamos cuenta por cuenta: solo lees y tocas «Amén»."],
    ['.tj[data-a="fam"], .tj[data-v="sala"]', "Rosario en familia", "Crea tu familia y manda la liga por WhatsApp: entran directo, sin código. Lo que reza cada quien se va sumando y, si coinciden, se ven en vivo."],
    ['.tj[data-a="jnew"], .tj[data-a="jabre"]', "Rosario juntos", "Con tu pareja o alguien cercano: cada quien reza su misterio a su hora y entre los dos lo completan."],
    ['.tj[data-a="luzn"]', "Manda una luz", "Reza un Ave María por alguien y avísale por WhatsApp con una paloma."],
    ['.tabs', "Tu Atrio", "En Rezar están todas las oraciones; en Mapa ves las veladoras de México; en Yo, tu racha y tus ajustes."],
    ['.pfe, .pf', "Guarda tu avance", "Entra con Google para no perder tu racha si cambias de teléfono."]
  ];
  function tour(n) {
    const x = document.getElementById("tour"); if (x) x.remove();
    if (view !== "hoy") return;
    while (n < TOUR.length && !app.querySelector(TOUR[n][0])) n++;
    if (n >= TOUR.length) { tourI = -1; S.tour = 1; save(); return; }
    tourI = n; const [sel, t, d] = TOUR[n], el = app.querySelector(sel), quedan = TOUR.slice(n + 1).filter((q) => app.querySelector(q[0])).length, tot = n + 1 + quedan;
    const pts = Array.from({ length: tot }, (_, k) => `<i class="${k === n ? "on" : k < n ? "ok" : ""}"></i>`).join("");
    app.insertAdjacentHTML("beforeend", `<div id="tour" role="dialog" aria-label="${t}"><div class="tu-h"><span class="tu-p"></span></div>
      <div class="tu-b"><div class="tu-t"><div class="tu-d" aria-label="Paso ${n + 1} de ${tot}">${pts}</div><button class="lk tu-x" data-a="tourx">Saltar la guía</button></div><b>${t}</b><p>${d}</p><button class="btn go tu-n" data-a="tourn">${quedan ? "Siguiente" : "Listo, a rezar"}</button></div></div>`);
    const T = document.getElementById("tour"), hl = T.querySelector(".tu-h"), b = T.querySelector(".tu-b"), pad = 8, m = 14;
    const fijo = !!el.closest(".tabs") || getComputedStyle(el).position === "fixed";
    // las tarjetas entran con una animación: se mide su lugar final, sin el movimiento de entrada
    const sinAnim = () => { app.querySelectorAll(".in>*").forEach((x) => { x.style.animation = "none"; }); };
    sinAnim();
    if (!fijo) { const H = window.innerHeight, bh = b.offsetHeight, r = el.getBoundingClientRect(), alto = Math.min(r.height, Math.max(60, H - bh - m - pad * 2 - 30)), quiero = Math.max(pad + 14, Math.min((H - (alto + pad * 2 + m + bh)) / 2, H * 0.2));
      try { window.scrollTo({ top: Math.max(0, window.scrollY + r.top - quiero), behavior: "instant" }); } catch (_) { window.scrollTo(0, Math.max(0, window.scrollY + r.top - quiero)); } }
    // el marco y la burbuja se recolocan en cada cuadro mientras la guía está abierta: siempre quedan encima de lo que explican
    let ult = "";
    const coloca = () => { if (!document.getElementById("tour") || T !== document.getElementById("tour")) return;
      const H = window.innerHeight, bh = b.offsetHeight, r = el.getBoundingClientRect(), k = [r.left, r.top, r.width, r.height, H, bh].map(Math.round).join();
      if (k !== ult) { ult = k;
        let top = Math.max(pad, r.top), bot = Math.min(H - pad, r.bottom), y;
        if (bot + pad + m + bh <= H - 6) y = bot + pad + m; else if (top - pad - m - bh >= 6) y = top - pad - m - bh; else { bot = Math.max(top + 56, H - bh - m - pad - 8); y = bot + pad + m; }
        hl.style.cssText = `left:${Math.round(r.left - pad)}px;top:${Math.round(top - pad)}px;width:${Math.round(r.width + pad * 2)}px;height:${Math.round(bot - top + pad * 2)}px;transition:none`;
        b.style.top = Math.round(y) + "px"; b.classList.toggle("ab", y > top); b.classList.toggle("ar", y <= top);
        const br = b.getBoundingClientRect(); b.style.setProperty("--fx", Math.round(Math.max(30, Math.min(br.width - 30, r.left + r.width / 2 - br.left))) + "px"); }
      requestAnimationFrame(coloca); };
    coloca();
  }
  function aviso(t) { msg = t; const x = app.querySelector(".toast"); if (x) x.remove(); app.insertAdjacentHTML("beforeend", `<div class="toast" role="status">${esc(t)}</div>`); clearTimeout(tMsg); tMsg = setTimeout(() => { msg = ""; const y = app.querySelector(".toast"); if (y) y.remove(); }, Math.max(2600, 1400 + t.length * 45)); }
  function finJt(s) {
    ros = null; vibra(3); musica(false); jtA = s.jt.id;
    const pend = () => 5 - jtHechos(s.jt.id).length;
    go("jt");
    SB.rpc("juntos_marca", { j: s.jt.id, d: key(now()), m: s.jt.m, q: S.n || "Alguien" }).then((r) => {
      if (r && !r.error && r.data) JT[s.jt.id] = r.data;
      if (pend() === 0) { marca("r"); enciende(); go("listo"); aviso("Entre todos completaron el rosario de hoy."); }
      else { render(1); aviso(pend() === 1 ? "Listo. Falta un misterio." : `Listo. Faltan ${pend()} misterios.`); guarda("j", "Rezaste tu misterio", "Guarda con tu cuenta de Google tus rosarios juntos y tu racha."); }
    }, () => aviso("No se pudo guardar. Revisa tu internet e intenta otra vez."));
  }
  function fin() { const s = ros; if (s) famSuma(2); if (s && s.jt) return finJt(s); ros = null; vibra(3); musica(false); marca("r"); enciende(); if (s && s.nov) { const y = now().getFullYear(); S.nov[y] = Object.assign(S.nov[y] || {}, { [s.nov]: 1 }); save(); } if (lead && sala) sala.presence({ fin: 1, on: 0 }).catch(() => {});
    // rosario rezado en la familia: se regresa a su página, donde ya aparece sumado; quien dirigía suelta la guía para que otro pueda empezar después
    if (s && s.fam && famJ(s.fam)) { famA = s.fam; famB = Date.now(); if (lead && famS) setTimeout(() => { if (lead && famS && !ros) { lead = false; presSala(); } }, 12000); go("fam"); guarda("f", "Tu rosario ya se sumó", "Guarda tu familia y lo que has rezado con tu cuenta de Google. Es gratis y te sigue si cambias de teléfono."); return; }
    go("listo"); }
  const OTP_ON = SB_URL.indexOf("http") === 0 && (Q.get("correo") || "__OTP__" === "1");
  let dirN = "", estAbre = 0, vuelveE = "hoy", correo = "", otpE = 0, otpT = 0;
  const sinAc = (t) => t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  // sugerencia por la zona horaria del teléfono (solo las que señalan un estado con claridad)
  const sugEst = () => { let z = ""; try { z = Intl.DateTimeFormat().resolvedOptions().timeZone || ""; } catch (_) {} if (Q.get("tz")) z = Q.get("tz");
    const M = { "America/Cancun": 22, "America/Merida": 30, "America/Monterrey": 18, "America/Tijuana": 1, "America/Hermosillo": 25, "America/Chihuahua": 5, "America/Ciudad_Juarez": 5, "America/Ojinaga": 5, "America/Matamoros": 27, "America/Bahia_Banderas": 17, "America/Mazatlan": 24 };
    if (M[z] !== undefined) return M[z]; if (z && !/^America\/(Mexico_City|Monterrey|Merida|Cancun|Matamoros|Chihuahua|Ojinaga|Ciudad_Juarez|Hermosillo|Mazatlan|Bahia_Banderas|Tijuana)$/.test(z) && !/^(UTC|Etc\/)/.test(z)) return 99; return null; };
  function go(v, b) { const gs0 = document.getElementById("gsh"); if (gs0) gs0.remove(); if (v === "advs" && !sel.length) sel = S.vs.slice(); if (v === "adv" && /^(hoy|vir|yo|rezar)$/.test(view)) vuelve = view; view = V[v] ? v : "hoy"; if (v === "mapa") cargaVelas(); if (view === "ros" && !ros) view = "hoy"; if (!S.n && !/^(bien|nom|est|luzv|entrar|jt|fam)$/.test(view)) view = "bien"; if (S.n && S.e < 0 && !/^(bien|nom|gusto|est|jt|ros|listo|sala|fam|fnew|fed|entrar)$/.test(view)) { ob = 1; view = "est"; } if (famS && !/^(fam|fed|ros)$/.test(view)) salir(); if (view !== "fam" && view !== "fed") famOjo = 0; try { if (/^(hoy|rezar|mapa|yo)$/.test(view)) history.replaceState(null, "", "#" + view); } catch (_) {}
    // la paloma trae el mensaje la primera vez que se abre Hoy cada día
    if (view === "hoy" && SB) { jtTodos(); famTodos(); }
    if (view === "jt" && SB && jtA) jtVer(jtA);
    if (view === "fam") setTimeout(famAbre, 0);
    if (view === "hoy" && S.n && S.pd !== key(now())) { palT = Date.now(); S.pd = key(now()); save(); }
    // hacia adentro la vista entra por la derecha; al regresar, por la izquierda; las pestañas solo suben
    dirN = b ? "bk" : /^(nom|est|advs|adv|pid|nov|novd|ang|vir|vird|sala|fam|fnew|fed)$/.test(view) ? "fw" : "";
    render(); dirN = ""; try { window.scrollTo(0, 0); } catch (_) {} }
  /* Entrar con Google desde el propio sitio: el botón oficial de Google abre una ventanita que dice
     «para continuar a rosariojuntos.com» y nos da un token que Supabase canjea por la sesión. */
  const GCID = "62557042429-qme6tamlon3l828rk3bh8fo1r43o2h0p.apps.googleusercontent.com";
  let GSI = 0;
  function cargaGsi() { if (GSI || !conG() || !/(^|\.)rosariojuntos\.com$/.test(location.hostname)) return; GSI = 1;
    const sc = document.createElement("script"); sc.src = "https://accounts.google.com/gsi/client"; sc.async = true; sc.defer = true;
    sc.onload = () => { try { google.accounts.id.initialize({ client_id: GCID, callback: gsiOk, ux_mode: "popup", auto_select: false, itp_support: true, cancel_on_tap_outside: true }); GSI = 2; pintaG(); } catch (_) { GSI = 3; } };
    sc.onerror = () => { GSI = 3; }; document.head.appendChild(sc); }
  function pintaG() { if (GSI !== 2) return; document.querySelectorAll(".gsiw:not(.on)").forEach((w) => { const g = w.querySelector(".gsi"); try { google.accounts.id.renderButton(g, { type: "standard", theme: "outline", size: "large", shape: "pill", text: "continue_with", logo_alignment: "center", locale: "es", width: Math.max(220, Math.min(400, w.offsetWidth || 320)) }); w.classList.add("on"); } catch (_) {} }); }
  function gsiOk(r) { if (!SB || !r || !r.credential) return; if (vuelveE === "atrio") { ob = 0; delete S.ob; save(); }
    SB.auth.signInWithIdToken({ provider: "google", token: r.credential }).then((x) => { if (x && x.error) { aviso("No se pudo entrar con Google. Intenta otra vez."); return; } const h = document.getElementById("gsh"); if (h) h.remove(); aviso("Listo. Tu avance ya se guarda en tu cuenta."); if (view === "entrar") go(V[vuelveE] && vuelveE !== "entrar" ? vuelveE : "hoy"); }, () => aviso("No se pudo entrar con Google. Intenta otra vez.")); }
  function render(quieto) { despierta(view === "ros" || !!VZ); app.innerHTML = V[view]() + (msg ? `<div class="toast" role="status">${esc(msg)}</div>` : ""); if (view === "ros") setTimeout(mas, 90); cargaGsi(); pintaG(); if (VZ) { pegaVideos(); escucha(); } volMu(); const x = app.querySelector(".in"); if (x) { if (quieto === 1) x.classList.remove("in"); else if (dirN) x.classList.add(dirN); } }
  // tras redibujar una lista de opciones, el foco vuelve al botón que se tocó (teclado y lectores de pantalla)
  // y si quedó elegido, su palomita brota y el teléfono da un toque
  const foco = (a, k) => { try { const b = app.querySelector(`[data-a="${a}"][data-k="${k}"]`); if (!b) return; b.focus({ preventScroll: true }); if (b.classList.contains("on") || b.classList.contains("now")) { b.classList.add("ya"); const li = b.closest("li"); if (li) li.classList.add("ya"); } vibra(1); } catch (_) {} };
  const A = {
    go: (d) => go(d.v, d.b),
    nom: () => { const v = (document.getElementById("fn").value || "").trim(); if (!v) { document.getElementById("fn").focus(); return; } S.n = v; if (ob) S.ob = 1; save(); go(ob ? "gusto" : "est"); },
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
    entra: () => { ob = 0; delete S.ob; save(); go("hoy"); if (!S.tour) setTimeout(() => tour(0), 700); },
    gno: () => { const x = document.getElementById("gsh"); if (x) x.remove(); },
    lupa: (d) => { LU = { k: d.k, i: -1 }; lupa(); vibra(1); },
    lupan: (d) => { if (!LU) return; LU.i = +d.k; lupaT(); vibra(1); },
    lupas: () => { if (!LU) return; const a = ADV.find((q) => q.k === LU.k), n = ((a && a.sim) || []).length; LU.i = LU.i >= n - 1 ? -1 : LU.i + 1; lupaT(); vibra(1); },
    lupax: () => { LU = null; lupa(); },
    lupao: () => { if (!LU) return; LU.i = -1; lupaT(); },
    masab: () => { try { window.scrollBy({ top: Math.round(window.innerHeight * 0.62), behavior: "smooth" }); } catch (_) { window.scrollBy(0, 400); } },
    tourn: () => tour(tourI + 1),
    tourx: () => tour(99),
    ros: (d) => { ros = { set: d.set || MIS_DIA[now().getDay()], i: 0, nov: d.nov ? +d.nov : 0, f: forma(), g: Q.get("demo") && Q.get("g") === "1" ? 1 : grande0(0) }; ros.p = pasos(ros.f); if (S.mu) musica(true); famSuma(); if (Q.get("paso")) ros.i = Math.min(ros.p.length - 1, +Q.get("paso")); ros.an = "sg"; go("ros"); if (ros) ros.an = ""; },
    rosala: () => { ros = { set: MIS_DIA[now().getDay()], i: 0, sala: 1, f: forma(), g: grande0(1) }; ros.p = pasos(ros.f); if (S.mu) musica(true); presSala(); famSuma(); ros.an = "sg"; go("ros"); if (ros) ros.an = ""; },
    foco: (d) => { if (!ros) return; ros.fo = d.k && ros.fo !== d.k ? d.k : ""; vibra(1); render(); },
    tipok: (d) => { S.tp = Object.assign({}, S.tp, { [d.k]: 1 }); save(); render(); },
    vista: () => { if (!ros) return; S.tp = Object.assign({}, S.tp, { [ros.g ? "g" : "t"]: 1 }); ros.g = ros.g ? 0 : 1; S.rg = ros.g; save(); vibra(1); ros.an = "sg"; render(); ros.an = ""; try { window.scrollTo(0, 0); } catch (_) {} },
    sig: () => { if (!ros) return; if (!ros.g && falta()) return baja(); if (ros.i >= ros.p.length - 1) return fin(); ros.i++; famSuma(); vibraPaso(); presSala(); ros.an = "sg"; render(); ros.an = ""; try { window.scrollTo(0, 0); } catch (_) {} },
    ant: () => { if (ros && ros.i > 0) { ros.i--; vibra(1); presSala(); ros.an = "at"; render(); ros.an = ""; } },
    cerrar: () => { const s = ros && ros.sala, f = ros && ros.fam && famJ(ros.fam) ? ros.fam : ""; famSuma(1); if (s && famS) { lead = false; noSigo = 1; } ros = null; tSinG = 0; musica(false); if (s) presSala(); if (f) { famA = f; go("fam", 1); if (famS) famVer(f, 1); return; } go(s ? "sala" : "hoy"); },
    novd: (d) => { nd = +d.n; go("novd"); },
    vird: (d) => { vn = +d.n; go("vird"); },
    novok: () => { vibra(2); const y = now().getFullYear(); S.nov[y] = Object.assign(S.nov[y] || {}, { [nd]: 1 }); save(); go("nov"); guarda("n", "Un día más de tu novena", "Guárdala con tu cuenta de Google para seguirla en cualquier teléfono."); },
    bell: () => bell(3),
    angok: () => { vibra(2); marca("a"); go("hoy"); guarda("a", "Rezaste el Ángelus", "Guarda tu racha con tu cuenta de Google y no la pierdas si cambias de teléfono."); },
    copiar: () => { const t = "Te invito a rezar el rosario conmigo en Atrio. Hoy tocan los " + MIS[MIS_DIA[now().getDay()]].n.toLowerCase() + "."; try { navigator.clipboard.writeText(t).then(() => aviso("Mensaje copiado. Pégalo en WhatsApp con el enlace."), () => aviso(t)); } catch (_) { aviso(t); } },
    crear: () => { const L = "ABCDEFGHJKLMNPQRSTUVWXYZ"; let c = ""; for (let i = 0; i < 3; i++) c += L[Math.floor(Math.random() * L.length)]; c += Math.floor(10 + Math.random() * 90); entrar(c, true); },
    unir: () => { const c = (document.getElementById("fc").value || "").trim().toUpperCase().replace(/[^A-Z0-9]/g, ""); if (c.length < 4) { document.getElementById("fc").focus(); return; } entrar(c, false); },
    salir: () => { salir(); go("hoy"); },
    voz: () => { prendeVoz(); },
    cuelga: () => { apagaVoz(); },
    cam: () => { camara(); },
    frk: (d) => { if (d.k !== "mx" && d.k !== "un") return; S.fr = d.k; save(); vibra(1); render(1); },
    cfhoy: () => { S.cf = key(now()); save(); vibra(2); render(1); aviso("Que Dios te bendiga."); },
    fam: () => { if (!jtOk()) { go("sala"); return; } if (S.fam.length) { if (!famJ(famA)) famA = S.fam[0].id; go("fam"); } else go("fnew"); },
    fnueva: () => { if (S.fam.length >= 5) { aviso("Puedes tener hasta 5 familias. Sal de una para crear otra."); return; } go("fnew"); },
    fich: (d) => { const f = document.getElementById("ffi"), t = FIS[+d.k]; if (f && t) { f.value = t; vibra(1); } },
    fcrea: () => {
      const val = (k, n) => ((document.getElementById(k) || {}).value || "").replace(/\s+/g, " ").trim().slice(0, n);
      if (S.fam.length >= 5) { aviso("Puedes tener hasta 5 familias. Sal de una para crear otra."); return; }
      const n = val("ff", 40) || "Familia de " + (S.n || "todos").slice(0, 24), i = val("ffi", 140), id = famNuevoId();
      miId(); if (sala && famS) salir(); S.fam.unshift({ id, n, i, p: 1 }); save(); famA = id; famB = 0; vibra(2);
      FM[id] = { id, nombre: n, intencion: i, creador: S.n, mia: true, dias: 1, rosarios: 0, misterios: 0, aves: 0, rezados: 0, hoy: { rosarios: 0, misterios: 0, aves: 0 }, gente: 1, miembros: [{ n: S.n, yo: true, ros: 0, mis: 0, aves: 0, hoy: 0, est: 1 }], reciente: [] };
      // la hoja de compartir se abre con este mismo toque (el teléfono no la deja abrir después); la familia se guarda mientras tanto
      famCrea(id); famComparte(id); go("fam");
    },
    fcomp: () => { vibra(1); famComparte(famA, sala && famS === famA && peersS.length === 1 && FM[famA] && FM[famA].gente > 1 ? "vivo" : ""); },
    fros: () => { const g = sala && famS ? guia() : null; if (g && !g.isMe && g.presence.on) { noSigo = 0; salaCambio(); return; }
      const s = sala && famS === famA ? 1 : 0; ros = { set: MIS_DIA[now().getDay()], i: 0, sala: s, f: forma(), g: grande0(s), fam: famA }; ros.p = pasos(ros.f); if (s) lead = true; famB = 0; if (S.mu) musica(true); presSala(); famSuma(); ros.an = "sg"; go("ros"); if (ros) ros.an = ""; if (s) famVer(famA, 2); },
    funir: () => { noSigo = 0; pk0 = ""; salaCambio(); },
    dirijo: () => { if (!ros || !ros.sala || !sala) return; lead = true; tSinG = 0; presSala(); vibra(1); render(); },
    fnom: () => { const f = document.getElementById("fn"), v = ((f && f.value) || "").replace(/\s+/g, " ").trim().slice(0, 24); if (!v) { if (f) f.focus(); return; } S.n = v; if (S.e < 0) S.ob = 1; save(); vibra(2); render(); famAbre(); },
    fguarda: () => { const val = (k, n) => ((document.getElementById(k) || {}).value || "").replace(/\s+/g, " ").trim().slice(0, n), n = val("ff", 40), i = val("ffi", 140), id = famA;
      if (!n) { const f = document.getElementById("ff"); if (f) f.focus(); return; } if (!SB) { aviso("Sin conexión. Intenta otra vez."); return; }
      const b = app.querySelector('[data-a="fguarda"]'); if (b) { b.disabled = true; b.textContent = "Guardando…"; }
      SB.rpc("fam_edita", { f: id, mi: miId(), n, i, d: key(now()) }).then((r) => { if (r && !r.error && r.data && r.data.id === id) { famPon(id, r.data); vibra(2); go("fam", 1); aviso("Guardado."); } else { aviso("No se pudo guardar. Solo quien creó la familia puede cambiarla."); render(1); } }, () => { aviso("Sin conexión. Intenta otra vez."); render(1); }); },
    fotra: (d) => { if (!famJ(d.k) || d.k === famA) return; if (sala && famS) salir(); famA = d.k; famB = 0; go("fam"); },
    fsale: () => { if (famOjo !== 1) { famOjo = 1; render(1); setTimeout(() => { if (famOjo === 1) { famOjo = 0; if (view === "fam") render(1); } }, 4500); return; } famQuita(famA); aviso("Listo. Si quieres volver, abre otra vez la liga."); },
    fquita: () => famQuita(famA),
    fborra: () => { if (famOjo !== 2) { famOjo = 2; render(1); setTimeout(() => { if (famOjo === 2) { famOjo = 0; if (view === "fed") render(1); } }, 4500); return; } const id = famA; if (!SB) { aviso("Sin conexión. Intenta otra vez."); return; }
      SB.rpc("fam_borra", { f: id, mi: miId() }).then((r) => { if (r && !r.error && r.data) { famQuita(id); aviso("La familia se borró."); } else { famOjo = 0; aviso("No se pudo borrar. Solo quien la creó puede hacerlo."); render(1); } }, () => { famOjo = 0; aviso("Sin conexión. Intenta otra vez."); render(1); }); },
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
      const f = forma(); ros = { set, i: 0, jt: { id: jtA, m }, f, g: grande0(0) };
      ros.p = [{ t: "cruz", b: "x" }]; decena(ros.p, m, f === "mx"); if (ult) cierre(ros.p, f === "mx", 1);
      if (S.mu) musica(true); famSuma(); ros.an = "sg"; go("ros"); if (ros) ros.an = ""; },
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
    luzok: () => { luzRe = 2; vibra(2); render(1); if (S.n) guarda("l", "Tu oración ya va en camino", "Guarda en tu cuenta de Google tus intenciones y a quién le mandaste luz."); },
    luzdev: () => { luzPara = LUZ ? LUZ.d : ""; luzQ = "am"; go(S.n ? "luz" : "bien"); },
    mu: () => { S.mu = S.mu ? 0 : 1; S.tp = Object.assign({}, S.tp, { mu: 1 }); save(); musica(!!S.mu); vibra(1); render(1); if (S.mu) aviso("Música de fondo encendida. Sube el volumen si no la oyes."); },
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
  document.addEventListener("input", (e) => { if (e.target && e.target.id === "fn" && ob) { const vl = app.querySelector(".vel"); if (vl) vl.classList.toggle("lit", !!e.target.value.trim()); return; } if (!e.target || e.target.id !== "fb") return; const q = sinAc(e.target.value.trim()); let n = 0; app.querySelectorAll("#esl .es").forEach((b) => { const ok = !q || b.dataset.n.includes(q); b.hidden = !ok; if (ok) n++; }); const x = document.getElementById("esn"); if (x) x.hidden = n > 0; });
  document.addEventListener("change", (e) => { if (e.target && e.target.id === "fa") { S.ang = e.target.checked ? 1 : 0; save(); if (S.ang) bell(1); } if (e.target && e.target.id === "fmu") { S.mu = e.target.checked ? 1 : 0; save(); } if (e.target && e.target.id === "fv") { S.vib = e.target.checked ? 1 : 0; save(); vibra(2); } });
  // en iPhone los botones solo muestran su estado presionado si alguien escucha el toque
  document.addEventListener("touchstart", () => {}, { passive: true });
  document.addEventListener("keydown", (e) => { if (e.key !== "Enter" || !e.target) return; const k = e.target.id; if (k === "fn") { const b = app.querySelector('[data-a="fnom"],[data-a="jnom"]'); if (b) b.click(); else A.nom(); } else if (k === "ff" || k === "ffi") { e.preventDefault(); const b = app.querySelector('[data-a="fcrea"],[data-a="fguarda"]'); if (k === "ff" && document.getElementById("ffi") && view === "fnew") document.getElementById("ffi").focus(); else if (b) { e.target.blur(); b.click(); } } });
  let scY = 0;
  window.addEventListener("scroll", () => { const y = window.scrollY || 0; app.classList.toggle("scr", y > 24); if (view === "hoy" && y > 140 && !scY) { scY = 1; S.sc = (S.sc || 0) + 1; save(); } }, { passive: true });
  // con la guía o una imagen abierta, la página de atrás no se mueve
  document.addEventListener("touchmove", (e) => { if (document.getElementById("tour") || document.getElementById("lupa")) e.preventDefault(); }, { passive: false });
  window.addEventListener("scroll", () => { if (view === "ros") mas(); }, { passive: true });
  window.addEventListener("hashchange", () => { const h = location.hash.slice(1); if (/^(hoy|rezar|mapa|yo)$/.test(h) && h !== view && view !== "ros") go(h); });
  if (Q.get("demo") && Q.get("ob")) ob = 1;
  if (Q.get("paloma")) S.pd = "";
  const errG = /[?&#]error(_code|_description)?=/.test(location.search + location.hash);
  let h0 = Q.get("v") || (errG ? "" : location.hash.slice(1));
  if (S.ob && S.n && !Q.get("demo")) { ob = 1; h0 = S.e < 0 ? "est" : S.vs.length ? "pid" : "advs"; }
  const jQ = Q.get("j");
  if (jQ && UUID.test(jQ)) { if (!S.jt.some((x) => x.id === jQ)) { S.jt.unshift({ id: jQ }); save(); } jtA = jQ; h0 = "jt"; try { history.replaceState(null, "", location.pathname); } catch (_) {} }
  const fQ = (Q.get("f") || "").toLowerCase();
  if (FID.test(fQ)) { if (!famJ(fQ)) { S.fam.unshift({ id: fQ }); S.fam = S.fam.slice(0, 5); save(); } famA = fQ; h0 = "fam"; try { history.replaceState(null, "", location.pathname); } catch (_) {} }
  if (LUZ) { h0 = "luzv"; try { history.replaceState(null, "", location.pathname); } catch (_) {} }
  if (h0 === "ros" && S.n) A.ros({}); else if (h0 === "novd" && S.n) { nd = +(Q.get("n") || 6); go("novd"); } else go(V[h0] ? h0 : "hoy");
  if (errG) { try { history.replaceState(null, "", location.pathname); } catch (_) {} setTimeout(() => aviso("No se pudo entrar con Google. Intenta de nuevo."), 400); }
  if (Q.get("demo") && Q.get("gente") && ros) { const N = ["Lucía", "Pedro", "Ana", "Rosa", "Juan", "Carmen", "Toño", "Sofía", "Diego", "Elena", "Pablo", "Marta", "Mateo", "Valeria", "Emilio", "Regina"]; ros.sala = 1; ros.g = Q.get("g") !== null ? +Q.get("g") : grande0(1); lead = !Q.get("sigo"); if (Q.get("fo")) ros.fo = Q.get("fo"); peersS = N.slice(0, +Q.get("gente")).map((n, i) => ({ peer: "p" + i, isMe: !i, presence: { n, v: i % 4 === 3 ? 2 : 1, lead: !i ? 1 : 0 } })); render(); const h = app.querySelector('[data-p="p2"]'); if (h) h.classList.add("habla"); }
  if (Q.get("demo") && Q.get("jtd")) { const id = "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", n = +Q.get("jtd"), Q2 = ["Constanza", S.n, "Constanza", S.n, "Constanza"], hh = ["T13:40:00", "T15:05:00", "T19:20:00", "T21:10:00", "T22:30:00"];
    S.jt = [{ id, con: "Constanza" }]; JT[id] = { creador: S.n, intencion: "Por nuestra familia", cuentas: [0, 1, 2, 3, 4].slice(0, n).map((m) => ({ m, quien: Q2[m], hecho: key(now()) + hh[m] })), completos: n === 5 ? [key(now()), key(add(now(), -1)), key(add(now(), -2))] : [key(add(now(), -1)), key(add(now(), -2))], gente: ["Constanza"] }; jtA = id; if (Q.get("v") === "jt") go("jt"); else render(1); }
  if (Q.get("demo") && Q.get("famd") !== null) { const id = "k7m2q9xpta", n = +Q.get("famd"), hace = (m) => new Date(Date.now() - m * 60000).toISOString(), yo = S.n;
    S.fam = [{ id, n: "Familia Macouzet", i: n === 9 ? "" : "Por Rodrigo, que le vaya bien en su operación" }]; if (Q.get("dos")) S.fam.push({ id: "aaaaaaaaaa", n: "Grupo de la parroquia" }); S.mi = "11111111-1111-4111-8111-111111111111"; famA = id;
    const M = [["Mamá", 5, 25, 265, 5, 2], [yo, 4, 20, 212, 5, 1], ["Paulina", 2, 12, 127, 0, 0], ["Papá", 1, 6, 63, 1, 0], ["Abuela Tere", 0, 0, 0, 0, 0]];
    FM[id] = n <= 0 || n === 9 ? { id, nombre: "Familia Macouzet", intencion: S.fam[0].i, creador: yo, mia: true, dias: 1, rosarios: 0, misterios: 0, aves: 0, rezados: 0, hoy: { rosarios: 0, misterios: 0, aves: 0 }, gente: 1, miembros: [{ n: yo, yo: true, ros: 0, mis: 0, aves: 0, hoy: 0, est: 1 }], reciente: [] }
      : { id, nombre: "Familia Macouzet", intencion: S.fam[0].i, creador: n === 3 ? "Alejandro" : yo, mia: n !== 3, dias: 3, rosarios: 12, misterios: 63, aves: 667, rezados: 3, hoy: { rosarios: 2, misterios: 11, aves: 116 }, gente: 5,
          miembros: M.map((m) => ({ n: m[0], yo: m[0] === yo, ros: m[1], mis: m[2], aves: m[3], hoy: m[4], est: Q.get("viv") ? m[5] : 0 })), reciente: [{ n: "Mamá", mis: 5, c: true, h: hace(18) }, { n: yo, mis: 5, c: true, h: hace(95) }, { n: "Papá", mis: 1, c: false, h: hace(60 * 26) }, { n: "Paulina", mis: 5, c: true, h: hace(60 * 30) }] };
    if (n === 3) S.n = "";
    if (Q.get("sal")) { const k = +Q.get("sal"), N = ["Mamá", "Paulina", "Papá", "Tía Lupe", "Diego"]; sala = { yo: "p0", presence: () => Promise.resolve(), manda() {}, senal() {}, leave() {}, onPeers() {} }; famS = id;
      peersS = [{ peer: "p0", isMe: true, presence: { n: yo, v: 0 } }].concat(N.slice(0, k).map((x, i) => ({ peer: "p" + (i + 1), isMe: false, presence: { n: x, v: i === 0 ? 1 : 0, lead: Q.get("cur") && i === 0 ? 1 : 0, on: Q.get("cur") && i === 0 ? 1 : 0, i: 38, f: "mx", set: "gozosos" } }))); if (Q.get("cur")) noSigo = 1; }
    if (Q.get("ban")) famB = Date.now();
    if (Q.get("v") === "fam" || Q.get("v") === "fed") { view = Q.get("v"); render(1); } else if (Q.get("v") === "fnew") { S.fam = []; go("fnew"); } else render(1); }
  if (Q.get("demo") && Q.get("t")) setTimeout(() => aviso(Q.get("t")), 30);
  if (Q.get("demo") && Q.get("lista")) { lista = 1; render(1); }
  if (Q.get("demo") && Q.get("tour")) setTimeout(() => tour(+Q.get("tour") - 1), 300);
  if (Q.get("demo") && Q.get("gsh")) setTimeout(() => { S.gx = {}; S.gt = 0; guarda("a", "Rezaste el Ángelus", "Guarda tu racha con tu cuenta de Google y no la pierdas si cambias de teléfono."); }, 300);
  if (Q.get("demo") && Q.get("u")) { U = { id: "x", email: "demo@atrio", user_metadata: {} }; S.g = 1; render(1); }
  if (Q.get("demo") && Q.get("pt")) { palT = Date.now() - +Q.get("pt"); render(1); }
})();
