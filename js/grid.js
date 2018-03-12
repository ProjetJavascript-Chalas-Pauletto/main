let Grid;
(function() {
    "use strict";

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    Grid = function(largeur, hauteur, destination){
        this.largeur = largeur;
        this.hauteur = hauteur;
        this.destination = $(destination);
        this.slotValue = 0; //Cout d'achat d'une case

        this.tab = [];



        this.slots = [];
        let self = this;

        let open_slot = function(){

            if ($(this).data('state') === 0){ //Case fermée.

                $(this).data('state', 1);
                $(this).html($(this).data('value'));
            }
        };

        let add_items = function(number, value){
            slots.push([number, value]);
        };

        let creer_case_noire = function(x,y, value) {
            return $('<td />').data('x', x).data('y', y).data('state', 0).data('value', value).addClass('slot').html(' ').click(open_slot);
        };
        let creer_case_blanche = function(x,y, value) {
            return $('<td />').data('x', x).data('y', y).data('state', 0).data('value', value).addClass('slot').html(' ').click(open_slot);
        };

        for (let i = 0; i < this.largeur; ++i){
            let tr = $('<tr />');
            this.tab[i] = [];

            for (let j = 0; j < this.hauteur; ++j){

                let slot = (((j+i)%2) === 0 ? creer_case_blanche(i,j, getRandomInt(100)) : creer_case_noire(i,j, getRandomInt(100)));
                this.tab[i].push(slot);

                tr.append(slot);
            }
            this.destination.append(tr);
        }

        console.log(this.tab);

        this.tab[2][1].html("bob");
    }

}) ();