console.log('✨ Cute emoji animations started');

// ── Add CSS animations ──
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    /* Emoji container */
    .emoji-floats {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    }

    /* Floating emoji */
    .floating-emoji {
        position: absolute;
        font-size: 2rem;
        opacity: 0.7;
        animation: float-up 15s linear infinite;
    }

    @keyframes float-up {
        0% {
            transform: translateY(100vh) translateX(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 0.7;
        }
        90% {
            opacity: 0.7;
        }
        100% {
            transform: translateY(-100vh) translateX(80px) rotate(360deg);
            opacity: 0;
        }
    }

    /* Gentle sway effect */
    @keyframes sway {
        0%, 100% {
            transform: translateX(0);
        }
        50% {
            transform: translateX(20px);
        }
    }

    .floating-emoji.sway {
        animation: float-up 15s linear infinite, sway 3s ease-in-out infinite;
    }
`;

document.head.appendChild(styleSheet);

// ── Cute emojis list ──
const cuteEmojis = [
    '💖',  // Heart
    '🌸',  // Flower
    '✨',  // Sparkles
    '💕',  // Two hearts
    '🌷',  // Tulip
    '🌹',  // Rose
    '💗',  // Pink heart
    '🎀',  // Ribbon
    '🌺',  // Hibiscus
    '⭐',  // Star
    '💫',  // Dizzy
    '🦋',  // Butterfly
];

// ── Create emoji container ──
const emojiContainer = document.createElement('div');
emojiContainer.className = 'emoji-floats';
document.body.appendChild(emojiContainer);

// ── Function to create floating emoji ──
function createFloatingEmoji() {
    const emoji = document.createElement('div');
    emoji.className = 'floating-emoji';
    
    // Random emoji
    const randomEmoji = cuteEmojis[Math.floor(Math.random() * cuteEmojis.length)];
    emoji.textContent = randomEmoji;
    
    // Random position on screen
    const posX = Math.random() * 100;
    emoji.style.left = posX + '%';
    emoji.style.bottom = '-50px';
    
    // Random animation duration
    const duration = Math.random() * 10 + 12;
    const delay = Math.random() * 5;
    
    emoji.style.animation = `float-up ${duration}s linear ${delay}s infinite`;
    
    // Random sway
    if (Math.random() > 0.5) {
        emoji.classList.add('sway');
    }
    
    emojiContainer.appendChild(emoji);
}

// ── Create initial emojis ──
for (let i = 0; i < 15; i++) {
    setTimeout(() => createFloatingEmoji(), i * 300);
}

// ── Continuously add more emojis ──
setInterval(() => {
    if (emojiContainer.children.length < 30) {
        createFloatingEmoji();
    }
}, 2000);

console.log('✨ Cute emojis are floating!');