package com.microsoft.azure.mobile.cordova;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaInterface;
import org.apache.cordova.CordovaPlugin;
import org.apache.cordova.CordovaWebView;

import org.json.JSONArray;
import org.json.JSONException;

import com.microsoft.appcenter.AppCenter;
import com.microsoft.appcenter.push.Push;

public class AppCenterPushPlugin extends CordovaPlugin {
    private static final String SENDER_ID = "FIREBASE_SENDER_ID";
    private CordovaPushListener listener;

    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);

        AppCenterShared.configureAppCenter(
                cordova.getActivity().getApplication(),
                webView.getPreferences());

        // For some reason Cordova reads SENDER_ID preference as double. 
        // Because of this Pushes does not work properly, 
        // as workaround SENDER_ID value should be wrapped by single quotes.
        String senderId = webView.getPreferences().getString(SENDER_ID, null).replace("'", "");
        Push.setSenderId(senderId);

        listener = new CordovaPushListener();
        Push.setListener(listener);
        
        AppCenter.start(Push.class);
    }

    @Override
    public boolean execute(String action, JSONArray args,
                           final CallbackContext callbackContext) throws JSONException {

        if (action.equals("isEnabled")) {
            AppCenterUtils.sendBooleanPluginResultFromFuture(Push.isEnabled(), callbackContext);
            return true;
        } else if (action.equals("setEnabled")) {
            Boolean enabled = args.getBoolean(0);
            AppCenterUtils.sendVoidPluginResultFromFuture(Push.setEnabled(enabled), callbackContext);
            return true;
        } else if (action.equals("sendAndClearInitialNotification")) {
            listener.sendAndClearInitialNotification();
            return true;
        } else if (action.equals("registerEventsCallback")) {
            listener.setEventsCallbackContext(callbackContext);
            return true;
        }

        return false;
    }
}
