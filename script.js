const trackList = [
    {
        title: " Cheb Larbi _Avec Le Temps Tibgheni",
        artist: "Cheb Larbi",
        cover: "./Title/Albume/Track 5.jpg",
        src: "./Title/Albume/Cheb Larbi Avec Le Temps Tibgheni.mp3"
    },
    {
        title: "Houdini [Official Music Video]",
        artist: "Eminem",
        cover: "./Title/FirtOne/track1.jpg",
        src: "./Title/FirtOne/Eminem - Houdini [Official Music Video].mp3"
    },
    {
        title: "IGHMAN ⵉⵖⵯⵎⴰⵏ ( Intro Music Video )",
        artist: "Meteor Airlines",
        cover: "./Title/SecondOne/Track 2.jpg",
        src: "./Title/SecondOne/Meteor Airlines - IGHMAN ⵉⵖⵯⵎⴰⵏ ( Intro Music Video ) (1).mp3"
    },
    {
        title: " ANZWUM ⴰⵏⵣⵡⵓⵎ (Official Music Video)",
        artist: "Meteor Airlines",
        cover: "./Title/ThirdOne/Track 3.jpg",
        src: "./Title/ThirdOne/Meteor Airlines - ANZWUM ⴰⵏⵣⵡⵓⵎ (Official Music Video).mp3"
    },
    {
        title: " L'morphine - Dokhana (Official Lyric Video)",
        artist: "L'morphine",
        cover: "./Title/Albume/Track 4.jpg",
        src: "./Title/Albume/L'morphine - Dokhana (Official Lyric Video).mp3"
    },
    {
        title: "Younes (Intro)",
        artist: "Nessyou",
        cover: "./Title/Albume/mqdefault.jpg",
        src: "./Title/Albume/Younes (Intro).mp3"
    },
];

let currentTrackIndex = 0;
const audio = new Audio(trackList[currentTrackIndex].src);
const trackCover = document.getElementById('track-cover');
const trackTitle = document.getElementById('track-title');
const trackArtist = document.getElementById('track-artist');
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const progress = document.getElementById('progress');
const durationDisplay = document.getElementById('duration');
const totalDurationDisplay = document.getElementById('total-duration');
const volumeControl = document.getElementById('volume');
const playlist = document.getElementById('playlist');

const loadTrack = (index) => {
    audio.src = trackList[index].src;
    trackCover.src = trackList[index].cover;
    trackTitle.textContent = trackList[index].title;
    trackArtist.textContent = trackList[index].artist;
    audio.onloadedmetadata = () => {
        totalDurationDisplay.textContent = formatTime(audio.duration);
    };
    updatePlaylistHighlight();
};

const playTrack = () => {
    audio.play();
    playButton.style.display = 'none';
    pauseButton.style.display = 'inline-block';
};

const pauseTrack = () => {
    audio.pause();
    playButton.style.display = 'inline-block';
    pauseButton.style.display = 'none';
};

const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
};

const updatePlaylistHighlight = () => {
    const playlistItems = playlist.getElementsByTagName('li');
    for (let i = 0; i < playlistItems.length; i++) {
        if (i === currentTrackIndex) {
            playlistItems[i].classList.add('active');
        } else {
            playlistItems[i].classList.remove('active');
        }
    }
};

playButton.addEventListener('click', playTrack);
pauseButton.addEventListener('click', pauseTrack);

prevButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + trackList.length) % trackList.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

nextButton.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % trackList.length;
    loadTrack(currentTrackIndex);
    playTrack();
});

audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progress.value = progressPercent;
    durationDisplay.textContent = formatTime(audio.currentTime);
});

progress.addEventListener('input', () => {
    const newTime = (progress.value / 100) * audio.duration;
    audio.currentTime = newTime;
});

volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Populate playlist
trackList.forEach((track, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<span class="playlist-icon">&#9658;</span> ${track.title} - ${track.artist}`; // &#9658; is the play icon
    li.addEventListener('click', () => {
        currentTrackIndex = index;
        loadTrack(currentTrackIndex);
        playTrack();
    });
    playlist.appendChild(li);
});


loadTrack(currentTrackIndex);
updatePlaylistHighlight();