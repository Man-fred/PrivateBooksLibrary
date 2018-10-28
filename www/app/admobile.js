/*
    https://github.com/appfeel/phonegap-admob
*/
define(function (require) {

    var admobile = {
        // We must wait for the "deviceready" event to fire
        // before we can use the store object.

        init: function () {
            if (!app.purchase.inappid1) {
                if (cordova.platformId === 'browser') {
                    // web-session -> AdSense
                    console.info('Google AdSense ist aktiv');
                } else {
                    // app -> AdMob
                    console.info('Google AdMob ist aktiv');
                    admob.setOptions({
                        //publisherId: "ca-app-pub-7342512438314786/3600783250",    // Required
                        publisherId: "ca-app-pub-3940256099942544/6300978111",    // Required
                        //interstitialAdId: "ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII",  // Optional
                        //tappxIdiOS: "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
                        //tappxIdAndroid: "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
                        //tappxShare: 0.5                                        // Optional
                        isTesting: true
                    });
                    admob.createBannerView({
                        autoShowBanner: false
                    });
                }
            }
        }
    };
    return admobile;
});