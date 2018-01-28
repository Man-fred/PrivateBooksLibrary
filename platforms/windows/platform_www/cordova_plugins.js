cordova.define('cordova/plugin_list', function(require, exports, module) {
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
        "id": "cordova-plugin-sqlite-2.sqlitePlugin",
        "file": "plugins/cordova-plugin-sqlite-2/dist/sqlite-plugin.js",
        "pluginId": "cordova-plugin-sqlite-2",
        "clobbers": [
            "sqlitePlugin"
        ]
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
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "phonegap-plugin-barcodescanner": "7.0.0",
    "cordova-plugin-sqlite-2": "1.0.4",
    "cordova-plugin-appcenter-shared": "0.1.3",
    "cordova-plugin-appcenter-analytics": "0.1.3",
    "cordova-plugin-appcenter-crashes": "0.1.3"
};
// BOTTOM OF METADATA
});