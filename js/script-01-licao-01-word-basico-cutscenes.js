// ===== Configurações =====
const END_REDIRECT = "./proxima-pagina.html"; // ajuste o destino final

// Cutscene com imagem do exemplo para cada fala
const dialogues = [
  {
    name: "Seja bem-vindo!",
    text: "Eu sou o Byte e estarei ao seu lado nessa jornada pelo Microsoft Word. Juntos, vamos aprender de um jeito simples e direto, sem complicação. Tudo pronto para aplicar esse conhecimento no seu dia a dia profissional?",
    example: "./img/01-word-introducao.png"
  },
  {
    name: "O que é o Microsoft Word?",
    text: "O Microsoft Word é como um caderno digital no computador, onde você pode escrever textos, listas, tabelas e inserir imagens. Ele é muito usado para criar documentos importantes. Além disso, oferece ferramentas que deixam o texto organizado e fácil de compartilhar.",
    example: "./img/02-word-exemplos.png"
  },
  {
    name: "O que é o Microsoft Word?",
    text: "A versão que você está vendo é a Microsoft Office 365, mas não se preocupe - se você tiver acesso a uma versão anterior a essa, todas as ferramentas ensinadas aqui também funcionarão nas outras!",
    example: "./img/03-word-ferramentas.png"
  }
];

// ===== Elementos =====
const dialogueName = document.getElementById("dialogueName");
const dialogueText = document.getElementById("dialogueText");
const nextBtn = document.getElementById("nextLine");
const prevBtn = document.getElementById("prevLine");
const exampleShot = document.getElementById("exampleShot");

// Modal
const modal = document.getElementById("imgModal");
const modalImg = document.getElementById("modalImg");
const modalClose = document.getElementById("modalClose");

// ===== Estado =====
let lineIndex = 0;
let typingIndex = 0;
let typingTimer = null;
let isTyping = false;
const TYPING_SPEED = 22; // ms por caractere

// ===== Funções =====
function setName(name){
  dialogueName.textContent = name;
}

function setExample(src){
  if (!src) return;
  exampleShot.setAttribute("src", src);
}

function typeLine(text){
  clearInterval(typingTimer);
  isTyping = true;
  typingIndex = 0;
  dialogueText.textContent = "";
  typingTimer = setInterval(() => {
    dialogueText.textContent = text.slice(0, typingIndex++);
    if (typingIndex > text.length){
      clearInterval(typingTimer);
      isTyping = false;
    }
  }, TYPING_SPEED);
}

function showLine(i){
  const item = dialogues[i];
  if (!item) return;

  setName(item.name);
  setExample(item.example);
  typeLine(item.text);

  // Atualiza controles
  prevBtn.disabled = (i === 0);
  if (i === dialogues.length - 1){
    nextBtn.textContent = "Concluído";
  } else {
    nextBtn.textContent = "Próximo";
  }
}

function showAll(){
  if (!dialogues[lineIndex]) return;
  clearInterval(typingTimer);
  dialogueText.textContent = dialogues[lineIndex].text;
  isTyping = false;
}

function goNext(){
  if (isTyping){
    showAll();
    return;
  }
  if (lineIndex >= dialogues.length - 1){
    // Fim — redireciona
    window.location.href = END_REDIRECT;
    return;
  }
  lineIndex++;
  showLine(lineIndex);
}

function goPrev(){
  if (isTyping){
    showAll();
    return;
  }
  if (lineIndex <= 0) return;
  lineIndex--;
  showLine(lineIndex);
}

// ===== Eventos =====
nextBtn.addEventListener("click", goNext);
prevBtn.addEventListener("click", goPrev);


// Teclado: setas e Enter/Espaço
document.addEventListener("keydown", (e) => {
  if (modal.classList.contains("open")) {
    if (e.key === "Escape") closeModal();
    return;
  }
  if (e.key === "ArrowRight" || e.key === "Enter" || e.key === " ") goNext();
  if (e.key === "ArrowLeft") goPrev();
});

// Modal de imagem (ampliar)
function openModal(){
  modalImg.src = exampleShot.src;
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}
function closeModal(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  modalImg.removeAttribute("src");
}
exampleShot.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  // Fecha clicando fora da imagem
  if (e.target === modal) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.classList.contains("open")) closeModal();
});

// ===== Início =====
showLine(lineIndex);
