cordova.define("org.sfl.MediaScannerPlugin.MediaScannerPlugin", function(require, exports, module) {
//
//  MediaScannerPlugin.js
//  MediaScannerPlugin PhoneGap/Cordova plugin
//
//  Created by Peter Gao on 23/09/2013.
//  Copyright (c) 2012 Peter Gao. All rights reserved.
//  MIT Licensed
//

module.exports = {

    scanFile:function(successCallback, failureCallback) {
        // successCallback required
        if (typeof successCallback !== "function") {
            console.log("MediaScannerPlugin Error: successCallback is not a function");
        }
        else if (typeof failureCallback !== "function") {
            console.log("MediaScannerPlugin Error: failureCallback is not a function");
        }
        else {
            return cordova.exec(successCallback, failureCallback, "MediaScannerPlugin", "scanFile", []);
        }
    }
};

});
