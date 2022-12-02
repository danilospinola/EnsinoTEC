/* Header dinâmico conforme rolagem do mouse. */

/*
    addEventListener('scroll', function(){
        let header = document.querySelector('header')

        let scrollPos = parseInt(window.scrollY)

        if (scrollPos <= 1000){
            header.style.top = -60 + 'px'

        } else if (scrollPos > 1500 && scrollPos < 2100){
            header.style.top = 0 + 'px'

        } else if (scrollPos >= 2100){
            header.style.top = 0 + 'px'
        }
    })
*/

/**/

/* Menu hamburguer */

let nav = document.querySelector('nav').style

let btnMenuHamburguer = document.getElementById('btnMenuHamburguer')
btnMenuHamburguer.addEventListener('click', function(){
    nav.display = 'flex'
})

let btnFecharMenu = document.getElementById('btnFecharMenu')
btnFecharMenu.addEventListener('click', function(){
    nav.display = 'none'
})

/**/

function iniciarComparacao() {
    var x, i;
    /*encontra no html todos os elementos que possuem a classe "overlay" */
    /*overlay é o mesmo que sobreposição*/
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
      /*uma vez que a classe "overlay" foi achada, o elemento que contém a classe é passado como um parâmetro quando a função de comparação é executada*/
      compararImagens(x[i]);
    }
    function compararImagens(img) {
      var slider, img, clicked = 0, w, h;
      /*pega a largura e a altura da div da imagem*/ x
      w = img.offsetWidth;
      h = img.offsetHeight;
      /*deixa a largura da div da imagem em 50%*/
      img.style.width = (w / 2) + "px";
      /*cria um controle deslizante (slider):*/
      slider = document.createElement("DIV");
      slider.setAttribute("class", "img-comp-slider");
      /*insere o slider*/
      img.parentElement.insertBefore(slider, img);
      /*posiciona o slider no meio*/
      slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
      slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
      /*executa uma função quando o botão do mouse é pressionado*/
      slider.addEventListener("mousedown", iniciaSlider);
      /*executa outra função quando o usuário solta o botão do mouse*/
      window.addEventListener("mouseup", encerraSlider);
      /*executa uma função quando o usuário pressiona o dedo na tela (Dispositivos Móveis)*/
      slider.addEventListener("touchstart", iniciaSlider);
      /*executa outra função quando o usuário retira o dedo na tela (Dispositivos Móveis)*/
      window.addEventListener("touchend", encerraSlider);
      function iniciaSlider(e) {1
        /*previne outras ações que possam acontecer quando movemos o mouse sobre a imagem*/
        e.preventDefault();
        /*o slider está clicado e pronto para se mover*/
        clicked = 1;
        /*executa a função quando o slider é movido*/
        window.addEventListener("mousemove", movendoSlider);
        window.addEventListener("touchmove", movendoSlider);
      }
      function encerraSlider() {
        /*o slider não está mais sendo clicado*/
        clicked = 0;
      }
      function movendoSlider(e) {
        var pos;
        /*se o slider não está mais sendo clicado executa essa função*/
        if (clicked == 0) return false;
        /*deixa o cursor na posição x*/
        pos = pegaPosicaoCursor(e)
        /*previne que o slider seja posicionado fora da imagem*/
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        /*executa uma função que vai redimensionar a sobreposição da imagem de acordo com o cursor*/
        slide(pos);
      }
      function pegaPosicaoCursor(e) {
        var a, x = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;
        /*pega as posições x da imagem*/
        a = img.getBoundingClientRect();
        /*calcula a coordernada x do cursor, relativo a imagem*/
        x = e.pageX - a.left;
        /*considera qualquer rolagem de pagina:*/
        x = x - window.pageXOffset;
        return x;
      }
      function slide(x) {
        /*redimensiona a imagem*/
        img.style.width = x + "px";
        /*posiciona o slider*/
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
      }
    }
  }
iniciarComparacao();


