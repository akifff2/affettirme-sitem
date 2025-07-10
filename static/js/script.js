// script.js -- "HATASIZ KURGU" VERSİYONU

document.addEventListener('DOMContentLoaded', () => {

    // --- GENEL FONKSİYONLAR ---
    // Daktilo efekti fonksiyonu, bir değişiklik yok, ama burada olması önemli.
    function typeWriter(element, text, callback) {
        if (!element) return;
        let i = 0;
        const cursorSpan = '<span class="typewriter-cursor">|</span>';
        
        function type() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + cursorSpan;
                i++;
                setTimeout(type, 100);
            } else {
                element.innerHTML = text; // Yazı bittiğinde imleci kaldır
                if (callback) callback();
            }
        }
        type();
    }


    // --- KARAR EKRANI MANTIĞI ('2_decision.html') ---
    const decisionContainer = document.querySelector('.decision-container');
    if (decisionContainer) {
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        const titleElement = document.querySelector('.typewriter');

        // Butonların tıklama olaylarını yönetecek fonksiyonları önceden tanımla
        function handleNoClick(event) {
            // Dalga efekti
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            document.body.appendChild(ripple);
            ripple.style.top = `${event.clientY}px`;
            ripple.style.left = `${event.clientX}px`;
            setTimeout(() => ripple.remove(), 1000);

            // "Evet" butonunu büyüt
            let currentScale = parseFloat(yesBtn.style.transform.replace(/[^0-9.]/g, '')) || 1.2;
            let newScale = currentScale + 0.4;
            yesBtn.style.transform = `translate(-50%, -50%) scale(${newScale})`;
            yesBtn.style.boxShadow = `0 0 35px var(--glow-color)`;

            // "Hayır" butonunu kaçır
            const buttonArea = document.getElementById('button-area');
            if(buttonArea){
                const areaRect = buttonArea.getBoundingClientRect();
                const newTop = Math.random() * (areaRect.height - noBtn.offsetHeight);
                const newLeft = Math.random() * (areaRect.width - noBtn.offsetWidth);
                
                noBtn.style.position = 'absolute';
                noBtn.style.top = `${newTop}px`;
                noBtn.style.left = `${newLeft}px`;
            }
        }

        function handleYesClick() {
            // Diğer tıklamaları engelle
            yesBtn.removeEventListener('click', handleYesClick);
            noBtn.removeEventListener('click', handleNoClick);

            document.body.style.transition = 'opacity 1.5s ease-in';
            document.body.style.opacity = 0;
            
            // RECONCILIATION_URL, 2_decision.html'deki script bloğundan geliyor
            setTimeout(() => {
                window.location.href = RECONCILIATION_URL;
            }, 1500);
        }
        
        // Animasyon Akışı
        function startDecisionScene() {
            // 1. Daktilo yazısını başlat
            // TEXT_TO_TYPE, 2_decision.html'den geliyor
            typeWriter(titleElement, TEXT_TO_TYPE, () => {
                // 2. Yazı bittikten sonra butonları görünür yap
                yesBtn.style.visibility = 'visible';
                noBtn.style.visibility = 'visible';
                yesBtn.style.opacity = 1;
                noBtn.style.opacity = 1;
                
                // 3. Butonlar göründükten SONRA tıklama olaylarını bağla. Bu en kritik düzeltme.
                yesBtn.addEventListener('click', handleYesClick);
                noBtn.addEventListener('click', handleNoClick);
            });
        }
        
        // Sahneyi başlatmadan önce butonları hazırla ama gizle
        yesBtn.style.visibility = 'hidden';
        noBtn.style.visibility = 'hidden';
        yesBtn.style.opacity = 0;
        noBtn.style.opacity = 0;
        yesBtn.style.transition = 'opacity 0.5s 0.5s';
        noBtn.style.transition = 'opacity 0.5s 0.5s';


        // Her şey yüklendikten 1 saniye sonra sahneyi başlat
        setTimeout(startDecisionScene, 1000);
    }


    // --- UZLAŞMA EKRANI MEKANİKLERİ ('3_reconciliation.html') ---
    const kintsugiHeart = document.getElementById('kintsugi-heart');
    if (kintsugiHeart) {
        const title = document.getElementById('reconciliation-title');
        const finaleLink = document.getElementById('finale-link');

        kintsugiHeart.addEventListener('click', () => {
            kintsugiHeart.classList.add('repaired');
            title.textContent = "Birlikte daha güçlüyüz...";
            finaleLink.style.opacity = '1';
            finaleLink.style.pointerEvents = 'auto';
        }, { once: true });
    }

});
