// Variáveis globais simples
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
if (btn.textContent === correta) {
btn.classList.add("certa");
} else if (btn.classList.contains("selecionada")) {
btn.classList.add("errada");
}
});

espaco1.textContent = respostaSelecionada;

if (respostaSelecionada === correta) {
exp.textContent = "Muito bem! O Word é usado para editar e criar documentos de texto.";
} else {
exp.textContent = "Ops! A resposta correta é 'Editar'. O Word é feito para trabalhar com textos.";
}

exp.style.display = "block";
progressoBar.style.width = "100%";
confirmBtn.style.display = "none";
proximaBtn.style.display = "inline-block";
}

function reiniciarLicao() {
window.location.reload();
}

function finalizar() {
alert("Parabéns! Você concluiu sua primeira lição!");
window.location.href = "mapa-word.html";
}
