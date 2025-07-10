// script.js -- SÜRÜM 2.1: HATA AYIKLANMIŞ VE SAĞLAMLAŞTIRILMIŞ

// --- PRELOADER ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }
});

// --- TYPEWRITER EFFECT ---
function typeWriter(element, text, speed) {
    if (!element) return; // Element yoksa fonksiyonu durdur
    let i = 0;
    element.innerHTML = "";
    const cursor = '<span class="cursor"></span>';
    element.innerHTML = cursor;

    function type() {
        if (i < text.length) {
            element.innerHTML = text.substring(0, i + 1) + cursor;
            i++;
            setTimeout(type, speed);
        } else {
            if (element.querySelector('.cursor')) {
                element.querySelector('.cursor').style.animation = 'blink 1s infinite';
            }
        }
    }
    type();
}


document.addEventListener('DOMContentLoaded', () => {

    // --- SORU SAYFASI MANTIĞI ---
    const yesBtn = document.getElementById('yes-btn');
    if (yesBtn) { // Sadece main.html'de çalışsın diye kontrol
        const noBtn = document.getElementById('no-btn');
        const questionContainer = document.getElementById('question-container');
        const quoteArea = document.getElementById('quote-area');
        const finalUrlData = document.getElementById('final-url-data');

        if(noBtn && questionContainer && quoteArea && finalUrlData) { // Tüm elementlerin varlığını kontrol et
            let noClickCount = 0;
            let yesButtonSize = 1;

            const forgivenessQuotes = [
                "Lütfen... Son bir şans.", "Sensiz bir saniyem bile geçmiyor.",
                "Yaptığım hatanın farkındayım, telafi etmeme izin ver.",
                "Bu kalp sadece senin için atıyor.", "Gözlerin aklımdan çıkmıyor.",
                "Evet demen için her şeyi yaparım.", "Hadi ama, bu kadar inat etme :)",
                "Bak buton bile benden yana, kaçıp duruyor.", "Aşkımız bunu hak etmiyor."
            ];

            noBtn.addEventListener('click', () => {
                noClickCount++;
                yesButtonSize += 0.4;
                yesBtn.style.transform = `scale(${yesButtonSize})`;
                noBtn.style.opacity = Math.max(0, 1 - noClickCount * 0.15);

                const randomIndex = Math.floor(Math.random() * forgivenessQuotes.length);
                quoteArea.textContent = forgivenessQuotes[randomIndex];
                quoteArea.style.opacity = 1;
                
                if (navigator.vibrate) navigator.vibrate(100);

                const randomX = Math.random() * (window.innerWidth - noBtn.offsetWidth) - (questionContainer.offsetLeft || 0);
                const randomY = Math.random() * (window.innerHeight - noBtn.offsetHeight) - (questionContainer.offsetTop || 0);
                noBtn.style.position = 'absolute';
                noBtn.style.left = `${randomX}px`;
                noBtn.style.top = `${randomY}px`;

                if (noClickCount >= 7) {
                    noBtn.style.display = 'none';
                    createHeartRain();
                }
            });

            yesBtn.addEventListener('click', () => {
                const preloader = document.getElementById('preloader') || document.createElement('div');
                preloader.id = "preloader";
                preloader.innerHTML = '<div class="heart">❤️</div>';
                document.body.appendChild(preloader);
                preloader.style.opacity = '1';
                preloader.style.visibility = 'visible';

                setTimeout(() => {
                    window.location.href = finalUrlData.dataset.url;
                }, 1000);
            });
            
            function createHeartRain() {
                quoteArea.textContent = "Tek bir seçenek var, o da AŞK! ❤️";
                const rainInterval = setInterval(() => {
                    const heart = document.createElement('div');
                    heart.innerText = '❤️';
                    heart.style.position = 'fixed';
                    heart.style.top = '-50px';
                    heart.style.left = `${Math.random() * 100}vw`;
                    heart.style.fontSize = `${Math.random() * 2 + 1}rem`;
                    heart.style.animation = `fall ${Math.random() * 4 + 5}s linear forwards`;
                    heart.style.zIndex = 0;
                    document.body.appendChild(heart);
                }, 150);
                 const styleSheet = document.createElement("style");
                 styleSheet.innerText = `@keyframes fall { from { top: -10vh; } to { top: 110vh; transform: rotate(${Math.random() * 720 - 360}deg); } }`;
                 document.head.appendChild(styleSheet);
            }
        }
    }

    // --- FİNAL SAYFASI MANTIĞI ---
    const noteElement = document.getElementById('typed-note');
    if (noteElement) { // Sadece final.html'de çalışsın diye kontrol
        const textToType = noteElement.dataset.note;
        if(textToType) {
            setTimeout(() => typeWriter(noteElement, textToType, 80), 1000);
        }

        const music = document.getElementById('romantic-song');
        const musicControl = document.getElementById('music-control');

        if(music && musicControl) {
            musicControl.addEventListener('click', () => {
                if (music.paused) {
                    music.play();
                    musicControl.innerHTML = '❚❚';
                } else {
                    music.pause();
                    musicControl.innerHTML = '▶';
                }
            });
            
            music.play().catch(() => {
                musicControl.innerHTML = '▶';
            });
        }
    }

    // --- PANEL SAYFASI MANTIĞI ---
    const generatedLinkInput = document.getElementById('generated-link');
    if (generatedLinkInput) { // Sadece panel.html'de çalışsın diye kontrol
        // Kopyalama fonksiyonu panel.html içinde olduğu için burada ek bir şeye gerek yok.
    }

    // --- Parçacık Efekti (particles.js) ---
    // Bu kütüphanenin bazen yüklenmemesi diğer scriptleri bozabilir.
    // Bunu en sona ve güvenli bir şekilde ekleyelim.
    if (document.getElementById('particles-js')) {
        const particlesScript = document.createElement('script');
        particlesScript.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
        particlesScript.onload = () => {
             particlesJS('particles-js', { /* particles.js config objesi buraya gelecek */ 
                "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.4, "random": true, "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false } }, "size": { "value": 2.5, "random": true, "anim": { "enable": false } }, "line_linked": { "enable": false }, "move": { "enable": true, "speed": 0.5, "direction": "none", "random": true, "straight": false, "out_mode": "out", "bounce": false } }, "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "bubble" }, "onclick": { "enable": false } }, "modes": { "bubble": { "distance": 250, "size": 4, "duration": 2, "opacity": 0.8 } } }, "retina_detect": true 
            });
        };
        particlesScript.onerror = () => {
            console.error("particles.js yüklenemedi. Efekt devre dışı.");
        };
        document.body.appendChild(particlesScript);
    }
});
