/*
    https://github.com/j3k0/cordova-plugin-purchase
*/
define(function (require) {

    var purchase = {
        werbefrei: false,
        sync1year: false,
        // We must wait for the "deviceready" event to fire
        // before we can use the store object.

        init: function () {
            if (!window.store) {
                console.log('Store not available');
                window.store = purchase;
                return;
            }

            // Let's set a pretty high verbosity level, so that we see a lot of stuff
            // in the console (reassuring us that something is happening).
            store.verbosity = store.WARNING;

            // Log all errors
            store.error(function (error) {
                console.error('ERROR ' + error.code + ': ' + error.message);
            });
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
            if (cordova.platformId === 'android') {
                store.register({
                    id: "android.test.purchased",
                    alias: "fake_purchase",
                    type: store.PAID_SUBSCRIPTION
                });
                store.when("fake_purchase").approved(function (order) {
                    console.log('You just unlocked fake_purchase!');
                    order.finish();
                    purchase.werbefrei = true;
                });
                // The play button can only be accessed when the user
                // owns the full version.
                store.when("fake_purchase").updated(function (product) {
                    console.info("updated-fake_purchase " + product.owned);
                    purchase.werbefrei = true;
                });
                store.when("fake_purchase").owned(function (product) {
                    console.info("owned-fake_purchase " + product.owned);
                    purchase.werbefrei = true;
                }); 
                store.register({
                    id: "android.test.canceled",
                    alias: "fake_canceled",
                    type: store.PAID_SUBSCRIPTION
                });
            }
            // When purchase of the full version is approved,
            // show some logs and finish the transaction.
            store.when("werbefrei").approved(function (order) {
                console.log('You just unlocked WERBEFREI!');
                order.finish();
                purchase.werbefrei = true;
            });
            // The play button can only be accessed when the user
            // owns the full version.
            store.when("werbefrei").updated(function (product) {
                console.info("access-werbefrei " + product.owned);
                purchase.werbefrei = true;
            }); 
            store.when("werbefrei").owned(function (product) {
                console.info("owned-werbefrei " + product.owned);
                purchase.werbefrei = true;
            }); 
            // When purchase of the full version is approved,
            // show some logs and finish the transaction.
            store.when("sync1year").approved(function (order) {
                console.info("access-sync1year " + product.owned);
                order.finish();
                purchase.sync1year = true;
            });
            // The play button can only be accessed when the user
            // owns the full version.
            store.when("sync1year").updated(function (product) {
                console.info("access-sync1year " + product.owned);
                purchase.sync1year = true;
            });
            store.when("sync1year").owned(function (product) {
                console.info("owned-sync1year " + product.owned);
                purchase.sync1year = true;
            }); 
            // When every goes as expected, it's time to celebrate!
            // The "ready" event should be welcomed with music and fireworks,
            // go ask your boss about it! (just in case)
            store.ready(function () {
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
            purchase.inappid1 = store.get("werbefrei");
            console.log('werbefrei status? ' + purchase.inappid1.state);
            console.log('werbefrei aktiv? ' + purchase.inappid1.owned);
            purchase.inappabo1 = store.get("sync1year");
            console.log('sync1year status? ' + purchase.inappabo1.state);
            console.log('sync1year aktiv? ' + purchase.inappabo1.owned);
        },
        new: function (id) {
            store.order(id);
        },
        // wenn store nicht initialisiert wird, dann hier Bestellungen direkt verarbeiten
        order: function (id) {
            alert('Einkäufe sind erst später möglich');
        },
        setOnclick: function () {
            //document.getElementById("inappid1").addEventListener("click", function () { purchase.new("inappid1"); });
            //document.getElementById("inappabo1").addEventListener("click", function () { purchase.new("inappabo1"); });
            document.getElementById("android.test.purchased").addEventListener("click", function () { purchase.new("android.test.purchased"); });
            document.getElementById("android.test.canceled").addEventListener("click", function () { purchase.new("android.test.canceled"); });
        }
    };
    return purchase;
});