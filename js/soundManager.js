class SoundManager {

    static playSong(songName, isLoop) {
        let audio = $('#audioPlayer');
        audio.attr('src', '/audio/music/' + songName)[0].play();
        audio.prop("volume", 0.5);
        audio.prop("loop", isLoop);
    }

    static playSound(soundName) {
        let audio = $('#soundPlayer');
        audio.attr('src', '/audio/sound/' + soundName + '.m4a')[0].play();
        audio.prop("volume", 0.5);
    }

}