/* global app */

﻿/*
    https://github.com/j3k0/cordova-plugin-purchase
*/
define(function (require) {

    var password = {
        ready: false,
        strength : {
            0: "Worst",
            1: "Bad",
            2: "Weak",
            3: "Good",
            4: "Strong"
        },
        // We must wait for the "deviceready" event to fire
        // before we can use the store object.

        init: function () {
        },
        new: function (id) {
        },
        // wenn store nicht initialisiert wird, dann hier Bestellungen direkt verarbeiten
        // offen: integration webapp, evtl. paypal
        update: function () {
            var oldpassword = document.getElementById('passwordOld').value;
            if (password.user && oldpassword && password.new1password && password.new1password === password.new2password) {
                var xhr = new XMLHttpRequest();

                var request = 'https://pbl.bcss.de/api/user-changepass.php?user=' + encodeURIComponent(password.user) +
                    '&pass=' + encodeURIComponent(oldpassword) + '&new=' + encodeURIComponent(password.new1password);
                xhr.open('GET', request, true);
                xhr.responseType = 'text/json';

                xhr.onreadystatechange = function () {
                    if (this.readyState === 4) {
                        if (this.status !== 200) {
                            app.ui.message(this.readyState + ' ' + this.status, 'error');
                            console.info(this.readyState + ' ' + this.status);
                        } else { //  if (this.status === 200) {
                            var erg = JSON.parse(xhr.responseText);
                            if (erg.error) {
                                app.ui.message(erg.error, 'error');
                            } else {
                                app.ui.message(erg.ok, 'ok');
                                // neues Passwort speichern 
                                app.pouch.passwordChange(password.new1password);
                                // und Seite schließen
                                app.data.show('**_login' + app.pouch.dbIdPrivate, 'login');
                            }
                            //alert(this.response);
                        }
                    }
                };
                xhr.send();
            }
        },
        new1input: function () {
            password.new1password = password.new1pass.value;
            require(["zxcvbn"], function (zxcvbn) {
                //console.log(zxcvbn(val));
                var result = zxcvbn(password.new1password);
                // Update the password strength meter
                password.meter1.value = result.score  + 1;

                /*/ Update the text indicator
                if (val !== "") {
                    password.text.innerHTML = "Strength: " + password.strength[result.score] + " " + result.feedback.warning;
                } else {
                    password.text.innerHTML = "";
                }
                */
            });
        },
        new2input: function () {
            password.new2password = password.new2pass.value;
            if (password.new1password === password.new2password) {
                password.meter2.value = 5;
            } else {
                password.meter2.value = 1;
            }
        },
        register: function (data, cache) {
        },
        setPageState: function (iap) {
        },
        setOnclick: function () {
            password.user = app.pouch.dbUser;
            document.getElementById('passwordUser').value = password.user;
            document.getElementById("passwordUpdate").addEventListener("click", function () { password.update("inappid1"); });
            password.new1pass = document.getElementById('passwordNew1');
            password.new1pass.addEventListener('input', function () { password.new1input(); });
            password.new2pass = document.getElementById('passwordNew2');
            password.new2pass.addEventListener('input', function () { password.new2input(); });
            password.meter1 = document.getElementById('password-strength-meter1');
            password.meter2 = document.getElementById('password-strength-meter2');
            password.text = document.getElementById('password-strength-text');
            password.passwordUpdate = document.getElementById('passwordUpdate');
        },
        setStates: function () {
        }
    };
    return password;
});