// ---------- Configuração da Fase ----------
const QUESTIONS = [
  {
    text: "Qual é a primeira etapa para criar um currículo?",
    badge: "1",
    options: [
      { label: "Escrever seus dados pessoais", correct: true, tip: "Comece pelo básico: nome, endereço e contato." },
      { label: "Escolher a cor do currículo", correct: false, tip: "Isso vem depois!" },
      { label: "Adicionar hobbies", correct: false, tip: "Hobbies vêm no final." }
    ]
  },
  {
    text: "Onde você coloca a experiência profissional?",
    badge: "2",
    options: [
      { label: "No início do currículo", correct: false, tip: "Experiência vem depois dos dados pessoais." },
      { label: "Depois dos dados pessoais", correct: true, tip: "Perfeito! Coloque depois dos dados básicos." },
      { label: "No rodapé", correct: false, tip: "Rodapé não é lugar para isso." }
    ]
  },
  {
    text: "Qual seção deve conter sua formação acadêmica?",
    badge: "3",
    options: [
      { label: "Formação acadêmica", correct: true, tip: "Isso mesmo!" },
      { label: "Habilidades", correct: false, tip: "Habilidades vêm depois." },
      { label: "Referências", correct: false, tip: "Referências no final." }
    ]
  },
  {
    text: "Como você deve organizar suas experiências profissionais?",
    badge: "4",
    options: [
      { label: "Em ordem alfabética", correct: false, tip: "Não é alfabética." },
      { label: "Da mais recente para a mais antiga", correct: true, tip: "Correto! Assim o recrutador vê primeiro o mais relevante." },
      { label: "Da mais antiga para a mais recente", correct: false, tip: "Ao contrário do recomendado." }
    ]
  },
  {
    text: "Qual fonte é mais adequada para currículos formais?",
    badge: "5",
    options: [
      { label: "Comic Sans", correct: false, tip: "Essa não é profissional." },
      { label: "Arial ou Calibri", correct: true, tip: "Perfeito! Fontes limpas e legíveis." },
      { label: "Papyrus", correct: false, tip: "Evite fontes decorativas." }
    ]
  },
  {
    text: "O que deve ser evitado em um currículo?",
    badge: "6",
    options: [
      { label: "Erros de digitação e gramática", correct: true, tip: "Sempre revise seu currículo." },
      { label: "Informações de contato atualizadas", correct: false, tip: "Essas devem sempre estar presentes." },
      { label: "Experiência relevante", correct: false, tip: "Inclua sempre experiências relevantes." }
    ]
  }
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
  progress: document.getElementById('progress-bar'), // corrige id
  valorVidas: document.getElementById('valorVidas'),  // vidas no topo
  finish: document.getElementById('finish'),
  btnJogarNovamente: document.getElementById('btnJogarNovamente'),
  btnDica: document.getElementById('btnDica'),
  btnPular: document.getElementById('btnPular'),
  toast: document.getElementById('toast'),
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
  els.valorVidas.textContent = state.lives;
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
    btn.innerHTML = `<span class="opt-label">${opt.label}</span> <span class="badge">${q.badge}</span>`;
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
  els.progress.style.width = '100%';
  setPlayerX(92);
  els.finish.classList.remove('hidden');
}

function gameOver(){
  toast('Game Over! Reinicie para tentar de novo.');
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
els.btnJogarNovamente.addEventListener('click', resetGame);

els.btnDica.addEventListener('click', ()=>{
  const q = QUESTIONS[state.step];
  if(!q) return;
  const tip = q.options.find(o=>o.correct)?.tip || "Pense nos conceitos básicos!";
  toast(`💡 Dica: ${tip}`);
});

els.btnPular.addEventListener('click', ()=>{
  if(state.lives <= 0) return;
  state.lives--;
  setHearts();
  toast('Pergunta pulada! (-1 vida)');
  advance();
});

// ---------- Inicialização ----------
window.addEventListener('load', ()=>{
  setHearts();
  setProgress();
  renderQuestion();
});
