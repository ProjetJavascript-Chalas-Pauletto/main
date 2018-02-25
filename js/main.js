(function () {
    "use strict";

    let erreurCritique =
        "Une erreur critique vient de se produire," + //Spreading mail adress in order to provide bots from getting it.
        "veuillez contacter l'administrateur à cette adresse mail : ";

    $(() => {
        $.ajax({
            url: '../json/isLogged.php'
        }).done(function (data) {
            if (data.result) {
                $('#logout-form').show();
            } else {
                $('#login-form').show();
            }
        }).fail(function () {
            $("body").html(erreurCritique);
        });

        $('#login-form').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function (data) {
                    if (data.result) {
                        window.location.reload();
                    } else {
                        $("#logMsg").html("Wrong password or email !")
                    }
                })
                .fail(function () {
                    $("body").html(erreurCritique);
                });
            return false;
        });
        $('#logout-form').submit(function () {
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize(),
            })
                .done(function () {
                    window.location.reload();
                })
                .fail(function () {
                    $("body").html(erreurCritique);
                });
            return false;
        });

    })
})();