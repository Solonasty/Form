//TEMPERATURE SLIDER

let sliderProps = {
	fill: "rgba(255, 105, 180, 1)",
	background: "rgba(91, 170, 249, 1)",
};

let slider = document.querySelector(".range__slider");
let sliderValue = document.querySelector(".length__title");

// Using Event Listener to apply the fill and also change the value of the text.
slider.querySelector("input").addEventListener("input", event => {
	sliderValue.setAttribute("data-length", event.target.value);
	applyFill(event.target);
});
// Selecting the range input and passing it in the applyFill func.
applyFill(slider.querySelector("input"));

// This function is responsible to create the trailing color and setting the fill.
function applyFill(slider) {
	let percentage = (100 * (slider.value - slider.min)) / (slider.max - slider.min);
	let bg = `linear-gradient(90deg, ${sliderProps.fill} ${percentage}%, ${sliderProps.background} ${percentage +
			0.1}%)`;
	slider.style.background = bg;
	sliderValue.setAttribute("data-length", slider.value);
}

// REGISTRATION

let btn = document.getElementById('btn');
btn.addEventListener('click', store);

function store(event) {
    event.preventDefault();
    let name = document.getElementById('name');
    let tel = document.getElementById('tel');
    let temp = document.getElementById('slider');
    let comments = document.getElementById('comments');

    if(name.value.length == 0){
        alert('Please fill in name');

    }else if(tel.value.length == 0){
        alert('Please fill in phone number');
    }else{
        localStorage.setItem('name', name.value);
        localStorage.setItem('tel', tel.value);
        localStorage.setItem('temp', temp.value);
        localStorage.setItem('comments', comments.value);
        console.log('Done');
        alert('We will call you soon!');
        name.value = '';
        tel.value = '';
        comments.value = '';
    }
}

//PHONE NUMBER

window.addEventListener("DOMContentLoaded", function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
    var keyCode;
    function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        let pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        let matrix = "+7 (___) ___ - __ - __",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
                return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
            i < 5 && (i = 3);
            new_value = new_value.slice(0, i)
        }
        let reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
                return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
    }

    tel.addEventListener("input", mask, false);
    tel.addEventListener("focus", mask, false);
    tel.addEventListener("blur", mask, false);
    tel.addEventListener("keydown", mask, false)

  });

});
