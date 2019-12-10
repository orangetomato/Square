"use strict";

var LEFT_KEYCODE = 37;
var RIGHT_KEYCODE = 39;

var generateColor = function () {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

var currentColor = generateColor();
var colors = [currentColor];

var body = document.querySelector("body");
var square = document.querySelector(".square");
body.style.backgroundColor = currentColor;

var pressedLeft = 0;
var pressedRight = 0;

var overlayRight = document.querySelector(".square-overlay-right");
var overlayLeft = document.querySelector(".square-overlay-left");

var nextColor = function () {
    overlayLeft.style.display = "none";
    square.classList.remove("square-left");
    if (pressedRight % 2 !== 0) {
        overlayRight.style.display = "none";
        square.classList.add("square-right");
    } else {     
        overlayRight.style.display = "block";
        square.classList.remove("square-right");
    };

    if (pressedRight > pressedLeft) {
        var newColor = generateColor();
        colors.push(newColor);
        square.style.backgroundColor = newColor;
        overlayRight.style.backgroundColor = newColor;
    } else {
        colors.shift(colors[0]);
        square.style.backgroundColor = colors[0];
        overlayRight.style.backgroundColor = colors[0];
    };
};

var previousColor = function () {
    overlayRight.style.display = "none";
    square.classList.remove("square-right");   
    if (pressedLeft % 2 !== 0) {
        overlayLeft.style.display = "none";
        square.classList.add("square-left");
    } else {     
        overlayLeft.style.display = "block";
        square.classList.remove("square-left");
    };
    
    if (pressedLeft > pressedRight) {
        var newColor = generateColor();
        colors.unshift(newColor);
        square.style.backgroundColor = newColor;
        overlayLeft.style.backgroundColor = newColor;
    } else {
        colors.pop(colors[colors.length-1]);
        square.style.backgroundColor = colors[colors.length-1];
        overlayLeft.style.backgroundColor = colors[colors.length-1];
    };
};

window.addEventListener("keydown", function(evt) {
    if (colors.length > 1) {
        body.style.backgroundColor = square.style.backgroundColor;
    } else {
        body.style.backgroundColor = colors[0];
    };

    if (evt.keyCode === RIGHT_KEYCODE) {
        evt.preventDefault();
        pressedRight +=1;
        nextColor();
    };

    if (evt.keyCode === LEFT_KEYCODE) {
        evt.preventDefault();
        pressedLeft +=1;
        previousColor();
    };
});