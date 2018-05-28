(function () {
    "use strict";

    //This version variable will be used later to check if the user is on the right version of the game and isn't navigating in local if new features have been added.
    let version = "0.1.1";

    let checkVersion = () => {
        console.log("Current version " + version);
        let currentVersion = $('meta[name=version]').attr("content");
        if (version !== currentVersion) {
            console.log("Last version : " + currentVersion);
            console.log("Your version is UP TO DATE !! Please update reloading the cache for better experience !");

            let versionModal = $('#versionModal');

            let newVersion = "<span class='badge badge-success'>" + currentVersion + "<span/>";
            let oldVersion = "<span class='badge badge-warning'>" + version + "<span/>";
            $('#versionModalTitle').html("New version" + newVersion);
            $('#localVersion').html("Your version : " + oldVersion);

            versionModal.find('.modal-body').append($('<p />').html("Your version : " + oldVersion)).append($('<p />').html(" Up to date ! <br/> Please reload your cache for a better experience !"));
            versionModal.modal({
                backdrop: 'static',
                keyboard: false
            }).modal('toggle');
        }
    };

    let criticalError =
        "Une erreur critique vient de se produire," + //Spreading mail adress in order to prohibit bots from getting it.
        "veuillez contacter l'administrateur à cette adresse mail : chalas." + ((true) ? 'paule' : "") + "tto@gm" + "a" + "il" + ".co" + "m";

    //Those css definitions have been left right here until we will implement Jquery UI to allow the usage of the .switchClass() which will be a great improvement. They are kind of a reminder.
    let cssError = {
        'background-color': '#eeeeee',
        'border': 'solid 1px red'
    };

    let cssClear = {
        'background-color': 'white',
        'border-style': 'inset',
        'border-color': 'initial',
        'border-image': 'initial'
    };

    function resetAppearance() {
        $('#username').css(cssClear);
        $('#passwordCheck').css(cssClear);
        $('#password').css(cssClear);
        $('#mail').css(cssClear);
    }


    $(() => {
        // Check user version
        checkVersion();

        // Initialize Firebase
        let config = {
            apiKey: "AIzaSyBojoFCoGMMat8b2nwH2Rbx5PRNLpSsk50",
            authDomain: "ozenix-world.firebaseapp.com",
            databaseURL: "https://ozenix-world.firebaseio.com",
            projectId: "ozenix-world",
            storageBucket: "ozenix-world.appspot.com",
            messagingSenderId: "47609536331"
        };
        firebase.initializeApp(config);

        $('#buttonLogin').click(() => {
            let email = $('#username').val();
            let password = $('#password').val();



            let auth = firebase.auth();
            let promise = auth.signInWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message));
        });

        $('#buttonSignUp').click(() => {
            //TODO: Check for real email
            let email = $('#username').val();
            let password = $('#password').val();

            let auth = firebase.auth();
            let promise = auth.createUserWithEmailAndPassword(email, password);
            promise.catch(e => console.log(e.message));
        });

        $('#buttonLogout').click(() => {
            firebase.auth().signOut();
            window.location.reload();
        });

        firebase.auth().onAuthStateChanged(firebaseUser => {
            if (firebaseUser) {
                if( firebaseUser.uid === "XZ4w4bL8dofzpwmQDm0AsrnSDnA2"){
                    EasterEgg.samuel();
                    $('#bt-menu').show();
                }
                else{
                    console.log("User connected !");
                    console.log(firebaseUser);
                    init();
                    $('#home').remove();

                    $('#bt-menu').show();
                    $('#job').show();
                    $('.game').show();
                }
            } else {
                console.log("Not Loged In");

                SoundManager.playSong("The Quest - ASKII.mp3", true);
            }
        });


        let test = 0;

        function writeUserData(userId, value) {
            firebase.database().ref('users/' + userId).set({
                wood: value,
            });
        }

        const btnTest = document.getElementById('buttonTest');
        btnTest.addEventListener('click', e => {
            writeUserData(firebase.auth().currentUser.uid, test++)
        });

        const dbRef = firebase.database().ref().child('users');
        dbRef.on('value', snap => console.log(snap.val()));


        let init = function () {
            //Cute opening & loading animation
            startLoadingAnimation();

            console.log("Initialising Game...");
            let game = new Game();

            let sound = Tools.getRandomInt(1, 4);
            SoundManager.playSong("Achaidh Cheide.ogg", true);
            SoundManager.playSound("Bienvenue" + sound);
        };


        let startLoadingAnimation = () => {
            /*
            <!-- LOADING ANIMATION -->
                <div id="loader-wrapper">
                    <div id="loader">
                        <img src="img/Ozenix%20LogoSplit_1.png">
                        <div id="loader2">
                            <img src="img/Ozenix%20LogoSplit_2.png">
                            <div id="loader3">
                                <img src="img/Ozenix%20LogoSplit_3.png">
                                <div id="loader4">
                                    <img src="img/Ozenix%20LogoSplit_4.png">
                                    <div id="loader5">
                                        <img src="img/Ozenix%20LogoSplit_5.png">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="loader-section section-left"></div>
                    <div class="loader-section section-right"></div>
                </div>
            */

            let loadingAnimation = "<div id='loader-wrapper'>" +
                "<div id='loader'>" +
                "<img src='img/Ozenix%20LogoSplit_1.png'>" +
                "<div id='loader2'>" +
                "<img src='img/Ozenix%20LogoSplit_2.png'>" +
                "<div id='loader3'>" +
                "<img src='img/Ozenix%20LogoSplit_3.png'>" +
                "<div id='loader4'>" +
                "<img src='img/Ozenix%20LogoSplit_4.png'>" +
                "<div id='loader5'>" +
                "<img src='img/Ozenix%20LogoSplit_5.png'>" +
                "</div></div></div></div></div>" +
                "<div class='loader-section section-left'></div>" +
                "<div class='loader-section section-right'></div>" +
                "</div>";

            $('body').append(loadingAnimation);
            setTimeout(function () {
                $('body').addClass('loaded');
            }, 6600);

        };


        /*//Checking if the player is logged in.
        $.ajax({
            url: '../json/isLogged.php'
        }).done(function (data) {
            if (data.result) { // User connected
                init();
                $('#logout-form').show();
                $('#bt-menu').show();
                $('#job').show();
                $('.game').show();

            } else { // User not connected
                $('#home').show();
                SoundManager.playSong("The Quest - ASKII.mp3", true );
                $('#loader-wrapper').remove(); // Delete loading animation
            }
        }).always(function () {




        }).fail(function () {
            $("body").html(criticalError);
        });



      /*  $('#accountCreationForm').submit(function () {
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
                    if (data.easterEgg){
                        EasterEgg.samuel();
                    }else{
                        if (data.result) {
                            window.location.reload();
                        } else {
                            $("#logMsg").html("Wrong password or email !")
                        }
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
*/


    })
})();