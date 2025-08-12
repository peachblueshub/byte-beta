document.addEventListener("DOMContentLoaded", () => {
  const loadingText = document.getElementById("loading-text");
  const loadingBar = document.getElementById("loading-bar");
  const loadingScreen = document.getElementById("loading-screen");

  let totalRecursos = 0;
  let carregados = 0;

  function finalizarCarregamento() {
    carregados = totalRecursos; // força 100%
    atualizarProgresso();
  }

  function atualizarProgresso() {
    let progresso = Math.round((carregados / totalRecursos) * 100);
    if (progresso > 100) progresso = 100;
    loadingBar.style.width = progresso + "%";
    loadingText.textContent = `Carregando... ${progresso}%`;

    if (progresso >= 100) {
      setTimeout(() => {
        loadingScreen.classList.add("slide-up");
        setTimeout(() => {
          loadingScreen.style.display = "none";
        }, 400);
      }, 200);
    }
  }

  function recursoCarregado() {
    carregados++;
    atualizarProgresso();
  }

  function contarRecursos() {
    const imgs = Array.from(document.images);
    const links = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
    const scripts = Array.from(document.querySelectorAll('script[src]'));

    let recursosPendentes = [];

    imgs.forEach(img => {
      if (img.complete) {
        recursoCarregado();
      } else {
        recursosPendentes.push(img);
      }
    });

    links.forEach(link => {
      if (link.sheet) {
        recursoCarregado();
      } else {
        recursosPendentes.push(link);
      }
    });

    scripts.forEach(script => {
      if (script.readyState === "complete" || script.readyState === "loaded") {
        recursoCarregado();
      } else {
        recursosPendentes.push(script);
      }
    });

    totalRecursos = carregados + recursosPendentes.length;
    if (totalRecursos === 0) totalRecursos = 1;

    recursosPendentes.forEach(recurso => {
      recurso.addEventListener("load", recursoCarregado);
      recurso.addEventListener("error", recursoCarregado);
    });

    // Caso não tenha pendentes, força finalizar carregamento
    if (recursosPendentes.length === 0) {
      finalizarCarregamento();
    }
  }

  contarRecursos();

  // Timeout de segurança pra evitar travar a barra (ex: 8 segundos)
  setTimeout(() => {
    if (carregados < totalRecursos) {
      finalizarCarregamento();
    }
  }, 8000);
});
