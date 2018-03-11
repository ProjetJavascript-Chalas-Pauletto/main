let Inventory;
(function() {
    "use strict";

    Inventory = function(){
        let resources = [];
        let resourceInventory = [];

        this.loadResources = function () { //Charges les ressources du jeu.
            $.ajax({
                url: '/json/loadRessources.php'
            })
                .done(function (data) {
                    resources = data.resources;
                    /*for (let i = 0; i < data.resources.length; ++i){
                        resources.push(data.resources[i]);
                    }*/
                    console.log(resources.length + " resources loaded from server : " + resources);
                })
                .fail(function () {
                    $('body').html(data.msg);
                })
            ;
        };

        this.loadResourcesInventory = function () {
            $.ajax({
                url: '/json/loadInventory.php'
            })
                .done(function (data) {
                    resourceInventory = data.resources;
                    console.log("Inventory resources loaded !");
                })
                .fail(function () {
                    $('body').html(data.msg);
                })
            ;
        };

        this.getSize = function() {

        };

        this.loadResources();


    }

}) ();