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
                    if(data.result) {
                        $('#accountCreationForm').hide();
                        $('body').html("Things went right !");
                    } else {
                        $('body').html(data.message);
                    }
                })
                .fail(function () {
                    $("body").html(criticalError);
                });
            return false;
        });
    });

}) ();