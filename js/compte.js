(function () {
    "use strict";

    let criticalError =
        "Une erreur critique vient de se produire," + //Spreading mail adress in order to provide bots from getting it.
        "veuillez contacter l'administrateur à cette adresse mail : chalas." + ((true) ? 'paule' : "") + "tto@gm" +"a"+"il"+".co"+"m";

    $(() => {
        $('#accountCreationForm').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function (data) {
                    console.log(data.result);
                    console.log(data.message);
                    if(data.result) {
                        $('#accountCreationForm').hide();
                        $('body').html("Things went right !");
                    } else {
                        $('body').html("Things went wrong !");
                    }
                })
                .fail(function () {
                    $("body").html(criticalError);
                });
            return false;
        });
    });

}) ();