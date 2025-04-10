// app.js
document.addEventListener('DOMContentLoaded', function() {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        events: JSON.parse(localStorage.getItem('events')) || [],
        editable: true,
        dateClick: function(info) {
            const title = prompt('Enter event title:');
            if (title) {
                calendar.addEvent({
                    title: title,
                    start: info.dateStr
                });
                saveEvents();
            }
        }
    });
    calendar.render();

    function saveEvents() {
        localStorage.setItem('events', JSON.stringify(calendar.getEvents().map(event => ({
            title: event.title,
            start: event.start.toISOString()
        }))));
    }
});
// app.js

//Spotify Player
const spotifyLogin = document.getElementById('spotify-login');
let player;

spotifyLogin.addEventListener('click', () => {
    // Spotify OAuth Implicit Grant Flow
    const clientId = 'YOUR_CLIENT_ID';
    const redirectUri = encodeURIComponent(window.location.href);
    const scopes = encodeURIComponent('streaming user-read-email user-read-private');
    window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
});
// Handle OAuth callback
window.addEventListener('load', () => {
    const hash = window.location.hash.substr(1);
    const result = hash.split('&').reduce((res, item) => {
        const [key, val] = item.split('=');
        res[key] = decodeURIComponent(val);
        return res;
    }, {});

    if (result.access_token) {
        initializePlayer(result.access_token);
    }
});

function initializePlayer(token) {
    player = new Spotify.Player({
        name: 'Website Player',
        getOAuthToken: cb => { cb(token); }
    });

    player.connect();
}
<iframe class="spotify-embed" 
                src="https://open.spotify.com/embed/playlist/6wm8OFbsAYxxeBlOjDTJQy?utm_source=generator" 
                width="100%" 
                height="352" 
                frameborder="0" 
                allowfullscreen 
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                loading="lazy">
        </iframe>

//Photo Album
// app.js
const photoUpload = document.getElementById('photo-upload');
const photosContainer = document.getElementById('photos-container');

photoUpload.addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => {
        const reader = new FileReader();
        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.classList.add('photo');
            img.onclick = () => img.remove();
            photosContainer.appendChild(img);
        }
        reader.readAsDataURL(file);
    });
});