// ---------- Configuração da Fase ----------
const QUESTIONS = [
  {
    id: 1,
    text: "Título do documento: qual opção define um Título centralizado corretamente?",
    options: [
      { label: "Normal, 14 pt, alinhado à esquerda", correct: false, tip: "Use o estilo de TÍTULO e centralize." },
      { label: "Título, 24 pt, centralizado", correct: true, tip: "Isso! Estilo Título já padroniza." },
      { label: "Cabeçalho, 10 pt, justificado", correct: false, tip: "Cabeçalho ≠ Título do documento." },
    ],
    badge: "Títulos & Alinhamento",
  },
  {
    id: 2,
    text: "Formatar texto: o que fazer com 'Objetivo' e 'Experiências'?",
    options: [
      { label: "Objetivo em itálico; Experiências em riscado", correct: false, tip: "Riscado? Só se for correção." },
      { label: "Objetivo em negrito; Experiências sublinhado", correct: true, tip: "Perfeito para destacar seções." },
      { label: "Ambos em caixa alta e cor vermelha", correct: false, tip: "Evite poluição visual." },
    ],
    badge: "Formatação",
  },
  {
    id: 3,
    text: "Lista: como criar as habilidades?",
    options: [
      { label: "Digitar tudo em uma linha separada por vírgulas", correct: false, tip: "Use listas para semântica." },
      { label: "Inserir uma lista com marcadores e adicionar cada habilidade", correct: true, tip: "Listas são ideais pra itens." },
      { label: "Inserir uma tabela com uma coluna e várias linhas", correct: false, tip: "Tabela não é lista." },
    ],
    badge: "Listas",
  },
  {
    id: 4,
    text: "Imagem: onde inserir a foto do Byte?",
    options: [
      { label: "Inserir > Imagens > Este dispositivo… e posicionar no cabeçalho", correct: false, tip: "Cabeçalho, só se for logotipo." },
      { label: "Inserir > Imagens > Este dispositivo… e alinhar à direita no topo do currículo", correct: true, tip: "Top à direita é um local comum." },
      { label: "Layout > Quebras > Próxima Página", correct: false, tip: "Isso é sobre quebras, não imagem." },
    ],
    badge: "Imagens",
  },
  {
    id: 5,
    text: "Salvar: qual é a forma recomendada?",
    options: [
      { label: "Arquivo > Salvar como… e escolher .docx", correct: true, tip: "Formato editável e padrão." },
      { label: "Ctrl+Z", correct: false, tip: "Ctrl+Z desfaz; não salva." },
      { label: "Arquivo > Imprimir", correct: false, tip: "Imprimir ≠ salvar." },
    ],
    badge: "Salvar",
  },
];

const TOTAL_STEPS = QUESTIONS.length;
const STEP_X = 16; // % de movimento por acerto
const MAX_LIVES = 3;

const els = {
  player: document.getElementById('player'),
  panel: document.getElementById('panel'),
  options: document.getElementById('options'),
  questionText: document.getElementById('questionText'),
  feedback: document.getElementById('feedback'),
  progress: document.getElementById('progress'),
  hearts: document.getElementById('hearts'),
  finish: document.getElementById('finish'),
  btnReiniciar: document.getElementById('btnReiniciar'),
  btnJogarNovamente: document.getElementById('btnJogarNovamente'),
  btnDica: document.getElementById('btnDica'),
  btnPular: document.getElementById('btnPular'),
  toast: document.getElementById('toast'),
  nextLink: document.getElementById('nextLink'),
};

let state = {
  step: 0,
  lives: MAX_LIVES,
  moving: false,
};

// ---------- Utilidades ----------
function setPlayerX(percent){
  els.player.style.setProperty('--x', `${percent}%`);
}
function animateRun(ms=500){
  els.player.classList.add('run');
  setTimeout(()=> els.player.classList.remove('run'), ms);
}
function setProgress(){
  const pct = Math.round((state.step / TOTAL_STEPS) * 100);
  els.progress.style.width = `${pct}%`;
}
function setHearts(){
  const nodes = Array.from(els.hearts.querySelectorAll('.heart'));
  nodes.forEach((n,i)=> n.classList.toggle('off', i > state.lives-1));
}
function toast(msg){
  els.toast.textContent = msg;
  els.toast.classList.add('show');
  setTimeout(()=> els.toast.classList.remove('show'), 1400);
}
function shakePanel(){
  els.panel.classList.add('shake');
  setTimeout(()=> els.panel.classList.remove('shake'), 480);
}

// ---------- Render ----------
function renderQuestion(){
  const q = QUESTIONS[state.step];
  if(!q){ return }
  els.questionText.textContent = q.text;
  els.options.innerHTML = '';
  q.options.forEach((opt, idx)=>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option';
    btn.setAttribute('aria-label', `Opção ${idx+1}: ${opt.label}`);
    btn.innerHTML = `
      <span class="opt-label">${opt.label}</span>
      <span class="badge">${q.badge}</span>
    `;
    btn.addEventListener('click', ()=> handleAnswer(opt, btn));
    els.options.appendChild(btn);
  });
  els.feedback.textContent = '';
  els.feedback.className = 'feedback';
}

function handleAnswer(opt, buttonEl){
  if(state.moving) return;
  if(opt.correct){
    buttonEl.classList.add('correct');
    els.feedback.textContent = '✔ Boa! Avance!';
    els.feedback.classList.add('ok');
    advance();
  }else{
    buttonEl.classList.add('wrong');
    els.feedback.textContent = '✖ Ops! Tente outra.';
    els.feedback.classList.add('err');
    loseLifeOrShake();
  }
}

function loseLifeOrShake(){
  state.lives--;
  if(state.lives < 0) state.lives = 0;
  setHearts();
  if(state.lives === 0){
    gameOver();
  }else{
    shakePanel();
    toast('Você perdeu 1 vida!');
  }
}

function advance(){
  state.moving = true;
  state.step++;
  setProgress();
  const x = Math.min(state.step * STEP_X, 88); // limite antes da bandeira
  animateRun(600);
  requestAnimationFrame(()=> {
    setTimeout(()=>{
      setPlayerX(x);
      setTimeout(()=>{
        state.moving = false;
        if(state.step >= TOTAL_STEPS){
          finishLevel();
        }else{
          renderQuestion();
        }
      }, 400);
    }, 80);
  });
}

function finishLevel(){
  // Enche progresso e move pra bandeira
  els.progress.style.width = '100%';
  setPlayerX(92);
  els.finish.classList.remove('hidden');
}

function gameOver(){
  toast('Game Over! Reinicie para tentar de novo.');
  // bloqueia interações
  els.options.querySelectorAll('button').forEach(b=> b.disabled = true);
}

function resetGame(){
  state = { step: 0, lives: MAX_LIVES, moving: false };
  setPlayerX(0);
  setProgress();
  setHearts();
  els.finish.classList.add('hidden');
  renderQuestion();
  els.options.querySelectorAll('button').forEach(b=> b.disabled = false);
}

// ---------- Controles ----------
els.btnReiniciar.addEventListener('click', resetGame);
els.btnJogarNovamente.addEventListener('click', resetGame);
els.btnDica.addEventListener('click', ()=>{
  const q = QUESTIONS[state.step];
  if(!q) return;
  // mostra a dica da primeira opção correta
  const tip = q.options.find(o=>o.correct)?.tip || "Pense nos conceitos básicos!";
  toast(`Dica: ${tip}`);
});
els.btnPular.addEventListener('click', ()=>{
  if(state.lives <= 0) return;
  state.lives--;
  setHearts();
  toast('Pergunta pulada! (-1 vida)');
  // considera como acerto para avançar
  advance();
});

// ---------- Inicialização ----------
window.addEventListener('load', ()=>{
  setHearts();
  setProgress();
  renderQuestion();
});
