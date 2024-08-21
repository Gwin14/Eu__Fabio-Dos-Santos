function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os elementos que devem ser animados
  const animatableElements = document.querySelectorAll("");

  // Cria um observer para observar quando os elementos entram na tela
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Adiciona a classe 'visible' quando o elemento entra na tela
          entry.target.classList.add("visible");
          // Parar de observar após a animação ser acionada (opcional)
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  ); // Ajuste o threshold conforme necessário

  // Observa cada elemento animável
  animatableElements.forEach((element) => {
    observer.observe(element);
  });
});
