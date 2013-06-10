/**
 * @author Terry
 */
define(["libs/class"], function(Class) {
    var subClassArray = [];
    var subInstanceArray = [];
    var SectionBase = Class.extend({
        refresh : function(isEnd) {

        },
        resize : function(isEnd) {

        }
    });

    SectionBase.refresh = function(isEnd) {
        for (var i = 0, il = subInstanceArray.length; i < il; i++) {
            subInstanceArray[i].refresh(isEnd);
        }
    }

    SectionBase.resize = function(isEnd) {
        console.log(isEnd);
        for (var i = 0, il = subInstanceArray.length; i < il; i++) {
            subInstanceArray[i].resize(isEnd);
        }
    }

    SectionBase._extend = SectionBase.extend;

    SectionBase.extend = function(pros) {
        var subClass = SectionBase._extend(pros);
        subClassArray.push(subClass);
        return subClass;
    }

    SectionBase.init = function(pros) {
        for (var i = 0, il = subClassArray.length; i < il; i++) {
            var subInstance = new subClassArray[i]();
            subClassArray[i].inst = subInstance;
            subInstanceArray.push(subInstance);
        }
    }

    return SectionBase;
});
