// script.js -- YÖNETMENİN KURGUSU (SIFIR HATA)

document.addEventListener('DOMContentLoaded', () => {

    // Karar Ekranı Mekanikleri
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Bu elementler sadece '2_decision.html' sayfasında var.
    // Varlıklarını kontrol ederek diğer sayfalarda hata vermesini engelliyoruz.
    if (yesBtn && noBtn) {
        let yesButtonScale = 1;
        let noButtonClickCount = 0;

        // "Hayır" butonuna her tıklandığında
        noBtn.addEventListener('click', () => {
            noButtonClickCount++;

            // "Evet" butonunu büyüt
            yesButtonScale += 0.5;
            yesBtn.style.transform = `translate(-50%, -50%) scale(${yesButtonScale})`;

            // Kaçma animasyonu için rastgele pozisyonlar belirle
            // Ekranın kenarlarından taşmayacak şekilde hesaplama yapılıyor.
            const screenWidth = window.innerWidth;
            const screenHeight = window.innerHeight;
            const btnWidth = noBtn.offsetWidth;
            const btnHeight = noBtn.offsetHeight;

            const newTop = Math.random() * (screenHeight - btnHeight);
            const newLeft = Math.random() * (screenWidth - btnWidth);
            
            noBtn.style.position = 'absolute'; // Pozisyonu değiştirebilmek için
            noBtn.style.top = `${newTop}px`;
            noBtn.style.left = `${newLeft}px`;

            // Belirli bir tıklamadan sonra "Hayır" butonunu yok et
            if (noButtonClickCount > 8) {
                noBtn.style.display = 'none';
            }
        });

        // "Evet" butonuna tıklandığında
        yesBtn.addEventListener('click', () => {
            // Önce ekranı karartıp bir bekleme anı yarat
            document.body.style.transition = 'opacity 1s';
            document.body.style.opacity = 0;

            // Kararma animasyonu bittikten sonra bir sonraki sayfaya git
            // RECONCILIATION_URL değişkeni, HTML içindeki <script> bloğundan geliyor.
            setTimeout(() => {
                window.location.href = RECONCILIATION_URL;
            }, 1000);
        });
    }

});
