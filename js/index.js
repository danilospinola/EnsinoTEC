


var menuCtn = document.getElementById("menuCtn"),
    getMenuBtn = document.getElementById("getMenuBtn"),
    menuIsOn= false

getMenuBtn.addEventListener("click",()=>{

    if(menuIsOn){
        menuCtn.style.display = "none"
        menuIsOn = false
    }else{
        menuCtn.style.display = "block"
        menuIsOn = true
    }

})