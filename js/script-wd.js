// Tela de carregamento

const loadingText = document.getElementById("loading-text");
const progressBar = document.getElementById("progress-bar");
const loadingScreen = document.getElementById("loading-screen");

let totalRecursos = 0;
let carregados = 0;

function contarRecursos() {
  const imgs = Array.from(document.images);
  const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
  const scripts = Array.from(document.querySelectorAll('script[src]'));

  const todos = [...imgs, ...links, ...scripts];

  // Conta apenas os que ainda não carregaram
  totalRecursos = todos.length;
  if (totalRecursos === 0) totalRecursos = 1;

  todos.forEach(recurso => {
    if (recurso.tagName === "IMG") {
      if (recurso.complete) {
        recursoCarregado();
      } else {
        recurso.addEventListener("load", recursoCarregado);
        recurso.addEventListener("error", recursoCarregado);
      }
    }
    else if (recurso.tagName === "LINK") {
      if (recurso.sheet) {
        recursoCarregado();
      } else {
        recurso.addEventListener("load", recursoCarregado);
        recurso.addEventListener("error", recursoCarregado);
      }
    }
    else if (recurso.tagName === "SCRIPT") {
      if (recurso.readyState === "complete") {
        recursoCarregado();
      } else {
        recurso.addEventListener("load", recursoCarregado);
        recurso.addEventListener("error", recursoCarregado);
      }
    }
  });
}

function recursoCarregado() {
  carregados++;
  let progresso = Math.round((carregados / totalRecursos) * 100);
  if (progresso > 100) progresso = 100;
  progressBar.style.width = progresso + "%";
  loadingText.textContent = `Carregando... ${progresso}%`;

  if (progresso >= 100) {
    setTimeout(() => {
      loadingScreen.classList.add("slide-up");
      setTimeout(() => {
        loadingScreen.style.display = "none";
      }, 800);
    }, 300);
  }
}

// Inicia contagem
contarRecursos();


// Estrutura do mapa

const gameArea = document.getElementById("gameArea");
const tileInfo = document.getElementById("tileInfo");

const rows = 8;
const cols = 8;
const tileWidth = 150;
const tileHeight = 76;

  function scaleGameArea() {
    const gameArea = document.getElementById('gameArea');
    const wrapper = document.querySelector('.gameWrapper');

    const originalWidth = 1000;
    const originalHeight = 700;

    const availableWidth = window.innerWidth;
    const availableHeight = window.innerHeight;

    const scaleX = availableWidth / originalWidth;
    const scaleY = availableHeight / originalHeight;

    const scale = Math.min(scaleX, scaleY, 1); // Nunca maior que 1

    gameArea.style.transform = `scale(${scale})`;

    // Ajusta altura da wrapper para manter layout flex
    wrapper.style.height = `${originalHeight * scale}px`;
  }

  window.addEventListener('resize', scaleGameArea);
  window.addEventListener('load', scaleGameArea);

// Geração de mapa
const tileMap = [
  ['V', 'C', 'S', 'C', 'V', 'G', 'C', 'L'],
  ['C', 'V', 'G', 'G', 'G', 'G', 'S', 'L'],
  ['T', 'S', 'A', 'C', 'G', 'G', 'A', 'L'],
  ['V', 'P', 'P', 'P', 'P', 'P', 'R', 'L'],
  ['G', 'G', 'R', 'G', 'G', 'G', 'G', 'L'],
  ['C', 'G', 'G', 'V', 'S', 'C', 'G', 'L'],
  ['S', 'G', 'R', 'G', 'T', 'R', 'V', 'L'],
  ['0', 'F', 'F', 'F', 'F', 'F', 'F', 'F']
];

const tileImages = {
  'G': './img-wd/09.png',
  'P': './img-wd/10.png',
  'R': './img-wd/15.png',
  'C': './img-wd/12.png',
  'S': './img-wd/17.png',
  'T': './img-wd/18.png',
  'A': './img-wd/19.png',
  'F': './img-wd/21.png',
  'L': './img-wd/22.png',
  'V': './img-wd/13.png'
};

// Descrições personalizadas para tiles andáveis 'P'
const tileDescriptionsP = {
  "1_3": {
    titulo: "Lição 01 - Básico: Introdução ao Word",
    texto: "Aqui começa a sua jornada! Descubra o que é o Microsoft Word.",
    link: "./licao-word-iniciante.html"
  },
  "2_3": {
    titulo: "Lição 02 - Básico: Formatar Texto",
    texto: "Aprenda a aplicar negrito, itálico, sublinhado e tachado.",
    link: "./01-licao-02-word-basico.html"
  },
  "3_3": {
    titulo: "Lição 03 - Básico: Resolva um Problema",
    texto: "O Byte precisa destacar o texto de um documento. Ajude-o nessa tarefa.",
    link: "./01-licao-03-word-basico.html"
  },
  "5_1": {
    titulo: "Cabeçalho e Rodapé",
    texto: "Entenda como configurar cabeçalhos e rodapés com praticidade.",
    link: "./cabecalho-roda.html"
  },
  "5_2": {
    titulo: "Salvar e Compartilhar",
    texto: "Descubra como salvar e compartilhar seu documento com segurança.",
    link: "./salvar-compartilhar.html"
  },
  "0_3": {
    titulo: "Revisão Ortográfica",
    texto: "Use o corretor ortográfico e outras ferramentas de revisão.",
    link: "./revisao.html"
  },
  "0_4": {
    titulo: "Atalho de Teclado",
    texto: "Melhore sua produtividade com atalhos úteis.",
    link: "./atalhos.html"
  }
};


// Verifica se o tile é andável
function isWalkable(x, y) {
  const tipo = tileMap[y]?.[x];
  return !['R', 'G', 'C', 'S', 'A', 'T', 'L', 'V'].includes(tipo);
}

function createMap() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const tile = document.createElement("div");
      tile.className = "tile";

      const tipo = tileMap[y][x];
      tile.style.backgroundImage = `url('${tileImages[tipo]}')`;

      const isoX = (x - y) * (tileWidth / 2);
      let isoY = (x + y) * (tileHeight / 2);

      if (tipo === 'R') {
        tile.style.height = '90px';
        isoY -= (87 - tileHeight);
      } else if (tipo === 'V') {
        tile.style.height = '153px';
        isoY -= (150 - tileHeight);
      } else if (tipo === 'C') {
        tile.style.height = '148px';
        isoY -= (144.4 - tileHeight);
      } else if (tipo === 'S') {
        tile.style.height = '100px';
        isoY -= (97 - tileHeight);
      } else if (tipo === 'F') {
        tile.style.width = '76px';
        tile.style.height = '112px';
        isoY -= (111 - tileHeight);
      } else if (tipo === 'L') {
        tile.style.width = '76px';
        tile.style.height = '112px';
        isoY -= (73 - tileHeight);
      } else if (tipo === 'T' || tipo === 'A') {
        isoY -= (77 - tileHeight);
      } else if (tipo === 'P') {
        tile.classList.add("clicavel");
      }

      tile.style.left = `${isoX + 400}px`;
      tile.style.top = `${isoY}px`;

      tile.dataset.x = x;
      tile.dataset.y = y;
      tile.dataset.tipo = tipo;

      tile.addEventListener("click", () => {
        const destX = parseInt(tile.dataset.x);
        const destY = parseInt(tile.dataset.y);
        const tipo = tile.dataset.tipo;

        if (tipo === "P") {
          const key = `${destX}_${destY}`;
          const desc = tileDescriptionsP[key];

          if (desc) {
            tileInfo.innerHTML = `
            <div class="tile-title">${desc.titulo}</div>
            <div class="tile-texto">${desc.texto}</div>
            <a href="${desc.link}" target="_self" class="tile-link"><button>Começar</button></a>
`;
            tileInfo.style.display = "block";
          } else {
            tileInfo.innerText = `Tile clicável sem descrição personalizada.`;
            tileInfo.style.display = "block";
          }

        // Determina a direção com base na diferença entre a posição atual e a nova
        if (destX > playerX) {
  updatePlayerSprite("right");
} else if (destX < playerX) {
  updatePlayerSprite("left");
} else if (destY > playerY) {
  updatePlayerSprite("down");
} else if (destY < playerY) {
  updatePlayerSprite("up");
}

// Atualiza posição do jogador e movimento
playerX = destX;
playerY = destY;
updatePlayerPosition();
        } else {
          tileInfo.style.display = "none";
        }
      });

      gameArea.appendChild(tile);
    }
  }
}

const player = document.createElement("div");
player.id = "player";
player.style.backgroundImage = "url('./img-wd/23.png')";
gameArea.appendChild(player);

let playerX = 1;
let playerY = 3;
let currentDirection = "left";

function updatePlayerSprite(direction) {
  const sprites = {
    up: "./img-wd/24.png",
    down: "./img-wd/25.png",
    left: "./img-wd/26.png",
    right: "./img-wd/23.png"
  };

  if (sprites[direction]) {
    player.style.backgroundImage = `url('${sprites[direction]}')`;
    currentDirection = direction;
  }
}

function updatePlayerPosition() {
  const isoX = (playerX - playerY) * (tileWidth / 2);
  const isoY = (playerX + playerY) * (tileHeight / 2);

  player.style.left = `${isoX + 315 + 115}px`;
  player.style.top = `${isoY - 77}px`;
}

// Movimentação da personagem
document.addEventListener("keydown", (e) => {
  let targetX = playerX;
  let targetY = playerY;

  if (e.key === "ArrowUp" && playerY > 0) {
    targetY--;
    updatePlayerSprite("up");
  }
  if (e.key === "ArrowDown" && playerY < rows - 1) {
    targetY++;
    updatePlayerSprite("down");
  }
  if (e.key === "ArrowLeft" && playerX > 0) {
    targetX--;
    updatePlayerSprite("left");
  }
  if (e.key === "ArrowRight" && playerX < cols - 1) {
    targetX++;
    updatePlayerSprite("right");
  }

  if ((targetX !== playerX || targetY !== playerY) && isWalkable(targetX, targetY)) {
    playerX = targetX;
    playerY = targetY;
    updatePlayerPosition();

    // Verificar se é um tile P e ativar descrição
    const tipo = tileMap[playerY][playerX];
    if (tipo === "P") {
      const key = `${playerX}_${playerY}`;
      const desc = tileDescriptionsP[key];

      if (desc) {
        tileInfo.innerHTML = `
          <div class="tile-title">${desc.titulo}</div>
          <div class="tile-texto">${desc.texto}</div>
          <a href="${desc.link}" target="_self" class="tile-link"><button>Começar</button></a>
        `;
        tileInfo.style.display = "block";
      } else {
        tileInfo.innerText = `Tile clicável sem descrição personalizada.`;
        tileInfo.style.display = "block";
      }
    } else {
      tileInfo.style.display = "none";
    }
  }
});


createMap();
updatePlayerPosition();

// Exibir automaticamente a primeira descrição ao carregar a página
(function showInitialTileInfo() {
  const key = "1_3";
  const desc = tileDescriptionsP[key];
  if (desc) {
    tileInfo.innerHTML = `
      <div class="tile-title">${desc.titulo}</div>
      <div class="tile-texto">${desc.texto}</div>
      <a href="${desc.link}" target="_self" class="tile-link"><button>Começar</button></a>
    `;
    tileInfo.style.display = "block";
  }
})();


// Selecionar curso e módulo

  const btnWord = document.getElementById('btnWord');
  const menuWord = document.getElementById('menuWord');

  const dropdownOptions = document.querySelectorAll('.dropdown-option');
  const overlayModulo = document.getElementById('overlay-modulo');
  const overlayCurso = document.getElementById('overlay-curso');
  const cardsModulo = document.getElementById('cardsModulo');
  const cardsCurso = document.getElementById('cardsCurso');
  const fecharButtons = document.querySelectorAll('.fecharOverlay');


  // Dados dos cards com ações específicas
  const cardsData = {
    dificuldade: [
      {
        img1: './img-wd/35.png',
        titulo: 'Básico',
        texto: 'Comece pelo essencial do Word.',
        acao: () => window.location.href = 'index-word.html',
      },
      {
        img1: './img-wd/36.png',
        titulo: 'Médio',
        texto: 'Aprimore suas habilidades.',
        acao: () => alert('Você escolheu o nível Intermediário!'),
      },
      {
        img1: './img-wd/37.png',
        titulo: 'Avançado',
        texto: 'Torne-se um mestre no Word.',
        acao: () => alert('Você escolheu o nível Avançado!'),
      },
    ],
    curso: [
      {
        img1: './img/37.png',
        titulo: 'Excel',
        texto: 'Faça planilhas como um expert.',
        acao: () => window.location.href = 'excel.html',
      },
      {
        img1: './img/38.png',
        titulo: 'PowerPoint',
        texto: 'Crie apresentações incríveis.',
        acao: () => window.location.href = 'index-powerpoint.html',
      },
      {
        img1: './img/39.png',
        titulo: 'Word',
        texto: 'Domine a edição de texto.',
        acao: () => window.location.href = 'index-word.html',
      },
    ]
  };

  // Alternar menu dropdown
  btnWord.addEventListener('click', () => {
    menuWord.classList.toggle('mostrar');
    overlay.classList.add('escondido'); // sempre esconde cards ao abrir menu
  });



  // Fecha o menu ao clicar fora
document.addEventListener("click", function (event) {
  const isClickInside = btnWord.contains(event.target) || menuWord.contains(event.target);
  if (!isClickInside) {
    menuWord.classList.remove("mostrar");
  }
});


  // Mostrar cards da opção clicada
dropdownOptions.forEach(opcao => {
  opcao.addEventListener('click', () => {
    const tipo = opcao.getAttribute('data-opcao');
    const cards = cardsData[tipo];

    if (tipo === 'dificuldade') {
      cardsModulo.innerHTML = '';
      cards.forEach(card => {
        const div = document.createElement('div');
        div.className = 'card-opcao card-modulo';
        div.innerHTML = `
          <img src="${card.img1}" alt="Imagem" class="img-topo" />
          <h3>${card.titulo}</h3>
          <p>${card.texto}</p>
          <button>Selecionar</button>
        `;
        div.querySelector('button').addEventListener('click', card.acao);
        cardsModulo.appendChild(div);
      });
      overlayModulo.classList.remove('overlay-escondido');
} else if (tipo === 'curso') {
  cardsCurso.innerHTML = '';
  cards.forEach((card, index) => {
    const div = document.createElement('div');
    div.className = `card-opcao card-curso card-curso-${index + 1}`;
    div.innerHTML = `
      <img src="${card.img1}" alt="Imagem" class="img-topo" />
      <h3>${card.titulo}</h3>
      <p>${card.texto}</p>
      <button>Selecionar</button>
    `;
    div.querySelector('button').addEventListener('click', card.acao);
    cardsCurso.appendChild(div);
  });
  overlayCurso.classList.remove('overlay-escondido');
}


    menuWord.classList.remove('mostrar');
  });
});


  // Fechar overlay de escolher módulo e curso
fecharButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    overlayModulo.classList.add('overlay-escondido');
    overlayCurso.classList.add('overlay-escondido');
  });
});


//Dropdown Pontos
const botaoPontuacao = document.getElementById("botaoPontuacao");
const menuPontuacao = document.getElementById("menuPontuacao");

botaoPontuacao.addEventListener("click", function (e) {
  e.stopPropagation(); // Impede o clique de propagar para o document
  menuPontuacao.classList.toggle("mostrar");

  // Resetar transformações anteriores
  menuPontuacao.style.transform = "translateX(0)";

  // Verifica se está saindo da tela
  const rect = menuPontuacao.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    menuPontuacao.style.transform = "translateX(-40%)";
  }
});

// Fecha ao clicar fora do menu
document.addEventListener("click", function (event) {
  const isClickInside = botaoPontuacao.contains(event.target) || menuPontuacao.contains(event.target);

  if (!isClickInside) {
    menuPontuacao.classList.remove("mostrar");
  }
});

//Dropdown Vidas
const botaoVidas = document.getElementById("botaoVidas");
const menuVidas = document.getElementById("menuVidas");

botaoVidas.addEventListener("click", function (e) {
  e.stopPropagation(); // Impede o clique de propagar para o document
  menuVidas.classList.toggle("mostrar");

  // Resetar transformações anteriores
  menuVidas.style.transform = "translateX(0)";

  // Verifica se está saindo da tela
  const rect = menuVidas.getBoundingClientRect();
  if (rect.right > window.innerWidth) {
    menuVidas.style.transform = "translateX(-40%)";
  }
});

// Fecha ao clicar fora do menu
document.addEventListener("click", function (event) {
  const isClickInside = botaoVidas.contains(event.target) || menuVidas.contains(event.target);

  if (!isClickInside) {
    menuVidas.classList.remove("mostrar");
  }
});
