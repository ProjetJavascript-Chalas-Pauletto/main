class EasterEgg {
    static samuel(){

        //$('.btn').prop('disabled', true);

        SoundManager.playSong("Laventurier");
        $('#notConnected').fadeOut(4000);


        let panel = $('<div />').attr('id', 'samuelEasterEgg').attr('style', 'display : none');
        let spinner = $('<img />').attr("src", "img/samuel.png");
        panel.append($('<div />').attr('id', 'spinner').append(spinner));

        $('body').append(panel);

        panel.slideUp(4000);

        let slide = function () {
            panel.slideDown(10000);
        };

        setTimeout(slide, 4000);

    }

}