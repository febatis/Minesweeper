function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr
}

var canvasWidth = 601; var canvasHeight = 601;
var cellSize = 60;
var cols; var rows; var grid;
var totalBombs = 20;

function setup() {
  for (let element of document.getElementsByClassName("p5Canvas")) {
    element.addEventListener("contextmenu", (e) => e.preventDefault()); //Desativa R-click dentro do canvas
  }
  createCanvas(canvasWidth, canvasHeight);
  cols = floor(canvasWidth/cellSize);
  rows = floor(canvasHeight/cellSize);
  grid = make2DArray(cols, rows);
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, cellSize);
    }
  }

  var options = [];
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      options.push([i, j]);
    }
  }
  
  for (n = 0; n < totalBombs; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.splice(index, 1);
    grid[i][j].bomb = true;
  }

  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j].countBombs();
    }
  }
}

function gameOver() {
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
        grid[i][j].revealed = true;
    }
  }
}

function mousePressed() {
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY)){
        if (mouseButton == LEFT) {
          grid[i][j].reveal();
          if (grid[i][j].bomb) {
            gameOver();
          }
        }
        if (mouseButton == RIGHT) {
          grid[i][j].mark();
        }
      }
    }
  }
}

function draw() {
  background(255);
  for (i = 0; i < cols; i++) {
    for (j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
}