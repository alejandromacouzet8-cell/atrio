// Prueba funcional: recorre onboarding, rosario completo, novena y Ángelus sin navegador.
const { JSDOM } = require("jsdom");
const fs = require("fs");
const html = fs.readFileSync("index.html", "utf8");
const errs = [];
function open(url, guardado) {
  const dom = new JSDOM(html, { runScripts: "dangerously", url, pretendToBeVisual: true, beforeParse(w) { if (guardado) w.localStorage.setItem("atrio1", guardado); } });
  dom.window.addEventListener("error", (e) => errs.push(e.message));
  dom.window.scrollTo = () => {};
  return dom;
}
const click = (dom, sel) => { const el = dom.window.document.querySelector(sel); if (!el) throw new Error("no encuentro " + sel + " en vista: " + dom.window.document.querySelector("h1,h2")?.textContent); el.dispatchEvent(new dom.window.MouseEvent("click", { bubbles: true })); };
const txt = (dom) => dom.window.document.querySelector("#app").textContent;

// 1. onboarding
let d = open("https://atrio.test/?fecha=2026-11-23");
if (!txt(d).includes("que soy tu madre")) throw new Error("no abre la bienvenida");
if (d.window.document.querySelector('[data-a="login"]')) throw new Error("ofrece Google sin servidor");
click(d, '[data-a="empieza"]');
click(d, '[data-a="nom"]'); // vacío: se queda
if (!txt(d).includes("Cómo te llamas") || !txt(d).includes("Paso 1 de 5")) throw new Error("avanzó sin nombre");
d.window.document.getElementById("fn").value = "Lucía <b>";
click(d, '[data-a="nom"]');
// el saludo llega después de escribir el nombre: la paloma, su nombre (escapado) y la invocación al Espíritu Santo
if (!txt(d).includes("Qué gusto tenerte aquí") || !txt(d).includes("Ven, Espíritu Santo") || !d.window.document.querySelector(".pal0")) throw new Error("saludo: " + txt(d).slice(0, 160));
if (d.window.document.querySelector(".gsn").innerHTML.includes("<b>") || d.window.document.querySelector(".gsn").textContent !== "Lucía") throw new Error("nombre en el saludo: " + d.window.document.querySelector(".gsn").innerHTML);
click(d, '.gsk [data-a="go"][data-v="est"]');
if (!txt(d).includes("Paso 2 de 5")) throw new Error("paso 2");
if (d.window.document.querySelector(".es.on")) throw new Error("estado preseleccionado");
{ const f = d.window.document.getElementById("fb"); f.value = "quintana"; f.dispatchEvent(new d.window.Event("input", { bubbles: true })); const vis = [...d.window.document.querySelectorAll("#esl .es")].filter((b) => !b.hidden).map((b) => b.textContent); if (vis.length !== 1 || !vis[0].includes("Quintana Roo")) throw new Error("buscador de estado: " + vis); }
click(d, '#esl [data-a="esc"][data-k="22"]');
// si cierra la app a media bienvenida, al volver retoma el paso que le faltaba
{ const g = open("https://atrio.test/?fecha=2026-11-23", d.window.localStorage.getItem("atrio1")); if (!txt(g).includes("Paso 3 de 5") || !txt(g).includes("A qué Virgen le rezas")) throw new Error("no retoma la bienvenida: " + txt(g).slice(0, 160)); }
if (!txt(d).includes("A qué Virgen le rezas") || !txt(d).includes("Paso 3 de 5") || d.window.document.querySelectorAll('[data-a="advt"]').length !== 12) throw new Error("paso 3: " + txt(d).slice(0, 160));
if (!d.window.document.querySelector('[data-a="advok"]').disabled) throw new Error("deja seguir sin elegir");
click(d, '[data-a="advt"][data-k="fatima"]'); click(d, '[data-a="advt"][data-k="lourdes"]'); click(d, '[data-a="advt"][data-k="lourdes"]');
if (!txt(d).includes("Listo, elegí 1")) throw new Error("conteo de selección: " + txt(d).slice(-80));
click(d, '[data-a="advok"]');
// paso 4: por quién vas a rezar (intención), se puede saltar
if (!txt(d).includes("¿Por quién vas a rezar?") || !txt(d).includes("Paso 4 de 5") || !txt(d).includes("Saltar este paso") || d.window.document.querySelectorAll('[data-a="pich"]').length !== 5) throw new Error("paso 4: " + txt(d).slice(0, 200));
d.window.document.getElementById("fi").value = "Por mi mamá <i>";
click(d, '[data-a="pich"][data-k="2"]'); if (d.window.document.getElementById("fi").value !== "Por mi mamá <i>, por un enfermo") throw new Error("chip de intención: " + d.window.document.getElementById("fi").value);
click(d, '[data-a="pich"][data-k="2"]'); if (d.window.document.getElementById("fi").value !== "Por mi mamá <i>, por un enfermo") throw new Error("chip repetido");
click(d, '.btn[data-a="piok"]');
// paso 5: resumen
{ const x = txt(d); for (const m of ["Tu atrio está listo", "Paso 5 de 5", "Lucía <b>", "Quintana Roo", "Fátima", "Tu intención", "«Por mi mamá <i>, por un enfermo»", "Entrar a mi atrio"]) if (!x.includes(m)) throw new Error("resumen sin «" + m + "»: " + x.slice(0, 300)); if (x.includes("Bautismo") || x.includes("Google") || d.window.document.querySelector(".tabs")) throw new Error("resumen con de más: " + x.slice(0, 300)); if (d.window.document.querySelector("h2").innerHTML.includes("<b>")) throw new Error("nombre sin escapar en el resumen"); }
click(d, '.hd [data-a="go"]'); if (!txt(d).includes("Paso 4 de 5")) throw new Error("regresar del resumen");
{ const g = open("https://atrio.test/?fecha=2026-11-23", d.window.localStorage.getItem("atrio1")); if (!txt(g).includes("Paso 4 de 5") || g.window.document.getElementById("fi").value !== "Por mi mamá <i>, por un enfermo") throw new Error("no retoma en la intención: " + txt(g).slice(0, 160)); }
click(d, '.btn[data-a="piok"]');
click(d, '[data-a="entra"]');
if (!d.window.document.querySelector(".frw .dov") || !d.window.document.querySelector(".fra.trae")) throw new Error("la paloma no trae el mensaje el primer día");
{ const g = open("https://atrio.test/?fecha=2026-11-23", d.window.localStorage.getItem("atrio1")); if (txt(g).includes("Paso ") || !g.window.document.querySelector(".tabs")) throw new Error("terminada la bienvenida, vuelve a pedirla: " + txt(g).slice(0, 160)); if (g.window.document.querySelector(".dov") || !txt(g).includes("Mensaje del día")) throw new Error("la paloma sale dos veces el mismo día");
  const m = open("https://atrio.test/?fecha=2026-11-24", d.window.localStorage.getItem("atrio1")); if (!m.window.document.querySelector(".frw .dov")) throw new Error("al día siguiente la paloma no vuelve"); }
let t = txt(d);
if (!t.includes("Mensaje del día") || !t.includes("Nuestra Señora de Fátima") || !t.includes("Ver su historia y su oración")) throw new Error("hoy sin la Virgen elegida: " + t.slice(0, 300));
if (!t.includes("Buenos días, Lucía <b>")) throw new Error("saludo: " + t.slice(0, 80));
if (!t.includes("Lunes 23 de noviembre")) throw new Error("fecha mal");
if (!t.includes("Tiempo ordinario")) throw new Error("tiempo litúrgico mal: " + t.slice(0, 200));
if (!t.toLowerCase().includes("misterios gozosos")) throw new Error("misterios del lunes mal");
if (!t.includes("faltan 10 días")) throw new Error("cuenta de la novena mal: " + t);
if (d.window.document.querySelector("#app b")) { /* ok: hay <b> propios */ }
if (d.window.document.querySelector("h1").innerHTML.includes("<b>")) throw new Error("nombre sin escapar");

// 1b. advocación: página, fiesta, oración y cambio
click(d, '.fra'); t = txt(d);
for (const m of ["Cova da Iria", "Su fiesta es el 13 de mayo. Faltan 171 días.", "Oh Jesús mío, perdona nuestros pecados", "Francisco y Jacinta fueron canonizados en 2017"]) if (!t.includes(m)) throw new Error("advocación sin «" + m + "»: " + t.slice(0, 300));
click(d, '[data-a="advsel"]'); if (d.window.document.querySelectorAll('[data-a="advt"]').length !== 12 || !d.window.document.querySelector('.ni.on[data-k="fatima"]') || txt(d).includes("Paso 3")) throw new Error("selector de advocación");
click(d, '[data-a="advt"][data-k="carmen"]'); click(d, '[data-a="advok"]');
if (!txt(d).includes("Fátima") || !d.window.document.querySelectorAll(".chip").length) throw new Error("sin chips con dos Vírgenes: " + txt(d).slice(0, 200));
click(d, '.chip[data-k="carmen"]'); if (!txt(d).includes("Flor del Carmelo") || !txt(d).includes("16 de julio")) throw new Error("chip no cambia a Carmen: " + txt(d).slice(0, 200));
click(d, '[data-a="go"][data-v="hoy"]');
// con dos Vírgenes, el mensaje del día se turna entre ellas
{ const quien = new Set(); for (let k = 13; k <= 16; k++) { const y = open("https://atrio.test/?demo=1&adv=fatima,carmen&fecha=2026-11-" + k); quien.add(y.window.document.querySelector(".fra b").textContent); } if (quien.size !== 2) throw new Error("no se turnan: " + [...quien]); }
{ const x = open("https://atrio.test/?demo=1&adv=guadalupe&fecha=2026-12-12&v=adv"), tx = txt(x); if (!tx.includes("Hoy es su fiesta.") || !tx.includes("«¿No estoy yo aquí, que soy tu madre?»")) throw new Error("día de fiesta: " + tx.slice(0, 300));
  const vistas = new Set(); for (let k = 13; k <= 28; k++) { const y = open("https://atrio.test/?demo=1&adv=guadalupe&fecha=2026-11-" + k), q = y.window.document.querySelector(".fra .ci"); if (!q) throw new Error("hoy sin frase el día " + k); vistas.add(q.textContent); }
  if (vistas.size !== 8) throw new Error("la frase del día no rota bien: " + vistas.size); }

click(d, '[data-a="go"][data-v="rezar"]'); if (!txt(d).includes("Tus Vírgenes")) throw new Error("Rezar sin Tus Vírgenes"); click(d, '.row[data-a="verv"][data-k="carmen"]'); if (!txt(d).includes("Flor del Carmelo") || !txt(d).includes("Elegir mis Vírgenes")) throw new Error("Rezar no abre a la Virgen"); click(d, '.hd [data-a="go"]'); if (!txt(d).includes("Los cuatro misterios")) throw new Error("no regresa a Rezar"); click(d, '[data-a="go"][data-v="hoy"]');

// 2. rosario completo
click(d, '[data-a="ros"]');
if (!txt(d).includes("Tu intención") || !txt(d).includes("«Por mi mamá <i>, por un enfermo»")) throw new Error("el rosario no muestra la intención: " + txt(d).slice(0, 200));
{ const q = (x) => d.window.document.querySelector(x); if (!q('.rpie .rb .btn[data-a="sig"]') || !q('.rpie .ra[data-a="ant"]').disabled) throw new Error("rosario: barra fija al empezar");
  click(d, '[data-a="ant"]'); if (!txt(d).includes("1 de 82")) throw new Error("regresar deshabilitado se movió");
  click(d, '[data-a="sig"]'); if (!q('.rpie .rb .btn[data-a="sig"]') || q('.rpie .ra').disabled || !q(".ro.sg")) throw new Error("rosario: barra fija en el paso 2");
  click(d, '[data-a="sig"]'); if (!q(".pu") || !txt(d).includes("3 de 82")) throw new Error("rosario: la medalla no se enciende"); click(d, '[data-a="ant"]');
  click(d, '[data-a="ant"]'); if (!txt(d).includes("1 de 82") || !q(".ro.at")) throw new Error("rosario: regresar una cuenta"); }
let n = 0, seen = new Set(), orden = [], hojas = [];
while (d.window.document.querySelector('[data-a="sig"]')) { const nom = d.window.document.querySelector(".rn")?.textContent || "misterio"; seen.add(nom); orden.push(nom); hojas.push(txt(d)); click(d, '[data-a="sig"]'); if (++n > 200) throw new Error("rosario sin fin"); }
if (n !== 82) throw new Error("pasos del rosario: " + n);
// Orden como se reza en México (Arquidiócesis de México y Basílica de Guadalupe)
{ const esp = ["Señal de la cruz", "Acto de contrición", "Invocación"]; for (let m = 0; m < 5; m++) esp.push("misterio", "Padre nuestro", ...Array(10).fill("Ave María"), "Gloria"); esp.push("Padre nuestro", "Ave María", "Ave María", "Ave María", "Salve", ...Array(9).fill("Letanías"));
  if (orden.join("|") !== esp.join("|")) throw new Error("orden del rosario mexicano: " + orden.join("|"));
  const tiene = (i, ...xs) => xs.forEach((x) => { if (!hojas[i].includes(x)) throw new Error("paso " + (i + 1) + " sin «" + x + "»: " + hojas[i].slice(0, 300)); });
  tiene(0, "Por la señal de la santa cruz"); tiene(1, "me pesa de todo corazón haber pecado", "Confío me perdonarás por tu infinita misericordia"); tiene(2, "Abre, Señor, mis labios", "Señor, date prisa en socorrerme");
  tiene(15, "Gloria al Padre", "María, Madre de gracia, Madre de misericordia", "En la vida y en la muerte ampáranos, gran Señora", "Oh Jesús mío, perdona nuestros pecados");
  tiene(68, "Por las intenciones del Papa", "Padre nuestro, que estás en el cielo");
  tiene(69, "Hija de Dios Padre", "antes del parto", "nuestra fe para que la ilumines", "Santa María, Madre de Dios"); tiene(70, "Madre de Dios Hijo", "en el parto", "nuestra esperanza para que la alientes"); tiene(71, "Esposa de Dios Espíritu Santo", "después del parto", "nuestra caridad para que la inflames");
  tiene(72, "templo, trono y sagrario de la Santísima Trinidad", "Dios te salve, Reina y Madre de misericordia", "oh dulce siempre Virgen María", "Para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo");
  tiene(73, "Señor, ten piedad", "Cristo, escúchanos"); tiene(74, "Dios, Padre celestial", "Ten piedad de nosotros", "Santa María", "Madre de la Iglesia", "Ruega por nosotros"); tiene(75, "Madre de la misericordia", "Madre de la esperanza", "Madre del buen consejo");
  tiene(76, "Madre del Creador", "Virgen fiel", "Trono de la sabiduría"); tiene(77, "Causa de nuestra alegría", "Puerta del cielo"); tiene(78, "Estrella de la mañana", "Consuelo de los migrantes", "Reina de los apóstoles"); tiene(79, "Reina de los mártires", "Reina asunta a los cielos", "Reina de la familia", "Reina de la paz");
  tiene(80, "Cordero de Dios, que quitas el pecado del mundo", "Ten misericordia de nosotros", "Para que seamos dignos de las promesas de Cristo"); tiene(81, "disfrutar de las alegrías eternas", "Amén");
  const inv = d.window.eval("LET.reduce((a, L) => a + (L.r === 'Ruega por nosotros.' ? L.inv.length : 0) + (L.inv2 ? L.inv2.length : 0), 0)"); if (inv !== 54) throw new Error("letanías: " + inv + " invocaciones a la Virgen, deben ser 54"); }
// La otra forma, con Credo al inicio: es la que sale sola fuera de México
{ const u = open("https://atrio.test/?fecha=2026-11-23", JSON.stringify({ n: "Ana", e: 99, d: {}, nov: {}, ang: 1, vs: ["guadalupe"], pi: "" }));
  click(u, '[data-a="ros"]'); const o2 = [], h2 = []; let k = 0;
  while (u.window.document.querySelector('[data-a="sig"]')) { o2.push(u.window.document.querySelector(".rn")?.textContent || "misterio"); h2.push(txt(u)); click(u, '[data-a="sig"]'); if (++k > 200) throw new Error("rosario sin fin (Credo)"); }
  if (k !== 74) throw new Error("pasos con Credo: " + k);
  if (o2.slice(0, 7).join("|") !== "Señal de la cruz|Credo|Padre nuestro|Ave María|Ave María|Ave María|Gloria" || o2.slice(-2).join("|") !== "Salve|Oración final") throw new Error("orden con Credo: " + o2.slice(0, 8).join("|") + " … " + o2.slice(-3).join("|"));
  if (!h2[1].includes("está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos.") || !h2[1].includes("Creo en el Espíritu Santo, la santa Iglesia católica")) throw new Error("Credo incompleto");
  if (!h2[19].includes("Oh Jesús mío") || h2[19].includes("María, Madre de gracia")) throw new Error("jaculatorias de la forma con Credo");
  if (!h2[72].includes("oh dulce Virgen María!") || h2[72].includes("Virgen María! Amén") || !h2[72].includes("Ruega por nosotros, santa Madre de Dios")) throw new Error("Salve con Credo: " + h2[72].slice(-300));
  if (!h2[73].includes("imitemos lo que contienen y consigamos lo que nos prometen")) throw new Error("oración final");
  if (!txt(u).includes("Tu veladora ya")) throw new Error("con Credo no llega al cierre");
  // se puede cambiar en Yo
  click(u, '[data-a="go"][data-v="hoy"]'); click(u, '[data-a="go"][data-v="yo"]'); if (!txt(u).includes("Cómo rezo el rosario") || !txt(u).includes("Con Credo al inicio")) throw new Error("Yo no muestra la forma");
  click(u, '[data-a="go"][data-v="fr"]'); if (!u.window.document.querySelector('.fo.on[data-k="un"]')) throw new Error("forma: no marca la actual"); click(u, '.fo[data-k="mx"]');
  if (!u.window.document.querySelector('.fo.on[data-k="mx"]') || JSON.parse(u.window.localStorage.getItem("atrio1")).fr !== "mx") throw new Error("forma: no se guarda");
  click(u, '.hd [data-a="go"]'); if (!txt(u).includes("Como en México")) throw new Error("Yo no refleja el cambio"); }
t = txt(d);
if (!t.includes("Tu veladora ya") || !t.includes("Quintana Roo")) throw new Error("no llega al cierre: " + t.slice(0, 120));
if (!t.includes("1día seguido") && !t.includes("día seguido")) throw new Error("racha mal");
console.log("rosario: 82 pasos, oraciones vistas:", [...seen].join(", "));
click(d, '[data-a="go"][data-v="hoy"]');
if (!txt(d).includes("Ya lo rezaste hoy")) throw new Error("hoy no marca el rosario");
// regresar una cuenta
click(d, '[data-a="go"][data-v="rezar"]'); click(d, '[data-a="ros"][data-set="dolorosos"]'); click(d, '[data-a="sig"]'); click(d, '[data-a="ant"]');
if (!txt(d).includes("Misterios dolorosos") || !txt(d).includes("1 de 82")) throw new Error("regresar cuenta mal");
click(d, '[data-a="cerrar"]');

// 3. mapa, yo, novena, ángelus, sala
click(d, '[data-a="go"][data-v="mapa"]'); if (!txt(d).includes("Tu veladora está encendida")) throw new Error("mapa");
if (d.window.document.querySelectorAll("svg path").length < 2) throw new Error("mapa sin trazo");
click(d, '[data-a="go"][data-v="yo"]'); if (!txt(d).includes("rosario rezado")) throw new Error("yo");
if (!txt(d).includes("Por quién rezo") || !txt(d).includes("Por mi mamá <i>, por un enfermo")) throw new Error("yo sin intención: " + txt(d).slice(-400));
{ const v = d.window.document.getElementById("fv"); if (!v || !v.checked) throw new Error("vibración debe venir encendida"); v.checked = false; v.dispatchEvent(new d.window.Event("change", { bubbles: true })); if (JSON.parse(d.window.localStorage.getItem("atrio1")).vib !== 0) throw new Error("no guarda vibración apagada"); v.checked = true; v.dispatchEvent(new d.window.Event("change", { bubbles: true })); if (JSON.parse(d.window.localStorage.getItem("atrio1")).vib !== 1) throw new Error("no guarda vibración encendida"); }
click(d, '[data-a="go"][data-v="pid"]'); if (txt(d).includes("Paso 4") || txt(d).includes("Saltar")) throw new Error("intención fuera de la bienvenida"); d.window.document.getElementById("fi").value = "  Por mi abuelo   Juan "; click(d, '[data-a="piok"]'); if (!txt(d).includes("Por mi abuelo Juan")) throw new Error("no guarda la intención");
click(d, '[data-a="go"][data-v="nom"]'); if (!txt(d).includes("Tus datos")) throw new Error("editar datos"); click(d, '[data-a="nom"]'); if (!d.window.document.querySelector('.es.on[data-k="22"]')) throw new Error("no marca el estado actual"); click(d, '#esl [data-a="esc"][data-k="22"]'); if (!txt(d).includes("Por quién rezo")) throw new Error("editar datos no regresa a Yo");
click(d, '[data-a="go"][data-v="hoy"]'); click(d, '[data-a="go"][data-v="nov"]');
if (d.window.document.querySelectorAll('[data-a="novd"]').length !== 9) throw new Error("novena sin 9 días");
click(d, '[data-a="novd"][data-n="6"]'); if (!txt(d).includes("que soy tu madre")) throw new Error("día 6");
click(d, '[data-a="novok"]');
click(d, '[data-a="go"][data-v="hoy"]'); click(d, '[data-a="go"][data-v="ang"]');
if (!txt(d).includes("El ángel del Señor anunció a María")) throw new Error("ángelus");
click(d, '[data-a="bell"]'); click(d, '[data-a="angok"]');
click(d, '[data-a="go"][data-v="rezar"]'); click(d, '[data-a="go"][data-v="vir"]'); if (d.window.document.querySelectorAll('[data-a="vird"]').length !== 6) throw new Error("devociones"); click(d, '[data-a="vird"][data-n="1"]'); if (!txt(d).includes("Acordaos, oh piadosísima")) throw new Error("acordaos"); click(d, '[data-a="go"][data-v="vir"]'); click(d, '[data-a="go"][data-v="rezar"]'); click(d, '[data-a="go"][data-v="hoy"]');
click(d, '[data-a="go"][data-v="sala"]'); if (!txt(d).includes("todavía no está disponible")) throw new Error("sala sin plataforma");
click(d, '[data-a="copiar"]');

// 4. fechas: novena y adviento
for (const [f, must] of [["2026-12-03", ["Día 1 de 9", "Primera semana de Adviento", "luminosos"]], ["2026-12-11", ["Día 9 de 9", "Segunda semana de Adviento"]], ["2026-12-12", ["Hoy es su fiesta", "Nuestra Señora de Guadalupe"]], ["2026-12-25", ["Tiempo de Navidad. Navidad"]], ["2027-02-10", ["Cuaresma"]], ["2027-03-28", ["Tiempo de Pascua"]], ["2026-11-29", ["Primera semana de Adviento", "gloriosos"]]]) {
  const x = open("https://atrio.test/?demo=1&fecha=" + f), tx = txt(x);
  for (const m of must) if (!tx.includes(m)) throw new Error(f + " sin «" + m + "»: " + tx.slice(0, 160));
}
// 5. sala con plataforma simulada (dos pestañas)
function fakeRoom() {
  const rooms = {};
  const mk = (name, me) => { const R = rooms[name] = rooms[name] || { peers: {}, subs: [] }; const fire = () => R.subs.forEach((s) => s.fn({ peers: Object.keys(R.peers).map((k) => ({ peer: k, isMe: k === s.me, kind: "viewer", presence: R.peers[k] })) }));
    return { presence: (p) => { R.peers[me] = Object.assign({}, R.peers[me], p); fire(); return Promise.resolve(); }, onPeers: (fn) => { R.subs.push({ fn, me }); fire(); return () => {}; }, leave: () => { delete R.peers[me]; fire(); return Promise.resolve(); }, join: (n) => Promise.resolve(mk(n, me)) }; };
  return mk;
}
(async () => {
  const mk = fakeRoom();
  const a = new JSDOM(html, { runScripts: "outside-only", url: "https://atrio.test/?demo=1&fecha=2026-11-26", pretendToBeVisual: true });
  const b = new JSDOM(html, { runScripts: "outside-only", url: "https://atrio.test/?demo=1&fecha=2026-11-26", pretendToBeVisual: true });
  for (const [w, id] of [[a, "pa"], [b, "pb"]]) { w.window.scrollTo = () => {}; w.window.claude = { use: () => Promise.resolve(mk("lobby", id)) }; w.window.addEventListener("error", (e) => errs.push(e.message)); const sc = html.match(/<script>([\s\S]*)<\/script>/)[1]; w.window.eval(sc); }
  await new Promise((r) => setTimeout(r, 30));
  click(a, '[data-a="go"][data-v="sala"]'); click(a, '[data-a="crear"]'); await new Promise((r) => setTimeout(r, 30));
  const code = a.window.document.querySelector(".code").textContent;
  click(b, '[data-a="go"][data-v="sala"]'); b.window.document.getElementById("fc").value = code.toLowerCase(); click(b, '[data-a="unir"]'); await new Promise((r) => setTimeout(r, 30));
  if (!txt(a).includes("2 conectados") || !txt(b).includes("Esperando a que Lucía empiece")) throw new Error("sala: " + txt(a).slice(0, 200) + " || " + txt(b).slice(0, 200));
  click(a, '[data-a="rosala"]'); await new Promise((r) => setTimeout(r, 30));
  for (let i = 0; i < 12; i++) click(a, '[data-a="sig"]');
  await new Promise((r) => setTimeout(r, 30));
  if (!txt(b).includes("13 de 82") || !txt(b).includes("dirige. Tú respondes") || b.window.document.querySelector('[data-a="sig"]')) throw new Error("seguidor no sincroniza: " + txt(b).slice(0, 200));
  while (a.window.document.querySelector('[data-a="sig"]')) click(a, '[data-a="sig"]');
  await new Promise((r) => setTimeout(r, 30));
  if (!txt(b).includes("Tu veladora ya")) throw new Error("seguidor no termina: " + txt(b).slice(0, 200));
  console.log("sala: código", code, "| dos pestañas sincronizadas hasta el final");
  if (errs.length) throw new Error("errores de página: " + errs.join(" | "));
  console.log("TODO OK"); process.exit(0);
})().catch((e) => { console.error("FALLA:", e.message); process.exit(1); });
