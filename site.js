
window.EVENTOS = [
  { id: 1, titulo: 'Show 1',               preco: 80,  data: 'Sábado · 20h'  },
  { id: 2, titulo: 'Show 2',               preco: 95,  data: 'Sexta · 22h'   },
  { id: 3, titulo: 'Show 3',               preco: 120, data: 'Sábado · 22h'  },
  { id: 4, titulo: 'Calourada Engenharia', preco: 25,  data: 'Sábado · 22h'  },
  { id: 5, titulo: 'Festival de Inverno',  preco: 110, data: 'Domingo · 16h' },
  { id: 6, titulo: 'Open Air Medicina',    preco: 70,  data: 'Sexta · 21h'   },
  { id: 7, titulo: 'Bateria Day',          preco: 40,  data: 'Sábado · 14h'  },
  { id: 8, titulo: 'Noite do Direito',     preco: 60,  data: 'Quinta · 22h'  },
  { id: 9, titulo: 'Sunset Campus',        preco: 85,  data: 'Domingo · 17h' },
];

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
}

function inserirBarraDeNavegacao() {
  const html = `
    <header class="nav">
      <div class="wrap nav-in">

        <a class="brand" href="index.html">
          <img src="logo.svg" alt="CampusPass" width="140" height="41">
        </a>

        <button class="burger" aria-label="Abrir menu" aria-expanded="false">☰</button>

        <div class="menu" id="menu">
          <form class="search" role="search">
            <input class="in" type="search" id="busca"
                   placeholder="Buscar eventos" aria-label="Buscar eventos">
            <button class="btn btn-primary">Buscar</button>
          </form>

          <a href="#">Suporte</a>
          <a id="conta" href="login.html">Entre / Cadastre-se</a>
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
              <img src="logo.svg" alt="CampusPass" width="120" height="35">
            </span>
            <p>Os melhores rolês da sua universidade, em um só lugar.</p>
          </div>

          <div>
            <h4>Institucional</h4>
            <a href="#">Sobre nós</a>
            <a href="#">Trabalhe conosco</a>
            <a href="#">Termos de uso</a>
          </div>

          <div>
            <h4>Ajuda</h4>
            <a href="#">Central de suporte</a>
            <a href="#">Meus ingressos</a>
            <a href="#">Reembolso</a>
          </div>

          <div>
            <h4>Receba as novidades</h4>
            <form>
              <input class="in" type="email" placeholder="seu@email.com" aria-label="E-mail">
              <button class="btn btn-yellow">Assinar</button>
            </form>
          </div>
        </div>

        <div class="foot-end">
          <span>© 2026 CampusPass. Todos os direitos reservados.</span>
          <span>CNPJ 60.589.329/0001-61</span>
        </div>

      </div>
    </footer>`;

  document.body.insertAdjacentHTML('beforeend', html);
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


const paginas = {

  index() {
    const caixa = document.getElementById('listaEventos');

    function montarCard(evento, posicao) {

      const seloUrgencia = posicao === 0
        ? '<span class="tag coral">67 pessoas comprando agora</span>'
        : '';

      const seloData = evento.data
        ? `<span class="tag yellow">${esc(evento.data)}</span>`
        : '';

      return `
        <article class="ev">
          <div class="ev-top">
            ${seloUrgencia}
            ${seloData}
          </div>

          <div class="ev-body">
            <h3>${esc(evento.titulo)}</h3>

            <div class="ev-foot">
              <div>
                <span class="small">a partir de</span>
                <div class="price">${brl(evento.preco)}</div>
              </div>

              <a class="btn btn-primary"
                 href="comprar.html?evento=${encodeURIComponent(evento.id)}">Comprar</a>
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

    const linhas = [...document.querySelectorAll('.row')]; 
    const botaoFinalizar = document.getElementById('fin');
    const janela = document.getElementById('ok');

    // Funções que leem uma linha de ingresso
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

      // Agrupa de 4 em 4: "445566" -> "4455 66"
      const agrupar = digitos => digitos.replace(/(.{4})(?=.)/g, '$1 ');

      campoNumero.addEventListener('input', () => {
        const digitos = campoNumero.value.replace(/\D/g, '').slice(0, 16);

        campoNumero.value = agrupar(digitos);
        // Os dígitos que faltam aparecem como *
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

    function ativarConfirmacao() {
      botaoFinalizar.onclick = () => {
        const comprados = linhas.filter(linha => quantidadeDe(linha) > 0);

        document.getElementById('tks').innerHTML = comprados.map(montarIngresso).join('');
        janela.showModal();
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
};


montarLayout();

const paginaAtual = document.body.dataset.page;
if (paginas[paginaAtual]) paginas[paginaAtual]();
