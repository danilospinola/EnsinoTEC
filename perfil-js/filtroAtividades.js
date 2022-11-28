let classDivAtividade = document.getElementsByClassName('class-div-atividades')

let atvAtribuidas = classDivAtividade[0]
let atvConcluidas = classDivAtividade[1]

let sectionFiltroOpcoes = document.getElementById('sectionFiltroOpcoes')

let displayFiltroOpcoes = window.getComputedStyle(sectionFiltroOpcoes)

let opcFiltro = document.getElementsByName('opcFiltro')

document.getElementById('btnFiltro').addEventListener('click', function(){

    if (displayFiltroOpcoes.display == 'none'){
        sectionFiltroOpcoes.style.display = 'flex'
    } else {
        sectionFiltroOpcoes.style.display = 'none'
    }
})

document.getElementById('opcAtribuidas').addEventListener('click', function(){
    atvAtribuidas.style.display = 'flex'
    atvConcluidas.style.display = 'none'

    opcFiltro[0].style.backgroundColor = '#ED145B'
    opcFiltro[0].style.color = 'white'

    opcFiltro[1].style.backgroundColor = 'white'
    opcFiltro[1].style.color = 'black'
    sectionFiltroOpcoes.style.display = 'none'
})

document.getElementById('opcConcluidas').addEventListener('click', function(){
    atvConcluidas.style.display = 'flex'
    atvAtribuidas.style.display = 'none'

    opcFiltro[0].style.backgroundColor = 'white'
    opcFiltro[0].style.color = 'black'

    opcFiltro[1].style.backgroundColor = '#ED145B'
    opcFiltro[1].style.color = 'white'
    sectionFiltroOpcoes.style.display = 'none'
})