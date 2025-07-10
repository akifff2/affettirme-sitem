// script.js -- SÜRÜM 3.0: İNTERAKTİF DESTAN

document.addEventListener('DOMContentLoaded', () => {
    // Ana Oyun Ekranı Mantığı
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    if (yesBtn && noBtn) {
        const question = document.getElementById('main-question');
        const vignette = document.getElementById('vignette-overlay');
        const noSound = document.getElementById('no-sound');
        
        let yesScale = 1;
        
        // "Hayır" butonu için fizik değişkenleri
        let posX = window.innerWidth / 2;
        let posY = window.innerHeight * 0.65;
        let velX = 0;
        let velY = 0;
        const damping = 0.95; // sürtünme
        const pushForce = 30;

        function updateNoButton() {
            // Fizik simülasyonu
            posX += velX;
            posY += velY;

            velX *= damping;
            velY *= damping;

            // Duvarlardan sekme
            if (posX < 50 || posX > window.innerWidth - 50) velX *= -1;
            if (posY < 50 || posY > window.innerHeight - 50) velY *= -1;

            noBtn.style.left = `${posX}px`;
            noBtn.style.top = `${posY}px`;

            requestAnimationFrame(updateNoButton);
        }

        noBtn.addEventListener('click', () => {
            // Sesi çal
            noSound.currentTime = 0;
            noSound.play();
            
            // "Evet" butonunu büyüt ve parlat
            yesScale += 0.2;
            yesBtn.style.transform = `translate(-50%, -50%) scale(${yesScale})`;
            yesBtn.style.boxShadow = `0 0 ${20 + (yesScale * 10)}px var(--glow)`;

            // "Hayır" butonuna rastgele bir itme kuvveti uygula
            const angle = Math.random() * Math.PI * 2;
            velX += Math.cos(angle) * pushForce;
            velY += Math.sin(angle) * pushForce;

            // Ekrana görsel geri bildirim ver
            vignette.style.boxShadow = 'inset 0 0 200px 50px rgba(0,0,0,0.5)';
            setTimeout(() => {
                vignette.style.boxShadow = 'inset 0 0 0 0 rgba(0,0,0,0)';
            }, 300);
        });

        yesBtn.addEventListener('click', () => {
             // 'finalURL' değişkeni HTML içindeki script'ten geliyor
             window.location.href = finalURL;
        });

        // Animasyonu başlat
        updateNoButton();
    }

    // Uzlaşma (Reconciliation) sayfası animasyonu
    const reconciliationSVG = document.querySelector('.reconciliation-container svg');
    if(reconciliationSVG) {
        // SVG çizim animasyonu CSS tarafından hallediliyor.
        const finalLink = document.querySelector('a.button');
        setTimeout(() => {
            finalLink.style.opacity = 1;
        }, 4000); // Çizim bittikten sonra buton görünsün
    }
});
