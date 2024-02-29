/*!
* Start Bootstrap - Jackson's Portfolio v6.0.6 (undefined)
* Copyright 2013-2024 undefined
* Licensed under undefined (https://github.com/StartBootstrap/portfolio/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', () => {
    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    const menuToggle = document.body.querySelector('.menu-toggle');
    const scrollTriggerList = [...document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger')];
    let scrollToTopVisible = false;

    menuToggle.addEventListener('click', (event) => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        toggleMenuIcon();
        menuToggle.classList.toggle('active');
    });

    scrollTriggerList.forEach(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            closeSidebar();
        });
    });

    document.addEventListener('scroll', () => {
        const scrollToTop = document.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            fadeIn(scrollToTop, 350, 'block');
            scrollToTopVisible = true;
        } else {
            fadeOut(scrollToTop, 350);
            scrollToTopVisible = false;
        }
    });

    function toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.toggle('fa-bars');
            menuToggleBars.classList.toggle('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.toggle('fa-xmark');
            menuToggleTimes.classList.toggle('fa-bars');
        }
    }

    function closeSidebar() {
        sidebarWrapper.classList.remove('active');
        menuToggle.classList.remove('active');
        toggleMenuIcon();
    }
});

function fade(el, duration, targetOpacity, callback) {
    const start = performance.now();
    const initialOpacity = parseFloat(getComputedStyle(el).opacity);

    function animate() {
        const elapsed = performance.now() - start;
        const progress = elapsed / duration;
        const currentOpacity = initialOpacity + (targetOpacity - initialOpacity) * progress;

        el.style.opacity = currentOpacity;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            if (targetOpacity === 0) {
                el.style.display = "none";
            }
            if (callback) {
                callback();
            }
        }
    }

    requestAnimationFrame(animate);
}

function fadeOut(el, duration, callback) {
    fade(el, duration, 0, callback);
}

function fadeIn(el, duration, display, callback) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    fade(el, duration, 1, callback);
}

document.addEventListener('DOMContentLoaded', function () {
    const openLinks = document.querySelectorAll('.portfolio-item');
    const closeBtns = document.querySelectorAll('[id^="close-overlay"]');
    const slides = document.querySelectorAll('.slide');
    let slideIndex = 0;

    function openOverlay(overlayId) {
        console.log("Opening overlay:", overlayId);
        const overlay = document.getElementById(overlayId);
        fadeIn(overlay, 350); // Fade in the overlay

        // Add click event listener to close the overlay when clicking outside of it
        overlay.addEventListener('click', function (event) {
            if (event.target === overlay) {
                closeOverlay(overlayId);
            }
        });
    }

    function closeOverlay(overlayId) {
        console.log("Closing overlay:", overlayId);
        const overlay = document.getElementById(overlayId);
        fadeOut(overlay, 350); // Fade out the overlay
    }

    openLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const overlayId = this.closest('.portfolio-item').getAttribute('href').replace('#', '');
            console.log("Clicked caption:", overlayId);
            openOverlay(overlayId);
        });
    });

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                fadeIn(slide, 350);
            } else {
                fadeOut(slide, 350);
            }
        });
    }

    function nextSlide() {
        slideIndex++;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }
        showSlide(slideIndex);
    }

    function prevSlide() {
        slideIndex--;
        if (slideIndex < 0) {
            slideIndex = slides.length - 1;
        }
        showSlide(slideIndex);
    }

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const overlayId = this.getAttribute('id').replace('close-overlay', 'overlay');
            closeOverlay(overlayId);
        });
    });

    document.querySelector('.prev').addEventListener('click', prevSlide);
    document.querySelector('.next').addEventListener('click', nextSlide);

    showSlide(slideIndex); // Show the first slide initially
});
