function RubberBand(x_1, y_1, x_2, y_2, number_of_nodes) {
    this.NUM_NODES = number_of_nodes;
    this.nodes = [];

    var x_temp = x_1,
        y_temp = y_1;

    var x_increment = Math.abs(x_2 - x_1)/(this.NUM_NODES - 1),
        y_increment = Math.abs(y_2 - y_1)/(this.NUM_NODES - 1);

    for (var i = 0; i < this.NUM_NODES; i++) {
        this.nodes.push(new Node(x_temp, y_temp, 10000, x_increment));
        x_temp += x_increment;
        y_temp += y_increment;
    }
}

RubberBand.prototype.draw = function (ctx) {
    for (var i = 0; i < this.NUM_NODES; i++) {
        this.nodes[i].draw(ctx);
    }
}

RubberBand.prototype.update = function () {
    for (var i = 1; i < this.NUM_NODES - 1; i++) {
        this.nodes[i].hookes_law(this.nodes[i - 1]);
        this.nodes[i].hookes_law(this.nodes[i + 1]);
    }

    for (var i = 0; i < this.NUM_NODES; i++) {
        this.nodes[i].update_position();
    }
}