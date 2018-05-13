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
        "id": "cordova-plugin-vibration.VibrationProxy",
        "file": "plugins/cordova-plugin-vibration/src/windows/VibrationProxy.js",
        "pluginId": "cordova-plugin-vibration",
        "runs": true
    },
    {
        "id": "cordova-plugin-vibration.notification",
        "file": "plugins/cordova-plugin-vibration/www/vibration.js",
        "pluginId": "cordova-plugin-vibration",
        "merges": [
            "navigator.notification",
            "navigator"
        ]
    },
    {
        "id": "cordova-sqlite-legacy.SQLitePlugin",
        "file": "plugins/cordova-sqlite-legacy/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-legacy",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "id": "cordova-sqlite-legacy.SQLiteProxy",
        "file": "plugins/cordova-sqlite-legacy/src/windows/sqlite-proxy.js",
        "pluginId": "cordova-sqlite-legacy",
        "merges": [
            ""
        ]
    },
    {
        "id": "cordova-sqlite-legacy.SQLite3",
        "file": "plugins/cordova-sqlite-legacy/src/windows/SQLite3-Win-RT/SQLite3JS/js/SQLite3.js",
        "pluginId": "cordova-sqlite-legacy",
        "merges": [
            ""
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "phonegap-plugin-barcodescanner": "7.0.0",
    "cordova-plugin-statusbar": "2.4.1",
    "cordova-plugin-vibration": "3.0.1",
    "cordova-sqlite-legacy": "2.0.1"
};
// BOTTOM OF METADATA
});