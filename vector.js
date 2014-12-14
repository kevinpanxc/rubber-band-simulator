function Vector(x_1, y_1, x_2, y_2, normalize) {
    // normalize
    this.x = x_2 - x_1;
    this.y = y_2 - y_1;

    if (normalize) {
        var magnitude = this.magnitude();
        this.x /= magnitude;
        this.y /= magnitude;
    }
}

Vector.prototype.magnitude = function () {
    return Math.sqrt(this.x * this.x + this.y * this.y);
}

Vector.prototype.scale = function (scale) {
    this.x *= scale;
    this.y *= scale;
}

Vector.prototype.NORMALIZE = true;