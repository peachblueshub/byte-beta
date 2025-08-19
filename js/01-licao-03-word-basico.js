const options = document.querySelectorAll(".option");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const finalizarContainer = document.getElementById("finalizar-container");

options.forEach(option => {
  option.addEventListener("click", () => {
    const isCorrect = option.getAttribute("data-correct") === "true";

    if (isCorrect) {
      feedback.textContent = "✅ Correto! O negrito é usado para destacar palavras importantes.";
      feedback.style.color = "green";

      // destaca a opção correta em verde
      option.classList.add("correct");

      // enche a barra até 100%
      progressBar.style.width = "100%";
      progressBar.setAttribute("aria-valuenow", "100");

      // mostra botão de finalizar
      finalizarContainer.style.display = "block";
    } else {
      feedback.textContent = "❌ Quase lá! O negrito é a forma mais comum de destacar um texto no Word.";
      feedback.style.color = "red";
    }

    // desabilita todos os botões
    options.forEach(btn => btn.disabled = true);
  });
});
