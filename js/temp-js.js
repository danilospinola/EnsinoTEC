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
    if (window.innerHeight >= 800){
        menuLateralMq.style.display = 'none'
    }
})

