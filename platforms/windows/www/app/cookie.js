/*! cookie function. get, set, or forget a cookie. [c]2014 @scottjehl, Filament Group, Inc. Licensed MIT */
define(function (require) {

    var cookie = function (name, value, days) {
        //var w = (typeof global !== "undefined" ? global : this);
        // if value is a false boolean, we'll treat that as a delete
        if (value === false) {
            days = -1;
        }
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        // if value is undefined, get the cookie value
        if (value === undefined) {
            console.log(document.cookie);
            var cookiestring = "; " + document.cookie;
            var cookies = cookiestring.split("; " + name + "=");
            if (cookies.length === 2) {
                value = cookies.pop().split(";").shift();
            } else {
                value = null;
            }
        }
        // set or refresh
        if (value ) {
            console.log(name + "=" + value + expires + "; path=/");
            document.cookie = name + "=" + value + expires + "; path=/";
        }
        console.log(document.cookie);
        console.log(value);
        return value;
    };
    // commonjs
/*
    if (typeof module !== "undefined") {
        module.exports = cookie;
    }
    else {
        w.cookie = cookie;
    }
    */
    return cookie;
});
