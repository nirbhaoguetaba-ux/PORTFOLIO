/* =========================================================
   PORTFOLIO - GUETABA NIRBHAO
   SCRIPT.JS COMPLET
   ========================================================= */


/* =========================================================
   1. ATTENDRE LE CHARGEMENT DU DOM
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    console.log("Portfolio chargé avec succès 🚀");


    /* =====================================================
       2. PRELOADER
       ===================================================== */

    const preloader = document.querySelector(".preloader");

    if (preloader) {

        window.addEventListener("load", () => {

            setTimeout(() => {

                preloader.classList.add("hide");

            }, 700);

        });

    }


    /* =====================================================
       3. MENU MOBILE
       ===================================================== */

    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("active");

            navMenu.classList.toggle("active");

            document.body.classList.toggle("no-scroll");

        });


        /*
         * Fermer le menu lorsqu'on clique
         * sur un lien
         */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("active");

                navMenu.classList.remove("active");

                document.body.classList.remove("no-scroll");

            });

        });

    }


    /* =====================================================
       4. FERMER LE MENU AVEC ESC
       ===================================================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (menuToggle) {

                menuToggle.classList.remove("active");

            }

            if (navMenu) {

                navMenu.classList.remove("active");

            }

            document.body.classList.remove("no-scroll");

        }

    });


    /* =====================================================
       5. HEADER AU SCROLL
       ===================================================== */

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =====================================================
       6. MODE SOMBRE / CLAIR
       ===================================================== */

    const themeToggle = document.querySelector(".theme-toggle");

    /*
     * Récupérer le thème enregistré
     */

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon = themeToggle.querySelector("i");

        if (!icon) return;

        if (document.body.classList.contains("dark-mode")) {

            icon.className = "fas fa-sun";

            themeToggle.setAttribute(
                "aria-label",
                "Activer le mode clair"
            );

        } else {

            icon.className = "fas fa-moon";

            themeToggle.setAttribute(
                "aria-label",
                "Activer le mode sombre"
            );

        }

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            if (
                document.body.classList.contains("dark-mode")
            ) {

                localStorage.setItem(
                    "portfolio-theme",
                    "dark"
                );

            } else {

                localStorage.setItem(
                    "portfolio-theme",
                    "light"
                );

            }

            updateThemeIcon();

        });

    }


    /* =====================================================
       7. EFFET MACHINE À ÉCRIRE
       ===================================================== */

    const typingText =
        document.querySelector(".typing-text");

    if (typingText) {

        const words = [

            "Développeur Web & Mobile",

            "Technicien Électronique",

            "Passionné d'Intelligence Artificielle",

            "Technicien Informatique",

            "Passionné de Technologie"

        ];


        let wordIndex = 0;

        let letterIndex = 0;

        let deleting = false;


        function typeEffect() {

            const currentWord =
                words[wordIndex];


            if (!deleting) {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        letterIndex + 1
                    );

                letterIndex++;


                if (
                    letterIndex ===
                    currentWord.length
                ) {

                    deleting = true;

                    setTimeout(
                        typeEffect,
                        1800
                    );

                    return;

                }

            } else {

                typingText.textContent =
                    currentWord.substring(
                        0,
                        letterIndex - 1
                    );

                letterIndex--;


                if (letterIndex === 0) {

                    deleting = false;

                    wordIndex =
                        (wordIndex + 1) %
                        words.length;

                }

            }


            const speed =
                deleting ? 50 : 90;

            setTimeout(
                typeEffect,
                speed
            );

        }


        typeEffect();

    }


    /* =====================================================
       8. ANIMATION DES ÉLÉMENTS AU SCROLL
       ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.12
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {

            element.classList.add("visible");

        });

    }


    /* =====================================================
       9. ANIMATION DES BARRES DE COMPÉTENCES
       ===================================================== */

    const progressBars =
        document.querySelectorAll(
            ".progress-bar span"
        );


    function animateProgressBars() {

        progressBars.forEach(bar => {

            const percentage =
                bar.getAttribute("data-width");

            if (percentage) {

                bar.style.width =
                    percentage + "%";

            }

        });

    }


    if (
        progressBars.length &&
        "IntersectionObserver" in window
    ) {

        const progressObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateProgressBars();

                            observer.disconnect();

                        }

                    });

                },
                {
                    threshold: 0.3
                }
            );


        const skillsSection =
            document.querySelector("#skills");


        if (skillsSection) {

            progressObserver.observe(
                skillsSection
            );

        }

    } else {

        animateProgressBars();

    }


    /* =====================================================
       10. COMPTEURS ANIMÉS
       ===================================================== */

    const counters =
        document.querySelectorAll(
            ".counter"
        );


    function animateCounter(counter) {

        const target =
            parseInt(
                counter.getAttribute(
                    "data-target"
                )
            );


        if (isNaN(target)) return;


        let current = 0;

        const duration = 1500;

        const increment =
            target / (duration / 16);


        function updateCounter() {

            current += increment;


            if (current < target) {

                counter.textContent =
                    Math.floor(current);

                requestAnimationFrame(
                    updateCounter
                );

            } else {

                counter.textContent =
                    target;

            }

        }


        updateCounter();

    }


    if (
        counters.length &&
        "IntersectionObserver" in window
    ) {

        const counterObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach(entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.5
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       11. NAVIGATION ACTIVE
       ===================================================== */

    const sections =
        document.querySelectorAll(
            "section[id]"
        );


    function updateActiveNavigation() {

        let currentSection = "";


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >=
                sectionTop &&
                window.scrollY <
                sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute("href");


            if (
                href ===
                "#" + currentSection
            ) {

                link.classList.add(
                    "active"
                );

            }

        });

    }


    window.addEventListener(
        "scroll",
        updateActiveNavigation
    );


    updateActiveNavigation();


    /* =====================================================
       12. EFFET CURSEUR
       ===================================================== */

    const cursor =
        document.querySelector(".cursor");

    const cursorFollower =
        document.querySelector(
            ".cursor-follower"
        );


    if (
        cursor &&
        cursorFollower &&
        window.innerWidth > 768
    ) {

        let mouseX = 0;

        let mouseY = 0;

        let followerX = 0;

        let followerY = 0;


        document.addEventListener(
            "mousemove",
            (event) => {

                mouseX =
                    event.clientX;

                mouseY =
                    event.clientY;


                cursor.style.left =
                    mouseX + "px";

                cursor.style.top =
                    mouseY + "px";

            }
        );


        function animateFollower() {

            followerX +=
                (mouseX - followerX) *
                0.15;

            followerY +=
                (mouseY - followerY) *
                0.15;


            cursorFollower.style.left =
                followerX + "px";

            cursorFollower.style.top =
                followerY + "px";


            requestAnimationFrame(
                animateFollower
            );

        }


        animateFollower();


        /*
         * Agrandir le curseur sur les
         * éléments interactifs
         */

        const interactiveElements =
            document.querySelectorAll(
                "a, button, input, textarea, .project-card-main"
            );


        interactiveElements.forEach(element => {

            element.addEventListener(
                "mouseenter",
                () => {

                    document.body.classList.add(
                        "cursor-hover"
                    );

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    document.body.classList.remove(
                        "cursor-hover"
                    );

                }
            );

        });

    }


    /* =====================================================
       13. MODALE DU PROJET OSTICKET
       ===================================================== */

    const projectModal =
        document.querySelector(
            ".project-modal"
        );


    const openProjectButtons =
        document.querySelectorAll(
            ".view-project"
        );


    const closeModal =
        document.querySelector(
            ".modal-close"
        );


    const modalOverlay =
        document.querySelector(
            ".modal-overlay"
        );


    function openProjectModal() {

        if (!projectModal) return;

        projectModal.classList.add(
            "active"
        );

        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeProjectModal() {

        if (!projectModal) return;

        projectModal.classList.remove(
            "active"
        );

        document.body.classList.remove(
            "no-scroll"
        );

    }


    openProjectButtons.forEach(button => {

        button.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                openProjectModal();

            }
        );

    });


    if (closeModal) {

        closeModal.addEventListener(
            "click",
            closeProjectModal
        );

    }


    if (modalOverlay) {

        modalOverlay.addEventListener(
            "click",
            closeProjectModal
        );

    }


    /* =====================================================
       14. LIGHTBOX IMAGE
       ===================================================== */

    const lightbox =
        document.querySelector(
            ".lightbox"
        );


    const lightboxImage =
        document.querySelector(
            ".lightbox img"
        );


    const lightboxClose =
        document.querySelector(
            ".lightbox-close"
        );


    const zoomImages =
        document.querySelectorAll(
            "[data-lightbox]"
        );


    function openLightbox(imageSrc) {

        if (
            !lightbox ||
            !lightboxImage
        ) return;


        lightboxImage.src =
            imageSrc;


        lightbox.classList.add(
            "active"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }


    function closeLightbox() {

        if (!lightbox) return;


        lightbox.classList.remove(
            "active"
        );


        document.body.classList.remove(
            "no-scroll"
        );

    }


    zoomImages.forEach(image => {

        image.addEventListener(
            "click",
            () => {

                const src =
                    image.getAttribute(
                        "src"
                    );

                if (src) {

                    openLightbox(src);

                }

            }
        );

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            (event) => {

                if (
                    event.target ===
                    lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    /* =====================================================
       15. ESC POUR FERMER LES FENÊTRES
       ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key ===
                "Escape"
            ) {

                closeProjectModal();

                closeLightbox();

            }

        }
    );


    /* =====================================================
       16. FORMULAIRE DE CONTACT
       ===================================================== */

    const contactForm =
        document.querySelector(
            ".contact-form"
        );


    const formMessage =
        document.querySelector(
            ".form-message"
        );


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            async (event) => {

                event.preventDefault();

                const submitButton =
                    contactForm.querySelector(
                        'button[type="submit"]'
                    );

                const buttonLabel =
                    submitButton?.querySelector("span");

                const originalLabel =
                    buttonLabel?.textContent;

                if (submitButton) {

                    submitButton.disabled = true;

                }

                if (buttonLabel) {

                    buttonLabel.textContent = "Envoi en cours...";

                }

                try {

                    const response = await fetch(
                        contactForm.action,
                        {
                            method: contactForm.method,
                            body: new FormData(contactForm),
                            headers: {
                                Accept: "application/json"
                            }
                        }
                    );

                    const result = await response.json();

                    if (!response.ok || !result.success) {

                        showFormMessage(
                            result.message ||
                                "L'envoi du message a échoué. Veuillez réessayer.",
                            "error"
                        );

                        return;

                    }

                    showFormMessage(result.message);

                    contactForm.reset();

                } catch (error) {

                    console.error(
                        "Échec de l'envoi du formulaire de contact :",
                        error
                    );

                    showFormMessage(
                        "Impossible de joindre le serveur d'envoi. Réessayez plus tard.",
                        "error"
                    );

                } finally {

                    if (submitButton) {

                        submitButton.disabled = false;

                    }

                    if (buttonLabel && originalLabel) {

                        buttonLabel.textContent = originalLabel;

                    }

                }

            }
        );

    }

    function showFormMessage(message, type = "success") {

        if (!formMessage) {

            alert(message);

            return;

        }

        formMessage.classList.toggle(
            "error",
            type === "error"
        );

        formMessage.textContent =
            message;

    }


    /* =====================================================
       17. BOUTON RETOUR EN HAUT
       ===================================================== */

    let backToTop =
        document.querySelector(
            ".back-to-top"
        );


    /*
     * Si le bouton n'existe pas dans HTML,
     * on le crée automatiquement.
     */

    if (!backToTop) {

        backToTop =
            document.createElement(
                "button"
            );

        backToTop.className =
            "back-to-top";

        backToTop.innerHTML =
            '<i class="fas fa-arrow-up"></i>';

        backToTop.setAttribute(
            "aria-label",
            "Retour en haut"
        );


        document.body.appendChild(
            backToTop
        );


        /*
         * Style directement depuis JS
         */

        backToTop.style.position =
            "fixed";

        backToTop.style.right =
            "25px";

        backToTop.style.bottom =
            "25px";

        backToTop.style.width =
            "45px";

        backToTop.style.height =
            "45px";

        backToTop.style.borderRadius =
            "50%";

        backToTop.style.background =
            "var(--accent)";

        backToTop.style.color =
            "var(--accent-contrast)";

        backToTop.style.zIndex =
            "999";

        backToTop.style.opacity =
            "0";

        backToTop.style.visibility =
            "hidden";

        backToTop.style.transition =
            "all 0.3s ease";

    }


    function updateBackToTop() {

        if (!backToTop) return;


        if (window.scrollY > 500) {

            backToTop.style.opacity =
                "1";

            backToTop.style.visibility =
                "visible";

        } else {

            backToTop.style.opacity =
                "0";

            backToTop.style.visibility =
                "hidden";

        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop
    );


    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateBackToTop();


    /* =====================================================
       18. EFFET PARALLAXE HERO
       ===================================================== */

    const heroImage =
        document.querySelector(
            ".image-container"
        );


    if (
        heroImage &&
        window.innerWidth > 768
    ) {

        document.addEventListener(
            "mousemove",
            (event) => {

                const x =
                    (window.innerWidth / 2 -
                        event.clientX) /
                    40;


                const y =
                    (window.innerHeight / 2 -
                        event.clientY) /
                    40;


                heroImage.style.transform =
                    `translate(${x}px, ${y}px)`;

            }
        );

    }


    /* =====================================================
       19. ANIMATION DES CARTES
       ===================================================== */

    const cards =
        document.querySelectorAll(
            ".skill-card, .detail-item, .timeline-content"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 768)
                    return;


                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    (y - centerY) / 25;


                const rotateY =
                    (centerX - x) / 25;


                card.style.transform =
                    `perspective(800px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-5px)`;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       20. LIENS EXTERNES
       ===================================================== */

    const externalLinks =
        document.querySelectorAll(
            'a[href^="http"]'
        );


    externalLinks.forEach(link => {

        link.setAttribute(
            "target",
            "_blank"
        );


        link.setAttribute(
            "rel",
            "noopener noreferrer"
        );

    });


    /* =====================================================
       21. ANIMATION DU LOGO
       ===================================================== */

    const logo =
        document.querySelector(".logo");


    if (logo) {

        logo.addEventListener(
            "click",
            (event) => {

                event.preventDefault();

                window.scrollTo({

                    top: 0,

                    behavior: "smooth"

                });

            }
        );

    }


    /* =====================================================
       22. EFFET SUR LES BOUTONS
       ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn"
        );


    buttons.forEach(button => {

        button.addEventListener(
            "mousemove",
            (event) => {

                if (window.innerWidth <= 768)
                    return;


                const rect =
                    button.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                button.style.setProperty(
                    "--mouse-x",
                    x + "px"
                );


                button.style.setProperty(
                    "--mouse-y",
                    y + "px"
                );

            }
        );

    });


    /* =====================================================
       23. ANIMATION DES ICÔNES SOCIALES
       ===================================================== */

    const socialLinks =
        document.querySelectorAll(
            ".social-link, .footer-socials a"
        );


    socialLinks.forEach(link => {

        link.addEventListener(
            "mouseenter",
            () => {

                link.style.transform =
                    "translateY(-7px) scale(1.08)";

            }
        );


        link.addEventListener(
            "mouseleave",
            () => {

                link.style.transform =
                    "";

            }
        );

    });


    /* =====================================================
       24. EMPÊCHER LES IMAGES CASSÉES
       ===================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                console.warn(
                    "Image introuvable :",
                    image.src
                );

            }
        );

    });


    /* =====================================================
       25. FIN
       ===================================================== */

    console.log(
        "%c Portfolio de Guetaba Nirbhao 🚀 ",
        "font-size:18px;font-weight:bold;"
    );

    console.log(
        "JavaScript chargé correctement."
    );

});