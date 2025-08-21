  const mensagens = document.querySelectorAll(".mensagem");
    const progressBar = document.getElementById("progress-bar");
    const finalizarBtn = document.getElementById("finalizarBtn");

    let progresso = 0;
    const total = mensagens.length;

    function iniciarLicao() {
      progresso = 0;
      progressBar.style.width = "0%";
      finalizarBtn.style.display = "none";

      mensagens.forEach(m => m.style.display = "none");

      mensagens[0].style.display = "block";
    }

    iniciarLicao();

    mensagens.forEach((mensagem, index) => {
      const botoes = mensagem.querySelectorAll("button");

      botoes.forEach(btn => {
        btn.addEventListener("click", () => {
          if (btn.dataset.correto === "true") {
            btn.classList.add("correto");
            progresso++;
            progressBar.style.width = (progresso / total) * 100 + "%";

            if (mensagens[index + 1]) {
              mensagens[index + 1].style.display = "block";
            } else {
              finalizarBtn.style.display = "inline-block";
            }
          } else {
            btn.classList.add("errado");

            // Espera a animação de shake terminar e reseta a lição
            setTimeout(() => {
              iniciarLicao();
            }, 800);
          }
        });
      });
    });