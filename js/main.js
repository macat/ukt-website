// === UKT Website — v2 JavaScript ===

// Nav scroll effect
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
});

// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
if (toggle) {
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });
}
document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Airflow mode switching
const airflowBtns = document.querySelectorAll('.airflow-btn');
const returnFlow = document.getElementById('return-air-flow');
const freshFlow = document.getElementById('fresh-air-flow');
const exhaustFlow = document.getElementById('exhaust-flow');

airflowBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        airflowBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const mode = btn.dataset.mode;

        // All modes always have exhaust
        if (exhaustFlow) exhaustFlow.style.opacity = '1';

        switch (mode) {
            case 'recirculate':
                if (returnFlow) returnFlow.style.opacity = '1';
                if (freshFlow) freshFlow.style.opacity = '0.1';
                break;
            case 'mixed':
                if (returnFlow) returnFlow.style.opacity = '0.6';
                if (freshFlow) freshFlow.style.opacity = '0.6';
                break;
            case 'fresh':
                if (returnFlow) returnFlow.style.opacity = '0.1';
                if (freshFlow) freshFlow.style.opacity = '1';
                break;
        }
    });
});

// Spec model tabs
const specTabs = document.querySelectorAll('.spec-tab');
const specPanels = document.querySelectorAll('.spec-panel');

specTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const model = tab.dataset.model;
        specTabs.forEach(t => t.classList.remove('active'));
        specPanels.forEach(p => p.classList.remove('active'));
        tab.classList.add('active');
        const panel = document.querySelector(`.spec-panel[data-panel="${model}"]`);
        if (panel) panel.classList.add('active');
    });
});

// Scroll reveal animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
    '.why-card, .product-card, .feature-item, .app-card, .conn-item, .heating-card, .cred-card, .facade-layout, .install-callout, .product-feature'
).forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Contact form handler
function handleSubmit(e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Sent ✓';
    btn.style.background = '#10b981';
    btn.disabled = true;
    setTimeout(() => {
        btn.textContent = 'Send inquiry';
        btn.style.background = '';
        btn.disabled = false;
        e.target.reset();
    }, 3000);
    return false;
}
