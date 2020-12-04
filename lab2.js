let body = document.getElementsByTagName("body")[0];    //элемент body
let array;                                              //массив квадратов
let startSquaresCount = 2;                              //количество квадратов в начале
let arrayLineSize = startSquaresCount;                  //количество квадратов в линии
let arrayDivWidth = 630;                                //размер дива для массивов в пикселях

let score;
let timerDOM;
let timer;
let timerCounter = 0;

let approximationColorValue = 255 / 2;

window.onload = function(){
    init();
    body.append(score);
    body.append(timerDOM);
    body.append(array);
    timer = setInterval(function(){
        timerCounter++;
        timerDOM.textContent = `Оставшееся время: ${10 - timerCounter} секунд`;
        if (timerCounter == 10)
            LoseEvent();
        
    }, 1000)
}


var init = function(){

    score = document.createElement("h1");
    score.textContent = `Результат: ${arrayLineSize - startSquaresCount}`;

    timerDOM = document.createElement("h3");
    timerDOM.textContent = `Оставшееся время: ${10 - timerCounter} секунд`;


    array = document.createElement("div");
    array.className = "array";
    array.style.width = `${arrayDivWidth}px`;
    array.style.display = "flex";
    array.style.flexWrap = "wrap";
    createSquares();

}


var createSquares = function(){

    var count = array.childElementCount;
    for (var i = 0; i < count; i++)
        array.removeChild(array.firstElementChild);

    var squareColor = randColor();
    for (var i = 0; i < arrayLineSize * arrayLineSize; i++){
        var square = document.createElement("div");
        square.className = "square";
        square.style.backgroundColor = `rgb(${squareColor[0]}, ${squareColor[1]}, ${squareColor[2]})`;
        var lengthPX = (arrayDivWidth - arrayLineSize * 10) / arrayLineSize;
        square.style.width = `${lengthPX}px`;
        square.style.height = `${lengthPX}px`;
        square.style.margin = "5px";
        square.onclick = LoseEvent;
        array.append(square);
        
    }

    var newColor;
    if (squareColor[0] > 255 / 2){
        newColor =  squareColor[0] - approximationColorValue;  
    }
    else {
        newColor =  squareColor[0] + approximationColorValue;  
    }
    if (approximationColorValue > 10)
        approximationColorValue -= 10;
    
    var randIndex = Math.floor(Math.random() * 1000 % (arrayLineSize * arrayLineSize));
    var item = array.children[randIndex];
    item.style.backgroundColor = `rgb(${newColor}, ${squareColor[1]}, ${squareColor[2]})`;
    item.onclick = NextLvlEvent;

}


var randColor = function(){
    var r = Math.random() * 1000 % 255;
    var g = Math.random() * 1000 % 255;
    var b = Math.random() * 1000 % 255;

    r = Math.floor(r);
    g = Math.floor(g);
    b = Math.floor(b);

    return [r, g, b];
}


var NextLvlEvent = function(){
    timerCounter = 0;
    timerDOM.textContent = `Оставшееся время: ${10 - timerCounter} секунд`;

    arrayLineSize++;
    createSquares();
    score.textContent = `Результат: ${arrayLineSize - startSquaresCount}`;
}


var LoseEvent = function(){
    approximationColorValue = 255 / 2;
    alert(`ты проиграл, твой результат ${arrayLineSize - startSquaresCount}`);
    arrayLineSize = startSquaresCount;
    createSquares();
    score.textContent = `Результат: ${arrayLineSize - startSquaresCount}`;

    timerCounter = 0;
    timerDOM.textContent = `Оставшееся время: ${10 - timerCounter} секунд`;
}
