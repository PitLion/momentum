const audioPlayer = document.querySelector('.audio-player');
const audio = audioPlayer.querySelector('.audio');
const playPauseBtn = audioPlayer.querySelector('.play-pause');
const prevBtn = audioPlayer.querySelector('.prev-song');
const nextBtn = audioPlayer.querySelector('.next-song');
const songName = audioPlayer.querySelector('.song-name');
const songAuthor = audioPlayer.querySelector('.song-author');
const progressBar = audioPlayer.querySelector('.progress-bar');
const progressContainer = audioPlayer.querySelector('.progress-container');
const volumeSlider = audioPlayer.querySelector('.volume-slider');
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeUp = audioPlayer.querySelector('.volume-up');

let currentSongIndex = 0;
let isPlaying = false;
let currentVolume = 1;
let songItems;

async function loadSongsFromJSON(jsonUrl) {
    await fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            const songList = document.querySelector('.song-list ul');
            songList.innerHTML = ''; // Очистить текущий список песен

            data.forEach(song => {
                const li = document.createElement('li');
                li.textContent = `${song.title} - ${song.artist}`;
                li.setAttribute('data-src', song.src);
                songList.appendChild(li);
            });

            // Обновить список песен, так что он включает новые песни
            songItems = songList.querySelectorAll('li');
            songItems.forEach(function (songItem) {
                songItem.addEventListener('click', function () {
                    currentSongIndex = Array.from(songItems).indexOf(songItem);
                    loadSong(currentSongIndex);
                    playSong();
                });
            });
        });
}

loadSongsFromJSON('songs.json').then(() => {
    loadSong(currentSongIndex);
});

function playSong() {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    audio.play();
}

function pauseSong() {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    audio.pause();
}

function loadSong(songIndex) {
    const songSrc = songItems[songIndex].getAttribute('data-src');
    songName.textContent = songItems[songIndex].textContent.split(' - ')[0];
    songAuthor.textContent = songItems[songIndex].textContent.split(' - ')[1];
    audio.src = songSrc;
}

function playNextSong() {
    currentSongIndex++;
    if (currentSongIndex > songItems.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(currentSongIndex);
    playSong();
}

function playPrevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songItems.length - 1;
    }
    loadSong(currentSongIndex);
    playSong();
}

function updateProgress(e) {
    const { currentTime, duration } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Устанавливаем текущее время
    const currentTimeMinutes = Math.floor(currentTime / 60);
    let currentTimeSeconds = Math.floor(currentTime % 60);
    if (currentTimeSeconds < 10) {
        currentTimeSeconds = `0${currentTimeSeconds}`;
    }
    currentTimeEl.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;

    // Устанавливаем длительность песни
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
    }

    if (!isNaN(durationMinutes) && !isNaN(durationSeconds)) {
        durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }
}

function setProgress(e) {
    const progressWidth = progressContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / progressWidth) * duration;
}

function setVolume(e) {
       //currentVolume = e.target.value;
    if (volumeUp.classList.contains("volume-off")) {
        volumeSlider.value = '0';
        audio.volume = 0;
    } else {
        currentVolume = e.target.value;
        audio.volume = currentVolume;
    } 
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

nextBtn.addEventListener('click', playNextSong);
prevBtn.addEventListener('click', playPrevSong);

audio.addEventListener('ended', playNextSong);
audio.addEventListener('timeupdate', updateProgress);

progressContainer.addEventListener('click', setProgress);

volumeSlider.addEventListener('input', setVolume);

volumeUp.addEventListener('click', () => {
    volumeUp.classList.toggle('volume-off');
    setVolume();
});

