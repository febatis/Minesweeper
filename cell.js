function Cell(i, j, w) {
    this.bomb = false;
    this.revealed = false;
    this.marked = false;
    this.i = i; this.j = j;
    this.x = i * w; this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
}

Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
        fill(180);
        if (this.bomb) {
            ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
        } else {
            fill(230);
            rect(this.x, this.y, this.w, this.w);
            if (this.neighborCount > 0) {
                fill(0)
                textAlign(CENTER);
                textSize(18); textStyle(BOLD);
                text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w * 0.6);
            }
        }
    } if (!this.revealed && this.marked) {
        line(this.x + this.w/2, this.y + this.w/1.5, this.x + this.w/2, this.y + this.w/3.7);        
        fill(255, 0, 0);
        triangle(this.x + this.w/2, this.y + this.w/2.3, this.x + this.w/2, this.y + this.w/3.7, this.x + this.w/3.5, this.y + this.w/2.8);
    }        
}

Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < (this.x + this.w) && y > this.y && y < (this.y + this.w))
}

Cell.prototype.mark = function() {
    if (this.marked) {
        this.market = false; //needs work
    }
    this.marked = true;
}

Cell.prototype.reveal = function() {
    this.revealed = true;
    if (this.neighborCount == 0) {
        this.floodfill();
    }
}

Cell.prototype.floodfill = function() {
    for (var xOff = -1; xOff <= 1; xOff++) {
        for (var yOff = -1; yOff <= 1; yOff++) {
            var i = this.i + xOff;
            var j = this.j + yOff;
            if (i > -1 && i < cols && j > -1 && j < rows) {
                var neighbor = grid[i][j];
                if (!neighbor.revealed) {
                    neighbor.reveal();
                }
            }
        }
    }
}

Cell.prototype.countBombs = function() {
    if (this.bomb) {
        this.neighborCount = -1;
        return
    } else {
        var total = 0;
        for (var xOff = -1; xOff <= 1; xOff++) {
            for (var yOff = -1; yOff <= 1; yOff++) {
                var i = this.i + xOff;
                var j = this.j + yOff;
                if (i > -1 && i < cols && j > -1 && j < rows) {
                    var neighbor = grid[i][j];
                    if (neighbor.bomb) {
                        total ++;
                    }
                }
            }
        }
        this.neighborCount = total;
    }
}