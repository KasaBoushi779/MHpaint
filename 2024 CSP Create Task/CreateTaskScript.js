//This array is necessary for modifying squares, like when I remove the grid
var fillIndex = [];

//Default tile size
var tileSide = 20;

drawGrid(tileSide);

//Allows user to change grid size, which also adjusts the size of the tile filled
function changeGridSize(){
    var promptText = "Input a number to change " +
        "the size of each tile in the grid. The " + 
        "default is 20. If you input a smaller " + 
        "number you'll increase the grid's resolution, " + 
        "while if you input a larger number the opposite will happen";
    var newTileSide = prompt(promptText);
    tileSide = parseInt(newTileSide);
    drawGrid(tileSide);
}

//Draws grid, and can also redraw it, as in the function above
function drawGrid(tileSide){
    //Resets fillIndex each time drawGrid is run. Necessary for changing grid size
    fillIndex = [];
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    var canWidth = canvas.width;
    var canHeight = canvas.height;

    //Sets the colors of the tile grid
    ctx.strokeStyle = "black";
    ctx.fillStyle = "white";

    for(var i = 0; i < canWidth; i += tileSide){
        for(var k = 0; k < canHeight; k += tileSide){
            ctx.fillRect(i, k, tileSide, tileSide);
            ctx.strokeRect(i, k, tileSide, tileSide);

            var filledTile = {xValue: i, yValue: k, color: "None", fillValue: false};
            fillIndex.push(filledTile);
        }
    }
}

/* Sets default drawColor. The functions 
below can change it to preset values, and 
the custom color function allows users to 
try putting in their own colors. */
var drawColor = "black";

function setWhite(){
    drawColor = "white";
}
function setBlack(){
    drawColor = "black";
}
function setBlue(){
    drawColor = "blue";
}
function setRed(){
    drawColor = "red";
}
function setGreen(){
    drawColor = "green";
}
function setYellow(){
    drawColor = "Yellow";
}
function setPurple(){
    drawColor = "purple";
}
function setOrange(){
    drawColor = "orange";
}
function customColor(){
    drawColor = prompt("Type in a custom color. Not all colors are supported.");
}

/* Necessary for drawing. Allows the program to find 
the top left edge of the tile where the mouse is */
function findTileStartX(mouseX){
    var startX = Math.floor(mouseX / tileSide) * tileSide;
    return startX;
}
function findTileStartY(mouseY){
    var startY = Math.floor(mouseY / tileSide) * tileSide;
    return startY;
}

/* When mPress is one, a mouse button is being 
pressed. If it is zero, there are no buttons being pressed */
var mPress = 0;
document.body.onmousedown = function() { 
  mPress = 1;
}
document.body.onmouseup = function() {
  mPress = 0;
}

/*Calculates the index of a tile in fillIndex 
based on the position of the top left edge of a tile*/
function indexCalc(startX, startY){
    var index = ((startX/tileSide)*(30*(20/tileSide))) + (startY/tileSide);
    return index;
}

function draw(e){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    mouseX = e.clientX;
    mouseY = e.clientY;

    var startX = findTileStartX(mouseX);
    var startY = findTileStartY(mouseY);

    /* I don't know any methods that let me draw while the 
    mouse was moving and while it was still, so both the if 
    statement and the onclick method are necessary */
    if(mPress==1){
        ctx.fillStyle = drawColor;
        ctx.fillRect(startX, startY, tileSide, tileSide);

        var filledTile = {xValue: startX, yValue: startY, 
            color: drawColor, fillValue: true};
        var index = indexCalc(startX, startY);
        fillIndex.splice(index, 1, filledTile);
    }

    document.body.onclick = function(){
        ctx.fillStyle = drawColor;
        ctx.fillRect(startX, startY, tileSide, tileSide);

        var filledTile = {xValue: startX, yValue: startY, 
            color: drawColor, fillValue: true};
        var index = indexCalc(startX, startY);
        fillIndex.splice(index, 1, filledTile);
    }
}

function removeGrid(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.strokeStyle = "white";

    /*I make an array of all tiles that have a 
    fillValue of false, then I loop through it 
    and draw white lines to erase the gridlines 
    outside of the filled tiles*/
    var unfilledTiles = 
        fillIndex.filter(filledTile => filledTile.fillValue == false);
    
    for(var i=0; i<unfilledTiles.length; i++){
        var xValue = unfilledTiles[i].xValue;
        var yValue = unfilledTiles[i].yValue;
        /*The looping four times is done because 
        with only one or two loops the gridlines either 
        aren't fully black (in restoreGrid) or aren't fully white*/
        for(var t=0; t<4; t++){
            ctx.strokeRect(xValue, yValue, tileSide, tileSide);
        }
    }
}

/*Does the exact same thing as removeGrid, but 
rewrites grid lines as their original black*/
function restoreGrid(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    ctx.strokeStyle = "black";

    var unfilledTiles = 
        fillIndex.filter(filledTile => filledTile.fillValue == false);
    
    for(var i=0; i<unfilledTiles.length; i++){
        var xValue = unfilledTiles[i].xValue;
        var yValue = unfilledTiles[i].yValue;
        for(var n=0; n<4; n++){
            ctx.strokeRect(xValue, yValue, tileSide, tileSide);
        }
    }
}
