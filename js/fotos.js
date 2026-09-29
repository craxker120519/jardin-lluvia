/* ============================================================
   📷 FOTOS — qué foto va en cada lugar y qué dice
   ------------------------------------------------------------
   • Las fotos van en la carpeta /images.
   • En lugar de una foto puedes usar una ilustración:
       "dibujo:pareja"                 → los dos conejitos juntos
       "dibujo:comienzo-1" … "-3"      → los conejitos acercándose
       "dibujo:anio-1" … "dibujo:anio-7" → el tulipán de ese año
       "dibujo:perro" / "dibujo:gato" / "dibujo:pajarito"
   • Si dejas foto: "" en un lugar que lo permita, ese espacio
     se muestra solo con texto.
   • El ORDEN es el de estas listas: mueve los bloques { ... }.
   ============================================================ */

window.FOTOS = {

  /* 02 — Introducción */
  introduccion: { foto: "images/especial.jpg", pie: "nosotros" },

  /* 03 — Capítulo I: los primeros años */
  comienzo: [
    { numero: "I · 1", foto: "dibujo:comienzo-1", titulo: "Dos personas diferentes",   anio: "", texto: "Cada quien con sus sueños, sin imaginar todo lo que venía." },
    { numero: "I · 2", foto: "dibujo:comienzo-2", titulo: "Aprendiendo a conocernos",  anio: "", texto: "Poco a poco, sin prisa." },
    { numero: "I · 3", foto: "dibujo:comienzo-3", titulo: "Eligiéndonos",              anio: "", texto: "Y desde entonces, volviendo a elegirnos." }
  ],

  /* 04 — Verte crecer: un tulipán por año (foto: "" = solo texto) */
  crecer: [
    { etiqueta: "Año 1", anio: "", foto: "images/lluvia_año1.jpg", texto: "La Lluvia que conocí." },
    { etiqueta: "Año 2", anio: "", foto: "", texto: "Cambiaron tus sueños." },
    { etiqueta: "Año 3", anio: "", foto: "", texto: "Tu forma de pensar." },
    { etiqueta: "Año 4", anio: "", foto: "", texto: "Tus gustos." },
    { etiqueta: "Año 5", anio: "", foto: "", texto: "Tus preocupaciones." },
    { etiqueta: "Año 6", anio: "", foto: "", texto: "Incluso la forma en que ves la vida." },
    { etiqueta: "Año 7", anio: "", foto: "images/lluvia03.jpg", texto: "La Lluvia que hoy cumple 24." }
  ],

  /* 06 — Lo bonito (foto: "" = notita de papel)
     • detalle: (opcional) lo que aparece al tocar la foto */
  bonitos: [
    { foto: "images/bonitos_01.jpg", texto: "Una foto que quizá en ese momento no parecía importante.", detalle: "Y ahora significa muchísimo para mí." },
    { foto: "", texto: "Una tarde cualquiera que terminó siendo un recuerdo." },
    { foto: "", texto: "Un día cualquiera llega a ser tan importante o tan especial sin imaginarlo." },
    { foto: "", texto: "Un lugar cualquiera, pero contigo." },
    { foto: "", texto: "Un momento que quisiera volver a vivir." }
  ],

  /* 07 — Tú: fotos de Lluvia (van cambiando con cada "versión") */
  tu: [
    "images/lluvia02.jpg",
    "images/lluvia04.jpg"
  ],

  /* Ese corazón tuyo 🐾 — foto: "" muestra un dibujo de un animalito */
  animales: [
    { foto: "images/animales_01.jpg", texto: "Y ahí está otra vez ese lado tuyo..." },
    { foto: "", texto: "El que no puede ver un animal sin querer acercarse." },
    { foto: "", texto: "El que se derrite completamente con un perrito." },
    { foto: "", texto: "El que quiere cuidar hasta al animalito más pequeño." },
    { foto: "", texto: "Y probablemente por eso también tienes un corazón tan bonito." }
  ],

  /* 08 — Los 7 tulipanes: cada uno abre lo de ese año (puedes poner varias fotos) */
  anios: [
    { titulo: "Cuando comenzó todo",                     anio: "", texto: "El año en que todo era nuevo.",                   fotos: ["dibujo:anio-1"] },
    { titulo: "Cuando empezamos a conocernos de verdad", anio: "", texto: "Cuando dejamos de ser nuevos el uno para el otro.", fotos: ["dibujo:anio-2"] },
    { titulo: "Lo que comenzamos a construir",           anio: "", texto: "Cuando empezamos a hablar de un «nosotros».",     fotos: ["dibujo:anio-3"] },
    { titulo: "Lo que superamos",                        anio: "", texto: "No fue fácil, mi amor. Pero aquí seguimos.",      fotos: ["dibujo:anio-4"] },
    { titulo: "Lo que aprendimos",                       anio: "", texto: "Aprendimos a querernos mejor.",                   fotos: ["dibujo:anio-5"] },
    { titulo: "Lo que somos",                            anio: "", texto: "Tú y yo, sin tener que explicarlo.",              fotos: ["dibujo:anio-6"] },
    { titulo: "Donde estamos ahora",                     anio: "", texto: "Aquí. Todavía eligiéndote.",                     fotos: ["dibujo:anio-7"] }
  ],

  /* 10 — Gracias ([foto 1] en textos.js) */
  gracias: [
    { foto: "dibujo:pareja", pie: "tú y yo" }
  ],

  /* 12 — El regalo */
  regalo: "images/lluvia01.jpg"
};
