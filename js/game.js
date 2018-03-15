class Game {
        constructor() {
            this.jobs = {}; //Contient les différents métiers
            this.map = null;
            this.inventory = new Inventory();
            this.menu = null;
            this.character = new Character(250,250,100);

            this.init();
        }

        init() {
            let self = this;
            console.log("loading jobs");
            $.ajax({
                url: '/json/loadJobs.php'
            })
                .done(function (data) {
                    for (let job in data.jobs) {
                        self.jobs[job] = new Job(data.jobs[job], data.playerJobs[job]);
                        console.log(data.jobs[job] + " loaded with : " + data.playerJobs[job] + " exp");
                    }
                    console.log("All Jobs loaded successfully !");
                    console.log(self.jobs);
                    self.menu = new Menu(self.inventory, self.jobs);

                    $.ajax({
                        url: '../json/mapDB.php'
                    })
                        .done(function (data) {
                            self.map = new mapM(5,5,'#map',data);
                            self.map.createMap();
                            //$(".lake_case").addClass("lake_case");
                            //$(".village_case").addClass("village_case");
                            //$(".forest_case").addClass("forest_case");
                        })
                        .fail(function () {
                            $("body").html(erreurCritique);
                        });

                })
                .fail(function () {
                    $('body').html(data.msg);
                });

            $("#click").click(function () {
                self.jobs[1].addExp(1);
                self.inventory.setResource(1,1);
                $("#click").html(self.jobs[1].exp);

                self.character.setHp(-30);
            });

            this.character.startActivity();

        }


    displayOnLog(string,typeClass) {
        $('#log').append($('<div />').addClass(typeClass).html(string));
    }
    }