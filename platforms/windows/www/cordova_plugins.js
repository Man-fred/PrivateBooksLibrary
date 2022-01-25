cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-push-notifications.PushNotification",
      "file": "plugins/cordova-plugin-push-notifications/www/PushNotification.js",
      "pluginId": "cordova-plugin-push-notifications",
      "clobbers": [
        "pushNotification"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-push-notifications": "1.0.1"
  };
});