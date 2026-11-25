/* Textos revisados contra fuentes oficiales (noviembre de 2026):
   - Credo, Salve, Ángelus, Regina Caeli, Bajo tu amparo, nombres y días de los misterios y oración tras el rosario:
     Compendio del Catecismo de la Iglesia Católica, apéndice «Oraciones comunes» (vatican.va).
   - Letanías lauretanas: vatican.va/special/rosary, ya con las invocaciones añadidas en 2020.
   - Orden «como en México», acto de contrición y Ave Marías finales: subsidios de la Arquidiócesis Primada de México
     (Comisión de Liturgia) y de la Basílica de Guadalupe.
   Rosarium Virginis Mariae 37 reconoce como igualmente legítimas las distintas formas de empezar y terminar el rosario.
   Cada oración lleva «v» (quien dirige) y «r» (respuesta); «bl» son renglones extra: v, r, t (todos) o n (nota). */
const AVE_V = "Llena eres de gracia, el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.";
const AVE_R = "Santa María, Madre de Dios, ruega por nosotros, pecadores, ahora y en la hora de nuestra muerte. Amén.";
const RUEGA = [["v", "Ruega por nosotros, santa Madre de Dios."], ["r", "Para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén."]];
const ORA = {
  cruz: { n: "Señal de la cruz", v: "Por la señal de la santa cruz, de nuestros enemigos líbranos, Señor, Dios nuestro.", r: "En el nombre del Padre, y del Hijo, y del Espíritu Santo. Amén." },
  contri: { n: "Acto de contrición", bl: [["t", "Señor mío Jesucristo, Dios y hombre verdadero, me pesa de todo corazón haber pecado, porque he merecido el infierno y perdido el cielo, y sobre todo, porque te ofendí a ti, que eres bondad infinita, a quien amo sobre todas las cosas. Propongo firmemente, con tu gracia, enmendarme y alejarme de las ocasiones de pecar, confesarme y cumplir la penitencia. Confío me perdonarás por tu infinita misericordia. Amén."], ["n", "Si en tu casa rezan otro acto de contrición, reza el tuyo."]] },
  abre: { n: "Invocación", bl: [["v", "Abre, Señor, mis labios."], ["r", "Y mi boca proclamará tu alabanza."], ["v", "Dios mío, ven en mi auxilio."], ["r", "Señor, date prisa en socorrerme."], ["v", "Gloria al Padre, y al Hijo, y al Espíritu Santo."], ["r", "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén."]] },
  credo: { n: "Credo", v: "Creo en Dios, Padre todopoderoso, Creador del cielo y de la tierra. Creo en Jesucristo, su único Hijo, nuestro Señor, que fue concebido por obra y gracia del Espíritu Santo, nació de santa María Virgen, padeció bajo el poder de Poncio Pilato, fue crucificado, muerto y sepultado, descendió a los infiernos, al tercer día resucitó de entre los muertos, subió a los cielos y está sentado a la derecha de Dios, Padre todopoderoso. Desde allí ha de venir a juzgar a vivos y muertos.", r: "Creo en el Espíritu Santo, la santa Iglesia católica, la comunión de los santos, el perdón de los pecados, la resurrección de la carne y la vida eterna. Amén." },
  pn: { n: "Padre nuestro", v: "Padre nuestro, que estás en el cielo, santificado sea tu Nombre; venga a nosotros tu reino; hágase tu voluntad en la tierra como en el cielo.", r: "Danos hoy nuestro pan de cada día; perdona nuestras ofensas, como también nosotros perdonamos a los que nos ofenden; no nos dejes caer en la tentación, y líbranos del mal. Amén." },
  am: { n: "Ave María", v: "Dios te salve, María, llena eres de gracia, el Señor es contigo; bendita tú eres entre todas las mujeres, y bendito es el fruto de tu vientre, Jesús.", r: AVE_R },
  // «mg» y «x» son las dos jaculatorias que siguen al Gloria en cada misterio
  gl: { n: "Gloria", v: "Gloria al Padre, y al Hijo, y al Espíritu Santo.", r: "Como era en el principio, ahora y siempre, por los siglos de los siglos. Amén.", mg: ["María, Madre de gracia, Madre de misericordia.", "En la vida y en la muerte ampáranos, gran Señora."], x: "Oh Jesús mío, perdona nuestros pecados, líbranos del fuego del infierno, lleva al cielo a todas las almas, especialmente a las más necesitadas de tu misericordia." },
  // las tres Ave Marías con que se cierra el rosario en México: por la fe, la esperanza y la caridad
  am1: { n: "Ave María", v: "Dios te salve, María santísima, Hija de Dios Padre, Virgen purísima y castísima antes del parto; en tus manos encomendamos nuestra fe para que la ilumines. " + AVE_V, r: AVE_R },
  am2: { n: "Ave María", v: "Dios te salve, María santísima, Madre de Dios Hijo, Virgen purísima y castísima en el parto; en tus manos encomendamos nuestra esperanza para que la alientes. " + AVE_V, r: AVE_R },
  am3: { n: "Ave María", v: "Dios te salve, María santísima, Esposa de Dios Espíritu Santo, Virgen purísima y castísima después del parto; en tus manos encomendamos nuestra caridad para que la inflames. " + AVE_V, r: AVE_R },
  salve: { n: "Salve", v: "Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas.", r: "Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce Virgen María!", bl: RUEGA },
  salvemx: { n: "Salve", bl: [["v", "Dios te salve, María santísima, templo, trono y sagrario de la Santísima Trinidad, Virgen concebida sin la culpa del pecado original."], ["r", "Dios te salve, Reina y Madre de misericordia, vida, dulzura y esperanza nuestra; Dios te salve. A ti llamamos los desterrados hijos de Eva; a ti suspiramos, gimiendo y llorando en este valle de lágrimas. Ea, pues, Señora, abogada nuestra, vuelve a nosotros esos tus ojos misericordiosos; y después de este destierro muéstranos a Jesús, fruto bendito de tu vientre. ¡Oh clementísima, oh piadosa, oh dulce siempre Virgen María!"]].concat(RUEGA) },
  fin: { n: "Oración final", bl: [["v", "Oremos. Oh Dios, cuyo Hijo por medio de su vida, muerte y resurrección, nos otorgó los premios de la vida eterna, te rogamos que venerando humildemente los misterios del Rosario de la Santísima Virgen María, imitemos lo que contienen y consigamos lo que nos prometen. Por Jesucristo, nuestro Señor."], ["r", "Amén."]] }
};
/* Letanías lauretanas, en nueve pantallas cortas para que quepan en un teléfono. «inv» son invocaciones que se responden con «r». */
const LET = [
  { bl: [["v", "Señor, ten piedad."], ["r", "Señor, ten piedad."], ["v", "Cristo, ten piedad."], ["r", "Cristo, ten piedad."], ["v", "Señor, ten piedad."], ["r", "Señor, ten piedad."], ["v", "Cristo, óyenos."], ["r", "Cristo, óyenos."], ["v", "Cristo, escúchanos."], ["r", "Cristo, escúchanos."]] },
  { r: "Ten piedad de nosotros.", inv: ["Dios, Padre celestial", "Dios, Hijo, Redentor del mundo", "Dios, Espíritu Santo", "Santísima Trinidad, un solo Dios"], r2: "Ruega por nosotros.", inv2: ["Santa María", "Santa Madre de Dios", "Santa Virgen de las vírgenes", "Madre de Cristo", "Madre de la Iglesia"] },
  { r: "Ruega por nosotros.", inv: ["Madre de la misericordia", "Madre de la divina gracia", "Madre de la esperanza", "Madre purísima", "Madre castísima", "Madre siempre virgen", "Madre inmaculada", "Madre amable", "Madre admirable", "Madre del buen consejo"] },
  { r: "Ruega por nosotros.", inv: ["Madre del Creador", "Madre del Salvador", "Virgen prudentísima", "Virgen digna de veneración", "Virgen digna de alabanza", "Virgen poderosa", "Virgen clemente", "Virgen fiel", "Espejo de justicia", "Trono de la sabiduría"] },
  { r: "Ruega por nosotros.", inv: ["Causa de nuestra alegría", "Vaso espiritual", "Vaso digno de honor", "Vaso de insigne devoción", "Rosa mística", "Torre de David", "Torre de marfil", "Casa de oro", "Arca de la Alianza", "Puerta del cielo"] },
  { r: "Ruega por nosotros.", inv: ["Estrella de la mañana", "Salud de los enfermos", "Refugio de los pecadores", "Consuelo de los migrantes", "Consoladora de los afligidos", "Auxilio de los cristianos", "Reina de los ángeles", "Reina de los patriarcas", "Reina de los profetas", "Reina de los apóstoles"] },
  { r: "Ruega por nosotros.", inv: ["Reina de los mártires", "Reina de los confesores", "Reina de las vírgenes", "Reina de todos los santos", "Reina concebida sin pecado original", "Reina asunta a los cielos", "Reina del santísimo Rosario", "Reina de la familia", "Reina de la paz"] },
  { bl: [["v", "Cordero de Dios, que quitas el pecado del mundo."], ["r", "Perdónanos, Señor."], ["v", "Cordero de Dios, que quitas el pecado del mundo."], ["r", "Escúchanos, Señor."], ["v", "Cordero de Dios, que quitas el pecado del mundo."], ["r", "Ten misericordia de nosotros."], ["v", "Ruega por nosotros, santa Madre de Dios."], ["r", "Para que seamos dignos de las promesas de Cristo."]] },
  { bl: [["v", "Oremos. Te rogamos nos concedas, Señor Dios nuestro, gozar de continua salud de alma y cuerpo, y por la gloriosa intercesión de la bienaventurada siempre Virgen María, vernos libres de las tristezas de la vida presente y disfrutar de las alegrías eternas. Por Cristo nuestro Señor."], ["r", "Amén."]] }
];

const MIS = {
  gozosos: { n: "Misterios gozosos", m: [
    ["La Anunciación", "Lucas 1, 26-38", "María responde: hágase en mí según tu palabra."],
    ["La Visitación", "Lucas 1, 39-56", "María sale de prisa a servir a su prima Isabel."],
    ["El Nacimiento de Jesús", "Lucas 2, 1-20", "Dios llega pequeño, en un pesebre."],
    ["La Presentación de Jesús en el templo", "Lucas 2, 22-38", "María y José presentan al Niño al Señor."],
    ["El Niño Jesús perdido y hallado en el templo", "Lucas 2, 41-52", "Lo buscan tres días y lo encuentran en la casa de su Padre."]] },
  luminosos: { n: "Misterios luminosos", m: [
    ["El Bautismo en el Jordán", "Mateo 3, 13-17", "El Padre lo llama su Hijo amado."],
    ["Las bodas de Caná", "Juan 2, 1-11", "María dice: hagan lo que él les diga."],
    ["El anuncio del Reino", "Marcos 1, 14-15", "Jesús anuncia: conviértanse y crean en el Evangelio."],
    ["La Transfiguración", "Lucas 9, 28-36", "Su rostro resplandece, y el Padre dice: escúchenlo."],
    ["La institución de la Eucaristía", "Lucas 22, 14-20", "Jesús nos da su Cuerpo y su Sangre."]] },
  dolorosos: { n: "Misterios dolorosos", m: [
    ["La oración en el huerto", "Lucas 22, 39-46", "Lleno de angustia, Jesús reza: hágase tu voluntad."],
    ["La flagelación", "Juan 19, 1", "Por sus llagas hemos sido curados."],
    ["La coronación de espinas", "Mateo 27, 27-31", "Se burlan del Rey, y él calla."],
    ["Jesús con la cruz a cuestas", "Juan 19, 16-17", "Jesús carga su cruz hasta el Calvario."],
    ["La crucifixión y muerte", "Lucas 23, 33-46", "Jesús perdona y entrega su espíritu."]] },
  gloriosos: { n: "Misterios gloriosos", m: [
    ["La Resurrección", "Mateo 28, 1-10", "El sepulcro está vacío. No tengan miedo."],
    ["La Ascensión", "Hechos 1, 6-11", "Jesús sube al cielo; un día volverá."],
    ["La venida del Espíritu Santo", "Hechos 2, 1-13", "El Espíritu Santo llena de valor a los apóstoles."],
    ["La Asunción de María", "Lucas 1, 48-49", "Dios lleva a María al cielo en cuerpo y alma."],
    ["La coronación de María", "Apocalipsis 12, 1", "María es Reina y sigue siendo madre."]] }
};
const MIS_DIA = ["gloriosos", "gozosos", "dolorosos", "gloriosos", "luminosos", "dolorosos", "gozosos"];
const ORD = ["Primer", "Segundo", "Tercer", "Cuarto", "Quinto"];

const NOV = [
  ["La voz en el cerro", "Un sábado de madrugada de diciembre de 1531, Juan Diego camina hacia la doctrina. Al pasar junto al cerro del Tepeyac oye un canto como de muchos pájaros. Luego, una voz lo llama por su nombre, con cariño: Juanito, Juan Dieguito.", "Pídele a la Virgen oír hoy cómo te llama Dios por tu nombre."],
  ["La casita sagrada", "La Señora le dice quién es: la siempre Virgen santa María, Madre del verdadero Dios. Le pide una casita sagrada en ese llano, para mostrar ahí su amor, su compasión y su ayuda a todos los que la busquen.", "Pídele hacer de tu casa un lugar donde ella quepa."],
  ["El obispo no le cree", "Juan Diego lleva el mensaje al obispo fray Juan de Zumárraga. Lo escuchan, pero no le creen. Regresa triste al cerro y le pide a la Virgen que mande a alguien importante. Ella le responde que tiene muchos mensajeros, y que lo quiere a él.", "Pídele confianza cuando sientes que no eres suficiente."],
  ["La señal que piden", "Juan Diego vuelve con el obispo. Esta vez le hacen muchas preguntas y le piden una señal para creer. La Virgen lo recibe otra vez con paciencia y le promete dársela al día siguiente.", "Pídele paciencia para lo que todavía no ves."],
  ["El tío enfermo", "Su tío Juan Bernardino cae gravemente enfermo. Juan Diego ya no vuelve al cerro. El martes 12 sale de madrugada a buscar un sacerdote y rodea el Tepeyac por otro camino, para que la Señora no lo detenga.", "Pon en sus manos a un enfermo que quieres."],
  ["¿No estoy yo aquí?", "Ella le sale al encuentro en el otro camino. Juan Diego se disculpa, apenado. La Virgen le dice que no se aflija por la enfermedad ni por ninguna otra cosa, y le pregunta: ¿No estoy yo aquí, que soy tu madre? Su tío ya está sano.", "Deja en su regazo lo que más te preocupa."],
  ["Las rosas en diciembre", "La Virgen le pide subir a la cumbre del cerro, donde solo hay piedras, espinas y hielo. Juan Diego encuentra rosas de Castilla, frescas y llenas de rocío. Las corta, y ella misma las acomoda en su tilma.", "Pídele ver las flores que Dios pone donde no las esperas."],
  ["La tilma se abre", "Juan Diego espera mucho tiempo antes de entrar con el obispo. Cuando abre su tilma, las rosas caen al suelo y sobre la tela aparece la imagen de la Virgen. El obispo cae de rodillas.", "Dale gracias por lo que ya te concedió."],
  ["Su nombre y su casa", "Juan Bernardino cuenta que la Señora lo curó y le dijo cómo quiere ser llamada: santa María de Guadalupe. El obispo levanta la primera ermita en el Tepeyac. Casi quinientos años después, sigue recibiendo a sus hijos.", "Preséntale a tu familia y a México."]
];

const ANG = [
  ["El ángel del Señor anunció a María.", "Y concibió por obra y gracia del Espíritu Santo."],
  ["He aquí la esclava del Señor.", "Hágase en mí según tu palabra."],
  ["Y el Verbo de Dios se hizo carne.", "Y habitó entre nosotros."],
  ["Ruega por nosotros, santa Madre de Dios.", "Para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo."]
];
const ANG_ORA = "Infunde, Señor, tu gracia en nuestras almas, para que los que hemos conocido, por el anuncio del ángel, la encarnación de tu Hijo Jesucristo, lleguemos por los méritos de su pasión y su cruz a la gloria de la resurrección. Por Jesucristo, nuestro Señor. Amén.";
const DIAS = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const VIR = [
  ["Bajo tu amparo", "La más antigua, del siglo III", "Bajo tu amparo nos acogemos, santa Madre de Dios; no deseches las súplicas que te dirigimos en nuestras necesidades; antes bien, líbranos siempre de todo peligro, oh Virgen gloriosa y bendita. Amén."],
  ["Acordaos", "Para pedirle con toda confianza", "Acordaos, oh piadosísima Virgen María, que jamás se ha oído decir que ninguno de los que han acudido a vuestra protección, implorando vuestra asistencia y reclamando vuestro socorro, haya sido desamparado. Animado por esta confianza, a Vos también acudo, oh Madre, Virgen de las vírgenes; y gimiendo bajo el peso de mis pecados me atrevo a comparecer ante vuestra presencia soberana. Oh Madre de Dios, no desechéis mis súplicas; antes bien, escuchadlas y acogedlas benignamente. Amén."],
  ["Bendita sea tu pureza", "Para ofrecerle el día", "Bendita sea tu pureza y eternamente lo sea, pues todo un Dios se recrea en tan graciosa belleza. A ti, celestial princesa, Virgen sagrada María, te ofrezco en este día alma, vida y corazón. Mírame con compasión, no me dejes, Madre mía. Amén."],
  ["Oh Señora mía", "Consagración de cada mañana", "Oh Señora mía, oh Madre mía, yo me ofrezco enteramente a ti; y en prueba de mi filial afecto te consagro en este día mis ojos, mis oídos, mi lengua, mi corazón; en una palabra, todo mi ser. Ya que soy todo tuyo, oh Madre de bondad, guárdame y defiéndeme como cosa y posesión tuya. Amén."],
  ["Salve", "Para cerrar el día", ORA.salve.v + " " + ORA.salve.r + " Ruega por nosotros, santa Madre de Dios, para que seamos dignos de alcanzar las promesas de nuestro Señor Jesucristo. Amén."],
  ["Regina Caeli", "En Pascua, en lugar del Ángelus", "Reina del cielo, alégrate, aleluya. Porque el Señor, a quien has merecido llevar, aleluya, ha resucitado según su palabra, aleluya. Ruega al Señor por nosotros, aleluya. Gózate y alégrate, Virgen María, aleluya. Porque verdaderamente ha resucitado el Señor, aleluya. Oremos. Oh Dios, que por la resurrección de tu Hijo, nuestro Señor Jesucristo, has llenado el mundo de alegría, concédenos, por intercesión de su Madre, la Virgen María, llegar a alcanzar los gozos eternos. Por nuestro Señor Jesucristo. Amén."]
];

/* ---------- advocaciones de la Virgen ----------
   Cada frase lleva su tipo: "c" es una cita (se muestra entre comillas) y "i" una invitación escrita para Atrio. */
const MARIA = [
  ["c", "He aquí la esclava del Señor; hágase en mí según tu palabra.", "María, en la Anunciación (Lucas 1, 38)"],
  ["c", "Mi alma engrandece al Señor, y mi espíritu se alegra en Dios, mi Salvador.", "María, en el Magníficat (Lucas 1, 46-47)"],
  ["c", "Hagan lo que él les diga.", "María, en las bodas de Caná (Juan 2, 5)"],
  ["c", "El Todopoderoso ha hecho en mí cosas grandes; su nombre es santo.", "María, en el Magníficat (Lucas 1, 49)"]
];
const ADV = [
  { k: "guadalupe", p: "Nuestra Señora de", c: "Guadalupe", f: [12, 12], l: "Tepeyac, 1531",
    h: ["Del 9 al 12 de diciembre de 1531, diez años después de la caída de Tenochtitlan, la Virgen se apareció en el cerro del Tepeyac a san Juan Diego, un indígena de Cuautitlán. Le habló en náhuatl y le pidió una casa donde escuchar y consolar a su pueblo.",
      "El obispo, fray Juan de Zumárraga, pidió una señal. Juan Diego cortó rosas en pleno invierno, las llevó en su tilma y, al abrirla, apareció en ella la imagen que hoy se venera en la Basílica.",
      "Es patrona de México y de toda América. San Juan Diego fue canonizado en 2002."],
    o: ["Oración", "Santa María de Guadalupe, Madre del verdadero Dios por quien se vive: tú que pediste una casa para escuchar nuestro llanto, mira hoy a mi familia y a mi tierra. Ponnos bajo tu sombra y llévanos a tu Hijo. Amén."],
    fr: [["c", "¿No estoy yo aquí, que soy tu madre?", "A san Juan Diego, en el Nican Mopohua"],
      ["c", "¿No estás bajo mi sombra? ¿No soy yo tu salud?", "A san Juan Diego, en el Nican Mopohua"],
      ["c", "No se turbe tu corazón.", "A san Juan Diego, en el Nican Mopohua"],
      ["c", "Oye y ten entendido, hijo mío el más pequeño, que es nada lo que te asusta y aflige.", "A san Juan Diego, en el Nican Mopohua"]] },
  { k: "fatima", p: "Nuestra Señora de", c: "Fátima", f: [13, 5], l: "Cova da Iria, Portugal, 1917",
    h: ["Entre el 13 de mayo y el 13 de octubre de 1917, en plena Primera Guerra Mundial, la Virgen se apareció seis veces en Cova da Iria a tres niños pastores: Lucía, Francisco y Jacinta.",
      "Les pidió rezar el rosario todos los días por la paz, ofrecer sacrificios por los pecadores y confiar en su Inmaculado Corazón. En la última aparición, decenas de miles de personas presenciaron el llamado milagro del sol.",
      "El obispo de Leiria declaró dignas de fe las apariciones en 1930. Francisco y Jacinta fueron canonizados en 2017."],
    o: ["La oración que pidió rezar después de cada misterio", ORA.gl.x],
    fr: [["c", "Mi Inmaculado Corazón será tu refugio y el camino que te conducirá a Dios.", "A Lucía, 13 de junio de 1917"],
      ["i", "En sus seis apariciones pidió lo mismo: el rosario de cada día, por la paz.", "Fátima, 1917"],
      ["i", "Los tres pastorcitos ofrecían cada día algo pequeño por los demás. ¿Qué puedes ofrecer tú hoy?", "Fátima, 1917"]] },
  { k: "lourdes", p: "Nuestra Señora de", c: "Lourdes", f: [11, 2], l: "Lourdes, Francia, 1858",
    h: ["El 11 de febrero de 1858, Bernardita Soubirous, una niña pobre de 14 años, vio a una Señora vestida de blanco en la gruta de Massabielle. Fueron dieciocho apariciones, hasta el 16 de julio.",
      "La Señora pidió oración y penitencia por los pecadores, y le señaló un manantial que no ha dejado de brotar. El 25 de marzo dijo su nombre: «Yo soy la Inmaculada Concepción», cuatro años después de que la Iglesia proclamara ese dogma.",
      "El obispo de Tarbes reconoció las apariciones en 1862. Su fiesta es también la Jornada Mundial del Enfermo."],
    o: ["Oración", "Virgen de Lourdes, salud de los enfermos: tú que elegiste a una niña pobre y enfermiza, acompaña hoy a quienes sufren en el cuerpo o en el alma, y a quienes los cuidan. Enséñanos a rezar con la sencillez de Bernardita. Amén."],
    fr: [["c", "Yo soy la Inmaculada Concepción.", "A santa Bernardita, 25 de marzo de 1858"],
      ["c", "No te prometo hacerte feliz en este mundo, sino en el otro.", "A santa Bernardita, 18 de febrero de 1858"],
      ["c", "Ruega a Dios por los pecadores.", "A santa Bernardita, 24 de febrero de 1858"],
      ["c", "Ve a beber a la fuente y a lavarte en ella.", "A santa Bernardita, 25 de febrero de 1858"]] },
  { k: "carmen", p: "Nuestra Señora del", c: "Carmen", f: [16, 7], l: "Monte Carmelo, Tierra Santa",
    h: ["Su nombre viene del monte Carmelo, en Tierra Santa. Ahí, a fines del siglo XII, un grupo de ermitaños levantó una capilla a María y dio origen a la Orden del Carmen.",
      "Según la tradición, el 16 de julio de 1251 la Virgen entregó el escapulario a san Simón Stock como signo de su protección. Quien lo lleva se compromete a vivir como hijo suyo.",
      "La llaman Estrella del mar: es patrona de pescadores y marineros, que cada 16 de julio la sacan en procesión sobre el agua."],
    o: ["Flos Carmeli, antiguo himno carmelita", "Flor del Carmelo, viña florida, esplendor del cielo, Virgen y Madre singular. Madre apacible, que no conoció varón: sé propicia a tus carmelitas, Estrella del mar."],
    fr: [["c", "Flor del Carmelo, viña florida, esplendor del cielo.", "Flos Carmeli, antiguo himno carmelita"],
      ["i", "Quien lleva su escapulario se compromete a vivir como hijo suyo. Hoy, un gesto que lo demuestre.", "Tradición del Carmen"],
      ["i", "Los pescadores la llaman Estrella del mar. Pídele rumbo para lo que hoy no ves claro.", "Tradición del Carmen"]] },
  { k: "pilar", p: "Nuestra Señora del", c: "Pilar", f: [12, 10], l: "Zaragoza, España",
    h: ["Una tradición muy antigua cuenta que, hacia el año 40, María, que todavía vivía en Jerusalén, se apareció al apóstol Santiago a orillas del Ebro para animarlo cuando su misión parecía fracasar.",
      "Le dejó una columna, el pilar, como señal de una fe que no se cae. Sobre ella se levantó en Zaragoza el que se tiene por el primer templo dedicado a María.",
      "Su fiesta, el 12 de octubre, coincide con la llegada de Colón a América en 1492. Por eso es patrona de la Hispanidad."],
    o: ["Jaculatoria tradicional de Zaragoza", "Bendita y alabada sea la hora en que María Santísima vino en carne mortal a Zaragoza. Por siempre sea bendita y alabada."],
    fr: [["c", "Bendita y alabada sea la hora en que María Santísima vino en carne mortal a Zaragoza.", "Jaculatoria tradicional de Zaragoza"],
      ["i", "Vino a animar a un apóstol cansado. ¿A quién puedes animar tú hoy?", "Tradición del Pilar"],
      ["i", "Un pilar no se mueve. Mantente firme hoy en lo que prometiste.", "Tradición del Pilar"]] },
  { k: "sanjuan", p: "Nuestra Señora de", c: "San Juan de los Lagos", f: [2, 2], l: "Los Altos de Jalisco", fx: "El 2 de febrero es su gran peregrinación. Se le festeja también el 15 de agosto y el 8 de diciembre.",
    h: ["Es una imagen pequeña de la Inmaculada, hecha de pasta de caña de maíz en Michoacán. Los misioneros franciscanos la llevaron en el siglo XVI a un poblado de los Altos de Jalisco, donde pasó décadas casi olvidada.",
      "En 1623, una niña de una familia de cirqueros murió al caer sobre unas dagas durante una acrobacia. Una anciana indígena puso la imagen sobre su pecho y la niña volvió a la vida. Desde entonces no han dejado de llegar peregrinos.",
      "Su santuario es el segundo más visitado de México, después del Tepeyac. San Juan Pablo II la visitó en 1990."],
    o: ["Oración", "Virgen de San Juan, madre de los que caminan: recibe el cansancio de quienes hoy van hacia ti con una promesa. Devuélvenos la vida ahí donde la dábamos por perdida. Amén."],
    fr: [["i", "Una mujer sencilla puso su imagen sobre una niña y pidió con fe. Pide hoy así, sin rodeos.", "San Juan de los Lagos, 1623"],
      ["i", "Cada año, miles caminan días enteros para llegar a verla. Camina hoy un tramo por alguien que lo necesita.", "Peregrinos de San Juan"]] },
  { k: "zapopan", p: "Nuestra Señora de", c: "Zapopan", f: [12, 10], l: "Zapopan, Jalisco", fx: "El 12 de octubre es su Romería. Su fiesta litúrgica es el 18 de diciembre.",
    h: ["Es una imagen de 34 centímetros, hecha de pasta de caña de maíz en Michoacán. El franciscano fray Antonio de Segovia la llevó consigo en sus misiones y en 1541 la entregó al pueblo de Zapopan.",
      "La llaman la Pacificadora, porque con ella llegó la paz a la región, y la Generala, título que recibió en 1821. Guadalajara la invoca desde hace siglos contra tormentas y epidemias.",
      "Cada 12 de octubre regresa de la catedral de Guadalajara a su basílica entre millones de fieles y miles de danzantes. La Romería es Patrimonio Cultural Inmaterial de la Humanidad desde 2018."],
    o: ["Oración", "Virgen de Zapopan, que cada año sales a recorrer las calles de tu pueblo: entra también en mi casa. Trae paz donde hay pleito y cuídanos en toda tormenta. Amén."],
    fr: [["i", "Cada año visita su ciudad templo por templo. Visita hoy a alguien que esté solo.", "Romería de Zapopan"],
      ["i", "La llaman Pacificadora. ¿Con quién te toca hacer las paces?", "Tradición de Zapopan"]] },
  { k: "juquila", p: "Nuestra Señora de", c: "Juquila", f: [8, 12], l: "Santa Catarina Juquila, Oaxaca",
    h: ["Es una imagen de la Inmaculada de apenas treinta centímetros. Acompañó en sus misiones al dominico fray Jordán de Santa Catalina, que en el siglo XVI la regaló a su ayudante indígena, vecino de Amialtepec, en la sierra de Oaxaca.",
      "Según la tradición, en 1633 un incendio arrasó el pueblo y la capilla de palma donde se le rezaba, y la imagen salió intacta. Tiempo después fue llevada al santuario de Juquila, donde la llaman Consuelo de los afligidos.",
      "Cada 8 de diciembre llegan a verla peregrinos de todo México, muchos a pie o en bicicleta."],
    o: ["Oración", "Virgen de Juquila, consuelo de los afligidos: tú conoces lo que vengo cargando en el camino. Recíbelo y enséñame a confiar. Amén."],
    fr: [["i", "La llaman Consuelo de los afligidos. Cuéntale hoy, con tus palabras, lo que te aflige.", "Santuario de Juquila"],
      ["i", "Sus peregrinos hacen el camino a pie. Ofrece hoy un cansancio por alguien que quieres.", "Peregrinos de Juquila"]] },
  { k: "socorro", p: "Nuestra Señora del", c: "Perpetuo Socorro", f: [27, 6], l: "Roma",
    h: ["Es un icono oriental pintado sobre madera, venerado en Roma desde fines del siglo XV. Muestra al Niño Jesús que, asustado al ver a dos ángeles con los instrumentos de la Pasión, corre a los brazos de su Madre. En la prisa se le suelta una sandalia.",
      "En 1866 el papa Pío IX lo confió a los misioneros redentoristas con un encargo: darla a conocer en todo el mundo. Hoy es una de las imágenes de María más queridas."],
    o: ["Oración", "Madre del Perpetuo Socorro: como el Niño corrió a tus brazos, corro yo a ti con lo que hoy me asusta. Tómame de la mano y no me sueltes. Amén."],
    fr: [["c", "Madre del Perpetuo Socorro, ruega por nosotros.", "Jaculatoria tradicional"],
      ["i", "En el icono, el Niño corre a sus brazos con una sandalia suelta. Corre hoy tú también, con lo que te asusta.", "Icono del Perpetuo Socorro"]] },
  { k: "milagrosa", p: "Nuestra Señora de la", c: "Medalla Milagrosa", f: [27, 11], l: "París, 1830",
    h: ["En 1830, en la capilla de las Hijas de la Caridad de la rue du Bac, en París, la Virgen se apareció a una novicia, santa Catalina Labouré. El 27 de noviembre le mostró el diseño de una medalla y le pidió mandarla acuñar.",
      "Las primeras se repartieron en 1832, durante una epidemia de cólera. Fueron tantas las gracias que la gente empezó a llamarla «milagrosa».",
      "Lleva grabada una de las oraciones más breves y más repetidas del mundo."],
    o: ["La oración grabada en la medalla", "Oh María, sin pecado concebida, ruega por nosotros que recurrimos a ti."],
    fr: [["c", "Oh María, sin pecado concebida, ruega por nosotros que recurrimos a ti.", "Inscripción de la Medalla Milagrosa, 1830"],
      ["c", "Venid al pie de este altar.", "A santa Catalina Labouré, julio de 1830"],
      ["i", "Pidió que la medalla se llevara con confianza. Pide hoy con confianza una sola cosa.", "Rue du Bac, París, 1830"]] },
  { k: "auxiliadora", p: "María", c: "Auxiliadora", f: [24, 5], l: "Turín, Italia",
    h: ["«Auxilio de los cristianos» es uno de los títulos más antiguos de María. El papa Pío VII fijó su fiesta el 24 de mayo, en acción de gracias por haber vuelto a Roma ese día de 1814, después de cinco años prisionero de Napoleón.",
      "San Juan Bosco la tomó por madre y maestra de su obra con los jóvenes más pobres, y le levantó en Turín una basílica consagrada en 1868. Con los salesianos, su devoción llegó a toda América."],
    o: ["Jaculatoria que repetía san Juan Bosco", "María, auxilio de los cristianos, ruega por nosotros."],
    fr: [["c", "María, auxilio de los cristianos, ruega por nosotros.", "Jaculatoria que repetía san Juan Bosco"],
      ["c", "Confía en María Auxiliadora y verás lo que son los milagros.", "San Juan Bosco"]] },
  { k: "dolores", p: "Nuestra Señora de los", c: "Dolores", f: [15, 9], l: "Al pie de la cruz",
    h: ["No recuerda una aparición, sino un momento del Evangelio: María de pie junto a la cruz de su Hijo. La Iglesia la celebra el 15 de septiembre, un día después de la Exaltación de la Santa Cruz.",
      "La tradición cuenta siete dolores, desde la profecía de Simeón hasta la sepultura de Jesús. En México se le dedica además el viernes anterior al Domingo de Ramos, el Viernes de Dolores, con altares en las casas.",
      "Es la Virgen de quien acompaña a alguien que sufre. No huyó: se quedó."],
    o: ["Stabat Mater, en versión de Lope de Vega", "La Madre piadosa estaba junto a la cruz y lloraba mientras el Hijo pendía; cuya alma, triste y llorosa, traspasada y dolorosa, fiero cuchillo tenía."],
    fr: [["c", "La Madre piadosa estaba junto a la cruz y lloraba mientras el Hijo pendía.", "Stabat Mater, versión de Lope de Vega"],
      ["i", "No huyó: se quedó de pie junto a la cruz. Quédate hoy junto a alguien que sufre.", "Evangelio según san Juan 19, 25"]] }
];

// Cada Virgen, más a fondo: cifras, historias y prodigios, datos curiosos, los símbolos de su imagen (x, y en % sobre la foto) y su santuario.
// Lo que es tradición se dice como tradición; lo reconocido por la Iglesia, como tal.
const ADX = {
  guadalupe: {
    n3: [["1531", "año de las apariciones"], ["46", "estrellas en su manto"], ["20 millones", "de peregrinos al año"]],
    pr: [["La tilma que no se deshace", "El ayate de Juan Diego es de fibra de maguey, una tela burda que suele durar unos veinte años. La imagen lleva casi quinientos, y pasó más de un siglo sin cristal, entre el humo de las velas y las manos de los peregrinos."],
      ["El atentado de 1921", "El 14 de noviembre de 1921 estalló una bomba escondida en un ramo de flores, al pie de la imagen. El altar de mármol se rompió y un crucifijo de bronce quedó doblado; la tilma y su cristal no sufrieron daño. Ese crucifijo, el Cristo del Atentado, se guarda en la Basílica."],
      ["El tío Juan Bernardino", "El tío de Juan Diego agonizaba. La Virgen le dijo a Juan Diego que no se afligiera, que su tío ya estaba sano. Al volver a casa lo encontró de pie: también a él se le había aparecido, y le había dicho su nombre."]],
    sab: [["Una basílica redonda", "La basílica nueva, de 1976, es circular para que la imagen se vea desde cualquier lugar. Bajo ella corren bandas eléctricas: así todos pasan cerca y nadie se queda parado."],
      ["«No hizo nada igual»", "Cuenta la tradición que el papa Benedicto XIV, al ver una copia de la imagen en 1754, repitió el salmo: «No hizo cosa igual con ninguna otra nación»."],
      ["El que habla como águila", "El nombre indígena de san Juan Diego era Cuauhtlatoatzin, «el que habla como águila». Tenía unos 57 años cuando vio a la Virgen."]],
    sim: [[45, 43, "El moño negro", "Las mujeres nahuas lo ataban arriba de la cintura cuando esperaban un hijo. María está encinta: trae a Jesús."],
      [75, 45, "Las estrellas", "El manto es azul verdoso, color de los gobernantes mexicas, y lleva cuarenta y seis estrellas de oro."],
      [10, 47, "Los rayos", "Está delante del sol y lo deja ver. Para los indígenas, con ella venía alguien más grande que el sol."],
      [23, 92, "La luna", "Pisa una luna oscura. El Apocalipsis habla de una mujer vestida de sol, con la luna bajo sus pies."]],
    san: ["Basílica de Santa María de Guadalupe", "Villa de Guadalupe, Ciudad de México", "Basílica de Guadalupe, Ciudad de México"] },
  fatima: {
    n3: [["1917", "seis apariciones"], ["3", "niños pastores"], ["13", "de mayo a octubre"]],
    pr: [["El milagro del sol", "El 13 de octubre de 1917 llovía sobre unas setenta mil personas reunidas en Cova da Iria. Al mediodía las nubes se abrieron y, según los testigos, el sol giró y pareció caer sobre la tierra. Lo contaron incluso periódicos contrarios a la Iglesia."],
      ["La bala del 13 de mayo", "El 13 de mayo de 1981, aniversario de la primera aparición, dispararon a san Juan Pablo II en la plaza de San Pedro. Sobrevivió y dijo que una mano materna había desviado la bala. Esa bala está hoy engastada en la corona de la imagen de Fátima."],
      ["Los santos más pequeños", "Francisco y Jacinta murieron de gripe española a los diez y a los nueve años, ofreciendo su enfermedad por los demás. Son los santos no mártires más jóvenes de la Iglesia. Lucía vivió hasta 2005."]],
    sab: [["La encina que ya no está", "La Virgen se aparecía sobre una encina pequeña. Los peregrinos se fueron llevando sus ramas de recuerdo hasta que no quedó nada; donde estuvo se levanta hoy la Capillita de las Apariciones."],
      ["Una imagen que viaja", "Desde 1947 una imagen peregrina de Fátima recorre el mundo. Ha visitado más de sesenta países."],
      ["Su nombre completo", "En la última aparición dijo quién era: la Señora del Rosario. En las seis repitió la misma petición: recen el rosario todos los días."]],
    sim: [[54, 13, "La corona", "La original se hizo con joyas que regalaron las mujeres de Portugal en 1942. Dentro lleva la bala del atentado contra Juan Pablo II."],
      [50, 41, "Las manos", "Juntas, con el rosario: la oración que pidió para alcanzar la paz."],
      [50, 92, "La nube", "Los niños la vieron sobre una nubecita posada en la encina, «más brillante que el sol»."]],
    san: ["Santuario de Nuestra Señora del Rosario de Fátima", "Cova da Iria, Portugal", "Santuario de Fátima, Portugal"] },
  lourdes: {
    n3: [["1858", "dieciocho apariciones"], ["72", "milagros reconocidos"], ["7 mil", "curaciones registradas"]],
    pr: [["El manantial", "El 25 de febrero la Señora pidió a Bernardita beber de una fuente que nadie veía. La niña escarbó en el lodo y brotó un hilo de agua. Hoy ese manantial da más de cien mil litros al día."],
      ["Setenta y dos milagros", "De más de siete mil curaciones registradas, la Iglesia ha reconocido como milagro solo 72, después de años de examen por médicos, creyentes y no creyentes. El más reciente se anunció en 2025."],
      ["Bernardita", "Nunca buscó fama: entró a un convento en Nevers y murió a los 35 años. Su cuerpo, exhumado tres veces, se conserva incorrupto. A quien dudaba le respondía: «No me toca hacérselo creer, me toca decírselo»."]],
    sab: [["Habló en su dialecto", "La Señora no habló en francés, sino en el dialecto de Bernardita: «Que soy era Immaculada Councepciou». La niña no entendía esas palabras; las fue repitiendo todo el camino para no olvidarlas."],
      ["El agua no tiene nada especial", "La han analizado muchas veces: es agua de montaña común. En Lourdes insisten en que no cura el agua, sino Dios, por la fe y la oración."],
      ["Una gruta en cada pueblo", "Casi no hay ciudad católica sin su gruta de Lourdes. Hasta los jardines del Vaticano tienen una."]],
    sim: [[50, 12, "La mirada", "Mira al cielo: así la vio Bernardita cuando dijo su nombre, el 25 de marzo."],
      [35, 50, "El rosario", "Lo llevaba en el brazo y pasaba las cuentas mientras Bernardita rezaba. Solo movía los labios en el Gloria."],
      [54, 47, "La cinta azul", "«Una Señora vestida de blanco, con una cinta azul y una rosa amarilla en cada pie»: así la describió."]],
    san: ["Santuario de Nuestra Señora de Lourdes", "Lourdes, Francia", "Sanctuaire Notre-Dame de Lourdes"] },
  carmen: {
    n3: [["Siglo XII", "nace en el Carmelo"], ["1251", "el escapulario"], ["16 jul", "su fiesta"]],
    pr: [["El escapulario", "Dos pedacitos de tela café unidos por un cordón: es el hábito del Carmelo en pequeño. Según la tradición, la Virgen prometió a san Simón Stock acompañar hasta el final a quien lo lleve con fe."],
      ["La isla de los piratas", "Durante más de un siglo los piratas dominaron la laguna de Términos, en Campeche. El 16 de julio de 1717, día de su fiesta, fueron expulsados. Desde entonces la isla y su ciudad se llaman del Carmen."],
      ["El voto de Maipú", "En 1818, antes de la batalla que selló la independencia de Chile, O'Higgins prometió levantarle un templo donde se diera la victoria. Hoy es el santuario nacional de Maipú, y ella, patrona de Chile."]],
    sab: [["La nubecita de Elías", "En el Carmelo el profeta Elías vio subir del mar una nube pequeña que trajo la lluvia tras años de sequía. Los carmelitas vieron en ella una figura de María."],
      ["Procesiones en el mar", "Cada 16 de julio, en los puertos, los pescadores la suben a una lancha adornada y la pasean entre sirenas y cohetes."],
      ["Santos de su casa", "De la familia del Carmelo son santa Teresa de Jesús, san Juan de la Cruz y santa Teresita del Niño Jesús: tres doctores de la Iglesia."]],
    sim: [[72, 75, "El escapulario", "Lo ofrece a quien la mira: es su regalo y la señal de su protección."],
      [49, 54, "El escudo", "Sobre el pecho lleva el escudo de la Orden del Carmen."],
      [71, 45, "El Niño", "María no se guarda nada: todo lo que da, lo da con su Hijo en brazos."]],
    san: ["Monasterio Stella Maris", "Monte Carmelo, Haifa", "Stella Maris Monastery, Haifa"] },
  pilar: {
    n3: [["Año 40", "según la tradición"], ["Siglo XV", "la talla actual"], ["12 oct", "su fiesta"]],
    pr: [["El milagro de Calanda", "A Miguel Pellicer le amputaron una pierna en Zaragoza. Más de dos años después, la noche del 29 de marzo de 1640, sus padres lo encontraron dormido con las dos piernas. Hubo proceso, testigos y notario: el arzobispo lo declaró milagro en 1641."],
      ["Las bombas de 1936", "La madrugada del 3 de agosto de 1936 un avión dejó caer tres bombas sobre la basílica. Ninguna estalló. Dos de ellas siguen colgadas junto a la Santa Capilla."],
      ["No se apareció: vino", "Es la única vez que la tradición sitúa a María visitando a alguien cuando todavía vivía en la tierra. Por eso en Zaragoza no se habla de aparición, sino de la «Venida»."]],
    sab: [["Un manto cada día", "La imagen cambia de manto casi a diario y tiene cientos. Solo los días 2, 12 y 20 de cada mes se muestra sin él, para que se vea la columna."],
      ["La piedra gastada a besos", "Detrás de la capilla hay un hueco por donde se toca el pilar. Siglos de besos y de manos han dejado su huella en la piedra."],
      ["Las cintas", "Las «medidas» son cintas de colores tan largas como la imagen. Media España las lleva atadas en el coche, en la mochila o en la muñeca."]],
    sim: [[50, 22, "El resplandor", "Corona y rayos de oro con miles de piedras preciosas, regalo de los fieles."],
      [50, 43, "La imagen", "Una talla pequeña de madera, del siglo XV, con el Niño en brazos."],
      [50, 72, "El manto", "Cubre la columna y cambia según el día. El de esta foto lleva el escudo del Justicia de Aragón."],
      [50, 94, "El pilar", "Una columna de jaspe forrada de bronce y plata: la señal de una fe que no se cae."]],
    san: ["Catedral-Basílica de Nuestra Señora del Pilar", "Zaragoza, España", "Basílica del Pilar, Zaragoza"] },
  sanjuan: {
    n3: [["1623", "el primer milagro"], ["2 feb", "su gran peregrinación"], ["2.º", "santuario más visitado de México"]],
    pr: [["El regalo del cirquero", "El padre de la niña que volvió a la vida pidió llevarse la imagen a Guadalajara para restaurarla, porque estaba muy maltratada. Regresó tan hermosa que el pueblo entero salió a recibirla."],
      ["Ana Lucía", "Fue una indígena que cuidaba la capilla quien confió en la «Cihuapilli», la Señora, cuando casi nadie se acordaba de ella. La tradición cuenta que por las mañanas la encontraba fuera de su lugar, en el altar."],
      ["Caminos de fe", "Cada enero salen caravanas a pie desde el Bajío, el centro y el norte del país. Caminan días enteros para llegar el 2 de febrero; muchos cumplen así una promesa heredada de sus abuelos."]],
    sab: [["Hecha de maíz", "Los artesanos purépechas molían la caña del maíz y la mezclaban con un pegamento de orquídea para hacer una pasta ligerísima. Por eso la imagen pesa tan poco y ha durado casi quinientos años."],
      ["También en Texas", "Los migrantes llevaron su devoción al norte. En San Juan, Texas, hay una basílica dedicada a ella que recibe peregrinos todo el año."],
      ["Paredes que dan gracias", "En el santuario se guardan miles de exvotos: retablitos pintados, trenzas, fotos y cartas que cuentan un favor recibido."]],
    sim: [[25, 22, "Los ángeles", "Sostienen una cinta que dice en latín: «Madre Inmaculada, ruega por nosotros»."],
      [50, 31, "Su rostro", "La imagen mide poco más de treinta centímetros y tiene las manos juntas: es una Inmaculada."],
      [22, 58, "El vestido", "La talla es sencilla; el manto que la abre en triángulo y las joyas son regalos de los peregrinos."],
      [50, 68, "La media luna", "La luna a sus pies, como la mujer del Apocalipsis."]],
    san: ["Catedral Basílica de Nuestra Señora de San Juan de los Lagos", "San Juan de los Lagos, Jalisco", "Basílica de San Juan de los Lagos, Jalisco"] },
  zapopan: {
    n3: [["1541", "llega a Zapopan"], ["34 cm", "mide la imagen"], ["+2 millones", "en su Romería"]],
    pr: [["La Pacificadora", "En plena guerra del Mixtón, fray Antonio de Segovia subió al cerro con la imagen colgada al pecho para pedir a los indígenas sublevados que bajaran en paz. Bajaron. Desde entonces la llaman la Pacificadora."],
      ["Contra rayos y tempestades", "En 1734, tras temporales y epidemias que castigaban a Guadalajara, la ciudad la juró su protectora. Desde entonces pasa cada temporada de lluvias visitando sus templos."],
      ["La Reina del Lago", "Cuando el lago de Chapala se quedaba sin agua, la llevaron a sus orillas a pedir lluvia. El lago se recuperó, y los ribereños la nombraron su reina."]],
    sab: [["La Virgen viajera", "De mayo a octubre casi no duerme en su basílica: visita una parroquia distinta cada día. Por eso viste de peregrina, y cada barrio la recibe con flores, música y tapetes."],
      ["La Generala", "En 1821 la nombraron Generala, con todo y banda y bastón de mando. Es de las poquísimas imágenes del mundo con grado militar."],
      ["Su otro nombre", "Su advocación es Nuestra Señora de la Expectación: María esperando el nacimiento de Jesús. Por eso su fiesta litúrgica es el 18 de diciembre."]],
    sim: [[53, 18, "El sombrero", "Sombrero de peregrina: lo lleva cuando sale a visitar las parroquias."],
      [52, 52, "El resplandor", "Sobre el vientre lleva un sol de oro: es la Virgen de la Expectación, la que espera a su Hijo."],
      [61, 60, "La banda", "La banda de Generala cruza su vestido desde 1821."]],
    san: ["Basílica de Nuestra Señora de Zapopan", "Zapopan, Jalisco", "Basílica de Zapopan, Jalisco"] },
  juquila: {
    n3: [["30 cm", "mide la imagen"], ["1633", "sale intacta del incendio"], ["8 dic", "su fiesta"]],
    pr: [["La que quiso quedarse", "Cuentan que cuando el párroco quiso llevarla a su iglesia de Juquila, la imagen amanecía de vuelta en Amialtepec. Así pasó varias veces, hasta que en 1719 se quedó por fin en su santuario."],
      ["Del color de su gente", "Del incendio salió entera, pero morena. Los chatinos de la sierra dicen que así se quedó: del color de ellos."],
      ["El Pedimento", "Antes de llegar, en un cerro del camino, los peregrinos modelan con barro lo que vienen a pedir: una casita, un bebé, un título, salud. Al año siguiente vuelven a dar gracias."]],
    sab: [["A pie, en bici y con antorcha", "Hay quien camina una semana para verla. Los ciclistas llegan en caravanas con su imagen a la espalda, y los relevos de antorchistas corren día y noche."],
      ["Corona del Papa", "El 8 de octubre de 2014 fue coronada en nombre del papa Francisco, que mandó un mensaje a Oaxaca para la ocasión."],
      ["Juquilita", "Así, en diminutivo, la llaman en todo el sur de México. La verás en taxis, mercados y camiones: chiquita, de vestido blanco y cabello largo."]],
    sim: [[49, 8, "La corona", "Corona pontificia, puesta en 2014."],
      [49, 19, "Su rostro", "Moreno, con los ojos bajos y las manos juntas."],
      [75, 60, "El vestido", "La imagen mide treinta centímetros; casi todo lo que ves es su vestido blanco, bordado por sus devotas."]],
    san: ["Santuario de Nuestra Señora de Juquila", "Santa Catarina Juquila, Oaxaca", "Santuario de Juquila, Oaxaca"] },
  socorro: {
    n3: [["Siglo XV", "se pinta en Creta"], ["1499", "llega a Roma"], ["1866", "«Denla a conocer»"]],
    pr: [["El icono robado", "Según la tradición, un mercader lo robó de una iglesia de Creta y lo llevó a Roma. Antes de morir pidió que se expusiera en un templo. En 1499 lo entronizaron en la iglesia de San Mateo."],
      ["Perdido casi setenta años", "En 1798 las tropas de Napoleón destruyeron San Mateo. Los frailes escondieron el icono en una capilla y casi todos lo olvidaron, menos un monaguillo que, ya de mayor, contó dónde estaba."],
      ["La novena perpetua", "Miles de parroquias le rezan una novena que nunca termina: cada semana, el mismo día. En Baclaran, Filipinas, cada miércoles acuden decenas de miles de personas."]],
    sab: [["Ella te mira a ti", "El Niño mira asustado a los ángeles, pero María no lo mira a él: te mira a ti. Te está presentando a su Hijo."],
      ["Letras griegas", "Junto a cada figura hay iniciales en griego: «Madre de Dios», «Jesucristo», «Arcángel Miguel», «Arcángel Gabriel»."],
      ["El fondo de oro", "El dorado no es adorno: en los iconos significa el cielo, la luz que no se apaga."]],
    sim: [[56, 11, "La estrella", "Sobre el velo: ella es la estrella que guía hasta Jesús."],
      [54, 24, "Los ojos", "Grandes y serenos, vueltos hacia quien reza."],
      [91, 28, "Los arcángeles", "Gabriel lleva la cruz y los clavos; del otro lado, Miguel lleva la lanza y la esponja."],
      [51, 62, "Las manos", "Las dos manos del Niño caben en la de su Madre, que no aprieta: sostiene."],
      [51, 94, "La sandalia", "Con el susto se le suelta una sandalia. Es un Dios que también tuvo miedo y corrió con su mamá."]],
    san: ["Iglesia de San Alfonso María de Ligorio", "Via Merulana, Roma", "Chiesa di Sant'Alfonso all'Esquilino, Roma"] },
  milagrosa: {
    n3: [["1830", "París, rue du Bac"], ["27 nov", "su fiesta"], ["Millones", "de medallas en el mundo"]],
    pr: [["El banquero que no creía", "Alfonso Ratisbonne, judío y adversario de la Iglesia, aceptó por reto llevar la medalla. El 20 de enero de 1842 entró a una iglesia de Roma y salió transformado: dijo haber visto a la Virgen tal como aparece en ella. Se hizo sacerdote."],
      ["El secreto de Catalina", "Santa Catalina Labouré pasó 46 años cuidando ancianos sin decir a nadie que ella era la vidente. Solo lo reveló poco antes de morir. Su cuerpo, exhumado en 1933, se conserva incorrupto en la misma capilla."],
      ["Las piedras apagadas", "Catalina vio que de los anillos de la Virgen salían rayos de luz, pero algunas piedras no brillaban. María le explicó que eran las gracias que nadie le pide."]],
    sab: [["Antes del dogma", "La medalla dice «sin pecado concebida» 24 años antes de que la Iglesia definiera la Inmaculada Concepción, en 1854."],
      ["El reverso", "Por detrás lleva una M con una cruz, doce estrellas y dos corazones: el de Jesús, coronado de espinas, y el de María, atravesado por una espada."],
      ["El sillón", "En la capilla de París se conserva el sillón donde la Virgen se sentó la primera noche; Catalina apoyó las manos en sus rodillas."]],
    sim: [[49, 11, "La mirada", "Baja, hacia el mundo que tiene a sus pies."],
      [10, 48, "Las manos", "Abiertas hacia abajo: de ellas bajan las gracias para quien las pide."],
      [72, 43, "El manto", "Azul como el cielo, sobre una túnica blanca «color de aurora», contó Catalina."]],
    san: ["Capilla de Nuestra Señora de la Medalla Milagrosa", "140 rue du Bac, París", "Chapelle Notre-Dame de la Médaille Miraculeuse, Paris"] },
  auxiliadora: {
    n3: [["1571", "Lepanto"], ["24 may", "su fiesta"], ["1868", "su basílica en Turín"]],
    pr: [["Lepanto", "El 7 de octubre de 1571, mientras la flota cristiana se lo jugaba todo en Lepanto, el papa san Pío V pidió a Europa rezar el rosario. Tras la victoria, según la tradición, añadió a las letanías la invocación «Auxilio de los cristianos»."],
      ["Ocho monedas", "Cuando el maestro de obras le pidió el primer pago de la basílica, Don Bosco le vació el monedero en las manos: ocho monedas, menos de media lira. Le aseguró que la Virgen pondría lo demás. Cinco años después estaba consagrada."],
      ["Cada ladrillo, una gracia", "Don Bosco decía que en ese templo no había un ladrillo que no fuera señal de un favor recibido: la gente daba en agradecimiento por las ayudas que atribuía a María Auxiliadora."]],
    sab: [["El cuadro", "Don Bosco le explicó al pintor Tomás Lorenzone cómo quería la imagen. Tardó tres años. El artista contaba que, al pintar el rostro, sintió que alguien le guiaba la mano."],
      ["El sueño de los nueve años", "De niño, Juan Bosco soñó con una Señora que convertía una manada de fieras en corderos. «A su tiempo lo comprenderás todo», le dijo. Fue su maestra toda la vida."],
      ["La bendición", "Los salesianos terminan el día con la bendición de María Auxiliadora, que compuso el mismo Don Bosco."]],
    sim: [[47, 7, "Doce estrellas", "La corona de estrellas del Apocalipsis: es reina del cielo."],
      [20, 68, "El cetro", "Lo empuña como quien tiene poder para ayudar."],
      [70, 38, "El Niño", "Abre los brazos hacia quien mira: el auxilio de María es llevarnos a él."]],
    san: ["Basílica de María Auxiliadora", "Valdocco, Turín", "Basilica di Maria Ausiliatrice, Torino"] },
  dolores: {
    n3: [["7", "dolores"], ["Siglo XIII", "nace su devoción"], ["15 sep", "su fiesta"]],
    pr: [["Los siete dolores", "La profecía de Simeón, la huida a Egipto, el Niño perdido en el templo, el encuentro camino del Calvario, la crucifixión, el descendimiento y la sepultura."],
      ["El Grito de Dolores", "La Independencia de México empezó en el atrio de una parroquia suya: la de Nuestra Señora de los Dolores, en Guanajuato, donde el cura Hidalgo llamó al pueblo la madrugada del 16 de septiembre de 1810."],
      ["Los siete fundadores", "En 1233 siete comerciantes de Florencia lo dejaron todo para vivir como siervos de María al pie de la cruz. De ellos nació la Orden de los Servitas, que extendió esta devoción."]],
    sab: [["«¿Ya lloró la Virgen?»", "En Guanajuato, el Viernes de Dolores se pregunta eso de casa en casa, y la respuesta es un vaso de agua fresca o una nieve: las lágrimas de María convertidas en dulzura."],
      ["Su altar", "Naranjas agrias con banderitas de papel dorado, trigo germinado, velas y aguas de colores: así se viste en México su altar."],
      ["Stabat Mater", "El poema medieval que la canta de pie junto a la cruz ha sido puesto en música por Vivaldi, Pergolesi, Rossini y Dvořák, entre muchos otros."]],
    sim: [[46, 25, "La corona", "Reina también en el dolor: la corona y la ráfaga de oro la rodean como un sol."],
      [60, 58, "Las lágrimas", "De cristal, sobre un rostro sereno: llora, pero no se derrumba."],
      [86, 63, "Los cirios", "La candelería encendida con que la acompañan en Semana Santa."],
      [22, 93, "El pañuelo", "En la mano lleva un pañuelo de encaje para enjugar el llanto: el suyo y el nuestro."]],
    san: ["Parroquia de Nuestra Señora de los Dolores", "Dolores Hidalgo, Guanajuato", "Parroquia de Nuestra Señora de los Dolores, Dolores Hidalgo"] }
};
ADV.forEach((a) => Object.assign(a, ADX[a.k] || {}));

// Confesión: preguntas sencillas para prepararse (escritas para Atrio), pasos y el acto de contrición tradicional
const EXA = [
  ["Con Dios", ["¿Le he dado tiempo a Dios en la oración?", "¿He faltado a misa el domingo sin una razón seria?", "¿He usado el nombre de Dios con falta de respeto?"]],
  ["Con los demás", ["¿He tratado con cariño y paciencia a mi familia?", "¿He mentido, criticado o hablado mal de alguien?", "¿Guardo rencor o me cuesta perdonar?", "¿He sido injusto en mi trabajo o he tomado lo que no es mío?"]],
  ["Conmigo", ["¿He cuidado mi cuerpo y mi pureza?", "¿Me he dejado llevar por el orgullo, la envidia o la pereza?", "¿Dejé de ayudar a quien lo necesitaba?"]]
];
const CFP = ["Examina tu conciencia con calma.", "Arrepiéntete de corazón y propón no volver a hacerlo.", "Dile tus pecados al sacerdote, con sencillez.", "Escucha su consejo y recibe la absolución.", "Cumple la penitencia que te dé."];
const CONTRI = "Señor mío Jesucristo, Dios y hombre verdadero, Creador, Padre y Redentor mío; por ser tú quien eres, bondad infinita, y porque te amo sobre todas las cosas, me pesa de todo corazón haberte ofendido; también me pesa porque puedes castigarme con las penas del infierno. Ayudado de tu divina gracia, propongo firmemente nunca más pecar, confesarme y cumplir la penitencia que me fuere impuesta. Amén.";
