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

// Helper para event listeners com null check
function addListener(element, event, handler) {
    if (element) element.addEventListener(event, handler);
}

addListener(playPause, "click", () => (song_Playing ? pauseSong() : playSong()));
addListener(volumeSlider, 'input', () => audio.volume = volumeSlider.value);

function loadSong(songList){
    title.textContent = songList.songName;
    audio.src = songList.path;
}

let i = 0;

if (audio && title) {
    loadSong(songList[i]);
}

// Navegação de músicas consolidada
function navigateSong(direction) {
    i += direction;
    if (i < 0) i = songList.length - 1;
    if (i >= songList.length) i = 0;
    loadSong(songList[i]);
    playSong();
}

addListener(prev, "click", () => navigateSong(-1));
addListener(next, "click", () => navigateSong(1));

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

// Menu mobile
function closeMenu() {
    menu.classList.remove('abrir-menu');
}

btnMenu.addEventListener('click', () => menu.classList.add('abrir-menu'));
menu.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);

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

// Theme Switcher
const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeLabelDesktop = document.getElementById('theme-label-desktop');
const themeLabelMobile = document.getElementById('theme-label-mobile');
const body = document.body;

// Verificar se há tema salvo no localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'mono') {
    body.classList.add('mono-theme');
    if (themeToggle) themeToggle.checked = true;
    if (themeToggleMobile) themeToggleMobile.checked = true;
    if (themeLabelDesktop) themeLabelDesktop.textContent = 'Normal';
    if (themeLabelMobile) themeLabelMobile.textContent = 'Normal';
}

// Função para mudar o tema
function changeTheme(isChecked) {
    if (isChecked) {
        body.classList.add('mono-theme');
        localStorage.setItem('theme', 'mono');
        if (themeLabelDesktop) themeLabelDesktop.textContent = 'Normal';
        if (themeLabelMobile) themeLabelMobile.textContent = 'Normal';
    } else {
        body.classList.remove('mono-theme');
        localStorage.setItem('theme', 'color');
        if (themeLabelDesktop) themeLabelDesktop.textContent = 'Mono';
        if (themeLabelMobile) themeLabelMobile.textContent = 'Mono';
    }
    // Sincronizar os dois toggles
    if (themeToggle) themeToggle.checked = isChecked;
    if (themeToggleMobile) themeToggleMobile.checked = isChecked;
}

// Helper para adicionar event listeners
function addThemeListener(element, event, callback) {
    if (element) element.addEventListener(event, callback);
}

// Event listeners para theme switcher
addThemeListener(themeToggle, 'change', () => changeTheme(themeToggle.checked));
addThemeListener(themeToggleMobile, 'change', () => changeTheme(themeToggleMobile.checked));
addThemeListener(themeLabelDesktop, 'click', () => changeTheme(!themeToggle.checked));
addThemeListener(themeLabelMobile, 'click', () => changeTheme(!themeToggleMobile.checked));

// ==========================================
// CARROSSEL DE PORTFÓLIO
// ==========================================

const carouselTrack = document.querySelector('.carousel-track');
const carouselItems = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dotsContainer = document.querySelector('.carousel-dots');

if (carouselTrack && carouselItems.length > 0) {
    let currentIndex = 0;
    let itemsPerView = 3; // Desktop padrão
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    // Função para atualizar itemsPerView baseado na largura da tela
    function updateItemsPerView() {
        if (window.innerWidth <= 1020) {
            itemsPerView = 1;
        } else {
            itemsPerView = 3;
        }
        updateCarousel();
    }

    // Criar dots
    function createDots() {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(carouselItems.length / itemsPerView);

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    // Atualizar dots ativos
    function updateDots() {
        const dots = document.querySelectorAll('.dot');
        const activeIndex = Math.floor(currentIndex / itemsPerView);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeIndex);
        });
    }

    // Atualizar carrossel
    function updateCarousel() {
        const gap = window.innerWidth <= 1020 ? 0 : 30;
        const totalGaps = gap * (itemsPerView - 1);
        const itemWidth = (carouselTrack.offsetWidth - totalGaps) / itemsPerView;
        const translateX = -(currentIndex * (itemWidth + gap));
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        updateDots();
    }

    // Ir para slide específico
    function goToSlide(dotIndex) {
        currentIndex = dotIndex * itemsPerView;
        if (currentIndex >= carouselItems.length) {
            currentIndex = carouselItems.length - itemsPerView;
        }
        updateCarousel();
    }

    // Navegação do carrossel consolidada
    function navigateSlide(direction) {
        if (direction > 0) {
            currentIndex = currentIndex < carouselItems.length - itemsPerView ? currentIndex + itemsPerView : 0;
        } else {
            currentIndex = currentIndex > 0 ? currentIndex - itemsPerView : Math.floor((carouselItems.length - 1) / itemsPerView) * itemsPerView;
        }
        updateCarousel();
    }

    // Event listeners para botões
    addListener(nextBtn, 'click', () => navigateSlide(1));
    addListener(prevBtn, 'click', () => navigateSlide(-1));

    // Suporte a touch/swipe
    carouselTrack.addEventListener('touchstart', (e) => {
        isDragging = true;
        startPos = e.touches[0].clientX;
        carouselTrack.style.transition = 'none';
    });

    carouselTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const currentPosition = e.touches[0].clientX;
        currentTranslate = prevTranslate + currentPosition - startPos;
    });

    carouselTrack.addEventListener('touchend', () => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < carouselItems.length - itemsPerView) {
            navigateSlide(1);
        }

        if (movedBy > 50 && currentIndex > 0) {
            navigateSlide(-1);
        }

        carouselTrack.style.transition = 'transform 0.5s ease';
        prevTranslate = currentTranslate;
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') navigateSlide(-1);
        if (e.key === 'ArrowRight') navigateSlide(1);
    });

    // Inicializar
    createDots();
    updateItemsPerView();

    // Atualizar ao redimensionar
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const oldItemsPerView = itemsPerView;
            updateItemsPerView();

            // Resetar índice se necessário
            if (currentIndex >= carouselItems.length - itemsPerView) {
                currentIndex = Math.max(0, carouselItems.length - itemsPerView);
            }

            createDots();
        }, 250);
    });
}