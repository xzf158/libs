/**
 * @author Terry
 */

if (!window.console) {
    window.console = {};
    window.console.log = function() {
    }
}

require.config({
    baseUrl : "./scripts",
    paths : {
        "jquery" : "libs/require-jquery.min",
        "jquery.easing" : "libs/jquery.easing.1.3",
        "modernizr" : "libs/modernizr-2.5.3.min",
        "browser.animation" : "libs/browser.animation",
        // "class" : "libs/class",
        "videojs" : "libs/video"
    },
    shim : {
        "jquery.address" : ['jquery'],
        "jquery.easing" : ['jquery']
    }
});

require(['page/core'], function() {
}); 

