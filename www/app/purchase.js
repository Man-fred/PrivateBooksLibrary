/*
    https://github.com/j3k0/cordova-plugin-purchase
*/
define(function (require) {

    var purchase = {
        ready: false,
        visible: false,
        product: [],
        button: [],

        // We must wait for the "deviceready" event to fire
        // before we can use the store object.

        init: function () {
            purchase.product["inappid1"] = {};
            purchase.product["inappid1"].owned = true;
            if (!window.store) {
                console.log('Store not available');
                window.store = purchase;
                return;
            }

            // Let's set a pretty high verbosity level, so that we see a lot of stuff
            // in the console (reassuring us that something is happening).
            store.verbosity = store.DEBUG;//WARNING;//INFO;//WARNING;

            //Windows: call this before store.refresh
            //store.sandbox = true; //Don't call this in production

            // We register a dummy product. It's ok, it shouldn't
            // prevent the store "ready" event from firing.
            store.register({
                id: "inappid1",
                alias: "werbefrei",
                type: store.NON_CONSUMABLE
            });
            store.register({
                id: "inappabo1",
                alias: "sync1year",
                type: store.PAID_SUBSCRIPTION
            });
            // android test
            if (store.sandbox) {
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
            store.when("product").approved(function (iap) {
                purchase.product[iap.id] = iap;//.state;
                iap.finish();
            });
                // The play button can only be accessed when the user
                // owns the full version.
            store.when("product").updated(function (iap) {
                //console.info("updated: ", iap);
                purchase.product[iap.id] = iap;//.state;
                purchase.setPageState(iap);
            });
            store.when("inappid1").owned(function (iap) {
                console.info("owned: ", iap);
                purchase.product[iap.id] = iap;//.state;
                //app.admobile.disable();
            }); 
            // When every goes as expected, it's time to celebrate!
            // The "ready" event should be welcomed with music and fireworks,
            // go ask your boss about it! (just in case)
            store.ready(function () {
                purchase.ready = true;
                require(['./admobile'], function (admobile) {
                    app.admobile = admobile;
                    admobile.init();
                });

                console.log("\\o/ STORE READY \\o/");
            });

            // Errors communicating with the iTunes server happen quite often,
            // so it's highly recommended you implement some feedback to the user.
            store.error(function (e) {
                console.error("storekit ERROR " + e.code + ": " + e.message);
                app.ui.message('Subscription Purchase Error','error',
                    'We could not reach the Apple iTunes ordering server. ' +
                    'Please ensure you are connected to the Internet and try ' +
                    'again.'
                );
            });

            // After we've done our setup, we tell the store to do
            // it's first refresh. Nothing will happen if we do not call store.refresh()
            store.refresh();
        },
        new: function (id) {
            store.order(id);
        },
        // wenn store nicht initialisiert wird, dann hier Bestellungen direkt verarbeiten
        order: function (id) {
            alert('Einkäufe über die WebApp sind erst später möglich');
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
            if (store.sandbox) {
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
            if (purchase.ready) {
                purchase.setPageState(purchase.product["inappid1"]);
                purchase.setPageState(purchase.product["inappabo1"]);
                if (store.sandbox) {
                    purchase.setPageState(purchase.product["android.test.purchased"]);
                    purchase.setPageState(purchase.product["android.test.canceled"]);
                }
            }
        }
    };
    return purchase;
});