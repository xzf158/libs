/**
 * @author Terry
 */
define(["sections/base"], function(Base) {
    var section2 = Base.extend({
        resize:function(){
            console.log("========2");
        }
    });
    return section2;
});