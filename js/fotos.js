/* ============================================================
   📷 FOTOS — qué foto va en cada lugar y qué dice
   ------------------------------------------------------------
   • Pon las fotos en la carpeta /images con estos nombres.
   • Si una foto no existe todavía, la página muestra un
     recuadro que dice exactamente qué archivo falta.
   • El ORDEN en que aparecen es el orden de estas listas:
     para cambiarlo, mueve los bloques { ... } de lugar.
   • Para agregar una foto, copia un bloque { ... } completo.
   • Cualquier texto que dejes vacío ("") simplemente no aparece.
   ============================================================ */

window.FOTOS = {

  /* 02 — Introducción: una foto antigua de ustedes */
  introduccion: { foto: "images/portada.jpg", pie: "nosotros, al principio" },

  /* 03 — Capítulo I: los primeros años */
  comienzo: [
    { numero: "I · 1", foto: "images/inicio_01.jpg", titulo: "La primera foto que tenemos juntos", anio: "", texto: "" },
    { numero: "I · 2", foto: "images/inicio_02.jpg", titulo: "Cuando todavía nos estábamos conociendo", anio: "", texto: "" },
    { numero: "I · 3", foto: "images/inicio_03.jpg", titulo: "Uno de nuestros primeros lugares", anio: "", texto: "" }
  ],

  /* 04 — Capítulo II: Lluvia a través de los años (una flor por año) */
  crecer: [
    { etiqueta: "Año 1", anio: "", foto: "images/lluvia_año1.jpg", texto: "La Lluvia que conocí." },
    { etiqueta: "Año 2", anio: "", foto: "images/lluvia_año2.jpg", texto: "" },
    { etiqueta: "Año 3", anio: "", foto: "images/lluvia_año3.jpg", texto: "" },
    { etiqueta: "Año 4", anio: "", foto: "images/lluvia_año4.jpg", texto: "" },
    { etiqueta: "Año 5", anio: "", foto: "images/lluvia_año5.jpg", texto: "" },
    { etiqueta: "Año 6", anio: "", foto: "images/lluvia_año6.jpg", texto: "" },
    { etiqueta: "Año 7", anio: "", foto: "images/lluvia_año7.jpg", texto: "La Lluvia que hoy cumple 24." }
  ],

  /* 06 — Los recuerdos bonitos
     • texto: lo que se lee debajo de la foto
     • detalle: (opcional) lo que aparece al tocarla */
  bonitos: [
    { foto: "images/bonitos_01.jpg", texto: "Una tarde cualquiera que terminó siendo un recuerdo." },
    { foto: "images/bonitos_02.jpg", texto: "Una de esas veces que nos reímos hasta que nos dolió la cara." },
    { foto: "images/bonitos_03.jpg", texto: "Un lugar cualquiera, pero contigo." },
    { foto: "images/bonitos_04.jpg", texto: "Nosotros haciendo cualquier tontería." },
    { foto: "images/bonitos_05.jpg", texto: "Un momento que quisiera volver a vivir." },
    { foto: "images/bonitos_06.jpg", texto: "Una foto que quizá en ese momento no parecía importante.", detalle: "Y ahora significa muchísimo para mí." }
  ],

  /* 07 — Tú: fotos de Lluvia (van cambiando con cada "versión") */
  tu: [
    "images/lluvia01.jpg",
    "images/lluvia02.jpg",
    "images/lluvia03.jpg",
    "images/lluvia04.jpg"
  ],

  /* Ese corazón tuyo 🐾 — fotos de Lluvia con animales
     Si una foto todavía no existe, en su lugar aparece una
     pequeña ilustración de un animalito con el mismo texto. */
  animales: [
    { foto: "images/animales_01.jpg", texto: "Y ahí está otra vez ese lado tuyo..." },
    { foto: "images/animales_02.jpg", texto: "El que no puede ver un animal sin querer acercarse." },
    { foto: "images/animales_03.jpg", texto: "El que se derrite completamente con un perrito." },
    { foto: "images/animales_04.jpg", texto: "El que quiere cuidar hasta al animalito más pequeño." },
    { foto: "images/animales_05.jpg", texto: "Y probablemente por eso también tienes un corazón tan bonito." }
  ],

  /* 08 — Los 7 tulipanes: cada uno abre las fotos de ese año */
  anios: [
    { titulo: "Cuando comenzó todo",                   anio: "", texto: "El año en que todo era nuevo.",                 fotos: ["images/año1_01.jpg", "images/año1_02.jpg"] },
    { titulo: "Cuando empezamos a conocernos de verdad", anio: "", texto: "Cuando dejamos de ser nuevos el uno para el otro.", fotos: ["images/año2_01.jpg", "images/año2_02.jpg"] },
    { titulo: "Lo que comenzamos a construir",         anio: "", texto: "Cuando empezamos a hablar de un «nosotros».",     fotos: ["images/año3_01.jpg", "images/año3_02.jpg"] },
    { titulo: "Lo que superamos",                      anio: "", texto: "No fue fácil, mi amor. Pero aquí seguimos.",     fotos: ["images/año4_01.jpg", "images/año4_02.jpg"] },
    { titulo: "Lo que aprendimos",                     anio: "", texto: "Aprendimos a querernos mejor.",                  fotos: ["images/año5_01.jpg", "images/año5_02.jpg"] },
    { titulo: "Lo que somos",                          anio: "", texto: "Tú y yo, sin tener que explicarlo.",             fotos: ["images/año6_01.jpg", "images/año6_02.jpg"] },
    { titulo: "Donde estamos ahora",                   anio: "", texto: "Aquí. Todavía eligiéndote.",                    fotos: ["images/año7_01.jpg", "images/año7_02.jpg"] }
  ],

  /* 10 — Gracias: sus fotos más bonitas juntos ([foto 1], [foto 2]... en textos.js) */
  gracias: [
    { foto: "images/gracias_01.jpg", pie: "" },
    { foto: "images/gracias_02.jpg", pie: "" },
    { foto: "images/gracias_03.jpg", pie: "" }
  ],

  /* 12 — El regalo: la foto especial */
  regalo: "images/especial.jpg"
};
