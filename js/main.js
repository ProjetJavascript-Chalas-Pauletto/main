(function () {
    "use strict";

    let version = "0.0.0";

    let criticalError =
        "Une erreur critique vient de se produire," + //Spreading mail adress in order to prohibit bots from getting it.
        "veuillez contacter l'administrateur à cette adresse mail : chalas." + ((true) ? 'paule' : "") + "tto@gm" +"a"+"il"+".co"+"m";

    let cssError = {
        'background-color' :'#eeeeee',
        'border' : 'solid 1px red'
    };

    let cssClear = {
        'background-color' : 'white',
        'border-style' : 'inset',
        'border-color' : 'initial',
        'border-image' : 'initial'
    };

    function resetAppearance() {
        $('#username').css(cssClear);
        $('#passwordCheck').css(cssClear);
        $('#password').css(cssClear);
        $('#mail').css(cssClear);
    }

    function displayOnLog(string) {
        $('#log').append($('<div>').addClass('logMessage').html(string));
    }

    displayOnLog("You arrived in town !");
    displayOnLog("You left the town !");
    displayOnLog("You're now heading to the forest (-2,0) !");

    $(() => {
        setTimeout(function(){
            $('body').addClass('loaded');
        }, 100); //6600

        let init = function(){
            console.log("Initialising menu...");
            //let menu = new Menu();
        };


        $.ajax({
            url: '../json/isLogged.php'
        }).done(function (data) {
            if (data.result) { // User connected
                init();
                $('#logout-form').show();
                $('#bt-menu').show();
                $('#job').show();


            } else { // User not connected
                $('#notConnected').show();
                $('#loader-wrapper').remove(); // Delete loading animation
            }
        }).fail(function () {
            $("body").html(erreurCritique);
        });

        $('#accountCreationForm').submit(function () {
            resetAppearance();
            $.ajax({
                url: $(this).attr('action'),
                method: $(this).attr('method'),
                data: $(this).serialize()
            })
                .done(function (data) {
                    if(data.result) {
                        $('#containerLogIn').slideUp();
                    } else {
                        switch (data.message){
                            case 'Username already used' :
                                $('#username').css(cssError);
                                $('#errorLogin').html('This username is already used').show();
                                break;
                            case 'Mail address already used':
                                $('#mail').css(cssError);
                                $('#errorLogin').html('This mail address is already used').show();
                                break;
                            case 'Password don\'t match':
                                $('#password').css(cssError);
                                $('#passwordCheck').css(cssError);
                                $('#errorLogin').html('Passwords must match').show();
                                break;
                            case 'Password is too easy':
                                $('#password').css(cssError);
                                $('#errorLogin').html('The password you have chosen is too easy, it should at least be 15 characters long').show();
                                break;
                            default:
                                $('#errorLogin').html('An unknown error has occured, please try again').show();
                                break;
                        }
                    }
                })
                .fail(function () {
                    $("body").html(criticalError);
                });
            return false;
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