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
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "phonegap-plugin-barcodescanner": "7.0.0",
    "cordova-plugin-statusbar": "2.4.1"
};
// BOTTOM OF METADATA
});