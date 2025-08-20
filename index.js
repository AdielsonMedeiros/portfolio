

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
            a.setAttribute("download", "/cv/CV - Adielson Medeiros dos Santos.pdf");
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

ScrollReveal().reveal('.interface', {
    duration: 3000,
    reset:true

});


// 1. Seleciona o elemento do botão no HTML
const btnUp = document.querySelector('.btn-up');

// 2. Cria a função que será executada a cada rolagem da tela
function checkScrollPosition() {
  // Variáveis para o cálculo
  const windowHeight = window.innerHeight; // Altura da janela visível
  const scrollY = window.scrollY; // O quanto já foi rolado para baixo
  const bodyHeight = document.body.offsetHeight; // Altura total do corpo da página

  // 3. A condição para saber se chegou ao final
  // (com uma pequena tolerância de 1px para garantir)
  if (windowHeight + scrollY >= bodyHeight - 1) {
    // Se chegou ao final, adiciona a classe 'show' para mostrar o botão
    btnUp.classList.add('show');
  } else {
    // Se não, remove a classe 'show' para esconder o botão
    btnUp.classList.remove('show');
  }
}

// 4. Adiciona o "ouvinte" de evento de rolagem
window.addEventListener('scroll', checkScrollPosition);

