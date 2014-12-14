function Vector(x_1, y_1, x_2, y_2, normalize) {
    // normalize
    this.x = x_2 - x_1;
    this.y = y_2 - y_1;

    if (normalize || typeof normalize === 'undefined') {
        var magnitude = this.magnitude();
        if (magnitude != 0) {
            this.x /= magnitude;
            this.y /= magnitude;            
        }
    }
}

Vector.prototype.magnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector.prototype.scale = function (scale) {
    this.x *= scale;
    this.y *= scale;
}

Vector.prototype.scale_return = function (scale) {
    return new Vector(0, 0, this.x * scale, this.y * scale, false);
}

Vector.prototype.add = function (that) {
    this.x += that.x;
    this.y += that.y;
}

Vector.prototype.subtract = function (that) {
    this.x -= that.x;
    this.y -= that.y;
}