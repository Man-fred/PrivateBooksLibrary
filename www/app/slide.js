define(function (require) {

    var slide = function () {
            var startmove = document.getElementById('mySearchAZ');
            //var moves = document.getElementById('message');
            var startx = 0;
            var starty = 0;
            var distx = 0;
            var disty = 0;
            var pointY = 0;
            startmove.addEventListener("touchstart", function (eve) {
                var touchobj = eve.changedTouches[0]; // erster Finger
                pointY = parseInt(touchobj.clientY);
                startx = parseInt(touchobj.clientX); // X/Y-Koordinaten relativ zum Viewport
                starty = pointY;
                //moves.innerHTML = "touch bei X: " + startx + "px, Y: " + starty + "px";
                eve.preventDefault();
            });
            startmove.addEventListener("mousedown", function (eve) {
                startx = parseInt(eve.clientX); // X/Y-Koordinaten relativ zum Viewport
                pointY = parseInt(eve.clientY);
                starty = pointY;
                //moves.innerHTML = "mouse bei X: " + startx + "px, Y: " + starty + "px";
                eve.preventDefault();
            });
            startmove.addEventListener("touchmove", function (eve) {
                var touchobj = eve.changedTouches[0]; // erster Finger
                pointY = parseInt(eve.clientY);
                distx = parseInt(touchobj.clientX) - startx;
                disty = parseInt(touchobj.clientY) - starty;
                //moves.innerHTML = "touch bei X: " + (startx + distx) + "px, Y: " + (starty + disty) + "px";
                eve.preventDefault();
            });
            startmove.addEventListener("mousemove", function (eve) {
                pointY = parseInt(eve.clientY);
                distx = parseInt(eve.clientX) - startx; // X/Y-Koordinaten relativ zum Viewport
                disty = parseInt(eve.clientY) - starty;
                //moves.innerHTML = "mouse bei X: " + startx + "px, Y: " + starty + "px";
                eve.preventDefault();
            });
            startmove.addEventListener("touchend", function (eve) {
                pointY = parseInt(eve.clientY);
                var touchobj = eve.changedTouches[0]; // reference first touch point for this event
                distx = parseInt(touchobj.clientX) - startx;
                disty = parseInt(touchobj.clientY) - starty;
                //moves.innerHTML = "touch bei X: " + (startx + distx) + "px, Y: " + (starty + disty) + "px";
                eve.preventDefault();
            });
            startmove.addEventListener("mouseup", function (eve) {
                pointY = parseInt(eve.clientY);
                distx = parseInt(eve.clientX) - startx; // X/Y-Koordinaten relativ zum Viewport
                disty = parseInt(eve.clientY) - starty;
                //moves.innerHTML = "mouse bei X: " + (startx + distx) + "px, Y: " + (starty + disty) + "px";
                eve.preventDefault();
            });
    };
    return slide;
});
