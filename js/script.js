/* --------------------------------------------------------------
   1. "PEGANDO" OS ELEMENTOS DO HTML
   document.querySelector("#algo") busca no HTML o PRIMEIRO elemento
   que combina com aquele seletor (a mesma sintaxe de seletor do CSS!).
   Guardamos cada um numa variável, pra poder usar de novo mais abaixo
   sem precisar buscar toda vez.
   -------------------------------------------------------------- */
const botaoMenu = document.querySelector("#menu-toggle");
const menu = document.querySelector("#nav-principal");
const botaoTopo = document.querySelector("#btn-topo");
const cabecalho = document.querySelector("header");
const faixaAnuncio = document.querySelector(".faixa-anuncio");
let navEstaVisivel = true; 
let temporizadorNav = null;


/* --------------------------------------------------------------
   2. MENU HAMBÚRGUER
   addEventListener("click", funcao) diz: "quando esse elemento for
   clicado, execute essa função". A função em si é bem curta: ela só
   ADICIONA OU REMOVE uma classe CSS chamada "aberto" — quem decide
   a APARÊNCIA de "aberto" é o CSS (Aula 2), o JS só liga/desliga o
   interruptor.
   -------------------------------------------------------------- */
botaoMenu.addEventListener("click", function () {
  // classList.toggle("aberto"):
  // se o elemento NÃO tem a classe "aberto", adiciona.
  // se JÁ tem, remove. Um "interruptor" de liga/desliga.
  menu.classList.toggle("aberto");
  botaoMenu.classList.toggle("aberto");

  // Isso aqui é só acessibilidade: aria-expanded avisa leitores de
  // tela se o menu está aberto (true) ou fechado (false). A gente lê
  // o estado ATUAL do menu (contains) pra manter o atributo em sincronia.
  const menuEstaAberto = menu.classList.contains("aberto");
  botaoMenu.setAttribute("aria-expanded", menuEstaAberto);
});


/* --------------------------------------------------------------
   3. O QUE ACONTECE QUANDO A PÁGINA É ROLADA (scroll)
   window.addEventListener("scroll", ...) roda a função toda vez que
   o visitante rola a página, nem que seja 1 pixel — por isso é
   importante que a função seja rápida e simples.
   -------------------------------------------------------------- */
window.addEventListener("scroll", function () {
  const alturaParaSumir = cabecalho.offsetHeight + faixaAnuncio.offsetHeight;
  const rolouOSuficiente = window.scrollY > alturaParaSumir;

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

  botaoTopo.classList.toggle("visivel", rolouOSuficiente);
});


/* --------------------------------------------------------------
   4. CLIQUE NO BOTÃO "VOLTAR AO TOPO"
   window.scrollTo rola a janela até uma posição.
   behavior: "smooth" faz a rolagem ser animada, em vez de "pular"
   direto — é só essa uma linha que diferencia os dois.
   -------------------------------------------------------------- */
botaoTopo.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});


/* --------------------------------------------------------------
   5. FECHAR O MENU AO CLICAR EM UM LINK (celular)
   Sem isso, se o visitante abrir o menu no celular e clicar em
   "Cardápio", a nova página carregaria com o menu já aberto de novo
   por baixo do capô — pequeno detalhe, mas incomoda.

   document.querySelectorAll (com "s" no final) busca TODOS os
   elementos que combinam, não só o primeiro — por isso usamos
   .forEach pra repetir a mesma ação em cada um deles.
   -------------------------------------------------------------- */
const linksDoMenu = document.querySelectorAll("#nav-principal a");

linksDoMenu.forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("aberto");
    botaoMenu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});

const cardsDeProduto = document.querySelectorAll(".card-produto");

cardsDeProduto.forEach(function (card) {
  card.addEventListener("click", function () {
    card.classList.toggle("expandido");
  });
});