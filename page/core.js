/**
 * @author Terry
 */
define(['jquery', 'page/common', 'sections/base', 'tools/slider'], function($, pc, Base, Slider) {
    $(function() {
        Base.init();
        pc.resize(Base.resize);
        pc.init({
            // mousewheel : true,
            spring : 0.5
        });
        pc.scroll(function(top) {
            // console.log(top);
        });
        var date = Date.now();
        var slider = new Slider($("#img-slider"), {
            onceShow : 1,
            autoResize : false,
            itemWidth : 500,
            itemMargin : 20,
            animationLoop : true,
            ended : function(currentIndex, prevIndex) {
                if (currentIndex == prevIndex) {
                    return;
                }
                slider.getLiByIndex(currentIndex).css({
                    opacity : 1
                });
                slider.getLiByIndex(prevIndex).css({
                    opacity : .4
                });
                $(".switch-btn").fadeIn();
            },
            start : function(currentIndex, prevIndex) {
                console.log("start " + currentIndex, prevIndex);
                $("#control li").eq(currentIndex).trigger("click");
                if (currentIndex > prevIndex) {
                    slider.getLiByIndex(currentIndex).css({
                        transformOrigin : "left center"
                    });
                    slider.getLiByIndex(prevIndex).css({
                        transformOrigin : "left center"
                    });
                } else {
                    slider.getLiByIndex(currentIndex).css({
                        transformOrigin : "right center"
                    });
                }
                $(".switch-btn").fadeOut(20);
            },
            update : function(currentIndex, prevIndex, rate) {
                // console.log("update " + currentIndex, prevIndex, rate);
                if (currentIndex == prevIndex) {
                    return;
                }
                slider.getLiByIndex(currentIndex).css({
                    opacity : .4 + rate * 2,
                    // transform : "rotateY(" + (1 - rate) * 20 + "deg)"
                });
                slider.getLiByIndex(prevIndex).css({
                    opacity : 1 - rate * .6,
                    // transform : "rotateY(-" + rate * 20 + "deg)"
                });
                // console.log(rate);
                // var now = Date.now();
                // console.log(now - date);
                // date = now;
            }
        });

        slider.getLiByIndex(0).css("opacity", 1);

        pc.resize({
            scope : slider,
            callback : slider.resize
        });

        $("body").on("keyup", function(e) {
            if (e.originalEvent.keyCode == 37) {
                slider.prev();
            } else if (e.originalEvent.keyCode == 39) {
                slider.next();
            }
        });

        $(".silder-conver").each(function(i) {
            $(this).on("click", function(e) {
                if ($(this).data("index") == 0) {
                    slider.prev();
                } else {
                    slider.next();
                }
            }).data("index", i);
        });

        $("#control li").each(function(i) {
            $(this).on("click", function(e) {
                if (e.originalEvent) {
                    slider.seekTo($(this).data("index"));
                } else {
                    $("#control .selected").removeClass("selected");
                    $(this).addClass("selected");
                }
            }).data("index", i);
        })
    });
});
