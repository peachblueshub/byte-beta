const gameArea = document.getElementById("gameArea");

const rows = 8;
const cols = 8;
const tileWidth = 150;
const tileHeight = 76;

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

// G: grama // P: piso dourado // R: rocha1 // S: stone/rocha2 // C: cacto // T: terra1 // A: terra2 // F: floor1 // L: floor2 
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

// verifica se o tile é passável
function isWalkable(x, y) {
  const tipo = tileMap[y]?.[x];
  return !['R', 'G', 'C', 'S', 'A', 'T'].includes(tipo); // bloqueia tiles
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
        tile.style.height = '99px';
        isoY -= (95.5 - tileHeight);
      } else if (tipo === 'C') {
        tile.style.height = '153px';
        isoY -= (150 - tileHeight);
      } else if (tipo === 'S') {
        tile.style.height = '89px';
        isoY -= (86 - tileHeight);
      } else if (tipo === 'F') {
        tile.style.width = '76px';
        tile.style.height = '112px';
        isoY -= (111 - tileHeight);
      } else if (tipo === 'L') {
        tile.style.width = '76px';
        tile.style.height = '112px';
        isoY -= (73 - tileHeight);
      }

      tile.style.left = `${isoX + 400}px`;
      tile.style.top = `${isoY}px`;

      gameArea.appendChild(tile);
    }
  }
}

// Personagem com imagens
const player = document.createElement("div");
player.id = "player";
player.style.backgroundImage = "url('./img-pp/23.png')";
gameArea.appendChild(player);

let playerX = 0;
let playerY = 3;
let currentDirection = "down";

function updatePlayerSprite(direction) {
  const sprites = {
    up: "./img-pp/24.png",
    down: "./img-pp/25.png",
    left: "./img-pp/26.png",
    right: "./img-pp/23.png"
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
  }
});

createMap();
updatePlayerPosition();
