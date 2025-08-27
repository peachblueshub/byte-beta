// Configuração da cutscene
const dialogues = [
 {
   name: "Seja bem-vindo!",
   text: "Eu sou o Byte. Vamos começar nossa aventura pelo Microsoft Word.\nPronta(o) para aprender?"
 },
 {
   name: "O que é o Microsoft Word?",
   text: "Durante as cutscenes, você verá minha fala aqui à direita,\nenquanto eu apareço à esquerda da tela."
 },
 {
   name: "Ayla",
   text: "Quando quiser avançar, clique em “Continuar”.\nSe preferir pular o efeito de digitação, use “Mostrar tudo”."
 }
];
// ELEMENTOS
const dialogueName = document.getElementById("dialogueName");
const dialogueText = document.getElementById("dialogueText");
const characterName = document.getElementById("characterName");
const nextBtn = document.getElementById("nextLine");
const skipBtn = document.getElementById("skipType");
// ESTADO
let lineIndex = 0;
let typingIndex = 0;
let typingTimer = null;
let isTyping = false;
const TYPING_SPEED = 22; // ms por caractere (ajuste se quiser)
// FUNÇÕES
function setName(name){
 dialogueName.textContent = name;
 characterName.textContent = name;
}
function typeLine(text){
 clearInterval(typingTimer);
 isTyping = true;
 typingIndex = 0;
 dialogueText.textContent = "";
 typingTimer = setInterval(() => {
   // mostra gradualmente
   dialogueText.textContent = text.slice(0, typingIndex++);
   if (typingIndex > text.length){
     clearInterval(typingTimer);
     isTyping = false;
   }
 }, TYPING_SPEED);
}
function showLine(i){
 const { name, text } = dialogues[i];
 setName(name);
 typeLine(text);
}
function showAll(){
 if (!dialogues[lineIndex]) return;
 clearInterval(typingTimer);
 dialogueText.textContent = dialogues[lineIndex].text;
 isTyping = false;
}
function nextLine(){
 if (isTyping){
   // se ainda digitando, mostrar tudo primeiro
   showAll();
   return;
 }
 lineIndex++;
 if (lineIndex >= dialogues.length){
   // fim da cutscene (você pode redirecionar ou fechar)
   dialogueText.textContent = "Fim da cutscene. Obrigada(o) por assistir!";
   nextBtn.disabled = true;
   nextBtn.textContent = "Concluído";
   return;
 }
 showLine(lineIndex);
}
// EVENTOS
nextBtn.addEventListener("click", nextLine);
skipBtn.addEventListener("click", showAll);
// Permite avançar clicando em qualquer área da fala
document.querySelector(".dialogue").addEventListener("click", (e) => {
 // Evita conflito quando clica nos botões
 if (e.target.tagName.toLowerCase() === "button") return;
 nextLine();
});
// INÍCIO
showLine(lineIndex);