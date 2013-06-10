/**
 * @author Terry
 */

if (!window.console) {
    window.console = {};
    window.console.log = function() {
    }
}

require.config({
    baseUrl : "../",
    paths : {
        "jquery" : "libs/require-jquery.min",
        "jquery.easing" : "libs/jquery.easing.1.3",
        "modernizr" : "libs/modernizr-2.5.3.min",
        "browser.animation" : "libs/browser.animation",
        "class" : "libs/class",
        "videojs" : "libs/video",
        "move" : "libs/move",
        "jquery.address" : "libs/jquery.address-1.5.min",
        "TweenMax" : "libs/TweenMax.min",
        "nanoscroller" : "libs/jquery.nanoscroller.min",
        "pixastic" : "libs/pixastic/pixastic.custom",
        "blend" : "libs/pixastic/blend",
        "hammer" : "libs/jquery.hammer.min"
    },
    shim : {
        "jquery.address" : ['jquery'],
        "jquery.easing" : ['jquery'],
        "nanoscroller" : ['jquery'],
        "blend" : ["pixastic"],
        "hammer" : ['jquery']
    },
    waitSeconds : 0
});
require(["jquery", "tools/slider"], function($, ToolSwitch) {
    $(function() {
        var toolSwitch = new ToolSwitch($("#switch-holder"), {
            onceShow : 1,
            animationLoop : true
        });
        $("body").on("click", ".btn", function() {
            $this = $(this);
            if ($this.attr("id") == "prev-btn") {
                toolSwitch.prev();
            } else {
                toolSwitch.next();
            }
        });
        $("#switch-btns li").each(function(i) {
            $(this).data("index", i).on("click", function() {
                toolSwitch.seekTo($(this).data("index"));
            });
        });
    });
});

