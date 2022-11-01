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