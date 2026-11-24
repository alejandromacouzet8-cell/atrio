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
/* Letanías lauretanas, en siete pantallas. «inv» son invocaciones que se responden con «r». */
const LET = [
  { bl: [["v", "Señor, ten piedad."], ["r", "Señor, ten piedad."], ["v", "Cristo, ten piedad."], ["r", "Cristo, ten piedad."], ["v", "Señor, ten piedad."], ["r", "Señor, ten piedad."], ["v", "Cristo, óyenos."], ["r", "Cristo, óyenos."], ["v", "Cristo, escúchanos."], ["r", "Cristo, escúchanos."]] },
  { r: "Ten piedad de nosotros.", inv: ["Dios, Padre celestial", "Dios, Hijo, Redentor del mundo", "Dios, Espíritu Santo", "Santísima Trinidad, un solo Dios"], r2: "Ruega por nosotros.", inv2: ["Santa María", "Santa Madre de Dios", "Santa Virgen de las vírgenes", "Madre de Cristo", "Madre de la Iglesia", "Madre de la misericordia", "Madre de la divina gracia", "Madre de la esperanza"] },
  { r: "Ruega por nosotros.", inv: ["Madre purísima", "Madre castísima", "Madre siempre virgen", "Madre inmaculada", "Madre amable", "Madre admirable", "Madre del buen consejo", "Madre del Creador", "Madre del Salvador", "Virgen prudentísima", "Virgen digna de veneración", "Virgen digna de alabanza", "Virgen poderosa", "Virgen clemente", "Virgen fiel"] },
  { r: "Ruega por nosotros.", inv: ["Espejo de justicia", "Trono de la sabiduría", "Causa de nuestra alegría", "Vaso espiritual", "Vaso digno de honor", "Vaso de insigne devoción", "Rosa mística", "Torre de David", "Torre de marfil", "Casa de oro", "Arca de la Alianza", "Puerta del cielo", "Estrella de la mañana"] },
  { r: "Ruega por nosotros.", inv: ["Salud de los enfermos", "Refugio de los pecadores", "Consuelo de los migrantes", "Consoladora de los afligidos", "Auxilio de los cristianos", "Reina de los ángeles", "Reina de los patriarcas", "Reina de los profetas", "Reina de los apóstoles", "Reina de los mártires", "Reina de los confesores", "Reina de las vírgenes", "Reina de todos los santos", "Reina concebida sin pecado original", "Reina asunta a los cielos"] },
  { r: "Ruega por nosotros.", inv: ["Reina del santísimo Rosario", "Reina de la familia", "Reina de la paz"], bl: [["v", "Cordero de Dios, que quitas el pecado del mundo."], ["r", "Perdónanos, Señor."], ["v", "Cordero de Dios, que quitas el pecado del mundo."], ["r", "Escúchanos, Señor."], ["v", "Cordero de Dios, que quitas el pecado del mundo."], ["r", "Ten misericordia de nosotros."]] },
  { bl: [["v", "Ruega por nosotros, santa Madre de Dios."], ["r", "Para que seamos dignos de las promesas de Cristo."], ["v", "Oremos. Te rogamos nos concedas, Señor Dios nuestro, gozar de continua salud de alma y cuerpo, y por la gloriosa intercesión de la bienaventurada siempre Virgen María, vernos libres de las tristezas de la vida presente y disfrutar de las alegrías eternas. Por Cristo nuestro Señor."], ["r", "Amén."]] }
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

// Confesión: preguntas sencillas para prepararse (escritas para Atrio), pasos y el acto de contrición tradicional
const EXA = [
  ["Con Dios", ["¿Le he dado tiempo a Dios en la oración?", "¿He faltado a misa el domingo sin una razón seria?", "¿He usado el nombre de Dios con falta de respeto?"]],
  ["Con los demás", ["¿He tratado con cariño y paciencia a mi familia?", "¿He mentido, criticado o hablado mal de alguien?", "¿Guardo rencor o me cuesta perdonar?", "¿He sido injusto en mi trabajo o he tomado lo que no es mío?"]],
  ["Conmigo", ["¿He cuidado mi cuerpo y mi pureza?", "¿Me he dejado llevar por el orgullo, la envidia o la pereza?", "¿Dejé de ayudar a quien lo necesitaba?"]]
];
const CFP = ["Examina tu conciencia con calma.", "Arrepiéntete de corazón y propón no volver a hacerlo.", "Dile tus pecados al sacerdote, con sencillez.", "Escucha su consejo y recibe la absolución.", "Cumple la penitencia que te dé."];
const CONTRI = "Señor mío Jesucristo, Dios y hombre verdadero, Creador, Padre y Redentor mío; por ser tú quien eres, bondad infinita, y porque te amo sobre todas las cosas, me pesa de todo corazón haberte ofendido; también me pesa porque puedes castigarme con las penas del infierno. Ayudado de tu divina gracia, propongo firmemente nunca más pecar, confesarme y cumplir la penitencia que me fuere impuesta. Amén.";
