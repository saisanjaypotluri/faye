document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const heartContainer = document.getElementById('heart-container');
    const hearts = document.querySelectorAll('.heart');
    const titleScreen = document.getElementById('title-screen');
    const slideshowContainer = document.getElementById('slideshow-container');
    const mainContent = document.getElementById('main-content');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    // Image paths
    const imagePaths = [
        "../images/IMG_7846.JPG",
        "../images/A991547D-452B-408B-BADE-9433E280E290.JPEG",
        "../images/D0037931-EC54-409A-89E8-5275B6F5E9AF.JPG",
        "../images/IMG_7415.jpg",
        "../images/IMG_7454.jpg",
        "../images/IMG_7711.PNG",
        "../images/IMG_7693.PNG",
        "../images/IMG_7735.JPG",
        "../images/IMG_7783.PNG",
        "../images/IMG_7792.PNG",
        "../images/IMG_7824.PNG",
        "../images/IMG_7456.PNG",
        "../images/IMG_7841.PNG",
        "../images/IMG_7872.PNG",
        "../images/IMG_7939.PNG",
        "../images/IMG_8073.PNG",
        "../images/Screenshot 2025-04-09 at 23.47.10.PNG",
        "../images/zNEW_Drawing4.jpg"
    ];

    // Initialize slideshow
    function initSlideshow() {
        imagePaths.forEach((path, index) => {
            const img = document.createElement('img');
            img.src = path;
            img.classList.add('slideshow-image');
            if (index === imagePaths.length - 1) {
                img.classList.add('last-image');
            }
            slideshowContainer.appendChild(img);
        });
    }

    // Start slideshow transition
    function startSlideshow() {
        const images = document.querySelectorAll('.slideshow-image');
        let currentIndex = 0;
        
        // Show first image
        images[currentIndex].classList.add('active');
        
        const slideshowInterval = setInterval(() => {
            // Hide current image
            images[currentIndex].classList.remove('active');
            
            // Move to next image
            currentIndex++;
            images[currentIndex].classList.add('active');
            
            // If last image, stop slideshow
            if (currentIndex === images.length - 1) {
                clearInterval(slideshowInterval);
                
                // After last image is shown, apply effects and show proposal
                setTimeout(() => {
                    // Show main content
                    mainContent.classList.remove('hidden');
                }, 2000); // Wait 2 seconds after last image appears
            }
        }, 3000); // Change image every 3 seconds
    }

    // Heart click handler
    heartContainer.addEventListener('click', function() {
        // Start zoom animation
        hearts.forEach(heart => {
            heart.classList.add('zoom');
            setTimeout(() => {
                heart.style.transform = 'scale(30)';
            }, 50);
        });
        
        // Fade out heart container
        setTimeout(() => {
            heartContainer.classList.add('fade-out');
            
            // Show title screen
            setTimeout(() => {
                heartContainer.style.display = 'none';
                titleScreen.classList.remove('hidden');
                
                // After title screen, start slideshow
                setTimeout(() => {
                    titleScreen.classList.add('hidden');
                    slideshowContainer.classList.remove('hidden');
                    initSlideshow();
                    startSlideshow();
                }, 2000); // Show title for 2 seconds
            }, 800);
        }, 2000);
    });

    // Yes button handler
    yesBtn.addEventListener('click', function() {
        document.querySelector('.proposal-container').innerHTML = `
            <h1 class="name">My Love</h1>
            <h1 style="font-size: 3.5rem;">Yay! ❤️</h1>
            <p style="font-size: 1.5rem; margin: 1rem 0;">You've made me the happiest person!</p>
            <div class="hearts" style="font-size: 2rem;">❤️❤️❤️</div>
        `;
    });

    // No button handler (playful escape)
    noBtn.addEventListener('mouseover', function() {
        const x = Math.random() * 80 - 40;
        const y = Math.random() * 80 - 40;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    });
});