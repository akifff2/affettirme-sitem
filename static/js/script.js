// script.js -- YÖNETMENİN KURGUSU (FİNAL RÖTUŞLAR)

document.addEventListener('DOMContentLoaded', () => {

    // Karar Ekranı Mekanikleri ('2_decision.html')
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    if (yesBtn && noBtn) {
        let yesButtonScale = 1;

        noBtn.addEventListener('click', () => {
            yesButtonScale += 0.4;
            yesBtn.style.transform = `translate(-50%, -50%) scale(${yesButtonScale})`;

            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const newTop = Math.random() * (screenHeight - noBtn.offsetHeight);
            const newLeft = Math.random() * (screenWidth - noBtn.offsetWidth);
            
            noBtn.style.position = 'absolute';
            noBtn.style.top = `${newTop}px`;
            noBtn.style.left = `${newLeft}px`;
        });

        yesBtn.addEventListener('click', () => {
            document.body.style.transition = 'opacity 1s';
            document.body.style.opacity = 0;
            // RECONCILIATION_URL, 2_decision.html içindeki script'ten geliyor
            setTimeout(() => {
                window.location.href = RECONCILIATION_URL;
            }, 1000);
        });
    }

    // Uzlaşma (Reconciliation) Ekranı Mekanikleri ('3_reconciliation.html')
    const kintsugiHeart = document.getElementById('kintsugi-heart');
    if (kintsugiHeart) {
        const title = document.getElementById('reconciliation-title');
        const finaleLink = document.getElementById('finale-link');

        kintsugiHeart.addEventListener('click', () => {
            // Kalbi onar (CSS class'ı ekleyerek animasyonu tetikle)
            kintsugiHeart.classList.add('repaired');
            
            // Başlığı değiştir ve butonu göster
            title.textContent = "Birlikte daha güçlüyüz...";
            finaleLink.style.opacity = '1';
            finaleLink.style.pointerEvents = 'auto';

        }, { once: true }); // Bu olayın sadece bir kez çalışmasını sağlar
    }

});
