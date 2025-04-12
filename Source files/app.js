document.addEventListener('DOMContentLoaded', function() {
    const heart = document.getElementById('heart');
    const heartContainer = document.getElementById('heart-container');
    const mainContent = document.getElementById('main-content');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    
    heart.addEventListener('click', function() {
        // Start zoom animation
        heart.classList.add('zoom');
        
        // Start smooth zoom animation
        setTimeout(() => {
            heart.style.transform = 'scale(30)';
        }, 50);
        
        // Fade out container after zoom completes
        setTimeout(() => {
            heartContainer.classList.add('fade-out');
            
            // Show main content after fade completes
            setTimeout(() => {
                heartContainer.style.display = 'none';
                mainContent.classList.remove('hidden');
            }, 800);
        }, 1000);
    });
    
    // Add romantic response for yes button
    yesBtn.addEventListener('click', function() {
        document.querySelector('.proposal-container').innerHTML = `
            <h1>Yay! ❤️</h1>
            <p>You've made me the happiest person!</p>
            <div class="hearts">❤️❤️❤️</div>
        `;
    });
    
    // Make the no button playful
    noBtn.addEventListener('mouseover', function() {
        // Move the button randomly when hovered
        const x = Math.random() * 80;
        const y = Math.random() * 80;
        noBtn.style.transform = `translate(${x}px, ${y}px)`;
    });
});