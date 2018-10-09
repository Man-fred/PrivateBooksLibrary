define(function (require) {

    var position = {
        init: true,
        leftswipe: null,
        leftswipeTriggered: false,
        rightswipe: null,
        rightswipeTriggered: false,
        startmove: null,
        moves: null,
        movevert: false,
        startx: 0,
        starty: 0,
        distx: 0,
        disty: 0,
        pointY: 0,
        link: [],
        linkLast : null,
        initialize: function (pbl) {
            if (this.init) {
                this.init = false;
                position.leftswipe = new Event('leftswipe');
                position.rightswipe = new Event('rightswipe');
                position.startmove = document.getElementById('mySearchAZ');
                position.overlay = document.getElementById('overlay');
                position.overlay.addEventListener("touchstart", function (eve) { position.touchstart(eve, 0) });
                position.overlay.addEventListener("touchmove", function (eve) { position.touchmove(eve, 0) });
                position.overlay.addEventListener("touchend", function (eve) { position.touchend(eve, 0) });
                position.overlay.addEventListener("leftswipe", function (eve) { app.init.show(1); });
                position.overlay.addEventListener("rightswipe", function (eve) { app.init.show(-1); });
                //position.moves = document.getElementById('message');
                position.startmove.addEventListener("mouseenter", function (eve) { position.mouseenter(eve, 1) });
                position.startmove.addEventListener("touchstart", function (eve) { position.touchstart(eve, 1) });
                position.startmove.addEventListener("touchmove", function (eve) { position.touchmove(eve, 1) });
                position.startmove.addEventListener("touchend", function (eve) { position.touchend(eve, 1) });

                position.startmove.addEventListener("mousedown", function (eve) {
                    position.startx = parseInt(eve.clientX); // X/Y-Koordinaten relativ zum Viewport
                    position.pointY = parseInt(eve.clientY);
                    position.starty = position.pointY;
                    //position.moves.innerHTML = "mouse bei X: " + position.startx + "px, Y: " + position.starty + "px";
                    //position.moves.innerHTML = "mouse bei Y: " + (position.starty - position.startmove.y) / position.startmove.offsetHeight + " %";
                    eve.preventDefault();
                });
                position.startmove.addEventListener("mousemove", function (eve) {
                    position.pointY = parseInt(eve.clientY);
                    position.distx = parseInt(eve.clientX) - position.startx; // X/Y-Koordinaten relativ zum Viewport
                    position.disty = parseInt(eve.clientY) - position.starty;
                    //console.log(position.distx + ' - ' + position.disty)
                    if (position.movevert || (Math.abs(position.disty) > 10 && Math.abs(position.distx * 3) < Math.abs(position.disty) ) ) {
                        position.movevert = true;
                        var link = Math.round(100 * position.link.length * (eve.clientY - position.startmove.offsetTop) / position.startmove.offsetHeight) / 100;
                        position.set(link, false);
                        eve.preventDefault();
                    }
                });
                position.startmove.addEventListener("mouseup", function (eve) {
                    position.pointY = parseInt(eve.clientY);
                    position.distx = parseInt(eve.clientX) - position.startx; // X/Y-Koordinaten relativ zum Viewport
                    position.disty = parseInt(eve.clientY) - position.starty;
                    //position.moves.innerHTML = "mouse bei X: " + (position.startx + position.distx) + "px, Y: " + (position.starty + position.disty) + "px";
                    eve.preventDefault();
                });
            }
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
        },
        mouseenter: function (eve, obj) {
            position.startx = parseInt(eve.clientX); // X/Y-Koordinaten relativ zum Viewport
            position.starty = parseInt(eve.clientY);
            position.movevert = false;
            if (obj === 1)
                eve.preventDefault();
        },
        touchstart: function (eve, obj) {
            var touchobj = eve.changedTouches[0]; // erster Finger
            position.pointY = parseInt(touchobj.clientY);
            position.startx = parseInt(touchobj.clientX); // X/Y-Koordinaten relativ zum Viewport
            position.starty = position.pointY;
            //position.moves.innerHTML = "touch bei X: " + position.startx + "px, Y: " + position.starty + "px";
            if (obj === 1) {
                eve.preventDefault();
            }
        },
        touchmove: function (eve, obj) {
            var touchobj = eve.changedTouches[0]; // erster Finger
            position.pointY = parseInt(eve.clientY);
            position.distx = parseInt(touchobj.clientX) - position.startx;
            position.disty = parseInt(touchobj.clientY) - position.starty;
            if (obj === 1) {
                // A-Z - Leiste
                var link = Math.round(100 * position.link.length * (parseInt(touchobj.clientY) - position.startmove.offsetTop) / position.startmove.offsetHeight) / 100;
                position.set(link, true);
                eve.preventDefault();
            } else if (obj === 0) {
                // left/right - swipe
                if (position.disty < 30 && !position.leftswipeTriggered) {
                    if (position.distx > 30) {
                        position.leftswipeTriggered = true;
                        eve.currentTarget.dispatchEvent(position.rightswipe);
                    }
                    if (position.distx < -30) {
                        position.leftswipeTriggered = true;
                        eve.currentTarget.dispatchEvent(position.leftswipe);
                    }
                }
                eve.preventDefault();
            }
        },
        touchend: function (eve, obj) {
            position.pointY = parseInt(eve.clientY);
            var touchobj = eve.changedTouches[0]; // reference first touch point for this event
            position.distx = parseInt(touchobj.clientX) - position.startx;
            position.disty = parseInt(touchobj.clientY) - position.starty;
            //position.moves.innerHTML = "touch bei X: " + (position.startx + position.distx) + "px, Y: " + (position.starty + position.disty) + "px";
            position.leftswipeTriggered = false;
            if (obj === 1) {
                eve.preventDefault();
            }
        }
    };
    return position;
});
