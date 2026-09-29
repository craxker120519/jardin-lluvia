/* ============================================================
   🌷 TEXTOS — aquí se edita todo lo que dice la página
   ------------------------------------------------------------
   Cómo se escriben las frases de cada "relato":

     "Texto normal"          → frase elegante
     "# Texto"               → frase grande (títulos, "Te amo.")
     "~ Texto"               → frase manuscrita
     ""                      → pausa (un respiro antes de lo siguiente)
     "[foto]"                → coloca aquí la siguiente foto de esa sección
     "[foto 2]"              → coloca la foto número 2 de esa sección

   Las fotos de cada sección se editan en  js/fotos.js
   ============================================================ */

window.TEXTOS = {

  nombre: "Lluvia",
  edad: 24,
  anios: 7,

  /* 01 — Portada */
  portada: {
    lineas: [
      "Para mi Lluvia 🌷",
      "Hoy cumples 24 años...",
      "Y quería regalarte algo que no pudiera envolver en papel.",
      "Así que hice un pequeño lugar para guardar algunos de nuestros recuerdos."
    ],
    boton: "🐇 Entrar a nuestro jardín"
  },

  /* 02 — Introducción */
  introduccion: {
    relato: [
      "# 7 años.",
      "Parece solamente un número...",
      "...pero para mí son miles de momentos.",
      "[foto]",
      "Son risas, aventuras, días increíbles, días difíciles, cambios, aprendizajes y recuerdos que solamente tú y yo entendemos.",
      "",
      "Y entre todos ellos, hay algo que siempre ha estado presente.",
      "",
      "",
      "# Te amo."
    ]
  },

  /* 03 — Capítulo I */
  comienzo: {
    capitulo: "Capítulo I",
    titulo: "Cuando todo comenzó",
    relato: [
      "~ Érase una vez...",
      "Hace 7 años comenzó nuestra historia.",
      "Éramos diferentes personas, con sueños diferentes y sin imaginar todo lo que íbamos a vivir.",
      "No sabíamos cuántas veces íbamos a reír, discutir, aprender, cambiar o volver a elegirnos.",
      "",
      "~ Solamente estábamos comenzando."
    ]
  },

  /* 04 — Capítulo II */
  crecer: {
    capitulo: "Capítulo II",
    titulo: "Verte crecer",
    antes: [
      "Hay algo que me parece increíble de estos 7 años.",
      "No solamente he compartido mi vida contigo.",
      "",
      "# También he tenido el privilegio de verte crecer."
    ],
    despues: [
      "Han cambiado tus sueños.",
      "Tu forma de pensar.",
      "Tus gustos.",
      "Tus preocupaciones.",
      "Incluso la forma en que ves la vida.",
      "",
      "Y me encanta poder decir...",
      "",
      "# Yo estuve ahí para verlo."
    ]
  },

  /* 05 — Los momentos difíciles
     [escena] es el tulipán que se levanta. La frase con
     evento "levantarse" es la que lo hace levantarse. */
  dificiles: {
    capitulo: "Capítulo III",
    titulo: "Los días difíciles",
    relato: [
      "~ Mami...",
      "No todo fueron días bonitos.",
      "",
      "También te vi llorar.",
      "Te vi preocuparte.",
      "Te vi tener miedo.",
      "Te vi pasar por momentos en los que quizá ni tú misma sabías cómo ibas a salir adelante.",
      "",
      "[escena]",
      { texto: "# Y también te vi levantarte.", evento: "levantarse" },
      "",
      "Y aunque no siempre tuve las palabras correctas...",
      "aunque no siempre pude solucionar lo que estaba pasando...",
      "siempre quise que supieras que no estabas sola.",
      "",
      "",
      "# Porque también te amo en esos días."
    ]
  },

  /* 06 — Los recuerdos bonitos (los textos de cada foto están en fotos.js) */
  bonitos: {
    capitulo: "Capítulo IV",
    titulo: "Lo bonito",
    relato: [
      "~ Mi chula ❤️",
      "Si tuviera que escoger mis recuerdos favoritos, probablemente no podría.",
      "Porque muchas veces fueron las cosas más simples las que terminaron siendo mis favoritas."
    ]
  },

  /* 07 — Tú */
  tu: {
    capitulo: "Capítulo V",
    titulo: "Tú",
    antes: [
      "Hoy quiero hablar un poquito de ti.",
      "Porque hoy no estamos celebrando solamente nuestra historia.",
      "",
      "# Hoy celebramos que hace 24 años llegaste al mundo.",
      "",
      "He conocido muchas versiones de ti."
    ],
    versiones: [
      "La que se ríe.",
      "La que se enoja.",
      "La que tiene miedo.",
      "La que se emociona.",
      "La que persigue sus sueños.",
      "La que se cae.",
      "Y la que vuelve a levantarse."
    ],
    despues: [
      "Y de todas esas versiones...",
      "hay algo que nunca ha cambiado.",
      "",
      "",
      "# Sigues siendo Lluvia."
    ]
  },

  /* Interludio — su amor por los animales
     [animales] es la escena de la conejita con sus amigos.
     Las fotos de "Ese corazón tuyo" están en fotos.js */
  animales: {
    relato: [
      "Hay algo más que amo de ti...",
      "",
      "",
      "# El amor que tienes por los animales.",
      "[animales]",
      "Siempre me ha parecido bonito la forma en que puedes ver un animal y automáticamente querer acercarte, cuidarlo o simplemente saber que está bien.",
      "",
      "Creo que esa parte de ti dice muchísimo de la persona que eres.",
      "",
      "~ Mi preciosa amante de los animales. 🐾❤️"
    ],
    titulo: "Ese corazón tuyo 🐾"
  },

  /* 08 — Los 7 años (títulos y fotos de cada año en fotos.js) */
  siete: {
    capitulo: "Capítulo VI",
    titulo: "Siete años",
    intro: "Un tulipán por cada año que llevamos juntos.",
    pista: "toca cada tulipán",
    contador: "{n} de 7",
    completo: "Siete años. Y todos contigo."
  },

  /* 09 — Los 24 años */
  veinticuatro: {
    relato: [
      "24 años de historias.",
      "24 años de aprendizajes.",
      "24 años de momentos que te hicieron ser quien eres.",
      "",
      "Y de esos 24 años...",
      "",
      "",
      { texto: "# 7 tuve la suerte de compartirlos contigo.", evento: "siete" }
    ]
  },

  /* 10 — Gracias */
  gracias: {
    relato: [
      "# Gracias.",
      "Por estos 7 años.",
      "[foto 1]",
      "Por las risas.",
      "Por las aventuras.",
      "Por las conversaciones.",
      "Por las discusiones que nos hicieron aprender.",
      "Por los días buenos.",
      "Y también por los días que no lo fueron tanto.",
      "[foto 2]",
      "Gracias por dejarme conocer tantas versiones de ti.",
      "Por permitirme acompañarte mientras crecías.",
      "",
      "~ Y por dejarme formar parte de tu historia.",
      "[foto 3]"
    ]
  },

  /* 11 — El pastel */
  pastel: {
    lineas: ["Pero espera...", "Antes de terminar...", "Pide un deseo, preciosa. ✨"],
    pista: "toca las velas para soplarlas",
    felicitacion: "¡Feliz cumpleaños, Lluvia! 💗"
  },

  /* 12 — El regalo */
  regalo: {
    antes: "Pero todavía falta algo...",
    pista: "ábrelo",
    etiqueta: "para ti",
    pie: "mi foto favorita de nosotros",
    frase: "Si algún día se te olvida lo mucho que te quiero, vuelve a esta foto."
  },

  /* 13 — La carta
     • parrafos: la carta principal (un salto de línea = \n)
     • cartaCompleta: una segunda hoja para tu carta completa.
       Si la dejas vacía  []  la segunda hoja no aparece. */
  carta: {
    intro: ["Lluvia...", "Mi amor...", "Todavía tengo algo que decirte."],
    pista: "toca el sobre",
    destinatario: "para Lluvia",
    saludo: "Mi amor,",
    parrafos: [
      "no sé si una página, una carta o mil fotografías podrían realmente explicar todo lo que significas para mí.",
      "Pero quería intentarlo.",
      "Porque te amo.",
      "Y no solamente amo a la Lluvia que sonríe, que se divierte y que está feliz.",
      "Amo también a la Lluvia que ha tenido días malos.\nA la que ha llorado.\nA la que se ha equivocado.\nA la que ha tenido miedo.\nA la que ha tenido que levantarse muchas veces.",
      "Te adoro completa, preciosa.",
      "Y después de 7 años, sigo encontrando razones para quererte un poquito más."
    ],
    cartaCompleta: [],
    despedida: "Te amo,",
    firma: "David",
    cerrar: "doblar la carta",
    guardada: "ya es tuya"
  },

  /* 14 — Final */
  final: {
    relato: [
      "# Feliz cumpleaños, mami. ❤️",
      "Hoy cumples 24...",
      "Yo solamente espero poder seguir viendo cómo floreces, cómo cumples tus sueños y cómo te conviertes cada vez más en la mujer que quieres ser.",
      "",
      "",
      "# Te amo.",
      "",
      "# Te adoro.",
      "",
      "~ Mi princesa.",
      "",
      "",
      "24 años de ti.",
      "7 años de nosotros."
    ]
  },

  /* 15 — El octavo tulipán */
  octavo: {
    lineas: [
      "Este todavía no tiene historia...",
      "",
      "Porque todavía nos faltan muchas historias por escribir."
    ],
    final: "Te amo, Lluvia. 🌷",
    volver: "volver al principio"
  }
};
