window.addEventListener('DOMContentLoaded', event => {

    const sidebarWrapper = document.getElementById('sidebar-wrapper');
    let scrollToTopVisible = false;
    // Closes the sidebar menu
    const menuToggle = document.body.querySelector('.menu-toggle');
    menuToggle.addEventListener('click', event => {
        event.preventDefault();
        sidebarWrapper.classList.toggle('active');
        _toggleMenuIcon();
        menuToggle.classList.toggle('active');
    })

    // Closes responsive menu when a scroll trigger link is clicked
    var scrollTriggerList = [].slice.call(document.querySelectorAll('#sidebar-wrapper .js-scroll-trigger'));
    scrollTriggerList.map(scrollTrigger => {
        scrollTrigger.addEventListener('click', () => {
            sidebarWrapper.classList.remove('active');
            menuToggle.classList.remove('active');
            _toggleMenuIcon();
        })
    });

    function _toggleMenuIcon() {
        const menuToggleBars = document.body.querySelector('.menu-toggle > .fa-bars');
        const menuToggleTimes = document.body.querySelector('.menu-toggle > .fa-xmark');
        if (menuToggleBars) {
            menuToggleBars.classList.remove('fa-bars');
            menuToggleBars.classList.add('fa-xmark');
        }
        if (menuToggleTimes) {
            menuToggleTimes.classList.remove('fa-xmark');
            menuToggleTimes.classList.add('fa-bars');
        }
    }

    // Scroll to top button appear
    document.addEventListener('scroll', () => {
        const scrollToTop = document.querySelector('.scroll-to-top');
        if (document.documentElement.scrollTop > 100) {
            scrollToTop.style.display = 'block'; // Show button when scrolled down
        } else {
            scrollToTop.style.display = 'none'; // Hide button when at the top
        }
    });
})

function fadeOut(el, duration) {
    el.style.opacity = 1;
    var start = performance.now();
    (function fade() {
        var elapsed = performance.now() - start;
        el.style.opacity = 1 - elapsed / duration;
        if (elapsed < duration) {
            requestAnimationFrame(fade);
        } else {
            el.style.display = "none";
        }
    })();
}

function fadeIn(el, duration, display) {
    el.style.opacity = 0;
    el.style.display = display || "block";
    var start = performance.now();
    (function fade() {
        var elapsed = performance.now() - start;
        el.style.opacity = elapsed / duration;
        if (elapsed < duration) {
            requestAnimationFrame(fade);
        }
    })();
}
document.addEventListener('DOMContentLoaded', function () {
    var openLinks = document.querySelectorAll('.portfolio-item');
    var closeBtns = document.querySelectorAll('[id^="close-overlay"]');

    function openOverlay(overlayId) {
        console.log("Opening overlay:", overlayId);
        var overlay = document.getElementById(overlayId);
        fadeIn(overlay, 350); // Fade in the overlay
    }

    function closeOverlay(overlayId) {
        console.log("Closing overlay:", overlayId);
        var overlay = document.getElementById(overlayId);
        fadeOut(overlay, 350); // Fade out the overlay
    }

    openLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            var overlayId = this.closest('.portfolio-item').getAttribute('href').replace('#', '');
            console.log("Clicked caption:", overlayId);
            openOverlay(overlayId);
        });
    });

    closeBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var overlayId = this.getAttribute('id').replace('close-overlay', 'overlay');
            closeOverlay(overlayId);
        });
    });
    
});