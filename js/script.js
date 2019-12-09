"use strict"; // Строгий режим: обработка скрипта по современным правилам (профилактика от ошибок в коде)

var LEFT_KEYCODE = 37;
var RIGHT_KEYCODE = 39;

var generateColor = function () {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

var firstColor = generateColor();
var colors = [firstColor]; // Первый элемент случайный изначально

var square = document.querySelector("body");
square.style.backgroundColor = firstColor;

var pressedLeft = 0;
var pressedRight = 0;

var nextColor = function () {
    if (pressedRight > pressedLeft) {
        var newColor = generateColor();
        square.style.backgroundColor = newColor;
        colors.push(newColor);
    } else {
        colors.shift(colors[0]);
        square.style.backgroundColor = colors[0];
    };
};

var previousColor = function () {
    if (pressedLeft > pressedRight) {
        var newColor = generateColor();
        square.style.backgroundColor = newColor;
        colors.unshift(newColor);
    } else {
        colors.pop(colors[colors.length-1]);
        square.style.backgroundColor = colors[colors.length-1];
    };
};

window.addEventListener("keydown", function(evt) {
    if (evt.keyCode === RIGHT_KEYCODE) {
        evt.preventDefault(); // Отмена действия по умолчанию
        pressedRight +=1;
        nextColor();
    };

    if (evt.keyCode === LEFT_KEYCODE) {
		evt.preventDefault(); // Отмена действия по умолчанию
        pressedLeft +=1;
        previousColor();        
    };
});