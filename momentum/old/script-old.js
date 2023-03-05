const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audioEl = document.getElementById("audio");
const coverEl = document.getElementById("cover");
const titleEl = document.getElementById("title");
const artistEl = document.getElementById("artist");
const progressEl = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

const songs = [
    {
        title: 'Star Walkin',
        artist: 'Artist 1',
        coverPath: 'images/StarWalkin.jpg',
        audioPath: 'audio/StarWalkin.mp3',
    },
    {
        title: 'Awaken',
        artist: 'Artist 2',
        coverPath: 'images/Awaken.jpg',
        audioPath: 'audio/Awaken.mp3',
    },
    {
        title: 'Phoenix',
        artist: 'Artist 3',
        coverPath: 'images/Phoenix.jpg',
        audioPath: 'audio/Phoenix.mp3',
    },
];

let currentSongIndex = 0;

// Заполняем информацию о песне
function loadSong(song) {
    titleEl.textContent = song.title;
    artistEl.textContent = song.artist;
    coverEl.src = song.coverPath;
    audioEl.src = song.audioPath;
}

// Проигрываем песню
function playSong() {
    audioEl.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

// Приостанавливаем песню
function pauseSong() {
    audioEl.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
}

// Переключаем на предыдущую песню
function prevSong() {
    currentSongIndex--;
    if (currentSongIndex < 0) {
        currentSongIndex = songs.length - 1;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

// Переключаем на следующую песню
function nextSong() {
    currentSongIndex++;
    if (currentSongIndex > songs.length - 1) {
        currentSongIndex = 0;
    }
    loadSong(songs[currentSongIndex]);
    playSong();
}

// Обновляем информацию о времени
function updateProgress(e) {
    const { currentTime, duration } = e.target;
    const progressPercent = (currentTime / duration) * 100;
    progressEl.style.width = `${progressPercent}%`;

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
    durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
}

// Устанавливаем индекс текущей песни при загрузке страницы
loadSong(songs[currentSongIndex]);

// Event listener для кнопки Play
playBtn.addEventListener('click', () => {
    const isPlaying = audioEl.paused;

    if (isPlaying) {
        playSong();
    } else {
        pauseSong();
    }
});

// Event listener для кнопки Prev
prevBtn.addEventListener('click', () => {
    prevSong();
});

// Event listener для кнопки Next
nextBtn.addEventListener('click', () => {
    nextSong();
});

// Event listener для обновления прогресса
audioEl.addEventListener('timeupdate', updateProgress);