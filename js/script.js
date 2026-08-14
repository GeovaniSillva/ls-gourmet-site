const botaoMenu = document.querySelector("#menu-toggle");
const menu = document.querySelector("#nav-principal");
const fundoMenu = document.querySelector("#fundo-menu");
const botaoTopo = document.querySelector("#btn-topo");
const cabecalho = document.querySelector("header");
const faixaAnuncio = document.querySelector(".faixa-anuncio");
let navEstaVisivel = true;
let temporizadorNav = null;

function atualizarTopoMenu() {
  const topo = cabecalho.getBoundingClientRect().bottom;
  document.documentElement.style.setProperty("--topo-menu", topo + "px");
}

atualizarTopoMenu();
window.addEventListener("resize", atualizarTopoMenu);

botaoMenu.addEventListener("click", function () {
  menu.classList.toggle("aberto");
  botaoMenu.classList.toggle("aberto");
  fundoMenu.classList.toggle("visivel");

  const menuEstaAberto = menu.classList.contains("aberto");
  botaoMenu.setAttribute("aria-expanded", menuEstaAberto);
});

fundoMenu.addEventListener("click", function () {
  menu.classList.remove("aberto");
  botaoMenu.classList.remove("aberto");
  fundoMenu.classList.remove("visivel");
  botaoMenu.setAttribute("aria-expanded", "false");
});

window.addEventListener("scroll", function () {
  const ehDesktop = window.innerWidth > 768;
  const alturaParaSumir = cabecalho.offsetHeight + faixaAnuncio.offsetHeight;
  const rolouOSuficiente = window.scrollY > alturaParaSumir;

  atualizarTopoMenu();

  if (ehDesktop) {
    if (rolouOSuficiente && navEstaVisivel) {
      navEstaVisivel = false;
      menu.classList.remove("ativa");
      menu.classList.add("escondida");

      temporizadorNav = setTimeout(function () {
        menu.classList.remove("escondida");
        menu.classList.add("ativa");
      }, 100);
    }

    if (!rolouOSuficiente) {
      navEstaVisivel = true;
      clearTimeout(temporizadorNav);
      menu.classList.remove("ativa");
      menu.classList.remove("escondida");
    }
  }

  botaoTopo.classList.toggle("visivel", rolouOSuficiente);
});

botaoTopo.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

const linksDoMenu = document.querySelectorAll("#nav-principal a");

linksDoMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto");
    botaoMenu.classList.remove("aberto");
    fundoMenu.classList.remove("visivel");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

const cardsDeProduto = document.querySelectorAll(".card-produto");

cardsDeProduto.forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("expandido");
  });
});