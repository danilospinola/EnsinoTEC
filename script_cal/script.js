
const popup = document.getElementById('popup');

function handlePopup(open) {
	popup.classList[open ? 'add' : 'remove']('opened');
}

var app = {
	settings: {
		container: $('.calendar'),
		calendar: $('.front'),
		days: $('.weeks span'),
		form: $('.back'),
		input: $('.back input'),
		buttons: $('.back button')
	},

	init: function() {
		instance = this;
		settings = this.settings;
		this.bindUIActions();
	},

	swap: function(currentSide, desiredSide) {
		settings.container.toggleClass('flip');

    currentSide.fadeOut(900);
    currentSide.hide();
    desiredSide.show();

	},

	bindUIActions: function() {
		settings.days.on('click', function(){
			instance.swap(settings.calendar, settings.form);
			settings.input.focus();
		});

		settings.buttons.on('click', function(){
			instance.swap(settings.form, settings.calendar);
		});
	}
}

app.init();

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
