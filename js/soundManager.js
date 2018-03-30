class SoundManager {

    static playSong(songName) {
        $('#audioPlayer').attr('src', '/audio/music/' + songName + '.mp3')[0].play();
    }

    static playSound(soundName) {
        $('#soundPlayer').attr('src', '/audio/sound/' + soundName + '.m4a')[0].play();
    }

}