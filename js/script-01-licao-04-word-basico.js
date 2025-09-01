const mensagens = document.querySelectorAll(".mensagem");
const progressBar = document.getElementById("progress-bar");
const finalizarBtn = document.getElementById("finalizarBtn");

let progresso = 0;
const total = mensagens.length;

// Função para iniciar a lição e mostrar a primeira mensagem
function iniciarLicao() {
  mensagens.forEach((m, i) => {
    if (i === 0) m.style.display = "flex";
    else m.style.display = "none";

    const botoes = m.querySelectorAll("button");
    botoes.forEach(btn => {
      btn.classList.remove("correto", "errado");
      btn.disabled = false;
    });
  });

  progresso = 0;
  progressBar.style.width = "0%";
  finalizarBtn.style.display = "none";
}

iniciarLicao();

mensagens.forEach((mensagem, index) => {
  const botoes = mensagem.querySelectorAll("button");

  botoes.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.dataset.correto === "true" && !btn.classList.contains("correto")) {
        // Acerto
        btn.classList.add("correto");
        btn.disabled = true;
        progresso++;
        progressBar.style.width = (progresso / total) * 100 + "%";

        if (mensagens[index + 1]) {
          mensagens[index + 1].style.display = "flex";
        } else {
          finalizarBtn.style.display = "inline-block";
        }
      } else if (btn.dataset.correto === "false") {
        // Erro
        btn.classList.add("errado");
        btn.disabled = true;

        setTimeout(() => {
          btn.classList.remove("errado");
          btn.disabled = false;
        }, 800);
      }
    });
  });
});