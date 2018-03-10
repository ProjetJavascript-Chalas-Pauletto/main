let MapM;
(function () {
    "use strict";

    MapM = function (h, l, dest, data) {
        this.hauteur = h || 5;
        this.largeur = l || 5;
        let map = $(dest);
        let self = this;


        $('.indicateur').html('slt');

        function isMoving() {
            $.ajax({
                url: '/json/isMoving.php'
            })
                .done(function (data) {
                    if(data.result){
                        clearTimeout(timeCheck);
                        setTimeout(timeCheck,data.time)
                    }
                })
                .fail(function () {
                    $('body').html(data.msg);
                })
            ;
        }

        this.click_case = function () {
            let x = $(this).data('x');
            let y = $(this).data('y');
            $.ajax({
                url:'/json/isMoving.php'
            })
                .done(function (data) {
                    if(!data.result) {
                        $.ajax({
                            url:'/json/startMoving.php',
                            type: 'POST',
                            data: {POS_X_DEST: x, POS_Y_DEST: y}
                        })
                            .done(function (data) {
                                if (data.result){
                                    let timeCheck = setTimeout(function () {
                                        isMoving();
                                    },data.timeLength)
                                } else {
                                    $('body').html(data.msg);
                                }
                            })
                            .fail(function () {
                                $('body').html(data.msg);
                            });
                    } else {
                        isMoving();
                    }
                }).fail(function () {
                $('body').html(data.msg);
            });

        };

        this.create_forest_case = function (x,y) {
            return $('<div />')
                .addClass('forest_case')
                .data('x', x)
                .data('y', y)
                .click(self.click_case);
        };

        this.create_village_case = function (x,y) {
            return $('<div />')
                .addClass('village_case')
                .data('x', x)
                .data('y', y)
                .click(self.click_case);

        };

        this.create_lake_case = function (x,y) {
            return $('<div />')
                .addClass('lake_case')
                .data('x', x)
                .data('y', y)
                .click(self.click_case);
        };

        for (let x = 0;x<data.length;++x){
            let tmpColumn = $('<div />');

            for (let y = 0;y<data.length;++y) {

                switch (data[x][y]) {
                    case 'FOREST' :
                        tmpColumn.append(this.create_forest_case(x,y));
                        break;
                    case 'LAKE':
                        tmpColumn.append(this.create_lake_case(x,y));
                        break;
                    case 'VILLAGE' :
                        tmpColumn.append(this.create_village_case(x,y));
                        break;
                    default:
                        $('body').html("ERRRRREUR")
                }
            }
            map.append(tmpColumn);
        }
    };
}) ();