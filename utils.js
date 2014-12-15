function find_dist(x_1, y_1, x_2, y_2) {
    var dx = x_2 - x_1;
    var dy = y_2 - y_1;
    return Math.sqrt(dx * dx + dy * dy);
}