let selectedIcon = null;
let selectedDescription = null;
const totalPairs = 4;
let matchedPairs = 0;
let lives = 7;
let score = 10;
const cooldownKey = "cooldownUntil";
let cooldownUntil = localStorage.getItem(cooldownKey);

// // Checa se está no cooldown de 24h
if (cooldownUntil && Date.now() < cooldownUntil) {
 document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>Você perdeu todas as vidas! Volte em 24 horas para tentar novamente.</h1>";
 } else {
   localStorage.removeItem(cooldownKey);
 }

 function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [array[i], array[j]] = [array[j], array[i]];
   }
 }


function shuffleOptions() {
  // Ícones
  const iconsContainer = document.getElementById("icons");
  const icons = Array.from(iconsContainer.children);
  shuffleArray(icons);
  icons.forEach(icon => iconsContainer.appendChild(icon));

  // Descrições
  const descContainer = document.getElementById("descriptions");
  const descriptions = Array.from(descContainer.children);
  shuffleArray(descriptions);
  descriptions.forEach(desc => descContainer.appendChild(desc));
}

function updateProgressBar() {
  let progress = (matchedPairs / totalPairs) * 100;
  const progressBar = document.getElementById("progress-bar");
  if (progressBar) {
    progressBar.style.width = progress + "%";
  }
  const container = document.getElementById("progress-bar-container");
  if (container) {
    container.setAttribute("aria-valuenow", progress.toFixed(0));
  }
}

function updateLives() {
  document.getElementById("valorVidas").textContent = lives;
}

function updateScore() {
  document.getElementById("valorPontuacao").textContent = score;
}


function showMessage(msg, type) {
  const message = document.getElementById("message");
  if (!message) return;
  message.textContent = msg;
  message.style.color = type === "success" ? "#58cc02" : "#ff4b4b";
  setTimeout(() => { message.textContent = ""; }, 1500);
}

function resetSelection() {
  if (selectedIcon) {
    selectedIcon.classList.remove("selected");
    selectedIcon.setAttribute("aria-pressed", "false");
  }
  if (selectedDescription) {
    selectedDescription.classList.remove("selected");
    selectedDescription.setAttribute("aria-pressed", "false");
  }
  selectedIcon = null;
  selectedDescription = null;
}

function markCorrect(option) {
  option.classList.add("correct");
  option.setAttribute("aria-pressed", "true");
  option.disabled = true;
}

document.querySelectorAll(".option").forEach(option => {
  option.addEventListener("click", function () {
    if (this.classList.contains("correct")) return; // Ignora já corretos

    if (!selectedIcon && this.closest("#icons")) {
      selectedIcon = this;
      this.classList.add("selected");
      this.setAttribute("aria-pressed", "true");
    } else if (!selectedDescription && this.closest("#descriptions")) {
      selectedDescription = this;
      this.classList.add("selected");
      this.setAttribute("aria-pressed", "true");
    }

    if (selectedIcon && selectedDescription) {
      if (selectedIcon.dataset.pair === selectedDescription.dataset.pair) {
        markCorrect(selectedIcon);
        markCorrect(selectedDescription);
        matchedPairs++;
        updateProgressBar();
        // showMessage("Correto!", "success");

if (matchedPairs === totalPairs) {
  showMessage("Parabéns! Lição concluída!", "success");

  // Mostra o botão de finalizar
  document.getElementById("finalizar-container").style.display = "block";
}

        resetSelection();
      } else {
        // Animação de erro
        selectedIcon.classList.add("error-shake");
        selectedDescription.classList.add("error-shake");

        lives--;
        score = Math.max(0, score - 1); // nunca negativo
        updateLives();
        updateScore();

        setTimeout(() => {
          selectedIcon.classList.remove("error-shake");
          selectedDescription.classList.remove("error-shake");
          resetSelection();
        }, 600);

        if (lives <= 0) {
          localStorage.setItem(cooldownKey, Date.now() + 24 * 60 * 60 * 1000);
          document.body.innerHTML = "<h1 style='text-align:center;margin-top:50px;'>Game Over! Volte em 24 horas.</h1>";
        }
      }
    }
  });
});

// Inicializa o jogo embaralhando as opções e atualizando UI
shuffleOptions();
updateLives();
updateScore();
updateProgressBar();