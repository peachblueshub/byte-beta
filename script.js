
/* função para ativar o footer ao scrollar para o final da página */

window.addEventListener('scroll', function () {
  const footer = document.getElementById('footer');
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const scrolled = window.scrollY;

  if (Math.ceil(scrolled) >= scrollable) {
    footer.classList.add('show');
  } else {
    footer.classList.remove('show');
  }
});