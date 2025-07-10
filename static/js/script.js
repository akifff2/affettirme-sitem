// script.js -- "ÖZEL VERSİYON" (HATALAR DÜZELTİLDİ + YENİ EFEKTLER)

document.addEventListener('DOMContentLoaded', () => {

    // --- DAKTİLO EFEKTİ FONKSİYONU ---
    function typeWriter(element, text, onComplete) {
        if (!element) return;
        let i = 0;
        element.innerHTML = "";
        const cursor = '<span class="typewriter-cursor">|</span>';
        
        function type() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + cursor;
                i++;
                setTimeout(type, 100); // Yazma hızı
            } else {
                element.innerHTML = text; // İmleci kaldır
                if (onComplete) onComplete(); // Yazma bittiğinde belirtilen fonksiyonu çağır
            }
        }
        type();
    }


    // --- KARAR EKRANI MEKANİKLERİ ('2_decision.html') ---
    const decisionContainer = document.querySelector('.decision-container');
    if (decisionContainer) {
        const yesBtn = document.getElementById('yes-btn');
        const noBtn = document.getElementById('no-btn');
        const titleElement = document.querySelector('.typewriter');
        
        // Önce yazının yazılmasını bekle, sonra butonları göster
        titleElement.style.visibility = 'hidden';
        yesBtn.style.display = 'none';
        noBtn.style.display = 'none';
        
        setTimeout(() => {
            titleElement.style.visibility = 'visible';
            // TEXT_TO_TYPE, 2_decision.html'deki script'ten geliyor
            typeWriter(titleElement, TEXT_TO_TYPE, () => {
                // Yazı bittikten 1 saniye sonra butonlar görünsün
                setTimeout(() => {
                    yesBtn.style.display = 'inline-block';
                    noBtn.style.display = 'inline-block';
                }, 1000);
            });
        }, 1000); // Sayfa açıldıktan 1 saniye sonra yazı başlasın

        let yesButtonScale = 1.2;

        noBtn.addEventListener('click', (event) => {
            // "Hayır"a basıldığında dalga efekti yarat
            const ripple = document.createElement('div');
            ripple.className = 'ripple';
            document.body.appendChild(ripple);
            ripple.style.top = `${event.clientY}px`;
            ripple.style.left = `${event.clientX}px`;
            setTimeout(() => ripple.remove(), 1000);

            // "Evet" butonunu daha da çekici hale getir
            yesButtonScale += 0.5;
            yesBtn.style.transform = `translate(-50%, -50%) scale(${yesButtonScale})`;
            yesBtn.style.boxShadow = `0 0 35px var(--glow-color)`; // Işıltıyı artır

            // "Hayır" butonunu kaçır
            const buttonArea = document.getElementById('button-area');
            const areaRect = buttonArea.getBoundingClientRect();
            const newTop = Math.random() * (areaRect.height - noBtn.offsetHeight);
            const newLeft = Math.random() * (areaRect.width - noBtn.offsetWidth);
            
            noBtn.style.position = 'absolute';
            noBtn.style.top = `${newTop}px`;
            noBtn.style.left = `${newLeft}px`;
        });

        yesBtn.addEventListener('click', () => {
            document.body.style.transition = 'opacity 1.5s ease-in';
            document.body.style.opacity = 0;
            // RECONCILIATION_URL, 2_decision.html'deki script'ten geliyor
            setTimeout(() => {
                window.location.href = RECONCILIATION_URL;
            }, 1500);
        });
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
