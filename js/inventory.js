class Inventory{
    constructor() {
        this.resources = [];
        this.resourceInventory = [];
        this.capacity = 0;
        this.maxCapacity = 10000;

        this.init();

        this.loadResources();
        this.loadResourcesInventory();
    }

    init() {
        let self = this;
        $('#resourceManagerModal').on('show.bs.modal', function (event) {
            let button = $(event.relatedTarget); // Button that triggered the modal
            let modal = $(this);
            modal.find('.modal-title').text(button.data('resourceName')).append($('<span />').addClass("badge badge-danger").html(button.data('resourceId')));
            let slider = modal.find('#resourceRangeSelector').attr("max", button.data('resourceAmount')).val(0);

            modal.find('#resourceAmount').text(0);
            slider.on("input", () => {
                modal.find('#resourceAmount').text(slider.val())
            });

            let discardResource = () => {
                self.setResource(button.data('resourceId'), -parseInt(slider.val()));
                console.log("You destroyed " + slider.val() + " " + button.data('resourceName'));
                self.displayResources();
            };
            modal.find('#discardResourceButton').unbind().click(discardResource);
        });
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
                //Size of inventory
                for (let resource in self.resourceInventory){
                    self.capacity += self.resources[resource][1]*self.resourceInventory[resource]
                }
                console.log("Inventory resources loaded ! Total size : " + self.capacity);
                console.log(self.resourceInventory);

                //self.displayResources();
            })
            .fail(function () {
                $('body').html(data.msg);
            })
        ;
    }

    setResource(id, amount){
        this.resourceInventory[id] += amount;
        this.capacity += this.resources[id][1] * amount;;
    }



    displayResources () {
        let resourcesInventory =  $('.resourcesInventory');
        resourcesInventory.empty();

        for (let resource in this.resourceInventory) {
            let resourceName = this.resources[resource][0];

            //Tooltip Info
            let sizeResource = this.resources[resource][1] * this.resourceInventory[resource];
            let percentSize = (sizeResource * 100 / this.capacity).toFixed(2);
            let infos = "<h3>" + resourceName + "<span class=\"badge badge-danger\">" + resource + "</span></h3><p>Quantity : " + this.resourceInventory[resource] +
                "</p><p>Size : " + sizeResource + " (" + percentSize + "% of total)</p>";

            //Tooltip + modal
            let tooltip = $('<span />').attr("data-toggle", "tooltip").attr("data-html", "true").attr("title", infos);
            let modal = $('<a />').attr("data-toggle", "modal").attr("href", "#resourceManagerModal").data("resourceName", resourceName).data("resourceId", resource).data("resourceAmount", this.resourceInventory[resource]);

            tooltip.append(modal);

            let icon = $('<img />').attr("src", "img/resources/" + resourceName + ".png");
            modal.append(icon);
            //NumberTxt
            let nbResources = $('<div />').addClass("resourceDisplay").append($('<span />').addClass("badge badge-info").html(this.resourceInventory[resource]));

            resourcesInventory.append($('<div />').addClass(resourceName).append(tooltip).append(nbResources));
        }


        $(() => {
            $('[data-toggle="tooltip"]').tooltip()
        });

    }
}
