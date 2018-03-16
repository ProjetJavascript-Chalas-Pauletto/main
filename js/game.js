class Game {
    constructor() {
        this.jobs = {}; //Contient les différents métiers
        this.map = null;
        this.inventory = new Inventory();
        this.menu = null;
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
                        self.map = new mapM(5, 5, '#map', data);
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
            self.inventory.setResource(1, 1);
            $("#click").html(self.jobs[1].exp);
        });
    }

    static log(string, typeClass) {
        $('#logMessages').prepend($('<div />').addClass(typeClass).html(string));
    }

    static updatePosition(pos_x, pos_y, type) {
        $('.playerPosition').remove();
        $('.playerPositionType').remove();
        $('#positionInfos').append($('<div />').addClass('playerPosition').html(pos_x + "," + pos_y));
        $('#positionInfos').append($('<div />').addClass('playerPositionType').html(type));
    };

    static updateActivity(ressourceId,mapType) {

        $('#mainActivity').empty(); // reinitilaizing for future calls

        // Setting up few parameters in order to be clearer with the treatment
        let self = this;
        self.quantity = 0;
        let ressourceName;
        let activityName;
        let activityStore;
        let mapTypeId;

        //Adapt to the map the player is on
        switch (mapType){
            case "FOREST":
                ressourceName = " wood logs";
                activityName = "Chop wood";
                activityStore = "Store choped wood logs";
                mapTypeId = "forest_type";
                break;
            case "VILLAGE":
                ressourceName = " stones";
                activityName = "Steal stone";
                activityStore = "Store stolen stone";
                mapTypeId = "village_type";
                break;
            case "LAKE":
                ressourceName = " fishs";
                activityName = "Land a fish bait";
                activityStore = "Store fished fishs";
                mapTypeId = "lake_type";
                break;
        }

        let click_activity_farm = () => { // Farm those gratefull resources !
            self.quantity += 1;
        };

        let click_activity_save = () => { // Saving all the beautiful ressources you just farmed
            $.ajax({
                url: '../json/saveRessources.php',
                type : 'POST',
                data: {ressourceId: ressourceId, quantity: self.quantity}
            })
                .done(function (data) {
                    if (data.result) {
                        Game.log("You packed " + self.quantity + ressourceName + " in your backpack !","logMessageRessource");
                        self.quantity = 0;
                    } else {
                        $("body").html(data.msg);
                    }
                })
                .fail(function () {
                    $("body").html("An error on the job or quantity update happened, please contact any administrator.");
                });
        };

        //Adding all the treatment to the game.
        $('.gameMiddle').attr("id", mapTypeId);
        $('#mainActivity').append($("<button />").addClass("jobButton").html(activityName).click(click_activity_farm));
        $('#mainActivity').append($("<button />").addClass("jobButton").html(activityStore).click(click_activity_save));
    }

}