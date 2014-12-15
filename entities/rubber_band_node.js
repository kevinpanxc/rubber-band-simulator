/* VELOCITY IS NOT RELATIVE TO THE NODE!!! */

function Node(x, y, mass, eq_dist) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.K = 500;
    this.eq_dist = eq_dist;

    this.velocity = new Vector(0, 0, 0, 0, false);
}

Node.prototype.hookes_law = function (other_node) {
    var f_mag = -1 * (this.K * (find_node_dist(this, other_node) - this.eq_dist));
    var a_mag = f_mag / this.mass;

    var a_vector = new Vector( other_node.x, other_node.y, this.x, this.y );
    a_vector.scale(a_mag);

    this.velocity.scale(1.0 - this.DAMPING_COEFFICIENT); // apply damping force

    this.velocity.add(a_vector);

    return a_vector;
}

Node.prototype.update_position = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
}

Node.prototype.draw = function (ctx) {
    ctx.fillStyle = 'rgba(0,0,0, 0.8)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.DRAW_RADIUS, 0, Math.PI*2, true);
    ctx.fill();
}

Node.prototype.draw_outline = function (ctx) {
    ctx.strokeStyle = '#FFFF00';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.DRAW_RADIUS + 3, 0, Math.PI*2, true);
    ctx.stroke();   
}

Node.prototype.dist_over_eq_dist = function (other_node) {
    return this.eq_dist / find_node_dist(this, other_node);
}

Node.prototype.DRAW_RADIUS = 8;

Node.prototype.DAMPING_COEFFICIENT = 0.08;

function find_node_dist(node_1, node_2) {
    return find_dist(node_1.x, node_1.y, node_2.x, node_2.y);
}