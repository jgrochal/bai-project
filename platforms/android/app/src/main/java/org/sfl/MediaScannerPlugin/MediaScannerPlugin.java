package org.sfl.MediaScannerPlugin;

import org.apache.cordova.CallbackContext;
import org.apache.cordova.CordovaPlugin;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Intent;
import android.net.Uri;
import android.util.Log;

/**
 * MediaScannerPlugin.java
 *
 * Inspirated by Joseph's "Saving Image to Android device’s Gallery – Phonegap Android" plugin
 * https://jbkflex.wordpress.com/2012/12/23/saving-image-to-android-devices-gallery-phonegap-android/
 *
 * @author Peter Gao <peter@spacefluxlabs.com>
 */
public class MediaScannerPlugin extends CordovaPlugin {
    public static final String ACTION = "scanFile";
    private static final String TAG = "MediaScannerPlugin";

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {

        if (action.equals(ACTION)) {
            /* Invoke the system's media scanner to add your photo to the Media Provider's database,
            * making it available in the Android Gallery application and to other apps. */
            cordova.getActivity().sendBroadcast(new Intent(Intent.ACTION_MEDIA_MOUNTED, Uri.parse("file:///mnt/sdcard"))); 

            callbackContext.success();

            return true;
        } else {
            Log.w(TAG, "Wrong action was provided: "+action);
            return false;
        }
    }
}
