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
        "id": "cordova-plugin-taptic-engine.TapticEngine",
        "file": "plugins/cordova-plugin-taptic-engine/www/TapticEngine.js",
        "pluginId": "cordova-plugin-taptic-engine",
        "clobbers": [
            "TapticEngine"
        ]
    },
    {
        "id": "cordova-plugin-camera.Camera",
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "id": "cordova-plugin-camera.camera",
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
        "pluginId": "cordova-plugin-camera",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    },
    {
        "id": "cordova-plugin-camera.CameraProxy",
        "file": "plugins/cordova-plugin-camera/src/windows/CameraProxy.js",
        "pluginId": "cordova-plugin-camera",
        "runs": true
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "phonegap-plugin-barcodescanner": "7.0.0",
    "cordova-plugin-statusbar": "2.4.1",
    "cordova-plugin-vibration": "3.0.1",
    "cordova-plugin-taptic-engine": "2.1.0",
    "cordova-plugin-camera": "4.0.3"
};
// BOTTOM OF METADATA
});