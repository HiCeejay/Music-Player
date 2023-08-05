const image = document.querySelector("img");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const music = document.querySelector("audio");
const progressContainer = document.getElementById("progress-container");
const progress = document.getElementById("progress");
const prevBtn = document.getElementById("prev");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const musicList = document.getElementById("list");

// array for the songs
const songs = [
  {
    name: "ISLAND BREEZE JOMI",
    displayname: "Island Breeze",
    artist: "Hi_Ceejay & Paige_Speikz",
  },

  {
    name: "B N B MASTERS",
    displayname: "Black & Beautiful",
    artist: "Hi_Ceejay",
  },

  {
    name: "FOR THE LOVE OF MUSIC",
    displayname: "The Sound",
    artist: "Hi_Ceejay & Razak",
  },

  {
    name: "DIGIT MASTERS",
    displayname: "Digit",
    artist: "Hi_Ceejay",
  },

  {
    name: "GAIA",
    displayname: "Gaia",
    artist: "Hi_Ceejay & Netty",
  },
];

// Checking if the music is playing or not
let isMusicPlaying = false;

// playing the music
function playMusic() {
  music.play();
  isMusicPlaying = true;
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.setAttribute("title", "Pause");
}

function pauseMusic() {
  music.pause();
  isMusicPlaying = false;
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.setAttribute("title", "Play");
}

// event listener to play and pause the music
playBtn.addEventListener("click", () => {
  if (isMusicPlaying) {
    pauseMusic();
    return;
  }

  playMusic();
});

// function for updating dom

function loadSong(song) {
  title.textContent = song.displayname;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  image.src = `img/${song.name}.jpg`;
}

// currentSong
let songIndex = 0;

// previous Song
function prevSong() {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playMusic(); // Start playing previous song automatically
}

// Next Song
function nextSong() {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSong(songs[songIndex]);
  playMusic(); // Start playing the next song automatically
}

// Update Progress Bar & Time
function updateProgressBar(e) {
  if (isMusicPlaying) {
    const { duration, currentTime } = e.srcElement;

    // update progress bar wid th
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    // Update the timingu
    const durationMinutes = Math.floor(duration / 60);
    let durationSeconds = Math.floor(duration % 60);
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }

    // Delay NAN
    if (durationSeconds) {
      durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
    }

    const currentMinutes = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
  }
}

// on load select first song
loadSong(songs[songIndex]);

// Set Progress Bar
function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const { duration } = music;
  music.currentTime = (clickX / width) * duration;
}

// event Listeners

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
music.addEventListener("ended", nextSong);
music.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", setProgressBar);
