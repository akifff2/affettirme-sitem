// script.js -- "NİHAİ KONTROL" (EN SAĞLAM VERSİYON)

document.addEventListener('DOMContentLoaded', () => {

    // --- KARAR EKRANI MANTIĞI ('2_decision.html') ---
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Elementlerin varlığını kontrol et, bu en iyi pratiktir.
    if (yesBtn && noBtn) {
        
        let yesButtonScale = 1;

        // "Hayır" butonuna tıklama olayı
        noBtn.addEventListener('click', () => {
            // "Evet" butonunu büyüt
            yesButtonScale += 0.4;
            yesBtn.style.transform = `scale(${yesButtonScale})`;

            // "Hayır" butonunu kaçır
            // Bu sefer butonları bir sarmalayıcı (wrapper) içine koyup,
            // o alan içinde rastgele bir yere gönderiyoruz.
            const wrapper = document.querySelector('.button-wrapper');
            const wrapperRect = wrapper.getBoundingClientRect();

            const newTop = Math.random() * (wrapperRect.height - noBtn.offsetHeight);
            const newLeft = Math.random() * (wrapperRect.width - noBtn.offsetWidth);
            
            noBtn.style.position = 'absolute';
            noBtn.style.top = `${newTop}px`;
            noBtn.style.left = `${newLeft}px`;
        });

        // "Evet" butonuna tıklama olayı
        yesBtn.addEventListener('click', () => {
            // Vücudun opaklığını düşürerek yumuşak bir geçiş yap
            document.body.style.transition = 'opacity 1s';
            document.body.style.opacity = 0;

            // Animasyon bittikten sonra yeni sayfaya yönlendir
            // RECONCILIATION_URL değişkeni, HTML içindeki script'ten geliyor.
            setTimeout(() => {
                window.location.href = RECONCILIATION_URL;
            }, 1000);
        });
    }

    // --- UZLAŞMA EKRANI MANTIĞI ('3_reconciliation.html') ---
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
