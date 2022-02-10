/* global app, admob */

﻿/*
    ( https://github.com/appfeel/phonegap-admob )
    https://github.com/admob-google/admob-phonegap
*/
define(function (require) {

    var admobile = {
        use: false,
        active: false,
        initialized: false,
        // We must wait for the "deviceready" event to fire
        // before we can use the store object.
        script: function (src, text, onloadFunction = null, async = null) {
            var newScript = document.createElement("script");
            newScript.type = "text/javascript";
            newScript.onerror = function (oError) {
                console.error("The script " + oError.target.src + " didn't load correctly.");
            };
            if (onloadFunction) {
                newScript.onload = onloadFunction;
            }
            if (async) {
                newScript.async = true;
            }
            if (text) {
                var t = document.createTextNode(text);
                newScript.appendChild(t);
            }
            if (src) {
                newScript.src = src;
            }
            document.head.appendChild(newScript);
        },
        init: function () {
            admobile.use = cordova.platformId !== 'ios';
            if (admobile.use && app.purchase.product["inappid1"]) {
                if (!app.purchase.product["inappid1"].owned && !admobile.active) {
                    if (!admobile.initialized) {
                        if (cordova.platformId === 'browser') {
                            // web-session -> AdSense
                            console.info('Google AdSense ist aktiv');
                            admobile.script('//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', null, null, true);
                            admobile.script(null, '(adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-7342512438314786", enable_page_level_ads: true });');
                        } else {
                            // app -> AdMob
                            console.info('Google AdMob ist aktiv');
                            admob.initAdmob("ca-app-pub-7342512438314786/3600783250", "ca-app-pub-7342512438314786/3180613879");//admob id format ca-app-pub-xxxxxxxxxxxxxxxxxxx/xxxxxxxxxx
                            //Test-IDs
                            //admob.initAdmob("ca-app-pub-3940256099942544/6300978111", "ca-app-pub-3940256099942544/1033173712");//admob id format ca-app-pub-xxxxxxxxxxxxxxxxxxx/xxxxxxxxxx
                            admobile.admobParam = new admob.Params();
                            admobile.admobParam.isForChild = true;
                            //admobParam.isTesting = true;
                        }
                        admobile.initialized = true;
                    }
                    if (cordova.platformId !== 'browser') {
                        admob.showBanner(admob.BannerSize.BANNER, admob.Position.BOTTOM_CENTER, admobile.admobParam);
                    }
                    admobile.active = true;
                } else if (app.purchase.product["inappid1"].owned && admobile.active) {
                    console.info('Google AdSense/AdMob ist inaktiv');
                    if (cordova.platformId === 'browser') {
                        //?? admobile.script(null, '(adsbygoogle = []);');
                    } else {
                        admob.hideBanner();
                    }
                    admobile.active = false;
                }
            }
        },
        disable: function () {
            console.info('Google AdSense/AdMob ist inaktiv');
            if (cordova.platformId === 'browser') {
                admobile.script(null, '(adsbygoogle = []);');
            } else {
                admob.hideBanner();
            }
            admobile.active = false;
        }
    };
    return admobile;
});