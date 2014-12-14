/* VELOCITY IS NOT RELATIVE TO THE NODE!!! */

function Node(x, y, mass, eq_dist) {
    this.x = x;
    this.y = y;
    this.mass = mass;
    this.K = 50;
    this.EQ_DIST = eq_dist;

    this.velocity = new Vector(0, 0, 0, 0, false);
}

Node.prototype.hookes_law = function (other_node) {
    var f_mag = -1 * (this.K * (find_dist(this, other_node) - this.EQ_DIST));
    var a_mag = f_mag / this.mass;

    var a_vector = new Vector( other_node.x, other_node.y, this.x, this.y );
    a_vector.scale(a_mag);

    this.velocity.scale(0.995); // apply damping force

    this.velocity.add(a_vector);

    return a_vector;
}

Node.prototype.update_position = function () {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
}

Node.prototype.draw = function (ctx) {
    var point_charge_gradient = ctx.createRadialGradient(this.x,this.y,5,this.x,this.y,this.DRAW_RADIUS);
    point_charge_gradient.addColorStop(0, 'rgba(0,0,0,1)');
    point_charge_gradient.addColorStop(0.8, 'rgba(200,200,200,.9)');
    point_charge_gradient.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = point_charge_gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.DRAW_RADIUS, 0, Math.PI*2, true);
    ctx.fill();
}

Node.prototype.DRAW_RADIUS = 15;

function find_dist(node_1, node_2) {
    var dx = node_2.x - node_1.x;
    var dy = node_2.y - node_1.y;
    return Math.sqrt(dx * dx + dy * dy);
}