var RubberBandSimulator = (function () {
    var ctx;
    var rect;
    var canvas;
    var rubber_band;

    var draw_interval = -1;

    var REDRAW_INTERVAL_TIME = 17; // 60 fps

    // mouse booleans
    var is_mouse_down = false;

    function enable_mouse_actions() {
        // canvas.onmouseup = mouse_up;
        // canvas.onmousedown = mouse_down;
        canvas.onmousemove = mouse_moved;     
    }

    function disable_mouse_anctions() {
        canvas.onmouseup = null;
        canvas.onmousedown = null;
        canvas.onmousemove = null;        
    }

    function mouse_moved(e) {
        // if (is_mouse_down) {
        //     document.body.style.cursor = 'pointer';
        //     var new_x_position = (e.pageX - rect.left - canvas.offsetLeft) - cursor_x;
        //     var new_y_position = (e.pageY - rect.top - canvas.offsetTop) - cursor_y;
        //     var current_element = rubber_band.nodes[selected_stationary_charge];
        //     current_element.x_pos = new_x_position;
        //     current_element.y_pos = new_y_position;
        // }
        // else {
            if ( mouse_check_and_return_index(e.pageX - rect.left, e.pageY - rect.top) >= 0 ) document.body.style.cursor = 'pointer';
            else document.body.style.cursor = 'default';
        // }
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
                rubber_band.draw(ctx);
                rubber_band.update();
                accrued_time -= REDRAW_INTERVAL_TIME;
            }
        }      
    }

    function start() {
        step();
        enable_mouse_actions();
    }

    function clear_canvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return {
        initialize : function () {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");
            rect = canvas.getBoundingClientRect();

            rubber_band = new RubberBand(100, 100, 550, 100, 15);

            start();
        }
    }
})();