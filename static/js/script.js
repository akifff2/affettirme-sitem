// script.js -- KINTSUGI SÜRÜMÜ

document.addEventListener('DOMContentLoaded', () => {
    const kintsugiContainer = document.querySelector('.kintsugi-container');

    if (kintsugiContainer) {
        const heartContainer = kintsugiContainer.querySelector('.broken-heart');
        const title = document.getElementById('kintsugi-title');
        const yesBtn = document.getElementById('yes-btn');
        const fragmentCount = 6;
        let repairedCount = 0;

        for (let i = 0; i < fragmentCount; i++) {
            const fragment = document.createElement('div');
            fragment.className = 'fragment';
            // Her bir parçayı SVG kalp ikonundan bir parça gibi gösterelim
            // Bu kısım normalde imaj sprite ile yapılır, biz CSS ile taklit edelim.
            fragment.style.backgroundImage = `url('https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg')`;
            
            // Parçaları rastgele dağıtma
            const angle = (i / fragmentCount) * 2 * Math.PI;
            const radius = 150 + Math.random() * 50;
            fragment.style.transform = `rotate(${Math.random()*360}deg) translate(${Math.cos(angle)*radius}px, ${Math.sin(angle)*radius}px)`;
            
            // Parçaların pozisyonlarını ve boyutlarını ayarlama (çok basit bir demo)
            // Bu demo amaçlıdır, normalde her parçanın ayrı resmi olur.
            fragment.style.width = '100px';
            fragment.style.height = '100px';
            const xOffset = -(i % 3) * 100;
            const yOffset = -Math.floor(i/3) * 100;
            fragment.style.backgroundPosition = `${xOffset}px ${yOffset}px`;

            heartContainer.appendChild(fragment);

            // Her parçaya tıklama olayı
            fragment.addEventListener('click', () => {
                // Tıklanan parçayı merkeze geri getir (onarma)
                fragment.style.transform = 'rotate(0deg) translate(0, 0)';
                fragment.style.transitionDelay = `${Math.random() * 0.3}s`;
                // Altın rengi efektini simüle et
                fragment.style.filter = 'sepia(100%) saturate(200%) brightness(100%) hue-rotate(-50deg)';
                repairedCount++;

                // Tüm parçalar onarıldığında
                if (repairedCount === fragmentCount) {
                    title.style.opacity = '0';
                    kintsugiContainer.classList.add('repaired');
                }
            }, { once: true }); // Her parçaya sadece bir kez tıklanabilsin
        }
    }
});
