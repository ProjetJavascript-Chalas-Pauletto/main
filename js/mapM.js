let mapM;
(function () {
    "use strict";

    mapM = class mapM {
        constructor(height,width,dest,data){
            this.height = height;
            this.width = width;
            this.map = $(dest);
            this.data = data;
            this.tab = [];
            this.timeCheck = null;
            this.endTime = 0;
            this.timeTravel = 0;

        }

        initPosition () {
            let self = this;
            $.ajax({
                url: '/json/whereAmI.php',
            })
                .done(function (data) {
                    if(data.result){ // If everything went right we look for the player's position
                        self.tab[data.pos['POS_X']][data.pos['POS_Y']].attr("id","posPlayer");
                    }
                })
                .fail(function () {
                    return -1; // Shouldn't happen but if it happens we will be able to notice it.
                })
        }


        startTimer(time) {
            this.endTime = Date.now() + time;
            this.timeTravel = time;
            //timer = setInterval(setTimer(), 500);
            this.setTimer();
        }

        checkTime(i) {// add a zero in front of numbers<10
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        setTimer() {
            let timeLeft = this.endTime - Date.now();
            if (timeLeft >= 0){
                let percentage = 100 - Math.floor(timeLeft * 100 / this.timeTravel);
                let hours = Math.floor(timeLeft / 3600000);
                let minutes = Math.floor((timeLeft % 3600000) / 60000) ;
                let seconds = Math.ceil((timeLeft % 60000) / 1000) ;
                minutes = this.checkTime(minutes);
                seconds = this.checkTime(seconds);
                $("#title").html(hours + ":" + minutes + ":" + seconds + " - Travelling");
                $("#timer").html(hours + ":" + minutes + ":" + seconds).css("width", percentage + "%");
                let timer = setTimeout(function(){ setTimer() }, 1000);
            } else{
                this.stopTimer();
            }
        }

        stopTimer(){
            $("#title").html("Tranquillement !");
            $("#timer").html("Vous voila arrivé mon bon !").css("width", "100%");
        }

        create_case (x,y,type) {
            let self = this;

            let click_case = function () {
                let x = $(this).data('x');
                let y = $(this).data('y');

                $.ajax({
                    url:'/json/isMoving.php',
                    type: 'POST',
                    data: {TIME : Date.now()}
                })
                    .done(function (data) {
                        if(!data.result) { // If the player isn't moving
                            $.ajax({
                                url:'/json/startMoving.php',
                                type: 'POST',
                                data: {POS_X_DEST: x, POS_Y_DEST: y, TIME_START: Date.now()}
                            })
                                .done(function (data) {
                                    if (data.result){ // If the player starts moving
                                        console.log("Travel Started !");
                                        console.log("Set isMoving Timeout to : " + data.timeLength + "ms");
                                        //let test = self.isMoving()
                                        self.timeCheck = setTimeout( function() {
                                            $.ajax({
                                                url: '/json/isMoving.php',
                                                type: 'POST',
                                                data: {TIME : Date.now()}
                                            })
                                                .done(function (data) {
                                                    if(data.result){ // If the player is still traveling
                                                        clearTimeout(self.timeCheck);
                                                        self.timeCheck = setTimeout(self.isMoving,data.timeLeft);
                                                        console.log("Still moving");
                                                        console.log("Set isMoving Timeout to : " + data.timeLeft + "ms");
                                                    } else { //When traveling will be done
                                                        console.log("Travel finished !");
                                                        console.log(self.tab);
                                                        self.tab[data.pos['POS_X_INIT']][data.pos['POS_Y_INIT']].removeAttr("id");
                                                        self.tab[data.pos['POS_X_DEST']][data.pos['POS_Y_DEST']].attr("id","posPlayer");
                                                    }
                                                })
                                                .fail(function () {
                                                    $('body').html(data.msg);
                                                })
                                        }, data.timeLength);
                                    } else { // Erreur de déplacement ?
                                        $('body').html(data.msg);
                                    }
                                })
                                .fail(function () {
                                    $('body').html(data.msg);
                                });
                        } else { // When the player is moving, we just wait and do nothing else.
                            console.log("You are already moving !")
                        }
                    }).fail(function () {
                    $('body').html(data.msg);
                });
            };

            return $('<div />')
                .addClass(type)
                .data('x', x)
                .data('y', y)
                .click(click_case);
        }

        createMap() {
            for (let x = 0;x<this.data.length;++x){
                let tmpColumn = $('<div />');
                this.tab[x] = [];
                for (let y = 0;y<this.data.length;++y) {
                    let type = "";
                    switch(this.data[x][y]) {
                        case "FOREST":
                            type = "forest_case";
                            break;
                        case "LAKE":
                            type = "lake_case";
                            break;
                        case "VILLAGE":
                            type = "village_case";
                            break;
                        default:
                            $('body').html("Something strange happened");
                    }
                    let slot = this.create_case(x,y,type);
                    this.tab[x].push(slot);
                    tmpColumn.append(slot);
                }
                this.map.append(tmpColumn);
            }
            this.initPosition();
        }
    };
}) ();