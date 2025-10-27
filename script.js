/**
 * Portfolio d'Evy Somda - Script Principal
 * Fonctionnalités : background animé, thème clair/sombre, menu hamburger,
 *                   animations au scroll, formulaire de contact, effets 3D
 */

// ============================================================
// 🌌 INITIALISATION DU BACKGROUND ANIMÉ (Particles.js)
// ============================================================
function initParticles() {
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            color: {
                value: "#007bff"
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000"
                }
            },
            opacity: {
                value: 0.5,
                random: true,
                anim: {
                    enable: true,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false
                }
            },
            size: {
                value: 3,
                random: true,
                anim: {
                    enable: true,
                    speed: 2,
                    size_min: 0.1,
                    sync: false
                }
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: "#007bff",
                opacity: 0.4,
                width: 1
            },
            move: {
                enable: true,
                speed: 1,
                direction: "none",
                random: true,
                straight: false,
                out_mode: "out",
                bounce: false,
                attract: {
                    enable: true,
                    rotateX: 600,
                    rotateY: 1200
                }
            }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: {
                    enable: true,
                    mode: "grab"
                },
                onclick: {
                    enable: true,
                    mode: "push"
                },
                resize: true
            },
            modes: {
                grab: {
                    distance: 140,
                    line_linked: {
                        opacity: 1
                    }
                },
                push: {
                    particles_nb: 4
                }
            }
        },
        retina_detect: true
    });
}

// ============================================================
// 🔄 ATTENDRE LE CHARGEMENT DU DOM
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Initialiser les particules
    initParticles();

    // ============================================================
    // 🌙 THÈME CLAIR/SOMBRE
    // ============================================================
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme');

        // Charger le thème sauvegardé
        if (currentTheme === 'dark' || (!currentTheme && prefersDarkScheme.matches)) {
            document.body.classList.add('dark-theme');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            updateParticlesColor('#4cc9f0'); // Couleur turquoise en mode sombre
        }

        // Écouter les changements de thème
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            updateParticlesColor(isDark ? '#4cc9f0' : '#007bff');
        });

        // Écouter les préférences système
        prefersDarkScheme.addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.body.classList.toggle('dark-theme', e.matches);
                themeToggle.innerHTML = e.matches ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
                updateParticlesColor(e.matches ? '#4cc9f0' : '#007bff');
            }
        });
    }

    // Mettre à jour la couleur des particules
    function updateParticlesColor(color) {
        if (window.pJSDom && window.pJSDom[0]) {
            window.pJSDom[0].pJS.particles.color.value = color;
            window.pJSDom[0].pJS.particles.line_linked.color = color;
        }
    }

    // ============================================================
    // 🧭 MENU HAMBURGER
    // ============================================================
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', () => {
            const isOpen = navList.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', isOpen);
            navToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        });

        // Fermer le menu après clic sur un lien
        document.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('open');
                navToggle.setAttribute('aria-expanded', 'false');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            });
        });
    }

    // ============================================================
    // 📜 SCROLL SMOOTH + ANIMATIONS D'APPARITION
    // ============================================================
    // Détecter quand les sections sont visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    // Observer toutes les sections
    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });

    // Lien interne avec scroll smooth
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================================
    // ✉️ FORMULAIRE DE CONTACT
    // ============================================================
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async(e) => {
            e.preventDefault();
            const formStatus = document.getElementById('form-status');
            const formData = new FormData(contactForm);
            const nom = formData.get('nom');
            const email = formData.get('email');
            const message = formData.get('message');

            // Validation des champs
            if (!nom || !email || !message) {
                formStatus.textContent = '⚠️ Veuillez remplir tous les champs.';
                formStatus.style.color = '#ff5555';
                return;
            }

            // Validation de l'email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                formStatus.textContent = '📧 Adresse email invalide.';
                formStatus.style.color = '#ff5555';
                return;
            }

            // Afficher un message d'envoi
            formStatus.textContent = '⏳ Envoi en cours...';
            formStatus.style.color = '#333';

            try {
                // Envoi du formulaire (via FormSubmit)
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.textContent = `✅ Message envoyé avec succès ! Merci ${nom} 💌`;
                    formStatus.style.color = '#28a745';
                    contactForm.reset();
                    setTimeout(() => {
                        formStatus.textContent = '';
                    }, 5000);
                } else {
                    throw new Error('Erreur lors de l\'envoi');
                }
            } catch (error) {
                formStatus.textContent = '❌ Une erreur est survenue. Veuillez réessayer.';
                formStatus.style.color = '#ff5555';
                console.error("Erreur lors de l'envoi du formulaire :", error);
            }
        });
    }

    // ============================================================
    // 🎭 ANIMATIONS 3D POUR LES CARTES DE PROJET
    // ============================================================
    if (window.matchMedia('(hover: hover)').matches) {
        const projetCards = document.querySelectorAll('.projet__card');
        projetCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const tiltX = (y - centerY) / 20;
                const tiltY = (centerX - x) / 20;
                card.style.transform = `translateY(-10px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0) scale(1)';
            });
        });

        // Effet 3D pour les cartes du blog
        const blogCards = document.querySelectorAll('.blog__card');
        blogCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const tiltX = (y - centerY) / 30;
                const tiltY = (centerX - x) / 30;
                card.style.transform = `translateY(-5px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0) rotateY(0)';
            });
        });
    }
});