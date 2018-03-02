(function () {
    "use strict";

    let erreurCritique =
        "Une erreur critique vient de se produire," + //Spreading mail adress in order to provide bots from getting it.
        "veuillez contacter l'administrateur à cette adresse mail : ";

    let css_blanc = {
        'background-color': 'black',
        'font-size': 'bolder',
        'border': 'solid 1px white',
        'color': 'white',
        'height': '30px',
        'width': '30px',
        'text-align': 'center'
    };
    let css_noir = {
        'background-color': 'yellow',
        'font-size': 'bolder',
        'border': 'solid 1px black',
        'color': 'black',
        'height': '30px',
        'width': '30px',
        'text-align': 'center'
    };
    let css_enhanced = {
        'background-color': 'red',
        'font-size': 'bolder',
        'border': 'solid 1px black',
        'color': 'white',
        'height': '30px',
        'width': '30px',
        'text-align': 'center'
    };


    $(document).ready(function() {

        setTimeout(function(){
            $('body').addClass('loaded');
        }, 6600);


        new Grid(10,10, '#gridTest');
        $('.case-blanche').css(css_blanc).hover(function () {
            $(this).css(css_enhanced);
        }, function () {
            $(this).css(css_blanc);
        });

        $('.case-noire').css(css_noir).hover(function () {
            $(this).css(css_enhanced);
        }, function () {
            $(this).css(css_noir);
        });

    });

    $(() => {
        $.ajax({
            url: '../json/isLogged.php'
        }).done(function (data) {
            if (data.result) { // User connected
                $('#logout-form').show();
                $('#bt-menu').show();
                $('#job').show();

            } else { // User not connected
                $('#login-form').show();
                $('#loader-wrapper').remove(); // Delete loading animation
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