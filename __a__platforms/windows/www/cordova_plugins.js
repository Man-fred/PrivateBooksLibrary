﻿cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-network-information.network",
      "file": "plugins/cordova-plugin-network-information/www/network.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "file": "plugins/cordova-plugin-network-information/www/Connection.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.NetworkInfoProxy",
      "file": "plugins/cordova-plugin-network-information/src/windows/NetworkInfoProxy.js",
      "pluginId": "cordova-plugin-network-information",
      "runs": true
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-network-information": "3.0.0"
  };
});