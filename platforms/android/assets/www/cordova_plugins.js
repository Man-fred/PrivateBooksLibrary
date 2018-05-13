cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-statusbar.statusbar",
        "file": "plugins/cordova-plugin-statusbar/www/statusbar.js",
        "pluginId": "cordova-plugin-statusbar",
        "clobbers": [
            "window.StatusBar"
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
        "id": "cordova-sqlite-evcore-extbuild-free.SQLitePlugin",
        "file": "plugins/cordova-sqlite-evcore-extbuild-free/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-evcore-extbuild-free",
        "clobbers": [
            "SQLitePlugin"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "cordova-plugin-statusbar": "2.4.1",
    "cordova-plugin-vibration": "3.0.1",
    "cordova-plugin-taptic-engine": "2.1.0",
    "cordova-sqlite-evcore-extbuild-free": "0.9.7"
};
// BOTTOM OF METADATA
});