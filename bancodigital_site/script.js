document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const registerForm = document.getElementById("register-form");
    const showRegisterLink = document.getElementById("show-register");
    const showLoginLink = document.getElementById("show-login");
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("nav-links");
   
    function showSection(sectionId) {
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            section.style.display = section.id === sectionId ? "block" : "none";
        });
    }

    function showLoader() {
        const loader = document.getElementById("loader");
        loader.style.opacity = "1";
        loader.style.pointerEvents = "auto";
    }

    function hideLoader() {
        const loader = document.getElementById("loader");
        loader.style.opacity = "0";
        loader.style.pointerEvents = "none";
    }

    if (loginForm) {
        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const storedPassword = localStorage.getItem(email);

            if (storedPassword && storedPassword === password) {
                const userName = email.split('@')[0].toUpperCase();
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("userName", userName);

                showLoader();

                setTimeout(() => {
                    hideLoader();
                    window.location.href = "conta.html";
                }, 2000);
            } else {
                alert("Email ou senha incorretos.");
            }
        });
    }

    if (registerForm) {
        registerForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const email = document.getElementById("register-email").value;
            const password = document.getElementById("register-password").value;

            localStorage.setItem(email, password);
           

            showLoader();

            setTimeout(() => {
                hideLoader();
                showSection("login");
            }, 2000);
        });
    }

    if (showRegisterLink) {
        showRegisterLink.addEventListener("click", (event) => {
            event.preventDefault();
            showSection("register");
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener("click", (event) => {
            event.preventDefault();
            showSection("login");
        });
    }

    if (hamburger && navLinks) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });
    }

    const abrirContaBtns = document.querySelectorAll("#abrir-conta-btn");
    abrirContaBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            showSection("login");
        });
    });

    let currentSlide = 0;

    function moveCarousel(direction) {
        const items = document.querySelectorAll('.carousel-item');
        currentSlide = (currentSlide + direction + items.length) % items.length;
        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    window.moveCarousel = moveCarousel;

    setTimeout(() => {
        const welcomeTitle = document.getElementById("welcome-title");
        welcomeTitle.classList.add("typing-animation");
    }, 1000);

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.querySelectorAll('.card').forEach(card => {
                    card.classList.add('animated');
                });
            }
        });
    });

    observer.observe(document.querySelector('.cards-container'));

    const links = document.querySelectorAll('.menu a');
    const sections = document.querySelectorAll('.sectionbar');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Remove 'active' class from all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });

            // Add 'active' class to the clicked section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
});
// script.js

document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.cards-baixo-sobrenois .cards');
    let currentCardIndex = 0;

    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.remove('active');
            if (index === currentCardIndex) {
                card.classList.add('active');
            }
        });
    }

    function nextCard() {
        currentCardIndex = (currentCardIndex + 1) % cards.length;
        updateCards();
    }

    setInterval(nextCard, 3000); // Change card every 3 seconds
    updateCards();
});
