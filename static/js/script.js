// script.js -- KINTSUGI 2.0: USTALIK ESERİ

document.addEventListener('DOMContentLoaded', () => {
    
    // Arka Plan Efekt Yöneticisi
    const bgCanvas = document.querySelector('.background-canvas');
    if (bgCanvas) {
        const bgType = bgCanvas.dataset.bgType;
        // Bu kısma ileride `if (bgType === 'stars') ...` gibi farklı efektler eklenebilir.
        // Şimdilik temel bir parçacık efekti koyalım
        if (typeof particlesJS !== 'undefined') { // Eğer kütüphane yüklüyse
           // ... particles.js kodu eklenebilir
        } else {
            // Basit bir CSS yıldız efekti
            const starCount = 100;
            for(let i = 0; i < starCount; i++) {
                let star = document.createElement('div');
                star.style.position = 'absolute';
                star.style.backgroundColor = 'white';
                star.style.borderRadius = '50%';
                star.style.width = `${Math.random() * 2}px`;
                star.style.height = star.style.width;
                star.style.left = `${Math.random() * 100}vw`;
                star.style.top = `${Math.random() * 100}vh`;
                star.style.animation = `twinkle ${Math.random() * 5 + 3}s infinite alternate`;
                bgCanvas.appendChild(star);
            }
            const style = document.createElement('style');
            style.innerHTML = `@keyframes twinkle { to { opacity: 0.3; } }`;
            document.head.appendChild(style);
        }
    }

    // İnteraktif Onarım Sayfası Yöneticisi
    const repairContainer = document.getElementById('repair-object-container');
    if (repairContainer) {
        const iconType = repairContainer.dataset.iconType;
        let svgData;

        // İkon kütüphanesi
        const icons = {
            heart: {
                viewBox: "0 0 24 24",
                paths: [
                    "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                ]
            },
            star: {
                viewBox: "0 0 24 24",
                paths: [
                    "M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                ]
            }
        };

        svgData = icons[iconType] || icons.heart;

        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", svgData.viewBox);
        svg.setAttribute("id", "repair-object");

        // Her path'i ayrı bir fragment olarak oluştur
        svgData.paths.forEach(d => {
            const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
            path.setAttribute("d", d);
            path.style.fill = 'none';
            path.style.stroke = 'white';
            path.style.strokeWidth = '0.5';
            
            // Parçaları rastgele dağıt
            path.style.transformOrigin = 'center center';
            const angle = Math.random() * 360;
            const distance = Math.random() * 100 + 100;
            path.style.transform = `rotate(${angle}deg) translate(${distance}px) rotate(${-angle}deg)`;
            path.style.opacity = 0;
            svg.appendChild(path);
        });
        
        repairContainer.appendChild(svg);

        // Animasyonu başlat
        setTimeout(() => {
            const paths = svg.querySelectorAll('path');
            let repairedCount = 0;

            paths.forEach((path, index) => {
                path.style.transitionDelay = `${index * 100}ms`;
                path.style.transform = 'rotate(0) translate(0)';
                path.style.opacity = 1;

                path.addEventListener('click', () => {
                    path.style.fill = `var(--theme-color)`;
                    path.style.stroke = 'transparent';
                    repairedCount++;

                    if (repairedCount === paths.length) {
                        document.getElementById('repair-object').classList.add('repaired');
                        document.getElementById('repair-title').style.opacity = '0';
                        document.getElementById('final-link').style.opacity = '1';
                        document.getElementById('final-link').style.pointerEvents = 'auto';
                    }
                }, { once: true });
            });
        }, 500);
    }
});
