var RubberBandSimulator = (function () {
    var ctx;
    var rect;
    var canvas;
    var canvas_container;
    var rubber_band;

    var draw_interval = -1;

    var REDRAW_INTERVAL_TIME = 17; // 60 fps

    // mouse booleans
    var cursor_x = -1;
    var cursor_y = -1;
    var is_mouse_down = false;
    var mouse_selected_index = -1;

    var static_node_indices = [];

    function check_key_down(e) {
        if (mouse_selected_index > -1) {
            var index = static_node_indices.indexOf(mouse_selected_index);
            if (index >= 0) static_node_indices.splice(index, 1);
            else static_node_indices.push(mouse_selected_index);
        }
    }

    function enable_mouse_actions() {
        canvas.onmouseup = mouse_up;
        canvas.onmousedown = mouse_down;
        canvas.onmousemove = mouse_moved;     
    }

    function enable_keyboard_actions() {
        window.addEventListener("keydown", check_key_down, false);
    }

    function disable_mouse_anctions() {
        canvas.onmouseup = null;
        canvas.onmousedown = null;
        canvas.onmousemove = null;        
    }

    function mouse_up () {
        is_mouse_down = false;
        mouse_selected_index = -1;
    }

    function mouse_down(e) {
        e.preventDefault();
        var index_of_charge_element = mouse_check_and_return_index(e.pageX - rect.left, e.pageY - rect.top);
        if (index_of_charge_element >= 0) {
            cursor_x = (e.pageX - rect.left) - rubber_band.nodes[index_of_charge_element].x;
            cursor_y = (e.pageY - rect.top) - rubber_band.nodes[index_of_charge_element].y;

            mouse_selected_index = index_of_charge_element;
            is_mouse_down = true;
        }
    }

    function mouse_moved(e) {
        if (is_mouse_down) {
            document.body.style.cursor = 'pointer';
            var new_x_position = (e.pageX - rect.left) - cursor_x;
            var new_y_position = (e.pageY - rect.top) - cursor_y;
            var current_element = rubber_band.nodes[mouse_selected_index];
            current_element.x = new_x_position;
            current_element.y = new_y_position;
        }
        else {
            if ( mouse_check_and_return_index(e.pageX - rect.left, e.pageY - rect.top) >= 0 ) document.body.style.cursor = 'pointer';
            else document.body.style.cursor = 'default';
        }
    }

    function mouse_check_and_return_index(x, y){
        // sets mouse booleans
        // returns relevant charge element index
        for (var i = rubber_band.nodes.length - 1; i >= 0; i--){
            if (x > (rubber_band.nodes[i].x - Node.prototype.DRAW_RADIUS)  &&  x < (rubber_band.nodes[i].x + Node.prototype.DRAW_RADIUS)
            && y > (rubber_band.nodes[i].y - Node.prototype.DRAW_RADIUS)   &&  y < (rubber_band.nodes[i].y + Node.prototype.DRAW_RADIUS)){
                return i;
            }
        }
        return -1;
    }

    var loop_timestamp = null;
    var accrued_time = 0;
    function step(timestamp) {
        draw_interval = window.requestAnimationFrame ( step );
        if (loop_timestamp == null) loop_timestamp = timestamp;
        var delta_t = timestamp - loop_timestamp;
        loop_timestamp = timestamp;
        if (!isNaN(delta_t)) {
            accrued_time += delta_t;
            while (accrued_time >= REDRAW_INTERVAL_TIME) {
                clear_canvas();
                rubber_band.draw(ctx, 5, static_node_indices);
                rubber_band.update(mouse_selected_index, static_node_indices);
                accrued_time -= REDRAW_INTERVAL_TIME;
            }
        }      
    }

    function start() {
        step();
        enable_mouse_actions();
        enable_keyboard_actions();
    }

    function clear_canvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return {
        initialize : function () {
            canvas_container = document.getElementById("canvas_container");
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            rect = canvas.getBoundingClientRect();

            rubber_band = new RubberBand(300, 300, 100, 36);

            start();
        }
    }
})();