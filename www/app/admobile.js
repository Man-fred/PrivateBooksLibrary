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
                        //footer: "ca-app-pub-7342512438314786/3600783250",    // Required
                    // Interstitial: ca-app-pub-7342512438314786/3180613879
                    admob.initAdmob("ca-app-pub-3940256099942544/6300978111", "ca-app-pub-3940256099942544/1033173712");//admob id format ca-app-pub-xxxxxxxxxxxxxxxxxxx/xxxxxxxxxx
                    admobile.admobParam = new admob.Params();
                    admobParam.isTesting = true;
                    admob.showBanner(admob.BannerSize.BANNER, admob.Position.BOTTOM_CENTER, admobParam);
                }
            }
        }
    };
    return admobile;
});