/* ============================================================
   🌷 Un pequeño jardín para ti — lógica
   No hace falta editar este archivo:
   los textos están en textos.js y las fotos en fotos.js
   ============================================================ */
(() => {
  'use strict';

  const T = window.TEXTOS || {};
  const F = window.FOTOS || {};
  const $  = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reducido = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const movil = matchMedia('(max-width: 720px)').matches;
  const esperar = ms => new Promise(r => setTimeout(r, reducido ? Math.min(ms, 120) : ms));
  const texto = s => String(s ?? '')
    .replaceAll('{nombre}', T.nombre || '')
    .replaceAll('{edad}', T.edad || '')
    .replaceAll('{anios}', T.anios || '');
  const leer = (obj, ruta) => ruta.split('.').reduce((o, k) => (o == null ? o : o[k]), obj);
  const azar = semilla => { let s = semilla; return () => (s = (s * 16807) % 2147483647) / 2147483647; };

  const COLORES = {
    rosa:    ['#f3c3ca', '#e5a5af', '#fbe1e4'],
    crema:   ['#fbeedd', '#ebd3b9', '#fff8ef'],
    blanco:  ['#fffaf3', '#e9dfd4', '#ffffff'],
    durazno: ['#f6d0c2', '#e8b09c', '#fde7dd'],
    lila:    ['#ead3e2', '#d4b0c7', '#f7e9f1']
  };
  const NOMBRES_COLOR = Object.keys(COLORES);
  const PETALOS = ['#f4c7cd', '#f7d8dc', '#fbe9e4', '#f1d1c4', '#fffaf3'];
  const colorVars = c => { const [f, o, l] = COLORES[c]; return `--t-flor:${f};--t-osc:${o};--t-luz:${l};`; };

  function tulipanHTML({ h, color = 'rosa', x = 0, z = 1, r = 2, d = 6, delay = 0, clase = '', espera = 0 }) {
    return `<svg class="tulipan baila ${clase}" viewBox="0 0 60 160" aria-hidden="true" style="left:${x}%;z-index:${z};--h:${h};${colorVars(color)}--r:${r}deg;--d:${d}s;--delay:${delay}s;--espera:${espera}s"><use href="#tulipan"/></svg>`;
  }

  /* ============ 1. Fotos ============ */

  // Ilustraciones de los conejitos que pueden usarse en lugar de una foto
  function dibujoHTML(nombre) {
    const conejos = (sep, flor, escala, al_lado = false) => {
      const tulipan = `<svg class="d-flor" viewBox="0 0 60 160" style="${colorVars(flor)}--f:${escala}"><use href="#tulipan"/></svg>`;
      return `<div class="dibujo" style="--sep:${sep}">
        <svg class="d-conejo" viewBox="0 0 130 150"><use href="#ella"/></svg>
        ${al_lado ? '' : tulipan}
        <svg class="d-conejo espejo" viewBox="0 0 130 150"><use href="#el"/></svg>
        ${al_lado ? tulipan : ''}
      </div>`;
    };
    const anio = /^anio-(\d+)$/.exec(nombre);
    if (anio) {
      const n = Number(anio[1]);
      const colores = ['blanco', 'crema', 'durazno', 'lila', 'rosa', 'crema', 'rosa'];
      return conejos((26 - n * 3.5) + '%', colores[(n - 1) % 7], (.5 + n * .07).toFixed(2));
    }
    const fijos = {
      'pareja':     () => conejos('0%', 'rosa', 1, true),
      'comienzo-1': () => conejos('24%', 'blanco', .45),
      'comienzo-2': () => conejos('9%', 'crema', .7),
      'comienzo-3': () => conejos('0%', 'rosa', 1, true)
    };
    if (fijos[nombre]) return fijos[nombre]();
    if (['perro', 'gato', 'pajarito', 'ella', 'el'].includes(nombre)) {
      const vista = nombre === 'pajarito' ? '0 0 60 50' : '0 0 130 150';
      return `<div class="dibujo solo"><svg class="d-conejo" viewBox="${vista}"><use href="#${nombre}"/></svg></div>`;
    }
    return '';
  }

  function ponerFoto(contenedor, src, alt = '', alFaltar = null) {
    contenedor.classList.add('foto');
    if (src && src.startsWith('dibujo:')) {
      contenedor.classList.add('dibujo-animal', 'con-dibujo');
      contenedor.innerHTML = dibujoHTML(src.slice(7));
      return;
    }
    if (!src) { contenedor.classList.add('sin-foto'); contenedor.dataset.archivo = '(sin archivo)'; if (alFaltar) alFaltar(); return; }
    const img = new Image();
    img.alt = alt;
    img.decoding = 'async';
    img.loading = 'lazy';
    img.onerror = () => {
      img.remove();
      contenedor.classList.add('sin-foto');
      contenedor.dataset.archivo = src.split('/').pop();
      if (alFaltar) alFaltar();
    };
    img.src = src;
    contenedor.appendChild(img);
  }

  function crearPolaroid(src, pie = '', { cinta = true, giro = 0 } = {}) {
    const fig = document.createElement('figure');
    fig.className = 'polaroid';
    if (giro) fig.style.setProperty('--giro', giro + 'deg');
    if (cinta) fig.insertAdjacentHTML('beforeend', `<span class="cinta${Math.random() > .5 ? ' salvia' : ''}"></span>`);
    const foto = document.createElement('div');
    fig.appendChild(foto);
    if (src !== null) ponerFoto(foto, src, pie);
    else foto.className = 'foto';
    if (pie) {
      const cap = document.createElement('figcaption');
      cap.className = 'pie';
      cap.textContent = texto(pie);
      fig.appendChild(cap);
    }
    return fig;
  }

  function hacerTocable(el, etiqueta, alAbrir) {
    el.classList.add('tocable');
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
    el.setAttribute('aria-label', etiqueta);
    el.addEventListener('click', alAbrir);
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); alAbrir(); } });
  }

  /* ============ 2. Textos sueltos ============ */

  $$('[data-text]').forEach(el => {
    const v = leer(T, el.dataset.text);
    if (v == null || v === '') { el.remove(); return; }
    el.textContent = texto(v);
  });
  $$('[data-foto]').forEach(el => ponerFoto(el, leer(F, el.dataset.foto)));

  /* ============ 3. Relatos: frases que aparecen una a una ============ */

  const cola = [];
  let procesando = false;

  const obsFrase = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      obsFrase.unobserve(e.target);
      cola.push(e.target);
    });
    cola.sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    procesarCola();
  }, { threshold: .5, rootMargin: '0px 0px -10% 0px' });

  async function procesarCola() {
    if (procesando) return;
    procesando = true;
    while (cola.length) {
      const el = cola.shift();
      const yaPaso = el.getBoundingClientRect().bottom < 0;
      if (!yaPaso && el.dataset.pausa) await esperar(900 * Number(el.dataset.pausa));
      mostrarFrase(el);
      if (!yaPaso) await esperar(el.classList.contains('grande') ? 1100 : 650);
    }
    procesando = false;
  }

  function mostrarFrase(el) {
    el.classList.add('ver');
    if (el.dataset.evento) document.dispatchEvent(new CustomEvent('relato:' + el.dataset.evento));
  }

  // Convierte una lista de frases en elementos. Devuelve las frases creadas.
  function construirRelato(cont, lineas, fotos, { observar = true } = {}) {
    const creadas = [];
    let pausas = 0;
    let siguienteFoto = 0;
    (lineas || []).forEach(item => {
      const t = typeof item === 'object' ? item.texto : item;
      const evento = typeof item === 'object' ? item.evento : null;

      if (t === '') {
        pausas++;
        cont.insertAdjacentHTML('beforeend', '<div class="pausa" aria-hidden="true"></div>');
        return;
      }
      const marca = /^\[(\w+)(?:\s+(\d+))?\]$/.exec(t.trim());
      if (marca && marca[1] === 'foto') {
        const n = marca[2] ? Number(marca[2]) - 1 : siguienteFoto;
        siguienteFoto = n + 1;
        const d = Array.isArray(fotos) ? fotos[n] : fotos;
        if (!d) return;
        const envoltura = document.createElement('div');
        envoltura.className = 'foto-relato revelar';
        envoltura.dataset.anim = 'zoom';
        envoltura.appendChild(crearPolaroid(typeof d === 'string' ? d : d.foto, d.pie));
        cont.appendChild(envoltura);
        return;
      }
      if (marca) {
        const bloque = document.getElementById('bloque-' + marca[1]);
        if (bloque) cont.appendChild(bloque);
        return;
      }
      const p = document.createElement('p');
      p.className = 'frase';
      let contenido = t;
      if (t.startsWith('# ')) { p.classList.add('grande'); contenido = t.slice(2); }
      else if (t.startsWith('~ ')) { p.classList.add('mano'); contenido = t.slice(2); }
      p.textContent = texto(contenido);
      if (pausas) p.dataset.pausa = pausas;
      if (evento) p.dataset.evento = evento;
      pausas = 0;
      cont.appendChild(p);
      creadas.push(p);
      if (observar) obsFrase.observe(p);
    });
    return creadas;
  }

  $$('[data-relato]').forEach(cont =>
    construirRelato(cont, leer(T, cont.dataset.relato), cont.dataset.fotos ? leer(F, cont.dataset.fotos) : null));

  // Relatos que se muestran por tiempo (no por scroll)
  async function relatoPorTiempo(frases) {
    for (const f of frases) {
      if (f.dataset.pausa) await esperar(1300 * Number(f.dataset.pausa));
      mostrarFrase(f);
      await esperar(f.classList.contains('grande') ? 1400 : 1000);
    }
  }

  /* ============ 4. Portada ============ */

  const portadaLineas = $('#portada-lineas');
  (T.portada.lineas || []).forEach((t, i) => {
    const el = document.createElement(i === 0 ? 'h1' : 'p');
    el.className = `linea l${i}`;
    el.textContent = texto(t);
    portadaLineas.appendChild(el);
  });

  /* ============ 5. Introducción: los conejitos miran la foto ============ */

  const fotoIntro = $('.introduccion .foto-relato');
  if (fotoIntro) {
    fotoIntro.insertAdjacentHTML('beforeend',
      `<div class="mirando izq conejo llega" style="--retraso:1.4s"><svg viewBox="0 0 130 150"><use href="#ella"/></svg></div>
       <div class="mirando der conejo llega" style="--retraso:1.8s;--dir:-1"><svg viewBox="0 0 130 150" class="espejo"><use href="#el"/></svg></div>`);
  }

  /* ============ 6. Capítulo I: recuerdos físicos + enredadera ============ */

  const album = $('#album');
  const giros = [-2.6, 2.2, -1.6, 2.8, -2.2, 1.8];
  const velocidades = [.07, -.05, .09, -.06];

  (F.comienzo || []).forEach((r, i) => {
    const lado = i % 2 ? 'der' : 'izq';
    const art = document.createElement('article');
    art.className = `recuerdo ${lado}`;
    art.style.setProperty('--giro', giros[i % giros.length] + 'deg');

    const capa = document.createElement('div');
    capa.className = 'capa-foto revelar';
    capa.dataset.anim = ['izq', 'der', 'zoom', 'giro'][i % 4];
    if (r.numero) capa.insertAdjacentHTML('beforeend', `<span class="numero"></span>`), $('.numero', capa).textContent = texto(r.numero);

    const paralaje = document.createElement('div');
    paralaje.dataset.vel = velocidades[i % velocidades.length] * (movil ? .5 : 1);
    paralaje.appendChild(crearPolaroid(r.foto, '', { cinta: true }));
    capa.appendChild(paralaje);

    const nota = document.createElement('div');
    nota.className = 'nota revelar';
    nota.style.transitionDelay = '.4s';
    if (r.anio) nota.insertAdjacentHTML('beforeend', '<p class="anio"></p>'), $('.anio', nota).textContent = texto(r.anio);
    nota.insertAdjacentHTML('beforeend', '<h3></h3>');
    $('h3', nota).textContent = texto(r.titulo);
    if (r.texto) { const p = document.createElement('p'); p.textContent = texto(r.texto); nota.appendChild(p); }

    art.append(capa, nota);
    album.appendChild(art);
  });

  /* ============ 7. Capítulo II: línea del tiempo con un tulipán por año ============ */

  const lineaTiempo = $('#linea-tiempo');
  (F.crecer || []).forEach((a, i) => {
    const el = document.createElement('div');
    el.className = 'anio-crecer revelar';
    el.dataset.anim = 'fade';
    el.style.setProperty('--giro', (i % 2 ? 1.8 : -1.8) + 'deg');
    const color = NOMBRES_COLOR[i % NOMBRES_COLOR.length];
    el.innerHTML = `<svg class="nodo tulipan crece" viewBox="0 0 60 160" aria-hidden="true" style="${colorVars(color)}--espera:.2s"><use href="#tulipan"/></svg>
      <p class="etiqueta-anio"></p>`;
    const etiqueta = $('.etiqueta-anio', el);
    etiqueta.textContent = texto(a.etiqueta);
    if (a.anio) { const s = document.createElement('small'); s.textContent = texto(a.anio); etiqueta.appendChild(s); }
    if (a.foto) el.appendChild(crearPolaroid(a.foto, '', { cinta: false }));
    else el.classList.add('solo-texto');
    if (a.texto) { const p = document.createElement('p'); p.className = 'texto-anio'; p.textContent = texto(a.texto); el.appendChild(p); }
    lineaTiempo.appendChild(el);
  });

  /* ============ 8. Días difíciles: el tulipán que se levanta ============ */

  document.addEventListener('relato:levantarse', () => {
    const escena = $('#bloque-escena');
    if (escena) escena.classList.add('levantado');
  });

  /* ============ 9. Lo bonito: collage ============ */

  const collage = $('#collage');
  const girosCollage = [-3, 2.4, -1.6, 3.2, -2.4, 1.8];
  (F.bonitos || []).forEach((b, i) => {
    const pieza = document.createElement('div');
    pieza.className = 'pieza revelar';
    pieza.dataset.anim = ['giro', 'zoom', 'izq', 'der', 'zoom', 'giro'][i % 6];
    pieza.style.transitionDelay = (i % 2) * .25 + 's';
    if (b.foto) {
      const pol = crearPolaroid(b.foto, b.texto, { giro: girosCollage[i % girosCollage.length] });
      hacerTocable(pol, 'Abrir recuerdo', () => abrirVisor({
        fotos: [b.foto], titulo: b.texto, detalle: b.detalle || '', origen: pol
      }));
      pieza.appendChild(pol);
    } else {
      const nota = document.createElement('div');
      nota.className = 'notita';
      nota.style.setProperty('--giro', girosCollage[i % girosCollage.length] + 'deg');
      nota.innerHTML = `<span class="cinta${i % 2 ? ' salvia' : ''}"></span><p></p>`;
      $('p', nota).textContent = texto(b.texto);
      pieza.appendChild(nota);
    }
    if (i % 3 === 1) {
      const c = NOMBRES_COLOR[(i + 2) % NOMBRES_COLOR.length];
      pieza.insertAdjacentHTML('beforeend',
        `<svg class="pegatina" viewBox="0 0 60 160" aria-hidden="true" style="${colorVars(c)};${i % 2 ? 'right:-8px' : 'left:-8px'};bottom:-22px;transform:rotate(${i % 2 ? 18 : -18}deg)"><use href="#tulipan"/></svg>`);
    }
    collage.appendChild(pieza);
  });

  /* ============ 10. Tú: las versiones ============ */

  const pila = $('#pila');
  const fotosTu = F.tu || [];
  fotosTu.forEach((src, i) => {
    const pol = crearPolaroid(src, '', { cinta: false, giro: [-3, 2.5, -1.5, 3][i % 4] });
    if (i === 0) pol.classList.add('activa');
    pila.appendChild(pol);
  });
  const lista = $('#versiones-lista');
  (T.tu.versiones || []).forEach(v => {
    const p = document.createElement('p');
    p.className = 'version';
    p.textContent = texto(v);
    lista.appendChild(p);
  });
  const versiones = $$('.version', lista);
  const obsVersion = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      versiones.forEach(v => v.classList.toggle('activa', v === e.target));
      const i = versiones.indexOf(e.target);
      const fotos = $$('.polaroid', pila);
      fotos.forEach((f, k) => f.classList.toggle('activa', k === i % fotos.length));
    });
  }, { rootMargin: movil ? '-58% 0px -22% 0px' : '-42% 0px -42% 0px' });
  versiones.forEach(v => obsVersion.observe(v));

  /* ============ 10b. Animalitos escondidos por el jardín ============ */

  const VISTA = { perro: '0 0 130 150', gato: '0 0 130 150', pajarito: '0 0 60 50', ella: '0 0 130 150' };
  const dibujoAnimal = (tipo, espejo = false) =>
    `<svg viewBox="${VISTA[tipo]}" class="${espejo ? 'espejo' : ''}" aria-hidden="true"><use href="#${tipo}"/></svg>`;

  $$('[data-animal]').forEach(el => {
    el.innerHTML = dibujoAnimal(el.dataset.animal, el.hasAttribute('data-espejo'));
    el.setAttribute('role', 'img');
    el.setAttribute('aria-label', { perro: 'un perrito', gato: 'un gatito', pajarito: 'un pajarito' }[el.dataset.animal]);
    el.addEventListener('click', () => {
      el.classList.remove('salta');
      void el.offsetWidth;
      el.classList.add('salta');
      const [x, y] = centro(el);
      rafaga(x, y - 10, 5, { chispas: 3, fuerza: .45 });
    });
  });

  /* ============ 10c. Ese corazón tuyo 🐾 ============ */

  const corazonTuyo = $('#corazon-tuyo');
  const dibujos = ['perro', 'gato', 'perro', 'pajarito', 'ella'];
  (F.animales || []).forEach((a, i) => {
    const pieza = document.createElement('figure');
    pieza.className = `pieza-animal ${i % 2 ? 'der' : 'izq'} revelar`;
    pieza.dataset.anim = i % 2 ? 'der' : 'izq';
    const pol = crearPolaroid(null, '', { giro: i % 2 ? 2.4 : -2.4 });
    const foto = $('.foto', pol);
    foto.classList.remove('sin-foto');
    ponerFoto(foto, a.foto || '', a.texto, () => {
      // Si todavía no hay foto, aparece una ilustración del animalito
      pol.classList.add('ilustracion');
      foto.className = 'foto dibujo-animal';
      foto.innerHTML = dibujoAnimal(dibujos[i % dibujos.length], i % 2 === 1) +
        `<svg class="flor-dibujo" viewBox="0 0 60 160" aria-hidden="true" style="${colorVars(NOMBRES_COLOR[i % NOMBRES_COLOR.length])}"><use href="#tulipan"/></svg>`;
    });
    const cap = document.createElement('figcaption');
    cap.className = 'texto-animal';
    cap.textContent = texto(a.texto);
    pieza.append(pol, cap);
    corazonTuyo.appendChild(pieza);
  });

  /* ============ 11. Los 7 años ============ */

  const fila = $('#fila-siete');
  const anios = F.anios || [];
  const vistos = new Set();
  const contador = $('#contador-siete');
  const actualizarContador = () => {
    if (vistos.size >= anios.length && anios.length) {
      contador.textContent = texto(T.siete.completo);
      contador.classList.add('completo');
      $('#pista-siete')?.remove();
    } else if (vistos.size) {
      contador.textContent = texto(T.siete.contador).replace('{n}', vistos.size);
    }
  };
  anios.forEach((a, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'tulipan-anio';
    b.setAttribute('aria-label', `Año ${i + 1}: ${texto(a.titulo)}`);
    b.style.cssText = `--alto:${56 + (i / Math.max(1, anios.length - 1)) * 44}%;--d:${5 + (i % 3)}s;--delay:${-i * .7}s`;
    b.innerHTML = `<svg viewBox="0 0 60 160" aria-hidden="true" style="${colorVars(['blanco', 'crema', 'durazno', 'lila', 'rosa', 'crema', 'rosa'][i % 7])}"><use href="#tulipan"/></svg><span class="num">${i + 1}</span>`;
    b.addEventListener('click', () => {
      const [x, y] = centro($('svg', b));
      rafaga(x, y - 30, 8, { chispas: 5, fuerza: .7 });
      vistos.add(i);
      b.classList.add('visto');
      $('svg', b).setAttribute('style', colorVars('rosa'));
      abrirVisor({
        fotos: a.fotos || [],
        sobre: `Año ${i + 1}${a.anio ? ' · ' + texto(a.anio) : ''}`,
        titulo: a.titulo,
        detalle: a.texto,
        origen: $('svg', b),
        alCerrar: actualizarContador
      });
    });
    fila.appendChild(b);
  });

  /* ============ 12. Los 24 años ============ */

  const escena24 = $('#escena-24');
  const macizo24 = $('#macizo-24');
  $('#numero-24').textContent = T.edad;
  (() => {
    const r = azar(24);
    const n = Number(T.edad) || 24;
    const nuestros = Number(T.anios) || 7;
    let html = '';
    for (let i = 0; i < n; i++) {
      const x = 1 + (i / (n - 1)) * 94 + (r() * 2 - 1);
      const h = 95 + i * 3 + r() * 40;
      const color = NOMBRES_COLOR[Math.floor(r() * NOMBRES_COLOR.length)];
      html += tulipanHTML({
        h: Math.round(h), color, x: x.toFixed(1), z: 1 + (i % 3), r: 1.5 + r() * 2, d: 5 + r() * 3, delay: -r() * 5,
        clase: 'crece' + (i >= n - nuestros ? ' nuestro' : ''), espera: (i * .16).toFixed(2)
      });
    }
    macizo24.innerHTML = html;
  })();
  new IntersectionObserver((entradas, obs) => {
    if (!entradas[0].isIntersecting) return;
    obs.disconnect();
    escena24.classList.add('empieza');
    setTimeout(() => macizo24.classList.add('florecer'), reducido ? 0 : 2600);
  }, { threshold: .6 }).observe(escena24);
  document.addEventListener('relato:siete', () => macizo24.classList.add('resaltar'));

  /* ============ 13. Decoración: ramos, macizos, pasto, pétalos, luces ============ */

  const ramos = {
    izq: [[210, 'rosa', 4], [260, 'crema', 18], [175, 'durazno', 32], [230, 'blanco', 46], [150, 'rosa', 62]],
    der: [[160, 'lila', 22], [235, 'rosa', 36], [185, 'blanco', 52], [270, 'durazno', 66], [205, 'rosa', 82]]
  };
  $$('[data-ramo]').forEach(el => {
    const r = azar(el.dataset.ramo === 'izq' ? 7 : 13);
    el.innerHTML = ramos[el.dataset.ramo].map(([h, color, x]) =>
      tulipanHTML({ h, color, x, z: Math.round((300 - h) / 40), r: 1.5 + r() * 2, d: 5 + r() * 3, delay: -r() * 6 })).join('');
  });

  // Jardín final: florece tulipán por tulipán
  (() => {
    const cont = $('#macizo-final');
    const r = azar(99);
    const n = movil ? 22 : 36;
    let html = '';
    const orden = Array.from({ length: n }, (_, i) => i).sort(() => r() - .5);
    for (let i = 0; i < n; i++) {
      const x = (i / n) * 100 + r() * (100 / n) - 3;
      const h = 150 + r() * 170;
      const color = NOMBRES_COLOR[Math.floor(r() * NOMBRES_COLOR.length)];
      html += tulipanHTML({ h: Math.round(h), color, x: x.toFixed(1), z: Math.round((400 - h) / 80), r: 1.5 + r() * 2.5, d: 4.5 + r() * 3.5, delay: -r() * 6, clase: 'crece', espera: (orden[i] * .12).toFixed(2) });
    }
    cont.insertAdjacentHTML('afterbegin', html);
  })();

  // Siete tulipanes pequeños antes del octavo
  (() => {
    const fila8 = $('#fila-ocho');
    const n = Number(T.anios) || 7;
    let html = '';
    for (let i = 0; i < n; i++) {
      html += `<svg class="tulipan crece" viewBox="0 0 60 160" aria-hidden="true" style="${colorVars(['blanco', 'crema', 'durazno', 'lila', 'rosa', 'crema', 'rosa'][i % 7])}height:${90 + i * 9}px;--espera:${(i * .45).toFixed(2)}s"><use href="#tulipan"/></svg>`;
    }
    fila8.insertAdjacentHTML('afterbegin', html);
  })();

  $$('[data-pasto]').forEach(el => {
    const r = azar(Number(el.dataset.pasto) * 31);
    const capa = (color, alto, paso) => {
      let d = 'M0 80';
      for (let x = 0; x < 1000; x += paso) {
        const h = alto * (.45 + r() * .55);
        const punta = x + paso / 2 + (r() * 6 - 3);
        d += ` Q${x + paso * .3} ${80 - h * .45} ${punta.toFixed(1)} ${(80 - h).toFixed(1)} Q${x + paso * .7} ${80 - h * .45} ${x + paso} 80`;
      }
      return `<path d="${d} V80 H0 Z" fill="${color}"/>`;
    };
    el.innerHTML = `<svg viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true">${capa('#c7d4b8', 70, 14)}${capa('#aebf9d', 52, 11)}${capa('#97aa87', 30, 9)}</svg>`;
  });

  $$('[data-petalos]').forEach((el, j) => {
    const r = azar(5 + j * 17);
    const n = Math.round(Number(el.dataset.petalos) * (movil ? .55 : 1));
    let html = '';
    for (let i = 0; i < n; i++) {
      const d = 14 + r() * 12;
      html += `<span class="petalo" style="--x:${(r() * 100).toFixed(1)}%;--s:${(10 + r() * 10).toFixed(0)}px;--d:${d.toFixed(1)}s;--delay:${(-r() * d).toFixed(1)}s;--dx:${(r() * 120 - 60).toFixed(0)}px;--p:${PETALOS[i % PETALOS.length]}"><svg viewBox="0 0 20 26"><use href="#petalo"/></svg></span>`;
    }
    el.innerHTML = html;
  });

  $$('[data-luces]').forEach((el, j) => {
    const r = azar(3 + j * 11);
    const n = Math.round(Number(el.dataset.luces) * (movil ? .6 : 1));
    let html = '';
    for (let i = 0; i < n; i++) {
      html += `<span class="luz" style="--x:${(r() * 100).toFixed(1)}%;--y:${(8 + r() * 75).toFixed(1)}%;--s:${(4 + r() * 7).toFixed(0)}px;--d:${(4 + r() * 5).toFixed(1)}s;--delay:${(-r() * 8).toFixed(1)}s"></span>`;
    }
    el.innerHTML = html;
  });

  $$('.huellitas').forEach(el => {
    el.innerHTML = Array.from({ length: 5 }, (_, i) =>
      `<svg class="huella" style="--i:${i}" viewBox="0 0 24 26" aria-hidden="true"><use href="#huella"/></svg>`).join('');
  });

  // Un brote que crece sobre cada título de capítulo
  $$('.cabecera').forEach((c, i) => {
    c.insertAdjacentHTML('afterbegin',
      `<svg class="brote tulipan crece" viewBox="0 0 60 160" aria-hidden="true" style="${colorVars(NOMBRES_COLOR[i % NOMBRES_COLOR.length])}"><use href="#tulipan"/></svg>`);
  });

  /* ============ 14. Pastel: velas con forma de 24 ============ */

  (() => {
    const numero = String(T.edad || 24);
    const ancho = 44;
    const inicio = 150 - ((numero.length - 1) * ancho) / 2;
    let velas = '';
    [...numero].forEach((dig, i) => {
      const x = inicio + i * ancho;
      const yLlama = 64;
      velas += `<g class="vela">
        <ellipse class="halo" cx="${x}" cy="${yLlama - 8}" rx="26" ry="28" fill="url(#g-halo)"/>
        <text class="vela-num" x="${x}" y="122" text-anchor="middle" font-size="62" fill="url(#rayas)" stroke="#ead3c4" stroke-width="1">${dig}</text>
        <line x1="${x}" y1="${yLlama + 6}" x2="${x}" y2="${yLlama + 1}" stroke="#6b5146" stroke-width="1.4" stroke-linecap="round"/>
        <path class="llama" d="M${x} ${yLlama - 20} C${x + 6} ${yLlama - 10} ${x + 7} ${yLlama - 3} ${x} ${yLlama + 2} C${x - 7} ${yLlama - 3} ${x - 6} ${yLlama - 10} ${x} ${yLlama - 20} Z" fill="url(#g-llama)"/>
        <g class="humo" fill="#e9dfe3"><circle cx="${x}" cy="${yLlama - 6}" r="2.2"/><circle cx="${x - 1}" cy="${yLlama - 10}" r="1.8"/><circle cx="${x + 1}" cy="${yLlama - 14}" r="1.5"/></g>
      </g>`;
    });
    $('#velas').innerHTML = velas;

    let perlas = '';
    for (let x = 58; x <= 242; x += 11.5) perlas += `<circle cx="${x}" cy="289" r="3.3" fill="#fffaf3" stroke="#e8d6c8" stroke-width=".6"/>`;
    for (let x = 90; x <= 210; x += 10) perlas += `<circle cx="${x}" cy="196" r="2.8" fill="#fbeee4" stroke="#e8d6c8" stroke-width=".6"/>`;
    $('#perlas').innerHTML = perlas;

    $('#flores-pastel').innerHTML = [[64, 'rosa'], [104, 'crema'], [144, 'durazno'], [184, 'rosa'], [224, 'lila']]
      .map(([x, c], i) => `<use href="#tulipan" x="${x}" y="${238 + (i % 2) * 6}" width="14" height="38" style="${colorVars(c)}"/>`).join('');

    const g = $('#guirnalda');
    g.innerHTML = `<svg viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path d="M0 4 Q25 40 50 4 Q75 40 100 4" fill="none" stroke="#a88e86" stroke-width="1" vector-effect="non-scaling-stroke"/></svg>`;
    const porCurva = movil ? 6 : 9;
    for (let c = 0; c < 2; c++) {
      for (let k = 1; k < porCurva; k++) {
        const t = k / porCurva;
        const y = (1 - t) * (1 - t) * 4 + 2 * (1 - t) * t * 40 + t * t * 4;
        const foco = document.createElement('span');
        foco.className = 'foco';
        foco.style.cssText = `left:${c * 50 + 50 * t}%;top:${(y / 40) * 100}%;--delay:${(-(k * .7 + c) % 3).toFixed(1)}s`;
        g.appendChild(foco);
      }
    }
  })();

  construirRelato($('#lineas-pastel'), T.pastel.lineas.map((l, i) => (i === T.pastel.lineas.length - 1 ? '# ' + l : l)));

  /* ============ 15. Carta ============ */

  construirRelato($('#lineas-carta'), (T.carta.intro || []).map((l, i, a) => (i === a.length - 1 ? l : '~ ' + l)));
  const llenarCuerpo = (cont, parrafos) => (parrafos || []).forEach(t => {
    const p = document.createElement('p');
    p.className = 'parrafo';
    p.textContent = texto(t);
    cont.appendChild(p);
  });
  llenarCuerpo($('#cuerpo-carta'), T.carta.parrafos);
  if (T.carta.cartaCompleta && T.carta.cartaCompleta.length) llenarCuerpo($('#cuerpo-carta-2'), T.carta.cartaCompleta);
  else $('#papel-2').remove();

  /* ============ 16. Efectos: pétalos, chispas, confeti ============ */

  const capaEfectos = $('#efectos');
  const centro = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  function rafaga(x, y, n = 14, { chispas = 0, fuerza = 1 } = {}) {
    if (reducido) return;
    const piezas = [];
    const crear = (clase, html, tam) => {
      const el = document.createElement('span');
      el.className = clase;
      if (html) el.innerHTML = html;
      el.style.width = tam + 'px';
      capaEfectos.appendChild(el);
      return el;
    };
    for (let i = 0; i < n; i++) {
      piezas.push([crear('', `<svg viewBox="0 0 20 26" style="display:block;width:100%;--p:${PETALOS[i % PETALOS.length]}"><use href="#petalo"/></svg>`, 10 + Math.random() * 10), 1]);
    }
    for (let i = 0; i < chispas; i++) piezas.push([crear('chispa', '', 6 + Math.random() * 6), .7]);
    piezas.forEach(([el, peso]) => {
      const ang = Math.random() * Math.PI * 2;
      const dist = (70 + Math.random() * 150) * fuerza;
      const dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist * .8;
      const giro = Math.random() * 540 - 270;
      el.animate([
        { transform: `translate(${x}px, ${y}px) rotate(0) scale(.3)`, opacity: 0 },
        { transform: `translate(${x + dx * .6}px, ${y + dy * .6}px) rotate(${giro * .4}deg) scale(1)`, opacity: 1, offset: .25 },
        { transform: `translate(${x + dx}px, ${y + dy + 110 * peso}px) rotate(${giro}deg) scale(.9)`, opacity: 0 }
      ], { duration: 1800 + Math.random() * 1300, easing: 'cubic-bezier(.2,.7,.3,1)', fill: 'forwards' }).onfinish = () => el.remove();
    });
  }

  function confeti(x, y, n = movil ? 22 : 34) {
    if (reducido) return;
    const colores = ['#f3c3ca', '#fbeedd', '#b5c6a5', '#ead3e2', '#f6d0c2', '#fffaf3'];
    for (let i = 0; i < n; i++) {
      const el = document.createElement('span');
      el.className = 'confeti';
      el.style.background = colores[i % colores.length];
      capaEfectos.appendChild(el);
      const dx = (Math.random() - .5) * 300;
      const alto = 130 + Math.random() * 150;
      el.animate([
        { transform: `translate(${x}px, ${y}px) rotate(0)`, opacity: 1 },
        { transform: `translate(${x + dx * .6}px, ${y - alto}px) rotate(${Math.random() * 360}deg)`, opacity: 1, offset: .35 },
        { transform: `translate(${x + dx}px, ${y + 160}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], { duration: 2600 + Math.random() * 1200, easing: 'cubic-bezier(.25,.6,.35,1)', fill: 'forwards' }).onfinish = () => el.remove();
    }
  }

  /* ============ 17. Aparición al hacer scroll ============ */

  const obsRevelar = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('visible');
      obsRevelar.unobserve(e.target);
    });
  }, { threshold: .15, rootMargin: '0px 0px -8% 0px' });
  const observar = (raiz = document) =>
    $$('.revelar, .historia .conejo.llega, .huellitas, .brote, .historia .animalito, .escena-animales', raiz).forEach(el => obsRevelar.observe(el));
  observar();

  const obsAmbiente = new IntersectionObserver(entradas => {
    entradas.forEach(e => e.target.classList.toggle('en-pantalla', e.isIntersecting));
  });
  $$('.ambiente').forEach(el => obsAmbiente.observe(el));

  function desbloquear(sel) {
    const el = $(sel);
    if (!el || !el.classList.contains('oculto')) return;
    el.classList.remove('oculto');
    observar(el);
    medir();
  }

  /* ============ 18. Parallax, enredadera y tallo que crece ============ */

  const capasParallax = $$('[data-vel]');
  const svgEnredadera = $('#enredadera');
  const camino = $('path', svgEnredadera);
  const grupoHojas = $('.hojas', svgEnredadera);
  let largo = 0;
  let hojas = [];

  function trazarEnredadera() {
    const w = album.offsetWidth, h = album.offsetHeight;
    if (!w || !h) return;
    svgEnredadera.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const puntos = [[w / 2, 0], ...$$('.recuerdo', album).map((a, i) => [w * (i % 2 ? .82 : .18), a.offsetTop + a.offsetHeight / 2]), [w / 2, h]];
    let d = `M${puntos[0][0]} ${puntos[0][1]}`;
    for (let i = 1; i < puntos.length; i++) {
      const [x0, y0] = puntos[i - 1], [x1, y1] = puntos[i];
      const m = (y1 - y0) / 2;
      d += ` C${x0} ${y0 + m} ${x1} ${y1 - m} ${x1} ${y1}`;
    }
    camino.setAttribute('d', d);
    largo = camino.getTotalLength();
    camino.style.strokeDasharray = largo;
    let html = '';
    const posiciones = [];
    for (let l = 60, k = 0; l < largo - 30; l += 70, k++) {
      const p = camino.getPointAtLength(l), q = camino.getPointAtLength(l + 1);
      const ang = Math.atan2(q.y - p.y, q.x - p.x) * 180 / Math.PI + (k % 2 ? 50 : -50);
      html += `<use href="#hojita" class="hoja" width="18" height="11" y="-5.5" transform="translate(${p.x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${ang.toFixed(0)})"/>`;
      posiciones.push(l);
    }
    grupoHojas.innerHTML = html;
    hojas = $$('.hoja', grupoHojas).map((el, i) => [el, posiciones[i]]);
  }

  function alHacerScroll() {
    const vh = innerHeight;
    if (!reducido) {
      capasParallax.forEach(el => {
        const r = el.parentElement.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        el.style.transform = `translate3d(0, ${(-(r.top + r.height / 2 - vh / 2) * el.dataset.vel).toFixed(1)}px, 0)`;
      });
    }
    if (largo) {
      const r = album.getBoundingClientRect();
      const hecho = largo * Math.min(1, Math.max(0, (vh * .75 - r.top) / r.height));
      camino.style.strokeDashoffset = largo - hecho;
      hojas.forEach(([el, l]) => el.classList.toggle('ver', l < hecho));
    }
    const rt = lineaTiempo.getBoundingClientRect();
    if (rt.top < vh && rt.bottom > 0) {
      lineaTiempo.style.setProperty('--progreso', Math.min(1, Math.max(0, (vh * .7 - rt.top) / rt.height)).toFixed(3));
    }
  }

  let pendiente = false;
  addEventListener('scroll', () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(() => { alHacerScroll(); pendiente = false; });
  }, { passive: true });
  function medir() { trazarEnredadera(); alHacerScroll(); }
  let tMedir;
  addEventListener('resize', () => { clearTimeout(tMedir); tMedir = setTimeout(medir, 200); });
  addEventListener('load', medir);
  if (document.fonts) document.fonts.ready.then(medir);

  /* ============ 20. Portada → entrar al jardín ============ */

  const portada = $('#portada');
  let dentro = false;

  (async () => {
    await Promise.race([document.fonts ? document.fonts.ready : null, esperar(1500)]);
    await esperar(500);
    for (const [i, l] of $$('.linea', portadaLineas).entries()) {
      l.classList.add('ver');
      await esperar(i === 0 ? 2000 : 2300);
    }
    $('.conejo-portada').classList.add('visible');
    setTimeout(() => $('.portada-ave').classList.add('visible'), 1600);
    await esperar(700);
    $('#entrar').classList.add('ver');
  })();

  $('#entrar').addEventListener('click', async () => {
    if (dentro) return;
    dentro = true;
    const [x, y] = centro($('#entrar'));
    rafaga(x, y, 16, { chispas: 8 });
    portada.classList.add('entrando');
    const velo = $('#velo');
    velo.style.setProperty('--x', x + 'px');
    velo.style.setProperty('--y', y + 'px');
    await esperar(550);
    velo.classList.add('cubre');
    await esperar(1350);
    document.body.classList.remove('bloqueado');
    medir();
    $('#introduccion').scrollIntoView({ behavior: 'instant', block: 'start' });
    await esperar(300);
    velo.classList.add('sale');
    await esperar(1500);
    velo.remove();
  });

  /* ============ 21. Visor de recuerdos (una o varias fotos) ============ */

  const visor = $('#visor');
  const visorPolaroid = $('#visor-polaroid');
  const pistaFotos = $('#pista-fotos');
  const puntos = $('#puntos');
  let indice = 0, total = 0, origen = null, alCerrarVisor = null;

  function irA(i) {
    indice = (i + total) % total;
    pistaFotos.style.transform = `translateX(${-indice * 100}%)`;
    $$('span', puntos).forEach((p, k) => p.classList.toggle('activo', k === indice));
  }
  $('.flecha.anterior', visor).addEventListener('click', () => irA(indice - 1));
  $('.flecha.siguiente', visor).addEventListener('click', () => irA(indice + 1));
  let xInicio = null;
  $('#carrusel').addEventListener('pointerdown', e => { xInicio = e.clientX; });
  $('#carrusel').addEventListener('pointerup', e => {
    if (xInicio == null || total < 2) return;
    const dx = e.clientX - xInicio;
    if (Math.abs(dx) > 40) irA(indice + (dx < 0 ? 1 : -1));
    xInicio = null;
  });

  function abrirVisor({ fotos, sobre = '', titulo = '', detalle = '', origen: o, alCerrar }) {
    origen = o;
    alCerrarVisor = alCerrar || null;
    total = Math.max(1, fotos.length);
    pistaFotos.replaceChildren(...(fotos.length ? fotos : ['']).map(src => { const d = document.createElement('div'); ponerFoto(d, src); return d; }));
    puntos.innerHTML = Array.from({ length: total }, () => '<span></span>').join('');
    visor.classList.toggle('una-foto', total < 2);
    irA(0);
    $('.visor-sobre', visor).textContent = texto(sobre);
    $('#visor-titulo').textContent = texto(titulo);
    $('.visor-detalle', visor).textContent = texto(detalle);

    visor.hidden = false;
    document.body.classList.add('visor-abierto');
    requestAnimationFrame(() => visor.classList.add('abierto'));
    if (!reducido && o) {
      const desde = o.getBoundingClientRect(), hasta = visorPolaroid.getBoundingClientRect();
      const s = Math.max(.08, desde.width / hasta.width);
      visorPolaroid.animate([
        { transform: `translate(${desde.left - hasta.left}px, ${desde.top - hasta.top}px) scale(${s}) rotate(-3deg)`, transformOrigin: '0 0', opacity: .3 },
        { transform: 'none', transformOrigin: '0 0', opacity: 1 }
      ], { duration: 750, easing: 'cubic-bezier(.22,.61,.36,1)' });
    }
    setTimeout(() => { const [x, y] = centro(visorPolaroid); rafaga(x, y, 10, { chispas: 5, fuerza: 1.4 }); }, 500);
    $('.visor-cerrar', visor).focus({ preventScroll: true });
  }

  async function cerrarVisor() {
    if (visor.hidden) return;
    visor.classList.remove('abierto');
    if (!reducido) {
      await visorPolaroid.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(24px) scale(.94)' }],
        { duration: 450, easing: 'ease-in' }).finished;
    }
    visor.hidden = true;
    document.body.classList.remove('visor-abierto');
    if (origen && origen.focus) origen.focus({ preventScroll: true });
    if (alCerrarVisor) alCerrarVisor();
  }
  $$('[data-cerrar]', visor).forEach(el => el.addEventListener('click', cerrarVisor));
  addEventListener('keydown', e => {
    if (visor.hidden) return;
    if (e.key === 'Escape') cerrarVisor();
    if (e.key === 'ArrowRight' && total > 1) irA(indice + 1);
    if (e.key === 'ArrowLeft' && total > 1) irA(indice - 1);
  });

  /* ============ 22. Pastel: pedir un deseo ============ */

  const seccionPastel = $('#pastel');
  const botonPastel = $('#soplar');
  let soplado = false;
  botonPastel.addEventListener('click', async () => {
    if (soplado) return;
    soplado = true;
    botonPastel.classList.add('apagado');
    botonPastel.setAttribute('aria-label', 'Velas apagadas');
    for (const vela of $$('.vela', botonPastel)) { vela.classList.add('apagada'); await esperar(260); }
    await esperar(700);
    seccionPastel.classList.add('deseo-hecho');
    const r = botonPastel.getBoundingClientRect();
    rafaga(r.left + r.width / 2, r.top + r.height * .3, 18, { chispas: 14, fuerza: 1.2 });
    await esperar(1800);
    desbloquear('#regalo');
  });

  /* ============ 23. Regalo ============ */

  const caja = $('#caja');
  let regaloAbierto = false;
  caja.addEventListener('click', async () => {
    if (regaloAbierto) return;
    regaloAbierto = true;
    caja.classList.add('sacude');
    await esperar(560);
    caja.classList.remove('sacude');
    caja.classList.add('abierta');
    $('#regalo').classList.add('abierto');
    const [x, y] = centro(caja);
    confeti(x, y - 30);
    rafaga(x, y - 30, 8, { chispas: 10 });
    await esperar(1000);
    $('#sorpresa').classList.add('ver');
    await esperar(2800);
    desbloquear('#carta');
  });

  /* ============ 24. La carta ============ */

  const sobre = $('#sobre');
  const hojasCarta = $('#hojas-carta');
  const escenaSobre = $('#sobre-escena');
  let estadoCarta = 'cerrada';

  async function abrirCarta() {
    if (estadoCarta === 'abriendo' || estadoCarta === 'abierta') return;
    const primeraVez = estadoCarta === 'cerrada';
    estadoCarta = 'abriendo';
    sobre.classList.remove('leida');
    sobre.classList.add('abierto');
    await esperar(primeraVez ? 2400 : 1600);
    escenaSobre.classList.add('se-va');
    await esperar(700);
    escenaSobre.classList.add('oculto');
    hojasCarta.classList.remove('oculto', 'dobla');
    hojasCarta.classList.add('desdobla');
    scrollTo({ top: hojasCarta.getBoundingClientRect().top + scrollY - 80, behavior: reducido ? 'auto' : 'smooth' });
    await esperar(1200);
    for (const p of $$('.parrafo', hojasCarta)) {
      if (!p.classList.contains('ver')) { p.classList.add('ver'); await esperar(primeraVez ? 900 : 60); }
    }
    $('#doblar').classList.add('ver');
    estadoCarta = 'abierta';
  }

  async function doblarCarta() {
    if (estadoCarta !== 'abierta') return;
    estadoCarta = 'doblando';
    hojasCarta.classList.remove('desdobla');
    hojasCarta.classList.add('dobla');
    await esperar(1100);
    hojasCarta.classList.add('oculto');
    escenaSobre.classList.remove('oculto', 'se-va');
    sobre.classList.remove('abierto');
    sobre.classList.add('leida');
    const pista = $('#pista-sobre');
    if (pista) pista.textContent = texto(T.carta.guardada);
    escenaSobre.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'center' });
    estadoCarta = 'leida';
    await esperar(1600);
    if ($('#final').classList.contains('oculto')) {
      desbloquear('#final');
      desbloquear('#octavo');
      await esperar(400);
      $('#final').scrollIntoView({ behavior: reducido ? 'auto' : 'smooth', block: 'start' });
    }
  }

  sobre.addEventListener('click', abrirCarta);
  $('#doblar').addEventListener('click', doblarCarta);

  /* ============ 25. Final: el jardín florece ============ */

  new IntersectionObserver((entradas, obs) => {
    if (!entradas[0].isIntersecting) return;
    obs.disconnect();
    $('#macizo-final').classList.add('florecer');
  }, { threshold: .2 }).observe($('#macizo-final'));

  /* ============ 26. El octavo tulipán ============ */

  const seccionOctavo = $('#octavo');
  const frasesOctavo = construirRelato($('#lineas-octavo'), T.octavo.lineas, null, { observar: false });
  new IntersectionObserver(async (entradas, obs) => {
    if (!entradas[0].isIntersecting) return;
    obs.disconnect();
    const escena = $('.escena-octavo', seccionOctavo);
    escena.classList.add('florecer');
    await esperar(((Number(T.anios) || 7) * .45 + 1.6) * 1000);
    escena.classList.add('lista');
    const capullo = $('#capullo');
    capullo.classList.add('aparece');
    await esperar(3200);
    await relatoPorTiempo(frasesOctavo);
    await esperar(1200);
    capullo.classList.add('abre');
    const [x, y] = centro(capullo);
    await esperar(2600);
    rafaga(x, y - 60, 10, { chispas: 12, fuerza: .8 });
    $('#ave-octavo').classList.add('llega');
    await esperar(1800);
    $('#te-amo-final').classList.add('ver');
    await esperar(2500);
    $('#volver').classList.add('ver');
  }, { threshold: .45 }).observe(seccionOctavo);

  $('#volver').addEventListener('click', () => scrollTo({ top: 0, behavior: reducido ? 'auto' : 'smooth' }));
})();
