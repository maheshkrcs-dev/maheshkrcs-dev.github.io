// Navbar Smart Behavior (Center in Hero + Name Hide/Show)
const navbarBrand = document.getElementById('navBrand');
const navContainer = document.getElementById('navContainer');
const heroSection = document.getElementById('home');

function handleNavbar() {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    
    if (heroBottom > 90) {
        navbarBrand.style.opacity = '0';
        navbarBrand.style.visibility = 'hidden';
        navContainer.style.maxWidth = '100%';
        navContainer.style.justifyContent = 'space-between';
    } else {
        navbarBrand.style.opacity = '1';
        navbarBrand.style.visibility = 'visible';
        navContainer.style.maxWidth = '1200px';
        navContainer.style.justifyContent = 'space-between';
    }
}

//ScrollSpy
const navLinks = document.querySelectorAll('#navLinks a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    let current = '';
    const scrollPosition = window.scrollY + 180;   // better offset for smooth feel

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Scroll Animation
function animateSections() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight * 0.85) {
            section.classList.add('visible');
        }
    });
}

// Event Listeners
window.addEventListener('scroll', () => {
    handleNavbar();
    updateActiveNav();
    animateSections();
});

window.addEventListener('load', () => {
    handleNavbar();
    updateActiveNav();
    animateSections();
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Contact Form Logic
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const submitBtn = document.getElementById('submit-btn');

form.addEventListener('submit', async function(e) {
    e.preventDefault();

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status"></span> Sending...`;
    submitBtn.disabled = true;

    try {
        const formData = new FormData(form);
        const response = await fetch(form.action, { 
            method: 'POST', 
            body: formData 
        });

        const result = await response.json();

        if (response.ok && result.success === true) {
            form.reset();
            form.classList.add('d-none');
            successMessage.classList.remove('d-none');
        } else {
            alert("Submission failed. Please try again.");
        }
    } catch (error) {
        alert("Network error. Please try again later.");
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }
});

function resetForm() {
    form.classList.remove('d-none');
    successMessage.classList.add('d-none');
}