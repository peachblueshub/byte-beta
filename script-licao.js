// BARRA DE PROGRESSÃO
function atualizarBarraProgresso(numeroLicaoAtual) {
  const totalLicoes = 3;
  const progresso = Math.min((numeroLicaoAtual / totalLicoes) * 100, 100);
  document.getElementById("progressoLicoes").style.width = progresso + "%";
}

// CUTSCENE
function mostrarCutscene2() {
  document.getElementById('cutscene1').classList.remove('ativa');
  document.getElementById('cutscene2').classList.add('ativa');
}

function mostrarCutscene3() {
  document.getElementById('cutscene2').classList.remove('ativa');
  document.getElementById('cutscene3').classList.add('ativa');
}

// LIÇÃO
function irParaLicao(numero) {
  // esconde todas as telas
  document.querySelectorAll('.tela').forEach(tela => tela.classList.remove('ativa'));

  // mostra a lição correspondente
  document.getElementById('licao' + numero).classList.add('ativa');
}
let palavrasSelecionadas = {};

function selecionar(botao, licao) {
  // remove seleção anterior
  const opcoes = document.querySelectorAll(`#licao${licao} .palavra`);
  opcoes.forEach(btn => btn.classList.remove('selecionada'));
  
  // marca a nova seleção
  botao.classList.add('selecionada');
  
  // salva a seleção
  palavrasSelecionadas[licao] = botao;
}

function confirmarResposta(licao) {
  const selecionado = palavrasSelecionadas[licao];
  if (!selecionado) return;

  const respostasCertas = {
    1: 'editar',
    2: 'fonte',
    3: 'salvar'
  };

  const explicacoesCertas = {
    1: "✅ Correto! O Word é ideal para <strong>editar textos</strong>.",
    2: "✅ Isso mesmo! A <strong>fonte</strong> pode ser alterada para deixar seu texto mais bonito.",
    3: "✅ Muito bem! Ao <strong>salvar</strong> os seus documentos, você garante que nada será perdido."
  };

  const respostaCerta = respostasCertas[licao];
  const espaco = document.getElementById(`espaco${licao}`);
  const palavra = selecionado.textContent.trim();

  // evita reprocessar uma lição já respondida
  if (espaco.textContent !== '________') return;

  // limpa seleções e marca apenas o selecionado
  const opcoes = document.querySelectorAll(`#licao${licao} .palavra`);
  opcoes.forEach(opcao => {
    opcao.classList.remove('selecionada');
    opcao.disabled = true;
  });

  // marca o estado da opção confirmada
  if (palavra === respostaCerta) {
    selecionado.classList.add('certa');
    atualizarBarraProgresso(licao);
    espaco.textContent = respostaCerta;
  } else {
    selecionado.classList.add('errada');
  }

  // exibe explicação
  const explicacao = document.getElementById(`explicacao${licao}`);
  if (palavra === respostaCerta) {
    explicacao.innerHTML = explicacoesCertas[licao];
    explicacao.style.background = "#e0ffe0";
  } else {
    explicacao.innerHTML = `❌ Quase lá, "${palavra}" não é a resposta correta. Tente novamente clicando em <strong>revisar</strong>.`;
    explicacao.style.background = "#ffe0e0";
  }
  explicacao.style.display = 'block';

  // esconde o botão CONFIRMAR
  const btnConfirmar = document.getElementById(`confirmar${licao}`);
  btnConfirmar.style.display = 'none';

  // se correta, mostra Próxima lição
  if (palavra === respostaCerta) {
    document.getElementById(`botaoProxima${licao}`).style.display = 'inline-block';
  }
}

function reiniciarLicao(licao) {
  palavrasSelecionadas[licao] = null;
  document.getElementById(`espaco${licao}`).textContent = '________';
  const explicacao = document.getElementById(`explicacao${licao}`);
  explicacao.style.display = 'none';
  explicacao.innerHTML = '';

  document.getElementById(`botaoProxima${licao}`).style.display = 'none';

  const btnConfirmar = document.getElementById(`confirmar${licao}`);
  btnConfirmar.style.display = 'inline-block';
  btnConfirmar.disabled = false;

  const opcoes = document.querySelectorAll(`#licao${licao} .palavra`);
  opcoes.forEach(opcao => {
    opcao.classList.remove('selecionada', 'certa', 'errada');
    opcao.disabled = false;
  });
}
