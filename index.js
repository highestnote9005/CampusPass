window.EVENTOS = [
  { id: 1, titulo: 'Show 1 - Trap & Funk Festival', preco: 80,  data: 'Sábado · 20h',
    descricao: 'O maior encontro musical universitário do semestre, com line-up incrível e estrutura de som e luz de primeira.' },
  { id: 2, titulo: 'Show 2',               preco: 95,  data: 'Sexta · 22h',
    descricao: 'Uma noite de música ao vivo para curtir com a galera da universidade, do primeiro ao último ato.' },
  { id: 3, titulo: 'Show 3',               preco: 120, data: 'Sábado · 22h',
    descricao: 'Show ao vivo com pista aberta, bar e muita energia para fechar a semana com os amigos.' },
  { id: 4, titulo: 'Calourada Engenharia', preco: 25,  data: 'Sábado · 22h',
    descricao: 'A festa de boas-vindas dos calouros de Engenharia: música, jogos e o primeiro rolê do semestre.' },
  { id: 5, titulo: 'Festival de Inverno',  preco: 110, data: 'Domingo · 16h',
    descricao: 'Um domingo de festival com várias atrações e espaço para curtir o dia todo com a galera.' },
  { id: 6, titulo: 'Open Air Medicina',    preco: 70,  data: 'Sexta · 21h',
    descricao: 'Festa ao ar livre da turma de Medicina, com música, pista e a energia de quem merece um respiro.' },
  { id: 7, titulo: 'Bateria Day',          preco: 40,  data: 'Sábado · 14h',
    descricao: 'Tarde de samba e bateria universitária, com ensaio aberto e roda de música para todo mundo.' },
  { id: 8, titulo: 'Noite do Direito',     preco: 60,  data: 'Quinta · 22h',
    descricao: 'A noite mais esperada do curso de Direito, com pista, bar e muita música para virar a madrugada.' },
  { id: 9, titulo: 'Sunset Campus',        preco: 85,  data: 'Domingo · 17h',
    descricao: 'Música e pôr do sol no campus: um fim de tarde de domingo para relaxar e encontrar os amigos.' },
];

const LOCAL_PADRAO = 'Arena CampusPass · São Paulo, SP';

function icone(nome) {
  const tracos = {
    calendario: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    pessoas:    '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
    local:      '<path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>',
    seta:       '<path d="M5 12h14M12 5l7 7-7 7"/>',
    confirmado: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
    relogio:    '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    reembolso:  '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>',
    expandir:   '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
  };
  return `<svg class="ico" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
               stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${tracos[nome]}</svg>`;
}

function fotoDe(evento, largura = 600, altura = 300) {
  return evento.foto || `https://picsum.photos/seed/campuspass-${evento.id}/${largura}/${altura}`;
}

function logoSvg(largura, altura) {
  return `
    <svg class="logo" viewBox="0 0 340 100" width="${largura}" height="${altura}"
         role="img" aria-label="CampusPass" xmlns="http://www.w3.org/2000/svg">
      <path class="logo-icon" d="M14 32 a10 10 0 0 1 10 -10 h30 a10 10 0 0 1 10 10 v6
               a7 7 0 0 0 0 14 v6 a10 10 0 0 1 -10 10 h-30 a10 10 0 0 1 -10 -10
               v-6 a7 7 0 0 0 0 -14 z"/>
      <g class="logo-line" stroke-width="2.5" stroke-linecap="round">
        <line x1="34" y1="24" x2="34" y2="30"/>
        <line x1="34" y1="36" x2="34" y2="42"/>
        <line x1="34" y1="48" x2="34" y2="54"/>
        <line x1="34" y1="60" x2="34" y2="66"/>
      </g>
      <text class="logo-text" x="76" y="63" font-family="'Segoe UI', Arial, sans-serif"
            font-size="38" font-weight="700">Campus<tspan class="logo-accent">Pass</tspan></text>
    </svg>`;
}

function brl(valor) {
  return Number(valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

function esc(texto) {
  const trocas = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return String(texto).replace(/[&<>"']/g, caractere => trocas[caractere]);
}

function lerUsuarios() {
  return JSON.parse(localStorage.getItem('campuspass_users') || '{}');
}

function salvarUsuarios(usuarios) {
  localStorage.setItem('campuspass_users', JSON.stringify(usuarios));
}

function lerIngressos() {
  try {
    return JSON.parse(localStorage.getItem('campuspass_ingressos') || '[]');
  } catch (e) {
    return [];
  }
}

function salvarIngressos(ingressos) {
  try {
    localStorage.setItem('campuspass_ingressos', JSON.stringify(ingressos));
  } catch (e) {}
}

function lerReembolsos() {
  try {
    return JSON.parse(localStorage.getItem('campuspass_reembolsos') || '[]');
  } catch (e) {
    return [];
  }
}

function salvarReembolsos(pedidos) {
  try {
    localStorage.setItem('campuspass_reembolsos', JSON.stringify(pedidos));
  } catch (e) {}
}

function gerarCodigo() {
  const letras = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return 'CP-' + [...bytes].map(b => letras[b % letras.length]).join('');
}

function mostrarErro(elemento, mensagem) {
  elemento.textContent = mensagem;
  elemento.style.display = 'block';
}

function validarCampos(campos) {
  let tudoCerto = true;

  campos.forEach(campo => {
    const valido = campo.checkValidity();
    campo.closest('.field').classList.toggle('err', !valido);

    if (!valido) tudoCerto = false;
  });

  return tudoCerto;
}


function montarLayout() {
  if (document.body.dataset.bare !== undefined) return;

  inserirBarraDeNavegacao();
  inserirRodape();
  ativarMenuMobile();
  ativarBusca();
  ativarBotaoDeConta();
  ativarTema();
}

function inserirBarraDeNavegacao() {
  const html = `
    <header class="nav">
      <div class="wrap nav-in">

        <a class="brand" href="index.html">
          ${logoSvg(140, 41)}
        </a>

        <button class="burger" aria-label="Abrir menu" aria-expanded="false">☰</button>

        <div class="menu" id="menu">
          <form class="search" role="search">
            <input class="in" type="search" id="busca"
                   placeholder="Buscar eventos" aria-label="Buscar eventos">
            <button class="btn btn-primary">Buscar</button>
          </form>

          <a href="central-de-suporte.html">Suporte</a>
          <a id="conta" href="login.html">Entre / Cadastre-se</a>

          <button class="theme-btn" id="tema" type="button" aria-label="Alternar tema"></button>
        </div>

      </div>
    </header>`;

  document.body.insertAdjacentHTML('afterbegin', html);
}

function inserirRodape() {
  const html = `
    <footer class="foot">
      <div class="wrap">

        <div class="foot-grid">
          <div>
            <span class="chip">
              ${logoSvg(120, 35)}
            </span>
            <p>Os melhores rolês da sua universidade, em um só lugar.</p>
          </div>

          <div>
            <h4>Institucional</h4>
            <a href="sobre-nos.html">Sobre nós</a>
            <a href="trabalhe-conosco.html">Trabalhe conosco</a>
            <a href="termos.html">Termos de uso e privacidade</a>
          </div>

          <div>
            <h4>Ajuda</h4>
            <a href="central-de-suporte.html">Central de suporte</a>
            <a href="meus-ingressos.html">Meus ingressos</a>
            <a href="reembolso.html">Reembolso</a>
          </div>

          <div>
            <h4>Receba as novidades</h4>
            <form>
              <input class="in" type="email" placeholder="seu@email.com" aria-label="E-mail">
              <button class="btn btn-primary">Assinar</button>
            </form>
          </div>
        </div>

        <div class="foot-end">
          <span>© 2026 CampusPass. Todos os direitos reservados.</span>
          <a class="foot-end-link" href="termos.html">Termos de uso e privacidade</a>
          <span>CNPJ 60.589.329/0001-61</span>
        </div>

      </div>
    </footer>`;

  document.body.insertAdjacentHTML('beforeend', html);
}

function ativarTema() {
  const raiz = document.documentElement;
  const botao = document.getElementById('tema');
  const sistemaEscuro = matchMedia('(prefers-color-scheme: dark)');

  const temaAtual = () => raiz.dataset.theme || (sistemaEscuro.matches ? 'dark' : 'light');

  function atualizarBotao() {
    const escuro = temaAtual() === 'dark';
    botao.textContent = escuro ? '☀' : '☾';
    botao.setAttribute('aria-label', escuro ? 'Mudar para o tema claro' : 'Mudar para o tema escuro');
    botao.title = botao.getAttribute('aria-label');
  }

  botao.addEventListener('click', () => {
    const novo = temaAtual() === 'dark' ? 'light' : 'dark';
    raiz.dataset.theme = novo;
    try { localStorage.setItem('campuspass_tema', novo); } catch (e) {}
    atualizarBotao();
  });

  sistemaEscuro.addEventListener('change', atualizarBotao);

  atualizarBotao();
}

function ativarMenuMobile() {
  const botao = document.querySelector('.burger');
  const menu = document.getElementById('menu');

  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('open');
    botao.setAttribute('aria-expanded', aberto);
  });
}
function ativarBusca() {
  const campo = document.getElementById('busca');
  const formulario = campo.closest('form');

  function filtrar() {

    if (window.filtrarEventos) window.filtrarEventos(campo.value);
  }

  formulario.addEventListener('submit', evento => {
    evento.preventDefault();
    filtrar();
  });

  campo.addEventListener('input', filtrar);
}

function ativarBotaoDeConta() {
  const estaLogado = localStorage.getItem('campuspass_token');
  if (!estaLogado) return;

  const link = document.getElementById('conta');
  link.textContent = 'Sair';
  link.href = '#';

  link.addEventListener('click', evento => {
    evento.preventDefault();
    localStorage.removeItem('campuspass_token');
    location.href = 'index.html';
  });
}


function montarCarrossel() {
  const carrossel = document.querySelector('.carousel');
  if (!carrossel) return;

  const IDS_DESTAQUE = [4, 5, 9];
  const INTERVALO = 9000;

  const trilho = carrossel.querySelector('.carousel-track');
  const pontos = carrossel.querySelector('.car-dots');

  EVENTOS.filter(e => IDS_DESTAQUE.includes(e.id)).forEach(evento => {
    trilho.insertAdjacentHTML('beforeend', `
      <article class="hero slide" style="--foto:url('${fotoDe(evento, 1200, 520)}')">
        <span class="tag yellow">${esc(evento.data)}</span>
        <h2>${esc(evento.titulo)}</h2>
        <p>Ingressos a partir de ${brl(evento.preco)}.</p>
        <a class="btn btn-yellow"
           href="comprar.html?evento=${encodeURIComponent(evento.id)}">Comprar ingresso</a>
      </article>`);
  });

  const slides = [...carrossel.querySelectorAll('.slide')];
  let atual = 0;
  let timer = null;
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Ir para o slide ${i + 1}`);
    b.addEventListener('click', () => { ir(i); reiniciar(); });
    pontos.appendChild(b);
  });
  const bolinhas = [...pontos.children];

  function ir(i) {
    atual = (i + slides.length) % slides.length;
    trilho.style.transform = `translateX(-${atual * 100}%)`;
    bolinhas.forEach((b, n) => b.classList.toggle('active', n === atual));
    slides.forEach((s, n) => s.toggleAttribute('inert', n !== atual));
  }

  const semAnimacao = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function iniciar()   { if (!semAnimacao) timer = setInterval(() => ir(atual + 1), INTERVALO); }
  function parar()     { clearInterval(timer); }
  function reiniciar() { parar(); iniciar(); }

  carrossel.querySelector('.prev').addEventListener('click', () => { ir(atual - 1); reiniciar(); });
  carrossel.querySelector('.next').addEventListener('click', () => { ir(atual + 1); reiniciar(); });
  carrossel.addEventListener('mouseenter', parar);
  carrossel.addEventListener('mouseleave', iniciar);
  carrossel.addEventListener('focusin', parar);
  carrossel.addEventListener('focusout', iniciar);
  let x0 = null;
  carrossel.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; parar(); }, { passive: true });
  carrossel.addEventListener('touchend', e => {
    if (x0 !== null) {
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) ir(atual + (dx < 0 ? 1 : -1));
    }
    x0 = null;
    iniciar();
  });
  carrossel.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  { ir(atual - 1); reiniciar(); }
    if (e.key === 'ArrowRight') { ir(atual + 1); reiniciar(); }
  });

  ir(0);
  iniciar();
}
function estourarConfetes(janela) {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const tela = document.createElement('canvas');
  tela.className = 'confetes';
  janela.appendChild(tela);

  const ctx = tela.getContext('2d');
  const L = tela.width = innerWidth;
  const A = tela.height = innerHeight;
  const cores = ['#FFC83D', '#FF4F8B', '#1E90FF', '#2E5CFF', '#12C28A', '#FFFFFF', '#9B6BFF'];
  const origens = [[L * .15, A], [L * .85, A], [L * .5, A * .75]];
  const pecas = [];
  origens.forEach(([x, y], i) => {
    for (let n = 0; n < 70; n++) {
      const centro = i === 0 ? -Math.PI * .35 : i === 1 ? -Math.PI * .65 : -Math.PI / 2;
      const ang = centro + (Math.random() - .5) * 1.1;
      const vel = (i === 2 ? 11 : 15) + Math.random() * 10;
      pecas.push({
        x, y,
        vx: Math.cos(ang) * vel, vy: Math.sin(ang) * vel,
        w: 6 + Math.random() * 6, h: 4 + Math.random() * 5,
        rot: Math.random() * 6.28, vr: (Math.random() - .5) * .4,
        cor: cores[Math.floor(Math.random() * cores.length)],
        redonda: Math.random() < .25,
      });
    }
  });

  const inicio = performance.now();
  (function quadro(agora) {
    const t = agora - inicio;
    ctx.clearRect(0, 0, L, A);
    const fade = t > 2800 ? Math.max(0, 1 - (t - 2800) / 700) : 1;
    pecas.forEach(p => {
      p.vy += .35;  p.vx *= .985;  p.vy *= .985;
      p.x += p.vx;  p.y += p.vy;  p.rot += p.vr;
      ctx.save();
      ctx.globalAlpha = fade;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.cor;
      if (p.redonda) { ctx.beginPath(); ctx.arc(0, 0, p.w / 2, 0, 6.28); ctx.fill(); }
      else ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
    });
    if (t < 3500) requestAnimationFrame(quadro);
    else tela.remove();
  })(inicio);
}

const paginas = {

  index() {
    const caixa = document.getElementById('listaEventos');

    function montarCard(evento, posicao) {

      const seloData = evento.data
        ? `<span class="tag yellow ico-tag">${icone('calendario')}${esc(evento.data)}</span>`
        : '';

      const seloUrgencia = posicao === 0
        ? `<span class="tag coral ico-tag">${icone('pessoas')}67 pessoas comprando agora</span>`
        : '';

      return `
        <article class="ev">
          <div class="ev-top" style="--foto:url('${fotoDe(evento)}')">
            <div class="ev-tags">
              ${seloData}
              ${seloUrgencia}
            </div>
            <p class="ev-local">${icone('local')}${esc(evento.local || LOCAL_PADRAO)}</p>
          </div>

          <div class="ev-body">
            <h3>${esc(evento.titulo)}</h3>
            <p class="ev-desc">${esc(evento.descricao || '')}</p>

            <div class="ev-foot">
              <div>
                <span class="ev-from">A partir de</span>
                <div class="price">${brl(evento.preco)}</div>
              </div>

              <a class="btn btn-primary"
                 href="comprar.html?evento=${encodeURIComponent(evento.id)}">Comprar ${icone('seta')}</a>
            </div>
          </div>
        </article>`;
    }

    function mostrar(lista) {
      if (lista.length === 0) {
        caixa.innerHTML = '<p class="small">Nenhum evento encontrado.</p>';
        return;
      }

      caixa.innerHTML = lista.map(montarCard).join('');
    }
    window.filtrarEventos = texto => {
      const busca = texto.trim().toLowerCase();
      const encontrados = EVENTOS.filter(e => e.titulo.toLowerCase().includes(busca));

      mostrar(encontrados);
    };

    mostrar(EVENTOS);
    montarCarrossel();
  },

  login() {
    const formulario = document.getElementById('f');
    const campoEmail = document.getElementById('loginEmail');
    const campoSenha = document.getElementById('loginPassword');
    const botaoMostrar = document.getElementById('togglePassword');
    const erro = document.getElementById('loginErro');

    botaoMostrar.addEventListener('click', () => {
      const estaOculta = campoSenha.type === 'password';

      campoSenha.type = estaOculta ? 'text' : 'password';
      botaoMostrar.textContent = estaOculta ? 'Ocultar' : 'Mostrar';
    });

    formulario.addEventListener('submit', evento => {
      evento.preventDefault();
      erro.style.display = 'none';

      if (!validarCampos([campoEmail, campoSenha])) return;

      const email = campoEmail.value.trim().toLowerCase();
      const usuarios = lerUsuarios();

      if (usuarios[email] !== campoSenha.value) {
        mostrarErro(erro, 'Email ou senha incorretos.');
        return;
      }

      localStorage.setItem('campuspass_token', email);
      location.href = 'index.html';
    });
  },


  cadastro() {
    const formulario = document.getElementById('f');
    const campoEmail = document.getElementById('email');
    const campoSenha = document.getElementById('senha');
    const campoConfirmar = document.getElementById('conf');
    const erro = document.getElementById('cadastroErro');

    formulario.addEventListener('submit', evento => {
      evento.preventDefault();
      erro.style.display = 'none';

      const senhasIguais = campoSenha.value === campoConfirmar.value;
      campoConfirmar.setCustomValidity(senhasIguais ? '' : 'As senhas não coincidem');

      const campos = formulario.querySelectorAll('[required]');
      if (!validarCampos(campos)) return;

      const email = campoEmail.value.trim().toLowerCase();
      const usuarios = lerUsuarios();

      if (usuarios[email]) {
        mostrarErro(erro, 'Este email já tem cadastro. Entre na sua conta.');
        return;
      }

      usuarios[email] = campoSenha.value;
      salvarUsuarios(usuarios);

      location.href = 'login.html';
    });
  },

  comprar() {
    const TAXA_DE_SERVICO = 0.10; 

    const idDaUrl = new URLSearchParams(location.search).get('evento');
    const evento = EVENTOS.find(e => String(e.id) === idDaUrl) || EVENTOS[0];

    document.getElementById('titulo').textContent = evento.titulo;
    document.title = `${evento.titulo} · CampusPass`;
    document.querySelector('.ev-head .art')
      .style.setProperty('--foto', `url('${fotoDe(evento, 480, 320)}')`);

    const linhas = [...document.querySelectorAll('.row')]; 
    const botaoFinalizar = document.getElementById('fin');
    const janela = document.getElementById('ok');
    const quantidadeDe = linha => Number(linha.querySelector('output').textContent);
    const nomeDe = linha => linha.querySelector('b').textContent;
    const precoDe = linha => Number(linha.dataset.price);

    function atualizarResumo() {
      let subtotal = 0;
      const itens = [];

      linhas.forEach(linha => {
        const quantidade = quantidadeDe(linha);
        const totalDaLinha = quantidade * precoDe(linha);

        linha.classList.toggle('sel', quantidade > 0);

        if (quantidade > 0) {
          subtotal += totalDaLinha;
          itens.push(`
            <div class="ln small">
              <span>${quantidade}x ${nomeDe(linha)}</span>
              <span>${brl(totalDaLinha)}</span>
            </div>`);
        }
      });

      const taxa = subtotal * TAXA_DE_SERVICO;

      document.getElementById('itens').innerHTML =
        itens.join('') || '<p class="small">Nenhum ingresso selecionado ainda.</p>';

      document.getElementById('sub').textContent = brl(subtotal);
      document.getElementById('fee').textContent = brl(taxa);
      document.getElementById('tot').textContent = brl(subtotal + taxa);

      botaoFinalizar.disabled = subtotal === 0;
    }

    function ativarQuantidades() {
      linhas.forEach(linha => {
        const contador = linha.querySelector('output');

        linha.querySelector('.minus').onclick = () => {
          contador.textContent = Math.max(0, quantidadeDe(linha) - 1);
          atualizarResumo();
        };

        linha.querySelector('.plus').onclick = () => {
          contador.textContent = quantidadeDe(linha) + 1;
          atualizarResumo();
        };
      });
    }

    function ativarAbasDePagamento() {
      const abas = document.querySelectorAll('.seg button');
      const paineis = document.querySelectorAll('.pane');

      abas.forEach(aba => {
        aba.onclick = () => {
          abas.forEach(outra => outra.setAttribute('aria-selected', outra === aba));
          paineis.forEach(painel => painel.hidden = painel.id !== aba.dataset.p);
        };
      });

      document.getElementById('copiar').onclick = evento => {
        navigator.clipboard.writeText('00020126uniticket-pix-exemplo');
        evento.target.textContent = 'Copiado';
      };
    }

    function ativarCartao() {
      const campoNumero = document.getElementById('n');
      const campoNome = document.getElementById('nm');
      const campoValidade = document.getElementById('v');

      const cartaoNumero = document.getElementById('ccN');
      const cartaoNome = document.getElementById('ccNome');
      const cartaoValidade = document.getElementById('ccVal');
      const agrupar = digitos => digitos.replace(/(.{4})(?=.)/g, '$1 ');

      campoNumero.addEventListener('input', () => {
        const digitos = campoNumero.value.replace(/\D/g, '').slice(0, 16);

        campoNumero.value = agrupar(digitos);
        cartaoNumero.textContent = agrupar(digitos.padEnd(16, '*'));
      });

      campoNome.addEventListener('input', () => {
        cartaoNome.textContent = campoNome.value.trim() || 'G.Alencar';
      });

      campoValidade.addEventListener('input', () => {
        cartaoValidade.textContent = campoValidade.value.trim() || '09/34';
      });
    }

    function montarIngresso(linha) {
      return `
        <div class="tk">
          <h4>${esc(evento.titulo)}</h4>
          <p>${esc(evento.data)} · Arena CampusPass</p>

          <div class="tk-line"><i></i><i></i></div>

          <div class="tk-foot">
            <b>${brl(precoDe(linha))}</b>
            <span>${nomeDe(linha)} · ${quantidadeDe(linha)}x</span>
          </div>
        </div>`;
    }

    function salvarCompra(comprados) {
      const dono = localStorage.getItem('campuspass_token') || '';
      const novos = [];

      comprados.forEach(linha => {
        for (let i = 0; i < quantidadeDe(linha); i++) {
          novos.push({
            codigo: gerarCodigo(),
            eventoId: evento.id,
            evento: evento.titulo,
            data: evento.data,
            categoria: nomeDe(linha),
            preco: precoDe(linha),
            dono,
            compradoEm: new Date().toISOString(),
          });
        }
      });

      salvarIngressos([...lerIngressos(), ...novos]);
    }

    function ativarConfirmacao() {
      botaoFinalizar.onclick = () => {
        const comprados = linhas.filter(linha => quantidadeDe(linha) > 0);

        salvarCompra(comprados);

        document.getElementById('tks').innerHTML = comprados.map(montarIngresso).join('');
        janela.showModal();
        estourarConfetes(janela);
      };

      document.getElementById('fechar').onclick = () => {
        janela.close();
        linhas.forEach(linha => linha.querySelector('output').textContent = 0);
        atualizarResumo();
      };
    }
    ativarQuantidades();
    ativarAbasDePagamento();
    ativarCartao();
    ativarConfirmacao();
    atualizarResumo();
  },

  trabalhe() {
    // Para abrir, fechar ou editar vagas, mexa só nesta lista.
    const VAGAS = [
      { id: 'dev-front', titulo: 'Desenvolvedor(a) Front-end', area: 'Tecnologia',
        modelo: 'Remoto', tipo: 'Estágio',
        descricao: 'Construa telas rápidas e acessíveis para quem compra ingresso pelo celular.' },
      { id: 'suporte', titulo: 'Analista de Suporte ao Cliente', area: 'Atendimento',
        modelo: 'Híbrido', tipo: 'Meio período',
        descricao: 'Ajude compradores e organizadores com dúvidas, reembolsos e ingressos.' },
      { id: 'parcerias', titulo: 'Parcerias com Atléticas', area: 'Comercial',
        modelo: 'Presencial', tipo: 'Meio período',
        descricao: 'Aproxime atléticas e centros acadêmicos do CampusPass e acompanhe os eventos.' },
      { id: 'embaixador', titulo: 'Embaixador(a) de Campus', area: 'Comunidade',
        modelo: 'Na sua universidade', tipo: 'Freelancer',
        descricao: 'Seja a cara do CampusPass na sua faculdade e divulgue os rolês do campus.' },
    ];

    const lista = document.getElementById('listaVagas');
    const formulario = document.getElementById('f');
    const campoVaga = document.getElementById('tvaga');
    const campoNome = document.getElementById('tnome');
    const sembanco = 'banco-de-talentos';

    lista.innerHTML = VAGAS.map((vaga, i) => `
      <article class="vaga-ticket" data-area="${esc(vaga.area)}">
        <div class="vt-top">
          <span class="vt-num">${String(i + 1).padStart(2, '0')}</span>
          <span class="tag yellow">${esc(vaga.area)}</span>
        </div>
        <h3>${esc(vaga.titulo)}</h3>
        <p class="small">${esc(vaga.descricao)}</p>

        <div class="vt-line"><i></i><i></i></div>

        <div class="vt-foot">
          <div class="vt-meta">
            <b>${esc(vaga.modelo)}</b>
            <span class="small">${esc(vaga.tipo)}</span>
          </div>
          <button class="btn btn-primary" type="button" data-vaga="${esc(vaga.id)}">Candidatar-se</button>
        </div>
      </article>`).join('');

    const filtros = document.getElementById('filtroVagas');
    const areas = ['Todas', ...new Set(VAGAS.map(v => v.area))];

    filtros.innerHTML = areas.map((area, i) =>
      `<button type="button" aria-pressed="${i === 0}" data-area="${esc(area)}">${esc(area)}</button>`
    ).join('');

    filtros.addEventListener('click', evento => {
      const botao = evento.target.closest('button');
      if (!botao) return;

      filtros.querySelectorAll('button')
        .forEach(outro => outro.setAttribute('aria-pressed', outro === botao));

      lista.querySelectorAll('.vaga-ticket').forEach(cartao => {
        cartao.hidden = botao.dataset.area !== 'Todas' && cartao.dataset.area !== botao.dataset.area;
      });
    });

    campoVaga.innerHTML =
      '<option value="">Escolha...</option>' +
      VAGAS.map(v => `<option value="${esc(v.id)}">${esc(v.titulo)}</option>`).join('') +
      `<option value="${sembanco}">Banco de talentos (nenhuma vaga específica)</option>`;
    lista.addEventListener('click', evento => {
      const botao = evento.target.closest('[data-vaga]');
      if (!botao) return;

      campoVaga.value = botao.dataset.vaga;
      const semAnimacao = matchMedia('(prefers-reduced-motion: reduce)').matches;
      document.getElementById('candidatura')
        .scrollIntoView({ behavior: semAnimacao ? 'auto' : 'smooth', block: 'start' });
      campoNome.focus({ preventScroll: true });
    });

    formulario.addEventListener('submit', evento => {
      evento.preventDefault();

      const campos = formulario.querySelectorAll('input, select, textarea');
      if (!validarCampos(campos)) return;

      // Ainda não há servidor: a candidatura fica guardada neste navegador.
      const candidatura = {
        nome: campoNome.value.trim(),
        email: document.getElementById('temail').value.trim().toLowerCase(),
        telefone: document.getElementById('ttel').value.trim(),
        vaga: campoVaga.value,
        link: document.getElementById('tlink').value.trim(),
        mensagem: document.getElementById('tmsg').value.trim(),
        enviadaEm: new Date().toISOString(),
      };

      try {
        const guardadas = JSON.parse(localStorage.getItem('campuspass_candidaturas') || '[]');
        guardadas.push(candidatura);
        localStorage.setItem('campuspass_candidaturas', JSON.stringify(guardadas));
      } catch (e) {}

      const vaga = VAGAS.find(v => v.id === candidatura.vaga);
      document.getElementById('formCard').innerHTML = `
        <div class="sucesso">
          <span class="tag green">Candidatura enviada</span>
          <h3>Obrigado, ${esc(candidatura.nome.split(' ')[0])}!</h3>
          <p class="small">
            Recebemos sua candidatura para
            <b>${esc(vaga ? vaga.titulo : 'o banco de talentos')}</b>.
            Se o seu perfil combinar, entraremos em contato pelo email ${esc(candidatura.email)}.
          </p>
          <a class="btn btn-sec" href="index.html">Voltar para os eventos</a>
        </div>`;
    });
  },

  suporte() {
    const CATEGORIAS = [
      { id: 'compras',    nome: 'Compras e pagamento',      ico: 'R$' },
      { id: 'ingressos',  nome: 'Meus ingressos',           ico: 'QR' },
      { id: 'reembolso',  nome: 'Cancelamento e reembolso', ico: '↺'  },
      { id: 'conta',      nome: 'Conta e cadastro',         ico: '@'  },
      { id: 'seguranca',  nome: 'Segurança e golpes',       ico: '!'  },
    ];

    // Perguntas frequentes. Para editar, mexa só aqui.
    // "resposta" aceita HTML (links, negrito); "pergunta" é sempre texto puro.
    const FAQ = [
      { cat: 'compras', pergunta: 'Quais formas de pagamento posso usar?',
        resposta: 'Você pode pagar com Pix, cartão de crédito ou boleto bancário. Escolha a opção na seção “Forma de pagamento” da página de compra.' },
      { cat: 'compras', pergunta: 'Existe taxa de serviço?',
        resposta: 'Sim. O subtotal, a taxa de serviço e o total aparecem no resumo do pedido antes de você finalizar a compra, para você saber exatamente quanto vai pagar.' },
      { cat: 'compras', pergunta: 'Posso parcelar no cartão?',
        resposta: 'Pode. No cartão de crédito você escolhe o número de parcelas na hora do pagamento, de 1x a 3x sem juros.' },
      { cat: 'compras', pergunta: 'Quanto tempo o boleto leva para ser confirmado?',
        resposta: 'O boleto é enviado para o seu email depois da confirmação do pedido, e a compensação leva até 2 dias úteis. O ingresso é emitido depois da confirmação do pagamento.' },

      { cat: 'ingressos', pergunta: 'Como recebo meu ingresso?',
        resposta: 'Depois da confirmação do pagamento, o ingresso digital, com QR Code, é emitido em seu nome e enviado para o seu email.' },
      { cat: 'ingressos', pergunta: 'Não recebi o ingresso. E agora?',
        resposta: 'Veja a caixa de spam e confirme se o pagamento foi aprovado (no boleto, aguarde a compensação). Se continuar sem o ingresso, <a href="#contato">fale com a gente pelo formulário</a>.' },
      { cat: 'ingressos', pergunta: 'Posso passar meu ingresso para outra pessoa ou revendê-lo?',
        resposta: 'O ingresso é vinculado ao comprador e o mesmo código não pode ser duplicado, clonado ou revendido. A revenda especulativa (cambismo) também é proibida. Veja as <a href="termos.html#t7">condutas proibidas</a> nos Termos.' },

      { cat: 'reembolso', pergunta: 'Posso desistir da compra?',
        resposta: 'Sim. Nas compras pela internet você tem 7 dias, contados do recebimento do ingresso, para exercer o direito de arrependimento, com devolução integral dos valores pagos. Detalhes na <a href="termos.html#t6">cláusula 6 dos Termos</a>.' },
      { cat: 'reembolso', pergunta: 'O evento foi cancelado ou adiado. O que eu faço?',
        resposta: 'Se o cancelamento, o adiamento ou a mudança relevante for responsabilidade do Organizador, você pode escolher entre a reexecução do serviço, a restituição imediata e integral do valor pago ou o abatimento proporcional do preço. Para pedir, <a href="#contato">fale com a gente</a>.' },

      { cat: 'conta', pergunta: 'Como crio minha conta?',
        resposta: 'Clique em “Entre / Cadastre-se”, depois em “Cadastre-se” e preencha email, senha e endereço. Recomendamos usar o email da sua universidade.' },
      { cat: 'conta', pergunta: 'Esqueci minha senha. Como recupero o acesso?',
        resposta: 'Na tela de entrada, use o link “Esqueci minha senha”. Se não conseguir recuperar o acesso, <a href="#contato">fale com a gente</a>.' },
      { cat: 'conta', pergunta: 'Menores de idade podem comprar?',
        resposta: 'A contratação por menor de idade segue o Código Civil, e eventos com venda ou consumo de bebida alcoólica podem exigir a confirmação de maioridade (18 anos).' },
      { cat: 'conta', pergunta: 'Como corrijo ou apago meus dados?',
        resposta: 'Você pode pedir acesso, correção ou eliminação dos seus dados pelo canal de privacidade. Veja todos os seus <a href="termos.html#p6">direitos como titular</a> na Política de Privacidade.' },

      { cat: 'seguranca', pergunta: 'Como saber se um ingresso é verdadeiro?',
        resposta: 'Compre sempre pelo CampusPass: depois do pagamento, o ingresso é emitido com QR Code e vinculado a você. Desconfie de ofertas por redes sociais ou mensagens privadas, porque ingresso falso ou duplicado é golpe.' },
      { cat: 'seguranca', pergunta: 'Caí em um golpe. O que devo fazer?',
        resposta: 'Aja rápido: <b>(1)</b> reúna as provas (comprovantes, prints, QR Code); <b>(2)</b> avise seu banco para tentar o bloqueio cautelar (até 72h) e acionar o MED, se pagou por Pix; <b>(3)</b> registre um Boletim de Ocorrência; <b>(4)</b> denuncie pelo <a href="#contato">formulário</a>, escolhendo “Denunciar golpe ou fraude”. O <a href="termos.html#f3">passo a passo completo</a> está nos Termos.' },
      { cat: 'seguranca', pergunta: 'Como denunciar um organizador ou ingresso suspeito?',
        resposta: 'Use o <a href="#contato">formulário</a> e escolha “Denunciar golpe ou fraude”. Podemos suspender contas, reter valores em disputa e preservar os registros de acesso para as autoridades.' },
    ];

    const estado = { cat: 'todas', q: '' };

    const campoBusca = document.getElementById('supBusca');
    const caixaCats = document.getElementById('supCats');
    const caixaFaq = document.getElementById('listaFaq');
    const vazio = document.getElementById('faqVazio');
    const titulo = document.getElementById('faqTitulo');
    const contagem = document.getElementById('faqContagem');

    const normalizar = texto =>
      String(texto).normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const semTags = html => html.replace(/<[^>]*>/g, ' ');

    caixaCats.innerHTML = CATEGORIAS.map(cat => {
      const total = FAQ.filter(p => p.cat === cat.id).length;
      return `
        <button class="sup-cat" type="button" data-cat="${cat.id}" aria-pressed="false">
          <span class="sup-ico" aria-hidden="true">${esc(cat.ico)}</span>
          <b>${esc(cat.nome)}</b>
          <span class="small">${total} ${total === 1 ? 'pergunta' : 'perguntas'}</span>
        </button>`;
    }).join('');

    caixaFaq.innerHTML = FAQ.map(item => `
      <details class="faq-item">
        <summary>${esc(item.pergunta)}</summary>
        <div class="faq-resp">${item.resposta}</div>
      </details>`).join('');

    const itens = [...caixaFaq.children].map((elemento, i) => ({
      elemento,
      cat: FAQ[i].cat,
      texto: normalizar(FAQ[i].pergunta + ' ' + semTags(FAQ[i].resposta)),
    }));

    function atualizar() {
      const busca = normalizar(estado.q.trim());
      let visiveis = 0;

      itens.forEach(item => {
        const mostrar = (estado.cat === 'todas' || item.cat === estado.cat)
                     && (!busca || item.texto.includes(busca));
        item.elemento.hidden = !mostrar;
        if (mostrar) visiveis++;
      });

      caixaCats.querySelectorAll('.sup-cat').forEach(botao =>
        botao.setAttribute('aria-pressed', botao.dataset.cat === estado.cat));

      const categoria = CATEGORIAS.find(c => c.id === estado.cat);
      titulo.textContent = categoria ? categoria.nome : 'Perguntas frequentes';
      contagem.textContent = `${visiveis} ${visiveis === 1 ? 'resultado' : 'resultados'}`;
      caixaFaq.hidden = visiveis === 0;
      vazio.hidden = visiveis !== 0;
    }

    campoBusca.addEventListener('input', () => { estado.q = campoBusca.value; atualizar(); });
    campoBusca.closest('form').addEventListener('submit', evento => evento.preventDefault());
    caixaCats.addEventListener('click', evento => {
      const botao = evento.target.closest('.sup-cat');
      if (!botao) return;

      estado.cat = estado.cat === botao.dataset.cat ? 'todas' : botao.dataset.cat;
      atualizar();
    });

    document.getElementById('limparFiltros').addEventListener('click', () => {
      estado.cat = 'todas';
      estado.q = '';
      campoBusca.value = '';
      atualizar();
    });

    atualizar();

    // ---------- Formulário de contato ----------
    const formulario = document.getElementById('f');

    formulario.addEventListener('submit', evento => {
      evento.preventDefault();

      const campos = formulario.querySelectorAll('input, select, textarea');
      if (!validarCampos(campos)) return;

      const mensagem = {
        nome: document.getElementById('sNome').value.trim(),
        email: document.getElementById('sEmail').value.trim().toLowerCase(),
        assunto: document.getElementById('sAssunto').value,
        pedido: document.getElementById('sPedido').value.trim(),
        texto: document.getElementById('sMsg').value.trim(),
        enviadaEm: new Date().toISOString(),
      };

      try {
        const guardadas = JSON.parse(localStorage.getItem('campuspass_mensagens') || '[]');
        guardadas.push(mensagem);
        localStorage.setItem('campuspass_mensagens', JSON.stringify(guardadas));
      } catch (e) {}

      document.getElementById('supCard').innerHTML = `
        <div class="sucesso">
          <span class="tag green">Mensagem enviada</span>
          <h3>Obrigado, ${esc(mensagem.nome.split(' ')[0])}!</h3>
          <p class="small">
            Recebemos sua mensagem sobre <b>${esc(mensagem.assunto)}</b> e vamos responder
            pelo email ${esc(mensagem.email)}.
          </p>
          <a class="btn btn-sec" href="index.html">Voltar para os eventos</a>
        </div>`;
    });
  },

  ingressos() {
    const lista = document.getElementById('listaIngressos');
    const vazio = document.getElementById('ingVazio');
    const contagem = document.getElementById('ingContagem');
    const dialogo = document.getElementById('qrDialog');
    const email = localStorage.getItem('campuspass_token') || '';
    const todos = lerIngressos();
    const confirmado = codigo => todos.findIndex(i => i.codigo === codigo) % 2 === 1;

    const meus = todos
      .filter(ingresso => ingresso.dono === email || ingresso.dono === '')
      .reverse();

    const pedidos = lerReembolsos();
    const temPedido = codigo => pedidos.some(pedido => pedido.codigo === codigo);

    const urlQr = (codigo, tamanho) =>
      `https://api.qrserver.com/v1/create-qr-code/?size=${tamanho}x${tamanho}&margin=0&data=${encodeURIComponent(codigo)}`;
    const dataBr = iso => new Date(iso).toLocaleDateString('pt-BR');

    contagem.textContent = `${meus.length} ${meus.length === 1 ? 'ingresso' : 'ingressos'}`;

    if (meus.length === 0) {
      lista.hidden = true;
      vazio.hidden = false;
      return;
    }

    lista.innerHTML = meus.map(ingresso => `
      <article class="ing">
        <div class="ing-main">
          <div class="ing-top">
            <span class="tag yellow">${esc(ingresso.categoria)}</span>
            ${temPedido(ingresso.codigo)
              ? `<span class="ing-status reembolso">${icone('reembolso')}Reembolso solicitado</span>`
              : confirmado(ingresso.codigo)
                ? `<span class="ing-status confirmado">${icone('confirmado')}Confirmado</span>`
                : `<span class="ing-status">${icone('relogio')}Em processo de pagamento</span>`}
          </div>

          <h3>${esc(ingresso.evento)}</h3>

          <ul class="ing-info">
            <li>${icone('calendario')}${esc(ingresso.data)}</li>
            <li>${icone('local')}${esc(ingresso.local || LOCAL_PADRAO)}</li>
          </ul>

          <dl class="ing-dados">
            <div><dt>Código único</dt><dd class="ing-cod">${esc(ingresso.codigo)}</dd></div>
            <div class="direita"><dt>Valor pago</dt><dd class="ing-valor">${brl(ingresso.preco)}</dd></div>
          </dl>
        </div>

        <div class="ing-stub">
          <button class="ing-qr" type="button" data-codigo="${esc(ingresso.codigo)}"
                  aria-label="Ampliar o QR Code do ingresso ${esc(ingresso.codigo)}">
            <img src="${urlQr(ingresso.codigo, 140)}" alt="QR Code do ingresso ${esc(ingresso.codigo)}"
                 width="60" height="60">
          </button>
          <div class="ing-qr-txt">
            <b>QR Code Portaria</b>
            <span class="small">Toque para ampliar</span>
          </div>
          <button class="btn btn-primary btn-qr" type="button" data-codigo="${esc(ingresso.codigo)}">
            ${icone('expandir')}Abrir QR
          </button>
        </div>
      </article>`).join('');

    lista.addEventListener('click', evento => {
      const botao = evento.target.closest('[data-codigo]');
      if (!botao) return;

      const ingresso = meus.find(i => i.codigo === botao.dataset.codigo);
      if (!ingresso) return;

      document.getElementById('qrTitulo').textContent = ingresso.evento;
      document.getElementById('qrCategoria').textContent = `${ingresso.data} · ${ingresso.categoria}`;
      document.getElementById('qrCodigo').textContent = ingresso.codigo;

      const imagem = document.getElementById('qrImg');
      imagem.src = urlQr(ingresso.codigo, 260);
      imagem.alt = `QR Code do ingresso ${ingresso.codigo}`;

      dialogo.showModal();
    });

    document.getElementById('qrFechar').addEventListener('click', () => dialogo.close());
    dialogo.addEventListener('click', evento => {
      if (evento.target === dialogo) dialogo.close();
    });
  },

  reembolso() {
    const PRAZO_ARREPENDIMENTO = 7;

    const email = localStorage.getItem('campuspass_token') || '';
    const meus = lerIngressos()
      .filter(ingresso => ingresso.dono === email || ingresso.dono === '')
      .reverse();
    const pedidos = lerReembolsos();
    const temPedido = codigo => pedidos.some(pedido => pedido.codigo === codigo);

    const formulario = document.getElementById('f');
    const campoIngresso = document.getElementById('rIngresso');
    const campoMotivo = document.getElementById('rMotivo');
    const campoEmail = document.getElementById('rEmail');
    const campoDetalhes = document.getElementById('rDetalhes');
    const info = document.getElementById('reemInfo');

    campoEmail.value = email;

    campoIngresso.innerHTML =
      '<option value="">Escolha...</option>' +
      meus.map(ingresso => `
        <option value="${esc(ingresso.codigo)}"${temPedido(ingresso.codigo) ? ' disabled' : ''}>
          ${esc(ingresso.evento)} · ${esc(ingresso.categoria)} · ${esc(ingresso.codigo)}${temPedido(ingresso.codigo) ? ' (reembolso solicitado)' : ''}
        </option>`).join('') +
      '<option value="outro">Outro ingresso (informe nos detalhes)</option>';

    const diasDesde = iso => Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);

    function atualizarAviso() {
      const ingresso = meus.find(i => i.codigo === campoIngresso.value);

      campoDetalhes.required = campoIngresso.value === 'outro';
      info.hidden = true;
      if (!ingresso) return;

      const dias = diasDesde(ingresso.compradoEm);
      const quando = dias === 0 ? 'hoje' : dias === 1 ? 'há 1 dia' : `há ${dias} dias`;
      const dentroDoPrazo = dias <= PRAZO_ARREPENDIMENTO;

      info.className = 'card reem-info ' + (dentroDoPrazo ? 'ok' : 'aviso');
      info.innerHTML = dentroDoPrazo
        ? `<b>Dentro do prazo.</b> Você comprou este ingresso ${quando} e ainda pode desistir
           (prazo de ${PRAZO_ARREPENDIMENTO} dias), com devolução integral.`
        : `<b>Prazo de desistência encerrado.</b> Você comprou este ingresso ${quando}, e o prazo de
           ${PRAZO_ARREPENDIMENTO} dias já passou. Você ainda pode pedir reembolso se o evento foi
           cancelado, adiado ou alterado.`;
      info.hidden = false;
    }

    campoIngresso.addEventListener('change', atualizarAviso);
    atualizarAviso();

    formulario.addEventListener('submit', evento => {
      evento.preventDefault();

      const campos = formulario.querySelectorAll('input, select, textarea');
      if (!validarCampos(campos)) return;

      const ingresso = meus.find(i => i.codigo === campoIngresso.value);
      const motivoTexto = campoMotivo.options[campoMotivo.selectedIndex].text;

      // Ainda não há servidor: o pedido fica guardado neste navegador.
      pedidos.push({
        codigo: ingresso ? ingresso.codigo : 'outro',
        evento: ingresso ? ingresso.evento : '',
        motivo: campoMotivo.value,
        motivoTexto,
        detalhes: campoDetalhes.value.trim(),
        email: campoEmail.value.trim().toLowerCase(),
        status: 'em análise',
        criadoEm: new Date().toISOString(),
      });
      salvarReembolsos(pedidos);

      document.getElementById('reemCard').innerHTML = `
        <div class="sucesso">
          <span class="tag green">Pedido enviado</span>
          <h3>Recebemos seu pedido de reembolso</h3>
          <p class="small">
            ${ingresso ? `Ingresso: <b>${esc(ingresso.evento)}</b> (${esc(ingresso.codigo)}).<br>` : ''}
            Motivo: <b>${esc(motivoTexto)}</b>.<br>
            Vamos analisar e responder pelo email ${esc(campoEmail.value.trim())}.
          </p>
          <a class="btn btn-primary" href="meus-ingressos.html">Ver meus ingressos</a>
        </div>`;
    });
  },
};

document.querySelectorAll('[data-logo]').forEach(el => { el.innerHTML = logoSvg(140, 41); });

montarLayout();

const paginaAtual = document.body.dataset.page;
if (paginas[paginaAtual]) paginas[paginaAtual]();