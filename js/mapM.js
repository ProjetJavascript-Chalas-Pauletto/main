let MapM;
(function () {
    "use strict";

    MapM = function (h, l, dest, data) {
        this.hauteur = h || 5;
        this.largeur = l || 5;
        let map = $(dest);
        let self = this;
        let timeCheck;

        this.isMoving = function () {
            $.ajax({
                url: '/json/isMoving.php',
                type: 'POST',
                data: {TIME : Date.now()}
            })
                .done(function (data) {
                    if(data.result){
                        clearTimeout(timeCheck);
                        startTimer(data.timeLeft);
                        timeCheck = setTimeout(self.isMoving,data.timeLeft);
                        console.log("Still moving");
                        console.log("Set isMoving Timeout to : " + data.timeLeft + "ms");
                    } else{
                        console.log("Travel finished !");
                    }
                })
                .fail(function () {
                    $('body').html(data.msg);
                })
            ;
        };

        this.click_case = function () {
            let x = $(this).data('x');
            let y = $(this).data('y');
            $.ajax({
                url:'/json/isMoving.php',
                type: 'POST',
                data: {TIME : Date.now()}
            })
                .done(function (data) {
                    if(!data.result) { // Si n'est pas en déplacement.
                        $.ajax({
                            url:'/json/startMoving.php',
                            type: 'POST',
                            data: {POS_X_DEST: x, POS_Y_DEST: y, TIME_START: Date.now()}
                        })
                            .done(function (data) {
                                if (data.result){ //Si déplacement commencé
                                    console.log("Travel Started !")
                                    console.log("Set isMoving Timeout to : " + data.timeLength + "ms");
                                    startTimer(data.timeLength);
                                    timeCheck = setTimeout(self.isMoving, data.timeLength);
                                } else { // Erreur de déplacement ?
                                    $('body').html(data.msg);
                                }
                            })
                            .fail(function () {
                                $('body').html(data.msg);
                            });
                    } else { // En déplacement, l'utilisateur ne peut pas se déplacer à nouveau, on ne fait RIEN
                        console.log("You are moving Bastard !")
                        //self.isMoving();
                    }
                }).fail(function () {
                $('body').html(data.msg);
            });

        };

        let endTime;
        let timeTravel;
       // let timer;

        function startTimer(time) {
            endTime = Date.now() + time;
            timeTravel = time;
            //timer = setInterval(setTimer(), 500);
            setTimer();
        }

        function setTimer(){
            let timeLeft = endTime - Date.now();
            if (timeLeft >= 0){
                let percentage = 100 - Math.floor(timeLeft * 100 / timeTravel);
                let hours = Math.floor(timeLeft / 3600000);
                let minutes = Math.floor((timeLeft % 3600000) / 60000) ;
                let seconds = Math.ceil((timeLeft % 60000) / 1000) ;
                minutes = checkTime(minutes);
                seconds = checkTime(seconds);
                $("#title").html(hours + ":" + minutes + ":" + seconds + " - Travelling");
                $("#timer").html(hours + ":" + minutes + ":" + seconds).css("width", percentage + "%");
                let timer = setTimeout(function(){ setTimer() }, 1000);
            } else{
                stopTimer()
            }
        }
        function checkTime(i) {// add a zero in front of numbers<10
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        function stopTimer(){
            $("#title").html("Chilling at 30db");
            $("#timer").html("Vous voila arrivé mon bon !").css("width", "100%");
        }



        this.create_forest_case = function (x,y) {
            return $('<div />')
                .addClass('forest_case')
                .data('x', x)
                .data('y', y)
                .click(self.click_case);
        };

        this.create_village_case = function (x,y) {
            return $('<div />')
                .addClass('village_case')
                .data('x', x)
                .data('y', y)
                .click(self.click_case);

        };

        this.create_lake_case = function (x,y) {
            return $('<div />')
                .addClass('lake_case')
                .data('x', x)
                .data('y', y)
                .click(self.click_case);
        };

        for (let x = 0;x<data.length;++x){
            let tmpColumn = $('<div />');

            for (let y = 0;y<data.length;++y) {

                switch (data[x][y]) {
                    case 'FOREST' :
                        tmpColumn.append(this.create_forest_case(x,y));
                        break;
                    case 'LAKE':
                        tmpColumn.append(this.create_lake_case(x,y));
                        break;
                    case 'VILLAGE' :
                        tmpColumn.append(this.create_village_case(x,y));
                        break;
                    default:
                        $('body').html("ERRRRREUR")
                }
            }
            map.append(tmpColumn);
        }
    };
}) ();