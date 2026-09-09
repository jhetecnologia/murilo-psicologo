document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".nav");
    const navLinks = document.querySelectorAll(".nav a");

    // Cabeçalho ao rolar a página
    const handleScroll = () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    // Menu mobile
    if (menuToggle && nav) {
        menuToggle.addEventListener("click", () => {
            nav.classList.toggle("active");
            menuToggle.classList.toggle("active");

            const isOpen = nav.classList.contains("active");
            menuToggle.setAttribute("aria-expanded", isOpen);
        });
    }

    // Fecha o menu ao clicar em um link
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (nav && menuToggle) {
                nav.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Fecha o menu ao apertar ESC
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            if (nav && menuToggle) {
                nav.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            }
        }
    });

    // Animação suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.scrollY -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
