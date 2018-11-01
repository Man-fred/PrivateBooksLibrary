/*
    ( https://github.com/appfeel/phonegap-admob )
    https://github.com/admob-google/admob-phonegap
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
                    var s = document.getElementsByTagName('script')[0];
                    var neuesScript = document.createElement("script");
                    neuesScript.type = "text/javascript";
                    neuesScript.src = "//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js";
                    neuesScript.async = true;
                    s.parentNode.appendChild(neuesScript, s);
                    var neuesScript2 = document.createElement("script");
                    neuesScript2.type = "text/javascript";
                    neuesScript2.src = '(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-7342512438314786", enable_page_level_ads: true });';
                    s.parentNode.appendChild(neuesScript2, s);
                } else {
                    // app -> AdMob
                    console.info('Google AdMob ist aktiv');
                        //footer: "ca-app-pub-7342512438314786/3600783250",    // Required
                    // Interstitial: ca-app-pub-7342512438314786/3180613879
                    //Test-IDs
                    admob.initAdmob("ca-app-pub-3940256099942544/6300978111", "ca-app-pub-3940256099942544/1033173712");//admob id format ca-app-pub-xxxxxxxxxxxxxxxxxxx/xxxxxxxxxx
                    admobile.admobParam = new admob.Params();
                    //admobParam.isTesting = true;
                    admob.showBanner(admob.BannerSize.BANNER, admob.Position.BOTTOM_CENTER, admobParam);
                }
            }
        }
    };
    return admobile;
});