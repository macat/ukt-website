// === UKT Website JavaScript ===

// Navbar scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (toggle) {
    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
        const spans = toggle.querySelectorAll('span');
        if (links.classList.contains('open')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = '';
            spans[1].style.opacity = '';
            spans[2].style.transform = '';
        }
    });
}

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
        links.classList.remove('open');
        const spans = toggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// Airflow tab switching
const tabs = document.querySelectorAll('.airflow-tab');
const returnAir = document.getElementById('return-air');
const freshAir = document.getElementById('fresh-air');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const mode = tab.dataset.mode;
        
        switch (mode) {
            case 'recirculate':
                if (returnAir) returnAir.style.opacity = '1';
                if (freshAir) freshAir.style.opacity = '0.15';
                break;
            case 'mixed':
                if (returnAir) returnAir.style.opacity = '0.6';
                if (freshAir) freshAir.style.opacity = '0.6';
                break;
            case 'fresh':
                if (returnAir) returnAir.style.opacity = '0.15';
                if (freshAir) freshAir.style.opacity = '1';
                break;
        }
    });
});

// Smooth reveal on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply fade-in to sections
document.querySelectorAll('.product-card, .feature-card, .app-card, .problem-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact form handler
function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Message Sent ✓';
    btn.style.background = '#10B981';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Send Inquiry';
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
    }, 3000);
    return false;
}

// Add parallax to hero SVG on desktop
if (window.innerWidth > 1024) {
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        window.addEventListener('scroll', () => {
            const scroll = window.scrollY;
            heroVisual.style.transform = `translateY(calc(-50% + ${scroll * 0.15}px))`;
        });
    }
}
