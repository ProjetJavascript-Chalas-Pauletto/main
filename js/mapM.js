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
                        self.tab[data.pos['POS_X']][data.pos['POS_Y']].append($('<div />').attr("id","posPlayer"));
                        Game.log("Welcome back, last time you were on " + data.landType + " : (" + data.pos['POS_X'] + "," + data.pos['POS_Y'] + ") !", "logMessagePosition");
                        Game.updatePosition(data.pos['POS_X'], data.pos['POS_Y'], "A peaceful resting place");
                        Game.updateActivity(data.ressourceId,data.landType);
                    }
                })
                .fail(function () {
                    return -1; // Shouldn't happen but if it happens we will be able to notice it.
                })
        }


        startTimer(time) { // used to start the timer on the top of the map
            this.endTime = Date.now() + time;
            this.timeTravel = time;
            //timer = setInterval(setTimer(), 500);
            this.setTimer();
        }


        setTimer() { // Setting all stuffs properly in order to have a clean displaying
            let self = this;
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
                let timer = setTimeout(function(){ self.setTimer() }, 1000);
            } else{
                this.stopTimer();
            }
        }

        checkTime(i) {// add a zero in front of numbers<10
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }


        stopTimer(){ // Stops updating the title with the time left for moving
            $("#title").html("Tranquillement arrivé !");
            $("#timer").html("Vous voilà arrivé à destination mon bon !").css("width", "100%");
        }

        create_case (x,y,type, isMoving) { //Create all case and set their .click we struggled with some context troubles but everything is right atm.
            let self = this;

            let click_case = function()  {
                let x = $(this).data('x');
                let y = $(this).data('y');

                $.ajax({ // Is the player moving ?
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
                                        $('#alertMovingMessage').hide();
                                        console.log("Travel Started !");
                                        console.log("Set isMoving Timeout to : " + data.timeLength + "ms");
                                        Game.log("You started traveling to (" + x + "," + y +") !","logMessagePosition");
                                        self.startTimer(data.timeLength);
                                        self.timeCheck = setTimeout(isMoving, data.timeLength);
                                    } else { // Erreur de déplacement ?
                                        $('body').html(data.msg);
                                    }
                                })
                                .fail(function () {
                                    $('body').html(data.msg);
                                });
                        } else { // When the player is moving, we just wait and do nothing else.
                            console.log("You are already moving !");
                            $('#alertMovingMessage').html("You are already moving, Sm'orc !").show()
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

        createMap() { // Creating the map using the database's datas
            let self = this;
            let isMoving = function() { // Check if the player is still moving or update his position. (Security of the database)
                $.ajax({
                    url: '/json/isMoving.php',
                    type: 'POST',
                    data: {TIME : Date.now()}
                })
                    .done(function (data) {
                        if(data.result){ // If the player is still traveling
                            clearTimeout(self.timeCheck);
                            self.startTimer(data.timeLeft);
                            self.timeCheck = setTimeout(isMoving,data.timeLeft);
                            console.log("Still moving");
                            console.log("Set isMoving Timeout to : " + data.timeLeft + "ms");
                        } else if (data.message === "Travel finished"){ //When traveling will be done
                            self.tab[data.pos['POS_X_INIT']][data.pos['POS_Y_INIT']].empty();
                            self.tab[data.pos['POS_X_DEST']][data.pos['POS_Y_DEST']].append($('<div />').attr("id","posPlayer"));
                            Game.log("You arrived to " + data.landType + " (" + data.pos['POS_X_DEST'] + "," + data.pos['POS_Y_DEST'] + ") !", "logMessagePosition" );
                            Game.updatePosition(data.pos['POS_X_DEST'],data.pos['POS_Y_DEST'],data.landType);
                            Game.updateActivity(data.ressourceId,data.landType);
                        } else {
                            console.log(data.message);
                        }
                    })
                    .fail(function () {
                        $('body').html(data.msg);
                    })
            };


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
                    let slot = this.create_case(x,y,type, isMoving);
                    this.tab[x].push(slot);
                    tmpColumn.append(slot);
                }
                this.map.append(tmpColumn);
            }
            this.initPosition();
            isMoving();
        }
    };
}) ();