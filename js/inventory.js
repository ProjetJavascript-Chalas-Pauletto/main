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
        let resourcesInventory =  $('.resourcesInventory');

        resourcesInventory.empty();


        for (let resource in this.resourceInventory){
            let resourceName = this.resources[resource][0];

            //Tooltip Info
            let infos = "<h3>" + resourceName + "<span class=\"badge badge-danger\">"+ resource +"</span></h3><p>Quantity : " + this.resourceInventory[resource] + "</p><p>Size : "+ this.resources[resource][1]*this.resourceInventory[resource] +"</p>"

            //Tooltip + modal
            let tooltip = $('<span />').attr("data-toggle", "tooltip").attr("data-html", "true").attr("title", infos);
            let modal = $('<a />').attr("data-toggle","modal").attr("href","#resourceManager");

            tooltip.append(modal);

            let icon = $('<img />').attr("src", "img/resources/" + resourceName + ".png");
            modal.append(icon);
            //NumberTxt
            let nbResources = $('<div />').addClass("resourceDisplay").append($('<span />').addClass("badge badge-info").html(this.resourceInventory[resource]));

            resourcesInventory.append($('<div />').addClass(resourceName).append(tooltip).append(nbResources));
        }

        $(function () {
            $('[data-toggle="tooltip"]').tooltip()
        });
        /*for(let i= 0; i < this.resourceInventory.length; ++i){
            txt += this.resources[this.resourceInventory[i][0]][0] + " : " + this.resourceInventory[i][1] + " - ";
        }*/

    }
}
