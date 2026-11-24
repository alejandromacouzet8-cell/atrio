// Pruebas de: rezar por alguien (luz), confesión privada y música de fondo
const { JSDOM } = require("jsdom");
const fs = require("fs");
const html = fs.readFileSync(process.argv[2] || "index.html", "utf8");
const base = JSON.stringify({ n: "Alejandro", e: 22, d: { "2026-11-23": { r: 1 } }, nov: {}, ang: 1, vs: ["guadalupe"], pi: "", pd: "2026-11-24" });
const open = (url, ls) => { const d = new JSDOM(html, { runScripts: "dangerously", url, pretendToBeVisual: true, beforeParse(w) { w.scrollTo = () => {}; w.__abre = []; w.open = (u) => { w.__abre.push(u); }; if (ls) w.localStorage.setItem("atrio1", ls); } }); return d; };
const txt = (d) => d.window.document.querySelector("#app").textContent;
const click = (d, s) => { const b = d.window.document.querySelector(s); if (!b) throw new Error("no encuentro " + s + " | " + txt(d).slice(0, 200)); b.click(); };
const ok = (c, m) => { if (!c) { console.log("FALLA:", m); process.exit(1); } };

// 1) mandar una luz
let a = open("https://atrio.test/?fecha=2026-11-24", base);
click(a, '[data-a="luzn"]'); ok(txt(a).includes("¿Por quién rezaste?"), "pantalla de luz");
click(a, '[data-a="luzm"]'); ok(a.window.__abre.length === 0, "manda sin nombre");
a.window.document.getElementById("fl").value = "Constanza <b>";
click(a, '[data-a="luzq"][data-k="ros"]'); ok(a.window.document.getElementById("fl").value === "Constanza <b>", "pierde el nombre al cambiar opción");
ok(txt(a).includes("Alejandro rezó un rosario por ti"), "vista previa");
click(a, '[data-a="luzm"]'); ok(a.window.__abre.length === 1 && a.window.__abre[0].startsWith("https://wa.me/?text="), "no abre WhatsApp");
const msg = decodeURIComponent(a.window.__abre[0].split("text=")[1]); ok(msg.startsWith("Constanza <b>, recé un rosario por ti."), "mensaje: " + msg);
const liga = msg.split("\n")[1]; ok(/^https:\/\/atrio\.test\/\?luz=[A-Za-z0-9_-]+$/.test(liga), "liga: " + liga);

// 2) recibirla sin tener Atrio
let b = open(liga.replace("?luz", "?fecha=2026-11-24&luz"));
ok(txt(b).includes("Alejandro rezó un rosario por ti") && txt(b).includes("Constanza <b>, alguien pensó en ti"), "pantalla de quien recibe: " + txt(b).slice(0, 200));
ok(!b.window.document.querySelector(".v h1").innerHTML.includes("<b>"), "nombre sin escapar");
ok(b.window.location.search === "", "no limpia la liga");
click(b, '[data-a="luzam"]'); ok(txt(b).includes("Dios te salve, María"), "Ave María");
click(b, '[data-a="luzok"]'); ok(txt(b).includes("¿Le avisas?"), "después del amén");
click(b, '[data-a="luzdev"]'); ok(txt(b).includes("Empezar"), "nuevo usuario va a la bienvenida");
// liga dañada no rompe nada
let c = open("https://atrio.test/?fecha=2026-11-24&luz=%%%nada", base); ok(txt(c).includes("Buen") && !txt(c).includes("rezó"), "liga dañada");
// quien ya usa Atrio y recibe: puede devolver la luz
let e = open(liga.replace("?luz", "?fecha=2026-11-24&luz"), base); click(e, '[data-a="luzam"]'); click(e, '[data-a="luzok"]'); click(e, '[data-a="luzdev"]');
ok(txt(e).includes("¿Por quién rezaste?") && e.window.document.getElementById("fl").value === "Alejandro", "devolver la luz");

// 3) confesión privada
let f = open("https://atrio.test/?fecha=2026-11-24", base);
click(f, '[data-a="go"][data-v="yo"]'); ok(txt(f).includes("Mi última confesión") && txt(f).includes("Solo tú la ves"), "fila en Yo");
click(f, '[data-a="go"][data-v="conf"]'); ok(txt(f).includes("Acto de contrición") && txt(f).includes("Señor mío Jesucristo") && txt(f).includes("Con los demás"), "pantalla de confesión");
const fd = f.window.document.getElementById("fcd"); fd.value = "2026-09-25"; fd.dispatchEvent(new f.window.Event("change", { bubbles: true }));
ok(txt(f).includes("Hace 60 días") || txt(f).includes("Hace 2 meses"), "días desde: " + txt(f).slice(0, 300));
fd.value = "2027-01-01"; f.window.document.getElementById("fcd").dispatchEvent(new f.window.Event("change", { bubbles: true }));
ok(JSON.parse(f.window.localStorage.getItem("atrio1")).cf === "2026-09-25", "acepta fecha futura");
click(f, '[data-a="cfhoy"]'); ok(txt(f).includes("Hoy") && JSON.parse(f.window.localStorage.getItem("atrio1")).cf === "2026-11-24", "me confesé hoy");
const src = fs.readFileSync("src/app.js", "utf8"); ok(src.includes("datos: Object.assign({}, S, { cf: undefined })"), "la confesión no debe subir a la cuenta");

// 4) música: el botón cambia y se recuerda (sin sonido en pruebas)
let g = open("https://atrio.test/?fecha=2026-11-24", base);
click(g, '[data-a="ros"]'); ok(g.window.document.querySelector('[data-a="mu"]'), "botón de música en el rosario");
click(g, '[data-a="mu"]'); ok(JSON.parse(g.window.localStorage.getItem("atrio1")).mu === 1 && g.window.document.querySelector(".ic.mu.on"), "prende la música");
click(g, '[data-a="mu"]'); ok(JSON.parse(g.window.localStorage.getItem("atrio1")).mu === 0, "apaga la música");
console.log("EXTRA OK: luz, confesión y música"); process.exit(0);
