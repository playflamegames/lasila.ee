// AI Huviring - Main JavaScript

console.log('AI Huviring website loaded successfully!');
console.log('Total sessions:', sessionsData.length);

// ===== Navigation ===== 
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when link is clicked
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===== Navbar Scroll Effect =====
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== Sessions Filter & Display =====
const sessionsGrid = document.getElementById('sessionsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');

// Function to render sessions
function renderSessions(filter = 'all') {
    if (!sessionsGrid) return;
    
    sessionsGrid.innerHTML = '';
    
    const filteredSessions = filter === 'all' 
        ? sessionsData 
        : sessionsData.filter(session => session.category === filter);
    
    filteredSessions.forEach(session => {
        const sessionCard = createSessionCard(session);
        sessionsGrid.appendChild(sessionCard);
    });
    
    // Update filter button count
    filterButtons.forEach(btn => {
        const filterType = btn.dataset.filter;
        if (filterType === 'all') {
            btn.textContent = `Kõik (${sessionsData.length})`;
        } else {
            const count = sessionsData.filter(s => s.category === filterType).length;
            const icon = btn.textContent.split(' ')[0];
            const label = btn.textContent.split(' ').slice(1).join(' ').replace(/\(\d+\)/, '').trim();
            btn.textContent = `${icon} ${label}`;
        }
    });
}

// Function to create session card
function createSessionCard(session) {
    const card = document.createElement('div');
    card.className = 'session-card';
    card.dataset.category = session.category;
    
    const categoryIcons = {
        'alused': '🚀',
        'pildid': '🎨',
        'video': '🎬',
        'mangud': '🎮',
        'audio': '🎵',
        'praktiline': '📊',
        'eetika': '🛡️'
    };
    
    const icon = categoryIcons[session.category] || '📚';
    
    card.innerHTML = `
        <div class="session-number">${icon} ${session.number}</div>
        <h3 class="session-title">${session.title}</h3>
        <p class="session-description">${session.description}</p>
        <div class="session-topics">
            ${session.topics.map(topic => `<span class="topic-tag">${topic}</span>`).join('')}
        </div>
    `;
    
    card.addEventListener('click', () => openSessionModal(session));
    
    return card;
}

// Filter buttons event listeners
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        // Filter sessions
        const filter = button.dataset.filter;
        renderSessions(filter);
    });
});

// ===== Session Modal =====
const modal = document.getElementById('sessionModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const modalOverlay = document.querySelector('.modal-overlay');

function openSessionModal(session) {
    if (!modal || !modalBody) return;
    
    // Generate modal content
    modalBody.innerHTML = `
        <div class="modal-header">
            <h2>${session.number}: ${session.title}</h2>
            <div class="modal-meta">
                <span>⏱️ ${session.duration}</span>
                <span>📚 ${session.module}</span>
            </div>
        </div>
        
        <div class="modal-section">
            <h3>🎯 Eesmärk</h3>
            <p>${session.details.goal}</p>
        </div>
        
        <div class="modal-section">
            <h3>🎨 Tegevused</h3>
            <ul>
                ${session.details.activities.map(activity => `<li>${activity}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>🛠️ Tööriistad</h3>
            <ul>
                ${session.details.tools.map(tool => `<li>${tool}</li>`).join('')}
            </ul>
        </div>
        
        ${session.details.homework ? `
            <div class="modal-section">
                <h3>📝 Koduülesanne</h3>
                <p>${session.details.homework}</p>
            </div>
        ` : ''}
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSessionModal() {
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Modal close events
if (modalClose) {
    modalClose.addEventListener('click', closeSessionModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closeSessionModal);
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeSessionModal();
    }
});

// ===== FAQ Accordion =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active');
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        console.log('Form submitted:', data);
        
        // Show success message (in production, this would send to a backend)
        alert('Täname registreerumise eest! Võtame teiega peagi ühendust.');
        
        // Reset form
        contactForm.reset();
    });
}

// ===== Intersection Observer for Animations =====
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

// Observe all cards and sections
const animatedElements = document.querySelectorAll('.about-card, .module-card, .session-card, .info-card');
animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
    // Render all sessions on page load
    renderSessions('all');
    
    // Log page load time
    const loadTime = performance.now();
    console.log(`Page load time: ${Math.round(loadTime)}ms`);
});

// ===== Performance Monitoring =====
window.addEventListener('load', () => {
    // Log performance metrics
    if (window.performance) {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Total page load time: ${pageLoadTime}ms`);
    }
});