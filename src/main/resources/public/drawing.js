var speedslider;
var button;

function restart() {
    background('#5d0082');
    speedslider.value(1);
    pointType.value('point');
    context = "click";
    numOfPoints = 0;
    points = [];
}

function setup() {
    createCanvas(width, height);
    background('#5d0082');
    speedslider = createSlider(1, 255, 1);
    speedslider.position(10, 10);
    speedslider.style('width', '300px');
    pointType = createRadio();
    pointType.option('point', 'point');
    pointType.option('Big point', 'Big point');
    pointType.style('width', '300px');
    pointType.position(10, height - 20);
    pointType.value('point');
    rectMode(CORNER);
    fill('#000000');
    strokeWeight(0);
    rect(width - 30, 5, 20, 20);
}

let skipFrames;
let context = "click";
let points = [];
let numOfPoints = 0;


function draw() {
    switch (context) {
        case "click":
            drawStartPoints();
            if (numOfPoints === 4) context = "work";
            break;
        case "work":
            rectMode(CORNER);
            fill('#000000');
            strokeWeight(0);
            rect(width - 30, 5, 20, 20);
            for (let i = 0; i < speedslider.value(); i++) {
                let point = points[floor(random(3))];
                let newP = new Point((point.x + points[3].x) / 2, (point.y + points[3].y) / 2);
                points[3] = newP;
                newP.draw();
            }
    }
}

function mouseClicked() {
    switch (context) {
        case "click":
            if (shift < mouseX && mouseX < width - shift && shift < mouseY && mouseY < height - shift)
                points[numOfPoints++] = new Point(mouseX, mouseY);
            break;
        case "work":
            if (width - 30 < mouseX && mouseX < width - 10 && 5 < mouseY && mouseY < 25)
                restart();
            else if (shift < mouseX && mouseX < width - shift && shift < mouseY && mouseY < height - shift) {
                points[3] = new Point(mouseX, mouseY);
                redrawStart();
            }
            break;
    }
}

function drawStartPoints() {
    // for (let i = 0; i < 3; i++) points[i].draw();
    for (let p of points) p.draw();
}

function redrawStart() {
    background('#5d0082');
    drawStartPoints()
}

