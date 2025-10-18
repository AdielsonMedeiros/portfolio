const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu-mobile');
const overlay = document.getElementById('overlay-menu');
const formulario = document.getElementById('form');
const title = document.querySelector('.title');
const prev = document.querySelector('.prev');
const playPause = document.querySelector('.playPause');
const next = document.querySelector('.next');
const audio = document.querySelector('audio');
const downloadCv = document.querySelector('.btn-contato a');
const volumeSlider = document.querySelector('.volume-slider');


audio.volume = 0.3;

const songList = [
    {
        path: "./msc/interstellar.mp3",
        songName: "interestelar",
    },
    {
        path: "./msc/LiveInTheSpirit.mp3",
        songName: "LiveInTheSpirit",
    },
    {
        path: "./msc/skyfall.mp3",
        songName: "skyfall",
    },
    {
        path: "./msc/snowfall.mp3",
        songName: "snowfall",
    },
    {
        path: "./msc/ComoTudoDeveSer.mp3",
        songName: "ComoTudoDeveSer",
    },
    {
        path: "./msc/redbone.mp3",
        songName: "redbone",
    },
    {
        path: "./msc/LittleDarkAge.mp3",
        songName: "LittleDarkAge",
    },
    {
        path: "./msc/MidnightCity.mp3",
        songName: "MidnightCity",
    },
    {
        path: "./msc/SultansOfSwing.mp3",
        songName: "SultansOfSwing",
    },
    {
        path: "./msc/Consagração.mp3",
        songName: "Consagração",
    },
];

let song_Playing = false;

function playSong(){
    song_Playing = true;
    audio.play();
    playPause.classList.add('active');
    playPause.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
}

function pauseSong(){
    song_Playing = false;
    audio.pause();
    playPause.classList.remove('active');
    playPause.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
}

if (playPause) {
    playPause.addEventListener("click", () => (song_Playing ? pauseSong() : playSong()));
}


if (volumeSlider) {
    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
    });
}

function loadSong(songList){
    title.textContent = songList.songName;
    audio.src = songList.path;
}

let i = 0;

if (audio && title) {
    loadSong(songList[i]);
}

function prevSong(){
    i--;
    if (i < 0){
        i = songList.length - 1;
    }
    loadSong(songList[i]);
    playSong();
}
if (prev) {
    prev.addEventListener("click", prevSong);
}

function nextSong(){
    i++;
    if (i > songList.length - 1){
        i = 0;
    }
    loadSong(songList[i]);
    playSong();
}
if (next) {
    next.addEventListener("click", nextSong);
}

downloadCv.addEventListener('click', function(event) {
    event.preventDefault();
    fetch('./cv').then(function(t) {
        return t.blob().then((b) => {
            let a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", "Adielson_CV.pdf");
            a.click();
        });
    });
});

btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu');
});

menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
});

overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu');
});

ScrollReveal().reveal('.interface', {
    duration: 1500,
    reset: false
});

const btnUp = document.querySelector('.btn-up');

function checkScrollPosition() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    
    if (windowHeight + scrollY >= bodyHeight - 1) {
        btnUp.classList.add('show');
    } else {
        btnUp.classList.remove('show');
    }
}

window.addEventListener('scroll', checkScrollPosition);


function espalharEstrelas() {
    const estrelas = document.querySelectorAll('.bolhas span');
    
    estrelas.forEach(estrela => {
        const posicaoHorizontal = Math.random() * 100;
        const atrasoAnimacao = Math.random() * 20;
        const duracaoAnimacao = 20 + Math.random() * 10;

        estrela.style.left = `${posicaoHorizontal}%`;
        estrela.style.animationDelay = `${atrasoAnimacao}s`;
        estrela.style.animationDuration = `${duracaoAnimacao}s`;
    });
}

document.addEventListener('DOMContentLoaded', espalharEstrelas);