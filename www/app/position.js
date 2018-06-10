define(function (require) {

    var position = {
        startmove: null,
        moves: null,
        startx: 0,
        starty: 0,
        distx: 0,
        disty: 0,
        pointY: 0,
        link: [],
        linkLast : null,
        initialize: function (pbl) {
            position.startmove = document.getElementById('mySearchAZ');
            //position.moves = document.getElementById('message');
            position.startmove.addEventListener("touchstart", function (eve) {
                var touchobj = eve.changedTouches[0]; // erster Finger
                position.pointY = parseInt(touchobj.clientY);
                position.startx = parseInt(touchobj.clientX); // X/Y-Koordinaten relativ zum Viewport
                position.starty = position.pointY;
                //position.moves.innerHTML = "touch bei X: " + position.startx + "px, Y: " + position.starty + "px";
                eve.preventDefault();
            });
            position.startmove.addEventListener("mousedown", function (eve) {
                position.startx = parseInt(eve.clientX); // X/Y-Koordinaten relativ zum Viewport
                position.pointY = parseInt(eve.clientY);
                position.starty = position.pointY;
                //position.moves.innerHTML = "mouse bei X: " + position.startx + "px, Y: " + position.starty + "px";
                //position.moves.innerHTML = "mouse bei Y: " + (position.starty - position.startmove.y) / position.startmove.offsetHeight + " %";
                eve.preventDefault();
            });
            position.startmove.addEventListener("touchmove", function (eve) {
                var touchobj = eve.changedTouches[0]; // erster Finger
                position.pointY = parseInt(eve.clientY);
                position.distx = parseInt(touchobj.clientX) - position.startx;
                position.disty = parseInt(touchobj.clientY) - position.starty;
                var link = Math.round(100 * position.link.length * (parseInt(touchobj.clientY) - position.startmove.offsetTop) / position.startmove.offsetHeight) / 100;
                position.set(link, true);
                eve.preventDefault();
            });
            position.startmove.addEventListener("mousemove", function (eve) {
                position.pointY = parseInt(eve.clientY);
                position.distx = parseInt(eve.clientX) - position.startx; // X/Y-Koordinaten relativ zum Viewport
                position.disty = parseInt(eve.clientY) - position.starty;
                var link = Math.round(100*position.link.length * (eve.clientY - position.startmove.offsetTop) / position.startmove.offsetHeight)/100;
                position.set(link, false);
                eve.preventDefault();
            });
            position.startmove.addEventListener("touchend", function (eve) {
                position.pointY = parseInt(eve.clientY);
                var touchobj = eve.changedTouches[0]; // reference first touch point for this event
                position.distx = parseInt(touchobj.clientX) - position.startx;
                position.disty = parseInt(touchobj.clientY) - position.starty;
                //position.moves.innerHTML = "touch bei X: " + (position.startx + position.distx) + "px, Y: " + (position.starty + position.disty) + "px";
                eve.preventDefault();
            });
            position.startmove.addEventListener("mouseup", function (eve) {
                position.pointY = parseInt(eve.clientY);
                position.distx = parseInt(eve.clientX) - position.startx; // X/Y-Koordinaten relativ zum Viewport
                position.disty = parseInt(eve.clientY) - position.starty;
                //position.moves.innerHTML = "mouse bei X: " + (position.startx + position.distx) + "px, Y: " + (position.starty + position.disty) + "px";
                eve.preventDefault();
            });
        },
        set: function (pos, touch) {
            var newLink = position.link[Math.round(pos - 0.5)];
            //position.moves.innerHTML = "Y: " + pos + " / " + newLink;
            if (typeof newLink !== 'undefined' && position.linkLast !== newLink) {
                if (touch) {
                    //navigator.vibrate(200);
                    TapticEngine.selection();
                }
                window.location = newLink;
                position.linkLast = newLink;
            }
        }
    };
    return position;
});
