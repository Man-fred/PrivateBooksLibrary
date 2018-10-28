define(function (require) {

    var purchase = {
        // We must wait for the "deviceready" event to fire
        // before we can use the store object.

        init: function () {
            if (!window.store) {
                console.log('Store not available');
                return;
            }

            // Let's set a pretty high verbosity level, so that we see a lot of stuff
            // in the console (reassuring us that something is happening).
            store.verbosity = store.DEBUG;//INFO;

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

            // When purchase of the full version is approved,
            // show some logs and finish the transaction.
            store.when("werbefrei").approved(function (order) {
                console.log('You just unlocked the FULL VERSION!');
                order.finish();
            });
            // The play button can only be accessed when the user
            // owns the full version.
            store.when("werbefrei").updated(function (product) {
                console.info("access-full-version-button " + product.owned);
            });
            // When every goes as expected, it's time to celebrate!
            // The "ready" event should be welcomed with music and fireworks,
            // go ask your boss about it! (just in case)
            store.ready(function () {
                console.log("\\o/ STORE READY \\o/");
            });

                // After we've done our setup, we tell the store to do
                // it's first refresh. Nothing will happen if we do not call store.refresh()
            store.refresh();
        }
    };
    return purchase;
});