

const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu-mobile');
const overlay = document.getElementById('overlay-menu');
const formulario = document.getElementById('form');
const title = document.querySelector('.title');
const prev = document.querySelector('.prev');
const playPause = document.querySelector('.playPause');
const next = document.querySelector('.next');
const audio = document.querySelector('audio');
const downloadCv= document.querySelector('.btn-contato')

const songList = [
    {
        path: "./msc/interstellar.mp3",
        songName: "interestelar",

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

playPause.addEventListener("click", ()=>(song_Playing ? pauseSong(): playSong()))

function loadSong(songList){
    title.textContent = songList.songName;
    audio.src = songList.path;

}

let i = 0;


loadSong(songList[i]);

function prevSong(){
    i--;
    if(i < 0){
        i = songList.length - 1;
    }
    loadSong(songList[i]);
    playSong();
}
prev.addEventListener("click", prevSong);


function nextSong(){
    i++;
    if(i > songList.length -1){
        i = 0;
    }
    loadSong(songList[i]);
    playSong();
}
next.addEventListener("click", nextSong);

/* download do cv */

downloadCv.addEventListener('click', function(event) {
    event.preventDefault();

    fetch('./cv').then(function(t) {
        return t.blob().then((b)=>{
            let a = document.createElement("a");
            a.href = URL.createObjectURL(b);
            a.setAttribute("download", "AdielsonCV.pdf");
            a.click();
        }
        );
    });
});


btnMenu.addEventListener('click', () => {
    menu.classList.add('abrir-menu')
})


menu.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

overlay.addEventListener('click', () => {
    menu.classList.remove('abrir-menu')
})

// form

