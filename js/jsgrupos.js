let janelaEntrarGrupo = document.getElementById('janelaEntrarGrupo')
let janelaNotif = document.getElementById('janelaNotif')
let janelaPerfil = document.getElementById('janelaPerfil')

document.getElementById('btnEntrarNaSala').addEventListener('click', function(){
    let displayEntrarGrupo = window.getComputedStyle(janelaEntrarGrupo).display

    if (displayEntrarGrupo === 'none'){
        janelaEntrarGrupo.style.display = 'flex'
        janelaNotif.style.display = 'none'
        janelaPerfil.style.display = 'none'

    } else if (displayEntrarGrupo === 'flex'){
        janelaEntrarGrupo.style.display = 'none'
    }
})

document.getElementById('btnNotificacao').addEventListener('click', function(){
    let displayNotif = window.getComputedStyle(janelaNotif).display

    if (displayNotif === 'none'){
        janelaEntrarGrupo.style.display = 'none'
        janelaNotif.style.display = 'flex'
        janelaPerfil.style.display = 'none'

    } else if (displayNotif === 'flex'){
        janelaNotif.style.display = 'none'
    }
})

document.getElementById('imgPerfilUsuario').addEventListener('click', function(){
    let displayPerfil = window.getComputedStyle(janelaPerfil).display

    if (displayPerfil === 'none'){
        janelaEntrarGrupo.style.display = 'none'
        janelaNotif.style.display = 'none'
        janelaPerfil.style.display = 'flex'

    } else if (displayPerfil === 'flex'){
        janelaPerfil.style.display = 'none'
    }
})

/**/

let menuLateralMq = document.getElementById('menuLateralMq')

document.getElementById('menuHamburguer').addEventListener('click', function(){
    let displayMenu = getComputedStyle(menuLateralMq)

    if (displayMenu.display === "none"){
        menuLateralMq.style.display = 'flex'

    } else if (displayMenu.display === "flex"){
        menuLateralMq.style.display = 'none'
    }

})

window.addEventListener('resize', function(){
    menuLateralMq.style.display = 'none'
})