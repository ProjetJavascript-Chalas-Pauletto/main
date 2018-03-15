class Inventory{
    constructor() {
        this.resources = [];
        this.resourceInventory = [];
        this.loadResources();
        this.loadResourcesInventory();
    }

    loadResources() { //Charges les ressources du jeu.
        let self = this;
        $.ajax({
            url: '/json/loadRessources.php'
        })
            .done(function (data) {
                self.resources = data.resources;
                console.log(Object.keys(self.resources).length + " resources loaded from server : ");
                console.log(self.resources);
            })
            .fail(function () {
                $('body').html(data.msg);
            })
        ;
    }

    loadResourcesInventory() { //Charges l'inventaire de ressources du joueur.
        let self = this;
        $.ajax({
            url: '/json/loadInventory.php'
        })
            .done(function (data) {
                self.resourceInventory = data.resources;
                console.log("Inventory resources loaded ! ");
                console.log(self.resourceInventory);
                self.displayResources();
            })
            .fail(function () {
                $('body').html(data.msg);
            })
        ;
    }

    setResource(id, amount){
        this.resourceInventory[id] += amount;
    }

    displayResources () {
        console.log(this.resourceInventory);

        let txt = "";
        for (let resource in this.resourceInventory){
            txt += this.resources[resource][0] + " : " + this.resourceInventory[resource] + "\n";
        }
        /*for(let i= 0; i < this.resourceInventory.length; ++i){
            txt += this.resources[this.resourceInventory[i][0]][0] + " : " + this.resourceInventory[i][1] + " - ";
        }*/

        $('.resourcesInventory').html(txt);
    }
}
