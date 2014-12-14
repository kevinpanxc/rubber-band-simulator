function Node(x, y, mass) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.K = 1.0;
    this.EQ_DIST = 100;

    this.velocity = new Vector(0, 0);
}

Node.prototype.hookes_law = function (other_node) {
    var f_mag = -1 * (this.K * (find_dist(this, other_node) - this.EQ_DIST));
    var a_mag = f_mag / this.mass;

    var a_vector = new Vector( this.x, this.y, other_node.x, other_node.y );
    a_vector.scale(a_mag);
}

function find_dist(node_1, node_2) {
    var dx = node_2.x - node_1.x;
    var dy = node_2.y - node_1.y;
    return Math.sqrt(dx * dx + dy * dy);
}