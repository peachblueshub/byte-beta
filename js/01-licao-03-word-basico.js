const options = document.querySelectorAll(".option");
const feedback = document.getElementById("feedback");

// Carregar animação de confete
const confettiAnim = lottie.loadAnimation({
  container: document.getElementById('lottie-confetti'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: './Confetti.json' // caminho do JSON do confete
});

// Função para mostrar confete
function showConfetti() {
  confettiAnim.goToAndStop(0, true); // reinicia a animação
  confettiAnim.play();
}

options.forEach(option => {
  option.addEventListener("click", () => {
    const isCorrect = option.getAttribute("data-correct") === "true";

    if (isCorrect) {
      feedback.textContent = "Correto! O negrito é usado para destacar palavras importantes.";
      feedback.style.color = "green";
      showConfetti(); // mostra confete
    } else {
      feedback.textContent = "Quase lá! O negrito é a forma mais comum de destacar um texto no Word.";
      feedback.style.color = "red";
    }

    // Desabilitar todos os botões após a escolha
    options.forEach(btn => btn.disabled = true);
  });
});
