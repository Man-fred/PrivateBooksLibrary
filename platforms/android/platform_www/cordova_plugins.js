cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
  {
    "id": "cc.fovea.cordova.purchase.InAppBillingPlugin",
    "file": "plugins/cc.fovea.cordova.purchase/www/store-android.js",
    "pluginId": "cc.fovea.cordova.purchase",
    "clobbers": [
      "store"
    ]
  }
];
module.exports.metadata = 
// TOP OF METADATA
{
  "cc.fovea.cordova.purchase": "7.3.0-beta.0"
};
// BOTTOM OF METADATA
});