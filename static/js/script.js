// script.js -- "GÖRÜNÜRLÜK GARANTİLİ" TEST SÜRÜMÜ

document.addEventListener('DOMContentLoaded', () => {

    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Elementlerin varlığını konsolda kontrol et
    console.log("Yes butonu bulundu mu?", yesBtn);
    console.log("No butonu bulundu mu?", noBtn);

    if (yesBtn) {
        yesBtn.addEventListener('click', () => {
            alert("EVET butonuna tıklandı!");
            // Geçiş mantığı şimdilik devre dışı
            // window.location.href = RECONCILIATION_URL; 
        });
    }

    if (noBtn) {
        noBtn.addEventListener('click', () => {
            alert("HAYIR butonuna tıklandı!");
            noBtn.innerHTML = "Bana tekrar tıkladın!";
        });
    }
});
