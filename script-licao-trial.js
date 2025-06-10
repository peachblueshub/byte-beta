let respostaSelecionada = null;
const correta = "Editar";

const progressoBar = document.getElementById("progressoLicao");
const exp = document.getElementById("explicacao1");
const confirmBtn = document.getElementById("confirmar");
const proximaBtn = document.getElementById("botaoProxima");
const espaco1 = document.getElementById("espaco1");

function selecionar(botao) {
  // Remove seleção anterior
  document.querySelectorAll(".palavra").forEach(btn => {
    btn.classList.remove("selecionada");
  });
  botao.classList.add("selecionada");
  respostaSelecionada = botao.textContent;
  // Permite confirmar
  confirmBtn.disabled = false;
}

function confirmarResposta() {
  if (!respostaSelecionada) return;

  const botoes = document.querySelectorAll(".palavra");

  botoes.forEach(btn => {
  btn.disabled = true;
  if (respostaSelecionada === correta) {
  
  if (btn.textContent === correta) {
  btn.classList.add("certa");
      }
  } else {
     
  if (btn.classList.contains("selecionada")) {
  btn.classList.add("errada");
      }
    }
  });


  espaco1.textContent = respostaSelecionada;

  if (respostaSelecionada === correta) {
    exp.textContent = "Muito bem! Você completou a sua primeira lição no Byte! Finalize o seu cadastro para ter acesso a todas as lições.";
    exp.style.display = "block";
    progressoBar.style.width = "100%";
    confirmBtn.style.display = "none";
    proximaBtn.style.display = "inline-block";
  } else {
    exp.textContent = "Quase lá! Tente novamente clicando em revisar.";
    exp.style.display = "block";
    progressoBar.style.width = "0%"; 
    confirmBtn.style.display = "none";
    proximaBtn.style.display = "none"; 
  }
}

function reiniciarLicao() {
  window.location.reload();
}

function finalizar() {
  window.location.href = "cadastro.html";
}
