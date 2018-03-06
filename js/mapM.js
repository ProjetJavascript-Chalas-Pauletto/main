let MapM;
(function () {
    "use strict";

    MapM = function (h, l, dest, data) {
        this.hauteur = h || 5;
        this.largeur = l || 5;
        let map = $(dest);
        let self = this;

        $('.indicateur').html('slt');

        this.create_forest_case = function (x,y) {
            return $('<div />')
                .addClass('forest_case')
                .data('x', x)
                .data('y', y)
        };

        this.create_village_case = function (x,y) {
            return $('<div />')
                .addClass('village_case')
                .data('x', x)
                .data('y', y)
        };

        this.create_lake_case = function (x,y) {
            return $('<div />')
                .addClass('lake_case')
                .data('x', x)
                .data('y', y)
        };

        this.create_path_case = function (x,y) {
            return $('<div />')
                .addClass('path_case')
                .data('x', x)
                .data('y', y)
        };

        for (let x = 0;x<data.length;++x){
            let tmpColumn = $('<div />');
            for (let y = 0;y<data.length;++y) {
                switch (data[x][y]) {
                    case 'FOREST' :
                        tmpColumn.append(this.create_forest_case());
                        break;
                    case 'LAKE':
                        tmpColumn.append(this.create_lake_case());
                        break;
                    case 'VILLAGE' :
                        tmpColumn.append(this.create_village_case());
                        break;
                    case 'PATH' :
                        tmpColumn.append(this.create_path_case());
                        break;
                    default:
                        $('body').html("Something went wrong right here !")
                }
            }
            map.append(tmpColumn);
        }

    };
}) ();