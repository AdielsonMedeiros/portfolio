// ==========================================
// CONFIGURAÇÃO INICIAL E HELPERS
// ==========================================

// Helper para event listeners com null check
const addListener = (element, event, handler, options) => {
    if (element) element.addEventListener(event, handler, options);
};

// ==========================================
// PLAYER DE MÚSICA
// ==========================================

const title = document.querySelector('.title');
const prev = document.querySelector('.prev');
const playPause = document.querySelector('.playPause');
const next = document.querySelector('.next');
const audio = document.querySelector('audio');

if (audio) audio.volume = 0.3;

const songList = [
    { path: "./msc/interstellar.mp3", songName: "interestelar" },
    { path: "./msc/LiveInTheSpirit.mp3", songName: "LiveInTheSpirit" },
    { path: "./msc/skyfall.mp3", songName: "skyfall" },
    { path: "./msc/snowfall.mp3", songName: "snowfall" },
    { path: "./msc/ComoTudoDeveSer.mp3", songName: "ComoTudoDeveSer" },
    { path: "./msc/redbone.mp3", songName: "redbone" },
    { path: "./msc/LittleDarkAge.mp3", songName: "LittleDarkAge" },
    { path: "./msc/MidnightCity.mp3", songName: "MidnightCity" },
    { path: "./msc/SultansOfSwing.mp3", songName: "SultansOfSwing" },
    { path: "./msc/Consagração.mp3", songName: "Consagração" }
];

let songIndex = 0;
let songPlaying = false;

const playSong = () => {
    if (!audio) return;
    songPlaying = true;
    audio.play();
    if (playPause) {
        playPause.classList.add('active');
        playPause.innerHTML = '<ion-icon name="pause-outline"></ion-icon>';
    }
};

const pauseSong = () => {
    if (!audio) return;
    songPlaying = false;
    audio.pause();
    if (playPause) {
        playPause.classList.remove('active');
        playPause.innerHTML = '<ion-icon name="play-outline"></ion-icon>';
    }
};

const loadSong = (song) => {
    if (title) title.textContent = song.songName;
    if (audio) audio.src = song.path;
};

const navigateSong = (direction) => {
    songIndex = (songIndex + direction + songList.length) % songList.length;
    loadSong(songList[songIndex]);
    playSong();
};

// Event listeners
addListener(playPause, "click", () => songPlaying ? pauseSong() : playSong());
addListener(prev, "click", () => navigateSong(-1));
addListener(next, "click", () => navigateSong(1));

// Inicializa primeira música
if (audio && title) loadSong(songList[songIndex]);

// ==========================================
// DOWNLOAD CV
// ==========================================

const downloadCv = document.querySelector('.btn-contato a');
addListener(downloadCv, 'click', (event) => {
    event.preventDefault();
    fetch('./cv')
        .then(response => response.blob())
        .then(blob => {
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = "Adielson_CV.pdf";
            a.click();
            URL.revokeObjectURL(a.href);
        });
});

// ==========================================
// MENU MOBILE
// ==========================================

const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu-mobile');
const overlay = document.getElementById('overlay-menu');

const closeMenu = () => menu?.classList.remove('abrir-menu');

addListener(btnMenu, 'click', () => menu?.classList.add('abrir-menu'));
addListener(menu, 'click', closeMenu);
addListener(overlay, 'click', closeMenu);

// ==========================================
// GSAP & LENIS SETUP (PREMIUM ANIMATIONS)
// ==========================================

// Initialize Lenis for smooth scrolling
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
    direction: 'vertical',
    gestureDirection: 'vertical',
    smoothTouch: false,
    touchMultiplier: 2,
});

function raf(time) {
    lenis.raf(time);
    ScrollTrigger.update(); // Sync ScrollTrigger with Lenis
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation (Timeline)
const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.5 } });

// Staggered reveal for Hero Content
tl.from('.logo', { y: -20, opacity: 0, duration: 1 })
  .from('.menu-desktop li', { y: -20, opacity: 0, stagger: 0.1 }, "-=0.8")
  .from('.txt-topo-site h1', { y: 50, opacity: 0, skewY: 5 }, "-=0.5")
  .from('.txt-topo-site p', { y: 30, opacity: 0 }, "-=1.2")
  .from('.btn-contato-topo', { scale: 0.8, opacity: 0 }, "-=1.2")
  .from('.img-topo-site', { x: 100, opacity: 0, duration: 2 }, "-=1.5")
  .from('.bolhas span', { opacity: 0, duration: 2 }, "-=1.5")
  .from('.astronaut-hands', { opacity: 0, duration: 2.5 }, "-=2.0");

// General Scroll Animations for Sections
const sections = document.querySelectorAll('.interface');

sections.forEach((section, index) => {
    // Skip header and hero (already animated by timeline)
    if (index < 2) return; 

    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: "top 85%", // Starts when top of element is 85% down viewport
            toggleActions: "play none none none" // Anima apenas uma vez, nao reverte
        },
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });
});

// ==========================================
// BOTÃO VOLTAR AO TOPO
// ==========================================

const btnUp = document.querySelector('.btn-up');

const checkScrollPosition = () => {
    if (!btnUp) return;
    const atBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 1;
    btnUp.classList.toggle('show', atBottom);
};

addListener(window, 'scroll', checkScrollPosition, { passive: true });

// ==========================================
// ANIMAÇÃO DAS ESTRELAS
// ==========================================

const espalharEstrelas = () => {
    document.querySelectorAll('.bolhas span').forEach(estrela => {
        estrela.style.left = `${Math.random() * 100}%`;
        estrela.style.animationDelay = `${Math.random() * 20}s`;
        estrela.style.animationDuration = `${20 + Math.random() * 10}s`;
    });
};

document.addEventListener('DOMContentLoaded', espalharEstrelas);

// ==========================================
// THEME SWITCHER
// ==========================================

const themeToggle = document.getElementById('theme-toggle');
const themeToggleMobile = document.getElementById('theme-toggle-mobile');
const themeLabelDesktop = document.getElementById('theme-label-desktop');
const themeLabelMobile = document.getElementById('theme-label-mobile');
const body = document.body;

// Sempre inicia no tema normal (colorido)
// Remove a classe mono-theme se existir
body.classList.remove('mono-theme');
if (themeToggle) themeToggle.checked = false;
if (themeToggleMobile) themeToggleMobile.checked = false;
if (themeLabelDesktop) themeLabelDesktop.textContent = 'Mono';
if (themeLabelMobile) themeLabelMobile.textContent = 'Mono';
localStorage.setItem('theme', 'color');

// Função para mudar o tema com transição suave
const changeTheme = (isChecked) => {
    // Cria overlay de transição
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0;
        transition: opacity 0.4s ease;
        z-index: 999999;
        pointer-events: none;
    `;
    document.body.appendChild(overlay);

    // Fade in
    requestAnimationFrame(() => {
        overlay.style.opacity = '0.7';
    });

    setTimeout(() => {
        // Muda o tema
        body.classList.toggle('mono-theme', isChecked);
        localStorage.setItem('theme', isChecked ? 'mono' : 'color');

        const label = isChecked ? 'Normal' : 'Mono';
        if (themeLabelDesktop) themeLabelDesktop.textContent = label;
        if (themeLabelMobile) themeLabelMobile.textContent = label;

        // Sincronizar toggles
        if (themeToggle) themeToggle.checked = isChecked;
        if (themeToggleMobile) themeToggleMobile.checked = isChecked;

        // Fade out
        setTimeout(() => {
            overlay.style.opacity = '0';

            // Remove overlay
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 400);
        }, 100);
    }, 400);
};

// Event listeners
addListener(themeToggle, 'change', () => changeTheme(themeToggle.checked));
addListener(themeToggleMobile, 'change', () => changeTheme(themeToggleMobile.checked));
addListener(themeLabelDesktop, 'click', () => changeTheme(!themeToggle?.checked));
addListener(themeLabelMobile, 'click', () => changeTheme(!themeToggleMobile?.checked));

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
    let itemsPerView = window.innerWidth <= 1020 ? 1 : 3;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;

    const updateDots = () => {
        const dots = document.querySelectorAll('.dot');
        const activeIndex = Math.floor(currentIndex / itemsPerView);
        dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
    };

    const updateCarousel = () => {
        const gap = window.innerWidth <= 1020 ? 0 : 30;
        const totalGaps = gap * (itemsPerView - 1);
        const itemWidth = (carouselTrack.offsetWidth - totalGaps) / itemsPerView;
        const translateX = -(currentIndex * (itemWidth + gap));
        carouselTrack.style.transform = `translateX(${translateX}px)`;
        updateDots();
    };

    const createDots = () => {
        if (!dotsContainer) return;
        dotsContainer.innerHTML = '';
        const totalDots = Math.ceil(carouselItems.length / itemsPerView);

        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                currentIndex = i * itemsPerView;
                if (currentIndex >= carouselItems.length) {
                    currentIndex = carouselItems.length - itemsPerView;
                }
                updateCarousel();
            });
            dotsContainer.appendChild(dot);
        }
    };

    const navigateSlide = (direction) => {
        if (direction > 0) {
            currentIndex = currentIndex < carouselItems.length - itemsPerView ? currentIndex + itemsPerView : 0;
        } else {
            currentIndex = currentIndex > 0 ? currentIndex - itemsPerView : Math.floor((carouselItems.length - 1) / itemsPerView) * itemsPerView;
        }
        updateCarousel();
    };

    const updateItemsPerView = () => {
        itemsPerView = window.innerWidth <= 1020 ? 1 : 3;
        if (currentIndex >= carouselItems.length - itemsPerView) {
            currentIndex = Math.max(0, carouselItems.length - itemsPerView);
        }
        createDots();
        updateCarousel();
    };

    // Event listeners
    addListener(nextBtn, 'click', () => navigateSlide(1));
    addListener(prevBtn, 'click', () => navigateSlide(-1));

    // Touch/swipe support
    carouselTrack.addEventListener('touchstart', (e) => {
        isDragging = true;
        startPos = e.touches[0].clientX;
        carouselTrack.style.transition = 'none';
    }, { passive: true });

    carouselTrack.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        currentTranslate = prevTranslate + e.touches[0].clientX - startPos;
    }, { passive: true });

    carouselTrack.addEventListener('touchend', () => {
        isDragging = false;
        const movedBy = currentTranslate - prevTranslate;

        if (movedBy < -50 && currentIndex < carouselItems.length - itemsPerView) navigateSlide(1);
        if (movedBy > 50 && currentIndex > 0) navigateSlide(-1);

        carouselTrack.style.transition = 'transform 0.5s ease';
        prevTranslate = currentTranslate;
    });

    // Navegação por teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') navigateSlide(-1);
        if (e.key === 'ArrowRight') navigateSlide(1);
    });

    // Resize com debounce
    let resizeTimeout;
    addListener(window, 'resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateItemsPerView, 250);
    });

    // ==========================================
    // AUTOPLAY INTELIGENTE
    // ==========================================
    let autoplayInterval;
    const AUTOPLAY_DELAY = 5000; // 5 segundos

    const startAutoplay = () => {
        stopAutoplay(); // Limpa qualquer intervalo anterior
        autoplayInterval = setInterval(() => {
            navigateSlide(1); // Avança para o próximo
        }, AUTOPLAY_DELAY);
    };

    const stopAutoplay = () => {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    };

    // Pausa no hover (mouse)
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoplay);
        carouselContainer.addEventListener('mouseleave', startAutoplay);
        
        // Pausa no toque (mobile)
        carouselContainer.addEventListener('touchstart', stopAutoplay, { passive: true });
        carouselContainer.addEventListener('touchend', () => {
            // Delay para reiniciar após interação
            setTimeout(startAutoplay, 2000);
        }, { passive: true });
    }

    // Iniciar autoplay
    startAutoplay();

    // Inicializar
    createDots();
    updateItemsPerView();
}

// ==========================================
// ROTAÇÃO 360 GRAUS - BILLY COM TROCA DE IMAGEM
// ==========================================

const imgTopoSite = document.querySelector('.img-topo-site img');

if (imgTopoSite) {
    let isImageChanged = false;
    let isAnimating = false;

    const rotateAndChangeImage = (newSrc, newAlt, rotation) => {
        if (isAnimating) return;
        isAnimating = true;

        // Remove animação de flutuação
        imgTopoSite.style.animation = 'none';
        imgTopoSite.offsetHeight; // Force reflow

        // Rotação
        imgTopoSite.style.transform = `rotate(${rotation}deg)`;

        // Fade out na metade da rotação
        setTimeout(() => imgTopoSite.style.opacity = '0', 400);

        // Troca de imagem
        setTimeout(() => {
            imgTopoSite.src = newSrc;
            imgTopoSite.alt = newAlt;
            imgTopoSite.style.transform = 'rotate(0deg)';

            setTimeout(() => imgTopoSite.style.opacity = '1', 50);

            imgTopoSite.style.animation = 'flutuar 3s ease-in-out infinite alternate';
            isImageChanged = !isImageChanged;
            isAnimating = false;
        }, 800);
    };

    addListener(imgTopoSite, 'mouseenter', () => {
        if (!isImageChanged) {
            rotateAndChangeImage('img/fotonova.jpeg', 'Adielson Medeiros', 360);
        }
    });

    addListener(imgTopoSite, 'mouseleave', () => {
        if (isImageChanged) {
            rotateAndChangeImage('img/billypf.png', 'billy programador', -360);
        }
    });
}

// ==========================================
// ROTAÇÃO 360 GRAUS - ASTRONAUTA
// ==========================================

const imgSobre = document.querySelector('.img-sobre img');

if (imgSobre) {
    let isRotating = false;

    addListener(imgSobre, 'mouseenter', () => {
        if (isRotating) return;
        isRotating = true;

        imgSobre.style.animation = 'none';
        imgSobre.offsetHeight; // Force reflow
        imgSobre.style.transform = 'rotate(360deg)';

        setTimeout(() => {
            imgSobre.style.transform = 'rotate(0deg)';
            imgSobre.style.animation = 'flutuar 4s ease-in-out infinite alternate';
            isRotating = false;
        }, 800);
    });
}

// ==========================================
// HEADER DINÂMICO (INTERATIVIDADE MOUSE/SCROLL)
// ==========================================

const header = document.querySelector('header');
let mouseY = 0;

const checkHeaderVisibility = () => {
    if (!header) return;
    
    // Altura da região de ativação (em pixels)
    const hoverThreshold = 100;
    
    // Verifica se está no topo da página
    const isAtTop = window.scrollY < 50;
    
    // Verifica se o mouse está na região superior
    const isHoveringTop = mouseY < hoverThreshold;
    
    // Lógica: Mostrar se estiver no topo da página OU se o mouse estiver na área superior
    if (isAtTop || isHoveringTop) {
        header.classList.remove('header-hidden');
    } else {
        header.classList.add('header-hidden');
    }
};

// Atualiza posição do mouse e verifica visibilidade
document.addEventListener('mousemove', (e) => {
    mouseY = e.clientY;
    checkHeaderVisibility();
});

// Verifica visibilidade ao rolar a página
document.addEventListener('scroll', () => {
    checkHeaderVisibility();
}, { passive: true });

// Garante que o estado correto seja aplicado ao carregar
checkHeaderVisibility();
