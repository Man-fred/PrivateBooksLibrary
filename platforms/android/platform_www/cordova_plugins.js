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
        "id": "cordova-sqlite-legacy.SQLitePlugin",
        "file": "plugins/cordova-sqlite-legacy/www/SQLitePlugin.js",
        "pluginId": "cordova-sqlite-legacy",
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
    "cordova-sqlite-legacy": "2.0.1"
};
// BOTTOM OF METADATA
});