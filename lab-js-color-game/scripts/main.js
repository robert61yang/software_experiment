window.onload = function() {
    init();
};

var mode = 1;
var isnight = false;
var counter;
var nightmareTime = document.querySelector("#nightmareTime");
var remainTime = 0;
var numCards = 3;
var gameOver = false;
var colors = [];
var pickedColor;
var body = document.querySelector("body");
var cards = document.querySelectorAll(".card");
var colorDisplay = document.getElementById("color-picked");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var resetDisplay = document.querySelector("#reset span");
var easyButton = document.querySelector("#easy");
var hardButton = document.querySelector("#hard");
var nightmareButton = document.querySelector("#nightmare");

function init() {
    selectmode();
    initCards();
    reset();
}

function selectmode(){
    easyButton.addEventListener("click", function(){
        easyButton.setAttribute("class","selected");
        hardButton.setAttribute("class","");
        nightmareButton.setAttribute("class","");
        numCards = 3;
        isnight = false;
        reset();
    })
    hardButton.addEventListener("click", function(){
        easyButton.setAttribute("class","");
        hardButton.setAttribute("class","selected");
        nightmareButton.setAttribute("class","");
        numCards = 6;
        isnight = false;
        reset();  
    })
    nightmareButton.addEventListener("click", function(){
        easyButton.setAttribute("class","");
        hardButton.setAttribute("class","");
        nightmareButton.setAttribute("class","selected");
        clearInterval(counter);
        numCards = 6; 
        isnight = true;
        reset(); 
        //nightmareTime.textContent = remainTime;
        //clearInterval(counter);
         
    })
}

function count()
{
    //nightmareTime.textContent = remainTime;
    remainTime--;
    if(remainTime > 0){
        nightmareTime.textContent = remainTime;
        body.style.backgroundColor = "white";
        setTimeout(function(){body.style.backgroundColor = "black"}, 100)
        //alert(pickedColor);
    }
    else if(remainTime==0){
        nightmareTime.textContent = "";
        messageDisplay.textContent = "TIMEOUT!";
        resetDisplay.textContent = "Play Again"
        resetButton.style.display = "block";
        changeColors("#FFF");  
        body.style.backgroundColor = pickedColor;
        gameOver = true;
    }  
}

function initCards() {
        for (var i = 0; i < cards.length; i++) {
            //add click listeners to cards
            cards[i].addEventListener("click", function() {
                if (gameOver)
                    return;
                //grab color of clicked card
                var clickedColor = this.style.backgroundColor;
                // alert(this.style.backgroundColor);
                //compare color to pickedColor
                if (clickedColor === pickedColor) {
                    messageDisplay.textContent = "Correct!";
                    resetButton.style.display = "block";
                    resetDisplay.textContent = "Play Again"
                    changeColors("#FFF");
                    body.style.backgroundColor = clickedColor;
                    gameOver = true;
                    if(isnight){
                        clearInterval(counter);
                        nightmareTime.textContent = "";
                    }
                } else {
                    this.style.opacity = 0;
                    messageDisplay.textContent = "Try Again"
                }
            });
        }
}

function reset() {
    clearInterval(counter);
    nightmareTime.textContent = "";
    resetButton.style.display = "block";
    gameOver = false;
    colors = generateRandomColors(numCards);
    //pick a new random color from array
    pickedColor = pickColor();
    //change colorDisplay to match picked Color
    colorDisplay.textContent = pickedColor;
    resetDisplay.textContent = "New Color"
    messageDisplay.textContent = "What's the Color?";
    //change colors of cards
    for (var i = 0; i < cards.length; i++) {
        cards[i].style.opacity = 1;
        if (colors[i]) {
            cards[i].style.display = "block"
            cards[i].style.backgroundColor = colors[i];
        } else {
            cards[i].style.display = "none";
        }
    }
    body.style.backgroundColor = "#232323";
    if(isnight){
        resetButton.style.display = "none";
        remainTime = 5;
        nightmareTime.textContent = remainTime;
        counter = setInterval(count,1000);
    }
}

resetButton.addEventListener("click", function() {  
    reset();
})

function changeColors(color) {
    //loop through all cards
    for (var i = 0; i < cards.length; i++) {
        //change each color to match given color
        cards[i].style.opacity = 1;
        cards[i].style.backgroundColor = color;
    }
}

function pickColor() {
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    //make an array
    var arr = []
    //repeat num times
    for (var i = 0; i < num; i++) {
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor() {
    //pick a "red" from 0 - 255
    var r = Math.floor(Math.random() * 256);
    //pick a "green" from  0 -255
    var g = Math.floor(Math.random() * 256);
    //pick a "blue" from  0 -255
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
