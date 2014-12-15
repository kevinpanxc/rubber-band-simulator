function RubberBand(cx, cy, radius, number_of_nodes) {
    this.NUM_NODES = number_of_nodes;
    this.nodes = [];

    var delta_rad = (2 * Math.PI) / number_of_nodes;
    var current_rad = 0;

    var eq_dist = find_dist(cx + radius * Math.cos(0), cy + radius * Math.sin(0),
                            cx + radius * Math.cos(delta_rad), cy + radius * Math.sin(delta_rad));

    for (var i = 0; i < number_of_nodes; i++) {
        this.nodes.push(new Node(cx + radius * Math.cos(current_rad), cy + radius * Math.sin(current_rad), 30000, eq_dist));
        current_rad += delta_rad;
    }
}

RubberBand.prototype.draw = function (ctx, line_width, static_node_indices) {
    for (var i = 0; i < this.NUM_NODES; i++) {
        this.nodes[i].draw(ctx);
    }

    for (var i = 0; i < static_node_indices.length; i++) {
        this.nodes[static_node_indices[i]].draw_outline(ctx);
    }

    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    for (var i = 0; i < this.NUM_NODES - 1; i++) {
        ctx.beginPath();
        ctx.lineWidth=line_width * this.nodes[i].dist_over_eq_dist(this.nodes[i + 1]);
        ctx.moveTo(this.nodes[i].x, this.nodes[i].y);
        ctx.lineTo(this.nodes[i + 1].x, this.nodes[i + 1].y);
        ctx.stroke();
    }

    ctx.beginPath();
    ctx.lineWidth=line_width * this.nodes[this.NUM_NODES - 1].dist_over_eq_dist(this.nodes[0]);
    ctx.moveTo(this.nodes[this.NUM_NODES - 1].x, this.nodes[this.NUM_NODES - 1].y);
    ctx.lineTo(this.nodes[0].x, this.nodes[0].y);
    ctx.stroke();
}

RubberBand.prototype.update = function (mouse_selected_index, static_node_indices) {
    this.nodes[0].hookes_law(this.nodes[1]);
    this.nodes[0].hookes_law(this.nodes[this.NUM_NODES - 1]);

    this.nodes[this.NUM_NODES - 1].hookes_law(this.nodes[0]);
    this.nodes[this.NUM_NODES - 1].hookes_law(this.nodes[this.NUM_NODES - 2]);

    for (var i = 1; i < this.NUM_NODES - 1; i++) {
        if (i != mouse_selected_index && static_node_indices.indexOf(i) < 0) {
            this.nodes[i].hookes_law(this.nodes[i - 1]);
            this.nodes[i].hookes_law(this.nodes[i + 1]);
        } 
    }

    for (var i = 0; i < this.NUM_NODES; i++) {
        if (i != mouse_selected_index && static_node_indices.indexOf(i) < 0) {
            this.nodes[i].update_position();
        }
    }
}