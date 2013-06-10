/**
 * @author Terry
 */
define(["jquery", "libs/browser.animation"], function($) {
    var scheme = {};
    scheme.stageW = 0;
    scheme.stageH = 0;
    scheme.win = undefined;
    scheme.scrollHeight = 0;
    scheme.targetTop = 0;
    scheme.currentTop = 0;
    scheme.$body = undefined;
    scheme.isDragScroll = false;
    scheme.hasTouch = ("ontouchstart" in window) || (window.DocumentTouch && document instanceof DocumentTouch) || navigator.msMaxTouchPoints > 0;
    scheme.scaleRate = 1;
    scheme.ie8 = $.browser.msie && $.browser.version == "8.0";
    scheme.ie9 = $.browser.msie && $.browser.version == "9.0";

    scheme.isIpad = navigator.userAgent.match(/iPad/i) != null;
    scheme.isAndroid = navigator.userAgent.match(/Android/i) != null;

    if (scheme.isIpad) {
        scheme.isTablet = true;
    } else if (scheme.isAndroid) {
        if (navigator.userAgent.match(/Mobile/i) != null) {
            scheme.isTablet = false;
        } else {
            scheme.isTablet = true;
        }
    } else {
        scheme.isTablet = false;
    }
    scheme.isMobile = navigator.userAgent.match(/Android|webOS|iPhone|iPod|BlackBerry|IEMobile/i) != null;
    if (scheme.isTablet) {
        scheme.isMobile = false;
    }
    scheme.isFullScreen = false;
    scheme.options = {
        mousewheel : false,
        spring : 0.2
    }

    var timeoutId, resizeUpdateList = [], scrollUpdateList = [];
    scheme.init = function(options) {
        scheme.options = $.extend({}, scheme.options, options);
        scheme.win = $(window).resize(function() {
            var isEnd = false;
            clearInterval(timeoutId);
            timeoutId = setTimeout(function() {
                isEnd = true;
                scheme.refresh(isEnd);
            }, 100);
            scheme.refresh(isEnd);
        });
        scheme.$body = $('body, html');
        scheme.refresh();

        scheme.win.bind('scroll', function() {
            if (scheme.isDragScroll) {
                scheme.targetTop = scheme.win.scrollTop();
            }
        });

        if (scheme.options.mousewheel) {
            initMouseWheel();
            animationLoop();
        }
    }

    scheme.refresh = function(isEnd) {
        scheme.stageW = scheme.win.width();
        scheme.stageH = scheme.win.height();
        scheme.currentTop = scheme.targetTop = scheme.win.scrollTop();
        scheme.scrollHeight = document.documentElement.scrollHeight - scheme.stageH;

        for (var i = 0, il = resizeUpdateList.length; i < il; i++) {
            var update = resizeUpdateList[i];
            if ( typeof update === "function") {
                update.call(this, isEnd);
            } else if ( typeof update.callback === "function") {
                update.callback.call(update.scope ? update.scope : this, isEnd);
            }
        }
    }
    /**
     * Add Resize function to a list
     * @param {Object} update, function or object
     * object:{scope: obj,callback:function }
     */
    scheme.resize = function(update) {
        resizeUpdateList.push(update);
    }
    /**
     * Add scroll function to a list
     * @param {Object} update, function or object
     * object:{scope: obj,callback:function }
     */
    scheme.scroll = function(update) {
        scrollUpdateList.push(update);
    }
    function initMouseWheel() {
        var mousewheel = $.browser.mozilla ? "DOMMouseScroll" : "mousewheel";
        scheme.$body.bind(mousewheel, function(e) {
            if (scheme.isFullScreen)
                return;
            scheme.isDragScroll = false;
            if ($.browser.mozilla) {
                scheme.targetTop += e.originalEvent.detail * 20;
            } else {
                scheme.targetTop -= e.originalEvent.wheelDelta / 3;
            }
            if (scheme.targetTop < 0) {
                scheme.targetTop = 0;
                if (scheme.$body.scrollTop() <= 0) {
                    return;
                }
            } else if (scheme.targetTop > scheme.scrollHeight) {
                scheme.targetTop = scheme.scrollHeight;
            }
            return false;
        });
    }

    function animationLoop() {
        var st = new Date(), et, dt;
        scrollAnimation();

        function scrollAnimation() {
            et = new Date();
            dt = et - st;
            st = et;
            scheme.currentTop += (scheme.targetTop - scheme.currentTop) * scheme.options.spring;
            scheme.currentTop = Math.round(scheme.currentTop * 100) / 100;
            if (dt > 20) {
            console.log(dt);
            }
            if (Math.abs(scheme.currentTop - scheme.targetTop) >= 1) {
                if (scheme.currentTop < 0) {
                    scheme.currentTop = 0;
                }
                if (!scheme.isDragScroll) {
                    if (scheme.currentTop >= 0) {
                        window.scrollTo(0, scheme.currentTop);
                    }
                }
                for (var i = 0, il = scrollUpdateList.length; i < il; i++) {
                    var update = scrollUpdateList[i];
                    if ( typeof update === "function") {
                        update.call(this, scheme.currentTop);
                    } else if ( typeof update.callback === "function") {
                        update.callback.call(update.scope ? update.scope : this, scheme.currentTop);
                    }
                }
            } else {
                scheme.currentTop = scheme.targetTop;
                scheme.isDragScroll = true;
            }
            window.requestAnimationFrame(scrollAnimation);
        }

    }

    return scheme;
});
