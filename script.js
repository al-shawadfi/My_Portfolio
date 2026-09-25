document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const preloader = document.querySelector(".preloader");
    const progress = document.querySelector(".progress");
    const navbar = document.querySelector(".navbar");
    const cursor = document.querySelector(".cursor-glow");
    const menuBtn = document.querySelector(".menu-btn");
    const nav = document.querySelector(".nav-center");
    const navLinks = document.querySelectorAll(".nav-center a");
    const sections = document.querySelectorAll("main section[id]");
    const year = document.querySelector("#year");

    /* Loader */
    window.addEventListener("load", () => {
        setTimeout(() => preloader?.classList.add("done"), 650);
    });

    /* Scroll progress + navbar */
    const onScroll = () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;

        if (progress) progress.style.width = `${percentage}%`;
        navbar?.classList.toggle("scrolled", window.scrollY > 25);

        let current = "home";

        sections.forEach(section => {
            if (window.scrollY >= section.offsetTop - 180) {
                current = section.id;
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
        });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    /* Custom cursor */
    if (cursor && window.matchMedia("(pointer:fine)").matches) {
        window.addEventListener("pointermove", (event) => {
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
        });

        document.querySelectorAll("a, button, .skill-pill, [data-tilt]").forEach(item => {
            item.addEventListener("mouseenter", () => cursor.classList.add("hovering"));
            item.addEventListener("mouseleave", () => cursor.classList.remove("hovering"));
        });
    }

    /* Mobile menu */
    const closeMenu = () => {
        nav?.classList.remove("open");
        menuBtn?.setAttribute("aria-expanded", "false");
        menuBtn?.setAttribute("aria-label", "Open menu");
        document.body.classList.remove("menu-open");
    };

    menuBtn?.addEventListener("click", () => {
        const open = nav.classList.toggle("open");
        menuBtn.setAttribute("aria-expanded", String(open));
        menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        body.classList.toggle("menu-open", open);
    });

    navLinks.forEach(link => link.addEventListener("click", closeMenu));

    /* Reveal */
    const revealItems = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.13 });

        revealItems.forEach(item => observer.observe(item));
    } else {
        revealItems.forEach(item => item.classList.add("visible"));
    }

    /* Magnetic CTA */
    document.querySelectorAll(".magnetic-btn").forEach(button => {
        button.addEventListener("mousemove", (event) => {
            const rect = button.getBoundingClientRect();
            const x = event.clientX - rect.left - rect.width / 2;
            const y = event.clientY - rect.top - rect.height / 2;
            button.style.transform = `translate(${x * .10}px, ${y * .18}px)`;
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });
    });

    /* Portrait tilt */
    const tilt = document.querySelector("[data-tilt]");

    if (tilt && window.matchMedia("(pointer:fine)").matches) {
        tilt.addEventListener("mousemove", (event) => {
            const rect = tilt.getBoundingClientRect();
            const x = (event.clientX - rect.left) / rect.width - .5;
            const y = (event.clientY - rect.top) / rect.height - .5;

            tilt.style.transform =
                `translate(-50%, -50%) perspective(800px) rotateY(${x * 8}deg) rotateX(${y * -8}deg)`;
        });

        tilt.addEventListener("mouseleave", () => {
            tilt.style.transform = "translate(-50%, -50%)";
        });
    }

    /* Subtle parallax for hero background */
    const heroGrid = document.querySelector(".hero-grid");

    window.addEventListener("scroll", () => {
        if (heroGrid && window.scrollY < window.innerHeight) {
            heroGrid.style.transform = `translateY(${window.scrollY * .12}px)`;
        }
    }, { passive: true });

    /* Footer year */
    if (year) year.textContent = new Date().getFullYear();
});
