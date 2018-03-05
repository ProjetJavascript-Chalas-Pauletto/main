(function () {
    "use strict";

    let cssError = {
        'background-color' :'#d3d3d3',
        'border' : 'solid 1px red'
    };

    let criticalError =
        "Une erreur critique vient de se produire," + //Spreading mail adress in order to prohibit bots from getting it.
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
    });

}) ();