    let Job;
    (function () {
        "use strict";

        Job = class Job {
            constructor() {

            }
        }


    })();

//Variable
var wood = 0

//Click Function
$("#click").on("mousedown", function(){
    wood = wood + 1;
    $("#click").html("Click " + wood);
});