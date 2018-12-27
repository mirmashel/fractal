class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 3;
        this.color = '#fff0bd'
    }

    draw() {
        if (pointType.value() === "point")
            this.radius = 1;
        else
            this.radius = 3;

        stroke(this.color);
        fill(this.color);
        ellipseMode(RADIUS);
        ellipse(this.x, this.y, this.radius, this.radius);

        //
    }


}