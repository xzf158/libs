/**
 * @author Terry
 */
define(["sections/base"], function(Base) {
    var section1 = Base.extend({
        resize : function() {
            console.log("========");
        }
    });
    return section1;
}); 