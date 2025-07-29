const gameArea = document.getElementById("gameArea");
const tileInfo = document.getElementById("tileInfo");

const rows = 8;
const cols = 8;
const tileWidth = 150;
const tileHeight = 76;

// Geração de mapa
// G: grama // P: piso dourado // R: rocha1 // S: stone/rocha2 // C: cacto // T: terra1 // A: terra2 // F: floor1 // L: floor2 
const tileMap = [
  ['C', 'C', 'G', 'P', 'G', 'G', 'C', 'L'],
  ['C', 'C', 'G', 'P', 'G', 'G', 'S', 'L'],
  ['T', 'S', 'A', 'P', 'G', 'C', 'A', 'L'],
  ['P', 'P', 'C', 'P', 'T', 'R', 'G', 'L'],
  ['C', 'P', 'R', 'P', 'G', 'G', 'G', 'L'],
  ['C', 'P', 'P', 'P', 'S', 'C', 'G', 'L'],
  ['S', 'G', 'R', 'G', 'T', 'G', 'G', 'L'],
  ['0', 'F', 'F', 'F', 'F', 'F', 'F', 'F']
];

const tileImages = {
  'G': './img-pp/09.png',
  'P': './img-pp/10.png',
  'R': './img-pp/15.png',
  'C': './img-pp/12.png',
  'S': './img-pp/17.png',
  'T': './img-pp/18.png',
  'A': './img-pp/19.png',
  'F': './img-pp/21.png',
  'L': './img-pp/22.png'
};

// Descrições personalizadas para tiles andáveis 'P'
const tileDescriptionsP = {
  "3_0": {
    titulo: "Lição 01 - Básico: Introdução ao Word",
    texto: "Aqui começa a sua jornada! Descubra o que é o Microsoft Word.",
    link: "./licao-word-iniciante.html"
  },
  "3_1": {
    titulo: "Formatar Texto",
    texto: "Aprenda a aplicar negrito, itálico e sublinhado.",
    link: "./formatar-texto.html"
  },
  "4_1": {
    titulo: "Inserir Imagens",
    texto: "Veja como adicionar e posicionar imagens em seu documento.",
    link: "./inserir-imagens.html"
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
  "1_3": {
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
        tile.style.height = '98px';
        isoY -= (97 - tileHeight);
      } else if (tipo === 'V') {
        tile.style.height = '153px';
        isoY -= (150 - tileHeight);
      } else if (tipo === 'C') {
        tile.style.height = '150px';
        isoY -= (150 - tileHeight);
      } else if (tipo === 'S') {
        tile.style.height = '86px';
        isoY -= (86 - tileHeight);
      } else if (tipo === 'F') {
        tile.style.width = '76px';
        tile.style.height = '112px';
        isoY -= (111 - tileHeight);
      } else if (tipo === 'L') {
        tile.style.width = '76px';
        tile.style.height = '112px';
        isoY -= (73 - tileHeight);
      } else if (tipo === 'T' || tipo === 'A') {
        isoY -= (76 - tileHeight);
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
player.style.backgroundImage = "url('./img-wd/25.png')";
gameArea.appendChild(player);

let playerX = 3;
let playerY = 0;
let currentDirection = "down";

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
  const key = "3_0";
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