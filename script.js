
const themeToggle = document.getElementById('themeToggle');
const body = document.body;


const currentTheme = localStorage.getItem('theme') || 'dark';
if (currentTheme === 'light') {
    body.classList.add('light-mode');
}

themeToggle.addEventListener('click', () => {
    body.classList.toggle('light-mode');


    const theme = body.classList.contains('light-mode') ? 'light' : 'dark';
    localStorage.setItem('theme', theme);


    themeToggle.style.transform = 'rotate(360deg)';
    setTimeout(() => {
        themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
});


const navLinks = document.querySelectorAll('nav a');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        
        navLinks.forEach(l => l.classList.remove('active'));

        
        link.classList.add('active');

        
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        
        targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});


const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);


const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});


const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = index % 2 === 0 ? 'translateX(-50px)' : 'translateX(50px)';
    item.style.transition = 'all 0.6s ease';
    item.style.transitionDelay = `${index * 0.2}s`;
    observer.observe(item);
});


const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
    e.preventDefault();

    
    const name = form.querySelector('input[type="text"]').value;
    const email = form.querySelector('input[type="email"]').value;
    const message = form.querySelector('textarea').value;

    
    if (name && email && message) {
        
        alert(`Xabar yuborildi! Rahmat ${name}, tez orada siz bilan bog'lanamiz.`);

        
        form.reset();


        const btn = form.querySelector('.btn');
        btn.textContent = '✓ Yuborildi';
        btn.style.background = 'linear-gradient(135deg, #00ff00, #00aa00)';

        setTimeout(() => {
            btn.textContent = 'Send';
            btn.style.background = 'linear-gradient(135deg, var(--neon-blue), var(--neon-purple))';
        }, 3000);
    }
});

const hero = document.querySelector('.hero');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 3 + 1}px;
        height: ${Math.random() * 3 + 1}px;
        background: var(--neon-blue);
        border-radius: 50%;
        top: ${Math.random() * 100}%;
        left: ${Math.random() * 100}%;
        opacity: ${Math.random() * 0.5 + 0.2};
        box-shadow: 0 0 ${Math.random() * 10 + 5}px var(--neon-blue);
        animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
        animation-delay: ${Math.random() * 5}s;
    `;
    hero.appendChild(particle);
}

const heroImg = document.querySelector('.hero-img');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    heroImg.style.transform = `translate(${x}px, ${y}px)`;
});


const skillBars = document.querySelectorAll('.progress');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    skillObserver.observe(bar);
});


const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    border: 2px solid var(--neon-blue);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    transition: 0.1s;
    box-shadow: 0 0 20px var(--neon-blue);
`;
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX - 10 + 'px';
    cursor.style.top = e.clientY - 10 + 'px';
});


const clickables = document.querySelectorAll('a, button, input, textarea');
clickables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.width = '40px';
        cursor.style.height = '40px';
        cursor.style.background = 'rgba(0, 255, 255, 0.1)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursor.style.background = 'transparent';
    });
});

const heroTitle = document.querySelector('.hero-text h1 span');
const text = heroTitle.textContent;
heroTitle.textContent = '';

let i = 0;
const typeWriter = () => {
    if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 150);
    }
};

window.addEventListener('load', () => {
    setTimeout(typeWriter, 500);
});

console.log('🚀 Portfolio loaded successfully!');