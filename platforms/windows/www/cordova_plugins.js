﻿cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "phonegap-plugin-barcodescanner.BarcodeScanner",
        "file": "plugins/phonegap-plugin-barcodescanner/www/barcodescanner.js",
        "pluginId": "phonegap-plugin-barcodescanner",
        "clobbers": [
            "cordova.plugins.barcodeScanner"
        ]
    },
    {
        "id": "phonegap-plugin-barcodescanner.BarcodeScannerProxy",
        "file": "plugins/phonegap-plugin-barcodescanner/src/windows/BarcodeScannerProxy.js",
        "pluginId": "phonegap-plugin-barcodescanner",
        "merges": [
            ""
        ]
    },
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
        ]
    },
    {
        "id": "cordova-plugin-statusbar.StatusBarProxy",
        "file": "plugins/cordova-plugin-statusbar/src/windows/StatusBarProxy.js",
        "pluginId": "cordova-plugin-statusbar",
        "runs": true
    },
    {
        "id": "cordova-plugin-appcenter-analytics.Analytics",
        "file": "plugins/cordova-plugin-appcenter-analytics/www/Analytics.js",
        "pluginId": "cordova-plugin-appcenter-analytics",
        "clobbers": [
            "AppCenter.Analytics"
        ]
    },
    {
        "id": "cordova-plugin-appcenter-crashes.Crashes",
        "file": "plugins/cordova-plugin-appcenter-crashes/www/Crashes.js",
        "pluginId": "cordova-plugin-appcenter-crashes",
        "clobbers": [
            "AppCenter.Crashes"
        ]
    },
    {
        "id": "cordova-plugin-appcenter-push.Push",
        "file": "plugins/cordova-plugin-appcenter-push/www/Push.js",
        "pluginId": "cordova-plugin-appcenter-push",
        "clobbers": [
            "AppCenter.Push"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "phonegap-plugin-barcodescanner": "7.0.0",
    "cordova-plugin-statusbar": "2.4.1",
    "cordova-plugin-appcenter-shared": "0.1.3",
    "cordova-plugin-appcenter-analytics": "0.1.3",
    "cordova-plugin-appcenter-crashes": "0.1.3",
    "cordova-plugin-appcenter-push": "0.1.3"
};
// BOTTOM OF METADATA
});