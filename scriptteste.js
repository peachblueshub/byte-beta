let currentLesson = 0;
const lessons = document.querySelectorAll('.lesson');
const progressBar = document.getElementById('progress-bar');
const mascote = document.getElementById('mascote');

function checkAnswer(correct) {
  // Mascote reage
  mascote.textContent = correct ? '😺👍' : '😿';

  // Atualiza barra de progresso
  const progress = ((currentLesson + 1) / lessons.length) * 100;
  progressBar.style.width = progress + '%';

  // Avança para próxima lição após 0.5s
  setTimeout(() => {
    lessons[currentLesson].classList.remove('active');
    currentLesson++;
    if (currentLesson < lessons.length) {
      lessons[currentLesson].classList.add('active');
      mascote.textContent = '😺'; // reset mascote
    } else {
      alert('Parabéns! Você completou todas as lições.');
      mascote.textContent = '🎉😺';
    }
  }, 500);
}
