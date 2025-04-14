document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.getElementById('heart-container');
    const titleScreen = document.getElementById('title-screen');
    const slideshowContainer = document.getElementById('slideshow-container');
    const proposalContainer = document.getElementById('proposal-container');
    const backgroundOverlay = document.querySelector('#proposal-container .background-overlay');
    const heartsWrapper = document.querySelector('.hearts-wrapper');
    const sparkleCanvas = document.getElementById('sparkle-canvas');
    const emojiBackground = document.getElementById('emoji-background');
    const ctx = sparkleCanvas.getContext('2d');
  
    const imagePaths = [
        "../images/IMG_7846.JPG",
      "../images/Screenshot 2025-04-09 at 23.47.10.PNG",
      "../images/A991547D-452B-408B-BADE-9433E280E290.JPEG",
      "../images/D0037931-EC54-409A-89E8-5275B6F5E9AF.JPG",
      "../images/IMG_7415.jpg",
      "../images/IMG_7454.jpg",
      "../images/IMG_7693.PNG",
      "../images/IMG_7711.PNG",
      "../images/IMG_7735.JPG",
      "../images/IMG_7783.PNG",
      "../images/IMG_7792.PNG",
      "../images/IMG_7824.PNG",
      "../images/IMG_7841.PNG",
      "../images/IMG_7872.PNG",
      "../images/IMG_7456.PNG",
      "../images/IMG_8073.PNG",
      "../images/image.png",
      "../images/zNEW_Drawing4.jpg",
    ];
  
    function initSlideshow() {
      slideshowContainer.innerHTML = '';
      imagePaths.forEach((path, index) => {
        const img = document.createElement('img');
        img.src = path;
        img.className = 'slideshow-image';
        img.alt = `Memory ${index + 1}`;
        slideshowContainer.appendChild(img);
      });
  
      const images = document.querySelectorAll('.slideshow-image');
      if (images.length > 0) images[0].classList.add('active');
    }
  
    function startSlideshow() {
      const images = document.querySelectorAll('.slideshow-image');
      let currentIndex = 0;
      const interval = setInterval(() => {
        images[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % images.length;
        images[currentIndex].classList.add('active');
  
        if (currentIndex === images.length - 1) {
          clearInterval(interval);
          setTimeout(() => {
            const lastImage = images[currentIndex];
            backgroundOverlay.style.backgroundImage = `url(${lastImage.src})`;
            slideshowContainer.classList.add('hidden');
            proposalContainer.classList.remove('hidden');
            proposalContainer.classList.add('active');
          }, 3000);
        }
      }, 3000);
    }
  
    heartContainer.addEventListener('click', () => {
        heartsWrapper.classList.add('zooming');
        heartContainer.style.opacity = '0';
        document.getElementById('touch-text').style.display = 'none';  // Hide the "Touch our hearts" text when hearts are clicked
        
        setTimeout(() => {
          heartContainer.classList.add('hidden');
          titleScreen.classList.remove('hidden');
          setTimeout(() => {
            titleScreen.classList.add('hidden');
            slideshowContainer.classList.remove('hidden');
            initSlideshow();
            startSlideshow();
          }, 2000);
        }, 1000);
      });
      
  
    document.getElementById('yes-btn').addEventListener('click', () => {
      document.querySelector('.proposal-content').innerHTML = `
        <h1 class="name">My Love ❤️</h1>
        <p style="font-size: 1.5rem; margin: 1.5rem 0; color: #d23669;">
          You made me the Happiest. My heart is yours....
        </p>
        <div style="font-size: 2rem;">🩷🩷🩷</div>
      `;
    });
  
    document.getElementById('no-btn').addEventListener('mouseover', function () {
      const x = Math.random() * 100 - 50;
      const y = Math.random() * 100 - 50;
      this.style.transform = `translate(${x}px, ${y}px)`;
    });
  
    // Glitter + Emoji Floating
    let sparkles = [];
  
    function resizeCanvas() {
      sparkleCanvas.width = window.innerWidth;
      sparkleCanvas.height = window.innerHeight;
    }
  
    function createSparkle(x, y) {
      sparkles.push({ x, y, alpha: 1, size: Math.random() * 2 + 1 });
    }
  
    function animateSparkles() {
      ctx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);
      sparkles.forEach((s, i) => {
        s.alpha -= 0.01;
        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
        } else {
          ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
      requestAnimationFrame(animateSparkles);
    }
  
    function startEmojiFloaters() {
      emojiBackground.style.display = 'block';  // Ensure the emoji background is visible during the slideshow
      const emojis = ['🩷', '💫', '✨', '🌸', '💖', '💎'];
      setInterval(() => {
        const emoji = document.createElement('div');
        emoji.className = 'floating-emoji';
        emoji.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = `${Math.random() * 100}%`;
        emoji.style.bottom = '-50px';
        emoji.style.fontSize = `${Math.random() * 24 + 20}px`;
        emoji.style.opacity = 0.8;
        emojiBackground.appendChild(emoji);
        const speed = Math.random() * 2 + 1;
        let y = 0;
        const rise = () => {
          y += speed;
          emoji.style.transform = `translateY(-${y}px)`;
          const rect = emoji.getBoundingClientRect();
          createSparkle(rect.left + rect.width / 2, rect.top + rect.height / 2);
          if (y > window.innerHeight + 50) {
            emoji.remove();
          } else {
            requestAnimationFrame(rise);
          }
        };
        rise();
      }, 300);
    }
  
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animateSparkles();
    startEmojiFloaters();
  });
  