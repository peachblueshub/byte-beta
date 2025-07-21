const gameArea = document.getElementById("gameArea");
const tileInfo = document.getElementById("tileInfo");

const rows = 8;
const cols = 8;
const tileWidth = 150;
const tileHeight = 76;

const tileMap = [
  ['V', 'C', 'G', 'P', 'V', 'G', 'C', 'L'],
  ['C', 'V', 'G', 'P', 'P', 'P', 'S', 'L'],
  ['T', 'S', 'A', 'C', 'G', 'P', 'A', 'L'],
  ['P', 'P', 'P', 'P', 'P', 'P', 'R', 'L'],
  ['V', 'G', 'R', 'G', 'G', 'G', 'G', 'L'],
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

        tileInfo.innerText = `Tipo: ${tipo} | Posição: (${destX}, ${destY})`;

        if (tipo === "P") {
          playerX = destX;
          playerY = destY;
          updatePlayerPosition();
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
