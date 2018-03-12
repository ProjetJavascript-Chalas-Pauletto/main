let Inventory;
(function() {
    "use strict";

    Inventory = function(){
        let resources = [];
        let resourceInventory = [];

        let self = this;

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

        this.loadResourcesInventory = function () { //Charges l'inventaire de ressources du joueur.
            $.ajax({
                url: '/json/loadInventory.php'
            })
                .done(function (data) {
                    resourceInventory = data.resources;
                    console.log("Inventory resources loaded !");

                    self.displayResources()

                })
                .fail(function () {
                    $('body').html(data.msg);
                })
            ;
        };

        this.displayResources = function () {
            console.log(resourceInventory);
            $('.resourcesInventory').html(resourceInventory);
        };

        this.test = function() {

        };

        this.loadResources();
        this.loadResourcesInventory();

    }

}) ();