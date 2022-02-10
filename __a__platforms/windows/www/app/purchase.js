/* global app, store */

﻿/*
    https://github.com/j3k0/cordova-plugin-purchase
*/
define(function (require) {

    var purchase = {
        ready: false,
        error: false,
        visible: false,
        product: [],
        button: [],
        inappabo1: true, // irgendwann sperren

        // We must wait for the "deviceready" event to fire
        // before we can use the store object.

        init: function () {
            if (!window.store) {
                console.warn('Store not available');
                window.store = purchase;
                return;
            }
            store.verbosity = store.DEBUG;//WARNING;//INFO;//WARNING;
            purchase.online = true;
            purchase.cache = true;
            if (cordova.platformId === 'windows') {
                //Windows: call this before store.refresh
                //store.sandbox = true; //Don't call this in release, only in debug-configuration
                store.verbosity = store.WARNING;
            }
            if (cordova.platformId === 'browser') {
                //store.sandbox = true; //Don't call this in release, only in debug-configuration
                purchase.online = true;
                store.verbosity = store.WARNING;

                if (purchase.online) {
                    store.register([
                        {
                            id: "inappid1",
                            alias: "werbefrei",
                            type: store.NON_CONSUMABLE    // Windows: Durable
                        },
                        {
                            id: "inappabo1",
                            alias: "sync1year",
                            type: store.PAID_SUBSCRIPTION // Windows: Subscription
                        }
                    ]);
                }
            }
            if (cordova.platformId === 'ios' || cordova.platformId === 'android' || cordova.platformId === 'windows') {
                console.info('Store testing');
                store.register([
                    {
                        id: "inappid1",
                        alias: "werbefrei",
                        type: store.NON_CONSUMABLE    // Windows: Durable
                    },
                    {
                        id: "inappabo1",
                        alias: "sync1year",
                        type: store.PAID_SUBSCRIPTION // Windows: Subscription
                    }]);
            } 
            if (cordova.platformId === 'android' && store.sandbox) {
                // android test
                store.register({
                    id: "android.test.purchased",
                    alias: "test_purchase",
                    type: store.NON_CONSUMABLE
                });
                store.register({
                    id: "android.test.canceled",
                    alias: "test_canceled",
                    type: store.PAID_SUBSCRIPTION
                });
            }
            store.when("inappid1").owned(function (iap) {
                console.info("owned: ", iap);
                //purchase.product[iap.id] = iap;//.state;

                if (iap.owned && iap.transaction && !iap.license) {
                    iap.license = iap.transaction;
                    iap.license.productId = iap.id;
                    iap.license.expirationDate = 9999999999997;
                    iap.license.isActive = true;
                }
                app.pouch.updateLogin();
                app.purchase.inappid1 = true;
                if (app.admobile) {
                    app.admobile.disable(app.purchase.inappid1);
                }
            });
            store.when("inappabo1").owned(function (iap) {
                console.info("owned: ", iap);
                //purchase.product[iap.id] = iap;//.state;
                if (iap.owned && iap.transaction && !iap.license) {
                    iap.license = iap.transaction;
                    iap.license.productId = iap.id;
                    iap.license.expirationDate = 9999999999998;
                    iap.license.isActive = iap.owned;
                    iap.license.IsConsumable = iap.type === store.CONSUMABLE;
                }
                app.pouch.updateLogin();
                app.purchase.inappabo1 = iap.license.expirationDate > Date.now();
                app.pouch.setRemoteState();
            });
            store.when("product").loaded(function (iap) {
                console.info("loaded: ", iap);
            });
            store.when("product").updated(function (iap) {
                console.info("updated: ", iap);
                //purchase.product[iap.id] = iap;//.state;
                purchase.setPageState(iap);
                app.pouch.updateLogin;
            });
            store.when("product").error(function (iap) {
                console.info("error: ", iap);
            });
            store.when("product").approved(function (iap) {
                console.info("approved: ", iap);
                //purchase.product[iap.id] = iap;//.state;
                iap.verify();
            });
            store.when("product").verified(function (iap) {
                console.info("verified: ", iap);
                iap.finish();
            });
            store.when("product").owned(function (iap) {
                console.info("owned: ", iap);
            });
            store.when("product").cancelled(function (iap) {
                console.info("cancelled: ", iap);
            });
            store.when("product").refunded(function (iap) {
                console.info("refunded: ", iap);
            });
            // When every goes as expected
            store.ready(function () {
                purchase.ready = true;
                /*
                require(['./admobile'], function (admobile) {
                    app.admobile = admobile;
                    admobile.init();
                });
                */
                var info = '';
                for (var i = 0; i < store.products.length; ++i) {
                    info += store.products[i].id+" ";
                }

                console.info("STORE READY, ", info);
                // aktuelle Infos in Datenbank schreiben
                app.pouch.dbLoad();
            });

            // Errors communicating with the iTunes server happen quite often,
            // so it's highly recommended you implement some feedback to the user.
            store.error(function (e) {
                if (!purchase.error) {
                    purchase.error = true;
                    console.error("store ERROR " + e.code + ": " + e.message);
                    /*app.ui.message('Subscription Purchase Error', 'error',
                        'We could not reach the Apple iTunes ordering server. ' +
                        'Please ensure you are connected to the Internet and try ' +
                        'again.'
                    );*/
                    // auch bei Fehler Datenbank laden
                    app.pouch.dbLoad();
                }
            });
            store.validator = function (product, callback) {
                console.info("validator: ", product);
                callback(true, "data");
            };
            // After we've done our setup, we tell the store to do
            // it's first refresh. Nothing will happen if we do not call store.refresh()
            if (purchase.online) {
                store.refresh();
            } else {
                app.pouch.dbLoad();
            }
        },
        new: function (id) {
            store.order(id);
        },
        // wenn store nicht initialisiert wird, dann hier Bestellungen direkt verarbeiten
        // offen: integration webapp, evtl. paypal
        order: function (id) {
            console.error('Store steht leider nicht zur Verfügung');
        },
        register: function (data, cache) {
            store.products.reset();
            store.register(data, cache);
            store.refresh();
            purchase.setStates();
        },
        setPageState: function (iap) {
            if (purchase.visible && iap) {
                switch (iap.state) {
                    case 'registered':
                    case 'valid':
                        purchase.button[iap.id].innerHTML = iap.title + ' ' + app.lang.for + ' ' + iap.price + ' ' + app.lang.storePurchase;
                        purchase.button[iap.id].disabled = false;
                        break;
                    case 'owned':
                        purchase.button[iap.id].innerHTML = iap.title + ' ' + app.lang.owned;
                        purchase.button[iap.id].disabled = true;
                        break;
                    case 'invalid':
                        purchase.button[iap.id].innerHTML = app.lang.storeInvalid;
                        purchase.button[iap.id].disabled = true;
                        break;
                    case 'requested':
                        purchase.button[iap.id].innerHTML = app.lang.storeRequested;
                        purchase.button[iap.id].disabled = true;
                        break;
                    case 'initiated':
                        purchase.button[iap.id].innerHTML = app.lang.storeInitiated;
                        purchase.button[iap.id].disabled = true;
                        break;
                    default:
                        purchase.button[iap.id].innerHTML = app.lang._get(iap.state);
                        purchase.button[iap.id].disabled = true;
                        break;
                }
            }
        },
        setOnclick: function () {
            purchase.button["inappid1"] = document.getElementById("inappid1");
            purchase.button["inappid1"].addEventListener("click", function () { purchase.new("inappid1"); });
            purchase.button["inappid1"].disabled = true;
            purchase.button["inappabo1"] = document.getElementById("inappabo1");
            purchase.button["inappabo1"].addEventListener("click", function () { purchase.new("inappabo1"); });
            purchase.button["inappabo1"].disabled = true;
            if (store.sandbox ) {
                purchase.button["android.test.purchased"] = document.getElementById("android.test.purchased");
                purchase.button["android.test.purchased"].addEventListener("click", function () { purchase.new("android.test.purchased"); });
                purchase.button["android.test.purchased"].disabled = true;
                purchase.button["android.test.canceled"] = document.getElementById("android.test.canceled");
                purchase.button["android.test.canceled"].addEventListener("click", function () { purchase.new("android.test.canceled"); });
                purchase.button["android.test.canceled"].disabled = true;
            } else {
                document.getElementById("android.test.purchased-h3").style.display = 'none';
                document.getElementById("android.test.canceled-h3").style.display = 'none';
            }
            purchase.visible = true;
            purchase.setStates();
        },
        setStates: function () {
            if (purchase.ready) {
                for (var i = 0; i < store.products.length; ++i) {
                    purchase.setPageState(store.products[i]);
                }
            }
        }
    };
    return purchase;
});