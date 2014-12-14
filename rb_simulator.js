var Simulator = (function () {
    var ctx;
    var canvas;

    function start() {

    }

    function clear_canvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    return {
        initialize : function () {
            canvas = document.getElementById("canvas");
            ctx = canvas.getContext("2d");

            start();
        }
    }
})();